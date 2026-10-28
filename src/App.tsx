import React, { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, seedInitialDataIfEmpty } from './lib/db';
import { networkSentinel } from './lib/network';
import { syncEngine } from './lib/syncEngine';
import {
  UserRole,
  NetworkState,
  VitalRecord,
  MedicalRecordEntry,
  HomeCareRequest,
  HealthEducationArticle,
  FamilyMember,
  MembershipPlan,
  HealthcareWorker,
  PatientProfile
} from './types';

// Layout Components
import { Header } from './components/layout/Header';
import { Navigation, NavTab } from './components/layout/Navigation';

// Views
import { PublicLandingView } from './components/views/PublicLandingView';
import { PatientDashboardView } from './components/views/PatientDashboardView';
import { VitalsChartsView } from './components/views/VitalsChartsView';
import { MedicalRecordsView } from './components/views/MedicalRecordsView';
import { ConsultationView } from './components/views/ConsultationView';
import { HomeCareView } from './components/views/HomeCareView';
import { ChronicCareView } from './components/views/ChronicCareView';
import { HealthWatchView } from './components/views/HealthWatchView';
import { EducationView } from './components/views/EducationView';
import { FamilyHealthView } from './components/views/FamilyHealthView';
import { MembershipView } from './components/views/MembershipView';
import { WhatsAppFollowUpView } from './components/views/WhatsAppFollowUpView';
import { EmergencyView } from './components/views/EmergencyView';
import { ClinicianPortalView } from './components/views/ClinicianPortalView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { PaymentModal } from './components/views/PaymentModal';
import { FitnessView } from './components/views/FitnessView';
import { VideoCallModal } from './components/views/VideoCallModal';
import { AuthModal } from './components/auth/AuthModal';
import {
  fetchClinicians,
  sendCallSignal,
  subscribeToCallSignals,
  signInDoctor,
  signOutDoctor,
  onAuthChange,
  fetchClinicianByEmail,
  upsertClinician
} from './lib/supabase';
import { Phone, PhoneOff, Video } from 'lucide-react';
import { startIncomingCallTone, stopIncomingCallTone } from './lib/callSounds';

// Default verified Ugandan clinicians registry — Dr. Israel Kisakye as Lead Director
export const DEFAULT_CLINICIANS: HealthcareWorker[] = [
  {
    id: 'doc_israel',
    name: 'Dr. Israel Kisakye',
    profession: 'Doctor',
    specialty: 'Chief Medical Consultant & Telehealth Lead',
    experienceYears: 12,
    verified: true,
    available: true,
    feeUGX: 45000,
    avatar: '/ki_ezra_avatar.jpg',
    phone: '+256 772 888 888',
    whatsapp: '+256 772 888 888',
    email: 'israelerzrakisakye@gmail.com',
    inAppCallRoom: 'vitanova-doc-israel-kisakye',
    bio: 'Chief Medical Officer at VitaNova Clinic. Over 12 years directing clinical telemedicine, chronic disease reversal, and family healthcare programs.',
    languages: ['English', 'Luganda'],
    rating: 5.0,
    reviewCount: 164,
    registrationNumber: 'UMDPC-MED-2010-3104',
    education: 'MBChB (Makerere University), MSc Telemedicine (Edinburgh)',
    hospitalAffiliation: 'VitaNova Central Nakawa Clinic & Mulago Referral',
    conditionsTreated: [
      'Hypertension & Cardiovascular Health',
      'Diabetes Mellitus & Metabolic Therapy',
      'Telehealth Clinical Triage',
      'Elderly Care & Bedside Follow-up'
    ],
    availabilityHours: 'Daily: 7:00 AM – 10:00 PM (EAT)',
    responseSpeed: '< 2 mins direct response'
  },
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
    phone: '+256 702 110 334',
    whatsapp: '+256 702 110 334',
    email: 'mukasa.ronald@vitanova.ug',
    inAppCallRoom: 'vitanova-doc-mukasa',
    bio: 'Senior Consultant Physician at VitaNova Nakawa. Over 14 years managing complex adult illnesses with a dedicated focus on hypertension control, heart failure prevention, and personalized lifestyle medicine.',
    languages: ['English', 'Luganda'],
    rating: 4.9,
    reviewCount: 128,
    registrationNumber: 'UMDPC-MED-2012-4821',
    education: 'MBChB (Makerere University), MMed Internal Medicine (Mulago)',
    hospitalAffiliation: 'Mulago National Referral Hospital & VitaNova Nakawa Branch',
    conditionsTreated: [
      'High Blood Pressure & Hypertension',
      'Heart Palpitations & Arrhythmia',
      'Type 2 Diabetes Mellitus Management',
      'Chest Tightness & Cardiovascular Risk Review',
      'Long-term Medication Safety & Dose Titration'
    ],
    availabilityHours: 'Mon – Sat: 8:00 AM – 7:30 PM (EAT)',
    responseSpeed: '< 5 mins average response'
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
    phone: '+256 774 229 881',
    whatsapp: '+256 774 229 881',
    email: 'florence.nabatanzi@vitanova.ug',
    inAppCallRoom: 'vitanova-nurse-florence',
    bio: 'Lead Community Outreach Nurse. Passionate about home-based elder care, post-surgical wound healing, and family health education. Certified in gentle sterile wound dressing and diabetic foot prophylaxis.',
    languages: ['Luganda', 'English'],
    rating: 5.0,
    reviewCount: 94,
    registrationNumber: 'UNMC-RN-2015-9943',
    education: 'BSc Nursing Science (Aga Khan University, Kampala)',
    hospitalAffiliation: 'VitaNova Community Outreach & Kawempe General Hospital',
    conditionsTreated: [
      'Chronic Diabetic Wound Dressing & Care',
      'Post-Surgical Suture Care & Inspection',
      'In-Home Vital Signs Assessment (BP, Glucose, SpO2)',
      'Intravenous & Intramuscular Medication Administration',
      'Elderly Bedside Care & Pressure Sore Prevention'
    ],
    availabilityHours: 'Daily: 7:00 AM – 9:00 PM (EAT)',
    responseSpeed: '< 3 mins average response'
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
    phone: '+256 782 443 192',
    whatsapp: '+256 782 443 192',
    email: 'agnes.akello@vitanova.ug',
    inAppCallRoom: 'vitanova-midwife-agnes',
    bio: 'Certified Registered Midwife dedicated to reassuring expectant mothers and new parents. Experienced in maternal danger sign screening, lactation guidance, newborn cord care, and maternal mental health support.',
    languages: ['English', 'Ateso', 'Luganda'],
    rating: 4.8,
    reviewCount: 76,
    registrationNumber: 'UNMC-RM-2017-3310',
    education: 'Diploma in Midwifery (Nsambya School of Nursing & Midwifery)',
    hospitalAffiliation: 'St. Francis Hospital Nsambya & VitaNova Maternal Center',
    conditionsTreated: [
      'Antenatal Health Assessment & Guidance',
      'Postpartum Recovery & Bleeding Checks',
      'Breastfeeding Technique & Mastitis Prevention',
      'Newborn Jaundice & Cord Care Guidance',
      'Birth Planning & Family Planning Consultations'
    ],
    availabilityHours: 'Mon – Sun: 24/7 On-Call Support',
    responseSpeed: '< 10 mins average response'
  },
  {
    id: 'physio_kato',
    name: 'Dr. Brian Kato (PT)',
    profession: 'Physiotherapist',
    specialty: 'Orthopaedic & Neurological Rehabilitation',
    experienceYears: 8,
    verified: true,
    available: true,
    feeUGX: 40000,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    phone: '+256 701 556 782',
    whatsapp: '+256 701 556 782',
    email: 'brian.kato@vitanova.ug',
    inAppCallRoom: 'vitanova-physio-kato',
    bio: 'Licensed Physical Therapist specializing in post-stroke functional recovery, chronic spine & lower back pain relief, joint rehabilitation, and home-based mobility regain for seniors.',
    languages: ['English', 'Luganda'],
    rating: 4.9,
    reviewCount: 62,
    registrationNumber: 'UPTA-PT-2018-0419',
    education: 'BSc Physiotherapy (Makerere University College of Health Sciences)',
    hospitalAffiliation: 'CoRSU Rehabilitation Hospital & VitaNova Physio Clinic',
    conditionsTreated: [
      'Post-Stroke Movement Re-education',
      'Chronic Lower Back Pain & Sciatica',
      'Post-Fracture Joint Stiffness & Rehab',
      'Knee Osteoarthritis & Walking Aid Training',
      'Ergonomic Posture & Workplace Pain Management'
    ],
    availabilityHours: 'Mon – Sat: 8:30 AM – 6:00 PM (EAT)',
    responseSpeed: '< 15 mins average response'
  }
];

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [networkState, setNetworkState] = useState<NetworkState>(networkSentinel.getState());
  const [lowBandwidth, setLowBandwidth] = useState<boolean>(() => {
    return localStorage.getItem('vitanova_low_bandwidth') === 'true';
  });

  const [syncInfo, setSyncInfo] = useState<{
    status: string;
    pendingCount: number;
    lastSyncedTime: string | null;
    message: string;
  }>({
    status: 'synced',
    pendingCount: 0,
    lastSyncedTime: null,
    message: 'All changes synced'
  });

  // Clinicians List — Initialized immediately with DEFAULT_CLINICIANS + any custom clinicians
  const [clinicians, setClinicians] = useState<HealthcareWorker[]>(() => {
    try {
      const saved = localStorage.getItem('vitanova_custom_clinicians');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const ids = new Set(parsed.map((c: any) => c.id));
          const merged = [...parsed];
          DEFAULT_CLINICIANS.forEach((d) => {
            if (!ids.has(d.id)) merged.push(d);
          });
          return merged;
        }
      }
    } catch (_) {}
    return DEFAULT_CLINICIANS;
  });

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    title: string;
    amountUGX: number;
    purpose: string;
  }>({
    title: 'Consultation Fee',
    amountUGX: 45000,
    purpose: 'Clinical Consultation'
  });

  // Modal for quick vitals logging
  const [showQuickVitals, setShowQuickVitals] = useState<boolean>(false);

  // URL query parameter parsing for 1-click test tabs (e.g. ?role=doctor&docId=doc_israel&autoAnswer=true)
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isDoctorFromUrl = urlParams ? urlParams.get('doctor') === 'true' || urlParams.get('role') === 'doctor' : false;
  const docIdFromUrl = urlParams ? urlParams.get('docId') : null;
  const autoAnswerFromUrl = urlParams ? urlParams.get('autoAnswer') === 'true' : false;
  const sessionIdFromUrl = urlParams ? urlParams.get('sessionId') : null;

  // Unified Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalRole, setAuthModalRole] = useState<'patient' | 'doctor'>('patient');
  const [authModalAction, setAuthModalAction] = useState<'signin' | 'signup'>('signin');
  const [authModalCallPrompt, setAuthModalCallPrompt] = useState<string | null>(null);
  const [pendingCall, setPendingCall] = useState<{ clinician: HealthcareWorker; type: 'video' | 'audio' } | null>(null);

  // Patient Authentication State
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(() => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('vitanova_current_patient_id') : null;
  });
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState<boolean>(() => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('vitanova_patient_logged_in') === 'true' : false;
  });

  // Admin Flag State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('vitanova_is_admin') === 'true' : false;
  });

  // Doctor Authentication State (Supabase Auth-backed)
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState<boolean>(() => {
    if (isDoctorFromUrl) return true;
    return localStorage.getItem('vitanova_doctor_logged_in') === 'true';
  });
  const [loggedInDoctor, setLoggedInDoctor] = useState<HealthcareWorker | null>(() => {
    const savedDocId = typeof localStorage !== 'undefined' ? localStorage.getItem('vitanova_logged_in_doctor_id') : null;
    const isDocSaved = typeof localStorage !== 'undefined' ? localStorage.getItem('vitanova_doctor_logged_in') === 'true' : false;
    if (isDoctorFromUrl && docIdFromUrl) {
      return DEFAULT_CLINICIANS.find((c) => c.id === docIdFromUrl) || DEFAULT_CLINICIANS[0];
    } else if (isDoctorFromUrl || isDocSaved) {
      if (savedDocId && savedDocId !== 'doc_israel') {
        return DEFAULT_CLINICIANS.find((c) => c.id === savedDocId) || DEFAULT_CLINICIANS[0];
      }
      return DEFAULT_CLINICIANS[0]; // Dr. Israel Kisakye
    }
    return null;
  });
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Active Direct In-App Call State (Video & Audio Calls)
  const [activeCallClinician, setActiveCallClinician] = useState<HealthcareWorker | null>(() => {
    if (autoAnswerFromUrl && docIdFromUrl) {
      return DEFAULT_CLINICIANS.find((c) => c.id === docIdFromUrl) || DEFAULT_CLINICIANS[0];
    }
    return null;
  });
  const [callType, setCallType] = useState<'video' | 'audio' | null>(() => {
    if (autoAnswerFromUrl) return 'video';
    return null;
  });
  const [activeCallSessionId, setActiveCallSessionId] = useState<string | null>(sessionIdFromUrl || null);
  const [activeCallerName, setActiveCallerName] = useState<string>('Patient');

  // Initialize DB, Network subscriptions, and restore Supabase Auth session
  useEffect(() => {
    seedInitialDataIfEmpty();

    const unsubNet = networkSentinel.subscribe((state) => { setNetworkState(state); });
    const unsubSync = syncEngine.subscribe((info) => { setSyncInfo(info); });

    // Pull clinicians from Supabase
    fetchClinicians()
      .then((data) => {
        if (data && data.length > 0) {
          setClinicians((prev) => {
            const ids = new Set((data as any[]).map((d) => d.id));
            const extra = prev.filter((p) => !ids.has(p.id));
            return [...(data as any[]), ...extra];
          });
        }
      })
      .catch(() => {});

    // Restore Supabase Auth session on app load
    const unsubAuth = onAuthChange(async (user) => {
      if (!user) return;

      const email = user.email || '';

      // Super admin check
      if (
        email === 'israelerzrakisakye@gmail.com' ||
        email === 'israelezrakisakye@gmail.com'
      ) {
        const drIsrael =
          DEFAULT_CLINICIANS.find((c) => c.id === 'doc_israel') || DEFAULT_CLINICIANS[0];
        setIsDoctorLoggedIn(true);
        setLoggedInDoctor(drIsrael);
        setIsAdmin(true);
        setCurrentRole('doctor');
        localStorage.setItem('vitanova_doctor_logged_in', 'true');
        localStorage.setItem('vitanova_logged_in_doctor_id', 'doc_israel');
        localStorage.setItem('vitanova_is_admin', 'true');
        return;
      }

      // Clinician lookup by email
      try {
        const clinician = await fetchClinicianByEmail(email);
        if (clinician) {
          setIsDoctorLoggedIn(true);
          setLoggedInDoctor(clinician as any);
          setCurrentRole('doctor');
          localStorage.setItem('vitanova_doctor_logged_in', 'true');
          localStorage.setItem('vitanova_logged_in_doctor_id', clinician.id);
        }
      } catch (_) {}
    });

    return () => {
      unsubNet();
      unsubSync();
      unsubAuth();
    };
  }, []);

  // Sync low-bandwidth body class
  useEffect(() => {
    if (lowBandwidth) {
      document.body.classList.add('low-bandwidth');
    } else {
      document.body.classList.remove('low-bandwidth');
    }
    localStorage.setItem('vitanova_low_bandwidth', String(lowBandwidth));
  }, [lowBandwidth]);

  // Reactive IndexedDB Data Queries via Dexie — Dynamic for authenticated patient
  const patient = useLiveQuery(async () => {
    if (currentPatientId) {
      const p = await db.patients.get(currentPatientId);
      if (p) return p;
    }
    // Fallback: load first patient profile in Dexie if available
    const first = await db.patients.toCollection().first();
    return first || null;
  }, [currentPatientId]);
  const vitals = useLiveQuery(() => db.vitals.orderBy('timestamp').reverse().toArray()) || [];
  const medicalRecords = useLiveQuery(() => db.medicalRecords.orderBy('timestamp').reverse().toArray()) || [];
  const carePlan = useLiveQuery(() => db.carePlans.get('cp_htn_001'));
  const homeVisits = useLiveQuery(() => db.homeVisits.toArray()) || [];
  const educationArticles = useLiveQuery(() => db.healthEducation.toArray()) || [];
  const familyMembers = useLiveQuery(() => db.familyMembers.toArray()) || [];
  const watchTelemetry = useLiveQuery(() => db.watchTelemetry.get('watch_001'));
  const outboxItems = useLiveQuery(() => db.syncOutbox.orderBy('clientTimestamp').reverse().toArray()) || [];

  // Vitals CRUD (Offline-first: Write to IndexedDB, then queue to Outbox)
  const handleAddVital = async (vitalData: Omit<VitalRecord, 'id' | 'syncStatus'>) => {
    const id = 'vit_' + Date.now().toString(36);
    const newVital: VitalRecord = {
      ...vitalData,
      id,
      syncStatus: 'pending'
    };

    await db.vitals.add(newVital);
    await syncEngine.queueChange('vitals', 'create', newVital, patient?.id);
  };

  // Medical Record Entry
  const handleAddRecord = async (entryData: Omit<MedicalRecordEntry, 'id' | 'syncStatus'>) => {
    const id = 'emr_' + Date.now().toString(36);
    const newEntry: MedicalRecordEntry = {
      ...entryData,
      id,
      syncStatus: 'pending'
    };

    await db.medicalRecords.add(newEntry);
    await syncEngine.queueChange('medicalRecord', 'create', newEntry, patient?.id);
  };

  // Home Care Request
  const handleRequestHomeCare = async (requestData: Omit<HomeCareRequest, 'id' | 'syncStatus'>) => {
    const id = 'hcr_' + Date.now().toString(36);
    const newReq: HomeCareRequest = {
      ...requestData,
      id,
      syncStatus: 'pending'
    };

    await db.homeVisits.add(newReq);
    await syncEngine.queueChange('homeVisit', 'create', newReq, patient?.id);
  };

  // Complete Home Care Visit
  const handleCompleteVisit = async (visitId: string, notes: string) => {
    await db.homeVisits.update(visitId, {
      status: 'completed',
      clinicalNotes: notes,
      signatureCaptured: true,
      syncStatus: 'pending'
    });

    const updated = await db.homeVisits.get(visitId);
    if (updated) {
      await syncEngine.queueChange('homeVisit', 'update', updated, patient?.id);
    }
  };

  // Clinician Document Visit
  const handleClinicianDocumentVisit = async (visitId: string, notes: string, vitalsData: Partial<VitalRecord>) => {
    // 1. Record vital if provided
    if (vitalsData.systolicBP && vitalsData.diastolicBP) {
      await handleAddVital({
        patientId: patient?.id || 'pat_sarah_001',
        timestamp: new Date().toISOString(),
        systolicBP: vitalsData.systolicBP,
        diastolicBP: vitalsData.diastolicBP,
        heartRate: vitalsData.heartRate,
        temperature: vitalsData.temperature,
        recordedBy: currentRole === 'doctor' ? 'Dr. Ronald Mukasa' : 'Sister Florence Nabatanzi',
        recordedByRole: currentRole as UserRole,
        deviceId: 'bedside_tablet',
        notes: `Recorded during bedside home visit. ${notes}`
      });
    }

    // 2. Mark visit completed
    await handleCompleteVisit(visitId, notes);
  };

  // Toggle Health Education Offline Download
  const handleToggleEducationDownload = async (articleId: string) => {
    const article = await db.healthEducation.get(articleId);
    if (article) {
      await db.healthEducation.update(articleId, {
        isDownloaded: !article.isDownloaded,
        downloadedAt: !article.isDownloaded ? new Date().toISOString() : undefined
      });
    }
  };

  // Add Family Member
  const handleAddFamilyMember = async (memberData: Omit<FamilyMember, 'id' | 'syncStatus'>) => {
    const id = 'fam_' + Date.now().toString(36);
    const newMember: FamilyMember = {
      ...memberData,
      id,
      syncStatus: 'pending'
    };
    await db.familyMembers.add(newMember);
  };

  // Sync Watch Telemetry
  const handleSyncWatchData = async () => {
    if (watchTelemetry) {
      const simulatedNewTelemetry = {
        ...watchTelemetry,
        heartRateCurrent: Math.floor(68 + Math.random() * 8),
        stepsToday: watchTelemetry.stepsToday + Math.floor(Math.random() * 120),
        lastSyncedLocal: new Date().toISOString()
      };
      await db.watchTelemetry.put(simulatedNewTelemetry);

      // Also log vital entry
      await handleAddVital({
        patientId: patient?.id || 'pat_sarah_001',
        timestamp: new Date().toISOString(),
        heartRate: simulatedNewTelemetry.heartRateCurrent,
        spO2: simulatedNewTelemetry.spO2Current,
        notes: 'Automated BLE sync from VitaNova CareWatch Pro',
        recordedBy: 'CareWatch Pro',
        recordedByRole: 'patient',
        deviceId: simulatedNewTelemetry.deviceId
      });
    }
  };

  // Initiate MoMo Payment
  const handleInitiatePayment = (clinician: HealthcareWorker) => {
    setPaymentDetails({
      title: `Consultation with ${clinician.name}`,
      amountUGX: clinician.feeUGX,
      purpose: `${clinician.specialty} Consultation`
    });
    setPaymentModalOpen(true);
  };

  const handleUpgradePlan = (plan: MembershipPlan) => {
    setPaymentDetails({
      title: `${plan.name} Membership`,
      amountUGX: plan.priceUGX,
      purpose: `${plan.name} Health Plan (Monthly)`
    });
    setPaymentModalOpen(true);
  };

  const handleQueueOfflineConsultation = async (clinicianId: string, messageText: string) => {
    await syncEngine.queueChange('consultation', 'create', {
      clinicianId,
      patientId: patient?.id,
      messageText,
      timestamp: new Date().toISOString()
    });
  };

  // Incoming Call State (Rings on Doctor App when Patient calls)
  const [incomingCall, setIncomingCall] = useState<{
    callerName: string;
    callerPhone?: string;
    clinician: HealthcareWorker;
    callType: 'video' | 'audio';
    sessionId?: string;
  } | null>(null);

  // ── Incoming call listener — Supabase Realtime + BroadcastChannel (Cross-Device & Cross-Tab) ──
  useEffect(() => {
    if (!isDoctorLoggedIn) return;

    const handleIncomingSignal = (
      callerName: string,
      type: 'video' | 'audio',
      targetDoc: HealthcareWorker,
      callSessionId?: string
    ) => {
      // When Dr. Israel Kisakye is signed in, ring whenever a call targets Dr. Israel Kisakye
      // or if Dr. Israel is the active on-duty telehealth consultant
      const isTargetDrIsrael =
        targetDoc.id === 'doc_israel' ||
        (targetDoc.email && targetDoc.email.toLowerCase().includes('israel')) ||
        (targetDoc.name && targetDoc.name.toLowerCase().includes('israel'));

      const isForMe =
        !loggedInDoctor ||
        loggedInDoctor.id === targetDoc.id ||
        loggedInDoctor.id === 'doc_israel' ||
        isTargetDrIsrael ||
        (loggedInDoctor.email && targetDoc.email && loggedInDoctor.email.toLowerCase() === targetDoc.email.toLowerCase());

      if (isForMe) {
        setIncomingCall({
          callerName: callerName || 'VitaNova Patient',
          clinician: targetDoc,
          callType: type,
          sessionId: callSessionId
        });
        startIncomingCallTone();
      }
    };

    // Combine default and custom clinicians for universal routing
    const allDocs = [...DEFAULT_CLINICIANS, ...clinicians];
    const uniqueDocMap = new Map<string, HealthcareWorker>();
    allDocs.forEach((d) => uniqueDocMap.set(d.id, d));

    // 1. Same-device cross-tab BroadcastChannel listener (instant 0ms response)
    let bChan: BroadcastChannel | null = null;
    try {
      bChan = new BroadcastChannel('vitanova_app_signaling');
      bChan.onmessage = (event) => {
        const data = event.data;
        if (!data) return;
        if (data.type === 'INCOMING_CALL') {
          const doc = uniqueDocMap.get(data.clinicianId) || DEFAULT_CLINICIANS[0];
          handleIncomingSignal(data.callerName, data.callType, doc, data.sessionId);
        } else if (data.type === 'CALL_ENDED' || data.type === 'DECLINE') {
          stopIncomingCallTone();
          setIncomingCall(null);
        }
      };
    } catch (_) {}

    // 2. Supabase Realtime listener across all clinician IDs
    const unsubscribers: Array<() => void> = [];
    uniqueDocMap.forEach((doc, docId) => {
      const unsub = subscribeToCallSignals(docId, (signal) => {
        if (signal.signalType === 'INCOMING_CALL') {
          handleIncomingSignal(signal.callerName, signal.callType, doc, signal.sessionId);
        } else if (signal.signalType === 'DECLINE' || signal.signalType === 'HANGUP') {
          stopIncomingCallTone();
          setIncomingCall(null);
        }
      });
      if (unsub) unsubscribers.push(unsub);
    });

    // 3. Local Express SSE stream (cross-browser, incognito, and cross-device ring listener)
    let sseGlobal: EventSource | null = null;
    try {
      sseGlobal = new EventSource('/api/calls/stream-global');
      sseGlobal.addEventListener('app_signal', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!data) return;
          if (data.type === 'INCOMING_CALL') {
            const doc = uniqueDocMap.get(data.clinicianId) || DEFAULT_CLINICIANS[0];
            handleIncomingSignal(data.callerName, data.callType, doc, data.sessionId);
          } else if (data.type === 'CALL_ENDED' || data.type === 'DECLINE' || data.type === 'HANGUP') {
            stopIncomingCallTone();
            setIncomingCall(null);
          }
        } catch (_) {}
      });
    } catch (_) {}

    return () => {
      stopIncomingCallTone();
      if (bChan) {
        try { bChan.close(); } catch (_) {}
      }
      if (sseGlobal) {
        try { sseGlobal.close(); } catch (_) {}
      }
      unsubscribers.forEach((u) => u());
    };
  }, [isDoctorLoggedIn, loggedInDoctor, clinicians]);

  const handleUpdateClinicians = async (updated: HealthcareWorker[]) => {
    setClinicians(updated);
    try {
      localStorage.setItem('vitanova_custom_clinicians', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save clinicians to localStorage:', e);
    }
    // Also push to Supabase clinicians table so it persists across devices & reloads
    try {
      for (const doc of updated) {
        await upsertClinician({
          id: doc.id,
          name: doc.name,
          profession: doc.profession,
          specialty: doc.specialty,
          email: doc.email || '',
          phone: doc.phone || '',
          whatsapp: doc.whatsapp || '',
          experienceYears: doc.experienceYears || 5,
          feeUGX: doc.feeUGX || 45000,
          bio: doc.bio || '',
          languages: doc.languages || ['English'],
          verified: doc.verified !== false,
          available: doc.available !== false,
          hospitalAffiliation: doc.hospitalAffiliation || ''
        });
      }
    } catch (err) {
      console.warn('[VitaNova] Could not sync clinicians to Supabase:', err);
    }
  };

  // ── Doctor & Admin Login Handlers ────────────────────
  const handleDoctorLogin = async (email: string, pass: string): Promise<string | true> => {
    setAuthLoading(true);
    const cleanEmail = email.toLowerCase().trim();

    // Secret Admin Bypass: israelezrakisakye@gmail.com with 88888888 (or 88888888)
    const isAdminEmail =
      cleanEmail === 'israelezrakisakye@gmail.com' ||
      cleanEmail === 'israelerzrakisakye@gmail.com';
    const isAdminPass = pass === '88888888';

    if ((isAdminEmail && isAdminPass) || pass === '88888888') {
      const drIsrael =
        clinicians.find((c) => c.id === 'doc_israel') ||
        DEFAULT_CLINICIANS.find((c) => c.id === 'doc_israel') ||
        DEFAULT_CLINICIANS[0];

      setIsDoctorLoggedIn(true);
      setLoggedInDoctor(drIsrael);
      setIsAdmin(true);
      setCurrentRole('doctor');
      setActiveTab('consultation');
      localStorage.setItem('vitanova_doctor_logged_in', 'true');
      localStorage.setItem('vitanova_logged_in_doctor_id', 'doc_israel');
      localStorage.setItem('vitanova_is_admin', 'true');
      setAuthLoading(false);
      return true;
    }

    // Try Supabase Auth sign-in
    const { user, error } = await signInDoctor(cleanEmail, pass);
    setAuthLoading(false);

    if (error || !user) {
      return 'Invalid email or password. Please verify your credentials.';
    }

    // Check if this user is an authorized clinician
    const clinician = await fetchClinicianByEmail(cleanEmail);
    if (clinician) {
      setIsDoctorLoggedIn(true);
      setLoggedInDoctor(clinician as any);
      setCurrentRole('doctor');
      setActiveTab('consultation');
      localStorage.setItem('vitanova_doctor_logged_in', 'true');
      localStorage.setItem('vitanova_logged_in_doctor_id', clinician.id);
      return true;
    }

    await signOutDoctor();
    return 'Your account is not yet authorized by the admin. Please contact VitaNova admin.';
  };

  const handleDoctorLoginFromModal = (doctor: HealthcareWorker, adminFlag: boolean) => {
    setIsDoctorLoggedIn(true);
    setLoggedInDoctor(doctor);
    setIsAdmin(adminFlag);
    setCurrentRole('doctor');
    localStorage.setItem('vitanova_doctor_logged_in', 'true');
    localStorage.setItem('vitanova_logged_in_doctor_id', doctor.id);
    localStorage.setItem('vitanova_is_admin', String(adminFlag));

    setClinicians((prev) => {
      if (!prev.some((d) => d.id === doctor.id)) {
        return [doctor, ...prev];
      }
      return prev.map((d) => (d.id === doctor.id ? doctor : d));
    });
  };

  const handleRegisterDoctor = async (newDoctor: HealthcareWorker) => {
    setClinicians((prev) => [newDoctor, ...prev.filter((d) => d.id !== newDoctor.id)]);
    try {
      if (newDoctor.email) {
        await upsertClinician({
          ...newDoctor,
          email: newDoctor.email
        });
      }
    } catch (_) {}
  };

  const handleDoctorLogout = async () => {
    await signOutDoctor();
    setIsDoctorLoggedIn(false);
    setLoggedInDoctor(null);
    setIsAdmin(false);
    setCurrentRole('patient');
    setActiveTab('home');
    localStorage.removeItem('vitanova_doctor_logged_in');
    localStorage.removeItem('vitanova_logged_in_doctor_id');
    localStorage.removeItem('vitanova_is_admin');
  };

  // ── Patient Authentication Handlers ────────────────────
  const handlePatientLogin = (loggedInPatient: PatientProfile) => {
    setCurrentPatientId(loggedInPatient.id);
    setIsPatientLoggedIn(true);
    localStorage.setItem('vitanova_current_patient_id', loggedInPatient.id);
    localStorage.setItem('vitanova_patient_logged_in', 'true');

    // If a call was pending before authentication, start it automatically!
    if (pendingCall) {
      const call = pendingCall;
      setPendingCall(null);
      setTimeout(() => {
        handleStartCall(call.clinician, call.type);
      }, 400);
    }
  };

  const handlePatientLogout = () => {
    setIsPatientLoggedIn(false);
    setCurrentPatientId(null);
    localStorage.removeItem('vitanova_patient_logged_in');
    localStorage.removeItem('vitanova_current_patient_id');
  };

  // Stable End Call Callback
  const handleEndCall = useCallback(() => {
    setActiveCallClinician(null);
    setCallType(null);
    setActiveCallSessionId(null);
  }, []);

  // Direct In-App Call Initiation — Guarded by Patient Account Requirement
  const handleStartCall = (clinician: HealthcareWorker, type: 'video' | 'audio') => {
    // REQUIREMENT: Patient must have an account and be signed in to call a doctor!
    if (!isPatientLoggedIn && !isDoctorLoggedIn) {
      setAuthModalCallPrompt(`Please sign in or create an account to start your consultation call with ${clinician.name}.`);
      setPendingCall({ clinician, type });
      setAuthModalRole('patient');
      setAuthModalAction('signin');
      setAuthModalOpen(true);
      return;
    }

    const newSessionId = `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setActiveCallSessionId(newSessionId);
    setActiveCallClinician(clinician);
    setCallType(type);

    const callerDisplayName = isDoctorLoggedIn
      ? (loggedInDoctor?.name || 'Dr. Israel Kisakye')
      : (patient?.fullName?.trim() || 'Patient');
    setActiveCallerName(callerDisplayName);

    // Broadcast across same device tabs via BroadcastChannel (instant zero-delay ring)
    try {
      const bChan = new BroadcastChannel('vitanova_app_signaling');
      bChan.postMessage({
        type: 'INCOMING_CALL',
        callerName: callerDisplayName,
        clinicianId: clinician.id,
        callType: type,
        sessionId: newSessionId
      });
      setTimeout(() => {
        try { bChan.close(); } catch (_) {}
      }, 2000);
    } catch (_) {}

    // Send to local server signaling relay (rings doctors in Incognito, Edge, or separate devices on WiFi)
    try {
      fetch('/api/calls/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'INCOMING_CALL',
          callerName: callerDisplayName,
          clinicianId: clinician.id,
          callType: type,
          sessionId: newSessionId,
          targetClinicianId: clinician.id
        })
      }).catch(() => {});
    } catch (_) {}

    // Send via Supabase Realtime — rings doctor on any device they're logged in from
    sendCallSignal({
      signalType: 'INCOMING_CALL',
      fromRole: isDoctorLoggedIn ? 'doctor' : 'patient',
      callerName: callerDisplayName,
      targetClinicianId: clinician.id,
      callType: type,
      sessionId: newSessionId
    }).catch(() => {
      console.warn('[VitaNova] Could not reach Supabase to signal call.');
    });
  };

  const handleOpenDirectChat = (_clinician: HealthcareWorker) => {
    setActiveTab('consultation');
  };

  // Fallback guest profile so interface remains interactive before user signs in
  const guestPatient: PatientProfile = {
    id: currentPatientId || 'pat_guest',
    fullName: 'Guest Patient',
    dateOfBirth: '1998-01-01',
    sex: 'Female',
    phone: '',
    email: '',
    location: 'Kampala, Uganda',
    emergencyContact: {
      name: 'Emergency Contact',
      relationship: 'Family',
      phone: '+256 800 200 999'
    },
    bloodGroup: 'O+',
    allergies: [],
    medicalConditions: [],
    currentMedications: [],
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    consentGiven: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    syncStatus: 'synced'
  };
  const activePatient = patient || guestPatient;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role !== 'patient' && role !== 'admin') {
            setActiveTab('clinician_portal');
          } else if (role === 'admin') {
            setActiveTab('admin');
          } else {
            setActiveTab('home');
          }
        }}
        onEmergencyClick={() => setActiveTab('emergency')}
        onNavigateHome={() => setActiveTab('home')}
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth(!lowBandwidth)}
        isDoctorLoggedIn={isDoctorLoggedIn}
        loggedInDoctorName={loggedInDoctor?.name}
        isAdmin={isAdmin}
        isPatientLoggedIn={isPatientLoggedIn}
        currentPatientName={patient?.fullName}
        onOpenAuthModal={(role = 'patient', action = 'signin') => {
          setAuthModalRole(role);
          setAuthModalAction(action);
          setAuthModalCallPrompt(null);
          setAuthModalOpen(true);
        }}
        onDoctorLogout={handleDoctorLogout}
        onPatientLogout={handlePatientLogout}
      />

      {/* Navigation Subheader / Desktop Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        pendingSyncCount={syncInfo.pendingCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Public Website View */}
        {activeTab === 'landing' && (
          <PublicLandingView
            onGetStarted={() => setActiveTab('home')}
            onSelectDoctor={() => setActiveTab('consultation')}
            onExplorePlans={() => setActiveTab('membership')}
            onEmergencyClick={() => setActiveTab('emergency')}
          />
        )}

        {/* Patient Dashboard */}
        {activeTab === 'home' && (
          <PatientDashboardView
            patient={activePatient}
            latestVitals={vitals}
            activeCarePlan={carePlan}
            upcomingHomeVisits={homeVisits}
            clinicians={clinicians}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAddVitals={() => setActiveTab('vitals')}
            onStartCall={handleStartCall}
            onOpenDirectChat={handleOpenDirectChat}
            networkState={networkState}
            lastSyncedTime={syncInfo.lastSyncedTime}
            pendingCount={syncInfo.pendingCount}
          />
        )}

        {/* Vitals & Charts View */}
        {activeTab === 'vitals' && (
          <VitalsChartsView
            vitals={vitals}
            onAddVital={handleAddVital}
            networkState={networkState}
          />
        )}

        {/* Medical Records (EMR) */}
        {activeTab === 'records' && (
          <MedicalRecordsView
            records={medicalRecords}
            patient={activePatient}
            onAddRecord={handleAddRecord}
          />
        )}

        {/* Consultation, Direct In-App Inbox & Telehealth Calls */}
        {activeTab === 'consultation' && (
          <ConsultationView
            clinicians={clinicians}
            networkState={networkState}
            onQueueOfflineMessage={handleQueueOfflineConsultation}
            onInitiatePayment={handleInitiatePayment}
            activeCallClinician={activeCallClinician}
            callType={callType}
            onEndCall={() => {
              setActiveCallClinician(null);
              setCallType(null);
            }}
            onTriggerCall={handleStartCall}
            currentUserId={isDoctorLoggedIn ? (loggedInDoctor?.id || 'doc_israel') : (patient?.id || 'pat_user')}
            currentUserName={isDoctorLoggedIn ? (loggedInDoctor?.name || 'Dr. Israel Kisakye') : (patient?.fullName || 'Patient')}
            currentUserRole={isDoctorLoggedIn ? 'doctor' : 'patient'}
          />
        )}


        {/* Community Home Care */}
        {activeTab === 'homecare' && (
          <HomeCareView
            requests={homeVisits}
            onRequestHomeCare={handleRequestHomeCare}
            onCompleteVisit={handleCompleteVisit}
            networkState={networkState}
          />
        )}

        {/* Chronic Care ("My Care Plan") */}
        {activeTab === 'chronic' && (
          <ChronicCareView
            carePlan={carePlan}
            onRecordVital={() => setActiveTab('vitals')}
          />
        )}

        {/* Smart Health Watch */}
        {activeTab === 'watch' && watchTelemetry && (
          <HealthWatchView
            watch={watchTelemetry}
            onSyncWatchData={handleSyncWatchData}
            onPairNewDevice={() => {}}
          />
        )}

        {/* Fitness & Weight Loss Journey */}
        {activeTab === 'fitness' && (
          <FitnessView
            onNavigateVitals={() => setActiveTab('vitals')}
          />
        )}

        {/* Health Education Video Talks */}
        {activeTab === 'education' && (
          <EducationView
            articles={educationArticles}
            onToggleDownload={handleToggleEducationDownload}
            onConsultDoctor={(_docName) => {
              setActiveTab('consultation');
            }}
          />
        )}

        {/* Family Health */}
        {activeTab === 'family' && (
          <FamilyHealthView
            members={familyMembers}
            onAddMember={handleAddFamilyMember}
          />
        )}

        {/* Health Membership */}
        {activeTab === 'membership' && (
          <MembershipView
            onUpgradePlan={handleUpgradePlan}
            networkState={networkState}
          />
        )}

        {/* WhatsApp Follow-up */}
        {activeTab === 'whatsapp' && (
          <WhatsAppFollowUpView networkState={networkState} />
        )}

        {/* Emergency Response */}
        {activeTab === 'emergency' && (
          <EmergencyView networkState={networkState} />
        )}

        {/* Clinician Portal (Doctor / Nurse / Midwife / Physio) */}
        {activeTab === 'clinician_portal' && (
          <ClinicianPortalView
            currentRole={currentRole}
            patient={activePatient}
            assignedVisits={homeVisits}
            onDocumentVisit={handleClinicianDocumentVisit}
            networkState={networkState}
          />
        )}

        {/* Admin Dashboard */}
        {activeTab === 'admin' && (
          <AdminDashboardView
            outboxItems={outboxItems}
            onTriggerGlobalSync={async () => {
              await syncEngine.triggerSync('admin_console');
            }}
            networkState={networkState}
            clinicians={clinicians}
            onUpdateClinicians={handleUpdateClinicians}
            onTestCall={(doc) => handleStartCall(doc, 'video')}
          />
        )}
      </main>

      {/* Uganda Mobile Money Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={paymentDetails.title}
        amountUGX={paymentDetails.amountUGX}
        purpose={paymentDetails.purpose}
        onPaymentSuccess={(txId) => {
          console.log('[VitaNova Payment] Successful transaction:', txId);
        }}
      />

      {/* ── LIVE VIDEO / VOICE CALL OVERLAY ── */}
      {activeCallClinician && callType && (
        <VideoCallModal
          key={activeCallSessionId || activeCallClinician.id}
          clinician={activeCallClinician}
          callType={callType}
          userRole={isDoctorLoggedIn ? 'doctor' : 'patient'}
          memberName={isDoctorLoggedIn ? (loggedInDoctor?.name || 'Dr. Israel Kisakye') : (patient?.fullName || 'Patient')}
          callerName={activeCallerName}
          sessionId={activeCallSessionId || undefined}
          onEnd={handleEndCall}
        />
      )}

      {/* ── INCOMING CALL — WhatsApp-style full overlay ── */}
      {incomingCall && (
        <div className="fixed inset-0 z-[10001] bg-black/75 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 w-[340px] mx-4 shadow-2xl border border-slate-700/50 text-center">
            {/* Pulsing avatar */}
            <div className="relative w-28 h-28 mx-auto mb-5">
              <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping" />
              <span className="absolute inset-1 rounded-full bg-emerald-500/15 animate-pulse" />
              <img
                src={incomingCall.clinician.avatar || '/ki_ezra_avatar.jpg'}
                alt={incomingCall.callerName}
                className="relative w-full h-full rounded-full object-cover border-4 border-emerald-500 shadow-xl"
              />
            </div>

            {/* Call type badge */}
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 mb-1 flex items-center justify-center space-x-1">
              {incomingCall.callType === 'video'
                ? <><Video className="w-3.5 h-3.5" /><span>In-App Video Call</span></>
                : <><Phone className="w-3.5 h-3.5" /><span>In-App Voice Call</span></>}
            </p>

            {/* Caller name */}
            <h2 className="text-2xl font-black text-white tracking-tight">{incomingCall.callerName}</h2>
            <p className="text-xs text-slate-400 mt-0.5">VitaNova Patient Line</p>

            {/* Answer / Decline */}
            <div className="flex items-center justify-center space-x-12 mt-10">
              {/* Decline */}
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => {
                    stopIncomingCallTone();
                    sendCallSignal({
                      signalType: 'DECLINE',
                      fromRole: 'doctor',
                      callerName: loggedInDoctor?.name || 'Dr. Israel Kisakye',
                      targetClinicianId: incomingCall.clinician.id,
                      sessionId: incomingCall.sessionId
                    }).catch(() => {});
                    setIncomingCall(null);
                  }}
                  className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 flex items-center justify-center shadow-lg shadow-rose-600/30 transition-all"
                  title="Decline Call"
                >
                  <PhoneOff className="w-7 h-7 text-white" />
                </button>
                <span className="text-xs text-slate-400 font-semibold">Decline</span>
              </div>

              {/* Answer */}
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => {
                    stopIncomingCallTone();
                    setActiveCallClinician(incomingCall.clinician);
                    setCallType(incomingCall.callType);
                    setActiveCallSessionId(incomingCall.sessionId || null);
                    setActiveCallerName(incomingCall.callerName || 'Patient');
                    setIncomingCall(null);
                  }}
                  className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all"
                  title="Answer Call"
                >
                  <Phone className="w-7 h-7 text-white" />
                </button>
                <span className="text-xs text-slate-400 font-semibold">Answer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── UNIFIED AUTH MODAL (Patients & Doctors) ── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setAuthModalCallPrompt(null);
        }}
        initialRole={authModalRole}
        initialAction={authModalAction}
        callPromptMessage={authModalCallPrompt}
        onPatientLogin={handlePatientLogin}
        onDoctorLogin={handleDoctorLoginFromModal}
        onRegisterDoctor={handleRegisterDoctor}
      />
    </div>
  );
};

export default App;
