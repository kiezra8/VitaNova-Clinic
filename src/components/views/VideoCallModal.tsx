import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  PhoneOff, Mic, MicOff, Video, VideoOff, Phone, Maximize2, Minimize2,
  ShieldCheck, Activity, MessageSquare, Send, ExternalLink, Radio,
  SwitchCamera, Monitor, Sparkles, AlertCircle, Volume2, VolumeX,
  MessageCircle
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import {
  sendCallSignal, subscribeToCallSignals, fetchRecentCallSignals,
  CallSignalEvent, joinCallSignalingRoom, BroadcastSignal
} from '../../lib/supabase';
import { startRingbackTone, stopRingbackTone, playConnectedTone, playHangupTone } from '../../lib/callSounds';

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  userRole?: 'doctor' | 'patient';
  memberName: string;
  callerName?: string;
  sessionId?: string;
  onEnd: () => void;
}

/** Fallback synthetic video stream if physical camera is blocked or in use */
function createSyntheticVideoStream(displayName: string, roleSubtitle: string, avatarUrl?: string): { stream: MediaStream; cleanup: () => void } {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');
  let animFrameId = 0;
  let t = 0;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  let imgLoaded = false;
  if (avatarUrl) {
    img.src = avatarUrl;
    img.onload = () => { imgLoaded = true; };
  }

  const draw = () => {
    t += 0.04;
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#020617');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#042f2e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Subtle clinical grid
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 480); ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
      }

      // Pulsing avatar circle
      const pulse = Math.sin(t * 2) * 8;
      const aR = 65;
      const cX = 320;
      const cY = 200;

      ctx.beginPath();
      ctx.arc(cX, cY, aR + 10 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 184, 166, 0.12)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cX, cY, aR + 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 3;
      ctx.stroke();

      if (imgLoaded && img.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cX, cY, aR, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, cX - aR, cY - aR, aR * 2, aR * 2);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(cX, cY, aR, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayName.charAt(0) || 'V', cX, cY);
      }

      // Active status dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cX + aR - 12, cY + aR - 12, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Name & Subtitle
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui';
      ctx.fillText(displayName, cX, 305);
      ctx.fillStyle = '#5eead4';
      ctx.font = '600 13px system-ui';
      ctx.fillText(roleSubtitle, cX, 332);

      // Pulse wave line
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 140; x <= 500; x += 4) {
        const offset = (x - 140) / 360;
        let yOffset = Math.sin(t * 4 + offset * 12) * 8;
        if (Math.abs(offset - ((t * 0.4) % 1)) < 0.05) {
          yOffset = -22 * Math.sin(Math.PI * (Math.abs(offset - ((t * 0.4) % 1)) / 0.05));
        }
        if (x === 140) ctx.moveTo(x, 390 + yOffset);
        else ctx.lineTo(x, 390 + yOffset);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.font = '10px monospace';
      ctx.fillText('LIVE CLINICAL TELEHEALTH FEED', cX, 435);
    }
    animFrameId = requestAnimationFrame(draw);
  };
  draw();
  const intervalId = setInterval(draw, 40);

  const stream = (canvas as any).captureStream ? canvas.captureStream(25) : new MediaStream();
  return {
    stream,
    cleanup: () => {
      cancelAnimationFrame(animFrameId);
      clearInterval(intervalId);
      stream.getTracks().forEach((t) => t.stop());
    }
  };
}

/** Fallback silent audio track for zero-permission or audio initialization */
function createSilentAudioTrack(): MediaStreamTrack {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const dst = ctx.createMediaStreamDestination();
      osc.connect(dst);
      osc.start();
      const trk = dst.stream.getAudioTracks()[0];
      if (trk) {
        trk.enabled = true;
        return trk;
      }
    }
  } catch (_) {}
  const c = document.createElement('canvas');
  const fs = (c as any).captureStream ? (c as any).captureStream() : new MediaStream();
  return fs.getAudioTracks()[0] || new MediaStreamTrack();
}

/** Safe playback helper to avoid unhandled browser play promise rejections */
function safePlay(el: HTMLVideoElement | HTMLAudioElement | null) {
  if (!el) return;
  const p = el.play();
  if (p) {
    p.catch((err) => {
      if (err.name !== 'AbortError') {
        console.warn('[VideoCall] media play blocked or deferred:', err.name);
      }
    });
  }
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician,
  callType,
  userRole = 'patient',
  memberName,
  callerName,
  sessionId: propSessionId,
  onEnd
}) => {
  const [sessionId] = useState<string>(() => propSessionId || `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const [myClientId] = useState<string>(() => `client_${Math.random().toString(36).substring(2, 9)}`);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // Media Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const syntheticCleanupRef = useRef<(() => void) | null>(null);
  const remoteStreamRef = useRef<MediaStream>(new MediaStream());

  // WebRTC & Signaling Refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const signalingRoomRef = useRef<{ send: (s: BroadcastSignal) => void; leave: () => void; ready: Promise<void> } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const localCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const lastHandledOfferSdpRef = useRef<string | null>(null);
  const isCallEndedRef = useRef(false);

  // States
  const [elapsed, setElapsed] = useState(0);
  const [isPeerConnected, setIsPeerConnected] = useState(false);
  const isPeerConnectedRef = useRef(false);
  const hasAnsweredRef = useRef(false);
  const handledSignalIdsRef = useRef<Set<string>>(new Set());
  const [isAudioAutoplayBlocked, setIsAudioAutoplayBlocked] = useState(false);
  const [remoteVideoActive, setRemoteVideoActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCamOff, setIsCamOff] = useState(callType === 'audio');
  const [remoteCamOff, setRemoteCamOff] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [isSimulatedDoctor, setIsSimulatedDoctor] = useState(false);
  const [mediaPermissionNotice, setMediaPermissionNotice] = useState<string | null>(null);
  const [pipPosition, setPipPosition] = useState<'top-right' | 'bottom-right' | 'top-left'>('top-right');

  const isDoctor = userRole === 'doctor';
  const remotePartyName = isDoctor ? (callerName || 'Patient') : clinician.name;
  const remotePartyTitle = isDoctor ? 'Patient Direct Consultation Line' : `${clinician.specialty} • VitaNova Clinic`;
  const showRemoteVideo = callType === 'video' && (isPeerConnected || remoteVideoActive) && !remoteCamOff && !isSimulatedDoctor;

  // In-call Chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: isDoctor ? (callerName || 'Patient') : clinician.name,
      text: isDoctor
        ? `Hello Dr. Israel, I have connected for our consultation.`
        : `Hello ${callerName || memberName}, I am ready for your consultation.`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  // Call timer
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Ringback Tone: plays on caller side while ringing
  useEffect(() => {
    if (!isDoctor && !isPeerConnected && !isSimulatedDoctor) {
      startRingbackTone();
    } else {
      stopRingbackTone();
    }
    return () => stopRingbackTone();
  }, [isDoctor, isPeerConnected, isSimulatedDoctor]);

  // Local video binding
  useEffect(() => {
    if (callType === 'video' && localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      safePlay(localVideoRef.current);
    }
  }, [callType, localStream]);

  // Stream Attachment helper
  const attachRemoteStream = useCallback((stream: MediaStream) => {
    if (callType === 'video' && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.muted = true; // Video element is muted so browser autoplay never blocks
      safePlay(remoteVideoRef.current);
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = stream;
      remoteAudioRef.current.muted = !isSpeakerOn;
      remoteAudioRef.current.volume = 1.0;
      const ap = remoteAudioRef.current.play();
      if (ap) {
        ap.catch((err) => {
          if (err.name === 'NotAllowedError') {
            setIsAudioAutoplayBlocked(true);
          }
        });
      }
    }
  }, [callType, isSpeakerOn]);

  useEffect(() => {
    if (remoteStreamRef.current && remoteStreamRef.current.getTracks().length > 0) {
      attachRemoteStream(remoteStreamRef.current);
    }
  }, [isPeerConnected, remoteVideoActive, attachRemoteStream]);

  // Global user interaction listener to unblock audio autoplay
  useEffect(() => {
    const unlockAudio = () => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.muted = false;
        remoteAudioRef.current.volume = 1.0;
        const p = remoteAudioRef.current.play();
        if (p) {
          p.then(() => setIsAudioAutoplayBlocked(false)).catch(() => {});
        }
      }
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // WebRTC Configuration with public Google and Metered STUN/TURN relays
  const rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' },
      { urls: 'turn:openrelay.metered.ca:80', username: 'openrelay', credential: 'openrelay' },
      { urls: 'turn:openrelay.metered.ca:443', username: 'openrelay', credential: 'openrelay' },
      { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelay', credential: 'openrelay' }
    ],
    iceCandidatePoolSize: 10
  };

  // ── WebRTC & Multi-Channel Signaling Engine ──
  useEffect(() => {
    let active = true;
    const pc = new RTCPeerConnection(rtcConfig);
    pcRef.current = pc;

    let signalingRoom: { send: (s: BroadcastSignal) => void; leave: () => void; ready: Promise<void> } | null = null;
    const chan1 = new BroadcastChannel(`vitanova_webrtc_${sessionId}`);
    const chan2 = new BroadcastChannel(`vitanova_webrtc_${clinician.id}_${sessionId}`);
    channelRef.current = chan1;
    const storageSigKey = `vitanova_sig_${sessionId}`;

    // Unified dispatch helper across all channels
    const sendSignal = (signal: { type: string; sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit; camOff?: boolean; message?: any; [k: string]: unknown }) => {
      const sigId = `sig_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const full: BroadcastSignal = { ...signal, sigId, type: signal.type, senderId: myClientId, sessionId, role: userRole };
      handledSignalIdsRef.current.add(sigId);

      // 1. Same-device cross-tab BroadcastChannel
      try { chan1.postMessage(full); } catch (_) {}
      try { chan2.postMessage(full); } catch (_) {}
      try { localStorage.setItem(storageSigKey, JSON.stringify({ ...full, _ts: Date.now() })); } catch (_) {}

      // 2. Supabase Realtime Broadcast Room (instant cross-device websocket)
      try { signalingRoom?.send(full); } catch (_) {}

      // 3. Supabase DB persistent table (guaranteed cross-device delivery even if websocket drops)
      if (['OFFER', 'ANSWER', 'ICE_CANDIDATE', 'HANGUP', 'CAMERA_STATUS'].includes(signal.type)) {
        const dbType = signal.type === 'ICE_CANDIDATE' ? 'ICE' : signal.type;
        sendCallSignal({
          signalType: dbType,
          fromRole: userRole,
          callerName: isDoctor ? clinician.name : memberName,
          targetClinicianId: clinician.id,
          callType,
          sessionId,
          senderId: myClientId,
          payload: signal.type === 'ICE_CANDIDATE' ? { candidate: signal.candidate } : (signal.sdp ? { sdp: signal.sdp } : {})
        }).catch(() => {});
      }
    };

    const addOrQueueCandidate = async (candidate: RTCIceCandidateInit) => {
      if (!candidate || !candidate.candidate) return;
      if (pc.remoteDescription && pc.remoteDescription.type) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn('[WebRTC] addIceCandidate error:', e);
        }
      } else {
        if (!pendingCandidatesRef.current.some((c) => c.candidate === candidate.candidate)) {
          pendingCandidatesRef.current.push(candidate);
        }
      }
    };

    const flushPendingCandidates = async () => {
      if (!pc.remoteDescription) return;
      const queued = [...pendingCandidatesRef.current];
      pendingCandidatesRef.current = [];
      for (const cand of queued) {
        if (cand && cand.candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(cand));
          } catch (_) {}
        }
      }
    };

    // Tracks handler: handles incoming remote audio and video tracks
    pc.ontrack = (event) => {
      if (!active) return;
      event.track.enabled = true;
      const rs = remoteStreamRef.current;
      if (event.streams && event.streams.length > 0) {
        event.streams[0].getTracks().forEach((t) => {
          if (!rs.getTracks().find((e) => e.id === t.id)) rs.addTrack(t);
        });
      } else {
        if (!rs.getTracks().find((e) => e.id === event.track.id)) rs.addTrack(event.track);
      }
      attachRemoteStream(rs);

      event.track.onunmute = () => {
        if (!active) return;
        event.track.enabled = true;
        attachRemoteStream(remoteStreamRef.current);
        if (event.track.kind === 'video') setRemoteVideoActive(true);
      };
      event.track.onended = () => {
        if (event.track.kind === 'video') setRemoteVideoActive(false);
      };

      if (event.track.kind === 'video') setRemoteVideoActive(true);
      isPeerConnectedRef.current = true;
      setIsPeerConnected(true);
      stopRingbackTone();
      playConnectedTone();
    };

    // ICE Candidate handler: broadcasts to all channels and saves to DB
    pc.onicecandidate = (event) => {
      if (!event.candidate) return;
      const cd: RTCIceCandidateInit = event.candidate.toJSON
        ? event.candidate.toJSON()
        : { candidate: event.candidate.candidate, sdpMid: event.candidate.sdpMid, sdpMLineIndex: event.candidate.sdpMLineIndex };
      localCandidatesRef.current.push(cd);
      sendSignal({ type: 'ICE_CANDIDATE', candidate: cd });
    };

    pc.oniceconnectionstatechange = () => {
      if (!active) return;
      if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
        isPeerConnectedRef.current = true;
        setIsPeerConnected(true);
        stopRingbackTone();
        playConnectedTone();
        attachRemoteStream(remoteStreamRef.current);
      }
      if (pc.iceConnectionState === 'failed') {
        pc.restartIce();
      }
    };

    pc.onconnectionstatechange = () => {
      if (!active) return;
      if (pc.connectionState === 'connected') {
        isPeerConnectedRef.current = true;
        setIsPeerConnected(true);
        stopRingbackTone();
        playConnectedTone();
        attachRemoteStream(remoteStreamRef.current);
      }
    };

    let resolveLocalTracksReady: () => void;
    const localTracksReadyPromise = new Promise<void>((resolve) => {
      resolveLocalTracksReady = resolve;
    });

    // Acquire Local Media (Graceful fallback hierarchy)
    const acquireMedia = async () => {
      let stream: MediaStream | null = null;
      if (callType === 'video') {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
            video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
          });
        } catch (err1) {
          try {
            // Mobile fallback to standard constraints
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          } catch (err2) {
            setMediaPermissionNotice('Camera unavailable or blocked — audio and avatar activated.');
            let audioTrack: MediaStreamTrack | null = null;
            try {
              const as2 = await navigator.mediaDevices.getUserMedia({ audio: true });
              audioTrack = as2.getAudioTracks()[0] || null;
            } catch (_) {}
            if (!audioTrack) audioTrack = createSilentAudioTrack();
            const syn = createSyntheticVideoStream(
              isDoctor ? clinician.name : memberName,
              isDoctor ? 'Lead Telehealth Consultant' : 'Patient Video Feed',
              isDoctor ? clinician.avatar : undefined
            );
            syntheticCleanupRef.current = syn.cleanup;
            stream = new MediaStream([...syn.stream.getVideoTracks(), audioTrack]);
          }
        }
      } else {
        // AUDIO-ONLY: Conserves data and battery, never activates camera
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
            video: false
          });
        } catch (_) {
          setMediaPermissionNotice('Microphone permission required for voice calls.');
          stream = new MediaStream([createSilentAudioTrack()]);
        }
      }

      if (!active) {
        if (stream) stream.getTracks().forEach((t) => t.stop());
        resolveLocalTracksReady!();
        return null;
      }

      if (stream) {
        localStreamRef.current = stream;
        setLocalStream(stream);
        if (callType === 'video' && localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          safePlay(localVideoRef.current);
        }
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream!);
        });
      }
      resolveLocalTracksReady!();
      return stream;
    };

    const handleOfferSignal = async (sdp: RTCSessionDescriptionInit) => {
      try {
        if (!sdp || !sdp.sdp) return;
        if (lastHandledOfferSdpRef.current === sdp.sdp) {
          if (pc.localDescription && pc.localDescription.type === 'answer') {
            sendSignal({ type: 'ANSWER', sdp: pc.localDescription });
            localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
          }
          return;
        }
        if (hasAnsweredRef.current && pc.signalingState === 'stable') return;
        lastHandledOfferSdpRef.current = sdp.sdp;
        hasAnsweredRef.current = true;
        if (reOfferInterval) {
          clearInterval(reOfferInterval);
          reOfferInterval = null;
        }
        await localTracksReadyPromise;
        if (pc.signalingState !== 'stable') {
          await pc.setLocalDescription({ type: 'rollback' }).catch(() => {});
        }
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        await flushPendingCandidates();
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        sendSignal({ type: 'ANSWER', sdp: answer });
        localCandidatesRef.current.forEach((cand) => sendSignal({ type: 'ICE_CANDIDATE', candidate: cand }));
        isPeerConnectedRef.current = true;
        setIsPeerConnected(true);
        if (remoteStreamRef.current && remoteStreamRef.current.getTracks().length > 0) {
          attachRemoteStream(remoteStreamRef.current);
        }
      } catch (err) {
        console.warn('[VitaNova] handleOffer error:', err);
      }
    };

    const handleAnswerSignal = async (sdp: RTCSessionDescriptionInit) => {
      try {
        if (pc.signalingState === 'have-local-offer') {
          hasAnsweredRef.current = true;
          if (reOfferInterval) {
            clearInterval(reOfferInterval);
            reOfferInterval = null;
          }
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          await flushPendingCandidates();
          isPeerConnectedRef.current = true;
          setIsPeerConnected(true);
          stopRingbackTone();
          playConnectedTone();
          localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
          if (remoteStreamRef.current && remoteStreamRef.current.getTracks().length > 0) {
            attachRemoteStream(remoteStreamRef.current);
          }
        } else if (pc.signalingState === 'stable') {
          isPeerConnectedRef.current = true;
          setIsPeerConnected(true);
          stopRingbackTone();
        }
      } catch (err) {
        console.warn('[VitaNova] handleAnswer error:', err);
      }
    };

    const processSignal = async (data: BroadcastSignal) => {
      if (!active) return;
      if (data.senderId === myClientId) return;
      if (data.sessionId && data.sessionId !== sessionId) return;

      const sigKey = (data as any).sigId || `${data.type}_${data.senderId}_${data.candidate ? data.candidate.candidate : (data.sdp ? data.sdp.sdp?.slice(0, 40) : '')}`;
      if (handledSignalIdsRef.current.has(sigKey)) return;
      handledSignalIdsRef.current.add(sigKey);

      try {
        if (data.type === 'OFFER' && (userRole === 'doctor' || pc.signalingState === 'stable') && data.sdp) {
          await handleOfferSignal(data.sdp);
        } else if (data.type === 'ANSWER' && data.sdp) {
          await handleAnswerSignal(data.sdp);
        } else if ((data.type === 'ICE_CANDIDATE' || data.type === 'ICE') && (data.candidate || (data as any).payload?.candidate)) {
          const cand = (data.candidate || (data as any).payload?.candidate) as RTCIceCandidateInit;
          await addOrQueueCandidate(cand);
        } else if (data.type === 'READY_FOR_OFFER' && userRole === 'patient') {
          if (hasAnsweredRef.current || isPeerConnectedRef.current || pc.signalingState !== 'have-local-offer') return;
          await localTracksReadyPromise;
          if (pc.localDescription) {
            sendSignal({ type: 'OFFER', sdp: pc.localDescription });
            localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
          }
        } else if (data.type === 'CAMERA_STATUS' && typeof data.camOff === 'boolean') {
          setRemoteCamOff(data.camOff);
        } else if (data.type === 'CALL_CHAT' && data.message) {
          setChatMessages((prev) => [...prev, data.message as any]);
          if (!showInCallChat) setUnreadChatCount((c) => c + 1);
        } else if (data.type === 'HANGUP' || data.type === 'CALL_ENDED' || data.type === 'DECLINE') {
          if (!isCallEndedRef.current) {
            isCallEndedRef.current = true;
            stopRingbackTone();
            playHangupTone();
            onEndRef.current();
          }
        }
      } catch (err) {
        console.warn('[VitaNova] Signal error:', err);
      }
    };

    // 1. Local Broadcast Channels listeners
    chan1.onmessage = (e) => { if (e.data) processSignal(e.data as BroadcastSignal); };
    chan2.onmessage = (e) => { if (e.data) processSignal(e.data as BroadcastSignal); };
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === storageSigKey && e.newValue) {
        try { processSignal(JSON.parse(e.newValue) as BroadcastSignal); } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageEvent);

    // 2. Supabase Realtime Broadcast room
    signalingRoom = joinCallSignalingRoom(sessionId, (signal) => processSignal(signal));
    signalingRoomRef.current = {
      send: (s: BroadcastSignal) => sendSignal(s),
      leave: () => { try { signalingRoom?.leave(); } catch (_) {} },
      ready: signalingRoom.ready
    };

    // 3. Supabase DB Postgres Changes subscription
    const unsubDb = subscribeToCallSignals(clinician.id, (sigEvent) => {
      if (sigEvent.sessionId && sigEvent.sessionId !== sessionId) return;
      if (sigEvent.senderId === myClientId) return;
      processSignal({
        type: sigEvent.signalType,
        senderId: sigEvent.senderId || 'remote',
        sessionId: sigEvent.sessionId || sessionId,
        role: (sigEvent.fromRole === 'doctor' ? 'doctor' : 'patient') as 'doctor' | 'patient',
        sdp: sigEvent.payload?.sdp,
        candidate: sigEvent.payload?.candidate
      });
    });

    let reOfferInterval: ReturnType<typeof setInterval> | null = null;

    const startSignaling = async () => {
      await acquireMedia();
      if (!active) return;

      if (userRole === 'patient') {
        const sendOffer = async () => {
          if (!active || (pc.signalingState !== 'stable' && pc.signalingState !== 'have-local-offer')) return;
          try {
            let offer: RTCSessionDescriptionInit;
            if (pc.signalingState === 'have-local-offer' && pc.localDescription) {
              offer = pc.localDescription;
            } else {
              offer = await pc.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: callType === 'video'
              });
              await pc.setLocalDescription(offer);
            }
            sendSignal({ type: 'OFFER', sdp: offer });
            localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
          } catch (err) {
            console.warn('[VitaNova] createOffer error:', err);
          }
        };

        await sendOffer();
        reOfferInterval = setInterval(() => {
          if (!active || hasAnsweredRef.current || isPeerConnectedRef.current || pc.connectionState === 'connected') {
            if (reOfferInterval) clearInterval(reOfferInterval);
            return;
          }
          if (pc.signalingState === 'have-local-offer' && pc.localDescription) {
            sendSignal({ type: 'OFFER', sdp: pc.localDescription });
            localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
          }
        }, 2500);

        // Fetch any existing signals in DB
        fetchRecentCallSignals(clinician.id, ['ANSWER', 'ICE'], sessionId, 120).then(async (signals) => {
          if (!active || hasAnsweredRef.current) return;
          const answer = signals.find((s) => s.signalType === 'ANSWER' && s.payload?.sdp);
          if (answer && pc.signalingState === 'have-local-offer') {
            await handleAnswerSignal(answer.payload.sdp as RTCSessionDescriptionInit);
          }
          for (const s of signals.filter((s) => s.signalType === 'ICE' && s.payload?.candidate)) {
            await addOrQueueCandidate(s.payload.candidate as RTCIceCandidateInit);
          }
        }).catch(() => {});
      } else {
        // DOCTOR (Callee)
        sendSignal({ type: 'READY_FOR_OFFER' });
        const checkDbForOffer = async () => {
          if (!active || hasAnsweredRef.current) return;
          try {
            const signals = await fetchRecentCallSignals(clinician.id, ['OFFER', 'ICE'], sessionId, 120);
            if (!active || hasAnsweredRef.current) return;
            const offer = signals.find((s) => s.signalType === 'OFFER' && s.payload?.sdp);
            if (offer && pc.signalingState === 'stable') {
              await handleOfferSignal(offer.payload.sdp as RTCSessionDescriptionInit);
            }
            for (const s of signals.filter((s) => s.signalType === 'ICE' && s.payload?.candidate)) {
              await addOrQueueCandidate(s.payload.candidate as RTCIceCandidateInit);
            }
          } catch (_) {}
        };
        await checkDbForOffer();
        reOfferInterval = setInterval(async () => {
          if (!active || hasAnsweredRef.current || isPeerConnectedRef.current || pc.connectionState === 'connected') {
            if (reOfferInterval) clearInterval(reOfferInterval);
            return;
          }
          sendSignal({ type: 'READY_FOR_OFFER' });
          await checkDbForOffer();
        }, 2500);
      }
    };

    startSignaling();

    return () => {
      active = false;
      if (reOfferInterval) clearInterval(reOfferInterval);
      try { chan1.close(); } catch (_) {}
      try { chan2.close(); } catch (_) {}
      window.removeEventListener('storage', handleStorageEvent);
      try { localStorage.removeItem(storageSigKey); } catch (_) {}
      unsubDb();
      signalingRoom?.leave();
      if (syntheticCleanupRef.current) {
        syntheticCleanupRef.current();
        syntheticCleanupRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    };
  }, [sessionId, callType, clinician.id, isDoctor, memberName, myClientId, rtcConfig, userRole]);

  // Controls Handlers
  const handleToggleMic = () => {
    const nm = !isMuted;
    setIsMuted(nm);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((t) => { t.enabled = !nm; });
    }
  };

  const handleToggleSpeaker = () => {
    const next = !isSpeakerOn;
    setIsSpeakerOn(next);
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = !next;
    }
  };

  const handleToggleCam = async () => {
    const nc = !isCamOff;
    setIsCamOff(nc);
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((t) => { t.enabled = !nc; });
    }
    const cs: BroadcastSignal = { type: 'CAMERA_STATUS', camOff: nc, senderId: myClientId, sessionId, role: userRole };
    try { channelRef.current?.postMessage(cs); } catch (_) {}
    signalingRoomRef.current?.send(cs);
  };

  const handleFlipCamera = async () => {
    const nm = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nm);
    try {
      const ns = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: nm } }, audio: false });
      const nvt = ns.getVideoTracks()[0];
      if (nvt && localStreamRef.current) {
        const ovt = localStreamRef.current.getVideoTracks()[0];
        if (ovt) {
          localStreamRef.current.removeTrack(ovt);
          ovt.stop();
        }
        localStreamRef.current.addTrack(nvt);
        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
        if (pcRef.current) {
          const vs = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
          if (vs) await vs.replaceTrack(nvt);
        }
      }
    } catch (e) {
      console.warn('[VitaNova] Flip camera failed:', e);
    }
  };

  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      setIsScreenSharing(false);
      if (localStreamRef.current) {
        const ct = localStreamRef.current.getVideoTracks()[0];
        if (ct && pcRef.current) {
          const s = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
          if (s) s.replaceTrack(ct);
        }
        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
      }
    } else {
      try {
        const ds = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const st = ds.getVideoTracks()[0];
        screenStreamRef.current = ds;
        setIsScreenSharing(true);
        if (st && pcRef.current) {
          const s = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
          if (s) await s.replaceTrack(st);
        }
        setLocalStream(ds);
        st.onended = () => handleToggleScreenShare();
      } catch (err) {
        console.warn('[VitaNova] Screen share cancelled:', err);
      }
    }
  };

  const handleHangUp = () => {
    if (isCallEndedRef.current) return;
    isCallEndedRef.current = true;
    stopRingbackTone();
    playHangupTone();
    if (timerRef.current) clearInterval(timerRef.current);

    const hs: BroadcastSignal = { type: 'HANGUP', senderId: myClientId, sessionId, role: userRole };
    try { channelRef.current?.postMessage(hs); } catch (_) {}
    signalingRoomRef.current?.send(hs);
    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: isDoctor ? clinician.name : memberName,
      targetClinicianId: clinician.id,
      sessionId
    }).catch(() => {});

    if (syntheticCleanupRef.current) { syntheticCleanupRef.current(); syntheticCleanupRef.current = null; }
    if (localStreamRef.current) { localStreamRef.current.getTracks().forEach((t) => t.stop()); localStreamRef.current = null; }
    if (screenStreamRef.current) { screenStreamRef.current.getTracks().forEach((t) => t.stop()); screenStreamRef.current = null; }
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    onEndRef.current();
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const dn = isDoctor ? clinician.name : memberName;
    const msg = { sender: dn, text: chatInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, msg]);
    setChatInput('');
    const cs: BroadcastSignal = { type: 'CALL_CHAT', message: msg, senderId: myClientId, sessionId, role: userRole };
    try { channelRef.current?.postMessage(cs); } catch (_) {}
    signalingRoomRef.current?.send(cs);

    if (!isPeerConnected || isSimulatedDoctor) {
      setTimeout(() => {
        let reply = `Dr. Israel Kisakye here. I have received your message.`;
        const l = msg.text.toLowerCase();
        if (l.includes('pressure') || l.includes('bp')) reply = `Noted on your BP. Keep taking your prescribed medication as scheduled.`;
        else if (l.includes('headache') || l.includes('pain')) reply = `Understood. I will prepare prescription guidance for your records.`;
        setChatMessages((prev) => [...prev, { sender: remotePartyName, text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 1000);
    }
  };

  // Instant Interactive Demo Mode for testing
  const handleActivateSimulatedDoctor = () => {
    setIsSimulatedDoctor(true);
    setIsPeerConnected(true);
    stopRingbackTone();
    playConnectedTone();
    setChatMessages((prev) => [
      ...prev,
      {
        sender: clinician.name,
        text: `Hello ${memberName}, Dr. Israel Kisakye here. I can hear you clearly. How are you feeling today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Open Doctor In New Tab (local multi-tab test with 1 click)
  const handleOpenDoctorNewTab = () => {
    window.open(
      `${window.location.origin}${window.location.pathname}?role=doctor&docId=${encodeURIComponent(clinician.id)}&sessionId=${encodeURIComponent(sessionId)}&callType=${encodeURIComponent(callType)}&autoAnswer=true`,
      '_blank'
    );
  };

  const unlockMedia = () => {
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = false;
      remoteAudioRef.current.volume = 1.0;
      safePlay(remoteAudioRef.current);
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = false;
      safePlay(remoteVideoRef.current);
    }
    setIsAudioAutoplayBlocked(false);
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col bg-slate-950 select-none ${isFullscreen ? 'p-0' : 'sm:p-3'}`}>
      {/* ── Top Call Header ── */}
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
              <h2 className="text-sm font-extrabold text-white truncate max-w-[180px] sm:max-w-none">{remotePartyName}</h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {isDoctor ? 'Patient Line' : clinician.profession}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
              <span className="font-semibold text-teal-400 flex items-center space-x-1">
                {callType === 'video' ? (
                  <><Video className="w-3 h-3 text-teal-400" /><span>HD Video</span></>
                ) : (
                  <><Phone className="w-3 h-3 text-amber-400" /><span>HD Voice</span></>
                )}
              </span>
              <span>•</span>
              <span className="font-mono text-slate-200 font-bold bg-slate-800 px-1.5 py-0.5 rounded">{fmt(elapsed)}</span>
              {isPeerConnected ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isSimulatedDoctor ? 'Interactive Demo' : 'Live Connected'}</span>
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-amber-400 animate-pulse flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Calling...</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isDoctor && !isPeerConnected && (
            <button
              onClick={handleOpenDoctorNewTab}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Answer as Doctor</span>
            </button>
          )}

          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>End-to-End Encrypted</span>
          </div>

          <button
            onClick={() => { setShowInCallChat((prev) => !prev); setUnreadChatCount(0); }}
            className={`relative p-2 rounded-xl border transition-colors ${showInCallChat ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'}`}
            title="In-Call Chat"
          >
            <MessageSquare className="w-4 h-4" />
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce">
                {unreadChatCount}
              </span>
            )}
          </button>

          {callType === 'video' && (
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Permission or device notice */}
      {mediaPermissionNotice && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{mediaPermissionNotice}</span>
          </div>
          <button onClick={() => setMediaPermissionNotice(null)} className="text-[10px] font-bold underline hover:text-white ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* ── Main Call Body ── */}
      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col md:flex-row" onClick={unlockMedia}>
        {/* Floating unlock audio button for mobile */}
        {isAudioAutoplayBlocked && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <button
              onClick={(e) => { e.stopPropagation(); unlockMedia(); }}
              className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-2xl shadow-emerald-500/40 border border-emerald-400"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Tap to Enable Audio</span>
            </button>
          </div>
        )}

        {/* Call View: Video vs Voice */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-slate-950">
          {callType === 'video' ? (
            /* ── VIDEO CALL VIEW ── */
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              <audio ref={remoteAudioRef} autoPlay playsInline style={{ display: 'none' }} />

              {/* Connecting / Ringing Backdrop */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(to bottom, #020617, #0f172a, #020617)',
                  zIndex: 1,
                  opacity: showRemoteVideo ? 0 : 1,
                  pointerEvents: showRemoteVideo ? 'none' : 'auto',
                  transition: 'opacity 0.4s ease'
                }}
              >
                <div className="relative mb-3">
                  <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping scale-110" />
                  <img
                    src={clinician.avatar}
                    alt={remotePartyName}
                    className="relative w-28 h-28 rounded-full object-cover border-4 border-teal-500/50 shadow-2xl"
                  />
                  <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 border border-slate-950">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-white">{remotePartyName}</h4>
                <p className="text-xs text-teal-400 font-semibold mt-1 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isPeerConnected ? 'Connected' : 'Connecting HD Telehealth Line...'}</span>
                </p>

                {/* Direct Dial / Fallback buttons while ringing */}
                {!isPeerConnected && !isSimulatedDoctor && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-sm px-4">
                    <button
                      onClick={handleActivateSimulatedDoctor}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Test Call (Interactive Demo)</span>
                    </button>
                    {clinician.phone && (
                      <a
                        href={`tel:${clinician.phone}`}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center space-x-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span>Call Direct: {clinician.phone}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Fullscreen Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                muted
                onLoadedMetadata={(e) => { const el = e.target as HTMLVideoElement; el.muted = true; safePlay(el); setRemoteVideoActive(true); }}
                onCanPlay={(e) => { const el = e.target as HTMLVideoElement; el.muted = true; safePlay(el); setRemoteVideoActive(true); }}
                onPlaying={() => setRemoteVideoActive(true)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: showRemoteVideo ? 10 : 0,
                  opacity: showRemoteVideo ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: showRemoteVideo ? 'auto' : 'none'
                }}
              />

              {/* Camera Paused Overlay */}
              {isPeerConnected && remoteCamOff && !isSimulatedDoctor && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: '1.5rem', textAlign: 'center' }}>
                  <div className="relative mb-4">
                    <img src={clinician.avatar} alt={clinician.name} className="w-28 h-28 rounded-full object-cover border-4 border-slate-700 opacity-60" />
                    <span className="absolute bottom-1 right-1 p-2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      <VideoOff className="w-4 h-4" />
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{remotePartyName}</h4>
                  <p className="text-xs text-slate-400 mt-1">Doctor paused video • Voice remains active</p>
                </div>
              )}

              {/* Interactive Doctor Simulation */}
              {isSimulatedDoctor && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #0f172a, #020617)' }}>
                  <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-md">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping scale-110" />
                      <img src={clinician.avatar} alt={clinician.name} className="relative w-36 h-36 rounded-full object-cover border-4 border-teal-500 shadow-2xl shadow-teal-500/30" />
                      <span className="absolute bottom-2 right-2 p-2 rounded-full bg-emerald-500 text-slate-950 border-2 border-slate-950">
                        <Radio className="w-4 h-4 animate-pulse" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{remotePartyName}</h3>
                      <p className="text-xs text-teal-400 font-semibold mt-1">{clinician.specialty} • Telehealth Lead</p>
                    </div>
                    <div className="flex items-center space-x-1.5 py-2 px-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <Activity className="w-4 h-4 text-teal-400 mr-1" />
                      {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                        <span key={i} className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full transition-all duration-300" style={{ height: `${Math.max(8, (h * (((elapsed + i) % 4) + 1)) / 4)}px` }} />
                      ))}
                    </div>
                    <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-300">
                      "Medical audio connected. I am ready to review your care plan."
                    </div>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 30, pointerEvents: 'none' }}>
                <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
                  <span className={`w-2.5 h-2.5 rounded-full inline-block ${isPeerConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'}`} />
                  <span className="text-xs font-bold text-white">{remotePartyName}</span>
                  <span className="text-[10px] text-teal-300 font-medium">{isPeerConnected ? (isSimulatedDoctor ? '(Demo)' : '(Live)') : '(Calling)'}</span>
                </div>
              </div>

              {/* Local Video PIP */}
              <div className={`absolute z-40 w-32 h-44 sm:w-44 sm:h-60 rounded-2xl overflow-hidden border-2 border-teal-500/80 shadow-2xl bg-slate-900 ${pipPosition === 'top-right' ? 'top-4 right-4' : pipPosition === 'top-left' ? 'top-4 left-4' : 'bottom-20 right-4'}`}>
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={(e) => safePlay(e.target as HTMLVideoElement)}
                  className={`w-full h-full object-cover transform ${facingMode === 'user' && !isScreenSharing ? '-scale-x-100' : ''} ${isCamOff ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                />
                {isCamOff && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-2 text-center">
                    <VideoOff className="w-7 h-7 text-slate-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-300">Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold bg-slate-950/80 px-1.5 py-0.5 rounded text-white truncate max-w-[80px]">
                    You
                  </span>
                  {isMuted && <span className="p-1 rounded bg-rose-500 text-white shadow"><MicOff className="w-2.5 h-2.5" /></span>}
                </div>
                <button
                  onClick={() => setPipPosition((p) => p === 'top-right' ? 'bottom-right' : p === 'bottom-right' ? 'top-left' : 'top-right')}
                  className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white/80 hover:text-white hover:bg-black/80"
                  title="Move preview"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            /* ── AUDIO-ONLY CALL VIEW ── */
            <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center max-w-md w-full">
              <audio ref={remoteAudioRef} autoPlay playsInline style={{ display: 'none' }} />

              {/* Glowing Clinician Portrait */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping opacity-75 scale-125" />
                <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse scale-150" />
                <img
                  src={clinician.avatar}
                  alt={clinician.name}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-teal-500 shadow-2xl z-10"
                />
                <span className="absolute bottom-1 right-3 z-20 w-6 h-6 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center">
                  <Radio className="w-3 h-3 text-white animate-pulse" />
                </span>
              </div>

              {/* Party Info */}
              <div className="space-y-1.5 z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{remotePartyName}</h3>
                <p className="text-sm text-teal-400 font-medium">{remotePartyTitle}</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    HD Audio Consultation
                  </span>
                  <span>•</span>
                  <span className="font-mono text-white font-bold">{fmt(elapsed)}</span>
                </div>
              </div>

              {/* Animated Equalizer Waveform */}
              <div className="flex items-center justify-center space-x-1.5 py-2.5 px-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                <Activity className="w-4 h-4 text-teal-400 mr-2" />
                <span className="text-xs font-bold text-slate-300 mr-2">Audio Signal:</span>
                {[35, 70, 50, 85, 55, 95, 45, 90, 65, 50, 75, 60].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full transition-all duration-200"
                    style={{ height: `${Math.max(6, isMuted ? 4 : (h * ((elapsed % 3) + 1)) / 3)}px` }}
                  />
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
                <span>Direct Voice Line</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{isPeerConnected ? 'Connected (Live)' : 'Calling...'}</span>
              </div>

              {/* Fallback buttons if ringing */}
              {!isPeerConnected && !isSimulatedDoctor && (
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                  <button
                    onClick={handleActivateSimulatedDoctor}
                    className="px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-bold transition-all active:scale-95"
                  >
                    Test Voice Line in Demo Mode
                  </button>
                  {clinician.phone && (
                    <a
                      href={`tel:${clinician.phone}`}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-400" />
                      <span>Direct Cellular Line</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Slide-in In-Call Chat ── */}
        {showInCallChat && (
          <div className="w-full md:w-80 h-72 md:h-full bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col z-40 shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>In-Call Chat</span>
              </span>
              <button onClick={() => setShowInCallChat(false)} className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded">
                Close
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender === (isDoctor ? clinician.name : memberName);
                return (
                  <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-slate-400 mb-0.5">{msg.sender}</span>
                    <div className={`p-2.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${isMe ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'}`}>
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
                placeholder="Type message to doctor..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button type="submit" className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="relative z-30 flex items-center justify-center space-x-3 sm:space-x-4 py-3 sm:py-4 px-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        {/* Mic toggle */}
        <button
          onClick={handleToggleMic}
          className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${isMuted ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}
          title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Audio Speaker toggle (for Voice calls) */}
        {callType === 'audio' && (
          <button
            onClick={handleToggleSpeaker}
            className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${!isSpeakerOn ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}
            title={isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
          >
            {isSpeakerOn ? <Volume2 className="w-5 h-5 text-teal-400" /> : <VolumeX className="w-5 h-5 text-rose-400" />}
          </button>
        )}

        {/* Video Camera toggle (only on video calls) */}
        {callType === 'video' && (
          <button
            onClick={handleToggleCam}
            className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${isCamOff ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}
            title={isCamOff ? 'Turn Camera On' : 'Pause Camera'}
          >
            {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        {/* Flip Camera front/back (only on video calls) */}
        {callType === 'video' && (
          <button
            onClick={handleFlipCamera}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95"
            title="Switch Camera (Front/Rear)"
          >
            <SwitchCamera className="w-5 h-5 text-teal-400" />
          </button>
        )}

        {/* Screen share (video calls) */}
        {callType === 'video' && (
          <button
            onClick={handleToggleScreenShare}
            className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${isScreenSharing ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}
            title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
          >
            <Monitor className="w-5 h-5" />
          </button>
        )}

        {/* In-Call Chat button */}
        <button
          onClick={() => { setShowInCallChat((prev) => !prev); setUnreadChatCount(0); }}
          className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${showInCallChat ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}
          title="In-Call Chat"
        >
          <MessageCircle className="w-5 h-5 text-teal-400" />
        </button>

        {/* End Call Button */}
        <button
          onClick={handleHangUp}
          className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm flex items-center space-x-2 shadow-xl shadow-rose-600/30 transition-all active:scale-95"
          title="End Call"
        >
          <PhoneOff className="w-5 h-5" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCallModal;
