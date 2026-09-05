// VitaNova Clinic - Dedicated Local-First Synchronization Engine
import { db, getDeviceId } from './db';
import { networkSentinel } from './network';
import { SyncOutboxItem, SyncStatus, VitalRecord, MedicalRecordEntry, HomeCareRequest } from '../types';

export type SyncStateEnum = 'idle' | 'syncing' | 'synced' | 'failed' | 'offline';

type SyncListener = (state: {
  status: SyncStateEnum;
  pendingCount: number;
  lastSyncedTime: string | null;
  message: string;
}) => void;

class VitaNovaSyncEngine {
  private isSynchronizing: boolean = false;
  private lastSyncedTime: string | null = null;
  private statusListeners: Set<SyncListener> = new Set();
  private autoSyncInterval: number | null = null;

  constructor() {
    this.lastSyncedTime = localStorage.getItem('vitanova_last_synced_time');

    // Subscribe to network changes: auto-sync immediately when network returns
    networkSentinel.subscribe((netState) => {
      if (netState === 'online' || netState === 'poor') {
        this.triggerSync('network_restored');
      } else {
        this.notify();
      }
    });

    // Listen for Service Worker background sync triggers
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'TRIGGER_BACKGROUND_SYNC') {
          this.triggerSync('service_worker_bg_sync');
        }
      });
    }

    // Periodic check every 30s when online
    if (typeof window !== 'undefined') {
      this.autoSyncInterval = window.setInterval(() => {
        if (networkSentinel.isOnline() && !this.isSynchronizing) {
          this.triggerSync('periodic');
        }
      }, 30000);
    }
  }

  public subscribe(listener: SyncListener): () => void {
    this.statusListeners.add(listener);
    this.notify();
    return () => this.statusListeners.delete(listener);
  }

  public async getPendingCount(): Promise<number> {
    try {
      return await db.syncOutbox.where('status').equals('pending').or('status').equals('failed').count();
    } catch {
      return 0;
    }
  }

  private async notify() {
    const pendingCount = await this.getPendingCount();
    const isOnline = networkSentinel.isOnline();

    let status: SyncStateEnum = 'idle';
    let message = 'All changes synced';

    if (!isOnline) {
      status = 'offline';
      message = pendingCount > 0 ? `Offline (${pendingCount} pending)` : 'Offline';
    } else if (this.isSynchronizing) {
      status = 'syncing';
      message = 'Back online — syncing...';
    } else if (pendingCount > 0) {
      status = 'idle';
      message = `${pendingCount} change${pendingCount > 1 ? 's' : ''} waiting to sync`;
    } else {
      status = 'synced';
      message = 'All changes synced';
    }

    this.statusListeners.forEach(cb => cb({
      status,
      pendingCount,
      lastSyncedTime: this.lastSyncedTime,
      message
    }));
  }

  // Queue a change into local outbox with full audit trail
  public async queueChange(
    entity: SyncOutboxItem['entity'],
    action: SyncOutboxItem['action'],
    payload: any,
    userId: string = 'pat_sarah_001'
  ): Promise<string> {
    const id = 'outbox_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
    const item: SyncOutboxItem = {
      id,
      entity,
      action,
      payload,
      clientTimestamp: new Date().toISOString(),
      userId,
      deviceId: getDeviceId(),
      version: payload.version || 1,
      status: 'pending',
      retryCount: 0
    };

    await db.syncOutbox.add(item);
    console.log(`[VitaNova Sync] Queued ${action} on ${entity} into local outbox:`, item);
    this.notify();

    // If online, immediately initiate sync
    if (networkSentinel.isOnline()) {
      this.triggerSync('new_item_queued');
    }

    return id;
  }

  // Master synchronization routine
  public async triggerSync(triggerReason: string = 'manual'): Promise<{ success: boolean; syncedCount: number; errors: string[] }> {
    if (this.isSynchronizing) {
      console.log('[VitaNova Sync] Sync already in progress, skipping trigger:', triggerReason);
      return { success: false, syncedCount: 0, errors: ['Sync already in progress'] };
    }

    if (!networkSentinel.isOnline()) {
      console.log('[VitaNova Sync] Offline: aborting sync trigger:', triggerReason);
      this.notify();
      return { success: false, syncedCount: 0, errors: ['Currently offline'] };
    }

    this.isSynchronizing = true;
    this.notify();

    const errors: string[] = [];
    let syncedCount = 0;

    try {
      // 1. Fetch pending/failed outbox operations
      const pendingItems = await db.syncOutbox
        .where('status')
        .equals('pending')
        .or('status')
        .equals('failed')
        .sortBy('clientTimestamp');

      if (pendingItems.length > 0) {
        console.log(`[VitaNova Sync] Pushing ${pendingItems.length} queued changes to server...`);

        // Mark items as syncing locally
        for (const item of pendingItems) {
          await db.syncOutbox.update(item.id, { status: 'syncing' });
        }

        // Send batch payload to server
        const response = await fetch('/api/sync/push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceId: getDeviceId(),
            items: pendingItems,
            lowBandwidth: localStorage.getItem('vitanova_low_bandwidth') === 'true'
          })
        });

        if (response.ok) {
          const result = await response.json();
          // Server returns processed item statuses
          for (const serverAck of result.processed || []) {
            const outboxRecord = pendingItems.find(p => p.id === serverAck.outboxId);
            if (outboxRecord) {
              if (serverAck.success) {
                // Update local outbox record to synced
                await db.syncOutbox.update(outboxRecord.id, {
                  status: 'synced',
                  lastAttempt: new Date().toISOString()
                });

                // Update entity syncStatus in local Dexie store
                await this.markLocalEntitySynced(outboxRecord.entity, outboxRecord.payload.id);
                syncedCount++;
              } else {
                // Handle conflict or clinical rejection
                await db.syncOutbox.update(outboxRecord.id, {
                  status: serverAck.requiresAttention ? 'requires_attention' : 'failed',
                  error: serverAck.error || 'Server rejected mutation',
                  lastAttempt: new Date().toISOString()
                });
                errors.push(serverAck.error || `Failed to sync ${outboxRecord.entity}`);
              }
            }
          }
        } else {
          // Push failed: revert outbox items to 'failed' with incremented retry
          for (const item of pendingItems) {
            await db.syncOutbox.update(item.id, {
              status: 'failed',
              retryCount: (item.retryCount || 0) + 1,
              error: `HTTP ${response.status}: Failed to reach server`
            });
          }
          errors.push(`Sync push failed with status ${response.status}`);
        }
      }

      // 2. Incremental Pull: Retrieve updates from server since last sync
      await this.pullServerChanges();

      this.lastSyncedTime = new Date().toISOString();
      localStorage.setItem('vitanova_last_synced_time', this.lastSyncedTime);

    } catch (err: any) {
      console.warn('[VitaNova Sync] Synchronization error:', err);
      errors.push(err.message || 'Network communication failure');
    } finally {
      this.isSynchronizing = false;
      this.notify();
    }

    return {
      success: errors.length === 0,
      syncedCount,
      errors
    };
  }

  // Pull server changes and merge safely into IndexedDB without overwriting clinical history
  private async pullServerChanges() {
    try {
      const since = this.lastSyncedTime || new Date(Date.now() - 30 * 86400000).toISOString();
      const response = await fetch(`/api/sync/pull?since=${encodeURIComponent(since)}&deviceId=${getDeviceId()}`);
      if (!response.ok) return;

      const serverData = await response.json();

      // Merge vitals: append-oriented
      if (serverData.vitals && Array.isArray(serverData.vitals)) {
        for (const vital of serverData.vitals) {
          const existing = await db.vitals.get(vital.id);
          if (!existing) {
            await db.vitals.add({ ...vital, syncStatus: 'synced' });
          }
        }
      }

      // Merge medical records: strictly append-only clinical history
      if (serverData.medicalRecords && Array.isArray(serverData.medicalRecords)) {
        for (const record of serverData.medicalRecords) {
          const existing = await db.medicalRecords.get(record.id);
          if (!existing) {
            await db.medicalRecords.add({ ...record, syncStatus: 'synced' });
          } else if (existing.auditTrail.version < record.auditTrail.version) {
            // Version upgrade preserves audit chain
            await db.medicalRecords.put({ ...record, syncStatus: 'synced' });
          }
        }
      }

      // Merge care plans
      if (serverData.carePlans && Array.isArray(serverData.carePlans)) {
        for (const plan of serverData.carePlans) {
          await db.carePlans.put({ ...plan, syncStatus: 'synced' });
        }
      }

      // Merge home care requests
      if (serverData.homeVisits && Array.isArray(serverData.homeVisits)) {
        for (const visit of serverData.homeVisits) {
          await db.homeVisits.put({ ...visit, syncStatus: 'synced' });
        }
      }

      console.log('[VitaNova Sync] Pull step completed successfully.');
    } catch (err) {
      console.warn('[VitaNova Sync] Pull step warning (non-fatal):', err);
    }
  }

  private async markLocalEntitySynced(entity: SyncOutboxItem['entity'], entityId: string) {
    try {
      switch (entity) {
        case 'vitals':
          await db.vitals.update(entityId, { syncStatus: 'synced' });
          break;
        case 'medicalRecord':
          await db.medicalRecords.update(entityId, { syncStatus: 'synced' });
          break;
        case 'homeVisit':
          await db.homeVisits.update(entityId, { syncStatus: 'synced' });
          break;
      }
    } catch (err) {
      console.warn(`[VitaNova Sync] Error marking local entity ${entity}:${entityId} synced:`, err);
    }
  }
}

export const syncEngine = new VitaNovaSyncEngine();
