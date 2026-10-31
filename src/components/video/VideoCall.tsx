import React, { useEffect, useRef, useState, useCallback } from 'react';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import {
  PhoneOff,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  ShieldCheck,
  Loader2,
  WifiOff
} from 'lucide-react';

export interface VideoCallProps {
  roomUrl: string;
  token?: string;
  userName?: string;
  title?: string;
  subtitle?: string;
  callType?: 'video' | 'audio';
  onLeave?: () => void;
  onError?: (err: Error) => void;
}

type CallState = 'loading' | 'joining' | 'connected' | 'error' | 'ended';

export const VideoCall: React.FC<VideoCallProps> = ({
  roomUrl,
  token,
  userName = 'Participant',
  title = 'VitaNova Consultation',
  subtitle = 'Encrypted Video Line',
  callType = 'video',
  onLeave,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const callFrameRef = useRef<DailyCall | null>(null);
  const hasDestroyedRef = useRef(false);

  const onLeaveRef = useRef(onLeave);
  onLeaveRef.current = onLeave;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const [callState, setCallState] = useState<CallState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(callType === 'audio');
  const [durationSec, setDurationSec] = useState(0);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleEnd = useCallback(() => {
    if (hasDestroyedRef.current) return;
    hasDestroyedRef.current = true;
    setCallState('ended');
    try {
      callFrameRef.current?.leave();
    } catch (_) {}
    try {
      callFrameRef.current?.destroy();
    } catch (_) {}
    callFrameRef.current = null;
    setTimeout(() => onLeaveRef.current?.(), 200);
  }, []);

  // Build & join the Daily call frame
  useEffect(() => {
    if (!roomUrl) return;

    // Wait a tick for the container DOM to be ready
    const timer = setTimeout(() => {
      if (!containerRef.current || hasDestroyedRef.current) return;

      // Destroy any lingering frame from a previous mount
      if (callFrameRef.current) {
        try { callFrameRef.current.destroy(); } catch (_) {}
        callFrameRef.current = null;
      }
      containerRef.current.innerHTML = '';

      let localDestroyed = false;
      setCallState('loading');
      setErrorMessage(null);

      let frame: DailyCall;
      try {
        frame = DailyIframe.createFrame(containerRef.current, {
          iframeStyle: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: '#020617'
          },
          showLeaveButton: false,      // We provide our own End Call button
          showFullscreenButton: true,
          theme: {
            colors: {
              accent: '#0d9488',
              accentText: '#ffffff',
              background: '#090d16',
              baseText: '#f8fafc',
              mainAreaBg: '#020617',
              mainAreaBgAccent: '#0f172a'
            }
          }
        });
      } catch (initErr: any) {
        console.error('[Daily] createFrame error:', initErr);
        const msg = initErr?.message || 'Failed to initialize video frame';
        setErrorMessage(msg);
        setCallState('error');
        onErrorRef.current?.(new Error(msg));
        return;
      }

      callFrameRef.current = frame;

      frame.on('loading', () => {
        if (!localDestroyed) setCallState('loading');
      });

      frame.on('joining-meeting', () => {
        if (!localDestroyed) setCallState('joining');
      });

      frame.on('joined-meeting', () => {
        if (!localDestroyed) {
          setCallState('connected');
          // Auto-disable video for audio-only calls
          if (callType === 'audio') {
            try { frame.setLocalVideo(false); } catch (_) {}
          }
        }
      });

      frame.on('left-meeting', () => {
        if (!localDestroyed) handleEnd();
      });

      frame.on('participant-joined', () => {
        // Re-confirm connected state when another participant joins
        if (!localDestroyed) setCallState('connected');
      });

      frame.on('error', (e: any) => {
        if (localDestroyed) return;
        console.error('[Daily] frame error event:', e);
        const msg =
          e?.errorMsg ||
          e?.message ||
          'Video connection failed. Check your network and camera permissions.';
        setErrorMessage(msg);
        setCallState('error');
        onErrorRef.current?.(new Error(msg));
      });

      // Join the room
      frame
        .join({
          url: roomUrl,
          ...(token ? { token } : {}),
          userName
        })
        .catch((err: any) => {
          if (localDestroyed) return;
          console.error('[Daily] join() rejected:', err);
          const msg =
            err?.message ||
            'Could not connect to call room. Ensure camera/microphone access is allowed.';
          setErrorMessage(msg);
          setCallState('error');
          onErrorRef.current?.(new Error(msg));
        });

      return () => {
        localDestroyed = true;
        if (!hasDestroyedRef.current) {
          try { frame.leave(); } catch (_) {}
          try { frame.destroy(); } catch (_) {}
          callFrameRef.current = null;
        }
      };
    }, 50); // small tick so DOM is mounted

    return () => clearTimeout(timer);
  }, [roomUrl, token, userName, callType, handleEnd]);

  // Call duration timer
  useEffect(() => {
    if (callState !== 'connected') return;
    const t = setInterval(() => setDurationSec((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  // Toggle audio
  const toggleAudio = () => {
    const frame = callFrameRef.current;
    if (!frame) return;
    const next = !isAudioMuted;
    try { frame.setLocalAudio(!next); } catch (_) {}
    setIsAudioMuted(next);
  };

  // Toggle video
  const toggleVideo = () => {
    const frame = callFrameRef.current;
    if (!frame) return;
    const next = !isVideoMuted;
    try { frame.setLocalVideo(!next); } catch (_) {}
    setIsVideoMuted(next);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[10002] bg-slate-950 flex flex-col overflow-hidden select-none animate-in fade-in duration-200">
      {/* ── TOP HEADER ── */}
      <div className="h-14 bg-slate-900/95 backdrop-blur-md px-4 flex items-center justify-between shrink-0 border-b border-white/10 z-30">
        <div className="flex items-center space-x-2.5 min-w-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white truncate">{title}</span>
            <span className="text-[10px] text-slate-400 flex items-center space-x-1.5">
              <span>{subtitle}</span>
              <span>•</span>
              <span
                className={
                  callState === 'connected'
                    ? 'text-emerald-400 font-bold'
                    : 'text-amber-400 animate-pulse'
                }
              >
                {callState === 'connected'
                  ? fmt(durationSec)
                  : callState === 'joining'
                  ? 'Joining...'
                  : callState === 'error'
                  ? 'Connection failed'
                  : 'Connecting...'}
              </span>
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {callState === 'connected' && (
            <>
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-xl transition-all ${
                  isAudioMuted
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title={isAudioMuted ? 'Unmute mic' : 'Mute mic'}
              >
                {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {callType === 'video' && (
                <button
                  onClick={toggleVideo}
                  className={`p-2 rounded-xl transition-all ${
                    isVideoMuted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title={isVideoMuted ? 'Turn camera on' : 'Turn camera off'}
                >
                  {isVideoMuted ? (
                    <VideoOff className="w-4 h-4" />
                  ) : (
                    <VideoIcon className="w-4 h-4" />
                  )}
                </button>
              )}
            </>
          )}

          <button
            onClick={handleEnd}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-rose-600/30 transition-all"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Call</span>
          </button>
        </div>
      </div>

      {/* ── DAILY EMBED ── */}
      <div className="relative flex-1 w-full bg-slate-950 min-h-0 overflow-hidden">
        {/* The Daily.co iframe mounts here */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full bg-slate-950" />

        {/* Loading / Joining overlay */}
        {(callState === 'loading' || callState === 'joining') && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center pointer-events-none">
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-teal-500/40 flex items-center justify-center shadow-xl">
                <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {callState === 'joining' ? 'Joining consultation room...' : 'Preparing secure room...'}
            </h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Private encrypted line via Daily.co
            </p>
          </div>
        )}

        {/* Error overlay */}
        {callState === 'error' && (
          <div className="absolute inset-0 z-40 bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <WifiOff className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-rose-300 mb-2">Connection Failed</h4>
            <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
              {errorMessage || 'Unable to connect to the video room. Check your network and allow camera / microphone access.'}
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  // Signal parent to retry with fresh room fetch
                  onLeaveRef.current?.();
                }}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all"
              >
                Retry
              </button>
              <button
                onClick={handleEnd}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
