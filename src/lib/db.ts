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

  // 6. Health Education Video Talks Library (Pre-cached for offline video study)
  const sampleEducation: HealthEducationArticle[] = [
    {
      id: 'edu_htn_01',
      title: 'High Blood Pressure (Hypertension) in Uganda: Causes, Lifestyle & Treatment',
      diseaseName: 'Hypertension (High Blood Pressure)',
      category: 'Chronic Disease',
      summary: 'Dr. Ronald Mukasa breaks down why blood pressure rises, hidden salt in local foods, how to protect your kidneys and heart, and effective modern medication.',
      videoDuration: '8:45',
      speakerName: 'Dr. Ronald Mukasa',
      speakerRole: 'Consultant Cardiologist & Physician',
      speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      videoThumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      talkContent: {
        overview: 'Hypertension is the "silent killer" that affects over 25% of adults in Uganda. Because it rarely presents severe symptoms initially, many people live with dangerous arterial pressure unaware until a stroke or heart attack occurs.',
        causes: [
          'High dietary sodium intake (excessive cooking salt, Royco cubes, processed snacks)',
          'Genetics and family history of cardiovascular disease',
          'Physical inactivity and sedentary urban lifestyle in Kampala',
          'Chronic psychological stress and lack of restorative sleep',
          'Excess body weight and arterial stiffness as we age'
        ],
        symptoms: [
          'Frequent dull morning headaches at the back of the head',
          'Occasional dizziness, unsteadiness, or feeling lightheaded',
          'Heart palpitations or rapid pounding sensation in chest',
          'Blurred vision or seeing dark spots in advanced elevation',
          'Shortness of breath on mild physical exertion'
        ],
        prevention: [
          'Cut cooking salt: flavor foods with natural garlic, ginger, rosemary, and lemon juice',
          'Eat potassium-rich local foods: steamed matooke, avocado, watermelon, dodo, and sweet potatoes',
          'Walk briskly for 30 minutes at least 5 days a week',
          'Maintain a healthy body weight and practice stress-reduction techniques',
          'Get your blood pressure screened at least once every month at a local clinic'
        ],
        treatment: [
          'First-line antihypertensive medications: Calcium Channel Blockers (e.g. Amlodipine 5mg - 10mg)',
          'ACE inhibitors or ARBs (e.g. Lisinopril, Telmisartan) to shield kidney function',
          'Daily home blood pressure monitoring logged directly in the VitaNova app',
          'Regular kidney and cardiac function blood tests every 6 months',
          'Consistent medication compliance without abrupt cessation'
        ],
        whenToSeekEmergency: 'If systolic blood pressure exceeds 180 mmHg or diastolic exceeds 110 mmHg, especially if accompanied by chest pressure, speech difficulty, or severe headache, call 999 or proceed to VitaNova Emergency Ward immediately.'
      }
    },
    {
      id: 'edu_dia_02',
      title: 'Type 2 Diabetes Mellitus: Blood Sugar Spikes, Diet & Insulin Management',
      diseaseName: 'Type 2 Diabetes Mellitus',
      category: 'Chronic Disease',
      summary: 'Learn the root cause of insulin resistance, how refined carbohydrates spike glucose, foot care, and how to keep HbA1c under 7.0%.',
      videoDuration: '10:15',
      speakerName: 'Dr. Ronald Mukasa',
      speakerRole: 'Consultant Cardiologist & Physician',
      speakerAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      videoThumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      talkContent: {
        overview: 'Diabetes Mellitus occurs when the pancreas either cannot produce enough insulin or body cells become resistant to insulin, leading to elevated glucose levels that damage blood vessels, nerves, and kidneys.',
        causes: [
          'Insulin resistance triggered by abdominal visceral fat accumulation',
          'Excessive intake of refined starches: white posho, sugar-sweetened sodas, white rice, white bread',
          'Sedentary lifestyle reducing cellular glucose uptake in skeletal muscle',
          'Strong genetic predisposition in East African families'
        ],
        symptoms: [
          'Excessive thirst (polydipsia) and drinking gallons of water daily',
          'Frequent urination (polyuria), especially waking multiple times at night',
          'Unexplained weight loss despite constant ravenous hunger',
          'Persistent fatigue, low energy, and sluggishness after eating',
          'Slow-healing cuts, recurrent skin boils, or numbness in toes'
        ],
        prevention: [
          'Replace refined white posho with whole millet, sorghum, and brown rice',
          'Fill half your plate with non-starchy leafy greens (sukuma wiki, nakati, cabbage, spinach)',
          'Eliminate sodas and energy drinks; drink clean water or unsweetened lemon tea',
          'Perform post-meal 15-minute walks to immediately absorb blood glucose into muscles'
        ],
        treatment: [
          'Oral biguanides: Metformin 500mg - 1000mg with meals to improve insulin sensitivity',
          'Sulfonylureas or SGLT2 inhibitors as prescribed by your VitaNova physician',
          'Insulin therapy for poorly controlled or late-stage diabetes',
          'Daily glucose tracking (fasting target: 4.0 - 6.5 mmol/L, post-meal < 8.5 mmol/L)',
          'Daily diabetic foot inspections to prevent diabetic foot ulcers and gangrene'
        ],
        whenToSeekEmergency: 'Seek immediate hospitalization if experiencing confusion, fruity acetone breath odor, extreme dehydration, or blood glucose readings exceeding 20.0 mmol/L (risk of Diabetic Ketoacidosis / HHS).'
      }
    },
    {
      id: 'edu_mal_03',
      title: 'Malaria in Uganda: Plasmodium Biology, Rapid Testing & ACT Treatment',
      diseaseName: 'Severe & Uncomplicated Malaria',
      category: 'Infectious Diseases',
      summary: 'Dr. Peter Kigozi explains mosquito transmission, rapid diagnostic testing (RDT), why early treatment prevents cerebral malaria, and bed net safety.',
      videoDuration: '7:20',
      speakerName: 'Dr. Peter Kigozi',
      speakerRole: 'Clinical Pathologist',
      speakerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      videoThumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      talkContent: {
        overview: 'Malaria is caused by Plasmodium falciparum parasites transmitted through the bites of infected female Anopheles mosquitoes. It remains a leading health challenge in Uganda, particularly for pregnant mothers and children under five.',
        causes: [
          'Bite of female Anopheles mosquito active predominantly between dusk and dawn',
          'Stagnant water pools, unemptied tins, and unkempt bushes near residences fostering mosquito breeding',
          'Failure to sleep under insecticide-treated mosquito nets (ITNs)'
        ],
        symptoms: [
          'High fever characterized by alternating shivering chills and profuse drenching sweats',
          'Severe generalized body aches, joint stiffness, and deep muscular pain',
          'Pounding headache, nausea, vomiting, and loss of appetite',
          'Extreme weakness and dizziness due to destruction of red blood cells'
        ],
        prevention: [
          'Sleep under an LLIN (Long-Lasting Insecticidal Net) every single night',
          'Clear stagnant water, tin cans, and overgrown grass within 50 meters of your dwelling',
          'Install wire mosquito mesh on bedroom windows and vents',
          'Take prescribed Intermittent Preventive Treatment in pregnancy (IPTp with Fansidar)'
        ],
        treatment: [
          'Confirmed diagnosis using Rapid Diagnostic Test (RDT) or Blood Smear Microscopy first',
          'First-line: Artemisinin-based Combination Therapy (ACT) e.g., Artemether-Lumefantrine (Coartem) full 3-day course with fatty food or milk',
          'Intravenous Artesunate for severe or cerebral malaria with hospital admission',
          'Paracetamol for fever relief and oral rehydration salts for electrolyte replenishment'
        ],
        whenToSeekEmergency: 'Immediate emergency transfer is required if a child or patient experiences convulsions, severe vomiting of all medicines, yellow eyes (jaundice), tea-colored urine, or loss of consciousness.'
      }
    },
    {
      id: 'edu_mat_04',
      title: 'Maternal Antenatal Care, Danger Signs in Pregnancy & Safe Delivery',
      diseaseName: 'Maternal Health & Pre-Eclampsia',
      category: 'Maternal Health',
      summary: 'Midwife Agnes Akello guides expectant mothers on the 8 essential ANC contacts, identifying pre-eclampsia danger signs, nutrition, and birth preparedness.',
      videoDuration: '9:10',
      speakerName: 'Midwife Agnes Akello',
      speakerRole: 'Antenatal & Postnatal Midwife',
      speakerAvatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
      videoThumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      isDownloaded: true,
      downloadedAt: new Date().toISOString(),
      talkContent: {
        overview: 'Pregnancy is a sacred journey that requires proactive clinical monitoring. Attending comprehensive Antenatal Care (ANC) prevents life-threatening complications including maternal haemorrhage, pre-eclampsia, and neonatal infections.',
        causes: [
          'Pre-eclampsia: abnormal placental vascular development causing systemic maternal hypertension and proteinuria',
          'Maternal anaemia: iron and folate deficiency combined with parasitic or malaria load',
          'Obstructed labor: cephalopelvic disproportion or abnormal fetal lie requiring surgical delivery'
        ],
        symptoms: [
          'Sudden swelling (edema) of face, eyelids, fingers, and feet',
          'Persistent throbbing headache and seeing flashing spots or blurry vision (pre-eclampsia warning)',
          'Epigastric or right upper quadrant abdominal pain under the ribs',
          'Vaginal bleeding or watery fluid leakage before expected due date',
          'Marked reduction or cessation of baby kicks and movements'
        ],
        prevention: [
          'Attend at least 8 scheduled ANC appointments starting in the first trimester',
          'Take daily Iron and Folic Acid supplements (IFA) throughout pregnancy',
          'Sleep under an insecticide-treated mosquito net and receive IPTp malaria doses',
          'Prepare a "Mama Kit" and emergency transportation plan before 32 weeks'
        ],
        treatment: [
          'Regular blood pressure and urine protein monitoring at every ANC visit',
          'Antihypertensive therapy (Methyldopa or Labetalol) under obstetric supervision',
          'Magnesium Sulphate intravenous infusion for seizure prevention in severe pre-eclampsia',
          'Safe facility-based delivery by certified midwives or obstetricians'
        ],
        whenToSeekEmergency: 'Vaginal bleeding, convulsions, intense headache, fever, or water breaking before labor begins are critical emergencies. Call VitaNova 24/7 Maternal Line at +256 800 200 999.'
      }
    },
    {
      id: 'edu_pne_05',
      title: 'Pediatric Pneumonia & High Fevers: Early Recognition & Home Triage',
      diseaseName: 'Pediatric Respiratory Infections & Pneumonia',
      category: 'Child Health',
      summary: 'Sister Florence Nabatanzi demonstrates how to count child breathing rates, recognize chest indrawing, manage fevers safely, and avoid dangerous cold baths.',
      videoDuration: '6:50',
      speakerName: 'Sister Florence Nabatanzi',
      speakerRole: 'Senior Community Health Nurse',
      speakerAvatar: 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
      videoThumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      isDownloaded: false,
      talkContent: {
        overview: 'Pneumonia is an acute respiratory infection affecting the lungs in young children. Early detection of fast breathing and chest indrawing saves lives before respiratory failure develops.',
        causes: [
          'Bacterial pathogens (Streptococcus pneumoniae, Haemophilus influenzae type b)',
          'Respiratory viral infections (RSV, influenza) complicated by secondary infection',
          'Indoor air pollution from charcoal stoves, firewood smoke, and crowded sleeping quarters'
        ],
        symptoms: [
          'Fast breathing: >50 breaths/min in infants (2-11 mos), >40 breaths/min in children (1-5 yrs)',
          'Lower chest wall indrawing (chest sucks inward when breathing in)',
          'Stridor or grunting sound when the child exhales',
          'High fever (>38.5°C), persistent cough, poor feeding, and lethargy'
        ],
        prevention: [
          'Ensure complete childhood immunization: PCV (Pneumococcal) and Pentavalent vaccines',
          'Exclusive breastfeeding for the first 6 months to provide maternal antibodies',
          'Cook in well-ventilated areas away from children; avoid indoor charcoal smoke'
        ],
        treatment: [
          'Oral Amoxicillin dispersible tablets as prescribed by a health worker',
          'Supportive oxygen therapy and nebulization for severe breathing distress in hospital',
          'Tepid sponge bathing with lukewarm water (never ice-cold water) and pediatric paracetamol for high fever'
        ],
        whenToSeekEmergency: 'Take the child to hospital immediately if the child cannot breastfeed or drink, vomits everything, has convulsions, or shows bluish discoloration of lips (cyanosis).'
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
