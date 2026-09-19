import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  ThumbsUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Search,
  AlertTriangle
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';
import { DISEASE_VIDEOS, DiseaseVideoItem } from '../../data/diseaseVideos';

interface EducationViewProps {
  articles?: HealthEducationArticle[];
  onToggleDownload?: (articleId: string) => Promise<void>;
  onConsultDoctor?: (doctorName: string) => void;
}

// ── DISEASE-SPECIFIC COLOR PALETTES & THEMES ──────────────────────────────
const CATEGORY_THEMES: Record<string, { primary: string; accent: string; glow: string; hue: number }> = {
  'Infectious Diseases':            { primary: '#22d3ee', accent: '#0e7490', glow: 'rgba(34,211,238,0.4)',  hue: 185 },
  'Cardiovascular Diseases':        { primary: '#f87171', accent: '#b91c1c', glow: 'rgba(248,113,113,0.4)', hue: 0 },
  'Respiratory Diseases':           { primary: '#60a5fa', accent: '#1d4ed8', glow: 'rgba(96,165,250,0.4)',  hue: 217 },
  'Endocrine and Metabolic Diseases': { primary: '#fbbf24', accent: '#d97706', glow: 'rgba(251,191,36,0.4)',  hue: 38 },
  'Cancers':                        { primary: '#a78bfa', accent: '#7c3aed', glow: 'rgba(167,139,250,0.4)', hue: 262 },
  'Neurological Diseases':          { primary: '#818cf8', accent: '#4338ca', glow: 'rgba(129,140,248,0.4)', hue: 234 },
  'Mental Health Conditions':       { primary: '#34d399', accent: '#059669', glow: 'rgba(52,211,153,0.4)',  hue: 160 },
  'Gastrointestinal Diseases':      { primary: '#fb923c', accent: '#c2410c', glow: 'rgba(251,146,60,0.4)',  hue: 24 },
  'Musculoskeletal Diseases':       { primary: '#f472b6', accent: '#be185d', glow: 'rgba(244,114,182,0.4)', hue: 330 },
  'Renal and Urinary Diseases':     { primary: '#38bdf8', accent: '#0369a1', glow: 'rgba(56,189,248,0.4)',  hue: 200 },
  'Genetic and Congenital Disorders': { primary: '#e879f9', accent: '#a21caf', glow: 'rgba(232,121,249,0.4)', hue: 293 },
  'Skin Diseases':                  { primary: '#fb7185', accent: '#e11d48', glow: 'rgba(251,113,133,0.4)', hue: 351 },
  'Eye and Ear Diseases':           { primary: '#4ade80', accent: '#15803d', glow: 'rgba(74,222,128,0.4)',  hue: 143 },
  'Autoimmune Diseases':            { primary: '#facc15', accent: '#a16207', glow: 'rgba(250,204,21,0.4)',  hue: 48 },
  'Nutritional Deficiency Diseases': { primary: '#a3e635', accent: '#4d7c0f', glow: 'rgba(163,230,53,0.4)',  hue: 80 },
};

function getTheme(category: string) {
  return CATEGORY_THEMES[category] || { primary: '#2dd4bf', accent: '#0f766e', glow: 'rgba(45,212,191,0.4)', hue: 174 };
}

// ── FULLSCREEN AI VIDEO PLAYER COMPONENT ─────────────────────────────────
interface FullscreenPlayerProps {
  video: DiseaseVideoItem;
  allVideos: DiseaseVideoItem[];
  onClose: () => void;
  onConsultDoctor?: (name: string) => void;
}

const FullscreenPlayer: React.FC<FullscreenPlayerProps> = ({ video, allVideos, onClose, onConsultDoctor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentVideoRef = useRef(video);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(76);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount] = useState(() => 3200 + Math.floor(Math.random() * 8000));
  const [showInfo, setShowInfo] = useState(false);
  const [speechBlocked, setSpeechBlocked] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(video);
  const [nextCountdown, setNextCountdown] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(1);

  const theme = getTheme(currentVideo.category);
  const activeSlide = currentVideo.videoSlides[slideIndex] || currentVideo.videoSlides[0];

  // Synthetic timer (not tied to any video file)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-hide controls
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showControls && isPlaying) {
      timer = setTimeout(() => setShowControls(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  // Speech narration — uses Web Speech API, Genesis voice is style ref only
  const speakSlide = useCallback((idx: number, vid: DiseaseVideoItem) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const slide = vid.videoSlides[idx] || vid.videoSlides[0];
    if (!slide) return;

    // Build a rich, disease-specific narration script
    const intro = `Welcome to VitaNova HealthTube. Today we are covering ${vid.diseaseName}, under ${vid.category}.`;
    const body = `${slide.title}. ${slide.keyPoints.join('. ')}.`;
    const outro = idx === vid.videoSlides.length - 1
      ? `If you notice any red flag signs, seek immediate medical attention. This has been K.I Ezra, Genesis of our journey.`
      : '';
    const text = [intro, body, outro].filter(Boolean).join(' ');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.91;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : volume;

    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];
    if (preferred) utterance.voice = preferred;

    utterance.onerror = (e) => { if (e.error === 'not-allowed') setSpeechBlocked(true); };
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isMuted, volume]);

  // Load voices
  useEffect(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = () => {};
  }, []);

  // When disease changes — reset state and start synthetic timer
  useEffect(() => {
    currentVideoRef.current = currentVideo;
    setSlideIndex(0);
    setCurrentTime(0);
    setIsPlaying(true);
    if (!isMuted) speakSlide(0, currentVideo);
  }, [currentVideo.id]);

  // Synthetic playback clock (advances currentTime independently of any video file)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + speed * 0.25; // tick every 250ms
        if (next >= duration) {
          clearInterval(timerRef.current!);
          setIsPlaying(false);
          setNextCountdown(5);
          return duration;
        }
        // Advance slide based on time
        const vid = currentVideoRef.current;
        const newIdx = Math.min(
          vid.videoSlides.length - 1,
          Math.floor((next / duration) * vid.videoSlides.length)
        );
        setSlideIndex(prevIdx => {
          if (newIdx !== prevIdx) {
            if (!isMuted) speakSlide(newIdx, vid);
            return newIdx;
          }
          return prevIdx;
        });
        return next;
      });
    }, 250);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, speed, duration, isMuted]);

  // Next video countdown
  useEffect(() => {
    if (nextCountdown === null || nextCountdown <= 0) return;
    const t = setTimeout(() => {
      if (nextCountdown === 1) {
        const idx = allVideos.findIndex(v => v.id === currentVideo.id);
        const next = allVideos[(idx + 1) % allVideos.length];
        setCurrentVideo(next);
        setNextCountdown(null);
        setIsPlaying(true);
      } else {
        setNextCountdown(nextCountdown - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [nextCountdown, currentVideo, allVideos]);

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.pause();
      setIsPlaying(false);
    } else {
      window.speechSynthesis?.resume();
      if (!isMuted) speakSlide(slideIndex, currentVideoRef.current);
      setIsPlaying(true);
    }
    setShowControls(true);
  };

  const seekTo = (t: number) => {
    const clamped = Math.max(0, Math.min(duration, t));
    setCurrentTime(clamped);
    const vid = currentVideoRef.current;
    const newIdx = Math.min(
      vid.videoSlides.length - 1,
      Math.floor((clamped / duration) * vid.videoSlides.length)
    );
    setSlideIndex(newIdx);
    if (!isMuted) speakSlide(newIdx, vid);
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(pos * duration);
  };

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  // ── 60FPS CANVAS AI VIDEO RENDERING LOOP ────────────────────────────────
  // Genesis video is the *style reference* — each disease renders its own unique
  // animated canvas presentation. No shared video file is played per disease.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let alive = true;

    const render = () => {
      if (!alive || !canvas) return;
      frame++;

      const W = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      const H = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      const thm = getTheme(currentVideoRef.current.category);
      const vid = currentVideoRef.current;

      // ── 1. Deep space background unique to this disease's category hue ──
      const hue = thm.hue;
      const baseGrad = ctx.createLinearGradient(0, 0, W, H);
      baseGrad.addColorStop(0, `hsl(${hue}, 55%, 6%)`);
      baseGrad.addColorStop(0.5, `hsl(${(hue + 20) % 360}, 45%, 4%)`);
      baseGrad.addColorStop(1, `hsl(${(hue + 60) % 360}, 35%, 3%)`);
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Slow-moving nebula blobs (unique per disease ID seed) ──
      const seed = vid.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      for (let i = 0; i < 4; i++) {
        const bx = W * ((seed * (i + 1) * 0.17) % 1);
        const by = H * ((seed * (i + 1) * 0.23) % 1);
        const br = 150 + (seed % 80) + Math.sin(frame * 0.005 + i) * 40;
        const bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        bGrad.addColorStop(0, `hsla(${(hue + i * 30) % 360}, 70%, 25%, 0.12)`);
        bGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bGrad;
        ctx.fillRect(0, 0, W, H);
      }

      // ── 2. Cinematic vignette + color grade overlay ──
      const vign = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.9);
      vign.addColorStop(0, 'rgba(0,0,0,0)');
      vign.addColorStop(1, 'rgba(0,0,0,0.72)');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, W, H);

      // Category color tint overlay
      ctx.fillStyle = `hsla(${thm.hue}, 60%, 20%, 0.2)`;
      ctx.fillRect(0, 0, W, H);

      // ── 3. Live DNA/Molecule particle system ──
      const numParticles = 24;
      for (let i = 0; i < numParticles; i++) {
        const t = (frame * 0.008 + i * 0.42) % (Math.PI * 2);
        const x = (i / numParticles) * W + Math.sin(t + i) * 30;
        const y = H * 0.5 + Math.cos(t * 0.7 + i * 0.5) * (H * 0.35);
        const r = 2 + Math.abs(Math.sin(frame * 0.04 + i)) * 3;
        const alpha = 0.2 + Math.abs(Math.sin(frame * 0.05 + i * 0.3)) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${thm.primary}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }

      // Particle connector lines
      ctx.strokeStyle = `${thm.primary}25`;
      ctx.lineWidth = 1;
      for (let i = 0; i < numParticles - 1; i += 2) {
        const t1 = (frame * 0.008 + i * 0.42) % (Math.PI * 2);
        const t2 = (frame * 0.008 + (i + 1) * 0.42) % (Math.PI * 2);
        const x1 = (i / numParticles) * W + Math.sin(t1 + i) * 30;
        const y1 = H * 0.5 + Math.cos(t1 * 0.7 + i * 0.5) * (H * 0.35);
        const x2 = ((i + 1) / numParticles) * W + Math.sin(t2 + i + 1) * 30;
        const y2 = H * 0.5 + Math.cos(t2 * 0.7 + (i + 1) * 0.5) * (H * 0.35);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // ── 4. Pulsing glowing orb behind text ──
      const orbX = W / 2;
      const orbY = H * 0.72;
      const orbR = 120 + Math.sin(frame * 0.06) * 20;
      const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
      orbGrad.addColorStop(0, `${thm.glow}`);
      orbGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = orbGrad;
      ctx.fillRect(orbX - orbR, orbY - orbR, orbR * 2, orbR * 2);

      // ── 5. Disease name displayed prominently in the center ──
      const nameAlpha = 0.08 + Math.abs(Math.sin(frame * 0.018)) * 0.05;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${Math.min(72, W * 0.11)}px 'Inter', system-ui, sans-serif`;
      ctx.fillStyle = `${thm.primary}${Math.round(nameAlpha * 255).toString(16).padStart(2, '0')}`;
      ctx.fillText(vid.diseaseName.toUpperCase(), W / 2, H / 2);
      ctx.restore();

      // ── 6. Bottom dark gradient for controls ──
      const bottomGrad = ctx.createLinearGradient(0, H * 0.6, 0, H);
      bottomGrad.addColorStop(0, 'rgba(0,0,0,0)');
      bottomGrad.addColorStop(1, 'rgba(0,0,0,0.94)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, H * 0.6, W, H * 0.4);

      // ── 7. Top gradient for header ──
      const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.25);
      topGrad.addColorStop(0, 'rgba(0,0,0,0.8)');
      topGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, W, H * 0.25);

      // ── 8. ECG heartbeat line ──
      const ecgY = H - 90;
      const ecgSpan = 200;
      const ecgSpeed = isPlaying ? 3.5 : 0;
      const ecgOffset = (frame * ecgSpeed) % W;

      ctx.save();
      ctx.shadowColor = thm.primary;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = thm.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < W; x += 2) {
        const offset = (x - ecgOffset + W * 4) % ecgSpan;
        let y = ecgY;
        if (offset > 20 && offset < 35) y -= Math.sin(((offset - 20) / 15) * Math.PI) * 6;
        else if (offset >= 40 && offset < 46) y += 8;
        else if (offset >= 46 && offset < 54) {
          const p = (offset - 46) / 8;
          y -= p < 0.5 ? p * 65 : (1 - p) * 65;
        } else if (offset >= 54 && offset < 60) y += Math.sin(((offset - 54) / 6) * Math.PI) * 10;
        else if (offset >= 75 && offset < 110) y -= Math.sin(((offset - 75) / 35) * Math.PI) * 13;

        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      rafRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      alive = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentVideo.id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      else if (e.code === 'Escape') onClose();
      else if (e.code === 'ArrowLeft') seekTo(currentTime - 5);
      else if (e.code === 'ArrowRight') seekTo(currentTime + 5);
      else if (e.key === 'm' || e.key === 'M') setIsMuted(m => !m);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentTime, isPlaying]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col"
      onMouseMove={() => setShowControls(true)}
      onTouchStart={() => setShowControls(true)}
    >
      {/* CANVAS — Full-screen AI-animated disease presenter */}
      {/* Genesis video is a style/voice reference; each disease renders uniquely on canvas */}
      <canvas
        ref={canvasRef}
        onClick={() => { togglePlay(); setShowControls(true); }}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* ── DISEASE TITLE STRIP (TOP) ── */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 px-4 pt-safe-top pt-4 pb-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between">
          {/* Back / Close */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Disease Name */}
          <div className="flex-1 mx-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.primary }}>
              {currentVideo.category}
            </p>
            <h1 className="text-sm sm:text-base font-extrabold text-white truncate leading-tight">
              {currentVideo.diseaseName}
            </h1>
          </div>

          {/* Info toggle */}
          <button
            onClick={() => setShowInfo(i => !i)}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all active:scale-95"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${showInfo ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── SLIDE OVERLAY (CENTER MIDDLE) ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
        {/* Center Play Button when paused */}
        {!isPlaying && !nextCountdown && (
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="pointer-events-auto w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-white shadow-2xl hover:bg-white/25 transition-all active:scale-90"
            style={{ boxShadow: `0 0 50px ${theme.glow}` }}
          >
            <Play className="w-9 h-9 fill-white ml-1" />
          </button>
        )}

        {/* Next Video Countdown */}
        {nextCountdown !== null && (
          <div className="pointer-events-auto text-center space-y-3 bg-black/70 backdrop-blur-md rounded-3xl p-6 border border-white/10 max-w-xs">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.primary }}>
              Up Next in {nextCountdown}s
            </p>
            <p className="text-sm font-bold text-white">
              {allVideos[(allVideos.findIndex(v => v.id === currentVideo.id) + 1) % allVideos.length]?.diseaseName}
            </p>
            <div className="flex space-x-2 justify-center">
              <button onClick={() => setNextCountdown(null)} className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white">
                Cancel
              </button>
              <button
                onClick={() => {
                  const idx = allVideos.findIndex(v => v.id === currentVideo.id);
                  setCurrentVideo(allVideos[(idx + 1) % allVideos.length]);
                  setNextCountdown(null);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-black"
                style={{ background: theme.primary }}
              >
                Play Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── SPEECH BLOCKED BANNER ── */}
      {speechBlocked && (
        <div className="absolute top-20 inset-x-4 z-30 flex justify-center">
          <button
            onClick={() => { setSpeechBlocked(false); setIsMuted(false); speakSlide(slideIndex, currentVideo); }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold text-black shadow-xl animate-bounce"
            style={{ background: theme.primary }}
          >
            <Volume2 className="w-4 h-4" />
            <span>Tap to Enable Voice Narration</span>
          </button>
        </div>
      )}

      {/* ── SLIDE INFO PANEL (expandable from bottom) ── */}
      {showInfo && (
        <div className="absolute bottom-28 left-0 right-0 z-20 px-4">
          <div className="bg-black/85 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-3 max-h-[50vh] overflow-y-auto">
            {/* Section badges */}
            <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {currentVideo.videoSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSlideIndex(idx);
                    seekTo((duration / currentVideo.videoSlides.length) * idx);
                    speakSlide(idx, currentVideo);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    idx === slideIndex
                      ? 'text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  style={idx === slideIndex ? { background: theme.primary } : {}}
                >
                  {idx + 1}. {slide.badge}
                </button>
              ))}
            </div>

            {/* Current slide content */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-white text-sm">{activeSlide?.title}</h3>
              <ul className="space-y-1.5">
                {activeSlide?.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: theme.primary }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Danger signs */}
            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3 space-y-1">
              <p className="text-[11px] font-bold text-red-400 uppercase tracking-wide flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Red Flag Signs</span>
              </p>
              {currentVideo.clinicalGuideline.dangerSigns.map((sign, idx) => (
                <p key={idx} className="text-xs text-red-200">• {sign}</p>
              ))}
            </div>

            {/* Summary */}
            <p className="text-xs text-slate-400 leading-relaxed">{currentVideo.summary}</p>
          </div>
        </div>
      )}

      {/* ── BOTTOM CONTROLS BAR ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 pb-safe-bottom pb-4 px-4 space-y-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* LIVE SLIDE NAME TICKER */}
        <div className="flex items-center space-x-2 px-1">
          <span className="w-2 h-2 rounded-full animate-ping shrink-0" style={{ background: theme.primary }} />
          <p className="text-xs font-bold text-white truncate">
            <span style={{ color: theme.primary }}>Section {slideIndex + 1}:</span>{' '}
            {activeSlide?.title}
          </p>
        </div>

        {/* Scrubber */}
        <div
          onClick={handleScrubberClick}
          className="relative h-1.5 rounded-full cursor-pointer group"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          {/* Chapter ticks */}
          {currentVideo.videoSlides.map((_, idx) => (
            <span
              key={idx}
              className="absolute inset-y-0 w-0.5 bg-black/40 z-10"
              style={{ left: `${(idx / currentVideo.videoSlides.length) * 100}%` }}
            />
          ))}
          <div
            className="h-full rounded-full relative transition-all"
            style={{ width: `${pct}%`, background: theme.primary }}
          >
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform"
              style={{ background: theme.primary }}
            />
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {/* Prev section */}
            <button
              onClick={() => {
                const newIdx = Math.max(0, slideIndex - 1);
                setSlideIndex(newIdx);
                seekTo((duration / currentVideo.videoSlides.length) * newIdx);
                speakSlide(newIdx, currentVideo);
              }}
              disabled={slideIndex === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Rewind 5s */}
            <button onClick={() => seekTo(currentTime - 5)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full flex items-center justify-center text-black font-bold shadow-lg"
              style={{ background: theme.primary }}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
            </button>

            {/* Skip 5s */}
            <button onClick={() => seekTo(currentTime + 5)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Next section */}
            <button
              onClick={() => {
                const newIdx = Math.min(currentVideo.videoSlides.length - 1, slideIndex + 1);
                setSlideIndex(newIdx);
                seekTo((duration / currentVideo.videoSlides.length) * newIdx);
                speakSlide(newIdx, currentVideo);
              }}
              disabled={slideIndex === currentVideo.videoSlides.length - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Time */}
            <span className="text-[11px] font-mono opacity-80">{fmtTime(currentTime)} / {fmtTime(duration)}</span>

            {/* Speed */}
            <button
              onClick={() => {
                const speeds = [0.75, 1, 1.25, 1.5, 2];
                setSpeed(s => speeds[(speeds.indexOf(s) + 1) % speeds.length]);
              }}
              className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-white/10 hover:bg-white/20"
            >
              {speed}x
            </button>

            {/* Mute */}
            <button onClick={() => setIsMuted(m => !m)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Like */}
            <button
              onClick={() => setIsLiked(l => !l)}
              className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white/10 hover:bg-white/20"
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
              <span className="text-[11px] font-bold">{(likeCount + (isLiked ? 1 : 0)).toLocaleString()}</span>
            </button>
          </div>
        </div>

        {/* Disease Navigation: Prev / Next Disease */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          <button
            onClick={() => {
              const idx = allVideos.findIndex(v => v.id === currentVideo.id);
              setCurrentVideo(allVideos[(idx - 1 + allVideos.length) % allVideos.length]);
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/15 text-xs font-bold text-white"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev Disease</span>
          </button>

          <div className="text-center">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">K.I Ezra</p>
            <p className="text-[11px] font-bold" style={{ color: theme.primary }}>Genesis of our journey</p>
          </div>

          <button
            onClick={() => {
              const idx = allVideos.findIndex(v => v.id === currentVideo.id);
              setCurrentVideo(allVideos[(idx + 1) % allVideos.length]);
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/15 text-xs font-bold text-white"
          >
            <span>Next Disease</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── MAIN EDUCATION VIEW ───────────────────────────────────────────────────
export const EducationView: React.FC<EducationViewProps> = ({ onConsultDoctor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openVideo, setOpenVideo] = useState<DiseaseVideoItem | null>(null);

  const categories = [
    'All',
    'Infectious Diseases',
    'Cardiovascular Diseases',
    'Respiratory Diseases',
    'Endocrine and Metabolic Diseases',
    'Cancers',
    'Neurological Diseases',
    'Mental Health Conditions',
    'Gastrointestinal Diseases',
    'Musculoskeletal Diseases',
    'Renal and Urinary Diseases',
    'Genetic and Congenital Disorders',
    'Skin Diseases',
    'Eye and Ear Diseases',
    'Autoimmune Diseases',
    'Nutritional Deficiency Diseases'
  ];

  const filteredVideos = useMemo(() => {
    return DISEASE_VIDEOS.filter((vid) => {
      const catMatch = selectedCategory === 'All' || vid.category === selectedCategory;
      if (!searchQuery.trim()) return catMatch;
      const q = searchQuery.toLowerCase();
      return catMatch && (
        vid.diseaseName.toLowerCase().includes(q) ||
        vid.category.toLowerCase().includes(q) ||
        vid.title.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* FULLSCREEN VIDEO PORTAL — renders over entire app */}
      {openVideo && (
        <FullscreenPlayer
          video={openVideo}
          allVideos={filteredVideos.length > 0 ? filteredVideos : DISEASE_VIDEOS}
          onClose={() => setOpenVideo(null)}
          onConsultDoctor={onConsultDoctor}
        />
      )}

      {/* VIDEO BROWSER GRID */}
      <div className="space-y-4 pb-28 text-white max-w-full overflow-x-hidden">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                VitaNova HealthTube
              </h1>
              <p className="text-[11px] text-slate-400">
                {DISEASE_VIDEOS.length} Diseases • K.I Ezra • Genesis of our journey
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search across all ${DISEASE_VIDEOS.length} diseases…`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-9 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <span className="hidden lg:inline text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            {filteredVideos.length} videos
          </span>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex space-x-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar sticky top-16 z-20 bg-slate-950/90 backdrop-blur-md py-1">
          {categories.map((cat) => {
            const theme = getTheme(cat);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'text-black shadow-md scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                }`}
                style={isActive ? { background: cat === 'All' ? '#f1f5f9' : theme.primary } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredVideos.length === 0 && (
          <div className="p-12 text-center space-y-3 bg-slate-900/50 rounded-3xl border border-slate-800 max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No videos found</h3>
            <p className="text-xs text-slate-400">Try searching for Malaria, Alzheimer's, Lupus, or Asthma.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold">
              Reset
            </button>
          </div>
        )}

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
          {filteredVideos.map((video) => {
            const theme = getTheme(video.category);
            return (
              <button
                key={video.id}
                onClick={() => setOpenVideo(video)}
                className="flex flex-col space-y-2.5 text-left group select-none focus:outline-none"
              >
                {/* 16:9 Thumbnail */}
                <div
                  className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800/60 shadow-md group-hover:shadow-2xl transition-all duration-300"
                  style={{ background: `hsl(${theme.hue}, 40%, 8%)` }}
                >
                  {/* Genesis thumbnail with category color tint */}
                  <img
                    src={video.videoThumbnail}
                    alt={video.diseaseName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />

                  {/* Category color overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}50, transparent 60%)` }}
                  />

                  {/* Disease name overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className="px-3 py-1.5 rounded-xl text-center"
                      style={{ background: `${theme.primary}22`, border: `1px solid ${theme.primary}44` }}
                    >
                      <p className="text-xs font-extrabold text-white leading-tight">{video.diseaseName}</p>
                    </div>
                  </div>

                  {/* Hover Play */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform"
                      style={{ background: theme.primary, boxShadow: `0 0 30px ${theme.glow}` }}
                    >
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/85 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded">
                      {video.videoDuration}
                    </span>
                  </div>

                  {/* Category top pill */}
                  <div className="absolute top-2 left-2">
                    <span
                      className="text-[9px] font-extrabold px-2 py-0.5 rounded-md"
                      style={{ background: `${theme.primary}22`, color: theme.primary, border: `1px solid ${theme.primary}50` }}
                    >
                      {video.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Below thumbnail: avatar + info */}
                <div className="flex items-start space-x-2.5 px-0.5">
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden border-2 shrink-0"
                    style={{ borderColor: theme.primary }}
                  >
                    <img src={video.speakerAvatar} alt="K.I Ezra" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h3
                      className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug transition-colors"
                      style={{ color: 'white' }}
                    >
                      {video.diseaseName}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <span>K.I Ezra</span>
                      <CheckCircle2 className="w-3 h-3 text-slate-500 shrink-0" />
                    </p>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.publishedDate}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EducationView;
