import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  HeartPulse,
  CreditCard,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { SyncOutboxItem } from '../../types';

interface AdminDashboardProps {
  outboxItems: SyncOutboxItem[];
  onTriggerGlobalSync: () => Promise<void>;
  networkState: string;
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({
  outboxItems,
  onTriggerGlobalSync,
  networkState
}) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const pendingItems = outboxItems.filter(i => i.status === 'pending');
  const syncedItems = outboxItems.filter(i => i.status === 'synced');
  const failedItems = outboxItems.filter(i => i.status === 'failed' || i.status === 'requires_attention');

  const handleSyncAll = async () => {
    setIsSyncing(true);
    await onTriggerGlobalSync();
    setIsSyncing(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Clinic Operations & Admin Console</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Enterprise Level
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Central registry monitoring, offline sync telemetry, and emergency ambulance dispatch oversight.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={isSyncing || networkState === 'offline'}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Processing Queue...' : 'Force Global Outbox Sync'}</span>
        </button>
      </div>

      {/* Enterprise Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Enrolled Patients</span>
          <p className="text-2xl font-extrabold text-white">1,482</p>
          <p className="text-[10px] text-teal-400">+38 this week across Kampala</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total MoMo Revenue</span>
          <p className="text-2xl font-extrabold text-white">UGX 18.4M</p>
          <p className="text-[10px] text-emerald-400">MTN & Airtel automated payouts</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Home Care Visits Done</span>
          <p className="text-2xl font-extrabold text-white">314</p>
          <p className="text-[10px] text-teal-400">100% bedside signed</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Emergency Dispatches</span>
          <p className="text-2xl font-extrabold text-white">28</p>
          <p className="text-[10px] text-red-400">Avg ETA: 12.4 mins</p>
        </div>
      </div>

      {/* Sync Queue Monitor (Critical for Offline-First System QA) */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-white">Real-Time Sync Engine Queue Monitor</h2>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
              {pendingItems.length} Pending
            </span>
            <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              {syncedItems.length} Synced
            </span>
            {failedItems.length > 0 && (
              <span className="text-rose-300 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                {failedItems.length} Attention
              </span>
            )}
          </div>
        </div>

        {outboxItems.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            Local change outbox is empty. All modifications are currently synchronized.
          </p>
        ) : (
          <div className="space-y-2">
            {outboxItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-white uppercase font-mono text-[11px]">{item.entity}</strong>
                    <span className="text-slate-400">• Action: {item.action}</span>
                    <span className="text-slate-500 text-[10px]">({item.id})</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Device: <code className="text-teal-400">{item.deviceId}</code> • Time: {new Date(item.clientTimestamp).toLocaleTimeString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'synced'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : item.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Dispatch & Triage Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-red-400" />
          <span>Active Emergency Dispatch Queue (Kampala Metro)</span>
        </h2>
        <div className="space-y-2">
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <p className="font-bold text-white">Plot 14, Ntinda-Nakawa Road, Kampala</p>
              <p className="text-slate-400 text-[11px]">Caller: Sarah Namubiru (+256 772 458 912) • Severity: Urgent (Yellow)</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Ambulance #03 En Route (ETA 8 mins)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
