import React, { useState, useEffect } from 'react';
import {
  Video,
  Phone,
  MessageSquare,
  WifiOff,
  Send,
  BadgeCheck,
  Star,
  Clock
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
  onTriggerCall
}) => {
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [activeChatClinician, setActiveChatClinician] = useState<HealthcareWorker | null>(null);

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
        text: 'Hello Sarah! I reviewed your latest blood pressure logs (128/82 mmHg). Your Amlodipine is working well. How are you feeling today?',
        time: 'Yesterday 04:15 PM',
        status: 'delivered'
      },
      {
        id: 'm2',
        sender: 'patient',
        text: 'Thank you Dr. Mukasa! Feeling much better. The morning headaches have stopped.',
        time: 'Yesterday 04:22 PM',
        status: 'delivered'
      },
      {
        id: 'm3',
        sender: 'clinician',
        text: 'Excellent. Keep up the daily walks. Call me if readings go above 135/85.',
        time: 'Yesterday 04:30 PM',
        status: 'delivered'
      }
    ],
    nurse_florence: [
      {
        id: 'n1',
        sender: 'clinician',
        text: 'Hello Sarah! Sister Florence here. I have scheduled your home nursing checkup for this week.',
        time: '2 days ago',
        status: 'delivered'
      }
    ]
  });

  const [chatDraft, setChatDraft] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Route call through the real Jitsi VideoCallModal in App.tsx
  const handleStartCall = (clinician: HealthcareWorker, type: 'video' | 'audio') => {
    if (onTriggerCall) {
      onTriggerCall(clinician, type);
    }
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
        let replyText = `Thank you Sarah. I have noted this. Continue your tablets and stay well hydrated.`;
        if (text.toLowerCase().includes('pressure') || text.toLowerCase().includes('bp')) {
          replyText = `Your blood pressure trends are stabilizing well. Please log one more reading before bedtime tonight.`;
        } else if (text.toLowerCase().includes('visit') || text.toLowerCase().includes('come')) {
          replyText = `I have received your request. Sister Florence or I will confirm your home arrival time shortly.`;
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

  const filteredClinicians = clinicians.filter(
    (c) => selectedProfession === 'all' || c.profession.toLowerCase() === selectedProfession.toLowerCase()
  );

  const professionColors: Record<string, string> = {
    Doctor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    Nurse: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Midwife: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    Physiotherapist: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  };

  const professionGradients: Record<string, string> = {
    Doctor: 'from-teal-900/60 via-slate-900 to-slate-900',
    Nurse: 'from-emerald-900/60 via-slate-900 to-slate-900',
    Midwife: 'from-pink-900/60 via-slate-900 to-slate-900',
    Physiotherapist: 'from-violet-900/60 via-slate-900 to-slate-900'
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Talk to a Clinician</h1>
        <p className="text-sm text-slate-400 mt-1">Licensed health workers in Uganda, available now.</p>
      </div>

      {/* Profession Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {['all', 'Doctor', 'Nurse', 'Midwife', 'Physiotherapist'].map((prof) => (
          <button
            key={prof}
            onClick={() => setSelectedProfession(prof)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedProfession === prof
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/25'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
            }`}
          >
            {prof === 'all' ? 'All' : prof + 's'}
          </button>
        ))}
      </div>

      {/* Clinicians Grid — Large Photo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filteredClinicians.map((clinician) => (
          <div
            key={clinician.id}
            className={`relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-gradient-to-b ${professionGradients[clinician.profession] || 'from-slate-800 via-slate-900 to-slate-900'}`}
          >
            {/* Large Photo Hero */}
            <div className="relative w-full h-60 sm:h-72 overflow-hidden">
              <img
                src={clinician.avatar}
                alt={clinician.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${professionColors[clinician.profession] || 'bg-slate-700 text-white border-slate-600'}`}>
                  {clinician.profession}
                </span>
                <div className="flex items-center space-x-1.5">
                  {clinician.verified && (
                    <span className="bg-teal-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center space-x-1 backdrop-blur-sm">
                      <BadgeCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                  <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center space-x-1 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
                    <span>Online</span>
                  </span>
                </div>
              </div>

              {/* Name & specialty on photo */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {clinician.name}
                </h2>
                <p className="text-sm text-teal-300 font-medium mt-0.5">
                  {clinician.specialty}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-4">
              {/* Stats Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{clinician.rating}</span>
                  <span className="text-slate-500 font-normal">({clinician.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{clinician.experienceYears} yrs exp</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-300 truncate max-w-[30%]">
                  <span className="text-slate-500 shrink-0">Speaks:</span>
                  <span className="font-medium truncate">{clinician.languages.slice(0, 2).join(', ')}</span>
                </div>
                <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
                  <span className="text-white font-bold text-xs">UGX {clinician.feeUGX.toLocaleString()}</span>
                </div>
              </div>

              {/* Conditions Treated Pills */}
              {clinician.conditionsTreated && clinician.conditionsTreated.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {clinician.conditionsTreated.slice(0, 3).map((cond, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80"
                    >
                      {cond}
                    </span>
                  ))}
                  {clinician.conditionsTreated.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/80">
                      +{clinician.conditionsTreated.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* 3-Action Bar — calls route to real Jitsi VideoCallModal */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleStartCall(clinician, 'video')}
                  className="py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-lg shadow-teal-500/20 transition-transform active:scale-95"
                >
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartCall(clinician, 'audio')}
                  className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex flex-col items-center justify-center space-y-1 border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveChatClinician(clinician)}
                  className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex flex-col items-center justify-center space-y-1 border border-slate-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* DIRECT CHAT MODAL                                           */}
      {/* ============================================================ */}
      {activeChatClinician && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl w-full max-w-lg flex flex-col h-[85vh] sm:h-[620px] max-h-[92vh] overflow-hidden shadow-2xl">
            {/* Chat Header with photo background */}
            <div className="relative h-24 overflow-hidden shrink-0">
              <img
                src={activeChatClinician.avatar}
                alt={activeChatClinician.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={activeChatClinician.avatar}
                      alt={activeChatClinician.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-400 shadow-md"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{activeChatClinician.name}</h4>
                    <p className="text-[11px] text-teal-300">{activeChatClinician.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* These buttons open the REAL Jitsi call */}
                  <button
                    type="button"
                    onClick={() => { handleStartCall(activeChatClinician, 'video'); setActiveChatClinician(null); }}
                    className="p-2 rounded-xl bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-slate-950 transition-colors border border-teal-500/30"
                    title="Start Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleStartCall(activeChatClinician, 'audio'); setActiveChatClinician(null); }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 transition-colors border border-slate-700"
                    title="Start Voice Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChatClinician(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {networkState === 'offline' && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center space-x-2 text-[11px] text-amber-300 shrink-0">
                <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Offline — message will be sent when connection returns.</span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50">
              {(inboxMessages[activeChatClinician.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'patient'
                        ? 'bg-teal-500 text-white rounded-br-sm'
                        : 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 mt-1 px-1">
                    <span>{msg.time}</span>
                    {msg.sender === 'patient' && (
                      <span className={msg.status === 'queued_offline' ? 'text-amber-400' : 'text-teal-400'}>
                        {msg.status === 'queued_offline' ? '• Queued' : '• Delivered'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900 flex items-center space-x-2 shrink-0">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={isSending || !chatDraft.trim()}
                className="p-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
