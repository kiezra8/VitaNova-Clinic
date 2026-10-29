import React, { useEffect, useRef, useState, useCallback } from 'react';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { PhoneOff, Mic, MicOff, Video as VideoIcon, VideoOff, ShieldCheck, Loader2 } from 'lucide-react';

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
  const onLeaveRef = useRef(onLeave);
  onLeaveRef.current = onLeave;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const [callState, setCallState] = useState<'loading' | 'joining' | 'connected' | 'error' | 'ended'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(callType === 'audio');
  const [durationSec, setDurationSec] = useState(0);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleEnd = useCallback(() => {
    setCallState('ended');
    try {
      callFrameRef.current?.leave();
    } catch (_) {}
    onLeaveRef.current?.();
  }, []);

  // Initialize Daily Prebuilt Frame
  useEffect(() => {
    if (!containerRef.current || !roomUrl) return;

    let destroyed = false;
    setCallState('loading');
    setErrorMessage(null);

    // Clean container before mount
    containerRef.current.innerHTML = '';

    const frame = DailyIframe.createFrame(containerRef.current, {
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0px',
        backgroundColor: '#020617'
      },
      showLeaveButton: true,
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

    callFrameRef.current = frame;

    frame.on('loading', () => {
      if (!destroyed) setCallState('loading');
    });

    frame.on('joining-meeting', () => {
      if (!destroyed) setCallState('joining');
    });

    frame.on('joined-meeting', () => {
      if (!destroyed) {
        setCallState('connected');
        if (callType === 'audio') {
          frame.setLocalVideo(false);
        }
      }
    });

    frame.on('left-meeting', () => {
      if (!destroyed) {
        handleEnd();
      }
    });

    frame.on('error', (e: any) => {
      if (!destroyed) {
        console.error('[Daily VideoCall] Frame error:', e);
        const msg = e?.errorMsg || 'Connection to video room failed';
        setErrorMessage(msg);
        setCallState('error');
        onErrorRef.current?.(new Error(msg));
      }
    });

    // Join room directly without redirecting to Daily's website
    frame
      .join({
        url: roomUrl,
        token: token || undefined,
        userName
      })
      .catch((err: any) => {
        if (!destroyed) {
          console.error('[Daily VideoCall] Join error:', err);
          const msg = err?.message || 'Could not join call room';
          setErrorMessage(msg);
          setCallState('error');
          onErrorRef.current?.(err);
        }
      });

    return () => {
      destroyed = true;
      try {
        frame.destroy();
      } catch (_) {}
      callFrameRef.current = null;
    };
  }, [roomUrl, token, userName, callType, handleEnd]);

  // Duration Timer
  useEffect(() => {
    if (callState !== 'connected') return;
    const t = setInterval(() => setDurationSec((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  // Toggle Audio
  const toggleAudio = () => {
    if (!callFrameRef.current) return;
    const next = !isAudioMuted;
    callFrameRef.current.setLocalAudio(!next);
    setIsAudioMuted(next);
  };

  // Toggle Video
  const toggleVideo = () => {
    if (!callFrameRef.current) return;
    const next = !isVideoMuted;
    callFrameRef.current.setLocalVideo(!next);
    setIsVideoMuted(next);
  };

  return (
    <div className="fixed inset-0 z-[10002] bg-slate-950 flex flex-col overflow-hidden select-none animate-in fade-in duration-200">
      {/* ── TOP HEADER BAR ── */}
      <div className="h-14 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 border-b border-white/10">
        <div className="flex items-center space-x-2.5 min-w-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white truncate">{title}</span>
            <span className="text-[10px] text-slate-400 flex items-center space-x-1.5">
              <span>{subtitle}</span>
              <span>•</span>
              <span
                className={
                  callState === 'connected' ? 'text-emerald-400 font-bold' : 'text-amber-400 animate-pulse'
                }
              >
                {callState === 'connected'
                  ? fmt(durationSec)
                  : callState === 'joining'
                  ? 'Joining room...'
                  : 'Connecting...'}
              </span>
            </span>
          </div>
        </div>

        {/* Top Controls & Exit */}
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
                title={isAudioMuted ? 'Unmute' : 'Mute'}
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
                  {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <VideoIcon className="w-4 h-4" />}
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

      {/* ── DAILY PREBUILT EMBED CONTAINER ── */}
      <div className="relative flex-1 w-full bg-slate-950 min-h-0 overflow-hidden">
        <div ref={containerRef} className="w-full h-full bg-slate-950" />

        {/* Loading Overlay */}
        {(callState === 'loading' || callState === 'joining') && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center">
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-teal-500/40 flex items-center justify-center shadow-xl">
                <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {callState === 'joining' ? 'Connecting to Consultation...' : 'Preparing Secure Room...'}
            </h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Direct encrypted healthcare consultation line powered by Daily
            </p>
          </div>
        )}

        {/* Error Overlay */}
        {callState === 'error' && (
          <div className="absolute inset-0 z-40 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
              <PhoneOff className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-rose-400 mb-1">Call Connection Failed</h4>
            <p className="text-xs text-slate-300 max-w-xs mb-4">
              {errorMessage || 'Unable to establish secure connection to the room.'}
            </p>
            <button
              onClick={handleEnd}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

