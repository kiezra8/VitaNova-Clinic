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
  ChevronRight,
  Stethoscope,
  Dumbbell,
  Heart,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Star,
  Activity
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
  upcomingHomeVisits,
  clinicians,
  onNavigate,
  onOpenAddVitals,
  onStartCall,
  onOpenDirectChat,
}) => {
  const latestVital = latestVitals[0];

  // ── Carousel Slides — Clean background images, no buttons ────────────
  const carouselSlides = [
    {
      id: 'telehealth',
      label: '24/7 In-App Video Consultation',
      subtitle: 'Talk to a verified doctor anytime, privately',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1400&q=90',
      tab: 'consultation' as NavTab,
    },
    {
      id: 'homecare',
      label: 'Certified Nurse Home Visits',
      subtitle: 'Doorstep clinical care across Kampala',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=90',
      tab: 'homecare' as NavTab,
    },
    {
      id: 'family',
      label: 'Family Health Circle',
      subtitle: "Manage your entire household's health in one place",
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=90',
      tab: 'family' as NavTab,
    },
    {
      id: 'fitness',
      label: 'Personalized Fitness & Weight Loss',
      subtitle: 'Track workouts, calories & metabolic progress daily',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=90',
      tab: 'fitness' as NavTab,
    },
    {
      id: 'emergency',
      label: 'Emergency Medical Response',
      subtitle: '24/7 rapid dispatch and triage support in Kampala',
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1400&q=90',
      tab: 'emergency' as NavTab,
    },
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

  // ── 10 Services — image + label only, no icons, no emoji ────────────
  const clinicServices = [
    {
      id: 'consultation',
      title: 'Doctor Care',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      title: 'Home Nurse',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
      tab: 'homecare' as NavTab
    },
    {
      id: 'education',
      title: 'Health Videos',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
      tab: 'education' as NavTab
    },
    {
      id: 'fitness',
      title: 'Fitness Hub',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
      tab: 'fitness' as NavTab
    },
    {
      id: 'watch',
      title: 'Care Watch',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
      tab: 'watch' as NavTab
    },
    {
      id: 'records',
      title: 'My Records',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
      tab: 'records' as NavTab
    },
    {
      id: 'family',
      title: 'My Family',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
      tab: 'family' as NavTab
    },
    {
      id: 'chronic',
      title: 'Care Plan',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
      tab: 'chronic' as NavTab
    },
    {
      id: 'emergency',
      title: 'Emergency',
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=400&q=80',
      tab: 'emergency' as NavTab
    },
    {
      id: 'membership',
      title: 'Health Plans',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
      tab: 'membership' as NavTab
    }
  ];

  return (
    <div className="space-y-6 pb-24 max-w-full overflow-hidden">

      {/* ── 1. CAROUSEL — Clean background images, minimal overlay text, no buttons ── */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        style={{ height: '220px' }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => onNavigate(carouselSlides[currentSlide].tab)}
      >
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Full clear background image */}
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
            {/* Subtle bottom gradient only — keeps image clear */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

            {/* Text — bottom-left, clean and minimal */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-teal-300 mb-1">
                VitaNova Clinic
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                {slide.label}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 opacity-90">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center space-x-1.5">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
              aria-label={`Slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === i
                  ? 'w-5 h-1.5 bg-teal-400'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── 2. SERVICES GRID — 5 columns × 2 rows, bigger tiles, image + label only ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-white">Our Services</h2>
          <span className="text-[10px] text-teal-400 font-semibold bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
            10 Available
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {clinicServices.map((svc) => (
            <button
              key={svc.id}
              onClick={() => onNavigate(svc.tab)}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-200 active:scale-95"
              style={{ height: '100px' }}
              title={svc.title}
            >
              {/* Full image background */}
              <img
                src={svc.image}
                alt={svc.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Label only — centered at bottom */}
              <div className="absolute bottom-0 left-0 right-0 pb-2 px-1">
                <p className="text-[10px] sm:text-[11px] font-bold text-white text-center leading-tight drop-shadow-md">
                  {svc.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. VERIFIED CARE TEAM ── clean cards, no background image strip ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <h2 className="text-sm font-bold text-white">Your Care Team</h2>
          </div>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5 transition-colors"
          >
            <span>All Doctors</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clinicians.slice(0, 2).map((clinician) => (
            <div
              key={clinician.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-md"
            >
              <div className="p-4 space-y-3">
                {/* Doctor header row */}
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={clinician.avatar}
                      alt={clinician.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/40 shadow"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-0.5">
                      <p className="text-sm font-extrabold text-white truncate">{clinician.name}</p>
                      {clinician.verified && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-teal-400 font-semibold mt-0.5 truncate">{clinician.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1 text-[10px]">
                      <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        <span>In-App Line Active</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-amber-400 font-bold flex items-center space-x-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        <span>{clinician.rating}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-white font-bold text-[10px]">
                        UGX {clinician.feeUGX?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action row */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => onStartCall(clinician, 'video')}
                    className="py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] flex items-center justify-center space-x-1 transition-all active:scale-95 shadow-sm shadow-teal-500/20"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </button>
                  <button
                    onClick={() => onStartCall(clinician, 'audio')}
                    className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    <span>Voice</span>
                  </button>
                  <button
                    onClick={() => onOpenDirectChat(clinician)}
                    className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
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

      {/* ── 4. CLINICAL VITALS SUMMARY ── */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-5 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Clinical Vitals Summary</h2>
              <p className="text-[10px] text-slate-400">
                {latestVitals.length > 0
                  ? `${latestVitals.length} record${latestVitals.length === 1 ? '' : 's'} logged`
                  : 'No vitals logged yet'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenAddVitals}
              className="text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              + Log Vital
            </button>
            <button
              onClick={() => onNavigate('vitals')}
              className="text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5 transition-colors"
            >
              <span>View Charts</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {latestVital ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => onNavigate('vitals')}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/40 text-left transition-all"
            >
              <p className="text-[10px] text-slate-400 font-medium">Blood Pressure</p>
              <p className="text-lg font-black text-white mt-1 tracking-tight">
                {latestVital.systolicBP && latestVital.diastolicBP
                  ? `${latestVital.systolicBP}/${latestVital.diastolicBP}`
                  : '—'}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span className="text-[9.5px] font-bold text-emerald-400">Healthy</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('vitals')}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/40 text-left transition-all"
            >
              <p className="text-[10px] text-slate-400 font-medium">Blood Glucose</p>
              <p className="text-lg font-black text-white mt-1 tracking-tight">
                {latestVital.bloodGlucose != null ? latestVital.bloodGlucose : '—'}
                {latestVital.bloodGlucose != null && (
                  <span className="text-[10px] text-slate-400 font-normal"> mmol/L</span>
                )}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-[9.5px] font-bold text-emerald-400">Normal</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('vitals')}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/40 text-left transition-all"
            >
              <p className="text-[10px] text-slate-400 font-medium">Heart Rate</p>
              <p className="text-lg font-black text-white mt-1 tracking-tight">
                {latestVital.heartRate != null ? latestVital.heartRate : '—'}
                {latestVital.heartRate != null && (
                  <span className="text-[10px] text-slate-400 font-normal"> bpm</span>
                )}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
                <span className="text-[9.5px] font-bold text-teal-400">Steady</span>
              </div>
            </button>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <p className="text-[10px] text-slate-400 font-medium">Oxygen SpO2</p>
              <p className="text-lg font-black text-white mt-1 tracking-tight">
                {latestVital.spO2 != null ? latestVital.spO2 : '—'}
                {latestVital.spO2 != null && (
                  <span className="text-[10px] text-slate-400 font-normal">%</span>
                )}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-[9.5px] font-bold text-emerald-400">Optimal</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-slate-700 rounded-2xl">
            <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">No vitals logged yet</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Tap "+ Log Vital" to record your first reading</p>
            <button
              onClick={onOpenAddVitals}
              className="mt-3 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Record First Vital
            </button>
          </div>
        )}
      </div>

      {/* ── 5. NEXT HOME VISIT & MEDICATION REMINDER ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Next Home Visit */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="text-xs font-bold text-white">Next Nurse Visit</span>
            </div>
            <button onClick={() => onNavigate('homecare')} className="text-[10px] text-teal-400 font-semibold">
              View All
            </button>
          </div>
          <div className="px-4 pb-4">
            {upcomingHomeVisits.length > 0 ? (
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
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
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/20 shrink-0">
                  Confirmed
                </span>
              </div>
            ) : (
              <div className="text-center py-3">
                <p className="text-[11px] text-slate-500">No visits scheduled</p>
                <button
                  onClick={() => onNavigate('homecare')}
                  className="mt-2 text-[10px] text-teal-400 font-semibold hover:underline"
                >
                  Book a home visit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Medication Adherence */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="text-xs font-bold text-white">Medication</span>
            </div>
            <button onClick={() => onNavigate('chronic')} className="text-[10px] text-teal-400 font-semibold">
              Care Plan
            </button>
          </div>
          <div className="px-4 pb-4">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Amlodipine 5mg</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Daily at 08:00 AM</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                96% Adherent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardView;
