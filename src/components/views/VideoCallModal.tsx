import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PhoneOff, ShieldCheck } from 'lucide-react';
import { HealthcareWorker } from '../../types';
import { sendCallSignal, subscribeToCallSignals, updateCallLogBySession } from '../../lib/supabase';
import { stopRingbackTone, playHangupTone } from '../../lib/callSounds';

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

/** Load Jitsi IFrame API script (cached after first load) */
function ensureJitsiLoaded(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) { resolve(); return; }
    const existing = document.getElementById('jitsi-api-script');
    if (existing) {
      const check = setInterval(() => {
        if (window.JitsiMeetExternalAPI) { clearInterval(check); resolve(); }
      }, 100);
      setTimeout(() => { clearInterval(check); reject(new Error('Jitsi load timeout')); }, 15000);
      return;
    }
    const s = document.createElement('script');
    s.id = 'jitsi-api-script';
    s.src = 'https://meet.jit.si/external_api.js';
    s.async = true;
    s.onload = () => {
      const check = setInterval(() => {
        if (window.JitsiMeetExternalAPI) { clearInterval(check); resolve(); }
      }, 50);
      setTimeout(() => { clearInterval(check); resolve(); }, 3000);
    };
    s.onerror = () => reject(new Error('Network error loading Jitsi'));
    document.body.appendChild(s);
  });
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician, callType, userRole = 'patient', memberName, callerName, sessionId: propSessionId, onEnd
}) => {
  const [sessionId] = useState(() => propSessionId || `vn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  const endedRef = useRef(false);

  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<'loading' | 'live' | 'ended'>('loading');
  const [error, setError] = useState<string | null>(null);
  const durationRef = useRef(0);
  durationRef.current = duration;

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const endCall = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    stopRingbackTone();
    playHangupTone();
    setStatus('ended');
    updateCallLogBySession(sessionId, { status: 'ended', endedAt: new Date().toISOString(), durationSec: durationRef.current }).catch(() => {});
    sendCallSignal({ signalType: 'HANGUP', fromRole: userRole, callerName: memberName, targetClinicianId: clinician.id, callType, sessionId }).catch(() => {});
    try { apiRef.current?.dispose(); apiRef.current = null; } catch (_) {}
    setTimeout(() => onEndRef.current(), 300);
  }, [sessionId, userRole, memberName, clinician.id, callType]);

  // Listen for remote hangup
  useEffect(() => {
    const unsub = subscribeToCallSignals(clinician.id, (sig) => {
      if (sig.sessionId && sig.sessionId !== sessionId) return;
      if (sig.signalType === 'HANGUP' || sig.signalType === 'DECLINE') endCall();
    });
    return () => unsub();
  }, [clinician.id, sessionId, endCall]);

  // Launch Jitsi
  useEffect(() => {
    let alive = true;
    stopRingbackTone();

    (async () => {
      try {
        await ensureJitsiLoaded();
        if (!alive || !containerRef.current || !window.JitsiMeetExternalAPI) return;

        // Clean container in case of re-mount
        containerRef.current.innerHTML = '';

        const cleanSession = sessionId.toLowerCase().replace(/[^a-z0-9]/g, '');
        const room = `vitanova_${cleanSession}`;
        const displayName = memberName?.trim() || (userRole === 'doctor' ? 'Doctor' : 'Patient');

        const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: room,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          userInfo: { displayName },
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
            subject: ' ',
            toolbarButtons: ['microphone', 'camera', 'hangup', 'tileview', 'toggle-camera', 'fullscreen']
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            DEFAULT_REMOTE_DISPLAY_NAME: userRole === 'doctor' ? (callerName || 'Patient') : clinician.name,
            TOOLBAR_ALWAYS_VISIBLE: true,
            FILM_STRIP_MAX_HEIGHT: 120,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
          }
        });
        apiRef.current = api;

        api.addEventListener('videoConferenceJoined', () => {
          if (!alive) return;
          setStatus('live');
          updateCallLogBySession(sessionId, { status: 'answered', answeredAt: new Date().toISOString() }).catch(() => {});
        });
        api.addEventListener('videoConferenceLeft', () => endCall());
        api.addEventListener('readyToClose', () => endCall());
      } catch (err: any) {
        if (alive) setError(err?.message || 'Could not start call');
      }
    })();

    return () => { alive = false; try { apiRef.current?.dispose(); apiRef.current = null; } catch (_) {} };
  }, [sessionId, callType, clinician.name, memberName, userRole, callerName, endCall]);

  // Timer
  useEffect(() => {
    if (status !== 'live') return;
    const t = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-hidden">
      {/* Minimal top bar */}
      <div className="h-12 bg-black/80 backdrop-blur-sm px-3 flex items-center justify-between shrink-0 z-30 border-b border-white/10">
        <div className="flex items-center space-x-2 min-w-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold text-white truncate">
            {userRole === 'doctor' ? (callerName || 'Patient') : clinician.name}
          </span>
          {status === 'live' && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
              {fmt(duration)}
            </span>
          )}
        </div>
        <button
          onClick={() => { try { apiRef.current?.executeCommand('hangup'); } catch (_) {} endCall(); }}
          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center space-x-1 transition-all"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>End</span>
        </button>
      </div>

      {/* Jitsi fills the rest of the screen */}
      <div className="flex-1 w-full bg-black min-h-0 relative">
        <div ref={containerRef} className="w-full h-full" />

        {/* Loading state while Jitsi initializes */}
        {status === 'loading' && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 pointer-events-none">
            <div className="w-9 h-9 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-300">Connecting secure call...</p>
            <p className="text-[10px] text-slate-500 mt-1">Please allow camera and mic permissions</p>
          </div>
        )}
      </div>

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-6 text-center">
          <p className="text-sm text-rose-400 font-bold mb-1">Call Error</p>
          <p className="text-xs text-slate-400 max-w-xs">{error}</p>
          <button onClick={endCall} className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">Close</button>
        </div>
      )}
    </div>
  );
};
