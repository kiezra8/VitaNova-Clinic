import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MessageSquare,
  Video,
  Phone,
  ChevronRight,
  CheckCircle2,
  X,
  MapPin,
  Sparkles
} from 'lucide-react';
import { PatientProfile, VitalRecord, CarePlan, HomeCareRequest, HealthcareWorker } from '../../types';
import { NavTab } from '../layout/Navigation';

interface DashboardProps {
  patient: PatientProfile;
  latestVitals?: VitalRecord[];
  activeCarePlan?: CarePlan;
  upcomingHomeVisits?: HomeCareRequest[];
  clinicians: HealthcareWorker[];
  onNavigate: (tab: NavTab) => void;
  onOpenAddVitals?: () => void;
  onStartCall: (clinician: HealthcareWorker, type: 'video' | 'audio') => void;
  onOpenDirectChat: (clinician: HealthcareWorker) => void;
  networkState?: string;
  lastSyncedTime?: string | null;
  pendingCount?: number;
  onRequestHomeCare?: (req: Omit<HomeCareRequest, 'id' | 'syncStatus'>) => Promise<void>;
}

export const PatientDashboardView: React.FC<DashboardProps> = ({
  patient,
  clinicians,
  onNavigate,
  onStartCall,
  onOpenDirectChat,
  onRequestHomeCare
}) => {
  // ── Carousel Slides ──────────────────────────────────────────────────
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

  // ── Categories (10 Clinic Services) ──────────────────────────────────
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

  // ── Separation: Doctors on Call vs Allied Health Workers ──────────────
  const doctorsOnCall = clinicians.filter(
    (c) => c.profession?.toLowerCase() === 'doctor' || !c.profession
  );

  const alliedWorkers = clinicians.filter(
    (c) => c.profession?.toLowerCase() !== 'doctor' && !!c.profession
  );

  // ── Booking Modal State ──────────────────────────────────────────────
  const [selectedWorkerForBooking, setSelectedWorkerForBooking] = useState<HealthcareWorker | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingAddress, setBookingAddress] = useState<string>('Plot 14, Ntinda-Nakawa Road, Kampala');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState<string | null>(null);

  const handleOpenBooking = (worker: HealthcareWorker) => {
    setSelectedWorkerForBooking(worker);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkerForBooking) return;
    setIsSubmittingBooking(true);
    try {
      if (onRequestHomeCare) {
        await onRequestHomeCare({
          patientId: patient.id || 'pat_sarah_001',
          patientName: patient.fullName || 'Sarah Namubiru',
          serviceType:
            selectedWorkerForBooking.profession === 'Physiotherapist'
              ? 'Physiotherapy'
              : selectedWorkerForBooking.profession === 'Midwife'
              ? 'Midwifery'
              : 'Nursing',
          address: bookingAddress,
          scheduledDate: bookingDate,
          status: 'confirmed',
          clinicalNotes: bookingNotes || `Booked appointment with ${selectedWorkerForBooking.name} (${selectedWorkerForBooking.profession})`,
          assignedWorkerId: selectedWorkerForBooking.id,
          assignedWorkerName: selectedWorkerForBooking.name,
          assignedWorkerAvatar: selectedWorkerForBooking.avatar
        });
      }
      setBookingSuccessMessage(`Appointment successfully booked with ${selectedWorkerForBooking.name}!`);
      setTimeout(() => setBookingSuccessMessage(null), 5000);
      setSelectedWorkerForBooking(null);
      setBookingNotes('');
    } catch {
      // Fallback
      onNavigate('homecare');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="space-y-7 pb-20 max-w-full overflow-hidden bg-white text-slate-900">

      {/* Booking Success Toast */}
      {bookingSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold">{bookingSuccessMessage}</p>
          </div>
          <button
            onClick={() => setBookingSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── 1. CAROUSEL ─────────────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 cursor-pointer"
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
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-teal-300 mb-1 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-teal-300 inline" />
                <span>VitaNova Clinic</span>
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                {slide.label}
              </h2>
              <p className="text-xs text-slate-200 mt-0.5 opacity-90">{slide.subtitle}</p>
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
                  : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── 2. CATEGORIES (Our Services) ─────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Our Services</h2>
          </div>
          <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            10 Categories
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {clinicServices.map((svc) => (
            <button
              key={svc.id}
              onClick={() => onNavigate(svc.tab)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
              style={{ height: '105px' }}
              title={svc.title}
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 pb-2 px-1">
                <p className="text-[10px] sm:text-xs font-bold text-white text-center leading-tight drop-shadow-md">
                  {svc.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. DOCTORS ON CALL (Profiles: Image, Video, Audio Call, Message) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Doctors on Call</h2>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live
            </span>
          </div>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-0.5 transition-colors"
          >
            <span>All Doctors</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {doctorsOnCall.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all p-3.5 flex flex-col items-center justify-between space-y-3"
            >
              {/* Doctor Image Profile */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Clean image overlay badge for doctor identity and online status */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-2.5">
                  <div className="flex items-center space-x-1.5 min-w-0 w-full">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white animate-pulse shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-white truncate drop-shadow">
                      {doc.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Video Call, Audio Call, Message */}
              <div className="grid grid-cols-3 gap-2 w-full pt-0.5">
                <button
                  onClick={() => onStartCall(doc, 'video')}
                  className="py-2.5 px-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm shadow-teal-600/25 transition-all"
                  title={`Start Video Consultation with ${doc.name}`}
                >
                  <Video className="w-3.5 h-3.5 shrink-0" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => onStartCall(doc, 'audio')}
                  className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center space-x-1.5 transition-all"
                  title={`Start Audio Call with ${doc.name}`}
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Audio</span>
                </button>
                <button
                  onClick={() => onOpenDirectChat(doc)}
                  className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center space-x-1.5 transition-all"
                  title={`Direct Message ${doc.name}`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. NURSES, MIDWIVES & PHYSIOTHERAPISTS (Profession + Booking Button) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Nurses, Midwives & Physiotherapists
            </h2>
          </div>
          <button
            onClick={() => onNavigate('homecare')}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-0.5 transition-colors"
          >
            <span>Home Visits</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {alliedWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all p-3.5 flex flex-col items-center justify-between space-y-3"
            >
              {/* Profile Image — Same large aspect-[4/3] card format as doctors */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Profession Badge */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-sm text-teal-300 border border-teal-500/30 shadow-md">
                    {worker.profession}
                  </span>
                </div>

                {/* Name & Active Status Indicator Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-2.5">
                  <div className="flex items-center space-x-1.5 min-w-0 w-full">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 border border-white animate-pulse shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-white truncate drop-shadow">
                      {worker.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Booking Button */}
              <div className="w-full pt-0.5">
                <button
                  onClick={() => handleOpenBooking(worker)}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm shadow-teal-600/25 transition-all"
                  title={`Book Appointment with ${worker.name} (${worker.profession})`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NO FURTHER SECTIONS RENDERED ON HOME DASHBOARD ─────────────── */}

      {/* ── Booking Modal for Nurses, Midwives & Physiotherapists ───────── */}
      {selectedWorkerForBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedWorkerForBooking.avatar}
                  alt={selectedWorkerForBooking.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {selectedWorkerForBooking.name}
                  </h3>
                  <span className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    {selectedWorkerForBooking.profession}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorkerForBooking(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>Home Visit Address (Kampala / Wakiso)</span>
                </label>
                <input
                  type="text"
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  placeholder="e.g. Plot 14, Ntinda-Nakawa Road"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Care Notes / Reason for Visit</span>
                </label>
                <textarea
                  rows={3}
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium resize-none"
                  placeholder="Describe needed care: e.g. Postpartum counseling, wound dressing, or mobility rehab."
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedWorkerForBooking(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold shadow-sm shadow-teal-600/30 transition-all flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isSubmittingBooking ? 'Booking...' : 'Confirm Appointment'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default PatientDashboardView;
