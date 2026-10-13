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
  Heart,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Star,
  Play
} from 'lucide-react';
import { PatientProfile, VitalRecord, CarePlan, HomeCareRequest, HealthcareWorker } from '../../types';
import { NavTab } from '../layout/Navigation';
import { KiEzraAvatarPlayer } from './KiEzraAvatarPlayer';

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
  upcomingHomeVisits,
  clinicians,
  onNavigate,
  onOpenAddVitals,
  onStartCall,
  onOpenDirectChat,
}) => {
  const firstName = patient?.fullName ? patient.fullName.split(' ')[0] : 'Valued Patient';
  const latestVital = latestVitals[0];

  // ── Carousel Slides ───────────────────────────────────────────────
  const carouselSlides = [
    {
      id: 'telehealth',
      badge: '24/7 Virtual Telehealth',
      title: 'In-App Video Consultation',
      subtitle: 'Connect instantly with verified doctors — no external apps or cellular line needed',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=90',
      tab: 'consultation' as NavTab,
      btnLabel: 'Talk to Doctor Now'
    },
    {
      id: 'education',
      badge: 'Diseases Known to Mankind',
      title: 'AI Medical Video Library',
      subtitle: 'Genesis of medical science & health talks — Narrated by K.I Ezra',
      image: '/genesis_thumb.jpg',
      tab: 'education' as NavTab,
      btnLabel: 'Watch Health Videos'
    },
    {
      id: 'homecare',
      badge: 'Doorstep Care In Kampala',
      title: 'Nurse Home Visits',
      subtitle: 'Certified clinical nurses come directly to your home for bedside care',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=90',
      tab: 'homecare' as NavTab,
      btnLabel: 'Request Home Visit'
    },
    {
      id: 'fitness',
      badge: 'Fitness & Wellness',
      title: 'Personalized Weight Loss',
      subtitle: 'Track your daily calories, active workouts & metabolic milestones',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=90',
      tab: 'fitness' as NavTab,
      btnLabel: 'Explore Fitness'
    },
    {
      id: 'family',
      badge: 'Family Protection Circle',
      title: 'Manage Family Vitals',
      subtitle: 'Keep your spouse, children, and parents covered with connected medical histories',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=90',
      tab: 'family' as NavTab,
      btnLabel: 'Family Health'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
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
      title: 'Fitness Hub',
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

  const primaryClinician = clinicians[0] || {
    id: 'doc_israel',
    name: 'Dr. Israel Kisakye',
    specialty: 'Chief Medical Consultant & Telehealth Lead',
    avatar: '/ki_ezra_avatar.jpg',
    feeUGX: 45000,
    rating: 5.0,
    reviewCount: 164
  };

  return (
    <div className="space-y-6 pb-24 max-w-full overflow-hidden">

      {/* ── 1. WELCOME & INSTANT IN-APP TELEHEALTH HERO ── */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 p-4 sm:p-5 rounded-3xl border border-teal-500/25 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Telehealth Systems Online</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Encrypted In-App Network
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Hello, <span className="bg-gradient-to-r from-teal-300 to-emerald-200 bg-clip-text text-transparent">{firstName}</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              Consult with registered physicians via private in-app video & voice calls. Guest patients and members welcome.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onStartCall(primaryClinician as any, 'video')}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-teal-500/25 transition-all active:scale-95"
            >
              <Video className="w-4 h-4 fill-slate-950" />
              <span>1-Tap In-App Call</span>
            </button>
            <button
              onClick={() => onNavigate('education')}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-teal-300 border border-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-teal-300" />
              <span>Watch Talks</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. FEATURED CAROUSEL ─────────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group"
        style={{ height: '240px' }}
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
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Rich gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 mb-1 flex items-center space-x-1.5">
                <Sparkles className="w-3 h-3 text-teal-300" />
                <span>{slide.badge}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 mb-3.5 max-w-lg leading-relaxed">{slide.subtitle}</p>
              <button
                onClick={() => onNavigate(slide.tab)}
                className="self-start bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center space-x-2 transition-all active:scale-95 shadow-lg shadow-teal-500/30"
              >
                <span>{slide.btnLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute top-4 right-4 z-30 flex items-center space-x-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
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

      {/* ── 3. CLINIC SERVICES GRID ─────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            <h2 className="text-sm font-extrabold text-white tracking-tight">Clinic Care Portals</h2>
          </div>
          <span className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            10 Direct Services
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
          {clinicServices.map((svc) => {
            const IconComp = svc.icon;
            return (
              <button
                key={svc.id}
                onClick={() => onNavigate(svc.tab)}
                className="group relative h-[84px] sm:h-[96px] rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-400/60 shadow-sm hover:shadow-xl hover:shadow-teal-500/15 transition-all duration-200 active:scale-95 flex flex-col justify-between p-2"
                title={svc.title}
              >
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                />
                {/* Layered gradient for deep readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20 group-hover:from-slate-950/90 transition-all duration-300" />

                {/* Service Icon */}
                <div className="relative z-10 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-400 transition-colors duration-200">
                  <IconComp className="w-3 h-3 text-teal-300 group-hover:text-slate-950 transition-colors" />
                </div>

                {/* Service Title */}
                <div className="relative z-10 w-full">
                  <p className="text-[8.5px] sm:text-[10px] font-extrabold text-white leading-tight text-center drop-shadow-md truncate">
                    {svc.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. HEALTH OVERVIEW & VITALS SUMMARY ──────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-4 sm:p-5 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Clinical Vitals Summary</h2>
              <p className="text-[10px] text-slate-400">Offline-capable continuous telemetry</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenAddVitals}
              className="text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
            >
              + Log Vital
            </button>
            <button
              onClick={() => onNavigate('vitals')}
              className="text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5 transition-colors"
            >
              <span>Charts</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Blood Pressure */}
          <button
            onClick={() => onNavigate('vitals')}
            className="group p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-teal-500/50 text-left transition-all relative overflow-hidden"
          >
            <p className="text-[10px] text-slate-400 font-medium">Blood Pressure</p>
            <p className="text-lg font-black text-white mt-1 tracking-tight">
              {latestVital?.systolicBP ? `${latestVital.systolicBP}/${latestVital.diastolicBP}` : '128/82'}
            </p>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="text-[9.5px] font-bold text-emerald-400">Healthy Range</span>
            </div>
          </button>

          {/* Blood Sugar */}
          <button
            onClick={() => onNavigate('vitals')}
            className="group p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-teal-500/50 text-left transition-all relative overflow-hidden"
          >
            <p className="text-[10px] text-slate-400 font-medium">Blood Glucose</p>
            <p className="text-lg font-black text-white mt-1 tracking-tight">
              {latestVital?.bloodGlucose ?? '5.2'}{' '}
              <span className="text-[10px] text-slate-400 font-normal">mmol/L</span>
            </p>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[9.5px] font-bold text-emerald-400">Normal Fasting</span>
            </div>
          </button>

          {/* Heart Rate */}
          <button
            onClick={() => onNavigate('vitals')}
            className="group p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-teal-500/50 text-left transition-all relative overflow-hidden"
          >
            <p className="text-[10px] text-slate-400 font-medium">Heart Rate</p>
            <p className="text-lg font-black text-white mt-1 tracking-tight">
              {latestVital?.heartRate ?? '72'}{' '}
              <span className="text-[10px] text-slate-400 font-normal">bpm</span>
            </p>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
              <span className="text-[9.5px] font-bold text-teal-400">Steady Rhythm</span>
            </div>
          </button>

          {/* Oxygen SpO2 */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <p className="text-[10px] text-slate-400 font-medium">Oxygen Saturation</p>
            <p className="text-lg font-black text-white mt-1 tracking-tight">
              {latestVital?.spO2 ?? '99'}
              <span className="text-[10px] text-slate-400 font-normal">%</span>
            </p>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[9.5px] font-bold text-emerald-400">Optimal (SpO2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. AI MEDICAL VIDEO THEATER & AVATAR TALK ───────────────────── */}
      <KiEzraAvatarPlayer onNavigateToEducation={() => onNavigate('education')} />

      {/* ── 6. DIRECT IN-APP CARE TEAM (DOCTOR PHONE NUMBERS HIDDEN) ──── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-extrabold text-white tracking-tight">Verified Telehealth Care Team</h2>
          </div>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5 transition-colors"
          >
            <span>All Doctors</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clinicians.slice(0, 2).map((clinician) => (
            <div
              key={clinician.id}
              className="relative rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 bg-slate-900/90 transition-all shadow-lg"
            >
              {/* Subtle background photo strip */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="w-full h-full object-cover object-top opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
              </div>

              <div className="relative p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative shrink-0">
                      <img
                        src={clinician.avatar}
                        alt={clinician.name}
                        className="w-13 h-13 rounded-2xl object-cover border-2 border-teal-500/50 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <p className="text-sm font-extrabold text-white truncate">{clinician.name}</p>
                        {clinician.verified && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-teal-400 truncate font-semibold mt-0.5">{clinician.specialty}</p>

                      {/* Doctor Private Status Banner — Phone number is NEVER shown */}
                      <div className="flex items-center space-x-2 mt-1 text-[10px]">
                        <span className="text-teal-300 font-semibold flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                          <span>Direct In-App Line</span>
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-amber-400 font-bold flex items-center space-x-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <span>{clinician.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-[10px] font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                      UGX {clinician.feeUGX?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons — Strictly In-App */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80">
                  <button
                    onClick={() => onStartCall(clinician, 'video')}
                    className="py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-transform active:scale-95 shadow-md shadow-teal-500/20"
                    title="In-App Video Consultation"
                  >
                    <Video className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Video Call</span>
                  </button>
                  <button
                    onClick={() => onStartCall(clinician, 'audio')}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
                    title="In-App Voice Consultation"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    <span>Voice Call</span>
                  </button>
                  <button
                    onClick={() => onOpenDirectChat(clinician)}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
                    title="Encrypted Chat Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. CARE PLAN & HOME VISITS ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Next Home Visit */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md">
          <div className="relative h-20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
              alt="Home Visit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/40" />
            <div className="absolute inset-0 flex items-center px-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span className="text-sm font-bold text-white">Next Nurse Visit</span>
              </div>
              <button onClick={() => onNavigate('homecare')} className="ml-auto text-[10px] text-teal-400 font-bold">
                View Schedule →
              </button>
            </div>
          </div>
          <div className="p-3">
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
              <p className="text-[11px] text-slate-400 text-center py-2">No visits scheduled this week. Tap to book a home visit.</p>
            )}
          </div>
        </div>

        {/* Medicine Reminder */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md">
          <div className="relative h-20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
              alt="Medicine"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/40" />
            <div className="absolute inset-0 flex items-center px-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span className="text-sm font-bold text-white">Medication Adherence</span>
              </div>
              <button onClick={() => onNavigate('chronic')} className="ml-auto text-[10px] text-teal-400 font-bold">
                My Plan →
              </button>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Amlodipine 5mg (Daily)</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Taken this morning at 08:00 AM</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">96% Adherent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardView;
