import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Video,
  Phone,
  MessageSquare,
  Send,
  BadgeCheck,
  Star,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCheck,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Paperclip,
  Smile,
  MoreVertical,
  ArrowDown,
  Users,
  Mic,
  MicOff,
  Square,
  Trash2,
  Image as ImageIcon,
  Camera,
  X,
  Calendar,
  UserCheck,
  MapPin,
  Sparkles,
  Lock
} from 'lucide-react';
import { HealthcareWorker, HomeCareRequest } from '../../types';
import {
  sendMessage,
  fetchMessages,
  markMessagesAsRead,
  subscribeToMessages_v2,
  getConversationId,
  fetchCallLogs,
  fetchConversations,
  ChatMessage,
  CallLog
} from '../../lib/supabase';

interface ConsultationViewProps {
  clinicians: HealthcareWorker[];
  networkState: string;
  onQueueOfflineMessage: (clinicianId: string, messageText: string) => Promise<void>;
  onInitiatePayment: (clinician: HealthcareWorker) => void;
  activeCallClinician?: HealthcareWorker | null;
  callType?: 'video' | 'audio' | null;
  onEndCall?: () => void;
  onTriggerCall?: (clinician: HealthcareWorker, type: 'video' | 'audio') => void;
  /** Current user info for messaging */
  currentUserId?: string;
  currentUserName?: string;
  currentUserRole?: 'patient' | 'doctor';
  onRequestHomeCare?: (req: Omit<HomeCareRequest, 'id' | 'syncStatus'>) => Promise<void>;
  directChatClinician?: HealthcareWorker | null;
  defaultTab?: 'directory' | 'chats' | 'calls';
}

const formatMessageTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDateSeparator = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return d.toLocaleDateString([], { weekday: 'long' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatCallDuration = (sec: number) => {
  if (!sec) return '0:00';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

type ViewTab = 'directory' | 'calls' | 'chats';

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  clinicians,
  networkState,
  onQueueOfflineMessage,
  onInitiatePayment,
  onTriggerCall,
  currentUserId = 'pat_sarah_001',
  currentUserName = 'Sarah Namubiru',
  currentUserRole = 'patient',
  onRequestHomeCare,
  directChatClinician = null,
  defaultTab = 'directory'
}) => {
  const [viewTab, setViewTab] = useState<ViewTab>(directChatClinician ? 'chats' : defaultTab);
  const [selectedClinician, setSelectedClinician] = useState<HealthcareWorker | null>(directChatClinician);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatDraft, setChatDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [lastMessages, setLastMessages] = useState<Record<string, { text: string; time: string }>>({});

  // Doctor's Talked Customers state
  const [talkedCustomers, setTalkedCustomers] = useState<Array<{
    id: string;
    name: string;
    avatar: string;
    lastMessage?: string;
    lastTime?: string;
  }>>([]);

  // Booking Modal State for Nurses, Midwives & Physiotherapists
  const [selectedWorkerForBooking, setSelectedWorkerForBooking] = useState<HealthcareWorker | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingAddress, setBookingAddress] = useState<string>('Plot 14, Ntinda-Nakawa Road, Kampala');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Voice note recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Group clinicians into Doctors on Call vs Allied Health Staff
  const doctorsOnCall = clinicians.filter(
    (c) => c.profession?.toLowerCase() === 'doctor' || !c.profession
  );

  const alliedWorkers = clinicians.filter(
    (c) => c.profession?.toLowerCase() !== 'doctor' && !!c.profession
  );

  // Listen to external direct chat selection
  useEffect(() => {
    if (directChatClinician) {
      setSelectedClinician(directChatClinician);
      setViewTab('chats');
    }
  }, [directChatClinician]);

  // Scroll to bottom of chat
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  // Load messages when clinician/customer selected
  useEffect(() => {
    if (!selectedClinician) return;

    const conversationId = getConversationId(currentUserId, selectedClinician.id);

    // Fetch existing messages
    fetchMessages(conversationId).then((msgs) => {
      setMessages(msgs);
      setTimeout(() => scrollToBottom('instant'), 100);
    });

    // Mark as read
    markMessagesAsRead(conversationId, currentUserId).catch(() => {});

    // Subscribe to new messages in real-time
    const unsub = subscribeToMessages_v2(conversationId, (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
      setTimeout(() => scrollToBottom(), 100);
      if (newMsg.recipientId === currentUserId) {
        markMessagesAsRead(conversationId, currentUserId).catch(() => {});
      }
    });

    return () => unsub();
  }, [selectedClinician, currentUserId, scrollToBottom]);

  // Load call logs (Recent calls recorded from localStorage and Supabase)
  useEffect(() => {
    const loadCalls = async () => {
      let localCalls: CallLog[] = [];
      try {
        const raw = localStorage.getItem('vitanova_recent_calls');
        if (raw) localCalls = JSON.parse(raw);
      } catch (_) {}

      try {
        const remoteCalls = await fetchCallLogs(currentUserId);
        const combined = [...localCalls];
        remoteCalls.forEach((rc) => {
          if (!combined.some((c) => c.id === rc.id || (c.sessionId && c.sessionId === rc.sessionId))) {
            combined.push(rc);
          }
        });
        combined.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
        setCallLogs(combined);
      } catch (_) {
        setCallLogs(localCalls);
      }
    };

    loadCalls();
  }, [viewTab, currentUserId]);

  // Load doctor's customers (only customers the doctor has talked to)
  useEffect(() => {
    if (currentUserRole !== 'doctor') return;
    const loadDoctorCustomers = async () => {
      const customersMap = new Map<string, { id: string; name: string; avatar: string; lastMessage?: string; lastTime?: string }>();

      // 1. From local doctor customers
      try {
        const raw = localStorage.getItem(`vitanova_doctor_customers_${currentUserId}`);
        if (raw) {
          const list = JSON.parse(raw);
          list.forEach((c: any) => customersMap.set(c.id, c));
        }
      } catch (_) {}

      // 2. From recent calls
      try {
        const rawCalls = localStorage.getItem('vitanova_recent_calls');
        if (rawCalls) {
          const calls: any[] = JSON.parse(rawCalls);
          calls.forEach((cl) => {
            if (cl.calleeId === currentUserId || cl.callerId === currentUserId) {
              const otherId = cl.callerId === currentUserId ? cl.calleeId : cl.callerId;
              const otherName = cl.callerId === currentUserId ? cl.calleeName : cl.callerName;
              if (otherId && otherId !== currentUserId) {
                if (!customersMap.has(otherId)) {
                  customersMap.set(otherId, {
                    id: otherId,
                    name: otherName || 'Patient',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                    lastMessage: `${cl.callType ? cl.callType.toUpperCase() : 'Video'} Call`,
                    lastTime: cl.startedAt ? formatMessageTime(cl.startedAt) : undefined
                  });
                }
              }
            }
          });
        }
      } catch (_) {}

      // 3. From Supabase conversations
      try {
        const convs = await fetchConversations(currentUserId);
        for (const conv of convs) {
          if (!customersMap.has(conv.otherPartyId)) {
            customersMap.set(conv.otherPartyId, {
              id: conv.otherPartyId,
              name: conv.lastMessage?.senderId === currentUserId ? 'Patient' : (conv.lastMessage?.senderName || 'Patient'),
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
              lastMessage: conv.lastMessage?.content,
              lastTime: conv.lastMessage?.createdAt ? formatMessageTime(conv.lastMessage.createdAt) : undefined
            });
          }
        }
      } catch (_) {}

      setTalkedCustomers(Array.from(customersMap.values()));
    };

    loadDoctorCustomers();
  }, [currentUserRole, currentUserId]);

  // Build last message and unread count per clinician (for patient sidebar)
  useEffect(() => {
    if (currentUserRole === 'doctor') return;
    const loadConversationPreviews = async () => {
      const newLastMessages: Record<string, { text: string; time: string }> = {};
      const newUnread: Record<string, number> = {};

      for (const doc of clinicians) {
        const convId = getConversationId(currentUserId, doc.id);
        try {
          const msgs = await fetchMessages(convId, 1);
          if (msgs.length > 0) {
            const last = msgs[msgs.length - 1];
            newLastMessages[doc.id] = {
              text: last.content.substring(0, 60) + (last.content.length > 60 ? '...' : ''),
              time: formatMessageTime(last.createdAt)
            };
          }
        } catch (_) {}
      }
      setLastMessages(newLastMessages);
      setUnreadCounts(newUnread);
    };

    loadConversationPreviews();
  }, [clinicians, currentUserId, currentUserRole]);

  // Handle scroll to detect if user scrolled up
  const handleChatScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setShowScrollDown(scrollHeight - scrollTop - clientHeight > 120);
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatDraft.trim() || !selectedClinician) return;

    setIsSending(true);
    const text = chatDraft.trim();
    setChatDraft('');

    try {
      const sent = await sendMessage({
        senderId: currentUserId,
        senderRole: currentUserRole,
        senderName: currentUserName,
        recipientId: selectedClinician.id,
        content: text
      });

      if (sent) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === sent.id)) return prev;
          return [...prev, sent];
        });
        setTimeout(() => scrollToBottom(), 100);
      } else if (networkState === 'offline') {
        await onQueueOfflineMessage(selectedClinician.id, text);
        setMessages((prev) => [
          ...prev,
          {
            id: 'local_' + Date.now(),
            conversationId: getConversationId(currentUserId, selectedClinician.id),
            senderId: currentUserId,
            senderRole: currentUserRole,
            senderName: currentUserName,
            recipientId: selectedClinician.id,
            messageType: 'text',
            content: text,
            isRead: false,
            isDelivered: false,
            isStarred: false,
            createdAt: new Date().toISOString()
          }
        ]);
        setTimeout(() => scrollToBottom(), 100);
      }
    } catch (err) {
      console.warn('[VitaNova] Send message error:', err);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  // Start call
  const handleStartCall = (clinician: HealthcareWorker, type: 'video' | 'audio') => {
    if (onTriggerCall) {
      onTriggerCall(clinician, type);
    }
  };

  // ── Voice Note Recording ─────────────────────────────────────────────────
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: BlobPart[] = [];
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
      const mr = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: mr.mimeType });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioPreviewUrl(url);
        setIsRecording(false);
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        setRecordingSeconds(0);
      };
      mr.start();
      setIsRecording(true);
      setAudioBlob(null);
      setAudioPreviewUrl('');
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
    } catch (err) {
      console.warn('[VitaNova] Mic access denied:', err);
      alert('Microphone access is required to record a voice note.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
  };

  const handleCancelVoiceNote = () => {
    handleStopRecording();
    setAudioBlob(null);
    setAudioPreviewUrl('');
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const handleSendVoiceNote = async () => {
    if (!audioBlob || !selectedClinician) return;
    setIsSending(true);
    try {
      const reader = new FileReader();
      const dataUrl: string = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });

      const sent = await sendMessage({
        senderId: currentUserId,
        senderRole: currentUserRole,
        senderName: currentUserName,
        recipientId: selectedClinician.id,
        content: '🎤 Voice Note',
        messageType: 'voice',
        mediaUrl: dataUrl,
        mediaMimeType: audioBlob.type || 'audio/webm'
      });

      if (sent) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === sent.id)) return prev;
          return [...prev, sent];
        });
        setTimeout(() => scrollToBottom(), 100);
      }
    } catch (err) {
      console.warn('[VitaNova] Send voice note error:', err);
    } finally {
      setIsSending(false);
      setAudioBlob(null);
      setAudioPreviewUrl('');
      setIsRecording(false);
      setRecordingSeconds(0);
    }
  };

  // Booking submit for allied workers
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkerForBooking) return;
    setIsSubmittingBooking(true);
    try {
      if (onRequestHomeCare) {
        await onRequestHomeCare({
          patientId: currentUserId || 'pat_sarah_001',
          patientName: currentUserName || 'Sarah Namubiru',
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
      setBookingSuccessMsg(`Appointment booked with ${selectedWorkerForBooking.name}!`);
      setTimeout(() => setBookingSuccessMsg(null), 4000);
      setSelectedWorkerForBooking(null);
      setBookingNotes('');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Filter clinicians by search
  const filteredClinicians = clinicians.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.specialty.toLowerCase().includes(q) ||
      c.profession.toLowerCase().includes(q)
    );
  });

  const getDateKey = (dateStr: string) => new Date(dateStr).toDateString();

  return (
    <div className="space-y-4 pb-20 max-w-full overflow-hidden bg-white min-h-screen text-slate-900">
      {/* ── Subheader Controls / Main Tab Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-lg">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Care & Telehealth</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              {currentUserRole === 'doctor' ? 'Doctor Portal' : 'Patient Care'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentUserRole === 'doctor'
              ? 'Direct conversations with patients & recent call logs'
              : 'Doctors on Call, certified nurses, recent calls & private messaging'}
          </p>
        </div>

        {/* 3 Main Tabs: Directory | Recent Calls | Messages */}
        <div className="flex bg-slate-950/80 rounded-xl p-1 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => {
              setViewTab('directory');
              setSelectedClinician(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewTab === 'directory'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Care Directory</span>
          </button>

          <button
            onClick={() => {
              setViewTab('calls');
              setSelectedClinician(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewTab === 'calls'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Recent Calls</span>
            {callLogs.length > 0 && (
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-teal-300">
                {callLogs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setViewTab('chats')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewTab === 'chats'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages</span>
          </button>
        </div>
      </div>

      {/* Booking Success Toast */}
      {bookingSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-semibold animate-in fade-in">
          <span>{bookingSuccessMsg}</span>
          <button onClick={() => setBookingSuccessMsg(null)} className="text-emerald-400 hover:text-white font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* ── 1. CARE DIRECTORY TAB (Doctors and Nurses as on Home Screen) ── */}
      {viewTab === 'directory' && (
        <div className="space-y-6">
          {/* Section: Doctors on Call */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                <h2 className="text-base font-extrabold text-white tracking-tight">Doctors on Call</h2>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Live Telehealth
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {doctorsOnCall.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all p-3.5 flex flex-col items-center justify-between space-y-3"
                >
                  {/* Doctor Image Profile */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shadow-inner group">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                      onClick={() => handleStartCall(doc, 'video')}
                      className="py-2.5 px-2 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1 shadow-sm shadow-teal-500/20 transition-all"
                      title={`Start Video Consultation with ${doc.name}`}
                    >
                      <Video className="w-3.5 h-3.5 shrink-0" />
                      <span>Video</span>
                    </button>
                    <button
                      onClick={() => handleStartCall(doc, 'audio')}
                      className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 flex items-center justify-center space-x-1 transition-all"
                      title={`Start Audio Call with ${doc.name}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Audio</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedClinician(doc);
                        setViewTab('chats');
                      }}
                      className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 flex items-center justify-center space-x-1 transition-all"
                      title={`Direct Message ${doc.name}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Nurses, Midwives & Physiotherapists */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  Nurses, Midwives & Physiotherapists
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {alliedWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all p-3.5 flex flex-col items-center justify-between space-y-3"
                >
                  {/* Profile Image — Same large aspect-[4/3] card format as doctors */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shadow-inner group">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Profession Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-sm text-teal-300 border border-teal-500/30 shadow-md">
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
                      onClick={() => setSelectedWorkerForBooking(worker)}
                      className="w-full py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm shadow-teal-500/20 transition-all"
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
        </div>
      )}

      {/* ── 2. RECENT CALLS TAB (Recorded Calls Log) ── */}
      {viewTab === 'calls' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">Recent Telehealth Call Log</h2>
            </div>
            <span className="text-xs text-slate-400">
              {callLogs.length} Recorded Call{callLogs.length === 1 ? '' : 's'}
            </span>
          </div>

          {callLogs.length > 0 ? (
            <div className="space-y-2">
              {callLogs.map((log) => {
                const isOutgoing = log.callerRole === currentUserRole || log.callerId === currentUserId;
                const isMissed = log.status === 'missed' || log.status === 'declined';
                const otherPartyName = isOutgoing ? log.calleeName : log.callerName;
                const clinicianMatch = clinicians.find(
                  (c) => c.id === (isOutgoing ? log.calleeId : log.callerId) || c.name === otherPartyName
                );

                return (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={clinicianMatch?.avatar || (log.callerRole === 'doctor' ? '/ki_ezra_avatar.jpg' : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80')}
                          alt={otherPartyName}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-sm font-bold truncate ${isMissed ? 'text-rose-400' : 'text-white'}`}>
                          {otherPartyName}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                          {isOutgoing ? (
                            <span className="flex items-center space-x-1 text-emerald-400">
                              <PhoneOutgoing className="w-3 h-3" />
                              <span>Outgoing</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1 text-teal-400">
                              <PhoneIncoming className="w-3 h-3" />
                              <span>Incoming</span>
                            </span>
                          )}
                          <span>•</span>
                          <span className="capitalize">{log.callType} Call</span>
                          <span>•</span>
                          <span>{new Date(log.startedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 ml-3">
                      {clinicianMatch && (
                        <>
                          <button
                            onClick={() => handleStartCall(clinicianMatch, 'video')}
                            className="p-2 rounded-xl bg-teal-500/15 hover:bg-teal-500 text-teal-300 hover:text-slate-950 transition-colors"
                            title={`Redial Video with ${clinicianMatch.name}`}
                          >
                            <Video className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStartCall(clinicianMatch, 'audio')}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title={`Redial Audio with ${clinicianMatch.name}`}
                          >
                            <Phone className="w-4 h-4 text-teal-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Phone className="w-12 h-12 mb-3 opacity-30 text-teal-400" />
              <p className="text-sm font-bold text-white">No Recent Calls Recorded</p>
              <p className="text-xs mt-1 text-slate-400">Calls initiated via Video or Audio will be recorded here.</p>
            </div>
          )}
        </div>
      )}

      {/* ── 3. CHATS TAB ── */}
      {viewTab === 'chats' && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex overflow-hidden">
          {/* Sidebar */}
          <div
            className={`${
              selectedClinician ? 'hidden md:flex' : 'flex'
            } w-full md:w-80 lg:w-96 flex-col border-r border-slate-800/60 shrink-0 bg-slate-900`}
          >
            {/* Sidebar Header with back/exit button */}
            <div className="px-4 pt-4 pb-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-white">
                  {currentUserRole === 'doctor' ? 'Customer Conversations' : 'Practitioner Messages'}
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {currentUserRole === 'doctor'
                    ? 'Patients who have consulted or talked with you'
                    : 'Encrypted direct messaging with clinicians'}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedClinician(null);
                  setViewTab('directory');
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Exit Fullscreen Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {currentUserRole === 'doctor' ? (
                /* Doctor view: ONLY customers talked to */
                talkedCustomers.length > 0 ? (
                  talkedCustomers.map((cust) => {
                    const isSelected = selectedClinician?.id === cust.id;
                    return (
                      <button
                        key={cust.id}
                        onClick={() =>
                          setSelectedClinician({
                            id: cust.id,
                            name: cust.name,
                            avatar: cust.avatar,
                            profession: 'Doctor' as any,
                            specialty: 'Patient Consultation',
                            experienceYears: 0,
                            verified: true,
                            available: true,
                            feeUGX: 0,
                            bio: 'Consultation Patient',
                            languages: ['English'],
                            rating: 5.0,
                            reviewCount: 0
                          })
                        }
                        className={`w-full flex items-center space-x-3 px-4 py-3.5 transition-all border-b border-slate-800/50 text-left ${
                          isSelected ? 'bg-teal-500/15 border-l-2 border-l-teal-500' : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white truncate">{cust.name}</span>
                            {cust.lastTime && <span className="text-[10px] text-slate-500">{cust.lastTime}</span>}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{cust.lastMessage || 'Patient in consult'}</p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-slate-500">
                    <Users className="w-10 h-10 mb-2 opacity-30 text-teal-400" />
                    <p className="text-xs font-bold text-slate-300">No Customers Talked To Yet</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
                      Patients who reach out to you via call or message will appear here.
                    </p>
                  </div>
                )
              ) : (
                /* Patient view: Clinicians to message */
                filteredClinicians.map((doc) => {
                  const lastMsg = lastMessages[doc.id];
                  const unread = unreadCounts[doc.id] || 0;
                  const isSelected = selectedClinician?.id === doc.id;

                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedClinician(doc)}
                      className={`w-full flex items-center space-x-3 px-4 py-3.5 transition-all border-b border-slate-800/50 text-left ${
                        isSelected ? 'bg-teal-500/15 border-l-2 border-l-teal-500' : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-700"
                        />
                        {doc.available && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white truncate">{doc.name}</span>
                          {lastMsg && <span className="text-[10px] text-slate-500">{lastMsg.time}</span>}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{lastMsg ? lastMsg.text : doc.specialty}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <div className={`${selectedClinician ? 'flex' : 'hidden md:flex'} flex-1 flex-col relative bg-slate-950`}>
            {selectedClinician ? (
              <div className="flex-1 flex flex-col h-full">
                {/* Chat Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center space-x-3 min-w-0">
                    <button
                      onClick={() => setSelectedClinician(null)}
                      className="md:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <img
                      src={selectedClinician.avatar}
                      alt={selectedClinician.name}
                      className="w-10 h-10 rounded-full object-cover border border-teal-500/50"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">{selectedClinician.name}</h3>
                      <p className="text-[11px] text-teal-400 font-semibold truncate">{selectedClinician.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleStartCall(selectedClinician, 'video')}
                      className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 transition-colors"
                      title="Video Call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartCall(selectedClinician, 'audio')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Audio Call"
                    >
                      <Phone className="w-4 h-4 text-teal-400" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedClinician(null);
                        setViewTab('directory');
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ml-1"
                      title="Exit Chat"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages Body */}
                <div
                  ref={chatContainerRef}
                  onScroll={handleChatScroll}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-center mb-2">
                    <p className="text-[11px] font-semibold text-teal-300 flex items-center justify-center space-x-1">
                      <Lock className="w-3 h-3 text-teal-400 shrink-0" />
                      <span>End-to-End Encrypted • Private Clinical Session</span>
                    </p>
                  </div>
                  {messages.length > 0 ? (
                    messages.map((msg) => {
                      const isMe = msg.senderId === currentUserId;
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-2`}>
                          {/* Sender Name label */}
                          <span className={`text-[10px] font-bold px-1 mb-0.5 ${isMe ? 'text-teal-400' : 'text-slate-400'}`}>
                            {isMe ? 'You' : (msg.senderName || (msg.senderRole === 'doctor' ? 'Doctor' : 'Patient'))}
                          </span>
                          <div
                            className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs ${
                              isMe
                                ? 'bg-teal-600 text-white rounded-br-none shadow-sm'
                                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                            }`}
                          >
                            {msg.messageType === 'voice' && msg.mediaUrl ? (
                              <div className="space-y-1.5 py-1 min-w-[200px] sm:min-w-[240px]">
                                <div className="flex items-center space-x-2 text-[11px] font-bold opacity-90">
                                  <span>🎤</span>
                                  <span>Voice Note</span>
                                </div>
                                <audio
                                  controls
                                  src={msg.mediaUrl}
                                  className="w-full h-8 rounded-lg outline-none"
                                />
                              </div>
                            ) : (
                              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            )}
                            <span className="text-[9.5px] opacity-70 block text-right mt-1">
                              {formatMessageTime(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center">
                      <MessageSquare className="w-10 h-10 mb-2 opacity-30 text-teal-400" />
                      <p className="text-xs font-semibold text-slate-400">Encrypted Consultation Channel</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Send a message or voice note to start direct communication.</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input form with Voice Note Support */}
                <div className="p-3 bg-slate-900 border-t border-slate-800">
                  {isRecording ? (
                    /* Active Recording Bar */
                    <div className="flex items-center justify-between bg-rose-500/10 border border-rose-500/30 rounded-2xl p-2.5 animate-pulse">
                      <div className="flex items-center space-x-2.5 text-rose-400 font-bold text-xs pl-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                        <span>Recording Voice Note...</span>
                        <span className="font-mono text-white text-xs">
                          0:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={handleCancelVoiceNote}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Cancel Recording"
                        >
                          <Trash2 className="w-4 h-4 text-rose-400" />
                        </button>
                        <button
                          type="button"
                          onClick={handleStopRecording}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                          title="Done Recording"
                        >
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>Done</span>
                        </button>
                      </div>
                    </div>
                  ) : audioPreviewUrl ? (
                    /* Recorded Audio Preview Bar */
                    <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 rounded-2xl p-2">
                      <button
                        type="button"
                        onClick={handleCancelVoiceNote}
                        className="p-2 rounded-xl hover:bg-slate-750 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Discard Voice Note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <audio controls src={audioPreviewUrl} className="flex-1 h-8 rounded-lg" />
                      <button
                        type="button"
                        onClick={handleSendVoiceNote}
                        disabled={isSending}
                        className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-black text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-teal-500/20"
                        title="Send Voice Note"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  ) : (
                    /* Standard text input + Voice note record button */
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={chatDraft}
                        onChange={(e) => setChatDraft(e.target.value)}
                        placeholder="Type encrypted message..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 border border-slate-700 transition-all"
                        title="Record Voice Note"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      <button
                        type="submit"
                        disabled={isSending || !chatDraft.trim()}
                        className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-sm"
                        title="Send Message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 relative">
                <button
                  onClick={() => { setSelectedClinician(null); setViewTab('directory'); }}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Exit Fullscreen Chat"
                >
                  <X className="w-4 h-4" />
                </button>
                <MessageSquare className="w-12 h-12 mb-3 text-teal-400 opacity-40" />
                <h3 className="text-base font-bold text-white">VitaNova Telehealth Chat</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Select a practitioner or customer conversation to begin messaging.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Booking Modal for Nurses, Midwives & Physiotherapists ── */}
      {selectedWorkerForBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedWorkerForBooking.avatar}
                  alt={selectedWorkerForBooking.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-white">{selectedWorkerForBooking.name}</h3>
                  <span className="inline-block text-[11px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                    {selectedWorkerForBooking.profession}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorkerForBooking(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>Home Visit Address (Kampala / Wakiso)</span>
                </label>
                <input
                  type="text"
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500 font-medium"
                  placeholder="Plot 14, Ntinda-Nakawa Road"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Care Notes / Reason for Visit</span>
                </label>
                <textarea
                  rows={3}
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500 font-medium resize-none"
                  placeholder="Describe needed care: e.g. Postpartum counseling, wound dressing, or mobility rehab."
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedWorkerForBooking(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-bold shadow-md shadow-teal-500/20 flex items-center space-x-1.5"
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

export default ConsultationView;
