import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Video,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  Clock,
  WifiOff,
  Send,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  CreditCard,
  Lock,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Volume2,
  VolumeX,
  RefreshCw,
  Sparkles,
  Paperclip,
  Activity,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  Stethoscope,
  HeartPulse,
  Baby,
  FileText,
  HelpCircle,
  Shield,
  Award,
  Hospital,
  GraduationCap,
  Star,
  MapPin,
  BadgeCheck,
  Info,
  X
} from 'lucide-react';
import { HealthcareWorker } from '../../types';

interface ConsultationViewProps {
  clinicians: HealthcareWorker[];
  networkState: string;
  onQueueOfflineMessage: (clinicianId: string, messageText: string) => Promise<void>;
  onInitiatePayment: (clinician: HealthcareWorker) => void;
  activeCallClinician?: HealthcareWorker | null;
  callType?: 'video' | 'audio' | null;
  onEndCall?: () => void;
  onTriggerCall?: (clinician: HealthcareWorker, type: 'video' | 'audio') => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  clinicians,
  networkState,
  onQueueOfflineMessage,
  onInitiatePayment,
  activeCallClinician: externalCallClinician,
  callType: externalCallType,
  onEndCall: externalEndCall,
  onTriggerCall: externalTriggerCall
}) => {
  // Main Care View Navigation Sections
  const [activeCareSection, setActiveCareSection] = useState<'clinicians' | 'how_it_works' | 'pathways' | 'faq'>('clinicians');
  
  // Clinician Filter & Search
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Clinician Details Toggle (Only shows when tapped)
  const [expandedClinicianId, setExpandedClinicianId] = useState<string | null>(null);
  const [selectedClinicianModal, setSelectedClinicianModal] = useState<HealthcareWorker | null>(null);
  
  // Direct Chat Modal State
  const [activeChatClinician, setActiveChatClinician] = useState<HealthcareWorker | null>(null);

  // In-app Direct Calls State
  const [activeCallClinician, setActiveCallClinician] = useState<HealthcareWorker | null>(null);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);

  // Sync external call triggers from Dashboard
  useEffect(() => {
    if (externalCallClinician && externalCallType) {
      startCall(externalCallClinician, externalCallType);
    }
  }, [externalCallClinician, externalCallType]);

  // Direct Inbox Messages per Clinician
  const [inboxMessages, setInboxMessages] = useState<Record<string, {
    id: string;
    sender: 'patient' | 'clinician';
    text: string;
    time: string;
    status: 'sent' | 'delivered' | 'queued_offline';
  }[]>>({
    doc_mukasa: [
      {
        id: 'm1',
        sender: 'clinician',
        text: 'Hello Sarah! I reviewed your latest home blood pressure logs (128/82 mmHg). Your response to Amlodipine is right on target. How are you feeling today?',
        time: 'Yesterday 04:15 PM',
        status: 'delivered'
      },
      {
        id: 'm2',
        sender: 'patient',
        text: 'Thank you Dr. Mukasa! Feeling much better. The morning headaches have stopped since I reduced salt in my matooke.',
        time: 'Yesterday 04:22 PM',
        status: 'delivered'
      },
      {
        id: 'm3',
        sender: 'clinician',
        text: 'That is excellent news. Keep up with the daily 30-minute walks. Feel free to initiate a video call if you ever notice readings above 135/85.',
        time: 'Yesterday 04:30 PM',
        status: 'delivered'
      }
    ],
    nurse_florence: [
      {
        id: 'n1',
        sender: 'clinician',
        text: 'Hello Sarah! Sister Florence here. I have scheduled your home nursing checkup for this week to review medication storage and check your pulse.',
        time: '2 days ago',
        status: 'delivered'
      }
    ]
  });

  const [chatDraft, setChatDraft] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Call timer effect
  useEffect(() => {
    let interval: any = null;
    if (activeCallClinician && callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCallClinician, callStatus]);

  const startCall = (clinician: HealthcareWorker, type: 'video' | 'audio') => {
    setActiveCallClinician(clinician);
    setCallType(type);
    setCallStatus('connecting');
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOff(false);

    // Simulate connecting after 1.8s
    setTimeout(() => {
      setCallStatus('connected');
    }, 1800);
  };

  const endCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setActiveCallClinician(null);
      if (externalEndCall) externalEndCall();
    }, 600);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatDraft.trim() || !activeChatClinician) return;

    setIsSending(true);
    const text = chatDraft.trim();
    setChatDraft('');
    const isOffline = networkState === 'offline';
    const clinicianId = activeChatClinician.id;

    const newMsg = {
      id: 'msg_' + Date.now(),
      sender: 'patient' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: (isOffline ? 'queued_offline' : 'delivered') as 'sent' | 'delivered' | 'queued_offline'
    };

    setInboxMessages((prev) => ({
      ...prev,
      [clinicianId]: [...(prev[clinicianId] || []), newMsg]
    }));

    if (isOffline) {
      await onQueueOfflineMessage(clinicianId, text);
    } else {
      setTimeout(() => {
        let replyText = `Thank you for updating me, Sarah. I have noted this in your VitaNova chart. Continue taking your morning tablet and keep well hydrated.`;
        if (text.toLowerCase().includes('pressure') || text.toLowerCase().includes('bp')) {
          replyText = `Your blood pressure trends are stabilizing well. Please log one more reading before bedtime tonight.`;
        } else if (text.toLowerCase().includes('visit') || text.toLowerCase().includes('come')) {
          replyText = `I have received your request. Sister Florence or I will confirm your exact home arrival time shortly.`;
        }

        const replyMsg = {
          id: 'reply_' + Date.now(),
          sender: 'clinician' as const,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered' as const
        };

        setInboxMessages((prev) => ({
          ...prev,
          [clinicianId]: [...(prev[clinicianId] || []), replyMsg]
        }));
      }, 2000);
    }

    setIsSending(false);
  };

  const toggleClinicianExpanded = (clinicianId: string) => {
    setExpandedClinicianId(prev => (prev === clinicianId ? null : clinicianId));
  };

  const filteredClinicians = clinicians.filter((c) => {
    const matchesProfession =
      selectedProfession === 'all' || c.profession.toLowerCase() === selectedProfession.toLowerCase();
    
    const matchesSearch =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.conditionsTreated && c.conditionsTreated.some(cond => cond.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      c.bio.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProfession && matchesSearch;
  });

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-24 max-w-full overflow-hidden">
      {/* 1. Emergency Safety & Triage Banner */}
      <div className="bg-gradient-to-r from-rose-950/70 via-rose-900/40 to-slate-900 rounded-3xl p-4 sm:p-5 border border-rose-700/40 shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Emergency Medical Safety Notice
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-500/40">
                  Critical
                </span>
              </div>
              <p className="text-xs text-rose-200/90 mt-1 leading-relaxed max-w-3xl">
                If you or a family member are experiencing sudden crushing chest pain, difficulty breathing, profuse bleeding, sudden numbness/paralysis, or acute loss of consciousness, <strong className="text-white underline">do not wait for an online reply</strong>. Please call emergency services (Uganda Police / Ambulance 999 / 112) or go directly to the nearest hospital casualty ward.
              </p>
            </div>
          </div>
          <div className="shrink-0 pl-11 sm:pl-0">
            <span className="inline-block text-[11px] font-semibold text-rose-300 bg-rose-950/80 px-3 py-1.5 rounded-xl border border-rose-800/60">
              Telehealth is for non-urgent care & follow-ups
            </span>
          </div>
        </div>
      </div>

      {/* 2. Welcome & Reassurance Header */}
      <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                VitaNova Clinical Care & Consultations
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                <span>Uganda Certified Practitioners</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              Welcome to your digital care center. Because healthcare can feel complicated and overwhelming, we have organized everything into clear, guided steps. You can consult directly with licensed Ugandan medical doctors, community nurses, certified midwives, and physiotherapists through encrypted HD video, voice calls, or low-bandwidth offline-ready direct messages.
            </p>
          </div>
        </div>

        {/* Quick Trust & Assurance Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center space-x-2 bg-slate-800/40 p-2.5 rounded-2xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="text-[11px] leading-tight">UMDPC & UNMC Registered</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/40 p-2.5 rounded-2xl border border-slate-800">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] leading-tight">100% Confidential & Encrypted</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/40 p-2.5 rounded-2xl border border-slate-800">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] leading-tight">Works Offline & Low-Data</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/40 p-2.5 rounded-2xl border border-slate-800">
            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-[11px] leading-tight">Official Digital Prescriptions</span>
          </div>
        </div>
      </div>

      {/* 3. High-Level Navigation Tabs (Well-Organised Structure) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-slate-800/80">
        <button
          onClick={() => setActiveCareSection('clinicians')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shrink-0 ${
            activeCareSection === 'clinicians'
              ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Find Clinicians ({filteredClinicians.length})</span>
        </button>

        <button
          onClick={() => setActiveCareSection('how_it_works')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shrink-0 ${
            activeCareSection === 'how_it_works'
              ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>How Care Works (Step-by-Step)</span>
        </button>

        <button
          onClick={() => setActiveCareSection('pathways')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shrink-0 ${
            activeCareSection === 'pathways'
              ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Which Specialist Do I Need?</span>
        </button>

        <button
          onClick={() => setActiveCareSection('faq')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shrink-0 ${
            activeCareSection === 'faq'
              ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Patient Questions & FAQs</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CLINICIANS DIRECTORY (Details ONLY show when tapped!)           */}
      {/* ========================================================================= */}
      {activeCareSection === 'clinicians' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Helpful Guidance Notice */}
          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-3.5 flex items-start space-x-3 text-xs text-teal-200">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Patient Tip:</strong> To avoid clutter and confusion, the health workers below are shown in clean summary cards. <strong>Tap any clinician card or "View Details"</strong> to open their complete medical profile, verified council registration, treated conditions, consultation fees, and communication options.
            </p>
          </div>

          {/* Search & Profession Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-3 sm:p-4 rounded-3xl border border-slate-800">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clinician by name, specialty, or condition (e.g. pressure, wound, baby)..."
                className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Profession Tabs */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'Doctor', 'Nurse', 'Midwife', 'Physiotherapist'].map((prof) => (
                <button
                  key={prof}
                  onClick={() => setSelectedProfession(prof)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedProfession === prof
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {prof === 'all' ? 'All Roles' : prof + 's'}
                </button>
              ))}
            </div>
          </div>

          {/* Clinicians Grid: SUMMARY ONLY UNTIL TAPPED */}
          {filteredClinicians.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
              <Stethoscope className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Clinicians Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No health workers match your current search criteria. Try selecting "All Roles" or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setSelectedProfession('all');
                  setSearchQuery('');
                }}
                className="text-xs text-teal-400 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredClinicians.map((clinician) => {
                const isExpanded = expandedClinicianId === clinician.id;

                return (
                  <div
                    key={clinician.id}
                    className={`bg-slate-900 rounded-3xl border transition-all duration-200 overflow-hidden shadow-md flex flex-col justify-between ${
                      isExpanded
                        ? 'border-teal-500/60 ring-1 ring-teal-500/30 bg-gradient-to-b from-slate-900 to-slate-900/95'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Compact Card Header (Clickable anywhere to tap-and-reveal) */}
                    <div
                      onClick={() => toggleClinicianExpanded(clinician.id)}
                      className="p-4 sm:p-5 cursor-pointer select-none space-y-3"
                    >
                      <div className="flex items-start space-x-3.5">
                        {/* Avatar with Verified & Available Badges */}
                        <div className="relative shrink-0">
                          <img
                            src={clinician.avatar}
                            alt={clinician.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-slate-700 shadow-sm"
                          />
                          <span
                            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"
                            title="Available Now"
                          />
                        </div>

                        {/* Summary Identifiers */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                              {clinician.name}
                            </h3>
                            {clinician.verified && (
                              <span title="Verified by Medical/Nursing Council">
                                <BadgeCheck className="w-4 h-4 text-teal-400 shrink-0 inline" />
                              </span>
                            )}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                              {clinician.profession}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-teal-400 mt-0.5 truncate">
                            {clinician.specialty}
                          </p>

                          <div className="flex items-center space-x-2 pt-1 text-[11px] text-slate-400 flex-wrap">
                            <span>{clinician.experienceYears} yrs experience</span>
                            <span>•</span>
                            <span className="text-amber-400 font-semibold flex items-center">
                              ★ {clinician.rating} <span className="text-slate-500 ml-0.5">({clinician.reviewCount})</span>
                            </span>
                          </div>
                        </div>

                        {/* Fee Badge & Expand Chevron */}
                        <div className="text-right shrink-0 flex flex-col items-end justify-between self-stretch">
                          <div className="bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700 text-right">
                            <span className="text-[10px] text-slate-400 block">Fee</span>
                            <span className="text-xs font-bold text-white">UGX {clinician.feeUGX.toLocaleString()}</span>
                          </div>
                          <div className="text-teal-400 mt-2">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 bg-teal-500/10 p-0.5 rounded-full border border-teal-500/20" />
                            ) : (
                              <ChevronDown className="w-5 h-5 bg-slate-800 p-0.5 rounded-full border border-slate-700 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tap Prompt Banner */}
                      <button
                        type="button"
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                          isExpanded
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                            : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                        }`}
                      >
                        <span className="flex items-center space-x-1.5">
                          <Info className="w-3.5 h-3.5 text-teal-400" />
                          <span>{isExpanded ? 'Hide Details' : 'Tap to View Full Profile, Credentials & Connect'}</span>
                        </span>
                        <span className="text-[11px] font-bold text-teal-400">
                          {isExpanded ? '▲ Close' : '▼ Details'}
                        </span>
                      </button>
                    </div>

                    {/* ======================================================= */}
                    {/* EXPANDED DETAILS: ONLY SHOWN WHEN TAPPED                */}
                    {/* ======================================================= */}
                    {isExpanded && (
                      <div className="border-t border-slate-800/90 bg-slate-950/40 p-4 sm:p-5 space-y-4 animate-fadeIn">
                        {/* 1. Official Licensing & Credentials */}
                        <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                          <div className="flex items-center space-x-2 text-xs font-bold text-teal-300">
                            <Award className="w-4 h-4 text-teal-400" />
                            <span>Verified Licensing & Background</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <span className="text-slate-400 block">Registration License:</span>
                              <span className="text-slate-200 font-mono font-semibold">
                                {clinician.registrationNumber || 'UMDPC-VERIFIED-UG-2024'}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Hospital Affiliation:</span>
                              <span className="text-slate-200 font-medium">
                                {clinician.hospitalAffiliation || 'Mulago Referral & VitaNova Care'}
                              </span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-slate-400 block">Education & Degrees:</span>
                              <span className="text-slate-200 font-medium">
                                {clinician.education || 'MBChB / Bachelor of Science, Registered Practitioner'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 2. Professional Biography */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                            <FileText className="w-3.5 h-3.5 text-teal-400" />
                            <span>Clinical Background & Bio</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-2xl border border-slate-800">
                            {clinician.bio}
                          </p>
                        </div>

                        {/* 3. Conditions & Symptoms Treated */}
                        {clinician.conditionsTreated && clinician.conditionsTreated.length > 0 && (
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                              <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                              <span>Conditions & Focus Areas</span>
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {clinician.conditionsTreated.map((cond, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-teal-200 border border-slate-700"
                                >
                                  ✓ {cond}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4. Practical Consultation Details */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] bg-slate-900 p-3 rounded-2xl border border-slate-800">
                          <div>
                            <span className="text-slate-400 block">Languages:</span>
                            <span className="text-white font-medium">{clinician.languages.join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Typical Response:</span>
                            <span className="text-emerald-400 font-semibold">{clinician.responseSpeed || '< 5 mins'}</span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <span className="text-slate-400 block">Working Hours:</span>
                            <span className="text-white font-medium">{clinician.availabilityHours || 'Mon - Sat: 8 AM - 7 PM'}</span>
                          </div>
                        </div>

                        {/* 5. Direct Connect Communication Buttons */}
                        <div className="pt-2 border-t border-slate-800 space-y-2">
                          <p className="text-[11px] text-slate-400 text-center font-medium">
                            Choose how you would like to connect with {clinician.name}:
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => startCall(clinician, 'video')}
                              className="py-2.5 px-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-teal-500/20 transition-transform active:scale-95"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Video Call</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => startCall(clinician, 'audio')}
                              className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-teal-400" />
                              <span>Voice Call</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setActiveChatClinician(clinician)}
                              className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                              <span>Direct Inbox</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: HOW CARE WORKS & WHAT TO EXPECT (Richly Detailed Guide)         */}
      {/* ========================================================================= */}
      {activeCareSection === 'how_it_works' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div>
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                Comprehensive Patient Walkthrough
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                How VitaNova Care Works: From First Tap to Complete Recovery
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Many patients hesitate to seek remote medical consultations because they do not know what to expect. Here is an easy-to-understand, step-by-step breakdown of how our virtual clinic operates so you can feel 100% confident and prepared.
              </p>
            </div>

            {/* 5-Step Visual Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
              {/* Step 1 */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="text-sm font-bold text-white">Find Your Specialist</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Browse verified profiles. Read each clinician's qualifications, hospital background, and transparent pricing with zero surprise charges.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="text-sm font-bold text-white">Prepare Your Details</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have your recent blood pressure or sugar readings handy, note any current medications you swallow, and find a quiet room.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="text-sm font-bold text-white">Connect Easily</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Start an encrypted Video Call, Voice Call, or Direct Inbox message. Even if internet drops, messages queue safely offline.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  4
                </div>
                <h3 className="text-sm font-bold text-white">Get Prescriptions</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The clinician generates a verified digital prescription automatically stored in your VitaNova records for your local pharmacy.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  5
                </div>
                <h3 className="text-sm font-bold text-white">Home Care Escalation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need a physical dressing change, blood draw, or elderly check? Your clinician can dispatch a VitaNova Community Nurse to your doorstep.
                </p>
              </div>
            </div>
          </div>

          {/* Deep Dives into Channel Differences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video Calls */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 w-fit">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">HD Video Consultation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Best when the doctor needs to visually examine physical signs: skin rashes, joint swelling, eye discoloration, wound healing progress, or breathing mechanics. Video feeds are end-to-end encrypted for full privacy.
              </p>
              <div className="text-[11px] text-teal-300 bg-teal-950/40 p-2.5 rounded-xl border border-teal-800/40">
                ✓ Includes picture-in-picture view & audio mute controls.
              </div>
            </div>

            {/* Voice Calls */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 w-fit">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Direct Voice Call</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ideal when cellular internet data is weak (2G/3G areas) or when you are on the move. Voice calls provide fast, clear real-time interaction without consuming heavy video data bundles.
              </p>
              <div className="text-[11px] text-teal-300 bg-teal-950/40 p-2.5 rounded-xl border border-teal-800/40">
                ✓ Ultra low-bandwidth mode optimized for Ugandan networks.
              </div>
            </div>

            {/* Direct Inbox */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 w-fit">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Direct Clinician Inbox</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Perfect for quick queries, sending blood pressure logs, asking about medication side-effects, or requesting repeat prescriptions. If you go offline, messages queue locally and send automatically upon reconnection.
              </p>
              <div className="text-[11px] text-teal-300 bg-teal-950/40 p-2.5 rounded-xl border border-teal-800/40">
                ✓ Instant offline-sync queueing with message status badges.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: CARE PATHWAYS & WHICH SPECIALIST DO I NEED?                     */}
      {/* ========================================================================= */}
      {activeCareSection === 'pathways' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
              Clinical Triage & Specialist Selection
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Which Health Worker Should You Consult?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Medical care works best when you are matched with the right professional. Use this clinical directory to understand the exact scope and responsibilities of each clinician type at VitaNova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Medical Doctor (Physician) */}
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Medical Doctor / Physician</h3>
                  <span className="text-xs text-teal-400 font-semibold">Diagnosis, Prescriptions & Chronic Illness</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">When you should consult a Doctor:</p>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>Uncontrolled high blood pressure (readings consistently above 140/90 mmHg).</li>
                  <li>Type 1 or Type 2 Diabetes management and blood glucose spikes.</li>
                  <li>Persistent headaches, chronic fatigue, unexplained weight change.</li>
                  <li>Official medical prescriptions, dosage adjustments, and lab result interpretation.</li>
                  <li>Cardiovascular evaluations, palpitations, and chronic disease management.</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 text-[11px] text-slate-300">
                <strong>Example Clinician:</strong> Dr. Ronald Mukasa (Senior Consultant Cardiologist & Physician, 14 yrs experience).
              </div>
            </div>

            {/* Community Health Nurse */}
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Community Health Nurse</h3>
                  <span className="text-xs text-teal-400 font-semibold">Wound Healing, Bedside Care & Injections</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">When you should consult a Nurse:</p>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>Post-surgery surgical wound care, staple/suture inspection, and sterile dressing changes.</li>
                  <li>Chronic diabetic ulcers or pressure sore prevention for bedridden family members.</li>
                  <li>Guidance on proper insulin injection techniques and home glucose meter calibration.</li>
                  <li>Elderly patient hygiene, catheter management, and home nursing dispatch.</li>
                  <li>Routine vital checks and lifestyle coaching.</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 text-[11px] text-slate-300">
                <strong>Example Clinician:</strong> Sister Florence Nabatanzi (Lead Community Outreach Nurse, 11 yrs experience).
              </div>
            </div>

            {/* Certified Midwife */}
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Baby className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Certified Midwife</h3>
                  <span className="text-xs text-teal-400 font-semibold">Antenatal, Postnatal, Lactation & Infant Wellness</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">When you should consult a Midwife:</p>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>Trimester-by-trimester pregnancy symptoms, morning sickness, and baby kick monitoring.</li>
                  <li>Postpartum healing, C-section or perineal recovery check-ins.</li>
                  <li>Breastfeeding difficulty, cracked nipples, low milk supply, or engorgement.</li>
                  <li>Newborn umbilical cord stump hygiene, infant colic, and sleep routines.</li>
                  <li>Safe family planning options after childbirth.</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 text-[11px] text-slate-300">
                <strong>Example Clinician:</strong> Midwife Agnes Akello (Certified Midwife & Lactation Specialist, 9 yrs experience).
              </div>
            </div>

            {/* Physiotherapist */}
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Physiotherapist (Physical Therapy)</h3>
                  <span className="text-xs text-teal-400 font-semibold">Mobility, Stroke Rehabilitation & Joint Relief</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">When you should consult a Physiotherapist:</p>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>Post-stroke limb rehabilitation and relearning walking balance.</li>
                  <li>Chronic lower back pain, neck stiffness, and sciatica nerve discomfort.</li>
                  <li>Recovery from bone fractures, joint stiffness, and sports injuries.</li>
                  <li>Knee osteoarthritis exercise prescription and mobility aids assessment.</li>
                  <li>Workplace posture correction to avoid repetitive strain.</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 text-[11px] text-slate-300">
                <strong>Example Clinician:</strong> Dr. Brian Kato (PT) (Rehabilitation Specialist, 8 yrs experience).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: PATIENT QUESTIONS & FAQS (Clear Explanations)                  */}
      {/* ========================================================================= */}
      {activeCareSection === 'faq' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
              Answers for You and Your Family
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions About VitaNova Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              We want you to feel completely informed and comfortable before initiating a consultation. Here are detailed explanations to common questions.
            </p>
          </div>

          <div className="space-y-3">
            {/* FAQ 1 */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Are VitaNova clinicians legally licensed in Uganda?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                <strong>Yes, absolutely.</strong> Every doctor is registered with the Uganda Medical and Dental Practitioners Council (UMDPC), nurses and midwives with the Uganda Nurses and Midwives Council (UNMC), and physiotherapists with the Allied Health Professionals Council (AHPC). Their council registration numbers are verified before they are admitted to the VitaNova platform.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Can the doctor write me an official prescription?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                <strong>Yes.</strong> Following your consultation, your doctor generates a digitally signed electronic prescription with their council credentials. This prescription appears directly in your <em>Medical Records</em> tab. You can present this digital prescription at registered partner pharmacies in Kampala or across Uganda.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>What happens if my phone loses internet during the call?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                VitaNova is built specifically with Ugandan network conditions in mind. If your data connection drops, our system automatically pauses and attempts reconnection. If video fails, you can switch immediately to low-data Voice Call or Direct Inbox. Any text messages you type while offline are saved securely in your browser and sent the moment your connection returns.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>How do payments work? Is Mobile Money accepted?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                Yes! We accept <strong>MTN Mobile Money</strong>, <strong>Airtel Money</strong>, and standard debit/credit cards. Fees are fixed and fully displayed in advance (e.g., UGX 45,000 for Doctor consultation, UGX 25,000 for Nurse review). There are no surprise hidden deductions, and an itemized digital receipt is stored in your account.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>What if my condition needs physical hands-on examination?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                If your clinician determines that your situation requires physical palpation, sterile wound debridement, or hands-on clinical assessment, you won't be left stranded. Your clinician can immediately request a <strong>Home Care Visit</strong> where a verified VitaNova nurse or physical therapist travels directly to your home address with medical supplies.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Is my medical consultation private and confidential?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                Completely. VitaNova operates under the Uganda Data Protection and Privacy Act (2019) and international patient confidentiality standards. Calls and messages are encrypted. Only you and your authorized treating healthcare worker have access to your consultation transcripts and clinical notes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIRECT INBOX / CHAT MODAL                                                 */}
      {/* ========================================================================= */}
      {activeChatClinician && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg flex flex-col h-[620px] max-h-[92vh] overflow-hidden shadow-2xl">
            {/* Inbox Header with Direct Audio & Video Triggers */}
            <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={activeChatClinician.avatar}
                    alt={activeChatClinician.name}
                    className="w-10 h-10 rounded-xl object-cover border border-teal-500/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{activeChatClinician.name}</h4>
                  <p className="text-[11px] text-teal-400">{activeChatClinician.specialty}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* 1-Click Video Call from Inbox Header */}
                <button
                  type="button"
                  onClick={() => startCall(activeChatClinician, 'video')}
                  title="Start Live Video Consultation"
                  className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 transition-colors"
                >
                  <Video className="w-4 h-4" />
                </button>

                {/* 1-Click Voice Call from Inbox Header */}
                <button
                  type="button"
                  onClick={() => startCall(activeChatClinician, 'audio')}
                  title="Start Audio Call"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveChatClinician(null)}
                  className="text-slate-400 hover:text-white p-1 text-sm font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Offline Notification inside Inbox */}
            {networkState === 'offline' && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center space-x-2 text-[11px] text-amber-300">
                <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Offline Mode:</strong> Message will be queued locally and sent automatically when internet returns.
                </span>
              </div>
            )}

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50">
              {(inboxMessages[activeChatClinician.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                      msg.sender === 'patient'
                        ? 'bg-teal-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 mt-1 px-1">
                    <span>{msg.time}</span>
                    {msg.sender === 'patient' && (
                      <span>
                        {msg.status === 'queued_offline' ? (
                          <span className="text-amber-400 font-bold">• Queued Offline</span>
                        ) : (
                          <span className="text-teal-400 font-bold">• Delivered</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900 flex items-center space-x-2">
              <input
                type="text"
                placeholder={
                  networkState === 'offline'
                    ? 'Write query (saved offline)...'
                    : 'Type a message to clinician...'
                }
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={isSending || !chatDraft.trim()}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center space-x-1"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULLSCREEN VIDEO CALL INTERFACE                                           */}
      {/* ========================================================================= */}
      {activeCallClinician && callType === 'video' && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-fadeIn">
          {/* Top Video Header */}
          <div className="w-full max-w-4xl flex items-center justify-between bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>{activeCallClinician.name}</span>
                  <span className="text-[10px] font-semibold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full">
                    HD Telehealth
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {callStatus === 'connecting' ? 'Ringing & Securing Line...' : `Connected • ${formatCallTime(callDuration)}`}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-slate-800 px-3 py-1 rounded-xl">
              {formatCallTime(callDuration)}
            </span>
          </div>

          {/* Video Feed Simulation Area */}
          <div className="relative w-full max-w-4xl flex-1 my-4 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-2xl">
            {callStatus === 'connecting' ? (
              <div className="text-center space-y-4">
                <div className="relative w-28 h-28 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-teal-500/30 animate-ping" />
                  <img
                    src={activeCallClinician.avatar}
                    alt={activeCallClinician.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-teal-400"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Calling {activeCallClinician.name}...</h4>
                  <p className="text-xs text-teal-300">VitaNova Encrypted Telehealth Channel</p>
                </div>
              </div>
            ) : (
              <>
                {/* Simulated Doctor Video Stream */}
                <img
                  src={activeCallClinician.avatar}
                  alt={activeCallClinician.name}
                  className="w-full h-full object-cover filter brightness-95"
                />

                {/* Subtitle / Clinician Speaking Badge */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-white flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeCallClinician.name} (Speaking)</span>
                </div>

                {/* Picture-in-Picture Patient Front Camera */}
                <div className="absolute top-4 right-4 w-28 sm:w-36 h-36 sm:h-48 bg-slate-800 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl">
                  {isVideoOff ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[11px]">
                      <VideoOff className="w-5 h-5 mb-1" />
                      <span>Camera Off</span>
                    </div>
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                      alt="Sarah Namubiru (Patient)"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-black/70 text-white px-1.5 py-0.5 rounded">
                    You
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Video Call Controls Bar */}
          <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-md p-4 rounded-3xl border border-slate-800 flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-2xl border transition-colors ${
                isMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3.5 rounded-2xl border transition-colors ${
                isVideoOff
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={endCall}
              className="p-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-transform active:scale-95"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULLSCREEN VOICE / AUDIO CALL INTERFACE                                   */}
      {/* ========================================================================= */}
      {activeCallClinician && callType === 'audio' && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 select-none animate-fadeIn">
          <div className="text-center pt-8 space-y-1">
            <span className="text-xs font-semibold text-teal-400">VitaNova Voice Call</span>
            <h3 className="text-xl font-bold text-white">{activeCallClinician.name}</h3>
            <p className="text-xs text-slate-400">{activeCallClinician.specialty}</p>
          </div>

          <div className="relative my-auto">
            <div className={`absolute -inset-6 rounded-full bg-teal-500/10 ${callStatus === 'connected' ? 'animate-ping' : ''}`} />
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-teal-400 shadow-2xl">
              <img
                src={activeCallClinician.avatar}
                alt={activeCallClinician.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 text-center space-y-1">
              <p className="text-base font-bold text-white">
                {callStatus === 'connecting' ? 'Ringing...' : 'Connected (HD Audio)'}
              </p>
              <p className="text-sm font-mono text-teal-400 font-bold">
                {formatCallTime(callDuration)}
              </p>
            </div>
          </div>

          <div className="w-full max-w-sm bg-slate-900/90 backdrop-blur-md p-4 rounded-3xl border border-slate-800 flex items-center justify-around mb-4">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-2xl border transition-colors ${
                isMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={endCall}
              className="p-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-transform active:scale-95"
            >
              <PhoneOff className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`p-3.5 rounded-2xl border transition-colors ${
                isSpeakerOn
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
