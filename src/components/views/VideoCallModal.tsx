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
  Maximize2
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
  const apiRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [elapsed, setElapsed] = useState(0);          // seconds elapsed
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(callType === 'audio');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Unique room per call — formatted as vitanova-clinicianid-timestamp
  const roomName = `vitanova-${clinician.id.replace(/_/g, '-')}-${Date.now()}`;

  // Format MM:SS from seconds
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // Load Jitsi External API script then mount the meeting
  useEffect(() => {
    let mounted = true;

    const loadJitsi = () => {
      if (window.JitsiMeetExternalAPI) {
        mountMeeting();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => { if (mounted) mountMeeting(); };
      script.onerror = () => { if (mounted) setLoadError(true); };
      document.head.appendChild(script);
    };

    const mountMeeting = () => {
      if (!jitsiContainerRef.current || !mounted) return;

      try {
        const options = {
          roomName,
          parentNode: jitsiContainerRef.current,
          width: '100%',
          height: '100%',
          userInfo: {
            displayName: memberName,
          },
          configOverwrite: {
            // Start muted based on call type
            startWithAudioMuted: false,
            startWithVideoMuted: callType === 'audio',
            startAudioOnly: callType === 'audio',
            // Clean minimal UI for healthcare
            disableDeepLinking: true,
            enableClosePage: false,
            prejoinPageEnabled: false,
            // Disable non-essential features
            disableInviteFunctions: true,
            doNotStoreRoom: true,
            enableWelcomePage: false,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: callType === 'video'
              ? ['microphone', 'camera', 'desktop', 'chat', 'fullscreen', 'settings', 'hangup']
              : ['microphone', 'chat', 'fullscreen', 'settings', 'hangup'],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            SHOW_POWERED_BY: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            DEFAULT_BACKGROUND: '#0f172a',
            DEFAULT_REMOTE_DISPLAY_NAME: clinician.name,
            APP_NAME: 'VitaNova Clinic Call',
            NATIVE_APP_NAME: 'VitaNova Clinic',
            PROVIDER_NAME: 'VitaNova Clinic Uganda',
          },
        };

        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);

        // Events
        apiRef.current.addListener('videoConferenceJoined', () => {
          if (mounted) {
            setIsLoading(false);
            // Start call timer
            timerRef.current = setInterval(() => {
              setElapsed(e => e + 1);
            }, 1000);
          }
        });

        apiRef.current.addListener('videoConferenceLeft', () => {
          onEnd();
        });

        apiRef.current.addListener('readyToClose', () => {
          onEnd();
        });

        apiRef.current.addListener('audioMuteStatusChanged', ({ muted }: { muted: boolean }) => {
          if (mounted) setIsMuted(muted);
        });

        apiRef.current.addListener('videoMuteStatusChanged', ({ muted }: { muted: boolean }) => {
          if (mounted) setIsCamOff(muted);
        });

        // Fallback: mark loaded after 8s even if event didn't fire
        setTimeout(() => { if (mounted) setIsLoading(false); }, 8000);

      } catch (err) {
        console.error('[VitaNova Call] Jitsi init error:', err);
        if (mounted) setLoadError(true);
      }
    };

    loadJitsi();

    return () => {
      mounted = false;
      if (timerRef.current) clearInterval(timerRef.current);
      if (apiRef.current) {
        try { apiRef.current.dispose(); } catch (_) {}
        apiRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mic toggle via Jitsi API
  const handleToggleMic = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio');
    }
  };

  // Camera toggle via Jitsi API
  const handleToggleCam = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleVideo');
    }
  };

  // End call
  const handleHangUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (apiRef.current) {
      try { apiRef.current.executeCommand('hangup'); } catch (_) {}
    }
    onEnd();
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col bg-slate-950 ${
        isFullscreen ? '' : 'sm:p-4'
      }`}
    >
      {/* ── TOP BAR ── clinician info + call status ── */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-safe-top pt-3 pb-2 bg-gradient-to-b from-slate-950/95 to-transparent">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <img
              src={clinician.avatar}
              alt={clinician.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500/50"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-white leading-tight">{clinician.name}</p>
            <div className="flex items-center space-x-1.5">
              <span className={`text-[10px] font-bold ${callType === 'video' ? 'text-teal-400' : 'text-amber-400'}`}>
                {callType === 'video' ? '📹 Video Call' : '📞 Voice Call'}
              </span>
              {!isLoading && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-[10px] text-slate-300 font-mono">{formatTime(elapsed)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Network indicator */}
        <div className="flex items-center space-x-1.5">
          {navigator.onLine ? (
            <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold">
              <Wifi className="w-3 h-3" />
              <span className="hidden sm:inline">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-rose-400 text-[10px] font-bold">
              <WifiOff className="w-3 h-3" />
              <span>No Internet</span>
            </div>
          )}
          <button
            onClick={() => setIsFullscreen(f => !f)}
            className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── JITSI IFRAME CONTAINER ── fills all remaining space ── */}
      <div className="flex-1 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900">
        {/* Jitsi mounts here */}
        <div ref={jitsiContainerRef} className="w-full h-full" />

        {/* Loading overlay */}
        {isLoading && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10 space-y-5">
            <div className="relative">
              <img
                src={clinician.avatar}
                alt={clinician.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-teal-500/40 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-3xl border-4 border-teal-400 animate-ping opacity-30" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-white font-bold text-base">Connecting to {clinician.name}…</p>
              <p className="text-slate-400 text-xs">{clinician.specialty}</p>
              <p className="text-teal-400 text-[11px] font-medium animate-pulse mt-2">
                {callType === 'video' ? 'Starting video call via VitaNova…' : 'Starting voice call via VitaNova…'}
              </p>
            </div>
            <div className="flex space-x-1.5">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error overlay */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10 space-y-4 p-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <WifiOff className="w-8 h-8 text-rose-400" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-white font-bold">Could Not Start Call</p>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                Unable to connect to the VitaNova calling service. Please check your internet connection and try again.
              </p>
            </div>
            <button
              onClick={onEnd}
              className="px-5 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold"
            >
              Go Back
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CONTROLS ── always visible above the iframe ── */}
      <div className="relative z-10 pb-safe-bottom pb-4 pt-3 px-4 flex items-center justify-center space-x-4 bg-gradient-to-t from-slate-950/95 to-transparent">
        {/* Mute Mic */}
        <button
          onClick={handleToggleMic}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
            isMuted
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
          }`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {/* End Call — centre, most prominent */}
        <button
          onClick={handleHangUp}
          title="End call"
          className="w-16 h-16 rounded-2xl bg-rose-500 hover:bg-rose-400 border border-rose-400 text-white flex items-center justify-center transition-all active:scale-95 shadow-xl shadow-rose-500/30"
        >
          <PhoneOff className="w-7 h-7" />
        </button>

        {/* Toggle Camera (only meaningful for video calls) */}
        {callType === 'video' ? (
          <button
            onClick={handleToggleCam}
            title={isCamOff ? 'Turn on camera' : 'Turn off camera'}
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
              isCamOff
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isCamOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        ) : (
          <button
            title="Voice call active"
            className="w-14 h-14 rounded-2xl border border-teal-500/30 bg-teal-500/10 text-teal-300 flex items-center justify-center shadow-lg cursor-default"
          >
            <Phone className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCallModal;
