import React from 'react';
import {
  Heart,
  Activity,
  Calendar,
  Clock,
  PlusCircle,
  PhoneCall,
  UserCheck,
  HeartPulse,
  FileText,
  Shield,
  Watch,
  BookOpen,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
  Pill,
  CreditCard,
  Wifi,
  WifiOff,
  Stethoscope,
  Building2,
  ArrowRight
} from 'lucide-react';
import { PatientProfile, VitalRecord, CarePlan, HomeCareRequest } from '../../types';
import { NavTab } from '../layout/Navigation';

interface PatientDashboardProps {
  patient: PatientProfile;
  latestVitals: VitalRecord[];
  activeCarePlan?: CarePlan;
  upcomingHomeVisits: HomeCareRequest[];
  onNavigate: (tab: NavTab) => void;
  onOpenAddVitals: () => void;
  networkState: string;
  lastSyncedTime: string | null;
  pendingCount: number;
}

export const PatientDashboardView: React.FC<PatientDashboardProps> = ({
  patient,
  latestVitals,
  activeCarePlan,
  upcomingHomeVisits,
  onNavigate,
  onOpenAddVitals,
  networkState,
  lastSyncedTime,
  pendingCount
}) => {
  const latestVital = latestVitals[0];

  // 12 Core Healthcare Modules with rich professional images
  const healthcareModules = [
    {
      id: 'consultation',
      title: 'Talk to a Health Worker',
      subtitle: 'Consult Doctors, Nurses, Midwives & Physios',
      badge: '4 Clinicians Online',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      icon: UserCheck,
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      title: 'Home Care Visits',
      subtitle: 'Bedside Nursing, Midwifery & Wound Care',
      badge: 'Assigned to Nakawa',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
      icon: HeartPulse,
      tab: 'homecare' as NavTab
    },
    {
      id: 'records',
      title: 'Medical Records (EMR)',
      subtitle: 'Immutable History, Lab Reports & Diagnoses',
      badge: '100% Offline Cached',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      icon: FileText,
      tab: 'records' as NavTab
    },
    {
      id: 'vitals',
      title: 'Vitals & Monitoring',
      subtitle: 'BP, Blood Glucose, Heart Rate & SpO2',
      badge: 'Interactive Charts',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      icon: Activity,
      tab: 'vitals' as NavTab
    },
    {
      id: 'watch',
      title: 'Smart Health Watch',
      subtitle: 'VitaNova CareWatch Pro BLE Telemetry',
      badge: 'Connected • 84% Bat',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
      icon: Watch,
      tab: 'watch' as NavTab
    },
    {
      id: 'chronic',
      title: 'Chronic Care Plan',
      subtitle: 'Hypertension, Diabetes & Asthma Protocols',
      badge: '96% Adherence',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
      icon: Shield,
      tab: 'chronic' as NavTab
    },
    {
      id: 'appointments',
      title: 'Appointments & Clinic',
      subtitle: 'Nakawa Medical Centre Physical Outpatient',
      badge: 'Plot 14 Ntinda Road',
      badgeColor: 'bg-slate-700/80 text-slate-200 border-slate-600',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      icon: Building2,
      tab: 'landing' as NavTab
    },
    {
      id: 'education',
      title: 'Health Education Library',
      subtitle: 'Maternal, Child & Chronic Care Guides',
      badge: '3 Guides Offline',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      icon: BookOpen,
      tab: 'education' as NavTab
    },
    {
      id: 'family',
      title: 'Family Health Circle',
      subtitle: 'Dependents, Mother & Children Profiles',
      badge: '2 Members Synced',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
      icon: Users,
      tab: 'family' as NavTab
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp & SMS Alerts',
      subtitle: 'Automated Reminders & Adherence Queue',
      badge: 'Privacy Protected',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=600&q=80',
      icon: MessageSquare,
      tab: 'whatsapp' as NavTab
    },
    {
      id: 'membership',
      title: 'My Health Plan',
      subtitle: 'Prepaid Family Healthcare Membership',
      badge: '3/5 Consults Used',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      icon: CreditCard,
      tab: 'membership' as NavTab
    },
    {
      id: 'emergency',
      title: 'Emergency 24/7',
      subtitle: 'Ambulance Dispatch & Direct 999 Dialer',
      badge: 'ICU Unit #03 Ready',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&q=80',
      icon: PhoneCall,
      tab: 'emergency' as NavTab
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Patient Health Overview Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 rounded-3xl border border-teal-500/30 p-5 sm:p-7 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="relative">
              <img
                src={patient.profileImage}
                alt={patient.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400/60 shadow-lg shadow-teal-500/20"
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-900">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {patient.fullName}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Kampala Patient ID: #pat_001
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {patient.location} • Age 34 • Family Membership Active
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  {networkState === 'offline' ? (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-300 font-semibold">Offline (Local IndexedDB Cache)</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Online (VitaNova Cloud Synced)</span>
                    </>
                  )}
                </span>
                <span>•</span>
                <span>
                  Last synced:{' '}
                  <strong className="text-slate-200">
                    {lastSyncedTime ? new Date(lastSyncedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Local Ready'}
                  </strong>
                </span>
                {pendingCount > 0 && (
                  <span className="bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                    {pendingCount} outbox queued
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
            <button
              onClick={onOpenAddVitals}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Vitals Offline</span>
            </button>
            <button
              onClick={() => onNavigate('emergency')}
              className="px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-red-400" />
              <span>Emergency 999</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Vitals Telemetry Quick Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Real-Time Health Vitals Telemetry</span>
          </h2>
          <button
            onClick={() => onNavigate('vitals')}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-1"
          >
            <span>View Full Trends</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Blood Pressure Card */}
          <div
            onClick={() => onNavigate('vitals')}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Blood Pressure</span>
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {latestVital?.systolicBP && latestVital?.diastolicBP
                  ? `${latestVital.systolicBP}/${latestVital.diastolicBP}`
                  : '128/82'}
              </span>
              <span className="text-xs text-slate-400">mmHg</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-medium">Optimal Control</span>
              <span className="text-slate-500 text-[10px]">Today</span>
            </div>
          </div>

          {/* Blood Glucose Card */}
          <div
            onClick={() => onNavigate('vitals')}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Blood Glucose</span>
              <HeartPulse className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {latestVital?.bloodGlucose ? latestVital.bloodGlucose : '5.2'}
              </span>
              <span className="text-xs text-slate-400">mmol/L</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-medium">Fasting Normal</span>
              <span className="text-slate-500 text-[10px]">8h ago</span>
            </div>
          </div>

          {/* Resting Heart Rate Card */}
          <div
            onClick={() => onNavigate('vitals')}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Heart Rate</span>
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {latestVital?.heartRate ? latestVital.heartRate : '70'}
              </span>
              <span className="text-xs text-slate-400">bpm</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-medium">Resting Normal</span>
              <span className="text-slate-500 text-[10px]">Watch Sync</span>
            </div>
          </div>

          {/* Oxygen Saturation Card */}
          <div
            onClick={() => onNavigate('vitals')}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">SpO2 Oxygen</span>
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {latestVital?.spO2 ? latestVital.spO2 : '99'}%
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-medium">Optimal</span>
              <span className="text-slate-500 text-[10px]">Pulse Ox</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Healthcare Ecosystem Modules Grid with Visual Imagery */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Healthcare Modules & Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Tap any module to open. All core records and tools operate offline with automatic cloud synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {healthcareModules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                onClick={() => onNavigate(module.tab)}
                className="group relative bg-slate-900 rounded-3xl border border-slate-800/80 overflow-hidden hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Imagery with Gradient Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-90"
                    loading="lazy"
                  />
                  {/* Subtle Top-to-Bottom Shadow for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                  {/* Top Status Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-teal-400 shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${module.badgeColor}`}>
                      {module.badge}
                    </span>
                  </div>
                </div>

                {/* Module Details */}
                <div className="p-5 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                      {module.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {module.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Detail Section: Upcoming Visits & Active Care Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Assigned Home Care Visit */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Upcoming Home Care Visit</span>
            </h3>
            <button
              onClick={() => onNavigate('homecare')}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium"
            >
              Manage
            </button>
          </div>

          {upcomingHomeVisits.length > 0 ? (
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{upcomingHomeVisits[0].serviceType} Visit</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Confirmed
                </span>
              </div>

              {/* Assigned Clinician with Portrait */}
              <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <img
                  src={upcomingHomeVisits[0].assignedWorkerAvatar || "https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80"}
                  alt={upcomingHomeVisits[0].assignedWorkerName || "Clinician"}
                  className="w-11 h-11 rounded-xl object-cover border border-teal-500/40 shrink-0 shadow-md"
                />
                <div>
                  <p className="text-xs font-bold text-white">{upcomingHomeVisits[0].assignedWorkerName || "Sister Florence Nabatanzi"}</p>
                  <p className="text-[11px] text-teal-400 font-medium">Community Health Nurse • Nakawa Outreach</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{upcomingHomeVisits[0].scheduledDate}</span>
              </div>
              <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                "{upcomingHomeVisits[0].clinicalNotes}"
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No home care visits scheduled for this week.</p>
          )}
        </div>

        {/* Active Care Plan Summary */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>Active Care Plan: Hypertension</span>
            </h3>
            <button
              onClick={() => onNavigate('chronic')}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium"
            >
              View Full Protocol
            </button>
          </div>

          {activeCarePlan ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Target Blood Pressure:</span>
                <span className="font-bold text-emerald-400">&lt; 130/80 mmHg</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Medication Adherence:</span>
                <span className="font-bold text-teal-400">96% (Amlodipine 5mg OD)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full w-[96%]" />
              </div>

              {/* Supervising Doctor with Portrait */}
              <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 mt-1">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                  alt="Dr. Ronald Mukasa"
                  className="w-10 h-10 rounded-xl object-cover border border-teal-500/40 shrink-0"
                />
                <div className="text-[11px]">
                  <p className="font-bold text-white">Supervised by Dr. Ronald Mukasa</p>
                  <p className="text-slate-400">Next review date: {activeCarePlan.nextReviewDate}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
