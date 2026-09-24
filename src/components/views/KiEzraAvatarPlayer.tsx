import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, ArrowRight, Sparkles, Mic } from 'lucide-react';

// ── Narration script ────────────────────────────────────────────────────────
const NARRATION_SCRIPT = `Welcome. My name is Ezra. And this is the genesis of our journey.
It started with a question that kept me up at night: Why do so many people get sick and never find out why?
Not because medicine doesn't have the answers.
But because the answers were locked away in textbooks, in clinics, behind appointments that take weeks to get.
We built VitaNova to change that.
Every disease known to mankind. Every symptom. Every treatment. Every prevention strategy.
Explained in plain language. Available to you right now.
This is not just a health app.
This is a revolution in how Africa understands its own health.
Welcome to VitaNova. Welcome to the future of your health.`;

const SCRIPT_CHUNKS = NARRATION_SCRIPT.split('\n').filter(l => l.trim().length > 0);

interface KiEzraAvatarPlayerProps {
  onNavigateToEducation?: () => void;
}

export const KiEzraAvatarPlayer: React.FC<KiEzraAvatarPlayerProps> = ({ onNavigateToEducation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [mouthFrame, setMouthFrame] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mouthAnimRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const estimatedDuration = NARRATION_SCRIPT.length * 55 * 0.88;

  const startMouthAnim = useCallback(() => {
    if (mouthAnimRef.current) clearInterval(mouthAnimRef.current);
    mouthAnimRef.current = setInterval(() => {
      setMouthFrame(f => (f + 1) % 4);
    }, 120);
  }, []);

  const stopMouthAnim = useCallback(() => {
    if (mouthAnimRef.current) { clearInterval(mouthAnimRef.current); mouthAnimRef.current = null; }
    setMouthFrame(0);
  }, []);

  const stopAll = useCallback(() => {
    window.speechSynthesis.cancel();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    stopMouthAnim();
    setIsSpeaking(false);
    setIsPlaying(false);
  }, [stopMouthAnim]);

  const startNarration = useCallback(() => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(NARRATION_SCRIPT);
    utter.rate = 0.88;
    utter.pitch = 0.92;
    utter.volume = isMuted ? 0 : 1;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('male'))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
    if (preferred) utter.voice = preferred;

    utter.onstart = () => {
      setIsSpeaking(true);
      startTimeRef.current = Date.now();
      startMouthAnim();

      let lineTimer = 0;
      SCRIPT_CHUNKS.forEach((line, idx) => {
        const delay = line.length * 55 * 0.88 + 300;
        setTimeout(() => setCurrentLineIdx(idx), lineTimer);
        lineTimer += delay;
      });

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = setInterval(() => {
        const pct = Math.min(((Date.now() - startTimeRef.current) / estimatedDuration) * 100, 99);
        setProgress(pct);
      }, 200);
    };

    utter.onend = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
      setIsFinished(true);
      setProgress(100);
      setCurrentLineIdx(-1);
      stopMouthAnim();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    utter.onerror = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
      stopMouthAnim();
    };

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [isMuted, startMouthAnim, stopMouthAnim, estimatedDuration]);

  const handlePlayPause = useCallback(() => {
    if (!hasStarted || isFinished) {
      setHasStarted(true);
      setIsFinished(false);
      setProgress(0);
      setCurrentLineIdx(-1);
      setIsPlaying(true);
      startNarration();
      return;
    }
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsSpeaking(false);
      stopMouthAnim();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    } else {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsSpeaking(true);
      startMouthAnim();
      startTimeRef.current = Date.now() - (progress / 100) * estimatedDuration;
      progressIntervalRef.current = setInterval(() => {
        const pct = Math.min(((Date.now() - startTimeRef.current) / estimatedDuration) * 100, 99);
        setProgress(pct);
      }, 200);
    }
  }, [hasStarted, isFinished, isPlaying, progress, startNarration, startMouthAnim, stopMouthAnim, estimatedDuration]);

  const handleRestart = useCallback(() => {
    stopAll();
    setHasStarted(true);
    setIsFinished(false);
    setProgress(0);
    setCurrentLineIdx(-1);
    setIsPlaying(true);
    setTimeout(() => startNarration(), 80);
  }, [stopAll, startNarration]);

  const handleMuteToggle = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (utteranceRef.current) utteranceRef.current.volume = next ? 0 : 1;
      return next;
    });
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  const mouthPaths = [
    'M 38 56 Q 50 58 62 56',
    'M 38 56 Q 50 62 62 56',
    'M 38 56 Q 50 67 62 56',
    'M 38 56 Q 50 62 62 56',
  ];

  const currentLine = currentLineIdx >= 0 ? SCRIPT_CHUNKS[currentLineIdx] ?? '' : '';

  return (
    <div className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span>AI Health Talks</span>
        </h2>
        {onNavigateToEducation && (
          <button
            onClick={onNavigateToEducation}
            className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-0.5 transition-colors"
          >
            <span>All Videos</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Avatar Player Card */}
      <div
        className="relative rounded-3xl overflow-hidden border border-slate-700/60"
        style={{
          background: 'linear-gradient(135deg, #0d1b2a 0%, #0a1628 60%, #071120 100%)',
          boxShadow: isSpeaking
            ? '0 0 40px rgba(34,211,238,0.22), 0 20px 50px rgba(0,0,0,0.6)'
            : '0 20px 50px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* Pulse rings when speaking */}
        {isSpeaking && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            <div className="absolute inset-0" style={{ animation: 'pulseRingInner 2.5s ease-out infinite', border: '1px solid rgba(34,211,238,0.08)', borderRadius: '24px' }} />
          </div>
        )}

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch" style={{ minHeight: '260px' }}>

          {/* ── Avatar portrait ───────────────────── */}
          <div className="relative overflow-hidden flex-shrink-0" style={{ width: '190px', minWidth: '150px' }}>
            <img
              src="/genesis_thumb.jpg"
              alt="K.I Ezra AI Avatar"
              className="w-full h-full object-cover object-top"
              style={{ minHeight: '260px' }}
            />

            {/* Teal shimmer on speaking */}
            {isSpeaking && (
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: '100px',
                  background: 'linear-gradient(to top, rgba(34,211,238,0.18) 0%, transparent 100%)',
                  animation: 'shimmer 1.8s ease-in-out infinite alternate',
                }}
              />
            )}

            {/* SVG lip-sync overlay */}
            <svg
              className="absolute pointer-events-none"
              style={{
                width: '68px',
                height: '26px',
                bottom: '148px',
                left: '50%',
                transform: 'translateX(-52%)',
                opacity: isSpeaking ? 0.72 : 0,
                transition: 'opacity 0.3s',
                mixBlendMode: 'overlay',
              }}
              viewBox="0 0 100 80"
            >
              <path d="M 35 50 Q 50 44 65 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path
                d={mouthPaths[mouthFrame]}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                fill="rgba(0,0,0,0.12)"
                strokeLinecap="round"
              />
            </svg>

            {/* LIVE badge */}
            <div
              className="absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 rounded-full text-[9px] font-bold"
              style={{
                background: isSpeaking ? 'rgba(239,68,68,0.88)' : 'rgba(15,23,42,0.75)',
                backdropFilter: 'blur(8px)',
                color: isSpeaking ? 'white' : 'rgba(148,163,184,1)',
                border: isSpeaking ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(51,65,85,0.7)',
                transition: 'all 0.3s',
              }}
            >
              <Mic className="w-2.5 h-2.5" />
              <span>{isSpeaking ? 'LIVE' : 'AI AVATAR'}</span>
              {isSpeaking && <span className="w-1.5 h-1.5 rounded-full bg-red-300" style={{ animation: 'blink 0.7s ease infinite' }} />}
            </div>
          </div>

          {/* ── Controls panel ────────────────────── */}
          <div className="flex-1 flex flex-col justify-between p-4 space-y-3">
            {/* Title */}
            <div>
              <span
                className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5"
                style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.22)', color: '#22d3ee' }}
              >
                Episode 1 · Genesis
              </span>
              <h3 className="text-base font-extrabold text-white leading-tight">
                Genesis of Our Journey
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Narrated by <span className="text-cyan-400 font-semibold">K.I Ezra</span> · AI Medical Presenter
              </p>
            </div>

            {/* Subtitle box */}
            <div
              className="rounded-xl px-3 py-2.5 flex items-center"
              style={{
                minHeight: '52px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(34,211,238,0.10)',
              }}
            >
              {!hasStarted ? (
                <p className="text-[11px] text-slate-500 italic">Press play to hear K.I Ezra narrate the story of VitaNova…</p>
              ) : currentLine ? (
                <p className="text-[11px] text-white leading-relaxed font-medium">{currentLine}</p>
              ) : isFinished ? (
                <p className="text-[11px] text-slate-400 italic">Narration complete. Press ↺ to replay.</p>
              ) : (
                <p className="text-[11px] text-slate-500 italic">Starting…</p>
              )}
            </div>

            {/* Progress bar */}
            <div className="rounded-full overflow-hidden" style={{ height: '3px', background: 'rgba(51,65,85,0.7)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
                  transition: 'width 0.2s linear',
                  boxShadow: '0 0 6px rgba(34,211,238,0.5)',
                }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlayPause}
                  id="ki-ezra-play-btn"
                  className="flex items-center justify-center rounded-xl transition-all active:scale-90"
                  style={{
                    width: '42px', height: '42px',
                    background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
                    boxShadow: '0 4px 18px rgba(34,211,238,0.38)',
                    color: '#020617',
                  }}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                </button>
                <button
                  onClick={handleRestart}
                  id="ki-ezra-restart-btn"
                  className="flex items-center justify-center rounded-xl transition-all active:scale-90"
                  style={{ width: '36px', height: '36px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(51,65,85,0.7)', color: 'rgb(148,163,184)' }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleMuteToggle}
                  id="ki-ezra-mute-btn"
                  className="flex items-center justify-center rounded-xl transition-all active:scale-90"
                  style={{ width: '36px', height: '36px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(51,65,85,0.7)', color: isMuted ? 'rgb(239,68,68)' : 'rgb(148,163,184)' }}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {onNavigateToEducation && (
                <button
                  onClick={onNavigateToEducation}
                  id="ki-ezra-explore-btn"
                  className="flex items-center space-x-1.5 rounded-xl font-bold text-[10px] px-3 py-2 transition-all active:scale-95"
                  style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.22)', color: '#22d3ee' }}
                >
                  <span>Explore Library</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <p className="text-[9px] text-slate-600">Diseases Known to Mankind · VitaNova HealthTube</p>
          </div>
        </div>

        {/* Waveform when speaking */}
        {isSpeaking && (
          <div className="flex items-end justify-center space-x-0.5 pb-3 pt-0" style={{ height: '28px' }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: '3px',
                  background: `rgba(34,211,238,${0.3 + (i % 3) * 0.2})`,
                  height: `${5 + (i % 5) * 3}px`,
                  animation: `waveBar ${0.55 + (i % 4) * 0.12}s ease-in-out ${i * 0.04}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseRingInner {
          0% { opacity: 0.6; transform: scale(0.98); }
          100% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes shimmer {
          0% { opacity: 0.4; }
          100% { opacity: 0.9; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes waveBar {
          from { transform: scaleY(0.35); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default KiEzraAvatarPlayer;
