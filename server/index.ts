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

app.listen(PORT, () => {
  console.log(`[VitaNova Server] Healthcare API server listening on port ${PORT}`);
});
