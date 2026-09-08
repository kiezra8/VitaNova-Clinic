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
  Activity
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
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [activeClinician, setActiveClinician] = useState<HealthcareWorker | null>(null);

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
    if (!chatDraft.trim() || !activeClinician) return;

    setIsSending(true);
    const text = chatDraft.trim();
    setChatDraft('');
    const isOffline = networkState === 'offline';
    const clinicianId = activeClinician.id;

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
      // Simulate real clinician reply after 2 seconds
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

  const filteredClinicians = clinicians.filter(
    (c) => selectedProfession === 'all' || c.profession.toLowerCase() === selectedProfession.toLowerCase()
  );

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20 max-w-full overflow-hidden">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Consult with Health Workers
          </h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            Direct Care
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Directly video call, phone call, or message registered doctors, nurses, midwives, and physiotherapists in Uganda.
        </p>
      </div>

      {/* Profession Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 max-w-full">
        {['all', 'Doctor', 'Nurse', 'Midwife', 'Physiotherapist'].map((prof) => (
          <button
            key={prof}
            onClick={() => setSelectedProfession(prof)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedProfession === prof
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {prof === 'all' ? 'All Clinicians' : prof + 's'}
          </button>
        ))}
      </div>

      {/* Clinicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredClinicians.map((clinician) => (
          <div
            key={clinician.id}
            className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={clinician.avatar}
                    alt={clinician.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-teal-500/30 shadow-md shrink-0"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-base font-bold text-white">{clinician.name}</h3>
                    {clinician.verified && (
                      <span title="Verified by Uganda Medical Council">
                        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-teal-400 font-semibold">{clinician.specialty}</p>
                  <p className="text-[11px] text-slate-400">
                    {clinician.experienceYears} yrs experience • Speaks {clinician.languages.join(', ')}
                  </p>
                  <div className="flex items-center space-x-2 pt-0.5 text-[11px]">
                    <span className="text-amber-400 font-bold">★ {clinician.rating}</span>
                    <span className="text-slate-500">({clinician.reviewCount} reviews)</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-white font-bold">UGX {clinician.feeUGX.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-2xl border border-slate-800/80">
                {clinician.bio}
              </p>
            </div>

            {/* Direct 3-in-1 Communication Action Bar */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => startCall(clinician, 'video')}
                className="py-2.5 px-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1 shadow-md shadow-teal-500/20 transition-transform active:scale-95"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Call</span>
              </button>

              <button
                type="button"
                onClick={() => startCall(clinician, 'audio')}
                className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Voice Call</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveClinician(clinician)}
                className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>Direct Inbox</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Clinician Inbox / Chat Modal */}
      {activeClinician && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg flex flex-col h-[620px] max-h-[92vh] overflow-hidden shadow-2xl">
            {/* Inbox Header with Direct Audio & Video Triggers */}
            <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={activeClinician.avatar}
                    alt={activeClinician.name}
                    className="w-10 h-10 rounded-xl object-cover border border-teal-500/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{activeClinician.name}</h4>
                  <p className="text-[11px] text-teal-400">{activeClinician.specialty}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* 1-Click Video Call from Inbox Header */}
                <button
                  type="button"
                  onClick={() => startCall(activeClinician, 'video')}
                  title="Start Live Video Consultation"
                  className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 transition-colors"
                >
                  <Video className="w-4 h-4" />
                </button>

                {/* 1-Click Voice Call from Inbox Header */}
                <button
                  type="button"
                  onClick={() => startCall(activeClinician, 'audio')}
                  title="Start Audio Call"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveClinician(null)}
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
              {(inboxMessages[activeClinician.id] || []).map((msg) => (
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
                    : 'Type a message to doctor...'
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

      {/* Fullscreen Interactive Telehealth Video Call Interface */}
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
            {/* Mute Mic Toggle */}
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

            {/* Video Camera Toggle */}
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

            {/* End Call Button */}
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

      {/* Fullscreen Interactive Telehealth Voice / Audio Call Interface */}
      {activeCallClinician && callType === 'audio' && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 select-none animate-fadeIn">
          {/* Header */}
          <div className="text-center pt-8 space-y-1">
            <span className="text-xs font-semibold text-teal-400">VitaNova Voice Call</span>
            <h3 className="text-xl font-bold text-white">{activeCallClinician.name}</h3>
            <p className="text-xs text-slate-400">{activeCallClinician.specialty}</p>
          </div>

          {/* Audio Avatar with Animated Pulsing Waves */}
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

          {/* Audio Call Controls Bar */}
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
