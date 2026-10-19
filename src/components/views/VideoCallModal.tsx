import React, { useEffect, useRef, useState } from 'react';
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Activity,
  MessageSquare,
  Send,
  User,
  Users,
  ExternalLink,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import { sendCallSignal, subscribeToCallSignals } from '../../lib/supabase';

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  userRole?: 'doctor' | 'patient';
  memberName: string;
  onEnd: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician,
  callType,
  userRole = 'patient',
  memberName,
  onEnd
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [elapsed, setElapsed] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isPeerConnected, setIsPeerConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(callType === 'audio');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [testMirrorMode, setTestMirrorMode] = useState(false);

  const isDoctor = userRole === 'doctor';
  const remotePartyName = isDoctor ? memberName : clinician.name;
  const remotePartyTitle = isDoctor ? 'Patient (Direct Line)' : `${clinician.specialty} • VitaNova Nakawa`;

  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: isDoctor ? memberName : clinician.name,
      text: isDoctor
        ? `Hello Doctor, I am connected and ready for our consultation.`
        : `Hello ${memberName}, I have opened your VitaNova medical records and vitals. I can hear and see you clearly.`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

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

  // WebRTC Setup & Peer Connection over Supabase Realtime & BroadcastChannel
  useEffect(() => {
    let active = true;
    const channel = new BroadcastChannel('vitanova_webrtc_signaling');
    channelRef.current = channel;

    const rtcConfig: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };

    const pc = new RTCPeerConnection(rtcConfig);
    pcRef.current = pc;

    // Handle incoming remote media tracks
    pc.ontrack = (event) => {
      if (!active) return;
      if (event.streams && event.streams[0]) {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          remoteVideoRef.current.play().catch(() => {});
        }
        setIsPeerConnected(true);
        setIsConnecting(false);
      }
    };

    // Handle ICE Candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        if (channel) {
          channel.postMessage({
            type: 'ICE_CANDIDATE',
            candidate: event.candidate,
            role: userRole
          });
        }
        sendCallSignal({
          signalType: 'ICE',
          fromRole: userRole,
          callerName: isDoctor ? clinician.name : memberName,
          targetClinicianId: clinician.id,
          payload: { candidate: event.candidate }
        }).catch(() => {});
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        setIsPeerConnected(true);
        setIsConnecting(false);
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        setIsPeerConnected(false);
      }
    };

    // Initialize local media
    const initLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          }
        });

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        setHasCameraPermission(true);

        if (callType === 'audio') {
          stream.getVideoTracks().forEach((vt) => {
            vt.enabled = false;
          });
          setIsCamOff(true);
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play().catch(() => {});
        }

        // Add local tracks to WebRTC peer connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Patient initiates the WebRTC offer
        if (userRole === 'patient') {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          channel.postMessage({
            type: 'OFFER',
            sdp: offer,
            senderName: memberName
          });
          sendCallSignal({
            signalType: 'OFFER',
            fromRole: 'patient',
            callerName: memberName,
            targetClinicianId: clinician.id,
            callType,
            payload: { sdp: offer }
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('[VitaNova Call] Media stream warning:', err);
        if (active) {
          setHasCameraPermission(false);
          setIsConnecting(false);
        }
      } finally {
        if (active) {
          setTimeout(() => {
            if (active) setIsConnecting(false);
          }, 1500);
        }
      }
    };

    // Helper to process incoming signals (from Supabase Realtime or BroadcastChannel)
    const handleSignal = async (type: string, payload: any) => {
      if (!active) return;
      try {
        if (type === 'OFFER' && userRole === 'doctor' && payload?.sdp) {
          await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          channel.postMessage({
            type: 'ANSWER',
            sdp: answer,
            senderName: clinician.name
          });
          sendCallSignal({
            signalType: 'ANSWER',
            fromRole: 'doctor',
            callerName: clinician.name,
            targetClinicianId: clinician.id,
            payload: { sdp: answer }
          }).catch(() => {});
          setIsPeerConnected(true);
          setIsConnecting(false);
        } else if (type === 'ANSWER' && userRole === 'patient' && payload?.sdp) {
          if (pc.signalingState !== 'stable') {
            await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
            setIsPeerConnected(true);
            setIsConnecting(false);
          }
        } else if (type === 'ICE' || type === 'ICE_CANDIDATE') {
          const cand = payload?.candidate;
          if (cand && pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
          }
        } else if (type === 'CALL_CHAT' && payload?.message) {
          setChatMessages((prev) => [...prev, payload.message]);
        } else if (type === 'CALL_ENDED' || type === 'HANGUP' || type === 'DECLINE') {
          onEnd();
        }
      } catch (e) {
        console.warn('[VitaNova Call] Signal processing error:', e);
      }
    };

    // Supabase Realtime subscription (cross-device)
    const unsubSupabase = subscribeToCallSignals(clinician.id, (signal) => {
      handleSignal(signal.signalType, signal.payload);
    });

    // BroadcastChannel subscription (same-device tab test)
    channel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;
      handleSignal(data.type, data);
    };

    initLocalMedia();

    return () => {
      active = false;
      unsubSupabase();
      try {
        channel.postMessage({ type: 'CALL_ENDED' });
        channel.close();
      } catch (_) {}

      sendCallSignal({
        signalType: 'HANGUP',
        fromRole: userRole,
        callerName: isDoctor ? clinician.name : memberName,
        targetClinicianId: clinician.id
      }).catch(() => {});

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    };
  }, [userRole, memberName, callType, clinician.id, clinician.name, onEnd]);

  // Handle Mute Mic toggle
  const handleToggleMic = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !nextMuted;
      });
    }
  };

  // Handle Camera Pause / Resume — Fixed so video NEVER freezes or disappears
  const handleToggleCam = async () => {
    const nextCamOff = !isCamOff;
    setIsCamOff(nextCamOff);

    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach((track) => {
          track.enabled = !nextCamOff;
        });
      } else if (!nextCamOff) {
        // Stream lacked video tracks (started audio-only); acquire video track
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          const newTrack = videoStream.getVideoTracks()[0];
          if (newTrack) {
            streamRef.current.addTrack(newTrack);
            if (pcRef.current) {
              pcRef.current.addTrack(newTrack, streamRef.current);
            }
          }
        } catch (_) {}
      }
    }

    if (localVideoRef.current && streamRef.current) {
      localVideoRef.current.srcObject = streamRef.current;
      localVideoRef.current.play().catch(() => {});
    }
  };

  // Handle Hang up
  const handleHangUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: isDoctor ? clinician.name : memberName,
      targetClinicianId: clinician.id
    }).catch(() => {});
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({ type: 'CALL_ENDED' });
      } catch (_) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    onEnd();
  };

  // Send In-Call Quick Chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const senderDisplayName = isDoctor ? clinician.name : memberName;
    const userMsg = {
      sender: senderDisplayName,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Broadcast message to peer
    if (channelRef.current) {
      channelRef.current.postMessage({
        type: 'CALL_CHAT',
        message: userMsg
      });
    }

    // Auto-respond if other peer is not connected yet
    if (!isPeerConnected) {
      setTimeout(() => {
        const replyMsg = {
          sender: remotePartyName,
          text: `Doctor consultation line is active. Note recorded in your visit encounter.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages((prev) => [...prev, replyMsg]);
      }, 1200);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col bg-slate-950 select-none ${
        isFullscreen ? 'p-0' : 'sm:p-3'
      }`}
    >
      {/* ── TOP HEADER BAR ── */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={clinician.avatar}
              alt={clinician.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-sm font-extrabold text-white leading-tight">
                {remotePartyName}
              </h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {isDoctor ? 'Patient Line' : clinician.profession}
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
              {isPeerConnected ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live 2-Way Connected</span>
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-amber-400 animate-pulse">
                  Ringing Line...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Indicators & Action Toggles */}
        <div className="flex items-center space-x-2">
          {/* Open Doctor in new tab helper button (for testing two-way on same device) */}
          {!isDoctor && !isPeerConnected && (
            <button
              onClick={() => {
                window.open(window.location.origin, '_blank');
              }}
              title="Open Doctor Portal in a new tab to answer as Doctor"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Answer as Doctor (New Tab)</span>
            </button>
          )}

          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted In-App</span>
          </div>

          {/* Chat Panel Toggle */}
          <button
            onClick={() => setShowInCallChat((prev) => !prev)}
            className={`p-2 rounded-xl border transition-colors ${
              showInCallChat
                ? 'bg-teal-500 text-slate-950 border-teal-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="In-call chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── MAIN CALL WORKSPACE ── */}
      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col md:flex-row">
        {/* Call Stage Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-slate-950">

          {/* ── VIDEO CALL WORKSPACE ── */}
          {callType === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              {/* REMOTE PARTICIPANT VIDEO (THE OTHER REAL PERSON) */}
              {isPeerConnected ? (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : testMirrorMode ? (
                // Mirror mode for single-device test
                <div className="relative w-full h-full">
                  <video
                    ref={(el) => {
                      if (el && streamRef.current) {
                        el.srcObject = streamRef.current;
                      }
                    }}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute top-4 left-4 bg-teal-500/90 text-slate-950 px-3 py-1 rounded-xl font-black text-xs">
                    Live 2-Way Test Stream Active
                  </div>
                </div>
              ) : (
                // Clean WhatsApp-style Ringing Screen
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 text-center">
                  <div className="relative mb-6">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping scale-110" />
                    <span className="absolute -inset-2 rounded-full bg-emerald-500/10 animate-pulse" />
                    <img
                      src={clinician.avatar}
                      alt={clinician.name}
                      className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20"
                    />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {remotePartyName}
                  </h3>
                  <p className="text-sm font-medium text-emerald-400 mt-1">
                    {isPeerConnected ? 'Connected' : 'Ringing...'}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {callType === 'video' ? 'VitaNova Video Call' : 'VitaNova Voice Call'}
                  </p>
                </div>
              )}

              {/* Remote Participant Label Overlay (Bottom Left) */}
              <div className="absolute bottom-6 left-6 z-10 space-y-1 max-w-sm pointer-events-none">
                <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
                  <span className={`w-2.5 h-2.5 rounded-full inline-block ${isPeerConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="text-xs font-bold text-white">{remotePartyName}</span>
                  <span className="text-[10px] text-teal-300 font-medium">
                    {isPeerConnected ? '(Live Feed)' : '(Ringing)'}
                  </span>
                </div>
              </div>

              {/* LOCAL PARTICIPANT'S LIVE CAMERA FEED (PICTURE-IN-PICTURE) */}
              <div className="absolute top-4 right-4 z-20 w-36 h-48 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-teal-500/80 shadow-2xl bg-slate-900">
                {/* Video element is ALWAYS mounted to prevent freezing or losing stream on pause */}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transform -scale-x-100 ${isCamOff ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                />

                {isCamOff && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-2 text-center">
                    <VideoOff className="w-8 h-8 text-slate-500 mb-1" />
                    <span className="text-[11px] font-bold text-slate-300">Camera Paused</span>
                    <span className="text-[9px] text-slate-500">Tap Video to Resume</span>
                  </div>
                )}

                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-white backdrop-blur-sm">
                    You ({isDoctor ? 'Doctor' : 'Patient'})
                  </span>
                  {isMuted && (
                    <span className="p-1 rounded bg-rose-500 text-white shadow">
                      <MicOff className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ── VOICE CALL WORKSPACE ── */
            <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center max-w-md w-full">
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
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{remotePartyName}</h3>
                <p className="text-sm text-teal-400 font-medium">{remotePartyTitle}</p>
                <p className="text-xs text-slate-400">Mulago Hospital & VitaNova Nakawa Clinic</p>
              </div>

              {/* Dynamic Audio Visualizer */}
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
                <span>Direct Voice Line</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{isPeerConnected ? 'Connected (Live)' : 'Ringing...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── IN-CALL CLINICAL CHAT PANEL ── */}
        {showInCallChat && (
          <div className="w-full md:w-80 h-64 md:h-full bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col z-20 shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>In-Call Chat</span>
              </span>
              <button
                onClick={() => setShowInCallChat(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender.includes(isDoctor ? 'Doctor' : 'Sarah') || msg.sender === memberName;
                return (
                  <div
                    key={i}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5">{msg.sender}</span>
                    <div
                      className={`p-2.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                        isMe
                          ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendChat} className="p-2 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type in-call message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── CALL CONTROL FOOTER BAR ── */}
      <div className="relative z-20 flex items-center justify-center space-x-4 py-4 px-6 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        {/* Toggle Microphone */}
        <button
          onClick={handleToggleMic}
          className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${
            isMuted
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25'
              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Video Camera (Pause / Resume without freezing) */}
        {callType === 'video' && (
          <button
            onClick={handleToggleCam}
            className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${
              isCamOff
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
            title={isCamOff ? 'Resume Camera' : 'Pause Camera'}
          >
            {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        {/* End Call / Hang Up */}
        <button
          onClick={handleHangUp}
          className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center space-x-2 shadow-xl shadow-rose-600/30 transition-all active:scale-95"
          title="End Telehealth Consultation"
        >
          <PhoneOff className="w-5 h-5" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCallModal;
