import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  PhoneOff,
  Video,
  Phone,
  ShieldCheck,
  Activity,
  Maximize2,
  Minimize2,
  AlertCircle
} from 'lucide-react';
import { HealthcareWorker } from '../../types';
import {
  sendCallSignal,
  subscribeToCallSignals,
  updateCallLogBySession
} from '../../lib/supabase';
import {
  startRingbackTone,
  stopRingbackTone,
  playConnectedTone,
  playHangupTone
} from '../../lib/callSounds';

declare global {
  interface Window {
    JitsiMeetExternalAPI?: any;
  }
}

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  userRole?: 'doctor' | 'patient';
  memberName: string;
  callerName?: string;
  sessionId?: string;
  onEnd: () => void;
}

/** Dynamically load Jitsi Meet External API script once */
function loadJitsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      resolve();
      return;
    }
    const existing = document.getElementById('jitsi-external-api');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Jitsi API')));
      return;
    }
    const script = document.createElement('script');
    script.id = 'jitsi-external-api';
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Jitsi API'));
    document.body.appendChild(script);
  });
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician,
  callType,
  userRole = 'patient',
  memberName,
  sessionId: propSessionId,
  onEnd
}) => {
  const [sessionId] = useState<string>(
    () => propSessionId || `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [duration, setDuration] = useState<number>(0);
  const [hasRemoteParticipant, setHasRemoteParticipant] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const durationRef = useRef(0);
  durationRef.current = duration;
  const isEndedRef = useRef(false);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Safe hangup & cleanup
  const handleEndCall = useCallback(() => {
    if (isEndedRef.current) return;
    isEndedRef.current = true;

    stopRingbackTone();
    playHangupTone();
    setCallStatus('ended');

    // Update call log in Supabase with final duration
    updateCallLogBySession(sessionId, {
      status: 'ended',
      endedAt: new Date().toISOString(),
      durationSec: durationRef.current
    }).catch(() => {});

    // Broadcast hangup signal so other participant's modal closes
    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: memberName,
      targetClinicianId: clinician.id,
      callType,
      sessionId
    }).catch(() => {});

    try {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    } catch (_) {}

    setTimeout(() => {
      onEndRef.current();
    }, 400);
  }, [sessionId, userRole, memberName, clinician.id, callType]);

  // Listen for remote hangup signal
  useEffect(() => {
    const unsub = subscribeToCallSignals(clinician.id, (sig) => {
      if (sig.sessionId && sig.sessionId !== sessionId) return;
      if (sig.signalType === 'HANGUP' || sig.signalType === 'DECLINE') {
        handleEndCall();
      }
    });
    return () => {
      unsub();
    };
  }, [clinician.id, sessionId, handleEndCall]);

  // Initialize Jitsi Meet Conference
  useEffect(() => {
    let active = true;

    // Start ringback tone for caller while connecting
    if (userRole === 'patient') {
      startRingbackTone();
    }

    const initJitsi = async () => {
      try {
        await loadJitsiScript();
        if (!active || !containerRef.current) return;

        // Clean room name suitable for Jitsi
        const cleanRoom = `VitaNova_${sessionId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
        const displayName = memberName?.trim() || (userRole === 'doctor' ? clinician.name : 'Patient');

        const domain = 'meet.jit.si';
        const options = {
          roomName: cleanRoom,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          userInfo: {
            displayName
          },
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: callType === 'audio',
            prejoinPageEnabled: false,
            prejoinConfig: { enabled: false },
            disableDeepLinking: true,
            enableWelcomePage: false,
            enableClosePage: false,
            hideConferenceSubject: true,
            hideConferenceTimer: false,
            subject: `VitaNova Telehealth • ${clinician.name}`,
            toolbarButtons: [
              'microphone',
              'camera',
              'hangup',
              'chat',
              'tileview',
              'toggle-camera',
              'videoquality',
              'fullscreen'
            ]
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            SHOW_POWERED_BY: false,
            DEFAULT_REMOTE_DISPLAY_NAME: clinician.name,
            TOOLBAR_ALWAYS_VISIBLE: true
          }
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        apiRef.current = api;

        api.addEventListener('videoConferenceJoined', () => {
          if (!active) return;
          stopRingbackTone();
          playConnectedTone();
          setCallStatus('connected');

          // Mark call as answered in Supabase
          updateCallLogBySession(sessionId, {
            status: 'answered',
            answeredAt: new Date().toISOString()
          }).catch(() => {});
        });

        api.addEventListener('participantJoined', () => {
          if (!active) return;
          setHasRemoteParticipant(true);
        });

        api.addEventListener('participantLeft', () => {
          if (!active) return;
          setHasRemoteParticipant(false);
        });

        api.addEventListener('videoConferenceLeft', () => {
          handleEndCall();
        });

        api.addEventListener('readyToClose', () => {
          handleEndCall();
        });
      } catch (err: any) {
        console.error('[VideoCallModal] Jitsi load error:', err);
        if (active) {
          stopRingbackTone();
          setLoadError(err?.message || 'Could not connect to video server. Please check internet connection.');
        }
      }
    };

    initJitsi();

    return () => {
      active = false;
      stopRingbackTone();
      try {
        if (apiRef.current) {
          apiRef.current.dispose();
          apiRef.current = null;
        }
      } catch (_) {}
    };
  }, [sessionId, callType, clinician.name, memberName, userRole, handleEndCall]);

  // Duration timer when connected
  useEffect(() => {
    if (callStatus !== 'connected') return;
    const interval = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

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
      {/* ── Top Bar: Telehealth Status & Controls ── */}
      <header className="h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={clinician.avatar || '/ki_ezra_avatar.jpg'}
              alt={clinician.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 shadow"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                callStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400 animate-ping'
              }`}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-extrabold text-white truncate">{clinician.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 shrink-0">
                {callType === 'video' ? 'Video Call' : 'Voice Call'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center space-x-1.5 truncate">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Encrypted VitaNova Telehealth</span>
              {callStatus === 'connected' && hasRemoteParticipant && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">Both Connected</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Center: Live Call Timer */}
        <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
          <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            {callStatus === 'connected' ? formatDuration(duration) : 'Connecting...'}
          </span>
        </div>

        {/* Right Action: Fullscreen & Hangup */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              if (apiRef.current) {
                try {
                  apiRef.current.executeCommand('hangup');
                } catch (_) {}
              }
              handleEndCall();
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-rose-600/30 transition-all"
            title="End Telehealth Call"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="hidden sm:inline">End Call</span>
          </button>
        </div>
      </header>

      {/* ── Main Call Area ── */}
      <div className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden">
        {/* Loading / Connecting Overlay */}
        {callStatus === 'connecting' && !loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950">
            <div className="relative mb-6">
              <span className="absolute inset-0 rounded-full bg-teal-500/25 animate-ping" />
              <span className="absolute -inset-4 rounded-full bg-teal-500/15 animate-pulse" />
              <img
                src={clinician.avatar || '/ki_ezra_avatar.jpg'}
                alt={clinician.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-2xl"
              />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">{clinician.name}</h3>
            <p className="text-sm font-semibold text-teal-400 mt-1">{clinician.specialty}</p>
            <p className="text-xs text-slate-400 mt-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
              <span>Establishing secure connection across devices...</span>
            </p>
          </div>
        )}

        {/* Load Error State */}
        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950 text-center">
            <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
            <h3 className="text-base font-bold text-white">Connection Error</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">{loadError}</p>
            <button
              onClick={handleEndCall}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        )}

        {/* Jitsi Meet Container — Fills the whole screen */}
        <div
          ref={containerRef}
          className="w-full h-full"
          style={{ visibility: callStatus === 'connected' ? 'visible' : 'hidden' }}
        />
      </div>
    </div>
  );
};
