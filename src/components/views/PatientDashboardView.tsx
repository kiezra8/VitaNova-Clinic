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
  PlusCircle,
  PhoneCall
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
}) => {
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
      id: 'watch',
      badge: 'Smart Monitoring',
      title: 'CareWatch Telemetry',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=90',
      tab: 'watch' as NavTab
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

  // 6 Services — 3 columns × 2 rows
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

      {/* ── 1. CAROUSEL ─── Clear full images, minimal text overlay, no buttons ── */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{ height: '200px' }}
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
            {/* Full-bleed crystal clear image — no dimming overlay */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Ultra-minimal bottom label — just a narrow translucent pill so image stays dominant */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-teal-300">{slide.badge}</span>
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

        {/* Slide indicator dots — top right, unobtrusive */}
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

      {/* ── 2. SIX SERVICES — 3 cols × 2 rows — Compact square cards with background images ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-white">Clinical Services</h2>
          <span className="text-[10px] text-teal-400 font-semibold">6 Available</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {clinicServices.map((svc) => {
            const IconComp = svc.icon;
            return (
              <button
                key={svc.id}
                onClick={() => onNavigate(svc.tab)}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-800/80 hover:border-teal-500/60 shadow-md transition-all duration-200 active:scale-95"
              >
                {/* Background image */}
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient for text readability only at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Icon at top */}
                <div className="absolute top-1.5 left-1.5 w-7 h-7 rounded-xl bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 flex items-center justify-center">
                  <IconComp className="w-3.5 h-3.5 text-teal-300" />
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-1.5 inset-x-1.5 text-center">
                  <p className="text-[9px] sm:text-[10px] font-extrabold text-white leading-tight">
                    {svc.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. CLINICIAN QUICK CONNECT ── */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  title="Direct Inbox"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. CARE PLAN & HOME VISIT SUMMARY ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Upcoming Visit */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>Next Home Visit</span>
            </h3>
            <button onClick={() => onNavigate('homecare')} className="text-[10px] text-teal-400 font-semibold">Details</button>
          </div>

          {upcomingHomeVisits.length > 0 ? (
            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <img
                src={upcomingHomeVisits[0].assignedWorkerAvatar || 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80'}
                alt="Nurse"
                className="w-9 h-9 rounded-lg object-cover border border-teal-500/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white truncate">{upcomingHomeVisits[0].assignedWorkerName || 'Sister Florence'}</p>
                <p className="text-[9px] text-teal-400 truncate">Community Nurse</p>
                <p className="text-[9px] text-slate-400 flex items-center space-x-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{upcomingHomeVisits[0].scheduledDate}</span>
                </p>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 shrink-0">Confirmed</span>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400">No visits scheduled this week.</p>
          )}
        </div>

        {/* Medication & Care Plan */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>Daily Medicine Plan</span>
            </h3>
            <button onClick={() => onNavigate('chronic')} className="text-[10px] text-teal-400 font-semibold">My Plan</button>
          </div>

          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-white">Amlodipine 5mg</p>
              <p className="text-[9px] text-slate-400">08:00 AM daily</p>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 shrink-0">96% Taken</span>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-xl bg-slate-800/30">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
              alt="Dr. Ronald Mukasa"
              className="w-8 h-8 rounded-lg object-cover border border-teal-500/30 shrink-0"
            />
            <div>
              <p className="text-[10px] font-bold text-white">Dr. Ronald Mukasa</p>
              <p className="text-[9px] text-slate-400">Review: 2026-09-20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardView;
