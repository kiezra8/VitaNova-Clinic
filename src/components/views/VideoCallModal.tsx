import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  PhoneOff, Mic, MicOff, Video, VideoOff, Phone, Maximize2, Minimize2,
  ShieldCheck, Activity, MessageSquare, Send, ExternalLink, Radio,
  SwitchCamera, Monitor, Sparkles, AlertCircle, Volume2
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

function createSyntheticVideoStream(displayName: string, roleSubtitle: string, avatarUrl?: string): { stream: MediaStream; cleanup: () => void } {
  const canvas = document.createElement('canvas');
  canvas.width = 640; canvas.height = 480;
  const ctx = canvas.getContext('2d');
  let animFrameId = 0; let t = 0;
  const img = new Image(); img.crossOrigin = 'anonymous'; let imgLoaded = false;
  if (avatarUrl) { img.src = avatarUrl; img.onload = () => { imgLoaded = true; }; }
  const draw = () => {
    t += 0.04;
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#020617'); grad.addColorStop(0.5, '#0f172a'); grad.addColorStop(1, '#042f2e');
      ctx.fillStyle = grad; ctx.fillRect(0, 0, 640, 480);
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)'; ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 480); ctx.stroke(); }
      for (let y = 0; y < 480; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke(); }
      const pulse = Math.sin(t * 2) * 8; const aR = 65; const cX = 320; const cY = 200;
      ctx.beginPath(); ctx.arc(cX, cY, aR + 10 + pulse, 0, Math.PI * 2); ctx.fillStyle = 'rgba(20, 184, 166, 0.12)'; ctx.fill();
      ctx.beginPath(); ctx.arc(cX, cY, aR + 4, 0, Math.PI * 2); ctx.strokeStyle = '#14b8a6'; ctx.lineWidth = 3; ctx.stroke();
      if (imgLoaded && img.complete) {
        ctx.save(); ctx.beginPath(); ctx.arc(cX, cY, aR, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, cX - aR, cY - aR, aR * 2, aR * 2); ctx.restore();
      } else {
        ctx.beginPath(); ctx.arc(cX, cY, aR, 0, Math.PI * 2); ctx.fillStyle = '#1e293b'; ctx.fill();
        ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 36px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(displayName.charAt(0) || 'V', cX, cY);
      }
      ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(cX + aR - 12, cY + aR - 12, 10, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#020617'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px system-ui';
      ctx.fillText(displayName, cX, 305); ctx.fillStyle = '#5eead4'; ctx.font = '600 13px system-ui'; ctx.fillText(roleSubtitle, cX, 332);
      ctx.beginPath(); ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2;
      for (let x = 140; x <= 500; x += 4) {
        const offset = (x - 140) / 360; let yOffset = Math.sin(t * 4 + offset * 12) * 8;
        if (Math.abs(offset - ((t * 0.4) % 1)) < 0.05) yOffset = -22 * Math.sin(Math.PI * (Math.abs(offset - ((t * 0.4) % 1)) / 0.05));
        if (x === 140) ctx.moveTo(x, 390 + yOffset); else ctx.lineTo(x, 390 + yOffset);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)'; ctx.font = '10px monospace'; ctx.fillText('LIVE CLINICAL VIDEO FEED', cX, 435);
    }
    animFrameId = requestAnimationFrame(draw);
  };
  draw(); animFrameId = requestAnimationFrame(draw);
  const intervalId = setInterval(draw, 40);
  const stream = (canvas as any).captureStream ? canvas.captureStream(25) : new MediaStream();
  return { stream, cleanup: () => { cancelAnimationFrame(animFrameId); clearInterval(intervalId); stream.getTracks().forEach((t) => t.stop()); } };
}

function createSilentAudioTrack(): MediaStreamTrack {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx(); const osc = ctx.createOscillator(); const dst = ctx.createMediaStreamDestination();
      osc.connect(dst); osc.start(); const trk = dst.stream.getAudioTracks()[0];
      if (trk) { trk.enabled = true; return trk; }
    }
  } catch (_) {}
  const c = document.createElement('canvas');
  const fs = (c as any).captureStream ? (c as any).captureStream() : new MediaStream();
  return fs.getAudioTracks()[0] || new MediaStreamTrack();
}

function safePlay(el: HTMLVideoElement | HTMLAudioElement | null) {
  if (!el) return;
  const p = el.play();
  if (p) p.catch((err) => { if (err.name !== 'AbortError') console.warn('[VideoCall] play blocked:', err.name); });
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician, callType, userRole = 'patient', memberName, callerName, sessionId: propSessionId, onEnd
}) => {
  const [sessionId] = useState<string>(() => propSessionId || `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const [myClientId] = useState<string>(() => `client_${Math.random().toString(36).substring(2, 9)}`);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const [remoteVideoActive, setRemoteVideoActive] = useState(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const syntheticCleanupRef = useRef<(() => void) | null>(null);
  const remoteStreamRef = useRef<MediaStream>(new MediaStream());

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const signalingRoomRef = useRef<{ send: (s: BroadcastSignal) => void; leave: () => void; ready: Promise<void> } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const localCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const lastHandledOfferSdpRef = useRef<string | null>(null);
  const isCallEndedRef = useRef(false);

  const [elapsed, setElapsed] = useState(0);
  const [isPeerConnected, setIsPeerConnected] = useState(false);
  const isPeerConnectedRef = useRef(false);
  const hasAnsweredRef = useRef(false);
  const handledSignalIdsRef = useRef<Set<string>>(new Set());
  const [isAudioAutoplayBlocked, setIsAudioAutoplayBlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(callType === 'audio');
  const [remoteCamOff, setRemoteCamOff] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [isSimulatedDoctor, setIsSimulatedDoctor] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [pipPosition, setPipPosition] = useState<'top-right' | 'bottom-right' | 'top-left'>('top-right');

  const isDoctor = userRole === 'doctor';
  const remotePartyName = isDoctor ? (callerName || 'Patient (Sarah Namubiru)') : clinician.name;
  const remotePartyTitle = isDoctor ? 'Patient (Direct Telehealth Line)' : `${clinician.specialty} - VitaNova Nakawa`;
  const showRemoteVideo = (isPeerConnected || remoteVideoActive) && !remoteCamOff && !isSimulatedDoctor;

  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([{
    sender: isDoctor ? (callerName || 'Patient') : clinician.name,
    text: isDoctor ? `Hello Dr. Israel, I am connected and ready for our consultation.` : `Hello ${callerName || memberName}, I have your records ready.`,
    time: 'Just now'
  }]);
  const [chatInput, setChatInput] = useState('');
  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  useEffect(() => { timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);
  useEffect(() => {
    if (!isDoctor && !isPeerConnected && !isSimulatedDoctor) startRingbackTone(); else stopRingbackTone();
    return () => stopRingbackTone();
  }, [isDoctor, isPeerConnected, isSimulatedDoctor]);
  useEffect(() => { if (localVideoRef.current && localStream) { localVideoRef.current.srcObject = localStream; safePlay(localVideoRef.current); } }, [localStream]);

  const attachRemoteStream = useCallback((stream: MediaStream) => {
    console.log('[VideoCall] attachRemoteStream v:', stream.getVideoTracks().length, 'a:', stream.getAudioTracks().length);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.muted = false;
      remoteVideoRef.current.volume = 1.0;
      const vp = remoteVideoRef.current.play();
      if (vp) vp.catch((err) => { if (err.name === 'NotAllowedError') setIsAudioAutoplayBlocked(true); });
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = stream;
      remoteAudioRef.current.muted = false;
      remoteAudioRef.current.volume = 1.0;
      const ap = remoteAudioRef.current.play();
      if (ap) ap.catch((err) => { if (err.name === 'NotAllowedError') setIsAudioAutoplayBlocked(true); });
    }
  }, []);

  const rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' }, { urls: 'stun:stun.cloudflare.com:3478' },
      { urls: 'turn:openrelay.metered.ca:80', username: 'openrelay', credential: 'openrelay' },
      { urls: 'turn:openrelay.metered.ca:443', username: 'openrelay', credential: 'openrelay' },
      { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelay', credential: 'openrelay' }
    ],
    iceCandidatePoolSize: 10
  };

  useEffect(() => {
    let active = true;
    const pc = new RTCPeerConnection(rtcConfig);
    pcRef.current = pc;
    let signalingRoom: { send: (s: BroadcastSignal) => void; leave: () => void; ready: Promise<void> } | null = null;
    const chan1 = new BroadcastChannel(`vitanova_webrtc_${sessionId}`);
    const chan2 = new BroadcastChannel(`vitanova_webrtc_${clinician.id}_${sessionId}`);
    channelRef.current = chan1;
    const storageSigKey = `vitanova_sig_${sessionId}`;

    const sendSignal = (signal: { type: string; sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit; camOff?: boolean; message?: any; [k: string]: unknown }) => {
      const sigId = `sig_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const full: BroadcastSignal = { ...signal, sigId, type: signal.type, senderId: myClientId, sessionId, role: userRole };
      handledSignalIdsRef.current.add(sigId);
      try { fetch('/api/calls/signal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(full) }).catch(() => {}); } catch (_) {}
      try { chan1.postMessage(full); } catch (_) {}
      try { chan2.postMessage(full); } catch (_) {}
      try { localStorage.setItem(storageSigKey, JSON.stringify({ ...full, _ts: Date.now() + Math.random() })); } catch (_) {}
      try { signalingRoom?.send(full); } catch (_) {}
    };

    const addOrQueueCandidate = async (candidate: RTCIceCandidateInit) => {
      if (!candidate || !candidate.candidate) return;
      if (pc.remoteDescription && pc.remoteDescription.type) {
        try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { console.warn('[WebRTC] addIceCandidate error:', e); }
      } else {
        if (!pendingCandidatesRef.current.some((c) => c.candidate === candidate.candidate)) pendingCandidatesRef.current.push(candidate);
      }
    };

    const flushPendingCandidates = async () => {
      if (!pc.remoteDescription) return;
      const queued = [...pendingCandidatesRef.current]; pendingCandidatesRef.current = [];
      for (const cand of queued) { if (cand && cand.candidate) { try { await pc.addIceCandidate(new RTCIceCandidate(cand)); } catch (_) {} } }
    };

    pc.ontrack = (event) => {
      if (!active) return;
      console.log('[WebRTC] ontrack:', event.track.kind, event.track.readyState);
      event.track.enabled = true;
      const rs = remoteStreamRef.current;
      if (event.streams && event.streams.length > 0) {
        event.streams[0].getTracks().forEach((t) => { if (!rs.getTracks().find((e) => e.id === t.id)) rs.addTrack(t); });
      } else {
        if (!rs.getTracks().find((e) => e.id === event.track.id)) rs.addTrack(event.track);
      }
      attachRemoteStream(rs);
      event.track.onunmute = () => { if (!active) return; event.track.enabled = true; attachRemoteStream(remoteStreamRef.current); if (event.track.kind === 'video') setRemoteVideoActive(true); };
      event.track.onended = () => { if (event.track.kind === 'video') setRemoteVideoActive(false); };
      if (event.track.kind === 'video') setRemoteVideoActive(true);
      isPeerConnectedRef.current = true; setIsPeerConnected(true); stopRingbackTone(); playConnectedTone();
    };

    pc.onicecandidate = (event) => {
      if (!event.candidate) return;
      const cd: RTCIceCandidateInit = event.candidate.toJSON ? event.candidate.toJSON() : { candidate: event.candidate.candidate, sdpMid: event.candidate.sdpMid, sdpMLineIndex: event.candidate.sdpMLineIndex };
      localCandidatesRef.current.push(cd); sendSignal({ type: 'ICE_CANDIDATE', candidate: cd });
    };

    pc.oniceconnectionstatechange = () => {
      if (!active) return;
      console.log('[WebRTC] ICE:', pc.iceConnectionState);
      if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
        isPeerConnectedRef.current = true; setIsPeerConnected(true); stopRingbackTone(); playConnectedTone(); attachRemoteStream(remoteStreamRef.current);
      }
      if (pc.iceConnectionState === 'failed') { console.warn('[WebRTC] ICE failed - restarting'); pc.restartIce(); }
    };

    pc.onconnectionstatechange = () => {
      if (!active) return;
      console.log('[WebRTC] Connection:', pc.connectionState);
      if (pc.connectionState === 'connected') {
        isPeerConnectedRef.current = true; setIsPeerConnected(true); stopRingbackTone(); playConnectedTone(); attachRemoteStream(remoteStreamRef.current);
      }
    };

    let resolveLocalTracksReady: () => void;
    const localTracksReadyPromise = new Promise<void>((resolve) => { resolveLocalTracksReady = resolve; });

    const acquireMedia = async () => {
      let stream: MediaStream | null = null;
      if (callType === 'video') {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } });
        } catch (err: any) {
          console.warn('[VitaNova] Camera unavailable, using synthetic:', err);
          let audioTrack: MediaStreamTrack | null = null;
          try { const as2 = await navigator.mediaDevices.getUserMedia({ audio: true }); audioTrack = as2.getAudioTracks()[0] || null; } catch (_) {}
          if (!audioTrack) audioTrack = createSilentAudioTrack();
          const syn = createSyntheticVideoStream(isDoctor ? clinician.name : memberName, isDoctor ? 'Lead Telehealth Consultant' : 'Patient Video Feed', isDoctor ? clinician.avatar : undefined);
          syntheticCleanupRef.current = syn.cleanup;
          stream = new MediaStream([...syn.stream.getVideoTracks(), audioTrack]);
        }
      } else {
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); } catch (_) { stream = new MediaStream([createSilentAudioTrack()]); }
      }
      if (!active) { if (stream) stream.getTracks().forEach((t) => t.stop()); resolveLocalTracksReady!(); return null; }
      if (stream) {
        localStreamRef.current = stream; setLocalStream(stream);
        if (localVideoRef.current) { localVideoRef.current.srcObject = stream; safePlay(localVideoRef.current); }
        stream.getTracks().forEach((track) => { console.log('[WebRTC] Adding track:', track.kind); pc.addTrack(track, stream!); });
      }
      resolveLocalTracksReady!(); return stream;
    };

    const handleOfferSignal = async (sdp: RTCSessionDescriptionInit) => {
      try {
        if (!sdp || !sdp.sdp) return;
        if (lastHandledOfferSdpRef.current === sdp.sdp) return;
        if (hasAnsweredRef.current && pc.signalingState === 'stable') return;
        lastHandledOfferSdpRef.current = sdp.sdp; hasAnsweredRef.current = true;
        if (reOfferInterval) { clearInterval(reOfferInterval); reOfferInterval = null; }
        await localTracksReadyPromise;
        if (pc.signalingState !== 'stable') { await pc.setLocalDescription({ type: 'rollback' }).catch(() => {}); }
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        await flushPendingCandidates();
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        sendSignal({ type: 'ANSWER', sdp: answer });
        localCandidatesRef.current.forEach((cand) => sendSignal({ type: 'ICE_CANDIDATE', candidate: cand }));
        isPeerConnectedRef.current = true; setIsPeerConnected(true);
      } catch (err) { console.warn('[VitaNova] handleOffer error:', err); }
    };

    const handleAnswerSignal = async (sdp: RTCSessionDescriptionInit) => {
      try {
        if (pc.signalingState === 'have-local-offer') {
          hasAnsweredRef.current = true;
          if (reOfferInterval) { clearInterval(reOfferInterval); reOfferInterval = null; }
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          await flushPendingCandidates();
          isPeerConnectedRef.current = true; setIsPeerConnected(true); stopRingbackTone(); playConnectedTone();
          localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
        }
      } catch (err) { console.warn('[VitaNova] handleAnswer error:', err); }
    };

    const processSignal = async (data: BroadcastSignal) => {
      if (!active) return;
      if (data.senderId === myClientId) return;
      if (data.sessionId && data.sessionId !== sessionId) return;
      const sigKey = (data as any).sigId || `${data.type}_${data.senderId}_${data.candidate ? data.candidate.candidate : (data.sdp ? data.sdp.sdp?.slice(0, 40) : '')}`;
      if (handledSignalIdsRef.current.has(sigKey)) return;
      handledSignalIdsRef.current.add(sigKey);
      console.log('[WebRTC] Signal:', data.type, 'from:', data.role, 'my role:', userRole);
      try {
        if (data.type === 'OFFER' && userRole === 'doctor' && data.sdp) { await handleOfferSignal(data.sdp); }
        else if (data.type === 'ANSWER' && userRole === 'patient' && data.sdp) { await handleAnswerSignal(data.sdp); }
        else if (data.type === 'ICE_CANDIDATE' && data.candidate) { await addOrQueueCandidate(data.candidate); }
        else if (data.type === 'READY_FOR_OFFER' && userRole === 'patient') {
          if (hasAnsweredRef.current || isPeerConnectedRef.current || pc.signalingState !== 'have-local-offer') return;
          await localTracksReadyPromise;
          if (pc.localDescription) { sendSignal({ type: 'OFFER', sdp: pc.localDescription }); localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c })); }
        }
        else if (data.type === 'CAMERA_STATUS' && typeof data.camOff === 'boolean') { setRemoteCamOff(data.camOff); }
        else if (data.type === 'CALL_CHAT' && data.message) { setChatMessages((prev) => [...prev, data.message as any]); if (!showInCallChat) setUnreadChatCount((c) => c + 1); }
        else if (data.type === 'HANGUP' || data.type === 'CALL_ENDED' || data.type === 'DECLINE') {
          if (!isCallEndedRef.current) { isCallEndedRef.current = true; stopRingbackTone(); playHangupTone(); onEndRef.current(); }
        }
      } catch (err) { console.warn('[VitaNova] Signal error:', err); }
    };

    chan1.onmessage = (e) => { if (e.data) processSignal(e.data as BroadcastSignal); };
    chan2.onmessage = (e) => { if (e.data) processSignal(e.data as BroadcastSignal); };
    const handleStorageEvent = (e: StorageEvent) => { if (e.key === storageSigKey && e.newValue) { try { processSignal(JSON.parse(e.newValue) as BroadcastSignal); } catch (_) {} } };
    window.addEventListener('storage', handleStorageEvent);

    let sseSource: EventSource | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let lastPollTime = Date.now() - 30000;
    try {
      sseSource = new EventSource(`/api/calls/stream/${encodeURIComponent(sessionId)}`);
      sseSource.addEventListener('signal', (e) => { try { processSignal(JSON.parse(e.data) as BroadcastSignal); } catch (_) {} });
      sseSource.onerror = () => console.warn('[WebRTC] SSE error');
    } catch (_) {}

    pollInterval = setInterval(async () => {
      if (!active || (hasAnsweredRef.current && isPeerConnectedRef.current)) { if (pollInterval) clearInterval(pollInterval); return; }
      try {
        const res = await fetch(`/api/calls/poll/${encodeURIComponent(sessionId)}?since=${lastPollTime}&excludeSender=${encodeURIComponent(myClientId)}`);
        if (res.ok) { const json = await res.json(); if (json.signals) for (const sig of json.signals) processSignal(sig as BroadcastSignal); if (json.serverTime) lastPollTime = json.serverTime; }
      } catch (_) {}
    }, 1200);

    signalingRoom = joinCallSignalingRoom(sessionId, (signal) => processSignal(signal));
    signalingRoomRef.current = { send: (s: BroadcastSignal) => sendSignal(s), leave: () => { try { signalingRoom?.leave(); } catch (_) {} }, ready: signalingRoom.ready };

    let reOfferInterval: ReturnType<typeof setInterval> | null = null;

    const startSignaling = async () => {
      await acquireMedia();
      if (!active) return;
      console.log('[VitaNova] Signaling as', userRole, 'session:', sessionId);
      if (userRole === 'patient') {
        const sendOffer = async () => {
          if (!active || (pc.signalingState !== 'stable' && pc.signalingState !== 'have-local-offer')) return;
          try {
            let offer: RTCSessionDescriptionInit;
            if (pc.signalingState === 'have-local-offer' && pc.localDescription) { offer = pc.localDescription; }
            else { offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true }); await pc.setLocalDescription(offer); }
            sendSignal({ type: 'OFFER', sdp: offer });
            sendCallSignal({ signalType: 'OFFER', fromRole: 'patient', callerName: memberName, targetClinicianId: clinician.id, callType, sessionId, senderId: myClientId, payload: { sdp: offer } }).catch(() => {});
            localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c }));
          } catch (err) { console.warn('[VitaNova] createOffer error:', err); }
        };
        await sendOffer();
        reOfferInterval = setInterval(() => {
          if (!active || hasAnsweredRef.current || isPeerConnectedRef.current || pc.connectionState === 'connected') { if (reOfferInterval) clearInterval(reOfferInterval); return; }
          if (pc.signalingState === 'have-local-offer' && pc.localDescription) { sendSignal({ type: 'OFFER', sdp: pc.localDescription }); localCandidatesRef.current.forEach((c) => sendSignal({ type: 'ICE_CANDIDATE', candidate: c })); }
        }, 3000);
        fetchRecentCallSignals(clinician.id, ['ANSWER', 'ICE'], sessionId, 120).then(async (signals) => {
          if (!active || hasAnsweredRef.current) return;
          const answer = signals.find((s) => s.signalType === 'ANSWER' && s.payload?.sdp);
          if (answer && pc.signalingState === 'have-local-offer') await handleAnswerSignal(answer.payload.sdp as RTCSessionDescriptionInit);
          for (const s of signals.filter((s) => s.signalType === 'ICE' && s.payload?.candidate)) await addOrQueueCandidate(s.payload.candidate as RTCIceCandidateInit);
        }).catch(() => {});
      } else {
        sendSignal({ type: 'READY_FOR_OFFER' });
        const checkDbForOffer = async () => {
          if (!active || hasAnsweredRef.current) return;
          try {
            const signals = await fetchRecentCallSignals(clinician.id, ['OFFER', 'ICE'], sessionId, 120);
            if (!active || hasAnsweredRef.current) return;
            const offer = signals.find((s) => s.signalType === 'OFFER' && s.payload?.sdp);
            if (offer && pc.signalingState === 'stable') await handleOfferSignal(offer.payload.sdp as RTCSessionDescriptionInit);
            for (const s of signals.filter((s) => s.signalType === 'ICE' && s.payload?.candidate)) await addOrQueueCandidate(s.payload.candidate as RTCIceCandidateInit);
          } catch (_) {}
        };
        await checkDbForOffer();
        reOfferInterval = setInterval(async () => {
          if (!active || hasAnsweredRef.current || isPeerConnectedRef.current || pc.connectionState === 'connected') { if (reOfferInterval) clearInterval(reOfferInterval); return; }
          sendSignal({ type: 'READY_FOR_OFFER' }); await checkDbForOffer();
        }, 3000);
      }
    };

    startSignaling();

    return () => {
      active = false;
      if (reOfferInterval) clearInterval(reOfferInterval);
      if (pollInterval) clearInterval(pollInterval);
      if (sseSource) { try { sseSource.close(); } catch (_) {} }
      try { chan1.close(); } catch (_) {}
      try { chan2.close(); } catch (_) {}
      window.removeEventListener('storage', handleStorageEvent);
      try { localStorage.removeItem(storageSigKey); } catch (_) {}
      signalingRoom?.leave();
      if (syntheticCleanupRef.current) { syntheticCleanupRef.current(); syntheticCleanupRef.current = null; }
      if (localStreamRef.current) { localStreamRef.current.getTracks().forEach((t) => t.stop()); localStreamRef.current = null; }
      if (screenStreamRef.current) { screenStreamRef.current.getTracks().forEach((t) => t.stop()); screenStreamRef.current = null; }
      if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    };
  }, [sessionId]);

  const handleToggleMic = () => { const nm = !isMuted; setIsMuted(nm); if (localStreamRef.current) localStreamRef.current.getAudioTracks().forEach((t) => { t.enabled = !nm; }); };
  const handleToggleCam = async () => {
    const nc = !isCamOff; setIsCamOff(nc);
    if (localStreamRef.current) localStreamRef.current.getVideoTracks().forEach((t) => { t.enabled = !nc; });
    const cs: BroadcastSignal = { type: 'CAMERA_STATUS', camOff: nc, senderId: myClientId, sessionId, role: userRole };
    try { channelRef.current?.postMessage(cs); } catch (_) {}
    signalingRoomRef.current?.send(cs);
  };
  const handleFlipCamera = async () => {
    const nm = facingMode === 'user' ? 'environment' : 'user'; setFacingMode(nm);
    try {
      const ns = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: nm } }, audio: false });
      const nvt = ns.getVideoTracks()[0];
      if (nvt && localStreamRef.current) {
        const ovt = localStreamRef.current.getVideoTracks()[0];
        if (ovt) { localStreamRef.current.removeTrack(ovt); ovt.stop(); }
        localStreamRef.current.addTrack(nvt); setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
        if (pcRef.current) { const vs = pcRef.current.getSenders().find((s) => s.track?.kind === 'video'); if (vs) await vs.replaceTrack(nvt); }
      }
    } catch (e) { console.warn('[VitaNova] Flip camera failed:', e); }
  };
  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) { screenStreamRef.current.getTracks().forEach((t) => t.stop()); screenStreamRef.current = null; }
      setIsScreenSharing(false);
      if (localStreamRef.current) {
        const ct = localStreamRef.current.getVideoTracks()[0];
        if (ct && pcRef.current) { const s = pcRef.current.getSenders().find((s) => s.track?.kind === 'video'); if (s) s.replaceTrack(ct); }
        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
      }
    } else {
      try {
        const ds = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const st = ds.getVideoTracks()[0]; screenStreamRef.current = ds; setIsScreenSharing(true);
        if (st && pcRef.current) { const s = pcRef.current.getSenders().find((s) => s.track?.kind === 'video'); if (s) await s.replaceTrack(st); }
        setLocalStream(ds); st.onended = () => handleToggleScreenShare();
      } catch (err) { console.warn('[VitaNova] Screen share cancelled:', err); }
    }
  };
  const handleHangUp = () => {
    if (isCallEndedRef.current) return;
    isCallEndedRef.current = true; stopRingbackTone(); playHangupTone();
    if (timerRef.current) clearInterval(timerRef.current);
    const hs: BroadcastSignal = { type: 'HANGUP', senderId: myClientId, sessionId, role: userRole };
    try { channelRef.current?.postMessage(hs); } catch (_) {}
    signalingRoomRef.current?.send(hs);
    try { fetch('/api/calls/signal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...hs, sigId: `sig_hangup_${Date.now()}` }) }).catch(() => {}); } catch (_) {}
    if (syntheticCleanupRef.current) { syntheticCleanupRef.current(); syntheticCleanupRef.current = null; }
    if (localStreamRef.current) { localStreamRef.current.getTracks().forEach((t) => t.stop()); localStreamRef.current = null; }
    if (screenStreamRef.current) { screenStreamRef.current.getTracks().forEach((t) => t.stop()); screenStreamRef.current = null; }
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    onEndRef.current();
  };
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    const dn = isDoctor ? clinician.name : memberName;
    const msg = { sender: dn, text: chatInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, msg]); setChatInput('');
    const cs: BroadcastSignal = { type: 'CALL_CHAT', message: msg, senderId: myClientId, sessionId, role: userRole };
    try { channelRef.current?.postMessage(cs); } catch (_) {}
    signalingRoomRef.current?.send(cs);
    if (!isPeerConnected || isSimulatedDoctor) {
      setTimeout(() => {
        let reply = `Dr. Israel Kisakye here. I have recorded this note.`;
        const l = msg.text.toLowerCase();
        if (l.includes('pressure') || l.includes('bp')) reply = `I see your BP log. Continue prescribed doses.`;
        else if (l.includes('pain') || l.includes('headache')) reply = `Understood. Preparing a prescription note.`;
        setChatMessages((prev) => [...prev, { sender: remotePartyName, text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 1000);
    }
  };
  const handleActivateSimulatedDoctor = () => {
    setIsSimulatedDoctor(true); setIsPeerConnected(true); stopRingbackTone(); playConnectedTone();
    setChatMessages((prev) => [...prev, { sender: clinician.name, text: `Hello ${memberName}, Dr. Israel Kisakye here. I can hear you clearly.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };
  const handleOpenDoctorNewTab = () => { window.open(`${window.location.origin}${window.location.pathname}?role=doctor&docId=${encodeURIComponent(clinician.id)}&sessionId=${encodeURIComponent(sessionId)}&autoAnswer=true`, '_blank'); };
  const unlockMedia = () => {
    if (remoteAudioRef.current) { remoteAudioRef.current.muted = false; remoteAudioRef.current.volume = 1.0; safePlay(remoteAudioRef.current); }
    if (remoteVideoRef.current) { remoteVideoRef.current.muted = false; remoteVideoRef.current.volume = 1.0; safePlay(remoteVideoRef.current); }
    setIsAudioAutoplayBlocked(false);
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col bg-slate-950 select-none ${isFullscreen ? 'p-0' : 'sm:p-3'}`}>
      <div className="relative z-20 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src={clinician.avatar} alt={clinician.name} className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500 shadow-md" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-sm font-extrabold text-white">{remotePartyName}</h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">{isDoctor ? 'Patient Line' : clinician.profession}</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
              <span className="font-semibold text-teal-400 flex items-center space-x-1">
                {callType === 'video' ? (<><Video className="w-3 h-3 text-teal-400" /><span>HD Telehealth Video</span></>) : (<><Phone className="w-3 h-3 text-amber-400" /><span>HD Voice</span></>)}
              </span>
              <span>|</span>
              <span className="font-mono text-slate-200 font-bold bg-slate-800 px-1.5 py-0.5 rounded">{fmt(elapsed)}</span>
              {isPeerConnected ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span>{isSimulatedDoctor ? 'Demo Live' : 'Live Connected'}</span>
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-amber-400 animate-pulse flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" /><span>Ringing...</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDoctor && !isPeerConnected && (
            <button onClick={handleOpenDoctorNewTab} className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold transition-all active:scale-95">
              <ExternalLink className="w-3.5 h-3.5" /><span>Answer as Doctor</span>
            </button>
          )}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /><span>Encrypted WebRTC</span>
          </div>
          <button onClick={() => { setShowInCallChat((prev) => !prev); setUnreadChatCount(0); }} className={`relative p-2 rounded-xl border transition-colors ${showInCallChat ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'}`}>
            <MessageSquare className="w-4 h-4" />
            {unreadChatCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce">{unreadChatCount}</span>}
          </button>
          <button onClick={() => setIsFullscreen((prev) => !prev)} className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {cameraPermissionError && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center space-x-2"><AlertCircle className="w-4 h-4 shrink-0 text-amber-400" /><span>{cameraPermissionError}</span></div>
          <button onClick={() => setCameraPermissionError(null)} className="text-[10px] font-bold underline hover:text-white ml-2">Dismiss</button>
        </div>
      )}

      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col md:flex-row" onClick={unlockMedia}>
        {isAudioAutoplayBlocked && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <button onClick={(e) => { e.stopPropagation(); unlockMedia(); }} className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-2xl shadow-emerald-500/40 border border-emerald-400">
              <Volume2 className="w-4 h-4 animate-pulse" /><span>Click to Enable Audio</span>
            </button>
          </div>
        )}

        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-slate-950">
          {callType === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              <audio ref={remoteAudioRef} autoPlay playsInline style={{ display: 'none' }} />

              {/* Backdrop while connecting */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #020617, #0f172a, #020617)', zIndex: 1, opacity: showRemoteVideo ? 0 : 1, pointerEvents: showRemoteVideo ? 'none' : 'auto', transition: 'opacity 0.4s ease' }}>
                <div className="relative mb-3">
                  <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping scale-110" />
                  <img src={isDoctor ? clinician.avatar : clinician.avatar} alt={remotePartyName} className="relative w-28 h-28 rounded-full object-cover border-4 border-teal-500/50 shadow-2xl" />
                  <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 border border-slate-950"><Activity className="w-3.5 h-3.5 animate-pulse" /></span>
                </div>
                <h4 className="text-base font-extrabold text-white">{remotePartyName}</h4>
                <p className="text-xs text-teal-400 font-semibold mt-1 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /><span>Connecting...</span>
                </p>
              </div>

              {/* Remote video - always rendered */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                onLoadedMetadata={(e) => { const el = e.target as HTMLVideoElement; el.muted = false; el.volume = 1.0; safePlay(el); setRemoteVideoActive(true); }}
                onCanPlay={(e) => { const el = e.target as HTMLVideoElement; el.muted = false; safePlay(el); setRemoteVideoActive(true); }}
                onPlaying={() => setRemoteVideoActive(true)}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: showRemoteVideo ? 10 : 0, opacity: showRemoteVideo ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: showRemoteVideo ? 'auto' : 'none' }}
              />

              {isPeerConnected && remoteCamOff && !isSimulatedDoctor && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: '1.5rem', textAlign: 'center' }}>
                  <div className="relative mb-4">
                    <img src={clinician.avatar} alt={clinician.name} className="w-28 h-28 rounded-full object-cover border-4 border-slate-700 opacity-60" />
                    <span className="absolute bottom-1 right-1 p-2 rounded-full bg-slate-800 text-slate-400 border border-slate-700"><VideoOff className="w-4 h-4" /></span>
                  </div>
                  <h4 className="text-base font-bold text-white">{remotePartyName}</h4>
                  <p className="text-xs text-slate-400 mt-1">Camera paused - Audio remains live</p>
                </div>
              )}

              {isSimulatedDoctor && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #0f172a, #020617)' }}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-md">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping scale-110" />
                      <img src={clinician.avatar} alt={clinician.name} className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-teal-500 shadow-2xl shadow-teal-500/30" />
                      <span className="absolute bottom-2 right-2 p-2 rounded-full bg-emerald-500 text-slate-950 border-2 border-slate-950"><Radio className="w-4 h-4 animate-pulse" /></span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{remotePartyName}</h3>
                      <p className="text-xs text-teal-400 font-semibold mt-1">{clinician.specialty} - Chief Telehealth Consultant</p>
                    </div>
                    <div className="flex items-center space-x-1.5 py-2 px-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <Activity className="w-4 h-4 text-teal-400 mr-1" />
                      {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                        <span key={i} className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full transition-all duration-300" style={{ height: `${Math.max(8, (h * (((elapsed + i) % 4) + 1)) / 4)}px` }} />
                      ))}
                    </div>
                    <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-300">
                      "Vitals received. Your camera and microphone are connected."
                    </div>
                  </div>
                </div>
              )}

              {!isPeerConnected && !remoteVideoActive && !isSimulatedDoctor && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #0f172a, #020617)', padding: '1.5rem', textAlign: 'center' }}>
                  <div className="relative mb-6">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping scale-110" />
                    <span className="absolute -inset-2 rounded-full bg-emerald-500/10 animate-pulse" />
                    <img src={clinician.avatar} alt={clinician.name} className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{remotePartyName}</h3>
                  <p className="text-sm font-semibold text-emerald-400 mt-1 flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{isDoctor ? 'Connecting to Patient...' : 'Ringing Doctor Line...'}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{remotePartyTitle}</p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                    <button onClick={handleActivateSimulatedDoctor} className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg hover:scale-105 active:scale-95 transition-all">
                      <Sparkles className="w-4 h-4" /><span>Start Interactive Clinical Test</span>
                    </button>
                    <button onClick={handleOpenDoctorNewTab} className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-all active:scale-95">
                      <ExternalLink className="w-4 h-4 text-teal-400" /><span>Open Doctor in New Tab</span>
                    </button>
                  </div>
                </div>
              )}

              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 30, pointerEvents: 'none' }}>
                <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
                  <span className={`w-2.5 h-2.5 rounded-full inline-block ${isPeerConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'}`} />
                  <span className="text-xs font-bold text-white">{remotePartyName}</span>
                  <span className="text-[10px] text-teal-300 font-medium">{isPeerConnected ? isSimulatedDoctor ? '(Simulated)' : '(Live WebRTC)' : '(Ringing)'}</span>
                </div>
              </div>

              <div className={`absolute z-40 w-36 h-48 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-teal-500/80 shadow-2xl bg-slate-900 ${pipPosition === 'top-right' ? 'top-4 right-4' : pipPosition === 'top-left' ? 'top-4 left-4' : 'bottom-20 right-4'}`}>
                <video ref={localVideoRef} autoPlay playsInline muted onLoadedMetadata={(e) => safePlay(e.target as HTMLVideoElement)} className={`w-full h-full object-cover transform ${facingMode === 'user' && !isScreenSharing ? '-scale-x-100' : ''} ${isCamOff ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
                {isCamOff && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-2 text-center">
                    <VideoOff className="w-8 h-8 text-slate-500 mb-1" />
                    <span className="text-[11px] font-bold text-slate-300">Camera Paused</span>
                  </div>
                )}
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-white">You ({isDoctor ? 'Dr. Israel' : memberName})</span>
                  {isMuted && <span className="p-1 rounded bg-rose-500 text-white shadow"><MicOff className="w-3 h-3" /></span>}
                </div>
                <button onClick={() => setPipPosition((p) => p === 'top-right' ? 'bottom-right' : p === 'bottom-right' ? 'top-left' : 'top-right')} className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white/80 hover:text-white hover:bg-black/80">
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center max-w-md w-full">
              <audio ref={remoteAudioRef} autoPlay playsInline style={{ display: 'none' }} />
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping opacity-75 scale-125" />
                <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse scale-150" />
                <img src={clinician.avatar} alt={clinician.name} className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-teal-500 shadow-2xl z-10" />
                <span className="absolute bottom-1 right-3 z-20 w-6 h-6 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center"><Radio className="w-3 h-3 text-white animate-pulse" /></span>
              </div>
              <div className="space-y-1.5 z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{remotePartyName}</h3>
                <p className="text-sm text-teal-400 font-medium">{remotePartyTitle}</p>
              </div>
              <div className="flex items-center justify-center space-x-1.5 py-2 px-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Activity className="w-4 h-4 text-teal-400 mr-1" />
                <span className="text-xs font-bold text-slate-300 mr-2">Audio Stream:</span>
                {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                  <span key={i} className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full" style={{ height: `${Math.max(8, isMuted ? 6 : (h * ((elapsed % 3) + 1)) / 3)}px` }} />
                ))}
              </div>
              <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
                <span>Voice Line</span><span>|</span><span className="text-emerald-400 font-bold">{isPeerConnected ? 'Connected (Live)' : 'Ringing...'}</span>
              </div>
              {!isPeerConnected && (
                <button onClick={handleActivateSimulatedDoctor} className="px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-bold">
                  Test Voice Line in Demo Mode
                </button>
              )}
            </div>
          )}
        </div>

        {showInCallChat && (
          <div className="w-full md:w-80 h-72 md:h-full bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col z-40 shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5"><MessageSquare className="w-3.5 h-3.5 text-teal-400" /><span>In-Call Chat</span></span>
              <button onClick={() => setShowInCallChat(false)} className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded">Close</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender === (isDoctor ? clinician.name : memberName);
                return (
                  <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-slate-400 mb-0.5">{msg.sender}</span>
                    <div className={`p-2.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${isMe ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'}`}>{msg.text}</div>
                    <span className="text-[9px] text-slate-500 mt-0.5">{msg.time}</span>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSendChat} className="p-2 border-t border-slate-800 flex items-center space-x-2">
              <input type="text" placeholder="Type message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500" />
              <button type="submit" className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"><Send className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        )}
      </div>

      <div className="relative z-30 flex items-center justify-center space-x-3 sm:space-x-4 py-3 sm:py-4 px-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        <button onClick={handleToggleMic} className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${isMuted ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}>
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        {callType === 'video' && (
          <button onClick={handleToggleCam} className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${isCamOff ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}>
            {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}
        {callType === 'video' && (
          <button onClick={handleFlipCamera} className="p-3 sm:p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95">
            <SwitchCamera className="w-5 h-5 text-teal-400" />
          </button>
        )}
        {callType === 'video' && (
          <button onClick={handleToggleScreenShare} className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${isScreenSharing ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}>
            <Monitor className="w-5 h-5" />
          </button>
        )}
        <button onClick={handleHangUp} className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm flex items-center space-x-2 shadow-xl shadow-rose-600/30 transition-all active:scale-95">
          <PhoneOff className="w-5 h-5" /><span>End Call</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCallModal;
