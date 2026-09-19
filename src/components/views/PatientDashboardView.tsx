import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Shield,
  Watch,
  BookOpen,
  Users,
  MessageSquare,
  Video,
  Phone,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  Dumbbell,
  CheckCircle2,
  Activity,
  Heart,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { PatientProfile, VitalRecord, CarePlan, HomeCareRequest, HealthcareWorker } from '../../types';
import { NavTab } from '../layout/Navigation';

interface DashboardProps {
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

export const PatientDashboardView: React.FC<DashboardProps> = ({
  patient,
  latestVitals,
  activeCarePlan,
  upcomingHomeVisits,
  clinicians,
  onNavigate,
  onOpenAddVitals,
  onStartCall,
  onOpenDirectChat,
}) => {
  const firstName = patient.fullName.split(' ')[0];
  const latestVital = latestVitals[0];

  // ── Carousel Slides ───────────────────────────────────────────────
  const carouselSlides = [
    {
      id: 'telehealth',
      badge: '24/7 Virtual Clinic',
      title: 'Talk to a Doctor',
      subtitle: 'Connect instantly with licensed physicians',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=90',
      tab: 'consultation' as NavTab,
      accent: 'from-teal-600/80 to-transparent'
    },
    {
      id: 'homecare',
      badge: 'Doorstep Care',
      title: 'Nurse Home Visits',
      subtitle: 'Certified nurses come to your home',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=90',
      tab: 'homecare' as NavTab,
      accent: 'from-emerald-600/80 to-transparent'
    },
    {
      id: 'education',
      badge: 'Uganda Clinical Guidelines (UCG)',
      title: 'Clinical Guideline Videos',
      subtitle: 'Watch animated MoH clinical treatment videos',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=90',
      tab: 'education' as NavTab,
      accent: 'from-blue-600/80 to-transparent'
    },
    {
      id: 'fitness',
      badge: 'Fitness & Wellness',
      title: 'Weight Loss Journey',
      subtitle: 'Guided workout & nutrition plans',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=90',
      tab: 'fitness' as NavTab,
      accent: 'from-orange-600/80 to-transparent'
    },
    {
      id: 'family',
      badge: 'Family Protection',
      title: 'Family Health Circle',
      subtitle: 'Manage everyone\'s health in one place',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=90',
      tab: 'family' as NavTab,
      accent: 'from-pink-600/80 to-transparent'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, carouselSlides.length]);

  // ── Services ───────────────────────────────────────────────────────
  const clinicServices = [
    {
      id: 'consultation',
      title: 'Doctor Care',
      icon: Stethoscope,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      title: 'Home Nurse',
      icon: UserCheck,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
      tab: 'homecare' as NavTab
    },
    {
      id: 'education',
      title: 'Health Talks',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
      tab: 'education' as NavTab
    },
    {
      id: 'fitness',
      title: 'Fitness',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
      tab: 'fitness' as NavTab
    },
    {
      id: 'watch',
      title: 'CareWatch',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
      tab: 'watch' as NavTab
    },
    {
      id: 'records',
      title: 'My Records',
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
      tab: 'records' as NavTab
    },
    {
      id: 'family',
      title: 'My Family',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
      tab: 'family' as NavTab
    },
    {
      id: 'chronic',
      title: 'Care Plan',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
      tab: 'chronic' as NavTab
    },
    {
      id: 'emergency',
      title: 'Emergency',
      icon: AlertCircle,
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=400&q=80',
      tab: 'emergency' as NavTab
    },
    {
      id: 'membership',
      title: 'Health Plans',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
      tab: 'membership' as NavTab
    }
  ];

  return (
    <div className="space-y-5 pb-24 max-w-full overflow-hidden">

      {/* ── 1. CAROUSEL ─────────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ height: '230px' }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Rich gradient overlay from left */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 mb-1">
                {slide.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 mb-3">{slide.subtitle}</p>
              <button
                onClick={() => onNavigate(slide.tab)}
                className="self-start bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all active:scale-95 shadow-lg shadow-teal-500/25"
              >
                <span>Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Slide dots */}
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === i ? 'w-5 h-1.5 bg-teal-400' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── 2. SERVICES GRID ─────────────────────────────────────────── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-white">Our Services</h2>
          <span className="text-[10px] text-teal-400 font-semibold bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
            10 Available
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {clinicServices.map((svc) => {
            const IconComp = svc.icon;
            return (
              <button
                key={svc.id}
                onClick={() => onNavigate(svc.tab)}
                className="group relative h-[78px] sm:h-[88px] rounded-2xl overflow-hidden border border-slate-800/80 hover:border-teal-400/60 shadow-sm hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-200 active:scale-95 flex flex-col justify-between p-1.5"
                title={svc.title}
              >
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Layered gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10 group-hover:from-slate-950/80 transition-all duration-300" />

                {/* Icon */}
                <div className="relative z-10 w-6 h-6 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-teal-500/30 group-hover:border-teal-400/40 transition-colors duration-200">
                  <IconComp className="w-3 h-3 text-teal-300" />
                </div>

                {/* Title */}
                <div className="relative z-10 w-full">
                  <p className="text-[8px] sm:text-[9.5px] font-bold text-white leading-tight text-center drop-shadow-md truncate">
                    {svc.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. HEALTH OVERVIEW ────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 rounded-3xl border border-slate-800 p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <span>Health Overview — {firstName}</span>
          </h2>
          <button
            onClick={() => onNavigate('vitals')}
            className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5 transition-colors"
          >
            <span>See Charts</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Blood Pressure */}
          <button
            onClick={() => onNavigate('vitals')}
            className="group p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-teal-500/50 hover:bg-slate-800/80 text-left transition-all"
          >
            <p className="text-[10px] text-slate-400 font-medium">Blood Pressure</p>
            <p className="text-lg font-extrabold text-white mt-1 tracking-tight">
              {latestVital?.systolicBP ? `${latestVital.systolicBP}/${latestVital.diastolicBP}` : '128/82'}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[9px] font-bold text-emerald-400">Healthy</span>
            </div>
          </button>

          {/* Blood Sugar */}
          <button
            onClick={() => onNavigate('vitals')}
            className="group p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-teal-500/50 hover:bg-slate-800/80 text-left transition-all"
          >
            <p className="text-[10px] text-slate-400 font-medium">Blood Sugar</p>
            <p className="text-lg font-extrabold text-white mt-1 tracking-tight">
              {latestVital?.bloodGlucose ?? '5.2'}{' '}
              <span className="text-[10px] text-slate-400 font-medium">mmol/L</span>
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[9px] font-bold text-emerald-400">Normal</span>
            </div>
          </button>

          {/* Heart Rate */}
          <button
            onClick={() => onNavigate('vitals')}
            className="group p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-teal-500/50 hover:bg-slate-800/80 text-left transition-all"
          >
            <p className="text-[10px] text-slate-400 font-medium">Heart Rate</p>
            <p className="text-lg font-extrabold text-white mt-1 tracking-tight">
              {latestVital?.heartRate ?? '70'}{' '}
              <span className="text-[10px] text-slate-400 font-medium">bpm</span>
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
              <span className="text-[9px] font-bold text-teal-400">Steady</span>
            </div>
          </button>

          {/* Oxygen SpO2 */}
          <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <p className="text-[10px] text-slate-400 font-medium">Oxygen SpO2</p>
            <p className="text-lg font-extrabold text-white mt-1 tracking-tight">
              {latestVital?.spO2 ?? '99'}
              <span className="text-[10px] text-slate-400 font-medium">%</span>
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[9px] font-bold text-emerald-400">Optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. CARE TEAM ─────────────────────────────────────────────── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-white">Your Care Team</h2>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5 transition-colors"
          >
            <span>All Clinicians</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clinicians.slice(0, 2).map((clinician) => (
            <div
              key={clinician.id}
              className="relative rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all shadow-md"
            >
              {/* Background photo strip */}
              <div className="absolute inset-0">
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="w-full h-full object-cover object-top opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/80" />
              </div>

              <div className="relative flex items-center space-x-3 p-3.5">
                <div className="relative shrink-0">
                  <img
                    src={clinician.avatar}
                    alt={clinician.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500/40 shadow-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{clinician.name}</p>
                  <p className="text-[11px] text-teal-400 truncate font-medium">{clinician.specialty}</p>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="text-[10px] text-amber-400">★ {clinician.rating}</span>
                    <span className="text-slate-600 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-400">{clinician.experienceYears} yrs</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => onStartCall(clinician, 'video')}
                    className="w-9 h-9 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center transition-colors shadow-md shadow-teal-500/20"
                    title="Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onStartCall(clinician, 'audio')}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
                    title="Voice Call"
                  >
                    <Phone className="w-4 h-4 text-teal-400" />
                  </button>
                  <button
                    onClick={() => onOpenDirectChat(clinician)}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
                    title="Message"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. CARE PLAN & NEXT VISIT ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Next Home Visit */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-md">
          {/* Photo header */}
          <div className="relative h-20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
              alt="Home Visit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
            <div className="absolute inset-0 flex items-center px-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span className="text-sm font-bold text-white">Next Home Visit</span>
              </div>
              <button onClick={() => onNavigate('homecare')} className="ml-auto text-[10px] text-teal-400 font-semibold">
                Details
              </button>
            </div>
          </div>
          <div className="p-3 bg-slate-900">
            {upcomingHomeVisits.length > 0 ? (
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <img
                  src={upcomingHomeVisits[0].assignedWorkerAvatar || 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=200&q=80'}
                  alt="Nurse"
                  className="w-10 h-10 rounded-xl object-cover border border-teal-500/30 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{upcomingHomeVisits[0].assignedWorkerName || 'Sister Florence'}</p>
                  <p className="text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5 text-slate-500" />
                    <span>{upcomingHomeVisits[0].scheduledDate}</span>
                  </p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/20 shrink-0">Confirmed</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 text-center py-1">No visits scheduled this week.</p>
            )}
          </div>
        </div>

        {/* Medicine Reminder */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-md">
          {/* Photo header */}
          <div className="relative h-20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
              alt="Medicine"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
            <div className="absolute inset-0 flex items-center px-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span className="text-sm font-bold text-white">Medicine Reminder</span>
              </div>
              <button onClick={() => onNavigate('chronic')} className="ml-auto text-[10px] text-teal-400 font-semibold">
                Care Plan
              </button>
            </div>
          </div>
          <div className="p-3 bg-slate-900 space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Amlodipine 5mg</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Daily at 08:00 AM</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">96% Taken</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-xl bg-slate-800/30">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
                alt="Dr. Mukasa"
                className="w-8 h-8 rounded-xl object-cover border border-teal-500/30 shrink-0"
              />
              <div>
                <p className="text-[10px] font-bold text-white">Dr. Ronald Mukasa</p>
                <p className="text-[10px] text-slate-400">Review: Sep 20, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardView;
