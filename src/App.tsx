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

  // Clinicians List
  const [clinicians, setClinicians] = useState<HealthcareWorker[]>([]);

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

    // Fetch clinicians directory
    fetch('/api/clinicians')
      .then(res => res.json())
      .then(data => {
        if (data.clinicians) setClinicians(data.clinicians);
      })
      .catch(() => {
        // Fallback default clinicians if offline on launch
        setClinicians([
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
            bio: 'Senior Consultant at VitaNova Nakawa. Specialist in hypertension management.',
            languages: ['English', 'Luganda'],
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
            bio: 'Lead Community Outreach Nurse. Passionate about home-based elder care.',
            languages: ['Luganda', 'English'],
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
            bio: 'Certified Midwife specializing in home-based postpartum mother & infant checkups.',
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
            available: true,
            feeUGX: 40000,
            avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
            bio: 'Physical therapist focused on post-stroke mobility recovery and in-home physical therapy.',
            languages: ['English', 'Luganda'],
            rating: 4.9,
            reviewCount: 62
          }
        ]);
      });

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
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAddVitals={() => setActiveTab('vitals')}
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

        {/* Consultation & Telehealth */}
        {activeTab === 'consultation' && (
          <ConsultationView
            clinicians={clinicians}
            networkState={networkState}
            onQueueOfflineMessage={handleQueueOfflineConsultation}
            onInitiatePayment={handleInitiatePayment}
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

        {/* Health Education Library */}
        {activeTab === 'education' && (
          <EducationView
            articles={educationArticles}
            onToggleDownload={handleToggleEducationDownload}
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
    </div>
  );
};

export default App;
