import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Lock,
  RefreshCw,
  EyeOff
} from 'lucide-react';
import { WhatsAppFollowUp } from '../../types';

interface WhatsAppFollowUpViewProps {
  networkState: string;
}

export const WhatsAppFollowUpView: React.FC<WhatsAppFollowUpViewProps> = ({
  networkState
}) => {
  const [messages, setMessages] = useState<WhatsAppFollowUp[]>([
    {
      id: 'wa_001',
      patientId: 'pat_sarah_001',
      patientPhone: '+256 772 458 912',
      templateType: 'Appointment Reminder',
      scheduledTime: 'Today 08:00 AM',
      status: 'Delivered',
      messagePreview: 'VitaNova Clinic: Reminder of your upcoming home nursing consultation today at 10:00 AM.',
      optedOut: false
    },
    {
      id: 'wa_002',
      patientId: 'pat_sarah_001',
      patientPhone: '+256 772 458 912',
      templateType: 'Medication Alert',
      scheduledTime: 'Yesterday 08:00 PM',
      status: 'Read',
      messagePreview: 'VitaNova Health Reminder: Time for your evening blood pressure medication (Amlodipine).',
      optedOut: false
    },
    {
      id: 'wa_003',
      patientId: 'pat_sarah_001',
      patientPhone: '+256 772 458 912',
      templateType: 'Chronic Care Follow-up',
      scheduledTime: '2026-09-02',
      status: 'Delivered',
      messagePreview: 'Dr. Mukasa follow-up check: Please log your morning resting blood pressure reading on VitaCare.',
      optedOut: false
    }
  ]);

  const [templateType, setTemplateType] = useState<WhatsAppFollowUp['templateType']>('Medication Alert');
  const [recipientPhone, setRecipientPhone] = useState<string>('+256 772 458 912');
  const [isQueueing, setIsQueueing] = useState<boolean>(false);

  const handleQueueMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsQueueing(true);

    const isOffline = networkState === 'offline';
    const newMsg: WhatsAppFollowUp = {
      id: 'wa_' + Date.now().toString(36),
      patientId: 'pat_sarah_001',
      patientPhone: recipientPhone,
      templateType,
      scheduledTime: 'Just now',
      status: isOffline ? 'Offline Draft' : 'Delivered',
      messagePreview: `VitaNova Health Alert [Privacy Protected]: New notification regarding ${templateType}. Open app to review securely.`,
      optedOut: false
    };

    if (!isOffline) {
      try {
        await fetch('/api/whatsapp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientPhone,
            templateType,
            patientName: 'Sarah Namubiru'
          })
        });
      } catch (err) {
        newMsg.status = 'Offline Draft';
      }
    }

    setMessages(prev => [newMsg, ...prev]);
    setIsQueueing(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">WhatsApp & SMS Follow-up Engine</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            Meta Cloud API Gateway
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Automated clinical outreach and patient adherence reminders adhering to healthcare privacy safeguards.
        </p>
      </div>

      {/* Privacy Notice Alert */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start space-x-3 text-xs text-slate-300">
        <EyeOff className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Healthcare Privacy Safeguard:</strong> WhatsApp and SMS notification previews never leak sensitive Protected Health Information (PHI) such as exact diagnostic lab values or specific disease labels on phone lock screens.
        </p>
      </div>

      {/* Schedule / Queue Follow-up Form */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-teal-400" />
          <span>Queue Patient Outreach Message</span>
        </h3>

        <form onSubmit={handleQueueMessage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Outreach Template</label>
              <select
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-teal-500"
              >
                <option value="Appointment Reminder">Appointment Reminder</option>
                <option value="Medication Alert">Medication Dosage Reminder</option>
                <option value="Chronic Care Follow-up">Chronic Care BP / Glucose Check-in</option>
                <option value="Post-Consultation">Post-Consultation Doctor Follow-up</option>
                <option value="Home-Care Check-in">Home-Care Nursing Check-in</option>
                <option value="Pregnancy Follow-up">Antenatal / Pregnancy Check</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Recipient Phone Number (Uganda)</label>
              <input
                type="text"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              {networkState === 'offline' ? '⚠️ Offline: Message will queue in device outbox.' : '✓ Online: Message transmits immediately via Uganda SMS/WhatsApp.'}
            </span>

            <button
              type="submit"
              disabled={isQueueing}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Queue Outreach</span>
            </button>
          </div>
        </form>
      </div>

      {/* Message History Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Outreach History & Delivery Confirmation</h3>
        <div className="space-y-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">{m.templateType}</span>
                  <span className="text-[10px] text-slate-400">to {m.patientPhone}</span>
                </div>
                <p className="text-xs text-slate-300 italic">{m.messagePreview}</p>
                <p className="text-[10px] text-slate-500">{m.scheduledTime}</p>
              </div>

              <div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center space-x-1 ${
                    m.status === 'Delivered' || m.status === 'Read'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {m.status === 'Delivered' || m.status === 'Read' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{m.status}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{m.status}</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
