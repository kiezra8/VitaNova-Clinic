import React, { useState, useEffect } from 'react';
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
  HealthcareWorker
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
import { fetchClinicians } from './lib/supabase';

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

  // Doctor Authentication State (Super Admin or Admin-Created Doctor Accounts)
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('vitanova_doctor_logged_in') === 'true';
  });
  const [loggedInDoctor, setLoggedInDoctor] = useState<HealthcareWorker | null>(null);

  // Active Direct In-App Call State (Video & Audio Calls)
  const [activeCallClinician, setActiveCallClinician] = useState<HealthcareWorker | null>(null);
  const [callType, setCallType] = useState<'video' | 'audio' | null>(null);

  // Initialize DB and Network subscriptions
  useEffect(() => {
    // Seed initial local data if empty
    seedInitialDataIfEmpty();

    // Subscribe to network & sync engine
    const unsubNet = networkSentinel.subscribe((state) => {
      setNetworkState(state);
    });

    const unsubSync = syncEngine.subscribe((info) => {
      setSyncInfo(info);
    });

    // Optional Supabase cloud sync
    fetchClinicians()
      .then(data => {
        if (data && data.length > 0) {
          setClinicians(prev => {
            const ids = new Set((data as any[]).map(d => d.id));
            const extra = prev.filter(p => !ids.has(p.id));
            return [...(data as any[]), ...extra];
          });
        }
      })
      .catch(() => {});

    return () => {
      unsubNet();
      unsubSync();
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

  // Reactive IndexedDB Data Queries via Dexie
  const patient = useLiveQuery(() => db.patients.get('pat_sarah_001'));
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
  } | null>(null);

  // Listen for real incoming calls across tabs and in-app sessions
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('vitanova_telehealth_call');
      channel.onmessage = (event) => {
        if (event.data?.type === 'INCOMING_CALL' && event.data.clinician) {
          const targetDoc = event.data.clinician as HealthcareWorker;
          // Check if current user is logged in as a doctor or admin to receive call
          if (isDoctorLoggedIn) {
            // Ring if admin is logged in OR if the logged in doctor matches the target doctor
            const shouldRing = !loggedInDoctor || loggedInDoctor.id === targetDoc.id || loggedInDoctor.email === targetDoc.email;
            if (shouldRing) {
              setIncomingCall({
                callerName: event.data.callerName || 'Guest Patient (In-App Caller)',
                clinician: targetDoc,
                callType: event.data.callType || 'video'
              });
            }
          }
        }
      };
    } catch (_) {}

    return () => {
      channel?.close();
    };
  }, [isDoctorLoggedIn, loggedInDoctor]);

  const handleUpdateClinicians = (updated: HealthcareWorker[]) => {
    setClinicians(updated);
    try {
      localStorage.setItem('vitanova_custom_clinicians', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save clinicians to localStorage:', e);
    }
  };

  // Doctor & Admin Portal Authentication Handler
  // Supports Super Admin (israelerzrakisakye@gmail.com / 88888888) AND any Doctor account created by Admin
  const handleDoctorLogin = (email: string, pass: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Super Admin Account
    if (
      (cleanEmail === 'israelerzrakisakye@gmail.com' || cleanEmail === 'israelezrakisakye@gmail.com') &&
      pass === '88888888'
    ) {
      setIsDoctorLoggedIn(true);
      setLoggedInDoctor(null);
      setCurrentRole('admin');
      setActiveTab('admin');
      localStorage.setItem('vitanova_doctor_logged_in', 'true');
      localStorage.removeItem('vitanova_logged_in_doctor_id');
      return true;
    }

    // 2. Doctor accounts created by Admin in clinicians registry
    const matchedDoctor = clinicians.find(
      (c) => c.email && c.email.toLowerCase().trim() === cleanEmail && (c.password || '88888888') === pass
    );

    if (matchedDoctor) {
      setIsDoctorLoggedIn(true);
      setLoggedInDoctor(matchedDoctor);
      setCurrentRole('doctor');
      setActiveTab('consultation');
      localStorage.setItem('vitanova_doctor_logged_in', 'true');
      localStorage.setItem('vitanova_logged_in_doctor_id', matchedDoctor.id);
      return true;
    }

    return false;
  };

  const handleDoctorLogout = () => {
    setIsDoctorLoggedIn(false);
    setLoggedInDoctor(null);
    setCurrentRole('patient');
    setActiveTab('home');
    localStorage.removeItem('vitanova_doctor_logged_in');
    localStorage.removeItem('vitanova_logged_in_doctor_id');
  };

  // Direct In-App Call Initiation — opens real encrypted video/audio modal and rings doctor's app
  // Patient can call whether they have an account or do NOT have an account (Guest Mode)
  const handleStartCall = (clinician: HealthcareWorker, type: 'video' | 'audio') => {
    setActiveCallClinician(clinician);
    setCallType(type);

    const callerDisplayName = patient?.fullName?.trim() ? patient.fullName : 'Guest Patient (In-App Caller)';

    // Broadcast call to doctor's registered session
    try {
      const channel = new BroadcastChannel('vitanova_telehealth_call');
      channel.postMessage({
        type: 'INCOMING_CALL',
        clinician,
        callerName: callerDisplayName,
        callType: type,
        timestamp: Date.now()
      });
    } catch (_) {}
  };

  const handleOpenDirectChat = (_clinician: HealthcareWorker) => {
    setActiveTab('consultation');
  };

  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-950 text-slate-300 text-sm">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Initializing VitaNova Local Clinical Database...</p>
        </div>
      </div>
    );
  }

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
        onDoctorLogin={handleDoctorLogin}
        onDoctorLogout={handleDoctorLogout}
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
            patient={patient}
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
            patient={patient}
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
            patient={patient}
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
          clinician={activeCallClinician}
          callType={callType}
          userRole={isDoctorLoggedIn ? 'doctor' : 'patient'}
          memberName={isDoctorLoggedIn ? (loggedInDoctor?.name || 'Dr. Israel Kisakye') : (patient?.fullName || 'Sarah Namubiru')}
          onEnd={() => {
            setActiveCallClinician(null);
            setCallType(null);
          }}
        />
      )}

      {/* ── REAL IN-APP INCOMING CALL RINGING OVERLAY FOR DOCTORS ── */}
      {incomingCall && (
        <div className="fixed top-5 right-5 z-[10001] bg-slate-900 border-2 border-teal-500 rounded-3xl p-5 shadow-2xl max-w-sm w-full animate-bounce-subtle backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="relative shrink-0">
              <img
                src={incomingCall.clinician.avatar}
                alt={incomingCall.clinician.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-400"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center animate-ping" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">Incoming Telehealth Call</span>
              <h4 className="text-sm font-bold text-white truncate">{incomingCall.callerName}</h4>
              <p className="text-[11px] text-slate-300 truncate">
                To: {incomingCall.clinician.name} ({incomingCall.callType === 'video' ? 'Video' : 'Voice'})
              </p>
              <p className="text-[10px] text-teal-400 font-semibold flex items-center space-x-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Direct In-App Line • Encrypted</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={() => {
                setActiveCallClinician(incomingCall.clinician);
                setCallType(incomingCall.callType);
                setIncomingCall(null);
              }}
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all"
            >
              Answer Call
            </button>
            <button
              onClick={() => setIncomingCall(null)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
