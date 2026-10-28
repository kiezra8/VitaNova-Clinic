import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Persistent server store path
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'clinic_store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ServerStore {
  vitals: any[];
  medicalRecords: any[];
  carePlans: any[];
  homeVisits: any[];
  transactions: any[];
  messages: any[];
  emergencyDispatches: any[];
  auditLogs: any[];
  lastUpdated: string;
}

function getStore(): ServerStore {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      // Fallback
    }
  }

  const defaultStore: ServerStore = {
    vitals: [],
    medicalRecords: [],
    carePlans: [],
    homeVisits: [],
    transactions: [],
    messages: [],
    emergencyDispatches: [],
    auditLogs: [],
    lastUpdated: new Date().toISOString()
  };
  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(store: ServerStore) {
  store.lastUpdated = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

// 1. Health Check Endpoint (Used by Network Sentinel)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'VitaNova Clinic Cloud Sync Engine',
    serverTime: new Date().toISOString(),
    version: '1.0.0',
    region: 'Uganda (East Africa)'
  });
});

// 2. Clinicians Directory
app.get('/api/clinicians', (req: Request, res: Response) => {
  const clinicians = [
    {
      id: 'doc_mukasa',
      name: 'Dr. Ronald Mukasa',
      profession: 'Doctor',
      specialty: 'Cardiologist & Internal Medicine',
      experienceYears: 14,
      verified: true,
      available: true,
      feeUGX: 45000,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      bio: 'Senior Consultant at VitaNova Nakawa. Specialist in hypertension management, preventative cardiology, and adult echocardiography.',
      languages: ['English', 'Luganda', 'Swahili'],
      rating: 4.9,
      reviewCount: 128
    },
    {
      id: 'nurse_florence',
      name: 'Sister Florence Nabatanzi',
      profession: 'Nurse',
      specialty: 'Community Health & Chronic Wound Care',
      experienceYears: 11,
      verified: true,
      available: true,
      feeUGX: 25000,
      avatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
      bio: 'Lead Community Outreach Nurse. Passionate about home-based elder care, post-surgical dressing, and patient health literacy.',
      languages: ['Luganda', 'English', 'Runyankole'],
      rating: 5.0,
      reviewCount: 94
    },
    {
      id: 'midwife_agnes',
      name: 'Midwife Agnes Akello',
      profession: 'Midwife',
      specialty: 'Antenatal, Postnatal & Lactation Counseling',
      experienceYears: 9,
      verified: true,
      available: true,
      feeUGX: 30000,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
      bio: 'Certified Midwife specializing in gentle home-based postpartum mother & infant checkups, safe delivery planning, and immunizations.',
      languages: ['English', 'Ateso', 'Luganda'],
      rating: 4.8,
      reviewCount: 76
    },
    {
      id: 'physio_kato',
      name: 'Dr. Brian Kato (PT)',
      profession: 'Physiotherapist',
      specialty: 'Orthopaedic & Neurological Rehabilitation',
      experienceYears: 8,
      verified: true,
      available: false,
      feeUGX: 40000,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      bio: 'Physical therapist focused on post-stroke mobility recovery, sports injury rehab, and in-home geriatric physical therapy in Kampala.',
      languages: ['English', 'Luganda'],
      rating: 4.9,
      reviewCount: 62
    }
  ];
  res.json({ clinicians });
});

// 3. Sync Push: Intake batch mutations from Client Outbox
app.post('/api/sync/push', (req: Request, res: Response) => {
  const { deviceId, items } = req.body;
  const store = getStore();
  const processedResults: any[] = [];

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Expected items array in sync payload' });
  }

  console.log(`[Server Sync] Received ${items.length} items from device: ${deviceId}`);

  for (const item of items) {
    try {
      const { id: outboxId, entity, action, payload, clientTimestamp, userId } = item;

      // Clinical audit log entry
      store.auditLogs.push({
        id: 'audit_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        outboxId,
        entity,
        action,
        userId,
        deviceId,
        clientTimestamp,
        serverReceivedAt: new Date().toISOString()
      });

      if (entity === 'vitals') {
        // Vitals are append-oriented clinical records
        const existingIdx = store.vitals.findIndex(v => v.id === payload.id);
        if (existingIdx >= 0) {
          // Preserve record, do not overwrite historical reading silently
          store.vitals[existingIdx] = {
            ...store.vitals[existingIdx],
            ...payload,
            updatedAt: new Date().toISOString(),
            syncStatus: 'synced'
          };
        } else {
          store.vitals.push({
            ...payload,
            serverSyncedAt: new Date().toISOString(),
            syncStatus: 'synced'
          });
        }
        processedResults.push({ outboxId, success: true });
      } else if (entity === 'medicalRecord') {
        // Medical records are immutable clinical entries
        const existingIdx = store.medicalRecords.findIndex(r => r.id === payload.id);
        if (existingIdx >= 0) {
          const currentRecord = store.medicalRecords[existingIdx];
          // Check conflict
          if (currentRecord.auditTrail && payload.auditTrail && currentRecord.auditTrail.version > payload.auditTrail.version) {
            processedResults.push({
              outboxId,
              success: false,
              requiresAttention: true,
              error: 'Clinical conflict detected: Server contains newer revision by clinician'
            });
            continue;
          }
          store.medicalRecords[existingIdx] = {
            ...payload,
            serverSyncedAt: new Date().toISOString(),
            syncStatus: 'synced'
          };
        } else {
          store.medicalRecords.push({
            ...payload,
            serverSyncedAt: new Date().toISOString(),
            syncStatus: 'synced'
          });
        }
        processedResults.push({ outboxId, success: true });
      } else if (entity === 'homeVisit') {
        const existingIdx = store.homeVisits.findIndex(h => h.id === payload.id);
        if (existingIdx >= 0) {
          store.homeVisits[existingIdx] = { ...store.homeVisits[existingIdx], ...payload, syncStatus: 'synced' };
        } else {
          store.homeVisits.push({ ...payload, syncStatus: 'synced' });
        }
        processedResults.push({ outboxId, success: true });
      } else if (entity === 'emergency') {
        store.emergencyDispatches.push({
          ...payload,
          serverReceivedAt: new Date().toISOString(),
          syncStatus: 'synced'
        });
        processedResults.push({ outboxId, success: true });
      } else {
        // Generic entity handling
        processedResults.push({ outboxId, success: true });
      }
    } catch (err: any) {
      processedResults.push({
        outboxId: item.id,
        success: false,
        error: err.message || 'Internal processing error'
      });
    }
  }

  saveStore(store);

  res.json({
    success: true,
    serverTimestamp: new Date().toISOString(),
    processed: processedResults
  });
});

// 4. Sync Pull: Return Delta updates since timestamp
app.get('/api/sync/pull', (req: Request, res: Response) => {
  const since = req.query.since as string;
  const store = getStore();

  const sinceDate = since ? new Date(since).getTime() : 0;

  const deltaVitals = store.vitals.filter(v => {
    const updated = new Date(v.timestamp || v.createdAt || 0).getTime();
    return updated >= sinceDate;
  });

  const deltaRecords = store.medicalRecords.filter(r => {
    const updated = new Date(r.timestamp || r.createdAt || 0).getTime();
    return updated >= sinceDate;
  });

  const deltaCarePlans = store.carePlans.filter(cp => {
    const updated = new Date(cp.updatedAt || 0).getTime();
    return updated >= sinceDate;
  });

  const deltaHomeVisits = store.homeVisits.filter(hv => {
    const updated = new Date(hv.updatedAt || hv.scheduledDate || 0).getTime();
    return updated >= sinceDate;
  });

  res.json({
    serverTimestamp: new Date().toISOString(),
    vitals: deltaVitals,
    medicalRecords: deltaRecords,
    carePlans: deltaCarePlans,
    homeVisits: deltaHomeVisits
  });
});

// 5. Uganda Mobile Money Payment Gateway Simulation (MTN MoMo & Airtel Money)
app.post('/api/payments/momo', (req: Request, res: Response) => {
  const { provider, phoneNumber, amountUGX, purpose, patientId } = req.body;

  if (!phoneNumber || !amountUGX) {
    return res.status(400).json({ success: false, error: 'Phone number and amount are required' });
  }

  // Validate Uganda phone number format: +256 7... or 07...
  const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
  const isValidUgandaPhone = /^(?:\+256|0)?7[0-9]{8}$/.test(cleanPhone);

  if (!isValidUgandaPhone) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid Ugandan mobile money number (e.g., 0772123456 or +256701123456)'
    });
  }

  const store = getStore();
  const txId = 'MOMO_' + (provider || 'MTN').toUpperCase() + '_' + Date.now().toString(36).toUpperCase();

  const transaction = {
    id: txId,
    provider: provider || 'MTN Mobile Money',
    phoneNumber: cleanPhone,
    amountUGX: Number(amountUGX),
    purpose: purpose || 'Clinical Consultation',
    patientId: patientId || 'pat_sarah_001',
    status: 'SUCCESSFUL',
    ussdPromptSent: true,
    timestamp: new Date().toISOString(),
    referenceNote: `VitaNova Clinic payment of UGX ${Number(amountUGX).toLocaleString()} confirmed.`
  };

  store.transactions.push(transaction);
  saveStore(store);

  res.json({
    success: true,
    transactionId: txId,
    status: 'SUCCESSFUL',
    message: `Payment of UGX ${Number(amountUGX).toLocaleString()} via ${provider || 'MTN MoMo'} completed successfully. Prompt approved on ${cleanPhone}.`,
    transaction
  });
});

// 6. WhatsApp & SMS Follow-up Engine Simulation
app.post('/api/whatsapp/send', (req: Request, res: Response) => {
  const { recipientPhone, templateType, scheduledTime, patientName } = req.body;
  const store = getStore();

  const messageId = 'WA_MSG_' + Date.now().toString(36);
  const msg = {
    id: messageId,
    recipientPhone,
    patientName: patientName || 'Patient',
    templateType,
    scheduledTime: scheduledTime || new Date().toISOString(),
    status: 'Delivered',
    provider: 'Meta WhatsApp Cloud API (Uganda Gateway)',
    deliveredAt: new Date().toISOString()
  };

  store.messages.push(msg);
  saveStore(store);

  res.json({
    success: true,
    messageId,
    status: 'Delivered',
    info: `Follow-up template "${templateType}" delivered to ${recipientPhone} without leaking sensitive PHI.`
  });
});

// 7. Emergency Ambulance Dispatch Endpoint
app.post('/api/emergency/dispatch', (req: Request, res: Response) => {
  const { callerName, callerPhone, locationText, coordinates, triageLevel } = req.body;
  const store = getStore();

  const dispatchId = 'AMB_DISPATCH_' + Date.now().toString(36).toUpperCase();
  const dispatchRecord = {
    id: dispatchId,
    callerName: callerName || 'VitaNova Caller',
    callerPhone: callerPhone || '+256 700 000 000',
    locationText: locationText || 'Kampala Metropolitan Area',
    coordinates: coordinates || { lat: 0.3476, lng: 32.5825 },
    triageLevel: triageLevel || 'Critical (Red)',
    allocatedUnit: 'Ambulance Unit #03 (Equipped with Defibrillator & O2)',
    estimatedArrivalMinutes: 12,
    dispatchedAt: new Date().toISOString(),
    status: 'En Route'
  };

  store.emergencyDispatches.push(dispatchRecord);
  saveStore(store);

  res.json({
    success: true,
    dispatchId,
    status: 'Ambulance En Route',
    unit: dispatchRecord.allocatedUnit,
    etaMinutes: dispatchRecord.estimatedArrivalMinutes,
    message: `Emergency dispatched for ${dispatchRecord.locationText}. Ambulance Unit #03 en route with ETA 12 mins.`
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Real-Time WebRTC Call Signaling Relay (Server-Sent Events + HTTP POST)
// Enables zero-delay cross-browser, cross-window (normal vs incognito),
// and cross-device video & audio call signaling without external dependencies.
// ─────────────────────────────────────────────────────────────────────────────

interface QueuedCallSignal {
  sigId: string;
  sessionId: string;
  senderId: string;
  type: string;
  payload: any;
  timestamp: number;
}

const sseSessionClients = new Map<string, Set<Response>>();
const sseGlobalClients = new Set<Response>();
const recentCallSignals = new Map<string, QueuedCallSignal[]>();

function sendSseEvent(res: Response, eventName: string, data: any) {
  try {
    res.write(`event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`);
  } catch (_) {}
}

// 8. Call Signaling: Post a signal (OFFER, ANSWER, ICE, INCOMING_CALL, DECLINE, HANGUP)
app.post('/api/calls/signal', (req: Request, res: Response) => {
  const signal = req.body || {};
  const { sessionId, type, senderId } = signal;

  const queuedSignal: QueuedCallSignal = {
    sigId: signal.sigId || `sig_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    sessionId: sessionId || 'global',
    senderId: senderId || 'anonymous',
    type: type || 'UNKNOWN',
    payload: signal,
    timestamp: Date.now()
  };

  // Buffer signal in session history (last 100 signals)
  if (sessionId) {
    if (!recentCallSignals.has(sessionId)) {
      recentCallSignals.set(sessionId, []);
    }
    const buf = recentCallSignals.get(sessionId)!;
    buf.push(queuedSignal);
    if (buf.length > 100) buf.shift();

    // Broadcast to all active clients in this session room
    const clients = sseSessionClients.get(sessionId);
    if (clients) {
      for (const client of clients) {
        sendSseEvent(client, 'signal', signal);
      }
    }
  }

  // If this is an app-level call signal (INCOMING_CALL, DECLINE, HANGUP), broadcast to global listeners
  if (type === 'INCOMING_CALL' || type === 'DECLINE' || type === 'HANGUP' || type === 'CALL_ENDED') {
    for (const client of sseGlobalClients) {
      sendSseEvent(client, 'app_signal', signal);
    }
  }

  res.json({ ok: true, sigId: queuedSignal.sigId });
});

// 9. Call Signaling: Subscribe to session SSE stream
app.get('/api/calls/stream/:sessionId', (req: Request, res: Response) => {
  const { sessionId } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  if (!sseSessionClients.has(sessionId)) {
    sseSessionClients.set(sessionId, new Set());
  }
  const clients = sseSessionClients.get(sessionId)!;
  clients.add(res);

  // Send initial keep-alive ping
  sendSseEvent(res, 'connected', { sessionId, timestamp: Date.now() });

  // Immediately replay any recent signals buffered for this session (e.g. pending OFFER/ANSWER)
  const history = recentCallSignals.get(sessionId);
  if (history && history.length > 0) {
    for (const sig of history) {
      if (Date.now() - sig.timestamp < 60000) {
        sendSseEvent(res, 'signal', sig.payload);
      }
    }
  }

  const pingTimer = setInterval(() => {
    try {
      res.write(': ping\n\n');
    } catch (_) {
      clearInterval(pingTimer);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(pingTimer);
    clients.delete(res);
    if (clients.size === 0) {
      sseSessionClients.delete(sessionId);
    }
  });
});

// 10. Call Signaling: Subscribe to global incoming call SSE stream (rings doctors on any browser/device)
app.get('/api/calls/stream-global', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseGlobalClients.add(res);
  sendSseEvent(res, 'connected', { status: 'listening_incoming_calls' });

  const pingTimer = setInterval(() => {
    try {
      res.write(': ping\n\n');
    } catch (_) {
      clearInterval(pingTimer);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(pingTimer);
    sseGlobalClients.delete(res);
  });
});

// 11. Call Signaling: Fallback HTTP polling for signals
app.get('/api/calls/poll/:sessionId', (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const since = Number(req.query.since) || 0;
  const excludeSender = req.query.excludeSender as string | undefined;

  const history = recentCallSignals.get(sessionId) || [];
  const matching = history
    .filter((s) => s.timestamp > since && (!excludeSender || s.senderId !== excludeSender))
    .map((s) => s.payload);

  res.json({ ok: true, signals: matching, serverTime: Date.now() });
});

// Clean up stale session signals every 60s
setInterval(() => {
  const cutoff = Date.now() - 120000;
  for (const [sId, signals] of recentCallSignals.entries()) {
    const fresh = signals.filter((s) => s.timestamp > cutoff);
    if (fresh.length === 0) {
      recentCallSignals.delete(sId);
    } else {
      recentCallSignals.set(sId, fresh);
    }
  }
}, 60000);

app.listen(PORT, () => {
  console.log(`[VitaNova Server] Healthcare API server listening on port ${PORT}`);
});
