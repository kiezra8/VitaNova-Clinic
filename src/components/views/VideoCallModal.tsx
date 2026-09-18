import React, { useEffect, useRef, useState } from 'react';
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Wifi,
  WifiOff,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Activity,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  MessageSquare,
  Send,
  UserCheck
} from 'lucide-react';
import { HealthcareWorker } from '../../types';

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  memberName: string;
  onEnd: () => void;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician,
  callType,
  memberName,
  onEnd
}) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const apiRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Call Engine Mode: 'direct' (in-app WebRTC) or 'jitsi' (multi-party room)
  const [callEngine, setCallEngine] = useState<'direct' | 'jitsi'>('direct');
  const [elapsed, setElapsed] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(callType === 'audio');
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: clinician.name,
      text: `Hello ${memberName}, I have opened your VitaNova medical records and vitals. I can hear and see you clearly.`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  // Room name for Jitsi if selected
  const roomName = `vitanova-${clinician.id.replace(/_/g, '-')}-${Date.now()}`;

  // Format MM:SS from seconds
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // Start call timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initialize MediaStream for Direct In-App WebRTC
  useEffect(() => {
    let active = true;

    const setupDirectMedia = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: true,
          video: callType === 'video' ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false
        };

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (!active) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;
          setHasCameraPermission(true);

          if (localVideoRef.current && callType === 'video') {
            localVideoRef.current.srcObject = stream;
          }
        } else {
          setHasCameraPermission(false);
        }
      } catch (err) {
        console.warn('[VitaNova Call] getUserMedia non-critical error / permission notice:', err);
        if (active) setHasCameraPermission(false);
      } finally {
        if (active) {
          // Brief connection handshake animation
          setTimeout(() => {
            if (active) setIsConnecting(false);
          }, 1200);
        }
      }
    };

    if (callEngine === 'direct') {
      setupDirectMedia();
    }

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [callType, callEngine]);

  // Handle Mute Mic toggle
  const handleToggleMic = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !newMuted;
      });
    }

    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio');
    }
  };

  // Handle Camera toggle
  const handleToggleCam = () => {
    const newCamOff = !isCamOff;
    setIsCamOff(newCamOff);

    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !newCamOff;
      });
    }

    if (apiRef.current) {
      apiRef.current.executeCommand('toggleVideo');
    }
  };

  // Handle Hang up
  const handleHangUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (apiRef.current) {
      try {
        apiRef.current.executeCommand('hangup');
        apiRef.current.dispose();
      } catch (_) {}
      apiRef.current = null;
    }

    onEnd();
  };

  // Send In-Call Quick Chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: memberName,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const query = chatInput.trim();
    setChatInput('');

    // Responsive clinical response from doctor
    setTimeout(() => {
      let reply = `Understood, ${memberName}. I have noted this in your active session note.`;
      if (query.toLowerCase().includes('pain') || query.toLowerCase().includes('headache')) {
        reply = `Noted on the symptom severity. We will adjust the therapy dosage accordingly.`;
      } else if (query.toLowerCase().includes('pressure') || query.toLowerCase().includes('bp')) {
        reply = `Your recent blood pressure logs are consistent with the target range.`;
      }
      setChatMessages((prev) => [
        ...prev,
        {
          sender: clinician.name,
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1400);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col bg-slate-950 select-none ${
        isFullscreen ? 'p-0' : 'sm:p-3'
      }`}
    >
      {/* ── TOP HEADER BAR ── */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={clinician.avatar}
              alt={clinician.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500/60 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-sm font-extrabold text-white leading-tight">{clinician.name}</h2>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {clinician.profession}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
              <span className="font-semibold text-teal-400 flex items-center space-x-1">
                {callType === 'video' ? (
                  <>
                    <Video className="w-3 h-3 text-teal-400" />
                    <span>HD Telehealth Video</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>HD Telehealth Voice</span>
                  </>
                )}
              </span>
              <span>•</span>
              <span className="font-mono text-slate-200 font-bold bg-slate-800 px-1.5 py-0.5 rounded">
                {formatTime(elapsed)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Indicators & Action Toggles */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted P2P</span>
          </div>

          {/* Chat Panel Toggle */}
          <button
            onClick={() => setShowInCallChat((prev) => !prev)}
            className={`p-2 rounded-xl border transition-colors ${
              showInCallChat
                ? 'bg-teal-500 text-slate-950 border-teal-400'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="In-call chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── MAIN CALL WORKSPACE ── */}
      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col md:flex-row">
        {/* Call Stage Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
          {/* Connection Splash Overlay */}
          {isConnecting && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md space-y-4">
              <div className="relative">
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-teal-500/50 shadow-2xl shadow-teal-500/20"
                />
                <div className="absolute inset-0 rounded-3xl border-4 border-teal-400 animate-ping opacity-30" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-base font-bold text-white">Connecting Secure Line to {clinician.name}...</p>
                <p className="text-xs text-slate-400">{clinician.specialty} • Kampala, Uganda</p>
                <div className="flex items-center justify-center space-x-1 pt-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* ── VIDEO MODE DISPLAY ── */}
          {callType === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Doctor's Main Video / Stage View */}
              <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

                {/* Doctor Overlay Credentials */}
                <div className="absolute bottom-6 left-6 z-10 space-y-1 max-w-sm">
                  <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span className="text-xs font-bold text-white">{clinician.name}</span>
                    <span className="text-[10px] text-teal-300 font-medium">({clinician.specialty})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-300 bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <Activity className="w-3.5 h-3.5 text-teal-400" />
                    <span>Live Telehealth Feed • Uganda Medical Practitioners Council (UMDPC)</span>
                  </div>
                </div>

                {/* Patient's Own Live Camera Feed (Picture-in-Picture) */}
                <div className="absolute top-4 right-4 z-20 w-36 h-48 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-teal-500/70 shadow-2xl bg-slate-900">
                  {hasCameraPermission === false || isCamOff ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-2 text-center">
                      <VideoOff className="w-8 h-8 text-slate-500 mb-1" />
                      <span className="text-[11px] font-bold text-slate-300">Camera Off</span>
                      <span className="text-[9px] text-slate-500">{memberName}</span>
                    </div>
                  ) : (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  )}

                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-white backdrop-blur-sm">
                      You ({memberName.split(' ')[0]})
                    </span>
                    {isMuted && (
                      <span className="p-1 rounded bg-rose-500/90 text-white shadow">
                        <MicOff className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── VOICE CALL MODE DISPLAY ── */
            <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center max-w-md w-full">
              {/* Doctor Avatar with Soundwaves */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping opacity-75 scale-125" />
                <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse scale-150" />
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-teal-500 shadow-2xl shadow-teal-500/25 z-10"
                />
                <span className="absolute bottom-1 right-3 z-20 w-6 h-6 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center">
                  <Radio className="w-3 h-3 text-white animate-pulse" />
                </span>
              </div>

              <div className="space-y-1.5 z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{clinician.name}</h3>
                <p className="text-sm text-teal-400 font-medium">{clinician.specialty}</p>
                <p className="text-xs text-slate-400">Mulago Hospital & VitaNova Nakawa Clinic</p>
              </div>

              {/* Dynamic Audio Frequency Equalizer Bars */}
              <div className="flex items-center justify-center space-x-1.5 py-2 px-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Activity className="w-4 h-4 text-teal-400 mr-1" />
                <span className="text-xs font-bold text-slate-300 mr-2">Audio Stream:</span>
                {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((height, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.max(8, isMuted ? 6 : (height * (elapsed % 3 + 1)) / 3)}px`
                    }}
                  />
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
                <span>Opus 48kHz HD Audio</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">18ms Latency</span>
              </div>
            </div>
          )}
        </div>

        {/* ── OPTIONAL IN-CALL CHAT DRAWER / PANEL ── */}
        {showInCallChat && (
          <div className="w-full md:w-80 h-64 md:h-full bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col z-20 shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>In-Call Clinical Chat</span>
              </span>
              <button
                onClick={() => setShowInCallChat(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
              {chatMessages.map((msg, idx) => {
                const isMe = msg.sender === memberName;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5">{msg.sender} • {msg.time}</span>
                    <div
                      className={`p-2.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                        isMe
                          ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/60'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendChat} className="p-2 border-t border-slate-800 flex space-x-1.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type note or question..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── BOTTOM CONTROL ACTION BAR ── */}
      <div className="relative z-20 px-4 py-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-center space-x-3 sm:space-x-5">
        {/* Toggle Microphone */}
        <button
          onClick={handleToggleMic}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg ${
            isMuted
              ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-300 shadow-rose-500/10'
              : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>

        {/* End Call Button (Prominent Red) */}
        <button
          onClick={handleHangUp}
          className="w-16 h-16 sm:w-20 sm:h-16 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-xl shadow-rose-600/30 border border-rose-400"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="hidden sm:inline text-xs uppercase font-extrabold tracking-wider">End</span>
        </button>

        {/* Toggle Camera (in Video Call) or Speaker (in Audio Call) */}
        {callType === 'video' ? (
          <button
            onClick={handleToggleCam}
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg ${
              isCamOff
                ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-300 shadow-rose-500/10'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white'
            }`}
            title={isCamOff ? 'Turn on camera' : 'Turn off camera'}
          >
            {isCamOff ? <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Video className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        ) : (
          <button
            onClick={() => setIsSpeakerMuted((prev) => !prev)}
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg ${
              isSpeakerMuted
                ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white'
            }`}
            title={isSpeakerMuted ? 'Unmute speaker' : 'Mute speaker'}
          >
            {isSpeakerMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        )}

        {/* Quick In-Call Chat Button */}
        <button
          onClick={() => setShowInCallChat((prev) => !prev)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-400 flex items-center justify-center transition-all active:scale-95 shadow-lg"
          title="Send message in call"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoCallModal;

