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
  Image as ImageIcon,
  Camera,
  X
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import {
  sendMessage,
  fetchMessages,
  markMessagesAsRead,
  subscribeToMessages_v2,
  getConversationId,
  fetchCallLogs,
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

type ViewTab = 'chats' | 'calls';

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  clinicians,
  networkState,
  onQueueOfflineMessage,
  onInitiatePayment,
  onTriggerCall,
  currentUserId = 'pat_sarah_001',
  currentUserName = 'Sarah Namubiru',
  currentUserRole = 'patient'
}) => {
  const [viewTab, setViewTab] = useState<ViewTab>('chats');
  const [selectedClinician, setSelectedClinician] = useState<HealthcareWorker | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatDraft, setChatDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [lastMessages, setLastMessages] = useState<Record<string, { text: string; time: string }>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  // Load messages when clinician selected
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
        // Avoid duplicates
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
      // Auto-scroll if near bottom
      setTimeout(() => scrollToBottom(), 100);
      // Mark as read if we're the recipient
      if (newMsg.recipientId === currentUserId) {
        markMessagesAsRead(conversationId, currentUserId).catch(() => {});
      }
    });

    return () => unsub();
  }, [selectedClinician, currentUserId, scrollToBottom]);

  // Load call logs
  useEffect(() => {
    if (viewTab === 'calls') {
      fetchCallLogs(currentUserId).then(setCallLogs).catch(() => {});
    }
  }, [viewTab, currentUserId]);

  // Build last message and unread count per clinician (for sidebar)
  useEffect(() => {
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
  }, [clinicians, currentUserId]);

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
        // Queue offline
        await onQueueOfflineMessage(selectedClinician.id, text);
        // Add as local-only message
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

  // Group messages by date for date separators
  const getDateKey = (dateStr: string) => new Date(dateStr).toDateString();

  // ─── CONVERSATION LIST (Left Sidebar) ─────────────────────────────────────
  const renderConversationList = () => (
    <div className="flex flex-col h-full bg-slate-900">
      {/* WhatsApp-style Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-black text-white tracking-tight">Messages</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab selector: Chats | Calls */}
        <div className="flex bg-slate-800/60 rounded-xl p-1 mb-3">
          <button
            onClick={() => setViewTab('chats')}
            className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
              viewTab === 'chats'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
            Chats
          </button>
          <button
            onClick={() => setViewTab('calls')}
            className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
              viewTab === 'calls'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5 inline mr-1" />
            Calls
          </button>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinicians..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {viewTab === 'chats' ? (
          filteredClinicians.length > 0 ? (
            filteredClinicians.map((doc) => {
              const lastMsg = lastMessages[doc.id];
              const unread = unreadCounts[doc.id] || 0;
              const isSelected = selectedClinician?.id === doc.id;

              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedClinician(doc)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 transition-all border-b border-slate-800/50 text-left ${
                    isSelected
                      ? 'bg-teal-500/10 border-l-2 border-l-teal-500'
                      : 'hover:bg-slate-800/60'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                    />
                    {doc.available && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span className="text-sm font-bold text-white truncate">{doc.name}</span>
                        {doc.verified && <BadgeCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />}
                      </div>
                      {lastMsg && (
                        <span className="text-[10px] text-slate-500 shrink-0 ml-2">{lastMsg.time}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400 truncate pr-2">
                        {lastMsg ? lastMsg.text : doc.specialty}
                      </p>
                      {unread > 0 && (
                        <span className="shrink-0 w-5 h-5 rounded-full bg-teal-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Users className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm font-semibold">No clinicians found</p>
            </div>
          )
        ) : (
          /* CALLS TAB */
          <div className="px-2">
            {callLogs.length > 0 ? (
              callLogs.map((log) => {
                const isOutgoing = log.callerRole === currentUserRole;
                const isMissed = log.status === 'missed' || log.status === 'declined';
                const otherName = isOutgoing ? log.calleeName : log.callerName;
                const doc = clinicians.find((c) => c.id === (isOutgoing ? log.calleeId : log.callerId));

                return (
                  <div
                    key={log.id}
                    className="flex items-center space-x-3 px-3 py-3 border-b border-slate-800/50 hover:bg-slate-800/40 rounded-xl transition-colors"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={doc?.avatar || '/ki_ezra_avatar.jpg'}
                        alt={otherName}
                        className="w-11 h-11 rounded-full object-cover border-2 border-slate-700"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-bold ${isMissed ? 'text-rose-400' : 'text-white'}`}>
                        {otherName}
                      </span>
                      <div className="flex items-center space-x-1.5 text-[11px] mt-0.5">
                        {isOutgoing ? (
                          <PhoneOutgoing className={`w-3 h-3 ${isMissed ? 'text-rose-400' : 'text-emerald-400'}`} />
                        ) : (
                          <PhoneIncoming className={`w-3 h-3 ${isMissed ? 'text-rose-400' : 'text-emerald-400'}`} />
                        )}
                        <span className="text-slate-400">
                          {log.callType === 'video' ? 'Video' : 'Voice'} • {log.status}
                          {log.durationSec > 0 && ` • ${formatCallDuration(log.durationSec)}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-500">
                        {new Date(log.startedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                      {doc && (
                        <button
                          onClick={() => handleStartCall(doc, log.callType)}
                          className="p-2 rounded-xl hover:bg-slate-700 text-teal-400 transition-colors"
                        >
                          {log.callType === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Phone className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-semibold">No call history yet</p>
                <p className="text-xs mt-1">Start a call with a clinician</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // ─── CHAT VIEW (Right Panel) ──────────────────────────────────────────────
  const renderChatView = () => {
    if (!selectedClinician) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-center p-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-teal-500 opacity-60" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">VitaNova Telehealth Chat</h3>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            Select a healthcare professional to start a private, encrypted consultation chat with video & voice calling.
          </p>
          <div className="mt-6 flex items-center space-x-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse" />
            <span>End-to-end encrypted • HIPAA compliant</span>
          </div>
        </div>
      );
    }

    let previousDate = '';

    return (
      <div className="flex-1 flex flex-col bg-slate-950 h-full">
        {/* ── Chat Header ── */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-10">
          <div className="flex items-center space-x-3">
            {/* Back button (mobile) */}
            <button
              onClick={() => setSelectedClinician(null)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="relative">
              <img
                src={selectedClinician.avatar}
                alt={selectedClinician.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-teal-500/50"
              />
              {selectedClinician.available && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              )}
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-extrabold text-white">{selectedClinician.name}</h3>
                {selectedClinician.verified && <BadgeCheck className="w-3.5 h-3.5 text-teal-400" />}
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedClinician.available ? (
                  <span className="text-emerald-400 font-semibold">Online</span>
                ) : (
                  'Last seen recently'
                )}{' '}
                • {selectedClinician.specialty}
              </p>
            </div>
          </div>

          {/* Call Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleStartCall(selectedClinician, 'video')}
              className="p-2.5 rounded-xl hover:bg-teal-500/15 text-teal-400 transition-all active:scale-95"
              title="Video Call"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleStartCall(selectedClinician, 'audio')}
              className="p-2.5 rounded-xl hover:bg-teal-500/15 text-teal-400 transition-all active:scale-95"
              title="Voice Call"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Messages Area ── */}
        <div
          ref={chatContainerRef}
          onScroll={handleChatScroll}
          className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-1"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.03) 0%, transparent 50%)`,
            backgroundSize: '200px 200px'
          }}
        >
          {/* Welcome message if no messages */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                <img
                  src={selectedClinician.avatar}
                  alt={selectedClinician.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <h4 className="text-base font-bold text-white mb-1">{selectedClinician.name}</h4>
              <p className="text-xs text-slate-400 mb-1">{selectedClinician.specialty}</p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed mt-2">
                Messages are encrypted end-to-end. Start a confidential telehealth consultation now.
              </p>

              {/* Quick action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {[
                  'Hello Doctor, I need a consultation',
                  'I have a question about my medication',
                  'Can we schedule a follow-up?'
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setChatDraft(q)}
                    className="px-3 py-2 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((msg, i) => {
            const isMe = msg.senderId === currentUserId;
            const dateKey = getDateKey(msg.createdAt);
            let showDateSep = false;
            if (dateKey !== previousDate) {
              showDateSep = true;
              previousDate = dateKey;
            }

            return (
              <React.Fragment key={msg.id}>
                {/* Date Separator */}
                {showDateSep && (
                  <div className="flex items-center justify-center py-3">
                    <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-[10px] text-slate-400 font-bold shadow-sm">
                      {formatDateSeparator(msg.createdAt)}
                    </span>
                  </div>
                )}

                {/* System / Call Event Messages */}
                {msg.messageType === 'system' || msg.messageType === 'call_event' ? (
                  <div className="flex items-center justify-center py-2">
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                      {msg.callType === 'video' ? (
                        <Video className="w-3.5 h-3.5 text-teal-400" />
                      ) : msg.callType === 'audio' ? (
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                      ) : null}
                      <span className="text-[11px] text-slate-400">{msg.content}</span>
                      {msg.callDurationSec && msg.callDurationSec > 0 && (
                        <span className="text-[10px] text-slate-500">• {formatCallDuration(msg.callDurationSec)}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Regular Message Bubble */
                  <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-0.5`}>
                    <div
                      className={`relative max-w-[80%] sm:max-w-[70%] px-3.5 py-2.5 shadow-sm ${
                        isMe
                          ? 'bg-teal-600 text-white rounded-2xl rounded-br-md'
                          : 'bg-slate-800 text-slate-100 border border-slate-700/50 rounded-2xl rounded-bl-md'
                      }`}
                    >
                      {/* Sender name (for received messages) */}
                      {!isMe && (
                        <p className="text-[10px] font-bold text-teal-400 mb-0.5">{msg.senderName}</p>
                      )}

                      {/* Media preview */}
                      {msg.mediaUrl && msg.messageType === 'image' && (
                        <img
                          src={msg.mediaUrl}
                          alt="Shared image"
                          className="rounded-xl mb-2 max-h-64 object-cover w-full"
                        />
                      )}

                      {/* Message text */}
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>

                      {/* Time + read receipts */}
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${isMe ? 'text-teal-200/70' : 'text-slate-500'}`}>
                        <span className="text-[9px]">{formatMessageTime(msg.createdAt)}</span>
                        {isMe && (
                          msg.isRead ? (
                            <CheckCheck className="w-3 h-3 text-sky-300" />
                          ) : msg.isDelivered ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom FAB */}
        {showScrollDown && (
          <button
            onClick={() => scrollToBottom()}
            className="absolute bottom-24 right-6 p-2.5 rounded-full bg-slate-800 border border-slate-700 text-white shadow-xl hover:bg-slate-700 transition-all z-20"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}

        {/* ── Message Input Bar ── */}
        <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-md p-2 sm:p-3">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            {/* Attachment button */}
            <button
              type="button"
              className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-teal-400 transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Text input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-colors pr-10"
                disabled={isSending}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Send / Mic button */}
            {chatDraft.trim() ? (
              <button
                type="submit"
                disabled={isSending}
                className="p-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-teal-500/20"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-colors"
                title="Voice message"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </div>
    );
  };

  // ─── MAIN LAYOUT ──────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-180px)] sm:h-[calc(100vh-140px)] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/60 shadow-2xl">
      {/* Sidebar — hidden on mobile when chat is open */}
      <div
        className={`${
          selectedClinician ? 'hidden md:flex' : 'flex'
        } w-full md:w-80 lg:w-96 flex-col border-r border-slate-800/60 shrink-0`}
      >
        {renderConversationList()}
      </div>

      {/* Chat Area — full width on mobile */}
      <div
        className={`${
          selectedClinician ? 'flex' : 'hidden md:flex'
        } flex-1 flex-col relative`}
      >
        {renderChatView()}
      </div>
    </div>
  );
};

export default ConsultationView;
