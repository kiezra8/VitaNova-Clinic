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
  Heart
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

  // ── 5 Carousel Slides ──────────────────────────────────────────────
  const carouselSlides = [
    {
      id: 'telehealth',
      badge: '24/7 Virtual Clinic',
      title: 'Talk to a Doctor',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=90',
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      badge: 'Doorstep Care',
      title: 'Nurse Home Visits',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=90',
      tab: 'homecare' as NavTab
    },
    {
      id: 'education',
      badge: 'Doctor Video Talks',
      title: 'Health Education',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=90',
      tab: 'education' as NavTab
    },
    {
      id: 'fitness',
      badge: 'Fitness & Wellness',
      title: 'Weight Loss Journey',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=90',
      tab: 'fitness' as NavTab
    },
    {
      id: 'family',
      badge: 'Family Protection',
      title: 'Family Health Circle',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=90',
      tab: 'family' as NavTab
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

  // ── 7 Services (3 cols × 2 rows top + 1 wide on the last row if odd, but we use 3×3 with 1 removed = 3+3+1) ──
  // For 7 items in grid-cols-3: rows = ⌈7/3⌉ = 3 rows, last row has 1 card
  // We'll do 6 items in 3×2 + fitness as wide card below, but user said "include fitness in services", so 7 in grid-cols-3.
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
      title: 'Fitness & Weight',
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
    }
  ];

  return (
    <div className="space-y-4 pb-20 max-w-full overflow-hidden">

      {/* ── 1. CAROUSEL ─── Crystal clear images, minimal bottom pill only ── */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{ height: '190px' }}
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
            {/* Full-bleed image — image is the star, not covered by overlays */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Narrow bottom strip only — does NOT cover the image */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 bg-black/45 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-teal-300 uppercase tracking-wide">{slide.badge}</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="text-[10px] font-extrabold text-white">{slide.title}</span>
              </div>
              <button
                onClick={() => onNavigate(slide.tab)}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[10px] px-2.5 py-1.5 rounded-xl shadow-md flex items-center space-x-1 transition-all active:scale-95"
              >
                <span>Open</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {/* Top-right indicator dots only — no arrow buttons */}
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === i ? 'w-4 h-1.5 bg-teal-400' : 'w-1.5 h-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── 2. SERVICES — 7 items in 3 cols grid, each navigates to its own page ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-white">Our Services</h2>
          <span className="text-[10px] text-teal-400 font-semibold">7 Available</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {clinicServices.map((svc) => {
            const IconComp = svc.icon;
            return (
              <button
                key={svc.id}
                onClick={() => onNavigate(svc.tab)}
                className="group relative h-[78px] rounded-xl overflow-hidden border border-slate-800/80 hover:border-teal-500/60 shadow-md transition-all duration-200 active:scale-95"
              >
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Icon top-left */}
                <div className="absolute top-1 left-1 w-5 h-5 rounded-md bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <IconComp className="w-2.5 h-2.5 text-teal-300" />
                </div>

                {/* Title bottom */}
                <div className="absolute bottom-1 inset-x-1 text-center">
                  <p className="text-[8px] font-extrabold text-white leading-tight drop-shadow-lg">
                    {svc.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. HEALTH OVERVIEW (below services as requested) ── */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center space-x-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Health Overview — {firstName}</span>
          </h2>
          <button
            onClick={() => onNavigate('vitals')}
            className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5"
          >
            <span>See Charts</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Blood Pressure */}
          <button
            onClick={() => onNavigate('vitals')}
            className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800 hover:border-teal-500/40 text-left transition-all"
          >
            <p className="text-[10px] text-slate-400 font-medium">Blood Pressure</p>
            <p className="text-base font-extrabold text-white mt-0.5">
              {latestVital?.systolicBP ? `${latestVital.systolicBP}/${latestVital.diastolicBP}` : '128/82'}
            </p>
            <span className="text-[9px] font-bold text-emerald-400">✓ Healthy</span>
          </button>

          {/* Blood Sugar */}
          <button
            onClick={() => onNavigate('vitals')}
            className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800 hover:border-teal-500/40 text-left transition-all"
          >
            <p className="text-[10px] text-slate-400 font-medium">Blood Sugar</p>
            <p className="text-base font-extrabold text-white mt-0.5">
              {latestVital?.bloodGlucose ?? '5.2'} <span className="text-[9px] text-slate-400">mmol/L</span>
            </p>
            <span className="text-[9px] font-bold text-emerald-400">✓ Normal</span>
          </button>

          {/* Heart Rate */}
          <button
            onClick={() => onNavigate('vitals')}
            className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800 hover:border-teal-500/40 text-left transition-all"
          >
            <p className="text-[10px] text-slate-400 font-medium">Heart Rate</p>
            <p className="text-base font-extrabold text-white mt-0.5">
              {latestVital?.heartRate ?? '70'} <span className="text-[9px] text-slate-400">bpm</span>
            </p>
            <span className="text-[9px] font-bold text-teal-400">✓ Steady</span>
          </button>

          {/* Oxygen */}
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-medium">Oxygen SpO2</p>
            <p className="text-base font-extrabold text-white mt-0.5">
              {latestVital?.spO2 ?? '99'}%
            </p>
            <span className="text-[9px] font-bold text-emerald-400">✓ Optimal</span>
          </div>
        </div>
      </div>

      {/* ── 4. CARE TEAM QUICK CONNECT ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-white">Your Care Team</h2>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-0.5"
          >
            <span>All Clinicians</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {clinicians.slice(0, 2).map((clinician) => (
            <div
              key={clinician.id}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all"
            >
              <div className="relative shrink-0">
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="w-11 h-11 rounded-xl object-cover border border-teal-500/30"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{clinician.name}</p>
                <p className="text-[10px] text-teal-400 truncate">{clinician.specialty}</p>
              </div>
              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={() => onStartCall(clinician, 'video')}
                  className="w-8 h-8 rounded-xl bg-teal-500/15 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 flex items-center justify-center transition-colors"
                  title="Video Call"
                >
                  <Video className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onStartCall(clinician, 'audio')}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
                  title="Voice Call"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                </button>
                <button
                  onClick={() => onOpenDirectChat(clinician)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
                  title="Message"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. CARE PLAN & NEXT VISIT ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Next Visit */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>Next Home Visit</span>
            </h3>
            <button onClick={() => onNavigate('homecare')} className="text-[10px] text-teal-400 font-semibold">
              Details
            </button>
          </div>
          {upcomingHomeVisits.length > 0 ? (
            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <img
                src={upcomingHomeVisits[0].assignedWorkerAvatar || 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=200&q=80'}
                alt="Nurse"
                className="w-9 h-9 rounded-lg object-cover border border-teal-500/30 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white truncate">{upcomingHomeVisits[0].assignedWorkerName || 'Sister Florence'}</p>
                <p className="text-[9px] text-slate-400 flex items-center space-x-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5 text-slate-500" />
                  <span>{upcomingHomeVisits[0].scheduledDate}</span>
                </p>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 shrink-0">Confirmed</span>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400">No visits scheduled this week.</p>
          )}
        </div>

        {/* Medicine Reminder */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>Medicine Reminder</span>
            </h3>
            <button onClick={() => onNavigate('chronic')} className="text-[10px] text-teal-400 font-semibold">
              Care Plan
            </button>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-white">Amlodipine 5mg</p>
              <p className="text-[9px] text-slate-400">Daily at 08:00 AM</p>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">96% Taken</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-xl bg-slate-800/30">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
              alt="Dr. Mukasa"
              className="w-7 h-7 rounded-lg object-cover border border-teal-500/30 shrink-0"
            />
            <div>
              <p className="text-[9px] font-bold text-white">Dr. Ronald Mukasa</p>
              <p className="text-[9px] text-slate-400">Review: Sep 20, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardView;
