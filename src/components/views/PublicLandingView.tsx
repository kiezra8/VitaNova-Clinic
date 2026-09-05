import React from 'react';
import {
  Activity,
  ShieldCheck,
  WifiOff,
  RefreshCw,
  HeartPulse,
  Users,
  Stethoscope,
  PhoneCall,
  MessageSquare,
  Clock,
  CheckCircle2,
  Watch,
  BookOpen,
  ArrowRight,
  MapPin,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface PublicLandingProps {
  onGetStarted: () => void;
  onSelectDoctor: () => void;
  onExplorePlans: () => void;
  onEmergencyClick: () => void;
}

export const PublicLandingView: React.FC<PublicLandingProps> = ({
  onGetStarted,
  onSelectDoctor,
  onExplorePlans,
  onEmergencyClick
}) => {
  return (
    <div className="space-y-16 pb-24 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 rounded-3xl border border-slate-800/80 mx-2 sm:mx-4 px-4 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,148,136,0.15),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Kampala & Greater Uganda • Local-First PWA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Healthcare that <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">stays with you.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Connect with healthcare professionals, manage your medical records, access home care and stay connected to your health — online or offline.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/30 transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSelectDoctor}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Explore Services</span>
            </button>
          </div>

          {/* Offline-First Proof Points Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-teal-400 mb-1">
                <WifiOff className="w-4 h-4" />
                <span className="text-xs font-bold">100% Offline Records</span>
              </div>
              <p className="text-[11px] text-slate-400">Access vitals & history even when mobile data is exhausted.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-teal-400 mb-1">
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs font-bold">Auto Background Sync</span>
              </div>
              <p className="text-[11px] text-slate-400">Never lose a measurement. Syncs automatically when back online.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-teal-400 mb-1">
                <HeartPulse className="w-4 h-4" />
                <span className="text-xs font-bold">Verified Clinicians</span>
              </div>
              <p className="text-[11px] text-slate-400">Licensed doctors, nurses, midwives & physiotherapists in Uganda.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-teal-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">Clinical Conflict Safety</span>
              </div>
              <p className="text-[11px] text-slate-400">Append-oriented clinical audit trail. No silent overwrites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">How Local-First Healthcare Works</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Engineered specifically for variable network environments across East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 font-bold flex items-center justify-center mb-4 text-sm border border-teal-500/20">
              1
            </div>
            <h3 className="text-base font-bold text-white mb-2">Record Anytime Offline</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log blood pressure (e.g. 138/86 mmHg), blood sugar, nursing notes, or draft consultation queries even in zero connectivity. Everything writes immediately to secure IndexedDB.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 font-bold flex items-center justify-center mb-4 text-sm border border-teal-500/20">
              2
            </div>
            <h3 className="text-base font-bold text-white mb-2">Resilient Change Outbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Each offline entry receives an immutable UUID, timestamp, author role, and sync status ("Pending sync"). Failed attempts retry automatically with exponential backoff.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 font-bold flex items-center justify-center mb-4 text-sm border border-teal-500/20">
              3
            </div>
            <h3 className="text-base font-bold text-white mb-2">Silent Smart Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When connection returns, the sync engine batches outbox operations, updates the server, resolves version conflicts via append-oriented history, and badges records as "Synced".
            </p>
          </div>
        </div>
      </section>

      {/* Healthcare Professionals Showcase */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Our Multidisciplinary Care Team</h2>
            <p className="text-slate-400 text-sm mt-1">Directly consult verified practitioners across Uganda.</p>
          </div>
          <button
            onClick={onSelectDoctor}
            className="mt-4 sm:mt-0 text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-1"
          >
            <span>View all clinicians</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Dr. Ronald */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-teal-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                  alt="Dr. Ronald Mukasa"
                  className="w-full h-44 object-cover rounded-xl"
                />
                <span className="absolute top-2 right-2 bg-emerald-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                  Available Today
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dr. Ronald Mukasa</h4>
                <p className="text-xs text-teal-400 font-medium">Cardiologist & Physician</p>
                <p className="text-[11px] text-slate-400 mt-1">14 yrs exp • Nakawa Clinic</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-white">UGX 45,000</span>
              <button
                onClick={onSelectDoctor}
                className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-medium transition-colors"
              >
                Consult
              </button>
            </div>
          </div>

          {/* Sister Florence */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-teal-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80"
                  alt="Sister Florence Nabatanzi"
                  className="w-full h-44 object-cover rounded-xl"
                />
                <span className="absolute top-2 right-2 bg-teal-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                  Home Visits
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sister Florence Nabatanzi</h4>
                <p className="text-xs text-teal-400 font-medium">Community Health Nurse</p>
                <p className="text-[11px] text-slate-400 mt-1">11 yrs exp • Wound & Elder Care</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-white">UGX 25,000</span>
              <button
                onClick={onSelectDoctor}
                className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-medium transition-colors"
              >
                Book Visit
              </button>
            </div>
          </div>

          {/* Midwife Agnes */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-teal-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80"
                  alt="Midwife Agnes Akello"
                  className="w-full h-44 object-cover rounded-xl"
                />
                <span className="absolute top-2 right-2 bg-emerald-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                  Maternal Care
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Midwife Agnes Akello</h4>
                <p className="text-xs text-teal-400 font-medium">Antenatal & Postnatal Midwife</p>
                <p className="text-[11px] text-slate-400 mt-1">9 yrs exp • Infant Health</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-white">UGX 30,000</span>
              <button
                onClick={onSelectDoctor}
                className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-medium transition-colors"
              >
                Consult
              </button>
            </div>
          </div>

          {/* Dr. Brian Kato */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-teal-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80"
                  alt="Dr. Brian Kato (PT)"
                  className="w-full h-44 object-cover rounded-xl"
                />
                <span className="absolute top-2 right-2 bg-slate-800/90 text-slate-300 font-medium text-[10px] px-2 py-0.5 rounded-full">
                  Physiotherapy
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dr. Brian Kato (PT)</h4>
                <p className="text-xs text-teal-400 font-medium">Rehabilitation Physiotherapist</p>
                <p className="text-[11px] text-slate-400 mt-1">8 yrs exp • Stroke & Mobility</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-white">UGX 40,000</span>
              <button
                onClick={onSelectDoctor}
                className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-medium transition-colors"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Home Care Services */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-teal-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">At-Home Healthcare</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Hospital-grade nursing and midwifery, right in your living room.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether recovering from surgery, managing chronic hypertension, needing compassionate elder care, or postpartum mother-and-baby checks, our licensed community nurses travel across Kampala, Wakiso, and Mukono.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Post-operative wound dressing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Bedside vitals & IV infusions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Geriatric mobility assistance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Postnatal mother & newborn care</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onSelectDoctor}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Request a Home Care Visit
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
                alt="Community Nurse Home Care"
                className="w-full h-72 object-cover rounded-2xl shadow-xl border border-slate-700/60"
              />
              <div className="absolute -bottom-3 -left-3 bg-slate-900 p-3 rounded-xl border border-slate-700 shadow-lg text-xs">
                <p className="font-bold text-white">Sister Florence Nabatanzi</p>
                <p className="text-teal-400 text-[10px]">Active in Nakawa Division today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prepaid Health Membership Plans (UGX) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Prepaid Healthcare Membership</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Simple, Transparent Health Plans</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Affordable prepaid packages for individuals and families in Uganda. Transparent quotas — clearly defined benefits with no hidden terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Essential Plan */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Essential Care</h3>
              <p className="text-xs text-slate-400">Ideal for young adults & routine preventive health maintenance.</p>
              <div className="py-2">
                <span className="text-3xl font-extrabold text-white">UGX 35,000</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>2 Doctor Consultations / month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Unlimited Offline Vitals & EMR Tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Automated WhatsApp Medication Reminders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>10% Discount on Physical Clinic Labs</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onExplorePlans}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
            >
              Choose Essential
            </button>
          </div>

          {/* Family Plan (Featured) */}
          <div className="bg-gradient-to-b from-teal-950/40 to-slate-900 rounded-2xl border-2 border-teal-500/50 p-6 flex flex-col justify-between relative shadow-xl shadow-teal-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full">
              Most Popular in Kampala
            </div>
            <div className="space-y-4 pt-1">
              <h3 className="text-lg font-bold text-white">Family Health</h3>
              <p className="text-xs text-slate-400">Comprehensive coverage for parents and up to 3 children.</p>
              <div className="py-2">
                <span className="text-3xl font-extrabold text-white">UGX 95,000</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>5 Doctor & Specialist Consultations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>2 Free Home Nursing / Midwife Visits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Full Multi-Profile Family Offline Sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>24/7 Priority Emergency Dispatch</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>20% Discount on Laboratory & Pharmacy</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onExplorePlans}
              className="mt-6 w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/30 transition-colors"
            >
              Get Family Plan
            </button>
          </div>

          {/* Chronic Care Plan */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Chronic Care</h3>
              <p className="text-xs text-slate-400">Targeted protocols for Hypertension, Diabetes & Asthma.</p>
              <div className="py-2">
                <span className="text-3xl font-extrabold text-white">UGX 65,000</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Dedicated Physician & Cardiologist Review</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Monthly Home Nurse BP & Glucose Audit</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Prescription Refill Auto-Delivery in Kampala</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Direct WhatsApp Specialist Check-in</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onExplorePlans}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
            >
              Choose Chronic Care
            </button>
          </div>
        </div>
      </section>

      {/* Physical Clinic & Emergency Dispatch Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Physical Medical Centre */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Physical Medical Centre</span>
            </div>
            <h3 className="text-xl font-bold text-white">VitaNova Clinic — Nakawa Main Branch</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Located conveniently along Plot 14, Ntinda-Nakawa Road, Kampala. Fully equipped with modern digital radiography, accredited pathology laboratory, outpatient pharmacy, and 24-hour observation ward.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p><strong className="text-white">Hours:</strong> 24 Hours • 7 Days a week</p>
              <p><strong className="text-white">Phone:</strong> +256 312 800 900</p>
              <p><strong className="text-white">Emergency Dispatch:</strong> 999 / 112</p>
            </div>
          </div>

          {/* Emergency Ambulance Section */}
          <div className="bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-red-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                <PhoneCall className="w-4 h-4" />
                <span>24/7 Rapid Emergency Response</span>
              </div>
              <h3 className="text-xl font-bold text-white">Need Urgent Medical Dispatch?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Emergency dispatch units stationed across Kampala, Entebbe, and Mukono. Direct telephone calling to 999 / 112 works even if mobile data is depleted.
              </p>
            </div>
            <button
              onClick={onEmergencyClick}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Emergency Ambulance</span>
            </button>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Trusted by Families Across Uganda</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <p className="text-slate-300 italic">
              "The offline vitals logging is a lifesaver. Whenever network drops in my village in Wakiso, I can still log my mother's blood pressure and medication without waiting for internet."
            </p>
            <div>
              <p className="font-bold text-white">Josephine Kigozi</p>
              <p className="text-teal-400 text-[11px]">Wakiso District</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <p className="text-slate-300 italic">
              "Sister Florence visits my grandmother in Ntinda every two weeks. Having her entire nursing timeline documented on the app brings our family complete peace of mind."
            </p>
            <div>
              <p className="font-bold text-white">Robert Senabulya</p>
              <p className="text-teal-400 text-[11px]">Ntinda, Kampala</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <p className="text-slate-300 italic">
              "Paying via MTN Mobile Money was instant, and Dr. Mukasa adjusted my hypertension prescription seamlessly. Excellent modern healthcare."
            </p>
            <div>
              <p className="font-bold text-white">Dr. Patrick Musisi</p>
              <p className="text-teal-400 text-[11px]">Entebbe</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <h4 className="font-bold text-white flex items-center space-x-2">
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Does VitaNova require an active internet connection to open?</span>
            </h4>
            <p className="text-slate-400 leading-relaxed pl-5">
              No. Once opened or installed as a PWA, VitaNova functions offline. You can view cached patient profiles, review historical medical records, log vitals, and read downloaded health education without any mobile data.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <h4 className="font-bold text-white flex items-center space-x-2">
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>What happens if I record vitals while offline?</span>
            </h4>
            <p className="text-slate-400 leading-relaxed pl-5">
              The readings are immediately stored in your device's local database (IndexedDB) and marked as "Pending sync". As soon as your internet returns, our dedicated Sync Engine securely uploads them to VitaNova's servers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <h4 className="font-bold text-white flex items-center space-x-2">
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Can I pay with MTN Mobile Money or Airtel Money?</span>
            </h4>
            <p className="text-slate-400 leading-relaxed pl-5">
              Yes. Both MTN MoMo and Airtel Money are natively supported for consultation bookings, home care visits, and prepaid health memberships.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 pt-8 mt-12 text-center text-xs text-slate-500 space-y-2">
        <p>© 2026 VitaNova Clinic Uganda. All rights reserved. Licensed by Uganda Medical and Dental Practitioners Council (UMDPC).</p>
        <p className="text-[11px]">Plot 14 Ntinda-Nakawa Road, Kampala • Emergency Dispatch: 999 / 112</p>
      </footer>
    </div>
  );
};
