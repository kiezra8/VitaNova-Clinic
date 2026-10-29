import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  SwitchCamera,
  AlertCircle
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import {
  sendCallSignal,
  subscribeToCallSession,
  fetchCallSessionSignals,
  joinCallSignalingRoom,
  BroadcastSignal,
  updateCallLogBySession
} from '../../lib/supabase';
import {
  startRingbackTone,
  stopRingbackTone,
  playConnectedTone,
  playHangupTone
} from '../../lib/callSounds';

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  userRole?: 'doctor' | 'patient';
  memberName: string;
  callerName?: string;
  sessionId?: string;
  onEnd: () => void;
}

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    { urls: 'stun:stun.cloudflare.com:3478' }
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
  const [sessionId] = useState<string>(
    () => propSessionId || `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );
  const [myClientId] = useState<string>(
    () => `client_${Math.random().toString(36).substring(2, 9)}`
  );

  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // Video and Audio DOM Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  // WebRTC Refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream>(new MediaStream());
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const isEndedRef = useRef<boolean>(false);
  const hasSentAnswerRef = useRef<boolean>(false);
  const isPeerConnectedRef = useRef<boolean>(false);
  const handledSignalIdsRef = useRef<Set<string>>(new Set());

  // Component States
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isPeerConnected, setIsPeerConnected] = useState<boolean>(false);
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(callType === 'audio');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [duration, setDuration] = useState<number>(0);
  const durationRef = useRef<number>(0);
  durationRef.current = duration;
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const otherPersonName = userRole === 'doctor' ? (callerName || 'Patient') : clinician.name;

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Safe End Call
  const handleEndCall = useCallback(() => {
    if (isEndedRef.current) return;
    isEndedRef.current = true;

    stopRingbackTone();
    playHangupTone();

    // Update Supabase Call Log with final duration
    updateCallLogBySession(sessionId, {
      status: 'ended',
      endedAt: new Date().toISOString(),
      durationSec: durationRef.current
    }).catch(() => {});

    // Broadcast HANGUP signal to remote peer
    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: memberName,
      targetClinicianId: clinician.id,
      callType,
      sessionId,
      senderId: myClientId
    }).catch(() => {});

    // Stop local camera tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Close PeerConnection
    if (pcRef.current) {
      try {
        pcRef.current.close();
      } catch (_) {}
      pcRef.current = null;
    }

    setTimeout(() => {
      onEndRef.current();
    }, 400);
  }, [sessionId, userRole, memberName, clinician.id, callType, myClientId]);

  // ── Step 1: Start Local Camera Stream Immediately (Self-View) ──
  useEffect(() => {
    let active = true;

    const startLocalMedia = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: true,
          video: callType === 'video'
            ? {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
              }
            : false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStreamRef.current = stream;
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        console.warn('[VideoCallModal] Media access error:', err);
        if (active) {
          // If video failed, try audio only as fallback
          try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (active) {
              localStreamRef.current = audioStream;
              setLocalStream(audioStream);
              setIsCameraOff(true);
            }
          } catch (audioErr: any) {
            setCameraPermissionError(
              'Camera and microphone permissions were denied. Please allow permissions in your browser.'
            );
          }
        }
      }
    };

    startLocalMedia();

    // Start ringback tone for caller while waiting
    if (userRole === 'patient') {
      startRingbackTone();
    }

    return () => {
      active = false;
      stopRingbackTone();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [callType, userRole]);

  // Ensure local video element attaches whenever stream or swapped state changes
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
      localVideoRef.current.play().catch(() => {});
    }
  }, [localStream, isSwapped, isPeerConnected]);

  // Duration timer when peer connects
  useEffect(() => {
    if (!isPeerConnected) return;
    const timer = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPeerConnected]);

  // ── Step 2: WebRTC PeerConnection & Cross-Device Signaling ──
  useEffect(() => {
    if (!localStream) return; // Wait until local camera is ready
    let active = true;

    const pc = new RTCPeerConnection(RTC_CONFIG);
    pcRef.current = pc;

    // Attach local stream tracks to PeerConnection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Handle remote tracks
    pc.ontrack = (event) => {
      console.log('[WebRTC] ontrack received:', event.track.kind);
      if (event.streams && event.streams[0]) {
        remoteStreamRef.current = event.streams[0];
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          remoteVideoRef.current.play().catch(() => {});
        }
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
          remoteAudioRef.current.play().catch(() => {});
        }
      } else {
        remoteStreamRef.current.addTrack(event.track);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStreamRef.current;
          remoteVideoRef.current.play().catch(() => {});
        }
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStreamRef.current;
          remoteAudioRef.current.play().catch(() => {});
        }
      }

      if (!isPeerConnectedRef.current) {
        isPeerConnectedRef.current = true;
        setIsPeerConnected(true);
        stopRingbackTone();
        playConnectedTone();

        updateCallLogBySession(sessionId, {
          status: 'answered',
          answeredAt: new Date().toISOString()
        }).catch(() => {});
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('[WebRTC] ICE state:', pc.iceConnectionState);
      if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
        if (!isPeerConnectedRef.current) {
          isPeerConnectedRef.current = true;
          setIsPeerConnected(true);
          stopRingbackTone();
          playConnectedTone();
        }
      } else if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        console.warn('[WebRTC] Peer disconnected or failed');
      }
    };

    // Helper: Unified Signal Dispatcher across BroadcastChannel, Realtime Room & Supabase DB
    const bChan = new BroadcastChannel(`vitanova_webrtc_${sessionId}`);
    const realtimeRoom = joinCallSignalingRoom(sessionId, (sig) => {
      if (sig.senderId !== myClientId) {
        handleIncomingSignal(sig.type, sig.payload || sig);
      }
    });

    const sendSignal = async (signalType: string, payload: any) => {
      const envelope = {
        signalType,
        senderId: myClientId,
        fromRole: userRole,
        sessionId,
        payload
      };

      // 1. Same-device cross-tab BroadcastChannel (instant 0ms)
      try {
        bChan.postMessage(envelope);
      } catch (_) {}

      // 2. Supabase Realtime Broadcast Room (WebSocket push)
      try {
        realtimeRoom.send({
          type: signalType,
          senderId: myClientId,
          sessionId,
          role: userRole,
          ...payload
        });
      } catch (_) {}

      // 3. Supabase DB call_signals table (guaranteed cross-device persistence across mobile networks)
      try {
        await sendCallSignal({
          signalType,
          fromRole: userRole,
          callerName: memberName,
          targetClinicianId: clinician.id,
          callType,
          sessionId,
          senderId: myClientId,
          payload
        });
      } catch (_) {}
    };

    // When PeerConnection discovers local ICE candidates, send them to remote peer
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal('ICE', { candidate: event.candidate.toJSON() });
      }
    };

    // Flush any pending candidates queued before remoteDescription was set
    const flushCandidates = async () => {
      while (pendingCandidatesRef.current.length > 0) {
        const cand = pendingCandidatesRef.current.shift();
        if (cand) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(cand));
          } catch (_) {}
        }
      }
    };

    // Central Signal Processor
    const handleIncomingSignal = async (signalType: string, payload: any) => {
      if (!active || !pc || pc.signalingState === 'closed') return;
      const sId = payload?.senderId || payload?.sessionId;
      if (sId === myClientId) return; // Ignore own echoes

      console.log('[WebRTC] Received signal:', signalType);

      if (signalType === 'OFFER' && payload?.sdp) {
        if (userRole === 'doctor' && !hasSentAnswerRef.current) {
          try {
            hasSentAnswerRef.current = true;
            await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
            await flushCandidates();

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            await sendSignal('ANSWER', { sdp: answer });
          } catch (err) {
            console.warn('[WebRTC] handleOffer error:', err);
          }
        }
      } else if (signalType === 'ANSWER' && payload?.sdp) {
        if (pc.signalingState === 'have-local-offer') {
          try {
            await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
            await flushCandidates();
            if (!isPeerConnectedRef.current) {
              isPeerConnectedRef.current = true;
              setIsPeerConnected(true);
              stopRingbackTone();
              playConnectedTone();
            }
          } catch (err) {
            console.warn('[WebRTC] handleAnswer error:', err);
          }
        }
      } else if (signalType === 'ICE' && payload?.candidate) {
        if (pc.remoteDescription && pc.remoteDescription.type) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
          } catch (_) {}
        } else {
          pendingCandidatesRef.current.push(payload.candidate);
        }
      } else if (signalType === 'HANGUP' || signalType === 'DECLINE') {
        handleEndCall();
      }
    };

    // BroadcastChannel Listener
    bChan.onmessage = (event) => {
      const data = event.data;
      if (data && data.senderId !== myClientId) {
        handleIncomingSignal(data.signalType, data.payload || data);
      }
    };

    // Supabase DB Session Subscription (fires on new rows inserted with session_id)
    const unsubSession = subscribeToCallSession(sessionId, (sig) => {
      if (sig.senderId !== myClientId) {
        handleIncomingSignal(sig.signalType, sig.payload);
      }
    });

    // Caller (Patient) generates initial WebRTC OFFER
    const createAndSendOffer = async () => {
      try {
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: callType === 'video'
        });
        await pc.setLocalDescription(offer);
        await sendSignal('OFFER', { sdp: offer });
      } catch (err) {
        console.warn('[WebRTC] createOffer error:', err);
      }
    };

    if (userRole === 'patient') {
      createAndSendOffer();
    }

    // Fallback Polling Interval (vital for 4G/LTE mobile networks in Uganda)
    const pollInterval = setInterval(async () => {
      if (!active || isPeerConnectedRef.current || pc.connectionState === 'connected') {
        return;
      }
      try {
        const signals = await fetchCallSessionSignals(sessionId);
        for (const sig of signals) {
          if (sig.senderId !== myClientId) {
            handleIncomingSignal(sig.signalType, sig.payload);
          }
        }
      } catch (_) {}
    }, 1500);

    return () => {
      active = false;
      clearInterval(pollInterval);
      try { bChan.close(); } catch (_) {}
      try { realtimeRoom.leave(); } catch (_) {}
      unsubSession();
      try { pc.close(); } catch (_) {}
    };
  }, [localStream, sessionId, userRole, myClientId, callType, clinician.id, memberName, handleEndCall]);

  // Toggle Mute Microphone
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  // Toggle Camera On / Off
  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!videoTrack.enabled);
      }
    }
  };

  // Flip Camera (Front / Back on Mobile Phones)
  const flipCamera = async () => {
    if (!localStreamRef.current) return;
    const nextMode = facingMode === 'user' ? 'environment' : 'user';

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: { exact: nextMode } }
      });

      const newVideoTrack = newStream.getVideoTracks()[0];
      const oldVideoTrack = localStreamRef.current.getVideoTracks()[0];

      if (oldVideoTrack) {
        oldVideoTrack.stop();
        localStreamRef.current.removeTrack(oldVideoTrack);
      }

      localStreamRef.current.addTrack(newVideoTrack);
      setFacingMode(nextMode);

      // Replace track in PeerConnection senders
      if (pcRef.current) {
        const sender = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(newVideoTrack);
        }
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
        localVideoRef.current.play().catch(() => {});
      }
    } catch (_) {
      // Fallback without exact constraint if device only has one camera
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { facingMode: nextMode }
        });
        const newTrack = fallbackStream.getVideoTracks()[0];
        const oldTrack = localStreamRef.current.getVideoTracks()[0];
        if (oldTrack) oldTrack.stop();
        localStreamRef.current.removeTrack(oldTrack);
        localStreamRef.current.addTrack(newTrack);
        setFacingMode(nextMode);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
      } catch (err) {
        console.warn('Could not flip camera:', err);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col overflow-hidden text-white select-none">
      {/* Hidden remote audio element to ensure audio output */}
      <audio ref={remoteAudioRef} autoPlay playsInline />

      {/* ── Top Header Bar ── */}
      <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={clinician.avatar || '/ki_ezra_avatar.jpg'}
              alt={clinician.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 shadow"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                isPeerConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400 animate-ping'
              }`}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-extrabold text-white truncate">{otherPersonName}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 shrink-0">
                {callType === 'video' ? 'Video Call' : 'Voice Call'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center space-x-1.5 truncate">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Encrypted VitaNova Telehealth</span>
              {isPeerConnected && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">Connected</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Center: Live Call Timer */}
        <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
          <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            {isPeerConnected ? formatDuration(duration) : 'Calling...'}
          </span>
        </div>

        {/* Right Action: Fullscreen */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── Main Video Display Area ── */}
      <div className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Permission Error Banner if Camera was Blocked */}
        {cameraPermissionError && (
          <div className="absolute top-4 left-4 right-4 z-40 bg-rose-500/20 border border-rose-500/40 text-rose-300 p-3 rounded-2xl flex items-center space-x-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{cameraPermissionError}</span>
          </div>
        )}

        {/* ── STAGE 1: WHILE RINGING / CONNECTING ── */}
        {!isPeerConnected ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Local Camera fills the screen so the user IMMEDIATELY SEES THEMSELVES */}
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${isCameraOff ? 'hidden' : 'block'}`}
            />

            {/* If camera is disabled or audio-only, show dark backdrop */}
            {isCameraOff && (
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
            )}

            {/* Calling Overlay Card */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-slate-950/75 backdrop-blur-md rounded-3xl border border-slate-800/80 shadow-2xl max-w-xs mx-4 text-center">
              <div className="relative mb-5">
                <span className="absolute inset-0 rounded-full bg-teal-500/30 animate-ping" />
                <span className="absolute -inset-2 rounded-full bg-teal-500/15 animate-pulse" />
                <img
                  src={clinician.avatar || '/ki_ezra_avatar.jpg'}
                  alt={otherPersonName}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-teal-500 shadow-xl"
                />
              </div>

              <h3 className="text-lg font-black text-white">{otherPersonName}</h3>
              <p className="text-xs text-teal-400 font-semibold mt-0.5">{clinician.specialty}</p>

              <div className="flex items-center space-x-2 text-xs text-slate-300 mt-4 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Ringing secure line...</span>
              </div>
            </div>
          </div>
        ) : (
          /* ── STAGE 2: WHEN PEER CONNECTED (Main View + PIP Self-View) ── */
          <div className="relative w-full h-full">
            {/* Remote Peer Video (Fullscreen) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${isSwapped ? 'hidden' : 'block'}`}
            />

            {/* Self Video (Fullscreen if Swapped) */}
            {isSwapped && (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}

            {/* Floating Picture-In-Picture Thumbnail (Self-View or Swapped Remote) */}
            <div
              onClick={() => setIsSwapped(!isSwapped)}
              className="absolute top-4 right-4 z-20 w-28 h-40 sm:w-36 sm:h-52 rounded-2xl overflow-hidden border-2 border-teal-500/60 shadow-2xl bg-slate-900 cursor-pointer group transition-transform active:scale-95"
              title="Tap to swap views"
            >
              {isSwapped ? (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover pointer-events-none"
                />
              )}
              <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-bold text-white">
                {isSwapped ? otherPersonName.split(' ')[0] : 'You'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Controls Bar ── */}
      <footer className="h-24 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-center space-x-4 sm:space-x-6 shrink-0 z-30">
        {/* Mute Microphone */}
        <button
          onClick={toggleMute}
          className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
            isMuted
              ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-400'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Camera On/Off */}
        {callType === 'video' && (
          <button
            onClick={toggleCamera}
            className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
              isCameraOff
                ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-400'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
            title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
          >
            {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        {/* Flip Front/Back Camera */}
        {callType === 'video' && (
          <button
            onClick={flipCamera}
            className="w-13 h-13 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center shadow-lg transition-all active:scale-90"
            title="Switch Camera (Front/Rear)"
          >
            <SwitchCamera className="w-5 h-5" />
          </button>
        )}

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-16 h-13 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 transition-all"
          title="End Consultation"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};
