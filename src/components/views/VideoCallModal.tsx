import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  PhoneOff,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  SwitchCamera,
  ShieldCheck,
  User,
  Volume2
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import {
  sendCallSignal,
  subscribeToCallSession,
  fetchCallSessionSignals,
  updateCallLogBySession
} from '../../lib/supabase';
import { startRingbackTone, stopRingbackTone, playHangupTone } from '../../lib/callSounds';

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  userRole?: 'doctor' | 'patient';
  memberName: string;
  callerName?: string;
  sessionId?: string;
  onEnd: () => void;
}

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ],
  iceCandidatePoolSize: 10
};

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician,
  callType,
  userRole = 'patient',
  memberName,
  callerName,
  sessionId: propSessionId,
  onEnd
}) => {
  const [sessionId] = useState(() => propSessionId || `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const myClientId = useRef(`cli_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`).current;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const bcRef = useRef<BroadcastChannel | null>(null);

  const hasRemoteDescRef = useRef(false);
  const queuedCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const pendingOfferRef = useRef<any>(null);
  const pendingAnswerRef = useRef<any>(null);
  const endedRef = useRef(false);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const [callState, setCallState] = useState<'initiating' | 'ringing' | 'connected' | 'ended'>('initiating');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(callType === 'audio');
  const [durationSec, setDurationSec] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isCaller = userRole === 'patient';
  const remoteDisplayName = userRole === 'doctor' ? (callerName || 'Patient') : clinician.name;

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  // End Call Handler
  const endCall = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;

    stopRingbackTone();
    playHangupTone();
    setCallState('ended');

    // Notify remote party
    try {
      bcRef.current?.postMessage({
        signalType: 'HANGUP',
        fromRole: userRole,
        callerName: memberName,
        sessionId,
        senderId: myClientId
      });
    } catch (_) {}

    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: memberName,
      targetClinicianId: clinician.id,
      callType,
      sessionId,
      senderId: myClientId
    }).catch(() => {});

    updateCallLogBySession(sessionId, {
      status: 'ended',
      endedAt: new Date().toISOString(),
      durationSec
    }).catch(() => {});

    // Clean up media tracks & peer connection
    try {
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    } catch (_) {}

    try {
      pcRef.current?.close();
      pcRef.current = null;
    } catch (_) {}

    try {
      bcRef.current?.close();
      bcRef.current = null;
    } catch (_) {}

    setTimeout(() => onEndRef.current(), 300);
  }, [sessionId, userRole, memberName, clinician.id, callType, durationSec, myClientId]);

  // Send signaling messages across both BroadcastChannel and Supabase Realtime
  const sendSignal = useCallback(
    async (type: string, data?: any) => {
      if (endedRef.current) return;
      const payload = {
        ...data,
        senderClientId: myClientId,
        fromRole: userRole,
        toRole: userRole === 'doctor' ? 'patient' : 'doctor',
        sessionId
      };

      // 1. Instant local BroadcastChannel (same browser tab-to-tab, 0ms latency)
      try {
        bcRef.current?.postMessage({
          signalType: type,
          fromRole: userRole,
          callerName: memberName,
          sessionId,
          senderId: myClientId,
          payload
        });
      } catch (_) {}

      // 2. Supabase DB + Realtime (cross-device/network)
      try {
        await sendCallSignal({
          signalType: type,
          fromRole: userRole,
          callerName: memberName,
          targetClinicianId: clinician.id,
          callType,
          sessionId,
          senderId: myClientId,
          payload
        });
      } catch (_) {}
    },
    [myClientId, userRole, sessionId, memberName, clinician.id, callType]
  );

  // Process incoming signal with strict anti-loopback filtering
  const handleSignal = useCallback(
    async (sig: any) => {
      if (endedRef.current) return;

      const p = sig.payload || {};
      const senderId = sig.senderId || p.senderClientId;
      const fromRole = sig.fromRole || p.fromRole;
      const sigSessionId = sig.sessionId || p.sessionId;

      // 1. NEVER accept signals from our own client instance (prevents self-connecting!)
      if (senderId && senderId === myClientId) return;

      // 2. NEVER accept signals from the same role (doctor ignores doctor, patient ignores patient)
      if (fromRole && fromRole === userRole) return;

      // 3. ONLY accept signals intended for this active call session
      if (sigSessionId && sigSessionId !== sessionId) return;

      if (sig.signalType === 'HANGUP' || sig.signalType === 'DECLINE') {
        endCall();
        return;
      }

      const pc = pcRef.current;

      // ── PATIENT is Offerer, DOCTOR is Answerer ──
      if (sig.signalType === 'READY_FOR_OFFER' && userRole === 'patient') {
        if (pc?.localDescription) {
          sendSignal('OFFER', {
            sdp: { type: pc.localDescription.type, sdp: pc.localDescription.sdp }
          });
        }
      }

      if (sig.signalType === 'OFFER' && userRole === 'doctor') {
        if (!pc) {
          pendingOfferRef.current = p.sdp;
          return;
        }
        if (hasRemoteDescRef.current && pc.signalingState === 'stable') return;

        // Doctor receives Patient's Offer
        try {
          if (pc.signalingState !== 'stable') {
            await pc.setLocalDescription({ type: 'rollback' } as any).catch(() => {});
          }

          const offerDesc = new RTCSessionDescription(p.sdp);
          await pc.setRemoteDescription(offerDesc);
          hasRemoteDescRef.current = true;

          // Flush queued candidates
          for (const cand of queuedCandidatesRef.current) {
            await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
          }
          queuedCandidatesRef.current = [];

          // Create & send ANSWER
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          sendSignal('ANSWER', {
            sdp: { type: answer.type, sdp: answer.sdp }
          });

          setCallState('connected');
          stopRingbackTone();
        } catch (err) {
          console.error('[VitaNova WebRTC] Offer processing error:', err);
        }
      }

      if (sig.signalType === 'ANSWER' && userRole === 'patient') {
        if (!pc) {
          pendingAnswerRef.current = p.sdp;
          return;
        }

        // Patient receives Doctor's Answer
        try {
          if (pc.signalingState === 'have-local-offer') {
            const answerDesc = new RTCSessionDescription(p.sdp);
            await pc.setRemoteDescription(answerDesc);
            hasRemoteDescRef.current = true;

            // Flush queued candidates
            for (const cand of queuedCandidatesRef.current) {
              await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
            }
            queuedCandidatesRef.current = [];

            setCallState('connected');
            stopRingbackTone();
          }
        } catch (err) {
          console.error('[VitaNova WebRTC] Answer processing error:', err);
        }
      }

      if (sig.signalType === 'ICE') {
        if (p.candidate) {
          if (pc && hasRemoteDescRef.current && pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(p.candidate)).catch(() => {});
          } else {
            queuedCandidatesRef.current.push(p.candidate);
          }
        }
      }
    },
    [myClientId, userRole, sessionId, endCall, sendSignal]
  );

  // Initialize WebRTC & Media
  useEffect(() => {
    let alive = true;
    endedRef.current = false;

    // Start caller ringback tone
    if (isCaller) {
      setCallState('ringing');
      startRingbackTone();
    } else {
      setCallState('initiating');
    }

    // Set up BroadcastChannel
    try {
      const bc = new BroadcastChannel(`vitanova_rtc_${sessionId}`);
      bc.onmessage = (e) => {
        if (alive && e.data) handleSignal(e.data);
      };
      bcRef.current = bc;
    } catch (_) {}

    // Set up Supabase Realtime subscription for this session
    const unsubSupabase = subscribeToCallSession(sessionId, (sig) => {
      if (alive) handleSignal(sig);
    });

    // Start WebRTC initialization
    (async () => {
      try {
        // 1. Acquire Camera & Mic
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video' ? { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } } : false,
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });

        if (!alive) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStreamRef.current = stream;

        // Attach local preview (muted to avoid local feedback)
        if (localVideoRef.current && callType === 'video') {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.muted = true;
          localVideoRef.current.play().catch(() => {});
        }

        // 2. Create RTCPeerConnection
        const pc = new RTCPeerConnection(ICE_SERVERS);
        pcRef.current = pc;

        // Add local tracks to PeerConnection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Handle incoming remote tracks (attach to remote video element)
        pc.ontrack = (event) => {
          if (!alive) return;
          const [remoteStream] = event.streams;
          if (remoteStream) {
            remoteStreamRef.current = remoteStream;
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.muted = false;
              remoteVideoRef.current.play().catch(() => {});
            }
          }
          setCallState('connected');
          stopRingbackTone();
        };

        // Send local ICE candidates to peer
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            sendSignal('ICE', { candidate: event.candidate.toJSON() });
          }
        };

        pc.onconnectionstatechange = () => {
          if (pc.connectionState === 'connected') {
            setCallState('connected');
            stopRingbackTone();
            updateCallLogBySession(sessionId, {
              status: 'answered',
              answeredAt: new Date().toISOString()
            }).catch(() => {});
          } else if (pc.connectionState === 'failed') {
            console.warn('[VitaNova WebRTC] Peer connection failed, attempting restart...');
            pc.restartIce();
          }
        };

        // 3. Patient initiates OFFER; Doctor signals READY_FOR_OFFER
        if (userRole === 'patient') {
          const offer = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: callType === 'video'
          });
          await pc.setLocalDescription(offer);
          await sendSignal('OFFER', {
            sdp: { type: offer.type, sdp: offer.sdp }
          });

          if (pendingAnswerRef.current) {
            const sdp = pendingAnswerRef.current;
            pendingAnswerRef.current = null;
            await handleSignal({ signalType: 'ANSWER', payload: { sdp } });
          }
        } else {
          // Doctor tells patient "I am open and ready for your offer"
          await sendSignal('READY_FOR_OFFER');

          if (pendingOfferRef.current) {
            const sdp = pendingOfferRef.current;
            pendingOfferRef.current = null;
            await handleSignal({ signalType: 'OFFER', payload: { sdp } });
          } else {
            // Check if patient already posted an OFFER in Supabase
            const existing = await fetchCallSessionSignals(sessionId);
            for (const s of existing) {
              if (s.signalType === 'OFFER' && s.fromRole === 'patient') {
                await handleSignal(s);
                break;
              }
            }
          }
        }
      } catch (err: any) {
        if (!alive) return;
        console.error('[VitaNova WebRTC] Init error:', err);
        setErrorMessage(
          err?.name === 'NotAllowedError'
            ? 'Camera / Microphone permission denied. Please allow camera and mic permissions in browser settings.'
            : (err?.message || 'Failed to start call')
        );
      }
    })();

    // Polling fallback to guarantee signals are never dropped on cellular networks
    const pollInterval = setInterval(async () => {
      if (!alive || endedRef.current || callState === 'connected') return;
      try {
        const signals = await fetchCallSessionSignals(sessionId);
        for (const s of signals) {
          handleSignal(s);
        }
      } catch (_) {}
    }, 1500);

    return () => {
      alive = false;
      clearInterval(pollInterval);
      stopRingbackTone();
      unsubSupabase();
      try {
        bcRef.current?.close();
      } catch (_) {}
    };
  }, [sessionId, callType, userRole, isCaller, sendSignal, handleSignal, facingMode]);

  // Duration Timer
  useEffect(() => {
    if (callState !== 'connected') return;
    const t = setInterval(() => setDurationSec((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  // Toggle Mute Audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  // Toggle Video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
      }
    }
  };

  // Switch Camera (Mobile)
  const flipCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="fixed inset-0 z-[10002] bg-slate-950 flex flex-col overflow-hidden select-none animate-in fade-in duration-200">
      {/* ── TOP HEADER BAR ── */}
      <div className="h-14 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 border-b border-white/10">
        <div className="flex items-center space-x-2.5 min-w-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white truncate">
              {remoteDisplayName}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center space-x-1">
              <span>{callType === 'video' ? 'Video Consultation' : 'Voice Call'}</span>
              <span>•</span>
              <span className={callState === 'connected' ? 'text-emerald-400 font-bold' : 'text-amber-400 animate-pulse'}>
                {callState === 'connected' ? fmt(durationSec) : (callState === 'ringing' ? 'Ringing...' : 'Connecting...')}
              </span>
            </span>
          </div>
        </div>

        {/* Top Hangup / Exit button */}
        <button
          onClick={endCall}
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-rose-600/30 transition-all"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>End</span>
        </button>
      </div>

      {/* ── MAIN STAGE ── */}
      <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* Remote Video (Full Screen) */}
        {callType === 'video' && (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              callState === 'connected' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Audio-only Call OR Waiting / Connecting State Display */}
        {(callType === 'audio' || callState !== 'connected') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            {/* Avatar Pulse */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-6">
              <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <span className="absolute inset-2 rounded-full bg-emerald-500/10 animate-pulse" />
              <img
                src={clinician.avatar || '/ki_ezra_avatar.jpg'}
                alt={remoteDisplayName}
                className="relative w-full h-full rounded-full object-cover border-4 border-emerald-500/40 shadow-2xl"
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {remoteDisplayName}
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {callState === 'connected'
                  ? `In Call • ${fmt(durationSec)}`
                  : (callState === 'ringing' ? 'Calling doctor... Ringing' : 'Connecting secure line...')}
              </span>
            </p>

            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
              End-to-end encrypted direct healthcare consultation
            </p>
          </div>
        )}

        {/* Local Video Thumbnail (Picture-in-Picture) */}
        {callType === 'video' && !isVideoMuted && (
          <div className="absolute top-4 right-4 z-20 w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
              You
            </span>
          </div>
        )}

        {/* Error Overlay */}
        {errorMessage && (
          <div className="absolute inset-0 z-40 bg-black/90 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-sm text-rose-400 font-bold mb-1">Call Error</p>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed mb-4">{errorMessage}</p>
            <button
              onClick={endCall}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
            >
              Close Call
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CONTROL BAR ── */}
      <div className="h-20 bg-slate-900/95 backdrop-blur-md px-6 flex items-center justify-center space-x-5 shrink-0 z-30 border-t border-white/10">
        {/* Toggle Audio */}
        <button
          onClick={toggleAudio}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
            isAudioMuted
              ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
          title={isAudioMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Video (only for video calls) */}
        {callType === 'video' && (
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isVideoMuted
                ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title={isVideoMuted ? 'Turn Camera On' : 'Turn Camera Off'}
          >
            {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
          </button>
        )}

        {/* Flip Camera (Mobile Video) */}
        {callType === 'video' && (
          <button
            onClick={flipCamera}
            className="w-12 h-12 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center transition-all active:scale-95"
            title="Switch Camera"
          >
            <SwitchCamera className="w-5 h-5" />
          </button>
        )}

        {/* End Call Button */}
        <button
          onClick={endCall}
          className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 flex items-center justify-center text-white shadow-xl shadow-rose-600/40 transition-all"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
