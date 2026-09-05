import Dexie, { Table } from 'dexie';
import {
  PatientProfile,
  VitalRecord,
  MedicalRecordEntry,
  CarePlan,
  HomeCareRequest,
  HealthEducationArticle,
  FamilyMember,
  SyncOutboxItem,
  WatchTelemetry,
  EmergencyAction
} from '../types';

export class VitaNovaDB extends Dexie {
  patients!: Table<PatientProfile, string>;
  vitals!: Table<VitalRecord, string>;
  medicalRecords!: Table<MedicalRecordEntry, string>;
  carePlans!: Table<CarePlan, string>;
  homeVisits!: Table<HomeCareRequest, string>;
  healthEducation!: Table<HealthEducationArticle, string>;
  familyMembers!: Table<FamilyMember, string>;
  syncOutbox!: Table<SyncOutboxItem, string>;
  watchTelemetry!: Table<WatchTelemetry, string>;
  emergencyRequests!: Table<EmergencyAction, string>;
  appSettings!: Table<{ key: string; value: any }, string>;

  constructor() {
    super('VitaNovaClinicDB');

    this.version(1).stores({
      patients: 'id, fullName, phone, syncStatus',
      vitals: 'id, patientId, timestamp, syncStatus, isConflict',
      medicalRecords: 'id, patientId, category, timestamp, syncStatus',
      carePlans: 'id, patientId, condition, syncStatus',
      homeVisits: 'id, patientId, serviceType, scheduledDate, status, syncStatus',
      healthEducation: 'id, category, isDownloaded',
      familyMembers: 'id, relation, syncStatus',
      syncOutbox: 'id, entity, action, status, clientTimestamp',
      watchTelemetry: 'id, deviceId',
      emergencyRequests: 'id, timestamp, syncStatus',
      appSettings: 'key'
    });
  }
}

export const db = new VitaNovaDB();

// Get unique device ID or generate one
export function getDeviceId(): string {
  let deviceId = localStorage.getItem('vitanova_device_id');
  if (!deviceId) {
    deviceId = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('vitanova_device_id', deviceId);
  }
  return deviceId;
}

// Seed realistic initial clinical data for Uganda offline-first experience
export async function seedInitialDataIfEmpty() {
  const patientCount = await db.patients.count();
  if (patientCount > 0) return;

  const deviceId = getDeviceId();
  const now = new Date();

  // 1. Primary Demo Patient: Sarah Namubiru (Kampala, Uganda)
  const initialPatient: PatientProfile = {
    id: 'pat_sarah_001',
    fullName: 'Sarah Namubiru',
    dateOfBirth: '1992-04-18',
    sex: 'Female',
    phone: '+256 772 458 912',
    email: 'sarah.namubiru@health.ug',
    location: 'Nakawa Division, Kampala, Uganda',
    emergencyContact: {
      name: 'Christine Namubiru',
      relationship: 'Mother',
      phone: '+256 701 893 214'
    },
    bloodGroup: 'O+',
    allergies: ['Penicillin G', 'Sulfa Antibiotics'],
    medicalConditions: ['Stage 1 Essential Hypertension', 'Mild Exercise-induced Bronchospasm'],
    currentMedications: ['Amlodipine 5mg Daily', 'Salbutamol Inhaler PRN'],
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    consentGiven: true,
    membershipPlanId: 'plan_family_01',
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    syncStatus: 'synced'
  };

  await db.patients.add(initialPatient);

  // 2. Realistic Vitals Timeline (Showing BP, Glucose, HR trends)
  const sampleVitals: VitalRecord[] = [
    {
      id: 'vit_001',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 30 * 86400000).toISOString(),
      systolicBP: 142,
      diastolicBP: 92,
      heartRate: 78,
      bloodGlucose: 5.6,
      glucoseType: 'fasting',
      temperature: 36.6,
      weight: 68.5,
      respiratoryRate: 16,
      spO2: 98,
      notes: 'Initial evaluation at VitaNova Nakawa Clinic. Mild cephalalgia.',
      recordedBy: 'Dr. Ronald Mukasa',
      recordedByRole: 'doctor',
      deviceId: 'clinic_kpl_terminal_01',
      syncStatus: 'synced'
    },
    {
      id: 'vit_002',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 14 * 86400000).toISOString(),
      systolicBP: 136,
      diastolicBP: 88,
      heartRate: 74,
      bloodGlucose: 5.3,
      glucoseType: 'fasting',
      temperature: 36.7,
      weight: 68.0,
      respiratoryRate: 15,
      spO2: 99,
      notes: 'Follow-up home visit. Medication adherence confirmed.',
      recordedBy: 'Sister Florence Nabatanzi',
      recordedByRole: 'nurse',
      deviceId: 'nurse_tablet_ug_04',
      syncStatus: 'synced'
    },
    {
      id: 'vit_003',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
      systolicBP: 130,
      diastolicBP: 84,
      heartRate: 72,
      bloodGlucose: 5.1,
      glucoseType: 'random',
      temperature: 36.5,
      weight: 67.8,
      respiratoryRate: 16,
      spO2: 99,
      notes: 'Self-monitoring at home using Omron cuff. Feeling energized.',
      recordedBy: 'Sarah Namubiru',
      recordedByRole: 'patient',
      deviceId,
      syncStatus: 'synced'
    },
    {
      id: 'vit_004',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
      systolicBP: 128,
      diastolicBP: 82,
      heartRate: 70,
      bloodGlucose: 5.2,
      glucoseType: 'fasting',
      temperature: 36.6,
      weight: 67.5,
      respiratoryRate: 15,
      spO2: 99,
      notes: 'Morning reading before breakfast. Optimal target achieved.',
      recordedBy: 'Sarah Namubiru',
      recordedByRole: 'patient',
      deviceId,
      syncStatus: 'synced'
    }
  ];

  await db.vitals.bulkAdd(sampleVitals);

  // 3. Electronic Medical Records (EMR Timeline)
  const sampleRecords: MedicalRecordEntry[] = [
    {
      id: 'emr_001',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 30 * 86400000).toISOString(),
      category: 'consultation',
      title: 'Comprehensive Cardiovascular Assessment',
      description: 'Patient presented for routine screening and occasional headache. Blood pressure noted at 142/92. Commenced on Amlodipine 5mg OD with DASH diet counseling. Recheck scheduled.',
      doctorName: 'Dr. Ronald Mukasa',
      doctorRole: 'Consultant Cardiologist',
      doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      clinicBranch: 'VitaNova Main Clinic, Nakawa Kampala',
      syncStatus: 'synced',
      auditTrail: {
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        author: 'Dr. Ronald Mukasa (Reg #UMDPC/4192)',
        device: 'terminal-nakawa-01',
        version: 1
      }
    },
    {
      id: 'emr_002',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 25 * 86400000).toISOString(),
      category: 'lab',
      title: 'Lipid Profile & Renal Function Panel',
      description: 'Serum Creatinine: 72 umol/L (Normal), eGFR: >90 mL/min, Total Cholesterol: 4.8 mmol/L, Fasting Blood Glucose: 5.4 mmol/L. Electrolytes within normal limits.',
      doctorName: 'Dr. Peter Kigozi',
      doctorRole: 'Clinical Pathologist',
      doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      clinicBranch: 'VitaNova Central Pathology Laboratory',
      syncStatus: 'synced',
      auditTrail: {
        createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
        author: 'Dr. Peter Kigozi',
        device: 'lab-sys-09',
        version: 1
      }
    },
    {
      id: 'emr_003',
      patientId: 'pat_sarah_001',
      timestamp: new Date(Date.now() - 14 * 86400000).toISOString(),
      category: 'consultation',
      title: 'Community Nursing Home Visit & Education',
      description: 'Conducted home assessment in Nakawa. Verified medication storage and adherence. Demonstrated self-monitoring technique with digital sphygmomanometer. Sodium restriction reinforced.',
      doctorName: 'Sister Florence Nabatanzi',
      doctorRole: 'Senior Community Health Nurse',
      doctorAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
      clinicBranch: 'VitaNova Mobile Community Outreach',
      syncStatus: 'synced',
      auditTrail: {
        createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        author: 'Sister Florence Nabatanzi',
        device: 'nurse_tablet_ug_04',
        version: 1
      }
    }
  ];

  await db.medicalRecords.bulkAdd(sampleRecords);

  // 4. Chronic Care Plan
  const hypertensionCarePlan: CarePlan = {
    id: 'cp_htn_001',
    patientId: 'pat_sarah_001',
    condition: 'Hypertension',
    title: 'Hypertension Wellness & Blood Pressure Control Plan',
    goals: [
      'Maintain resting BP consistently below 130/80 mmHg',
      'Daily 30-minute moderate walking along Kampala green trails',
      'Reduce dietary sodium intake to under 2,000 mg/day',
      '100% medication adherence logged via VitaCare reminder'
    ],
    monitoringSchedule: 'Twice weekly morning BP & weekly random glucose recording',
    prescribedMedications: [
      {
        name: 'Amlodipine Besylate',
        dosage: '5mg',
        frequency: 'Once daily at 08:00 AM',
        adherencePercentage: 96
      }
    ],
    careTeam: [
      {
        name: 'Dr. Ronald Mukasa',
        role: 'Supervising Cardiologist',
        phone: '+256 702 110 334',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Sister Florence Nabatanzi',
        role: 'Home Care Nurse',
        phone: '+256 774 229 881',
        avatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80'
      }
    ],
    nextReviewDate: '2026-09-20',
    targetMetrics: [
      { metric: 'Systolic BP', target: '< 130 mmHg', current: '128 mmHg' },
      { metric: 'Diastolic BP', target: '< 80 mmHg', current: '82 mmHg' },
      { metric: 'Fasting Glucose', target: '4.0 - 5.8 mmol/L', current: '5.2 mmol/L' }
    ],
    syncStatus: 'synced'
  };

  await db.carePlans.add(hypertensionCarePlan);

  // 5. Home Care Requests
  const sampleHomeVisits: HomeCareRequest[] = [
    {
      id: 'hcr_001',
      patientId: 'pat_sarah_001',
      patientName: 'Sarah Namubiru',
      serviceType: 'Nursing',
      address: 'Plot 14, Ntinda-Nakawa Road, Kampala',
      scheduledDate: '2026-09-10 10:00 AM',
      status: 'confirmed',
      assignedWorkerId: 'hw_florence_01',
      assignedWorkerName: 'Sister Florence Nabatanzi',
      assignedWorkerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
      clinicalNotes: 'Scheduled follow-up for vital check, medication reconciliation, and stress management coaching.',
      syncStatus: 'synced'
    },
    {
      id: 'hcr_002',
      patientId: 'pat_sarah_001',
      patientName: 'Christine Namubiru (Mother)',
      serviceType: 'Physiotherapy',
      address: 'Plot 14, Ntinda-Nakawa Road, Kampala',
      scheduledDate: '2026-09-15 02:00 PM',
      status: 'confirmed',
      assignedWorkerId: 'hw_kato_physio',
      assignedWorkerName: 'Dr. Brian Kato (PT)',
      assignedWorkerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      clinicalNotes: 'Post-fall knee joint mobility exercises and gentle resistance training.',
      syncStatus: 'synced'
    }
  ];

  await db.homeVisits.bulkAdd(sampleHomeVisits);

  // 6. Health Education Articles (Pre-cached for offline study)
  const sampleEducation: HealthEducationArticle[] = [
    {
      id: 'edu_htn_01',
      title: 'Managing High Blood Pressure at Home in Uganda',
      category: 'Chronic Disease',
      summary: 'Practical tips on local Ugandan diet modifications, reducing salt in matooke and luwombo, and monitoring your blood pressure accurately.',
      readTimeMinutes: 5,
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      videoDuration: '4:20',
      articleContent: {
        simpleExplanation: 'Hypertension occurs when the pressure of blood pushing against the walls of your blood vessels is consistently too high. It often has no obvious symptoms ("silent killer"), but damages the heart and kidneys over time.',
        symptoms: ['Morning headaches', 'Occasional dizzy spells', 'Blurred vision in severe cases', 'Shortness of breath on exertion'],
        riskFactors: ['High salt intake', 'Lack of regular physical activity', 'Family history', 'High stress levels', 'Excess body weight'],
        prevention: [
          'Use natural spices (garlic, ginger, coriander) instead of salt cubes or excessive table salt',
          'Enjoy fresh local fruits like pawpaw, avocado, and watermelon which are rich in potassium',
          'Walk briskly for at least 30 minutes 5 days a week',
          'Take prescribed medications regularly without skipping doses'
        ],
        warningSigns: ['Severe pounding headache', 'Chest tightness or radiating pain', 'Sudden numbness or facial weakness', 'Difficulty breathing'],
        whenToSeekCare: 'If your blood pressure reading exceeds 180/110 mmHg, or if high readings are accompanied by chest pain or vision changes, seek emergency care at VitaNova Clinic immediately.'
      }
    },
    {
      id: 'edu_mat_02',
      title: 'Essential Maternal Health & Safe Antenatal Care',
      category: 'Maternal Health',
      summary: 'A complete guide for expectant mothers in Uganda covering nutrition, required ANC visits, malaria prevention, and birth preparedness.',
      readTimeMinutes: 6,
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      videoDuration: '6:15',
      articleContent: {
        simpleExplanation: 'Antenatal care (ANC) is crucial for monitoring both maternal and fetal well-being. Attending at least 8 contacts during pregnancy prevents complications like pre-eclampsia and anaemia.',
        symptoms: ['Normal pregnancy signs: mild nausea, breast tenderness, fatigue'],
        riskFactors: ['Pre-existing anaemia', 'Malaria infection during pregnancy', 'High maternal age or teenage pregnancy'],
        prevention: [
          'Sleep under an insecticide-treated mosquito net (ITN) every night',
          'Take daily iron and folic acid supplements as prescribed',
          'Eat iron-rich foods: leafy greens (dodo, nakati), beans, and lean meat',
          'Attend all scheduled ANC visits at your local clinic'
        ],
        warningSigns: ['Vaginal bleeding at any stage', 'Severe persistent headache or blurred vision', 'Decreased fetal movements', 'Swelling of face and hands'],
        whenToSeekCare: 'Immediately report to VitaNova or dial our 24/7 maternal helpline at +256 800 200 999.'
      }
    },
    {
      id: 'edu_fa_03',
      title: 'First Aid for Choking & Pediatric Fevers',
      category: 'First Aid',
      summary: 'Step-by-step life saving actions for managing choking in infants and safely handling sudden high fevers in young children.',
      readTimeMinutes: 4,
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      videoDuration: '3:45',
      articleContent: {
        simpleExplanation: 'High fevers in children under 5 can trigger febrile convulsions. Understanding tepid sponging and correct paracetamol dosing protects your child.',
        symptoms: ['Body temperature > 38.0°C', 'Flushed cheeks', 'Irritability or lethargy', 'Poor feeding'],
        riskFactors: ['Viral respiratory infections', 'Malaria', 'Teething mild elevation', 'Over-wrapping in blankets'],
        prevention: [
          'Dress child in light, breathable cotton clothes',
          'Offer frequent sips of clean water, breastmilk, or oral rehydration salts',
          'Use lukewarm water (never cold ice water) on a washcloth for gentle sponge bathing'
        ],
        warningSigns: ['Inability to drink or breastfeed', 'Vomiting everything', 'Stiff neck or continuous convulsions', 'Lethargy or loss of consciousness'],
        whenToSeekCare: 'Do not delay: take the child to the nearest healthcare facility or call VitaNova emergency dispatch.'
      }
    }
  ];

  await db.healthEducation.bulkAdd(sampleEducation);

  // 7. Family Members
  const sampleFamily: FamilyMember[] = [
    {
      id: 'fam_001',
      fullName: 'Christine Namubiru',
      relation: 'Mother',
      dateOfBirth: '1965-08-12',
      bloodGroup: 'O+',
      chronicConditions: ['Osteoarthritis (Knee)'],
      hasAuthorizedAccess: true,
      syncStatus: 'synced'
    },
    {
      id: 'fam_002',
      fullName: 'David Kato',
      relation: 'Child',
      dateOfBirth: '2020-11-04',
      bloodGroup: 'B+',
      chronicConditions: [],
      hasAuthorizedAccess: true,
      syncStatus: 'synced'
    }
  ];

  await db.familyMembers.bulkAdd(sampleFamily);

  // 8. Simulated Smart Watch Telemetry
  const sampleWatch: WatchTelemetry = {
    id: 'watch_001',
    deviceId: 'vitanova_ble_pulse_994',
    deviceName: 'VitaNova CareWatch Pro',
    connected: true,
    batteryLevel: 84,
    heartRateCurrent: 71,
    stepsToday: 6842,
    sleepHours: 7.4,
    spO2Current: 99,
    lastSyncedLocal: new Date().toISOString()
  };

  await db.watchTelemetry.add(sampleWatch);

  console.log('[VitaNova DB] Initial clinical seed data populated successfully into IndexedDB.');
}
