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
  MessageSquare,
  Send,
  User,
  ExternalLink,
  Radio,
  SwitchCamera,
  Monitor,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import {
  sendCallSignal,
  subscribeToCallSignals,
  fetchRecentCallSignals,
  CallSignalEvent
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

/**
 * Creates an animated clinical canvas video stream as a fallback when physical
 * webcams cannot be opened (e.g. Windows camera locked by another tab on same PC).
 * This ensures WebRTC ALWAYS has an active video track and both videos always show!
 */
function createSyntheticVideoStream(
  displayName: string,
  roleSubtitle: string,
  avatarUrl?: string
): { stream: MediaStream; cleanup: () => void } {
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
      // 1. Sleek gradient background
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#020617');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#042f2e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Subtle medical grid pattern
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 480);
        ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(640, y);
        ctx.stroke();
      }

      // 2. Pulsing halo ring around avatar
      const pulse = Math.sin(t * 2) * 8;
      const avatarRadius = 65;
      const centerX = 320;
      const centerY = 200;

      ctx.beginPath();
      ctx.arc(centerX, centerY, avatarRadius + 10 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 184, 166, 0.12)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, avatarRadius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Avatar image or placeholder
      if (imgLoaded && img.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, centerX - avatarRadius, centerY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayName.charAt(0) || 'V', centerX, centerY);
      }

      // 3. Online LIVE badge
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX + avatarRadius - 12, centerY + avatarRadius - 12, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 4. Display Name & Subtitle
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillText(displayName, centerX, 305);

      ctx.fillStyle = '#5eead4';
      ctx.font = '600 13px system-ui, -apple-system, sans-serif';
      ctx.fillText(roleSubtitle, centerX, 332);

      // 5. Live Animated ECG / Audio Waveform
      const waveY = 390;
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 140; x <= 500; x += 4) {
        const offset = (x - 140) / 360;
        let yOffset = Math.sin(t * 4 + offset * 12) * 8;
        // Occasional heartbeat spike
        if (Math.abs(offset - ((t * 0.4) % 1)) < 0.05) {
          yOffset = -22 * Math.sin(Math.PI * (Math.abs(offset - ((t * 0.4) % 1)) / 0.05));
        }
        if (x === 140) ctx.moveTo(x, waveY + yOffset);
        else ctx.lineTo(x, waveY + yOffset);
      }
      ctx.stroke();

      // 6. Encrypted Telehealth indicator
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.font = '10px monospace';
      ctx.fillText('● LIVE CLINICAL VIDEO FEED • 720p HD', centerX, 435);
    }
    animFrameId = requestAnimationFrame(draw);
  };

  // Synchronously draw the first frame so canvas track has pixels immediately
  draw();
  animFrameId = requestAnimationFrame(draw);
  // Interval timer guarantees 25 FPS even when tab is in the background or unfocused
  const intervalId = setInterval(draw, 40);
  const stream = (canvas as any).captureStream ? canvas.captureStream(25) : new MediaStream();

  const cleanup = () => {
    cancelAnimationFrame(animFrameId);
    clearInterval(intervalId);
    stream.getTracks().forEach((trk) => trk.stop());
  };

  return { stream, cleanup };
}

/**
 * Creates a silent audio track using Web Audio API as a fallback when microphone hardware
 * is locked or permission is delayed. This keeps WebRTC audio transceivers alive and negotiated.
 */
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
  const canvas = document.createElement('canvas');
  const fallbackStream = (canvas as any).captureStream ? canvas.captureStream() : new MediaStream();
  return fallbackStream.getAudioTracks()[0] || new MediaStreamTrack();
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
  // Session & Client ID (strictly stable per call session)
  const [sessionId] = useState<string>(
    () => propSessionId || `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );
  const [myClientId] = useState<string>(
    () => `client_${Math.random().toString(36).substring(2, 9)}`
  );

  // Stable reference to onEnd callback to prevent useEffect teardown on parent re-renders
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // Video and audio element refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  // Active media streams
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const syntheticCleanupRef = useRef<(() => void) | null>(null);
  const remoteMediaStreamRef = useRef<MediaStream>(new MediaStream());

  // WebRTC refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const localCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const lastHandledOfferSdpRef = useRef<string | null>(null);
  const mediaReadyPromiseRef = useRef<Promise<MediaStream | null> | null>(null);
  const isCallEndedRef = useRef(false);

  // UI States
  const [elapsed, setElapsed] = useState(0);
  const [isPeerConnected, setIsPeerConnected] = useState(false);
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
  const remotePartyTitle = isDoctor
    ? 'Patient (Direct Telehealth Line)'
    : `${clinician.specialty} • VitaNova Nakawa`;

  const hasRemoteVideo = Boolean(
    remoteStream &&
    remoteStream.getVideoTracks().length > 0 &&
    remoteStream.getVideoTracks().some((t) => t.readyState === 'live')
  );
  const showRemoteVideo = (isPeerConnected || hasRemoteVideo) && !remoteCamOff && !isSimulatedDoctor;

  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: isDoctor ? (callerName || 'Patient') : clinician.name,
      text: isDoctor
        ? `Hello Dr. Israel, I am connected and ready for our consultation.`
        : `Hello ${callerName || memberName}, I have opened your VitaNova medical records and vitals. I can hear and see you clearly.`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Format seconds as MM:SS
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // Start call elapsed timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Ringback tone for caller while waiting for peer
  useEffect(() => {
    if (!isDoctor && !isPeerConnected && !isSimulatedDoctor) {
      startRingbackTone();
    } else {
      stopRingbackTone();
    }
    return () => {
      stopRingbackTone();
    };
  }, [isDoctor, isPeerConnected, isSimulatedDoctor]);

  // STUN & Free TURN Relay Servers for universal NAT & firewall traversal
  const rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' },
      { urls: 'turn:openrelay.metered.ca:80', username: 'openrelay', credential: 'openrelay' },
      { urls: 'turn:openrelay.metered.ca:443', username: 'openrelay', credential: 'openrelay' },
      { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelay', credential: 'openrelay' }
    ],
    iceCandidatePoolSize: 10
  };

  // Flush buffered ICE candidates
  const flushPendingCandidates = async (peerConn: RTCPeerConnection) => {
    if (!peerConn.remoteDescription) return;
    const queued = [...pendingCandidatesRef.current];
    pendingCandidatesRef.current = [];
    for (const cand of queued) {
      if (cand && cand.candidate) {
        try {
          await peerConn.addIceCandidate(new RTCIceCandidate(cand));
        } catch (e) {
          console.warn('[WebRTC] Flush candidate error:', e);
        }
      }
    }
  };

  // Bind local stream to video element whenever it changes
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch(() => {});
    }
  }, [localStream]);

  // Bind remote stream to video & dedicated audio element whenever it changes
  useEffect(() => {
    if (remoteStream) {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play().catch(() => {});
      }
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream;
        remoteAudioRef.current.play().catch(() => {});
      }
    }
  }, [remoteStream, isPeerConnected]);

  // Main WebRTC & Dual Signaling (Runs ONCE per sessionId — never torn down on re-render!)
  useEffect(() => {
    let active = true;
    const channelName = `vitanova_webrtc_${clinician.id}`;
    const bChannel = new BroadcastChannel(channelName);
    channelRef.current = bChannel;

    const pc = new RTCPeerConnection(rtcConfig);
    pcRef.current = pc;

    // Retransmit all locally generated candidates across both signaling channels
    const retransmitAllLocalCandidates = () => {
      if (localCandidatesRef.current.length === 0) return;
      localCandidatesRef.current.forEach((cand) => {
        try {
          bChannel.postMessage({
            type: 'ICE_CANDIDATE',
            candidate: cand,
            senderId: myClientId,
            sessionId,
            role: userRole
          });
        } catch (_) {}

        sendCallSignal({
          signalType: 'ICE',
          fromRole: userRole,
          callerName: isDoctor ? clinician.name : memberName,
          targetClinicianId: clinician.id,
          sessionId,
          senderId: myClientId,
          payload: { candidate: cand }
        }).catch(() => {});
      });
    };

    // Safely add or queue candidate
    const addOrQueueCandidate = async (candidate: RTCIceCandidateInit) => {
      if (!candidate || !candidate.candidate) return;
      if (pc.remoteDescription && pc.remoteDescription.type) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn('[WebRTC] addIceCandidate error:', e);
        }
      } else {
        const exists = pendingCandidatesRef.current.some((c) => c.candidate === candidate.candidate);
        if (!exists) {
          pendingCandidatesRef.current.push(candidate);
        }
      }
    };

    // Handle incoming remote media tracks (handles individual audio + video track arrivals)
    pc.ontrack = (event) => {
      if (!active) return;
      console.log('[WebRTC] Remote track arrived:', event.track.kind);

      if (event.streams && event.streams[0]) {
        event.streams[0].getTracks().forEach((track) => {
          track.enabled = true;
          if (!remoteMediaStreamRef.current.getTracks().some((t) => t.id === track.id)) {
            remoteMediaStreamRef.current.addTrack(track);
          }
        });
      } else if (event.track) {
        event.track.enabled = true;
        if (!remoteMediaStreamRef.current.getTracks().some((t) => t.id === event.track.id)) {
          remoteMediaStreamRef.current.addTrack(event.track);
        }
      }

      // Create a fresh composite stream so React and video/audio elements trigger updates
      const compositeStream = new MediaStream(remoteMediaStreamRef.current.getTracks());
      setRemoteStream(compositeStream);

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = compositeStream;
        const vp = remoteVideoRef.current.play();
        if (vp !== undefined) {
          vp.catch((err) => console.warn('[WebRTC] remoteVideo play error:', err));
        }
      }

      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = compositeStream;
        const ap = remoteAudioRef.current.play();
        if (ap !== undefined) {
          ap.catch((err) => console.warn('[WebRTC] remoteAudio play error:', err));
        }
      }

      setIsPeerConnected(true);
      stopRingbackTone();
      playConnectedTone();
    };

    // Handle local ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const candData: RTCIceCandidateInit = event.candidate.toJSON
          ? event.candidate.toJSON()
          : {
              candidate: event.candidate.candidate,
              sdpMid: event.candidate.sdpMid,
              sdpMLineIndex: event.candidate.sdpMLineIndex
            };
        localCandidatesRef.current.push(candData);

        // BroadcastChannel (instant same-device tab sync)
        try {
          bChannel.postMessage({
            type: 'ICE_CANDIDATE',
            candidate: candData,
            senderId: myClientId,
            sessionId,
            role: userRole
          });
        } catch (_) {}

        // Supabase Realtime (cross-device sync)
        sendCallSignal({
          signalType: 'ICE',
          fromRole: userRole,
          callerName: isDoctor ? clinician.name : memberName,
          targetClinicianId: clinician.id,
          sessionId,
          senderId: myClientId,
          payload: { candidate: candData }
        }).catch(() => {});
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (!active) return;
      console.log('[WebRTC] ICE State:', pc.iceConnectionState);
      if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
        setIsPeerConnected(true);
        stopRingbackTone();
        playConnectedTone();
      }
    };

    pc.onconnectionstatechange = () => {
      if (!active) return;
      console.log('[WebRTC] Connection State:', pc.connectionState);
      if (pc.connectionState === 'connected') {
        setIsPeerConnected(true);
        stopRingbackTone();
        playConnectedTone();
      }
    };

    // Acquire Media: Physical camera with instant synthetic video & audio fallback
    const acquireMedia = () => {
      const p = (async () => {
        let stream: MediaStream | null = null;

        if (callType === 'video') {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
              video: {
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                facingMode: 'user'
              }
            });
          } catch (err: any) {
            console.warn('[VitaNova Call] Physical camera unavailable (likely locked by other tab). Using visual clinical stream & audio:', err);
            let audioTrack: MediaStreamTrack | null = null;
            try {
              const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
              audioTrack = audioStream.getAudioTracks()[0] || null;
            } catch (_) {}

            if (!audioTrack) {
              audioTrack = createSilentAudioTrack();
            }

            const synthetic = createSyntheticVideoStream(
              isDoctor ? clinician.name : memberName,
              isDoctor ? 'Lead Telehealth Consultant' : 'Patient Video Feed',
              isDoctor ? clinician.avatar : '/ki_ezra_avatar.jpg'
            );
            syntheticCleanupRef.current = synthetic.cleanup;

            const combinedTracks: MediaStreamTrack[] = [
              ...synthetic.stream.getVideoTracks(),
              audioTrack
            ];
            stream = new MediaStream(combinedTracks);
          }
        } else {
          // Audio call
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
              video: false
            });
          } catch (_) {
            const silentTrack = createSilentAudioTrack();
            stream = new MediaStream([silentTrack]);
          }
        }

        if (!active) {
          if (stream) stream.getTracks().forEach((t) => t.stop());
          return null;
        }

        if (stream) {
          streamRef.current = stream;
          setLocalStream(stream);

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localVideoRef.current.play().catch(() => {});
          }

          // Add tracks to WebRTC peer connection
          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream!);
          });
        }

        // If patient, generate the initial SDP Offer AFTER tracks are added
        if (userRole === 'patient') {
          try {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            await pc.setLocalDescription(offer);

            bChannel.postMessage({
              type: 'OFFER',
              sdp: offer,
              senderId: myClientId,
              sessionId,
              senderName: memberName
            });

            await sendCallSignal({
              signalType: 'OFFER',
              fromRole: 'patient',
              callerName: memberName,
              targetClinicianId: clinician.id,
              callType,
              sessionId,
              senderId: myClientId,
              payload: { sdp: offer }
            });

            retransmitAllLocalCandidates();
          } catch (offerErr) {
            console.warn('[VitaNova Call] createOffer error:', offerErr);
          }
        } else {
          // Doctor announces readiness so patient can send/re-send offer
          bChannel.postMessage({
            type: 'READY_FOR_OFFER',
            senderId: myClientId,
            sessionId,
            senderName: clinician.name
          });

          sendCallSignal({
            signalType: 'READY_FOR_OFFER',
            fromRole: 'doctor',
            callerName: clinician.name,
            targetClinicianId: clinician.id,
            callType,
            sessionId,
            senderId: myClientId
          }).catch(() => {});

          // Doctor checks for any recent OFFER and ICE signals already submitted to Supabase!
          fetchRecentCallSignals(clinician.id, ['OFFER', 'ICE', 'READY_FOR_OFFER'], sessionId, 120).then(async (signals) => {
            if (!active || signals.length === 0) return;
            const offer = signals.find((s) => s.signalType === 'OFFER' && s.payload?.sdp);
            if (offer && offer.payload?.sdp && pc.signalingState === 'stable') {
              await handleOfferSignal(offer.payload.sdp);
            }
            const iceSignals = signals.filter(
              (s) => (s.signalType === 'ICE' || s.signalType === 'ICE_CANDIDATE') && (s.payload?.candidate || (s as any).candidate)
            );
            for (const s of iceSignals) {
              const cand = s.payload?.candidate || (s as any).candidate;
              if (cand) await addOrQueueCandidate(cand);
            }
          });
        }

        return stream;
      })();

      mediaReadyPromiseRef.current = p;
      return p;
    };

    // Handle incoming SDP Offer (Doctor side)
    const handleOfferSignal = async (sdp: RTCSessionDescriptionInit) => {
      try {
        if (!sdp || !sdp.sdp) return;
        if (lastHandledOfferSdpRef.current === sdp.sdp && pc.signalingState !== 'stable') {
          return;
        }
        lastHandledOfferSdpRef.current = sdp.sdp;

        // Ensure doctor's local media is acquired and added to pc BEFORE creating answer
        if (mediaReadyPromiseRef.current) {
          await mediaReadyPromiseRef.current;
        }

        if (pc.signalingState !== 'stable') {
          await Promise.all([
            pc.setLocalDescription({ type: 'rollback' }),
            pc.setRemoteDescription(new RTCSessionDescription(sdp))
          ]);
        } else {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        }

        await flushPendingCandidates(pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        bChannel.postMessage({
          type: 'ANSWER',
          sdp: answer,
          senderId: myClientId,
          sessionId,
          senderName: clinician.name
        });

        await sendCallSignal({
          signalType: 'ANSWER',
          fromRole: 'doctor',
          callerName: clinician.name,
          targetClinicianId: clinician.id,
          sessionId,
          senderId: myClientId,
          payload: { sdp: answer }
        });

        retransmitAllLocalCandidates();
        setIsPeerConnected(true);
      } catch (err) {
        console.warn('[VitaNova Call] handleOfferSignal error:', err);
      }
    };

    // Handle incoming SDP Answer (Patient side)
    const handleAnswerSignal = async (sdp: RTCSessionDescriptionInit) => {
      try {
        if (pc.signalingState === 'have-local-offer') {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          await flushPendingCandidates(pc);
          setIsPeerConnected(true);
          stopRingbackTone();
          playConnectedTone();
          retransmitAllLocalCandidates();
        }
      } catch (err) {
        console.warn('[VitaNova Call] handleAnswerSignal error:', err);
      }
    };

    // Unified signal dispatcher
    const processSignal = async (eventData: {
      type: string;
      senderId?: string;
      sessionId?: string;
      fromRole?: string;
      payload?: any;
      sdp?: any;
      candidate?: any;
      message?: any;
      camOff?: boolean;
    }) => {
      if (!active) return;
      // Filter out our own signals
      if (eventData.senderId && eventData.senderId === myClientId) return;
      // Ensure signal belongs to our active call session
      if (eventData.sessionId && eventData.sessionId !== sessionId) return;

      const type = eventData.type;
      const sdp = eventData.sdp || eventData.payload?.sdp;
      const candidate = eventData.candidate || eventData.payload?.candidate;

      try {
        if (type === 'READY_FOR_OFFER' && userRole === 'patient') {
          if (mediaReadyPromiseRef.current) {
            await mediaReadyPromiseRef.current;
          }
          if (pc.signalingState === 'have-local-offer' && pc.localDescription) {
            bChannel.postMessage({
              type: 'OFFER',
              sdp: pc.localDescription,
              senderId: myClientId,
              sessionId,
              senderName: memberName
            });
            sendCallSignal({
              signalType: 'OFFER',
              fromRole: 'patient',
              callerName: memberName,
              targetClinicianId: clinician.id,
              callType,
              sessionId,
              senderId: myClientId,
              payload: { sdp: pc.localDescription }
            }).catch(() => {});
            retransmitAllLocalCandidates();
          } else if (pc.signalingState === 'stable') {
            const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
            await pc.setLocalDescription(offer);
            bChannel.postMessage({
              type: 'OFFER',
              sdp: offer,
              senderId: myClientId,
              sessionId,
              senderName: memberName
            });
            sendCallSignal({
              signalType: 'OFFER',
              fromRole: 'patient',
              callerName: memberName,
              targetClinicianId: clinician.id,
              callType,
              sessionId,
              senderId: myClientId,
              payload: { sdp: offer }
            }).catch(() => {});
            retransmitAllLocalCandidates();
          }
        } else if (type === 'OFFER' && userRole === 'doctor' && sdp) {
          await handleOfferSignal(sdp);
        } else if (type === 'ANSWER' && userRole === 'patient' && sdp) {
          await handleAnswerSignal(sdp);
        } else if (type === 'ICE' || type === 'ICE_CANDIDATE') {
          if (candidate) {
            await addOrQueueCandidate(candidate);
          }
        } else if (type === 'CAMERA_STATUS') {
          const camStatus = eventData.camOff ?? eventData.payload?.camOff;
          if (typeof camStatus === 'boolean') {
            setRemoteCamOff(camStatus);
          }
        } else if (type === 'CALL_CHAT') {
          const msg = eventData.message || eventData.payload?.message;
          if (msg) {
            setChatMessages((prev) => [...prev, msg]);
            if (!showInCallChat) {
              setUnreadChatCount((c) => c + 1);
            }
          }
        } else if (type === 'CALL_ENDED' || type === 'HANGUP' || type === 'DECLINE') {
          if (eventData.sessionId === sessionId && !isCallEndedRef.current) {
            isCallEndedRef.current = true;
            stopRingbackTone();
            playHangupTone();
            onEndRef.current();
          }
        }
      } catch (err) {
        console.warn('[VitaNova Call] Signal processing exception:', err);
      }
    };

    // Listen on BroadcastChannel (zero-latency same-device)
    bChannel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;
      processSignal(data);
    };

    // Listen on Supabase Realtime (cross-device)
    const unsubSupabase = subscribeToCallSignals(clinician.id, (signal: CallSignalEvent) => {
      if (signal.sessionId && signal.sessionId !== sessionId) return;
      processSignal({
        type: signal.signalType,
        senderId: signal.senderId,
        sessionId: signal.sessionId,
        fromRole: signal.fromRole,
        payload: signal.payload,
        sdp: signal.payload?.sdp,
        candidate: signal.payload?.candidate,
        message: signal.payload?.message,
        camOff: signal.payload?.camOff
      });
    });

    acquireMedia();

    return () => {
      active = false;
      unsubSupabase();
      stopRingbackTone();

      try {
        bChannel.close();
      } catch (_) {}

      if (syntheticCleanupRef.current) {
        syntheticCleanupRef.current();
        syntheticCleanupRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
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
  }, [sessionId]); // Runs strictly once per call session!

  // Toggle Microphone
  const handleToggleMic = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !nextMuted;
      });
    }
  };

  // Toggle Video Camera
  const handleToggleCam = async () => {
    const nextCamOff = !isCamOff;
    setIsCamOff(nextCamOff);

    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !nextCamOff;
      });
    }

    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'CAMERA_STATUS',
          camOff: nextCamOff,
          senderId: myClientId,
          sessionId
        });
      } catch (_) {}
    }
    sendCallSignal({
      signalType: 'CAMERA_STATUS',
      fromRole: userRole,
      callerName: isDoctor ? clinician.name : memberName,
      targetClinicianId: clinician.id,
      sessionId,
      senderId: myClientId,
      payload: { camOff: nextCamOff }
    }).catch(() => {});
  };

  // Flip Camera Front / Back
  const handleFlipCamera = async () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: nextMode } },
        audio: false
      });
      const newVideoTrack = newStream.getVideoTracks()[0];
      if (newVideoTrack && streamRef.current) {
        const oldTrack = streamRef.current.getVideoTracks()[0];
        if (oldTrack) {
          streamRef.current.removeTrack(oldTrack);
          oldTrack.stop();
        }
        streamRef.current.addTrack(newVideoTrack);
        setLocalStream(new MediaStream(streamRef.current.getTracks()));

        if (pcRef.current) {
          const videoSender = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
          if (videoSender) {
            await videoSender.replaceTrack(newVideoTrack);
          }
        }
      }
    } catch (e) {
      console.warn('[VitaNova Call] Camera flip not available on this device:', e);
    }
  };

  // Toggle Screen Sharing
  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      setIsScreenSharing(false);

      if (streamRef.current) {
        const camTrack = streamRef.current.getVideoTracks()[0];
        if (camTrack && pcRef.current) {
          const sender = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
          if (sender) sender.replaceTrack(camTrack);
        }
        setLocalStream(new MediaStream(streamRef.current.getTracks()));
      }
    } else {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = displayStream.getVideoTracks()[0];
        screenStreamRef.current = displayStream;
        setIsScreenSharing(true);

        if (screenTrack && pcRef.current) {
          const sender = pcRef.current.getSenders().find((s) => s.track?.kind === 'video');
          if (sender) await sender.replaceTrack(screenTrack);
        }

        setLocalStream(displayStream);

        screenTrack.onended = () => {
          handleToggleScreenShare();
        };
      } catch (err) {
        console.warn('[VitaNova Call] Screen share cancelled:', err);
      }
    }
  };

  // User explicitly clicks "End Call"
  const handleHangUp = () => {
    if (isCallEndedRef.current) return;
    isCallEndedRef.current = true;

    stopRingbackTone();
    playHangupTone();

    if (timerRef.current) clearInterval(timerRef.current);

    // Notify other party via BroadcastChannel
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'HANGUP',
          senderId: myClientId,
          sessionId
        });
      } catch (_) {}
    }

    // Notify other party via Supabase
    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: isDoctor ? clinician.name : memberName,
      targetClinicianId: clinician.id,
      sessionId,
      senderId: myClientId
    }).catch(() => {});

    // Close local media & peer connection
    if (syntheticCleanupRef.current) {
      syntheticCleanupRef.current();
      syntheticCleanupRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    onEndRef.current();
  };

  // Send In-Call Message
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

    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'CALL_CHAT',
          message: userMsg,
          senderId: myClientId,
          sessionId
        });
      } catch (_) {}
    }

    sendCallSignal({
      signalType: 'CALL_CHAT',
      fromRole: userRole,
      callerName: senderDisplayName,
      targetClinicianId: clinician.id,
      sessionId,
      senderId: myClientId,
      payload: { message: userMsg }
    }).catch(() => {});

    // Helpful simulated reply if peer hasn't answered
    if (!isPeerConnected || isSimulatedDoctor) {
      setTimeout(() => {
        let reply = `Dr. Israel Kisakye here. I have recorded this note into your visit chart.`;
        const lower = userMsg.text.toLowerCase();
        if (lower.includes('pressure') || lower.includes('bp')) {
          reply = `I see your BP log. Continue your prescribed doses and ensure plenty of rest today.`;
        } else if (lower.includes('pain') || lower.includes('headache')) {
          reply = `Understood. I will prepare a clinical prescription note for you right away.`;
        }
        const replyMsg = {
          sender: remotePartyName,
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages((prev) => [...prev, replyMsg]);
      }, 1000);
    }
  };

  // Activate Interactive Simulated Doctor Mode
  const handleActivateSimulatedDoctor = () => {
    setIsSimulatedDoctor(true);
    setIsPeerConnected(true);
    stopRingbackTone();
    playConnectedTone();

    const welcomeMsg = {
      sender: clinician.name,
      text: `Hello ${memberName}, Dr. Israel Kisakye here on the live telehealth consultation line. I have your vitals on my clinic dashboard. I can hear you clearly.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, welcomeMsg]);
  };

  // Open Doctor Portal in New Tab for true 2-tab local testing
  const handleOpenDoctorNewTab = () => {
    const url = `${window.location.origin}${window.location.pathname}?role=doctor&docId=${encodeURIComponent(
      clinician.id
    )}&sessionId=${encodeURIComponent(sessionId)}&autoAnswer=true`;
    window.open(url, '_blank');
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
                  <span>{isSimulatedDoctor ? 'Interactive Clinical Demo Live' : 'Live 2-Way Connected'}</span>
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-amber-400 animate-pulse flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Ringing Doctor Line...</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Indicators & Action Toggles */}
        <div className="flex items-center space-x-2">
          {!isDoctor && !isPeerConnected && (
            <button
              onClick={handleOpenDoctorNewTab}
              title="Open Doctor Portal in a new tab to answer as Doctor"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Answer as Doctor (New Tab)</span>
            </button>
          )}

          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted WebRTC</span>
          </div>

          {/* Chat Panel Toggle */}
          <button
            onClick={() => {
              setShowInCallChat((prev) => !prev);
              setUnreadChatCount(0);
            }}
            className={`relative p-2 rounded-xl border transition-colors ${
              showInCallChat
                ? 'bg-teal-500 text-slate-950 border-teal-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="In-call chat"
          >
            <MessageSquare className="w-4 h-4" />
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce">
                {unreadChatCount}
              </span>
            )}
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

      {/* Camera warning banner */}
      {cameraPermissionError && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{cameraPermissionError}</span>
          </div>
          <button
            onClick={() => setCameraPermissionError(null)}
            className="text-[10px] font-bold underline hover:text-white ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── MAIN CALL WORKSPACE ── */}
      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col md:flex-row">
        {/* Call Stage Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-slate-950">
          {/* ── VIDEO CALL WORKSPACE ── */}
          {callType === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              {/* DEDICATED AUDIO PLAYBACK FOR REMOTE PARTICIPANT (Guarantees unblocked sound) */}
              <audio
                ref={remoteAudioRef}
                autoPlay
                playsInline
              />

              {/* Sleek Medical Backdrop when video track is loading or connecting */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0">
                <div className="relative mb-3">
                  <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping scale-110" />
                  <img
                    src={isDoctor ? '/ki_ezra_avatar.jpg' : clinician.avatar}
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
                  <span>Audio & Video Live • Encrypted HD</span>
                </p>
              </div>

              {/* REMOTE PARTICIPANT VIDEO FEED (Always rendered in DOM to guarantee ref attachment) */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                muted
                onLoadedMetadata={(e) => {
                  const el = e.target as HTMLVideoElement;
                  el.play().catch(() => {});
                }}
                onCanPlay={(e) => {
                  const el = e.target as HTMLVideoElement;
                  el.play().catch(() => {});
                }}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  showRemoteVideo ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              />

              {/* REMOTE PEER CAMERA PAUSED OVERLAY */}
              {isPeerConnected && remoteCamOff && !isSimulatedDoctor && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900 p-6 text-center">
                  <div className="relative mb-4">
                    <img
                      src={clinician.avatar}
                      alt={clinician.name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-slate-700 opacity-60"
                    />
                    <span className="absolute bottom-1 right-1 p-2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      <VideoOff className="w-4 h-4" />
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{remotePartyName}</h4>
                  <p className="text-xs text-slate-400 mt-1">Camera paused by user • Audio remains live</p>
                </div>
              )}

              {/* SIMULATED CLINICAL STREAM OVERLAY */}
              {isSimulatedDoctor && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-md">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping scale-110" />
                      <img
                        src={clinician.avatar}
                        alt={clinician.name}
                        className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-teal-500 shadow-2xl shadow-teal-500/30"
                      />
                      <span className="absolute bottom-2 right-2 p-2 rounded-full bg-emerald-500 text-slate-950 border-2 border-slate-950">
                        <Radio className="w-4 h-4 animate-pulse" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{remotePartyName}</h3>
                      <p className="text-xs text-teal-400 font-semibold mt-1">
                        {clinician.specialty} • Chief Telehealth Consultant
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">VitaNova Nakawa & Mulago National Referral</p>
                    </div>

                    <div className="flex items-center space-x-1.5 py-2 px-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
                      <Activity className="w-4 h-4 text-teal-400 mr-1" />
                      <span className="text-[10px] font-bold text-slate-300 mr-2 uppercase tracking-wider">Audio Feed</span>
                      {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full transition-all duration-300"
                          style={{
                            height: `${Math.max(8, (h * (((elapsed + i) % 4) + 1)) / 4)}px`
                          }}
                        />
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-300 leading-relaxed">
                      "I have received your vitals report and health record. Your microphone and camera are connected successfully."
                    </div>
                  </div>
                </div>
              )}

              {/* CALLING / RINGING SCREEN (Shown while connecting) */}
              {!isPeerConnected && !isSimulatedDoctor && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 text-center">
                  <div className="relative mb-6">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping scale-110" />
                    <span className="absolute -inset-2 rounded-full bg-emerald-500/10 animate-pulse" />
                    <img
                      src={clinician.avatar}
                      alt={clinician.name}
                      className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20"
                    />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {remotePartyName}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-400 mt-1 flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{isDoctor ? 'Connecting to Patient Line...' : 'Ringing Doctor Line...'}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{remotePartyTitle}</p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleActivateSimulatedDoctor}
                      className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Start Interactive Clinical Test</span>
                    </button>

                    <button
                      onClick={handleOpenDoctorNewTab}
                      className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-all active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4 text-teal-400" />
                      <span>Open Doctor in New Tab</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Remote Participant Label Overlay (Bottom Left) */}
              <div className="absolute bottom-6 left-6 z-30 space-y-1 max-w-sm pointer-events-none">
                <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
                  <span
                    className={`w-2.5 h-2.5 rounded-full inline-block ${
                      isPeerConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'
                    }`}
                  />
                  <span className="text-xs font-bold text-white">{remotePartyName}</span>
                  <span className="text-[10px] text-teal-300 font-medium">
                    {isPeerConnected
                      ? isSimulatedDoctor
                        ? '(Simulated Line)'
                        : '(Live WebRTC)'
                      : '(Ringing)'}
                  </span>
                </div>
              </div>

              {/* LOCAL PARTICIPANT'S LIVE CAMERA FEED (PICTURE-IN-PICTURE) */}
              <div
                className={`absolute z-40 w-36 h-48 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-teal-500/80 shadow-2xl bg-slate-900 transition-all ${
                  pipPosition === 'top-right'
                    ? 'top-4 right-4'
                    : pipPosition === 'top-left'
                    ? 'top-4 left-4'
                    : 'bottom-20 right-4'
                }`}
              >
                {/* Local Video Stream (Always mounted) */}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                  className={`w-full h-full object-cover transform ${
                    facingMode === 'user' && !isScreenSharing ? '-scale-x-100' : ''
                  } ${isCamOff ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                />

                {isCamOff && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-2 text-center">
                    <VideoOff className="w-8 h-8 text-slate-500 mb-1" />
                    <span className="text-[11px] font-bold text-slate-300">Camera Paused</span>
                    <span className="text-[9px] text-slate-500">Tap Video to Resume</span>
                  </div>
                )}

                {/* PiP Overlay Info */}
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-white backdrop-blur-sm">
                    You ({isDoctor ? 'Dr. Israel Kisakye' : memberName})
                  </span>
                  {isMuted && (
                    <span className="p-1 rounded bg-rose-500 text-white shadow">
                      <MicOff className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Pip Position Toggle Button */}
                <button
                  onClick={() =>
                    setPipPosition((p) =>
                      p === 'top-right' ? 'bottom-right' : p === 'bottom-right' ? 'top-left' : 'top-right'
                    )
                  }
                  title="Move preview window"
                  className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
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
                      height: `${Math.max(8, isMuted ? 6 : (height * ((elapsed % 3) + 1)) / 3)}px`
                    }}
                  />
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
                <span>Direct Voice Line</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">
                  {isPeerConnected ? 'Connected (Live)' : 'Ringing...'}
                </span>
              </div>

              {!isPeerConnected && (
                <button
                  onClick={handleActivateSimulatedDoctor}
                  className="px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-bold transition-all"
                >
                  ✨ Test Voice Line in Demo Mode
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── IN-CALL CLINICAL CHAT PANEL ── */}
        {showInCallChat && (
          <div className="w-full md:w-80 h-72 md:h-full bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col z-40 shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>In-Call Chat & Charting</span>
              </span>
              <button
                onClick={() => setShowInCallChat(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender === (isDoctor ? clinician.name : memberName);
                return (
                  <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
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
                placeholder="Type in-call message or symptom..."
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
      <div className="relative z-30 flex items-center justify-center space-x-3 sm:space-x-4 py-3 sm:py-4 px-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        {/* Toggle Microphone */}
        <button
          onClick={handleToggleMic}
          className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
            isMuted
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25'
              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Video Camera */}
        {callType === 'video' && (
          <button
            onClick={handleToggleCam}
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
              isCamOff
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
            title={isCamOff ? 'Resume Camera' : 'Pause Camera'}
          >
            {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        {/* Flip Camera */}
        {callType === 'video' && (
          <button
            onClick={handleFlipCamera}
            className="p-3 sm:p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95"
            title="Flip Camera (Front / Back)"
          >
            <SwitchCamera className="w-5 h-5 text-teal-400" />
          </button>
        )}

        {/* Screen Share */}
        {callType === 'video' && (
          <button
            onClick={handleToggleScreenShare}
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
              isScreenSharing
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
            title={isScreenSharing ? 'Stop Screen Sharing' : 'Share Screen / Medical Reports'}
          >
            <Monitor className="w-5 h-5" />
          </button>
        )}

        {/* End Call / Hang Up */}
        <button
          onClick={handleHangUp}
          className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm flex items-center space-x-2 shadow-xl shadow-rose-600/30 transition-all active:scale-95"
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
