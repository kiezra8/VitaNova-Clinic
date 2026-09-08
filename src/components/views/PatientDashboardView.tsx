import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Stethoscope
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
  const [moodGreeting, setMoodGreeting] = useState<string | null>(null);

  // 5 Services Carousel Slides
  const carouselSlides = [
    {
      id: 'telehealth',
      badge: '24/7 Virtual Clinic',
      title: 'Talk Directly with Doctors & Midwives',
      description: 'Start instant video calls, phone calls, or private in-app chats with certified Ugandan physicians from Kampala and Wakiso.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Start Video Consultation',
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      badge: 'Doorstep Care in Kampala & Wakiso',
      title: 'Compassionate Nurse Visits to Your Home',
      description: 'Have a kind, certified community nurse come to your home for wound care, injections, post-operative support, and elderly checks.',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Book Home Nurse',
      tab: 'homecare' as NavTab
    },
    {
      id: 'education',
      badge: 'Doctor-Led Video Talks',
      title: 'Learn Disease Causes, Diet & Hospital Cures',
      description: 'Watch video talks by local doctors explaining high blood pressure, diabetes, malaria, and maternal health in simple local terms.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Watch Video Talks',
      tab: 'education' as NavTab
    },
    {
      id: 'watch',
      badge: 'Smart BLE Telemetry',
      title: 'CareWatch Pro 24/7 Health Monitoring',
      description: 'Continuous wrist telemetry for heart rate, SpO2, and fall detection with automatic offline sync to your clinician.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Open CareWatch',
      tab: 'watch' as NavTab
    },
    {
      id: 'family',
      badge: 'Whole Family Protection',
      title: 'VitaNova Family Health Circle',
      description: 'Safeguard your children and parents with shared health profiles, immunization schedules, and pooled doctor visits.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Family Health Circle',
      tab: 'family' as NavTab
    }
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance carousel every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, carouselSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  // 2 by 2 Square Cards with Very Curved Edges & Background Images
  const squareServices = [
    {
      id: 'consultation',
      title: 'Doctor & Midwife Care',
      subtitle: 'Video, phone calls & inboxes',
      tag: 'Doctors on Call',
      icon: Stethoscope,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      tab: 'consultation' as NavTab
    },
    {
      id: 'homecare',
      title: 'Home Nurse Visits',
      subtitle: 'Bedside wound care & checks',
      tag: 'Doorstep Care',
      icon: UserCheck,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
      tab: 'homecare' as NavTab
    },
    {
      id: 'education',
      title: 'Disease Video Talks',
      subtitle: 'Causes, diet & hospital cures',
      tag: 'Doctor Talks',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      tab: 'education' as NavTab
    },
    {
      id: 'watch',
      title: 'CareWatch & Telemetry',
      subtitle: 'Live wrist vitals & fall alert',
      tag: 'Smart Bluetooth',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      tab: 'watch' as NavTab
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 max-w-full overflow-hidden">
      {/* 1. Warm & Welcoming Human Greeting Banner */}
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

          {/* Quick Record & Emergency Buttons */}
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

      {/* 2. 5 SERVICES CAROUSEL */}
      <div
        className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Track */}
        <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Rich Multi-stop Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end space-y-2.5 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-teal-500/25 text-teal-300 border border-teal-500/40 backdrop-blur-md self-start">
                  {slide.badge}
                </span>

                <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-tight break-words">
                  {slide.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed break-words max-w-xl">
                  {slide.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate(slide.tab)}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/30 flex items-center space-x-2 transition-all active:scale-95"
                  >
                    <span>{slide.actionText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          aria-label="Previous service slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 transition-all shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextSlide}
          aria-label="Next service slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 transition-all shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicator Dots (5 slides) */}
        <div className="absolute bottom-3 right-4 z-20 flex items-center space-x-1.5 bg-slate-950/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-slate-800">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === i
                  ? 'w-6 h-2 bg-teal-400'
                  : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. DIFFERENT CATEGORIES / SERVICES IN A 2 BY 2 FORMAT WITH SQUARE CARDS & VERY CURVED EDGES */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Clinical Services & Specialties
            </h2>
            <p className="text-xs text-slate-400">
              Tap any category below to access specialized healthcare care
            </p>
          </div>
          <span className="text-[11px] font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
            4 Core Services
          </span>
        </div>

        {/* 2 by 2 Square Cards Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
          {squareServices.map((svc) => {
            const IconComp = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => onNavigate(svc.tab)}
                className="group relative aspect-square rounded-[28px] sm:rounded-[34px] overflow-hidden border border-slate-800 hover:border-teal-500/60 shadow-lg hover:shadow-teal-500/10 cursor-pointer transition-all duration-300 flex flex-col justify-between p-3.5 sm:p-5"
              >
                {/* Background Image */}
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlays for High Contrast & Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 group-hover:via-slate-950/60 transition-colors" />

                {/* Top Strip: Glowing Glass Icon & Mini Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/20 backdrop-blur-md border border-teal-500/40 text-teal-300 flex items-center justify-center shadow-md group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-500/30">
                    {svc.tag}
                  </span>
                </div>

                {/* Bottom Content: Title, Subtitle & Arrow */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-white group-hover:text-teal-300 transition-colors leading-snug break-words">
                    {svc.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1 break-words">
                    {svc.subtitle}
                  </p>
                  <div className="flex items-center text-[10px] sm:text-xs font-bold text-teal-400 pt-1 space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Service</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Direct Clinician Contact Strip: Video Call, Audio Call, Direct Inbox */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Connect Directly with Your Clinicians
            </h2>
            <p className="text-xs text-slate-400">
              Video call, phone call, or message your doctor right now
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

      {/* 5. Upcoming Home Nurse Visit & Active Care Plan */}
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

export default PatientDashboardView;
