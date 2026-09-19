import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  Maximize,
  Minimize,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Pill,
  Stethoscope,
  Activity,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';
import { DISEASE_VIDEOS, DiseaseVideoItem } from '../../data/diseaseVideos';

interface EducationViewProps {
  articles?: HealthEducationArticle[];
  onToggleDownload?: (articleId: string) => Promise<void>;
  onConsultDoctor?: (doctorName: string) => void;
}

// ── CATEGORY THEME DEFINITIONS ────────────────────────────────────────────
const CATEGORY_THEMES: Record<string, { primary: string; accent: string; glow: string; hue: number }> = {
  'Infectious Diseases':            { primary: '#22d3ee', accent: '#0891b2', glow: 'rgba(34,211,238,0.5)',  hue: 185 },
  'Cardiovascular Diseases':        { primary: '#f87171', accent: '#dc2626', glow: 'rgba(248,113,113,0.5)', hue: 0 },
  'Respiratory Diseases':           { primary: '#60a5fa', accent: '#2563eb', glow: 'rgba(96,165,250,0.5)',  hue: 217 },
  'Endocrine and Metabolic Diseases': { primary: '#fbbf24', accent: '#d97706', glow: 'rgba(251,191,36,0.5)',  hue: 38 },
  'Cancers':                        { primary: '#c084fc', accent: '#9333ea', glow: 'rgba(192,132,252,0.5)', hue: 275 },
  'Neurological Diseases':          { primary: '#818cf8', accent: '#4f46e5', glow: 'rgba(129,140,248,0.5)', hue: 234 },
  'Mental Health Conditions':       { primary: '#34d399', accent: '#059669', glow: 'rgba(52,211,153,0.5)',  hue: 160 },
  'Gastrointestinal Diseases':      { primary: '#fb923c', accent: '#ea580c', glow: 'rgba(251,146,60,0.5)',  hue: 24 },
  'Musculoskeletal Diseases':       { primary: '#f472b6', accent: '#db2777', glow: 'rgba(244,114,182,0.5)', hue: 330 },
  'Renal and Urinary Diseases':     { primary: '#38bdf8', accent: '#0284c7', glow: 'rgba(56,189,248,0.5)',  hue: 200 },
  'Genetic and Congenital Disorders': { primary: '#e879f9', accent: '#c026d3', glow: 'rgba(232,121,249,0.5)', hue: 293 },
  'Skin Diseases':                  { primary: '#fb7185', accent: '#e11d48', glow: 'rgba(251,113,133,0.5)', hue: 351 },
  'Eye and Ear Diseases':           { primary: '#4ade80', accent: '#16a34a', glow: 'rgba(74,222,128,0.5)',  hue: 143 },
  'Autoimmune Diseases':            { primary: '#facc15', accent: '#ca8a04', glow: 'rgba(250,204,21,0.5)',  hue: 48 },
  'Nutritional Deficiency Diseases': { primary: '#a3e635', accent: '#65a30d', glow: 'rgba(163,230,53,0.5)',  hue: 80 },
};

function getTheme(category: string) {
  return CATEGORY_THEMES[category] || { primary: '#2dd4bf', accent: '#0d9488', glow: 'rgba(45,212,191,0.5)', hue: 174 };
}

// ── FULLSCREEN IMMERSIVE AI VIDEO PLAYER (ONLY THING ON SCREEN) ───────────
interface FullscreenVideoPlayerProps {
  video: DiseaseVideoItem;
  allVideos: DiseaseVideoItem[];
  onClose: () => void;
  onSelectVideo: (v: DiseaseVideoItem) => void;
}

const FullscreenVideoPlayer: React.FC<FullscreenVideoPlayerProps> = ({
  video,
  allVideos,
  onClose,
  onSelectVideo
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(76);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showOverlaySlides, setShowOverlaySlides] = useState<boolean>(true);
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const theme = useMemo(() => getTheme(video.category), [video.category]);
  const guideline = video.clinicalGuideline;

  // Build authentic 4-stage clinical masterclass slides from Uganda Clinical Guidelines 2023
  const clinicalStages = useMemo(() => [
    {
      title: `Pathophysiology & Mechanism`,
      badge: 'Stage 1 • Cellular Etiology',
      icon: Activity,
      headline: guideline.caseDefinition,
      bullets: [
        guideline.diagnosticCriteria[0] || 'Characteristic cellular pathophysiology and clinical signs',
        `Primary organ systems involved: ${video.category}`,
        `Uganda Clinical Guidelines Standard: Health Centre III to National Referral`
      ],
      script: `Welcome to VitaNova HealthTube. In this masterclass on ${video.diseaseName}, we review the Uganda Clinical Guidelines 2023. ${guideline.caseDefinition} Early identification is essential to prevent systemic complications.`
    },
    {
      title: `Diagnostic Criteria & Lab Testing`,
      badge: 'Stage 2 • Confirmatory Workup',
      icon: Stethoscope,
      headline: `Confirmatory tests: ${guideline.investigations[0] || 'Targeted diagnostic panels'}`,
      bullets: [
        `Primary test: ${guideline.investigations[0] || 'Microbiological or rapid screening'}`,
        `Secondary evaluation: ${guideline.investigations[1] || 'Biomarker and organ function assessment'}`,
        `Hallmark signs: ${guideline.diagnosticCriteria[1] || guideline.diagnosticCriteria[0]}`
      ],
      script: `For diagnostic confirmation, Uganda Clinical Guidelines require ${guideline.investigations[0] || 'diagnostic testing'}. Secondary workup includes ${guideline.investigations[1] || 'organ function monitoring'}.`
    },
    {
      title: `Uganda First-Line Medicines & Regimen`,
      badge: 'Stage 3 • First-Line Rx',
      icon: Pill,
      headline: `Prescribed First-Line: ${guideline.firstLineMedicines[0]}`,
      bullets: [
        `Primary regimen: ${guideline.firstLineMedicines[0]}`,
        guideline.firstLineMedicines[1] || guideline.treatmentProtocol[0],
        `Protocol: ${guideline.treatmentProtocol[0]}`
      ],
      script: `According to the Uganda Clinical Guidelines, the first-line pharmacotherapy for ${video.diseaseName} is ${guideline.firstLineMedicines[0]}. Supportive management requires ${guideline.treatmentProtocol[0]}. Complete the full treatment course.`
    },
    {
      title: `Red Flag Danger Signs & Referral`,
      badge: 'Stage 4 • Critical Red Flags',
      icon: AlertTriangle,
      headline: `Emergency Danger Sign: ${guideline.dangerSigns[0]}`,
      bullets: [
        `Danger Sign: ${guideline.dangerSigns[0]}`,
        `Secondary Red Flag: ${guideline.dangerSigns[1] || 'Rapid clinical or vital deterioration'}`,
        `Action: ${guideline.referralProtocol}`,
        `Prevention: ${guideline.preventionCounseling[0]}`
      ],
      script: `Be vigilant for danger signs: ${guideline.dangerSigns[0]}. Immediate action required: ${guideline.referralProtocol}. For prevention, adhere to ${guideline.preventionCounseling[0]}.`
    }
  ], [video, guideline]);

  const activeStage = clinicalStages[currentSlideIdx] || clinicalStages[0];

  // Speech narration
  const narrateStage = useCallback((idx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const stage = clinicalStages[idx];
    if (!stage) return;

    const utterance = new SpeechSynthesisUtterance(stage.script);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : 1.0;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice =
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('James'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];
    if (naturalVoice) utterance.voice = naturalVoice;

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [clinicalStages, isMuted]);

  // Load voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {};
    }
  }, []);

  // When disease changes
  useEffect(() => {
    setCurrentSlideIdx(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    narrateStage(0);
  }, [video.id]);

  // Auto-hide controls after 3.5s of inactivity
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, [resetHideTimer]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetHideTimer();
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'Escape') {
        onClose();
      } else if (e.code === 'ArrowLeft') {
        seekTo(currentTime - 5);
      } else if (e.code === 'ArrowRight') {
        seekTo(currentTime + 5);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted(m => !m);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, isPlaying, resetHideTimer]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Video time tracking
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    const d = videoRef.current.duration || 76;
    setCurrentTime(t);
    setDuration(d);

    // Sync active clinical stage with playback timeline
    const stageDuration = d / clinicalStages.length;
    const newIdx = Math.min(clinicalStages.length - 1, Math.floor(t / stageDuration));
    if (newIdx !== currentSlideIdx) {
      setCurrentSlideIdx(newIdx);
      narrateStage(newIdx);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      window.speechSynthesis?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      window.speechSynthesis?.resume();
      narrateStage(currentSlideIdx);
      setIsPlaying(true);
    }
    resetHideTimer();
  };

  const seekTo = (t: number) => {
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(duration, t));
    videoRef.current.currentTime = clamped;
    setCurrentTime(clamped);
    const stageDuration = duration / clinicalStages.length;
    const newIdx = Math.min(clinicalStages.length - 1, Math.floor(clamped / stageDuration));
    if (newIdx !== currentSlideIdx) {
      setCurrentSlideIdx(newIdx);
      narrateStage(newIdx);
    }
    resetHideTimer();
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(pct * duration);
  };

  const formatSec = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const ActiveIcon = activeStage.icon;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* ── REAL VIDEO PLAYER (K.I EZRA FROM GENESIS OF OUR JOURNEY) ── */}
      <video
        ref={videoRef}
        src="/genesis_video.mp4"
        playsInline
        autoPlay
        muted={isMuted}
        loop
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* ── TOP MINIMALIST BAR (ONLY ON HOVER/TOUCH) ── */}
      <div
        className={`absolute top-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white text-xs font-bold backdrop-blur-md transition-all active:scale-95 shadow-xl"
          >
            <X className="w-4 h-4 text-red-400" />
            <span>Close Video</span>
          </button>

          {/* Disease Name & Category Badge */}
          <div className="text-center px-2">
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
              style={{ background: `${theme.primary}30`, color: theme.primary, border: `1px solid ${theme.primary}60` }}
            >
              {video.category} • Uganda Clinical Guidelines
            </span>
            <h1 className="text-base sm:text-lg font-black text-white drop-shadow-md truncate max-w-xs sm:max-w-md">
              {video.diseaseName}
            </h1>
          </div>

          {/* Toggle Clinical Slides Overlay Button */}
          <button
            onClick={() => setShowOverlaySlides(s => !s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md transition-all ${
              showOverlaySlides
                ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                : 'bg-black/60 border-white/20 text-slate-300'
            }`}
          >
            {showOverlaySlides ? 'Slides ON' : 'Slides OFF'}
          </button>
        </div>
      </div>

      {/* ── BROADCAST VISUAL EXPLANATION OVERLAY (ON-SCREEN HUD) ── */}
      {showOverlaySlides && (
        <div className="absolute top-20 sm:top-24 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 pointer-events-none transition-all">
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl space-y-2.5 pointer-events-auto">
            {/* Header Stage Badge */}
            <div className="flex items-center justify-between">
              <span
                className="flex items-center space-x-1.5 text-[11px] font-extrabold uppercase tracking-wider"
                style={{ color: theme.primary }}
              >
                <ActiveIcon className="w-4 h-4" />
                <span>{activeStage.badge}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Stage {currentSlideIdx + 1} of {clinicalStages.length}
              </span>
            </div>

            {/* Stage Title */}
            <h2 className="text-sm sm:text-base font-black text-white leading-snug">
              {activeStage.title}
            </h2>

            {/* Headline Card */}
            <div
              className="p-2.5 rounded-xl border text-xs font-bold leading-snug"
              style={{
                background: currentSlideIdx === 3 ? 'rgba(127, 29, 29, 0.4)' : `${theme.primary}18`,
                borderColor: currentSlideIdx === 3 ? 'rgba(239, 68, 68, 0.4)' : `${theme.primary}40`,
                color: currentSlideIdx === 3 ? '#fca5a5' : '#ffffff'
              }}
            >
              {activeStage.headline}
            </div>

            {/* Authentic Uganda Clinical Guidelines Bullet Points */}
            <div className="space-y-1.5 pt-0.5">
              {activeStage.bullets.map((b, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: currentSlideIdx === 3 ? '#ef4444' : theme.primary }}
                  />
                  <span className="leading-tight">{b}</span>
                </div>
              ))}
            </div>

            {/* Presenter Footer Tag */}
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-slate-400">
              <span>Presenter: <strong>K.I Ezra</strong> (Genesis of our journey)</span>
              <span className="font-bold text-emerald-400">Uganda MOH Certified</span>
            </div>
          </div>
        </div>
      )}

      {/* ── BIG CENTER PLAY BUTTON WHEN PAUSED ── */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white shadow-2xl transition-transform active:scale-95"
          style={{ boxShadow: `0 0 50px ${theme.glow}` }}
        >
          <Play className="w-10 h-10 fill-white ml-1.5" />
        </button>
      )}

      {/* ── BOTTOM ON-SCREEN VIDEO CONTROLS ── */}
      <div
        className={`absolute bottom-0 inset-x-0 z-30 pt-10 pb-4 sm:pb-6 px-4 sm:px-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent space-y-2.5 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Bar */}
        <div
          onClick={handleScrubberClick}
          className="relative h-2 rounded-full bg-white/25 hover:h-2.5 cursor-pointer transition-all group"
        >
          {/* Stage dividers */}
          {clinicalStages.map((_, i) => (
            <span
              key={i}
              className="absolute inset-y-0 w-0.5 bg-black/60 z-10"
              style={{ left: `${(i / clinicalStages.length) * 100}%` }}
            />
          ))}

          {/* Progress fill */}
          <div
            className="h-full rounded-full relative"
            style={{ width: `${pct}%`, background: theme.primary }}
          >
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg scale-0 group-hover:scale-100 transition-transform"
            />
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white text-xs">
          {/* Left: Playback buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold shadow-lg transition-transform active:scale-95"
              style={{ background: theme.primary }}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
            </button>

            {/* Rewind 5s */}
            <button
              onClick={() => seekTo(currentTime - 5)}
              className="p-2 rounded-full hover:bg-white/15 text-slate-300 hover:text-white"
              title="Rewind 5s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Forward 5s */}
            <button
              onClick={() => seekTo(currentTime + 5)}
              className="p-2 rounded-full hover:bg-white/15 text-slate-300 hover:text-white"
              title="Forward 5s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <button
              onClick={() => setIsMuted(m => !m)}
              className="p-2 rounded-full hover:bg-white/15 text-slate-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Time */}
            <span className="font-mono text-[11px] text-slate-300">
              {formatSec(currentTime)} / {formatSec(duration)}
            </span>
          </div>

          {/* Center: Stage jumps */}
          <div className="hidden sm:flex items-center space-x-1.5">
            {clinicalStages.map((stg, i) => (
              <button
                key={i}
                onClick={() => {
                  const targetTime = i * (duration / clinicalStages.length);
                  seekTo(targetTime);
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                  i === currentSlideIdx
                    ? 'text-black shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                style={i === currentSlideIdx ? { background: theme.primary } : {}}
              >
                {stg.badge.split('•')[0]}
              </button>
            ))}
          </div>

          {/* Right: Prev/Next Disease */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const curIdx = allVideos.findIndex(v => v.id === video.id);
                const prev = allVideos[(curIdx - 1 + allVideos.length) % allVideos.length];
                onSelectVideo(prev);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev Disease</span>
            </button>

            <button
              onClick={() => {
                const curIdx = allVideos.findIndex(v => v.id === video.id);
                const next = allVideos[(curIdx + 1) % allVideos.length];
                onSelectVideo(next);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
            >
              <span className="hidden sm:inline">Next Disease</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MAIN EDUCATION VIEW (BROWSER FEED) ────────────────────────────────────
export const EducationView: React.FC<EducationViewProps> = ({
  articles,
  onToggleDownload,
  onConsultDoctor
}) => {
  const [activeVideo, setActiveVideo] = useState<DiseaseVideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
      {/* ── WHEN A VIDEO IS TAPPED: ONLY THE VIDEO IS ON THE SCREEN ── */}
      {activeVideo && (
        <FullscreenVideoPlayer
          video={activeVideo}
          allVideos={DISEASE_VIDEOS}
          onClose={() => setActiveVideo(null)}
          onSelectVideo={(v) => setActiveVideo(v)}
        />
      )}

      {/* ── YOUTUBE BROWSE GRID (WHEN NO VIDEO IS OPEN) ── */}
      <div className="space-y-4 pb-28 text-white max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                VitaNova HealthTube
              </h1>
              <p className="text-[11px] text-slate-400">
                213 Diseases • Uganda Clinical Guidelines 2023 • K.I Ezra
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search all ${DISEASE_VIDEOS.length} diseases (Malaria, TB, Diabetes)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <span className="hidden lg:inline text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            {filteredVideos.length} videos
          </span>
        </div>

        {/* Category Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar sticky top-16 z-20 bg-slate-950/95 backdrop-blur-md py-1">
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
                style={isActive ? { background: cat === 'All' ? '#ffffff' : theme.primary } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="p-12 text-center space-y-3 bg-slate-900/50 rounded-3xl border border-slate-800 max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No disease videos found</h3>
            <p className="text-xs text-slate-400">Try searching for Malaria, Tuberculosis, Asthma, or Hypertension.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── 16:9 VIDEO GRID (LIKE YOUTUBE) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
          {filteredVideos.map((vid) => {
            const theme = getTheme(vid.category);
            return (
              <button
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="flex flex-col space-y-2.5 text-left group select-none focus:outline-none"
              >
                {/* 16:9 Video Thumbnail */}
                <div
                  className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800/80 shadow-md group-hover:shadow-2xl transition-all duration-300"
                  style={{ background: `hsl(${theme.hue}, 40%, 8%)` }}
                >
                  <img
                    src={vid.videoThumbnail}
                    alt={vid.diseaseName}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />

                  {/* Gradient Tint */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}60, transparent 65%)` }}
                  />

                  {/* Disease Name in Center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div
                      className="px-3 py-1.5 rounded-xl text-center backdrop-blur-md"
                      style={{ background: 'rgba(3, 7, 18, 0.8)', border: `1px solid ${theme.primary}50` }}
                    >
                      <p className="text-xs sm:text-sm font-black text-white leading-tight">
                        {vid.diseaseName}
                      </p>
                      <p className="text-[9px] font-semibold text-emerald-400">
                        Uganda Guidelines 2023
                      </p>
                    </div>
                  </div>

                  {/* Hover Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform"
                      style={{ background: theme.primary, boxShadow: `0 0 35px ${theme.glow}` }}
                    >
                      <Play className="w-6 h-6 fill-black text-black ml-0.5" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/90 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                      {vid.videoDuration}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className="text-[9px] font-extrabold px-2 py-0.5 rounded-md"
                      style={{
                        background: `${theme.primary}25`,
                        color: theme.primary,
                        border: `1px solid ${theme.primary}60`
                      }}
                    >
                      {vid.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Below Thumbnail info */}
                <div className="flex items-start space-x-2.5 px-0.5">
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden border-2 shrink-0 shadow"
                    style={{ borderColor: theme.primary }}
                  >
                    <img src={vid.speakerAvatar} alt="K.I Ezra" className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {vid.diseaseName}: Clinical Masterclass
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <span>K.I Ezra</span>
                      <CheckCircle2 className="w-3 h-3 text-slate-500 shrink-0" />
                    </p>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-1 font-medium">
                      <span>{vid.views} views</span>
                      <span>•</span>
                      <span>{vid.publishedDate}</span>
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
