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
  FileText,
  Upload,
  Plus,
  Trash2,
  Camera,
  Video,
  Share2,
  ExternalLink
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
  'Community Health & Wellness':    { primary: '#2dd4bf', accent: '#0d9488', glow: 'rgba(45,212,191,0.5)',  hue: 174 },
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
  const guideline = useMemo(() => {
    return video.clinicalGuideline || {
      caseDefinition: video.summary || 'Clinical overview and educational health guidelines.',
      diagnosticCriteria: ['Targeted clinical evaluation and symptom history', 'Physical examination and vital assessment'],
      investigations: ['Baseline diagnostic tests and lab workup', 'Routine clinical review'],
      firstLineMedicines: ['Standard Uganda Ministry of Health approved regimen'],
      treatmentProtocol: ['Follow prescribed medications, optimal hydration, and regular follow-up'],
      dangerSigns: ['Sudden severe chest pain, extreme breathlessness, or loss of consciousness'],
      referralProtocol: 'Immediate transfer to nearest VitaNova emergency center or referral hospital',
      preventionCounseling: ['Maintain balanced nutrition, routine screening, and lifestyle vigilance']
    };
  }, [video]);

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
      {/* ── REAL VIDEO PLAYER (PLAYS USER GALLERY VIDEO OR GENESIS OF OUR JOURNEY) ── */}
      <video
        ref={videoRef}
        src={video.videoUrl || "/genesis_video.mp4"}
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

// ── MAIN EDUCATION VIEW (BROWSER FEED & GALLERY VIDEO UPLOAD) ────────────
export const EducationView: React.FC<EducationViewProps> = ({
  articles,
  onToggleDownload,
  onConsultDoctor
}) => {
  const [activeVideo, setActiveVideo] = useState<DiseaseVideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Gallery Videos uploaded from device
  const [galleryVideos, setGalleryVideos] = useState<DiseaseVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('vitanova_gallery_videos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal State for Posting Videos from Gallery
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postDisease, setPostDisease] = useState<string>('');
  const [postCategory, setPostCategory] = useState<string>('Community Health & Wellness');
  const [postSpeaker, setPostSpeaker] = useState<string>('Dr. Israel Kisakye');
  const [postSpeakerRole, setPostSpeakerRole] = useState<string>('Lead Clinical Consultant');
  const [postSummary, setPostSummary] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Community Health & Wellness',
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

  // Combined Videos: Custom Gallery Videos first, then built-in DISEASE_VIDEOS
  const allAvailableVideos = useMemo(() => {
    return [...galleryVideos, ...DISEASE_VIDEOS];
  }, [galleryVideos]);

  const filteredVideos = useMemo(() => {
    return allAvailableVideos.filter((vid) => {
      const catMatch = selectedCategory === 'All' || vid.category === selectedCategory;
      if (!searchQuery.trim()) return catMatch;
      const q = searchQuery.toLowerCase();
      return catMatch && (
        vid.diseaseName.toLowerCase().includes(q) ||
        vid.category.toLowerCase().includes(q) ||
        vid.title.toLowerCase().includes(q) ||
        (vid.speakerName && vid.speakerName.toLowerCase().includes(q))
      );
    });
  }, [allAvailableVideos, selectedCategory, searchQuery]);

  // Handle Video File Selection from Device Gallery
  const handleSelectVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      if (!postTitle) {
        // Auto-fill title from filename without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        setPostTitle(cleanName);
        setPostDisease(cleanName);
      }
    }
  };

  // Handle Thumbnail File Selection
  const handleSelectThumbnailFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreviewUrl(url);
    }
  };

  // Submit and Post Gallery Video
  const handlePostVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoPreviewUrl && !videoFile) {
      alert('Please select a video from your gallery.');
      return;
    }
    if (!postTitle.trim()) {
      alert('Please enter a title for the video.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newVideoItem: DiseaseVideoItem = {
        id: `gallery_vid_${Date.now()}`,
        title: postTitle.trim(),
        diseaseName: postDisease.trim() || postTitle.trim(),
        category: postCategory,
        summary: postSummary.trim() || 'Uploaded clinical talk and patient health education.',
        videoDuration: '3:20',
        durationSeconds: 200,
        views: '1',
        publishedDate: 'Just now',
        channelName: 'VitaNova Gallery',
        speakerName: postSpeaker.trim() || 'VitaNova Clinician',
        speakerRole: postSpeakerRole.trim() || 'Healthcare Staff',
        speakerAvatar: '/ki_ezra_avatar.jpg',
        videoThumbnail: thumbnailPreviewUrl || '/genesis_thumb.jpg',
        videoUrl: videoPreviewUrl,
        audioUrl: '',
        levelOfCare: 'Health Centre III to National Referral',
        diseaseClass: 'Community Gallery Video',
        clinicalGuideline: {
          caseDefinition: postSummary.trim() || `${postTitle} clinical video education.`,
          diagnosticCriteria: [
            'Clinical evaluation and screening',
            'Patient history and physical examination'
          ],
          investigations: [
            'Comprehensive diagnostic workup',
            'Routine organ function and vital monitoring'
          ],
          firstLineMedicines: [
            'Uganda Clinical Guidelines first-line approved treatment regimen'
          ],
          treatmentProtocol: [
            'Adhere to clinical recommendations, adequate rest, and therapeutic hydration'
          ],
          dangerSigns: [
            'Sudden deterioration in vital signs or severe respiratory distress'
          ],
          referralProtocol: 'Immediate referral to nearest VitaNova emergency center or referral hospital',
          preventionCounseling: [
            'Adhere to preventive counseling and follow-up clinical appointments'
          ]
        },
        videoSlides: [
          {
            title: postTitle,
            timing: '0:00',
            keyPoints: [postSummary.trim() || 'Community clinical masterclass', 'Uganda MOH Guidelines standard'],
            badge: 'Gallery Video • Key Guidance'
          }
        ]
      };

      const updated = [newVideoItem, ...galleryVideos];
      setGalleryVideos(updated);

      // Persist to localStorage (save lightweight metadata)
      try {
        localStorage.setItem('vitanova_gallery_videos', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not persist full video object to localStorage:', err);
      }

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        // Reset form
        setVideoFile(null);
        setVideoPreviewUrl('');
        setThumbnailFile(null);
        setThumbnailPreviewUrl('');
        setPostTitle('');
        setPostDisease('');
        setPostSummary('');
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete User-Uploaded Video
  const handleDeleteGalleryVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this video from your gallery?')) {
      const updated = galleryVideos.filter(v => v.id !== id);
      setGalleryVideos(updated);
      try {
        localStorage.setItem('vitanova_gallery_videos', JSON.stringify(updated));
      } catch (_) {}
    }
  };

  return (
    <>
      {/* ── WHEN A VIDEO IS TAPPED: FULLSCREEN IMMERSIVE PLAYER ── */}
      {activeVideo && (
        <FullscreenVideoPlayer
          video={activeVideo}
          allVideos={allAvailableVideos}
          onClose={() => setActiveVideo(null)}
          onSelectVideo={(v) => setActiveVideo(v)}
        />
      )}

      {/* ── YOUTUBE BROWSE GRID (WHEN NO VIDEO IS OPEN) ── */}
      <div className="space-y-5 pb-28 text-white max-w-full overflow-x-hidden">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800/80 shadow-xl">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30 shrink-0">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  VitaNova HealthTube
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Live Feed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official Uganda Clinical Guidelines 2023 & Community Gallery
              </p>
            </div>
          </div>

          {/* Right Action: Search & Post Video from Gallery Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search videos (Malaria, TB, Diabetes)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-full pl-10 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Post Video from Gallery Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 text-xs font-black shadow-lg shadow-teal-500/20 transition-all active:scale-95 shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Post Video from Gallery</span>
            </button>
          </div>
        </div>

        {/* Category Chips Bar */}
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
                    ? 'text-slate-950 shadow-md scale-105'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                }`}
                style={isActive ? { background: cat === 'All' ? '#ffffff' : theme.primary } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Empty Search State */}
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

        {/* ── REDESIGNED PREMIUM VIDEO CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredVideos.map((vid) => {
            const theme = getTheme(vid.category);
            const isGalleryUpload = vid.id.startsWith('gallery_vid_');

            return (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="group relative flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer select-none"
                style={{
                  boxShadow: `0 4px 20px -2px rgba(0, 0, 0, 0.5)`
                }}
              >
                {/* 16:9 High-Def Video Thumbnail Container */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-950"
                  style={{ background: `hsl(${theme.hue}, 40%, 6%)` }}
                >
                  <img
                    src={vid.videoThumbnail || '/genesis_thumb.jpg'}
                    alt={vid.diseaseName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    loading="lazy"
                  />

                  {/* Elegant Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}60, transparent 70%)` }}
                  />

                  {/* Floating Category Tag (Top Left) */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-1.5">
                    <span
                      className="text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md"
                      style={{
                        background: 'rgba(3, 7, 18, 0.75)',
                        color: theme.primary,
                        border: `1px solid ${theme.primary}50`
                      }}
                    >
                      {vid.category.split(' ')[0]}
                    </span>
                    {isGalleryUpload && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/90 text-slate-950 shadow-md flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Gallery Video</span>
                      </span>
                    )}
                  </div>

                  {/* Delete button for user's gallery uploaded videos (Top Right) */}
                  {isGalleryUpload && (
                    <button
                      onClick={(e) => handleDeleteGalleryVideo(vid.id, e)}
                      title="Remove from Gallery"
                      className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-slate-950/80 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Duration Pill (Bottom Right) */}
                  <div className="absolute bottom-2.5 right-2.5 z-10">
                    <span className="bg-black/85 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border border-white/10 shadow-md">
                      {vid.videoDuration || '3:20'}
                    </span>
                  </div>

                  {/* Center Glowing Play Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div
                      className="w-13 h-13 rounded-full flex items-center justify-center text-slate-950 shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300"
                      style={{
                        background: theme.primary,
                        boxShadow: `0 0 30px ${theme.glow}`
                      }}
                    >
                      <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-3 bg-slate-900/60">
                  <div className="space-y-1.5">
                    {/* Disease / Masterclass Title */}
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-teal-300 transition-colors">
                      {vid.title}
                    </h3>

                    {/* Disease Tag */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {vid.diseaseName}
                      </span>
                      <span className="text-slate-600 text-[10px]">•</span>
                      <span className="text-[10px] font-medium text-emerald-400">
                        Uganda MOH
                      </span>
                    </div>
                  </div>

                  {/* Speaker and Meta Row */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-full overflow-hidden border shrink-0"
                        style={{ borderColor: theme.primary }}
                      >
                        <img
                          src={vid.speakerAvatar || '/ki_ezra_avatar.jpg'}
                          alt={vid.speakerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-slate-200 truncate flex items-center space-x-1">
                          <span>{vid.speakerName}</span>
                          <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {vid.publishedDate}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-teal-500 text-slate-300 hover:text-slate-950 font-bold text-[10px] transition-colors border border-slate-700 shrink-0"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL: POST VIDEO FROM GALLERY ── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl p-5 sm:p-6 space-y-4 shadow-2xl my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Post Video from Gallery</h3>
                  <p className="text-[11px] text-slate-400">Share a clinical talk or health guidance video</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">Video Published to Gallery!</h4>
                <p className="text-xs text-slate-400">Your video is now live on VitaNova HealthTube.</p>
              </div>
            ) : (
              <form onSubmit={handlePostVideo} className="space-y-4 text-xs">
                {/* Video File Picker Zone */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    Select Video from Your Gallery *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleSelectVideoFile}
                    className="hidden"
                  />

                  {videoPreviewUrl ? (
                    <div className="space-y-2">
                      <div className="relative rounded-2xl overflow-hidden border border-teal-500/50 bg-black aspect-video max-h-48">
                        <video
                          src={videoPreviewUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-emerald-400 font-semibold truncate max-w-xs">
                          ✓ {videoFile?.name || 'Selected Gallery Video'}
                        </span>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-teal-400 hover:underline font-bold"
                        >
                          Change Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-700 hover:border-teal-400/60 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-800/40 space-y-2"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-white">Click or tap to choose video from device gallery</p>
                      <p className="text-[11px] text-slate-400">Supports MP4, WebM, MOV, 3GP, AVI (from phone or camera roll)</p>
                    </div>
                  )}
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Video Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hypertension Prevention & Nutrition"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Disease / Health Topic</label>
                    <input
                      type="text"
                      placeholder="e.g. High Blood Pressure, Child Health"
                      value={postDisease}
                      onChange={(e) => setPostDisease(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Clinical Category</label>
                    <select
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Presenter / Doctor Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Israel Kisakye"
                      value={postSpeaker}
                      onChange={(e) => setPostSpeaker(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Summary / Clinical Advice */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Clinical Summary / Key Points</label>
                  <textarea
                    rows={2}
                    placeholder="Brief explanation of the symptoms, medication, or wellness tips discussed..."
                    value={postSummary}
                    onChange={(e) => setPostSummary(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Modal Actions */}
                <div className="pt-2 flex items-center justify-end space-x-2.5 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !videoPreviewUrl}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 disabled:opacity-50 text-slate-950 font-black shadow-lg shadow-teal-500/20 transition-transform active:scale-95 flex items-center space-x-1.5"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isSubmitting ? 'Posting...' : 'Post Video Now'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EducationView;

