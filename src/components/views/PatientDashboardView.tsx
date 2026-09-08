import React, { useState } from 'react';
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
  CheckCircle2,
  Video,
  Phone,
  ArrowRight,
  Smile,
  AlertCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PatientProfile, VitalRecord, CarePlan, HomeCareRequest, HealthcareWorker } from '../../types';
import { NavTab } from '../layout/Navigation';

interface PatientDashboardProps {
  patient: PatientProfile;
  latestVitals: VitalRecord[];
  activeCarePlan?: CarePlan;
  upcomingHomeVisits: HomeCareRequest[];
  clinicians: HealthcareWorker[];
  onNavigate: (tab: NavTab) => void;
  onOpenAddVitals: () => void;
  onStartCall: (clinician: HealthcareWorker, type: 'video' | 'audio') => void;
  onOpenDirectChat: (clinician: HealthcareWorker) => void;
  networkState: string;
  lastSyncedTime: string | null;
  pendingCount: number;
}

export const PatientDashboardView: React.FC<PatientDashboardProps> = ({
  patient,
  latestVitals,
  activeCarePlan,
  upcomingHomeVisits,
  clinicians,
  onNavigate,
  onOpenAddVitals,
  onStartCall,
  onOpenDirectChat,
  networkState,
  lastSyncedTime,
  pendingCount
}) => {
  const latestVital = latestVitals[0];
  const [moodGreeting, setMoodGreeting] = useState<string | null>(null);

  // Friendly everyday service cards with relatable imagery
  const friendlyServices = [
    {
      id: 'consultation',
      title: 'Talk to a Doctor or Nurse',
      desc: 'Video call, phone call or message verified clinicians right from home.',
      tag: 'Doctors on call',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      actionText: 'Connect Now',
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      title: 'Nurse Visits to Your Home',
      desc: 'Have a kind, certified nurse come to your home for dressing wounds, checks, and elderly support.',
      tag: 'Kampala & Wakiso',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
      actionText: 'Book Nurse',
      tab: 'homecare' as NavTab
    },
    {
      id: 'education',
      title: 'Health Video Talks',
      desc: 'Short video talks by Ugandan doctors explaining blood pressure, malaria, diabetes, and pregnancy.',
      tag: 'Free Doctor Talks',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      actionText: 'Watch Videos',
      tab: 'education' as NavTab
    },
    {
      id: 'vitals',
      title: 'Check Your Health Numbers',
      desc: 'Keep track of your blood pressure, sugar, and heart rate anytime without internet.',
      tag: 'Works Offline',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      actionText: 'See Numbers',
      tab: 'vitals' as NavTab
    },
    {
      id: 'records',
      title: 'My Medical Records',
      desc: 'Safe, private timeline of all your doctor visits, lab results, and prescriptions.',
      tag: 'Confidential',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      actionText: 'View Files',
      tab: 'records' as NavTab
    },
    {
      id: 'family',
      title: 'Family Health Circle',
      desc: 'Keep health records and book appointments for your children and parents.',
      tag: 'Family Care',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
      actionText: 'Family Members',
      tab: 'family' as NavTab
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 max-w-full overflow-hidden">
      {/* Warm & Welcoming Human Greeting Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-900/60 via-slate-900 to-slate-900 rounded-3xl border border-teal-500/20 p-5 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={patient.profileImage}
              alt={patient.fullName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md shrink-0"
            />
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-teal-300 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Good morning</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {patient.fullName.split(' ')[0]} 👋
              </h1>
              <p className="text-xs text-slate-300">
                {patient.location} • How can we help you stay healthy today?
              </p>
            </div>
          </div>

          {/* Quick Record Button */}
          <div className="flex items-center space-x-2 pt-1 sm:pt-0">
            <button
              onClick={onOpenAddVitals}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all active:scale-95 flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Vitals</span>
            </button>
            <button
              onClick={() => onNavigate('emergency')}
              className="px-3.5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-bold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>Emergency</span>
            </button>
          </div>
        </div>

        {/* Friendly Feeling Check-in Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">Quick check:</span>
          <button
            onClick={() => setMoodGreeting("Great to hear you're feeling healthy! Keep drinking plenty of water today.")}
            className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
          >
            😊 Feeling Great
          </button>
          <button
            onClick={() => setMoodGreeting("Take it easy today. Your care team is always here if you need help.")}
            className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
          >
            😴 Tired / Rest Needed
          </button>
          <button
            onClick={() => onNavigate('consultation')}
            className="px-2.5 py-1 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-[11px] font-semibold border border-teal-500/30 transition-colors"
          >
            💬 Talk to Clinician
          </button>
        </div>

        {moodGreeting && (
          <div className="mt-2 text-xs text-teal-300 bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 animate-fadeIn">
            {moodGreeting}
          </div>
        )}
      </div>

      {/* Gentle, Relatable Health Status Card */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-6 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">Your Health Overview</h2>
              <p className="text-[11px] text-slate-400">All numbers are looking steady and well controlled</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('vitals')}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-1"
          >
            <span>Details & History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Blood Pressure */}
          <div
            onClick={() => onNavigate('vitals')}
            className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-slate-400 font-medium">Blood Pressure</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {latestVital?.systolicBP ? `${latestVital.systolicBP}/${latestVital.diastolicBP}` : '128/82'}
            </p>
            <span className="text-[10px] font-bold text-emerald-400">✓ Healthy Target</span>
          </div>

          {/* Blood Sugar */}
          <div
            onClick={() => onNavigate('vitals')}
            className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-slate-400 font-medium">Blood Sugar</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {latestVital?.bloodGlucose ? `${latestVital.bloodGlucose}` : '5.2'} <span className="text-xs text-slate-400">mmol/L</span>
            </p>
            <span className="text-[10px] font-bold text-emerald-400">✓ Normal Fasting</span>
          </div>

          {/* Heart Rate */}
          <div
            onClick={() => onNavigate('vitals')}
            className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-slate-400 font-medium">Resting Heart Rate</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {latestVital?.heartRate ? latestVital.heartRate : '70'} <span className="text-xs text-slate-400">bpm</span>
            </p>
            <span className="text-[10px] font-bold text-teal-400">✓ Steady Pulse</span>
          </div>

          {/* Blood Oxygen */}
          <div
            onClick={() => onNavigate('vitals')}
            className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-slate-400 font-medium">Oxygen Level</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {latestVital?.spO2 ? latestVital.spO2 : '99'}%
            </p>
            <span className="text-[10px] font-bold text-emerald-400">✓ Optimal</span>
          </div>
        </div>
      </div>

      {/* Direct Clinician Contact Strip: Video Call, Audio Call, Direct Inbox */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Connect Directly with Your Clinicians
            </h2>
            <p className="text-xs text-slate-400">
              Tap below to video call, phone call, or message your doctor right now
            </p>
          </div>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 hidden sm:flex items-center space-x-1"
          >
            <span>All Clinicians</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clinicians.slice(0, 2).map((clinician) => (
            <div
              key={clinician.id}
              className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all space-y-3 shadow-md"
            >
              <div className="flex items-center space-x-3.5">
                <div className="relative">
                  <img
                    src={clinician.avatar}
                    alt={clinician.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-teal-500/30"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-white">{clinician.name}</h3>
                  <p className="text-xs text-teal-400 font-semibold">{clinician.specialty}</p>
                  <p className="text-[11px] text-slate-400">{clinician.experienceYears} yrs experience • UGX {clinician.feeUGX.toLocaleString()}</p>
                </div>
              </div>

              {/* Direct 1-Click Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onStartCall(clinician, 'video')}
                  className="py-2 px-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStartCall(clinician, 'audio')}
                  className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>Voice Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenDirectChat(clinician)}
                  className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                  <span>Inbox</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Relatable Core Service Cards with Rich Visuals */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Explore Healthcare Services
          </h2>
          <p className="text-xs text-slate-400">
            Simple, transparent healthcare services designed for Ugandan families
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {friendlyServices.map((svc) => (
            <div
              key={svc.id}
              onClick={() => onNavigate(svc.tab)}
              className="group bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-teal-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${svc.tagColor}`}>
                    {svc.tag}
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between text-xs font-bold text-teal-400">
                <span>{svc.actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Home Nurse Visit & Active Care Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next Assigned Home Visit */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Upcoming Home Nurse Visit</span>
            </h3>
            <button
              onClick={() => onNavigate('homecare')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
            >
              Details
            </button>
          </div>

          {upcomingHomeVisits.length > 0 ? (
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{upcomingHomeVisits[0].serviceType} Home Visit</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={upcomingHomeVisits[0].assignedWorkerAvatar || "https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80"}
                  alt={upcomingHomeVisits[0].assignedWorkerName || "Clinician"}
                  className="w-11 h-11 rounded-xl object-cover border border-teal-500/40 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-white">{upcomingHomeVisits[0].assignedWorkerName || "Sister Florence Nabatanzi"}</p>
                  <p className="text-[11px] text-teal-400">Community Outreach Nurse</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Date: {upcomingHomeVisits[0].scheduledDate}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No home nurse visits scheduled this week.</p>
          )}
        </div>

        {/* Daily Medication & Care Plan */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>Daily Medicine & Blood Pressure Plan</span>
            </h3>
            <button
              onClick={() => onNavigate('chronic')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
            >
              My Plan
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">Amlodipine 5mg (1 tablet daily)</p>
                <p className="text-[11px] text-slate-400">Taken morning at 08:00 AM</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
                96% Taken
              </span>
            </div>

            <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-800/30">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                alt="Dr. Ronald Mukasa"
                className="w-10 h-10 rounded-xl object-cover border border-teal-500/40 shrink-0"
              />
              <div className="text-[11px]">
                <p className="font-bold text-white">Supervised by Dr. Ronald Mukasa</p>
                <p className="text-slate-400">Next review date: 2026-09-20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
