import React, { useState } from 'react';
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
  Lock
} from 'lucide-react';
import { HealthcareWorker } from '../../types';

interface ConsultationViewProps {
  clinicians: HealthcareWorker[];
  networkState: string;
  onQueueOfflineMessage: (clinicianId: string, messageText: string) => Promise<void>;
  onInitiatePayment: (clinician: HealthcareWorker) => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  clinicians,
  networkState,
  onQueueOfflineMessage,
  onInitiatePayment
}) => {
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [activeClinician, setActiveClinician] = useState<HealthcareWorker | null>(null);
  const [chatDraft, setChatDraft] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{
    id: string;
    sender: 'patient' | 'doctor';
    text: string;
    timestamp: string;
    status: 'draft_queued' | 'delivered';
  }[]>([
    {
      id: 'msg_01',
      sender: 'doctor',
      text: 'Hello Sarah! I reviewed your latest home blood pressure recordings (128/82 mmHg). Adherence to Amlodipine looks solid. How have the morning headaches been?',
      timestamp: 'Yesterday 04:15 PM',
      status: 'delivered'
    }
  ]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const filteredClinicians = clinicians.filter(
    (c) => selectedProfession === 'all' || c.profession.toLowerCase() === selectedProfession.toLowerCase()
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatDraft.trim() || !activeClinician) return;

    setIsSending(true);
    const draftText = chatDraft.trim();
    setChatDraft('');

    const isOffline = networkState === 'offline';
    const newMsg = {
      id: 'msg_' + Date.now(),
      sender: 'patient' as const,
      text: draftText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: (isOffline ? 'draft_queued' : 'delivered') as 'draft_queued' | 'delivered'
    };

    setChatHistory((prev) => [...prev, newMsg]);

    if (isOffline) {
      await onQueueOfflineMessage(activeClinician.id, draftText);
    }

    setIsSending(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Talk to Healthcare Workers</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            Uganda Clinician Network
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Connect with registered Ugandan Doctors, Nurses, Midwives, and Physiotherapists for direct consultation.
        </p>
      </div>

      {/* Profession Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredClinicians.map((clinician) => (
          <div
            key={clinician.id}
            className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-700 shadow-md shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
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
                  <div className="flex items-center space-x-2 pt-1 text-[11px]">
                    <span className="text-amber-400 font-bold">★ {clinician.rating}</span>
                    <span className="text-slate-500">({clinician.reviewCount} reviews)</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-white font-bold">UGX {clinician.feeUGX.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800/80">
                {clinician.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveClinician(clinician)}
                className="flex-1 min-w-[120px] py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message / Consult</span>
              </button>

              <button
                onClick={() => onInitiatePayment(clinician)}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                <span>Pay via MoMo</span>
              </button>

              <button
                disabled={networkState === 'offline'}
                title={networkState === 'offline' ? "Live video calls require active internet connection" : "Initiate encrypted video call"}
                className={`p-2 rounded-xl border transition-colors ${
                  networkState === 'offline'
                    ? 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-teal-400 border-slate-700'
                }`}
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Chat Drawer / Modal */}
      {activeClinician && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={activeClinician.avatar}
                  alt={activeClinician.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{activeClinician.name}</h4>
                  <p className="text-[11px] text-teal-400">{activeClinician.specialty}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveClinician(null)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Offline Safety Warning Banner inside Chat */}
            {networkState === 'offline' && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center space-x-2 text-[11px] text-amber-300">
                <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Offline Mode:</strong> You can draft your question now. It will be stored in your device's outbox and automatically transmitted when your internet returns. We never pretend an offline message was delivered.
                </span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                      msg.sender === 'patient'
                        ? 'bg-teal-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 mt-1 px-1">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'patient' && (
                      <span>
                        {msg.status === 'draft_queued' ? (
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

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900 flex items-center space-x-2">
              <input
                type="text"
                placeholder={
                  networkState === 'offline'
                    ? 'Type consultation query (will queue offline)...'
                    : 'Type your message to clinician...'
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
    </div>
  );
};
