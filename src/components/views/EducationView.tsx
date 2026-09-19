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
  ThumbsDown,
  Share2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Search,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Activity,
  Stethoscope,
  Pill,
  ShieldAlert,
  Send,
  SlidersHorizontal,
  Maximize,
  Minimize,
  Eye,
  Radio,
  ExternalLink,
  Info,
  Clock,
  MessageSquare,
  FileText,
  UserCheck,
  Headphones,
  Check
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';
import { DISEASE_VIDEOS, DiseaseVideoItem } from '../../data/diseaseVideos';

interface EducationViewProps {
  articles?: HealthEducationArticle[];
  onToggleDownload?: (articleId: string) => Promise<void>;
  onConsultDoctor?: (doctorName: string) => void;
}

// ── CATEGORY THEME CONFIGURATION ──────────────────────────────────────────
export const CATEGORY_THEMES: Record<string, { primary: string; accent: string; glow: string; hue: number; icon: string }> = {
  'Infectious Diseases':            { primary: '#22d3ee', accent: '#0891b2', glow: 'rgba(34,211,238,0.4)',  hue: 185, icon: 'microbe' },
  'Cardiovascular Diseases':        { primary: '#f87171', accent: '#dc2626', glow: 'rgba(248,113,113,0.4)', hue: 0,   icon: 'heart' },
  'Respiratory Diseases':           { primary: '#60a5fa', accent: '#2563eb', glow: 'rgba(96,165,250,0.4)',  hue: 217, icon: 'lungs' },
  'Endocrine and Metabolic Diseases': { primary: '#fbbf24', accent: '#d97706', glow: 'rgba(251,191,36,0.4)',  hue: 38,  icon: 'dna' },
  'Cancers':                        { primary: '#c084fc', accent: '#9333ea', glow: 'rgba(192,132,252,0.4)', hue: 275, icon: 'ribbon' },
  'Neurological Diseases':          { primary: '#818cf8', accent: '#4f46e5', glow: 'rgba(129,140,248,0.4)', hue: 234, icon: 'brain' },
  'Mental Health Conditions':       { primary: '#34d399', accent: '#059669', glow: 'rgba(52,211,153,0.4)',  hue: 160, icon: 'smile' },
  'Gastrointestinal Diseases':      { primary: '#fb923c', accent: '#ea580c', glow: 'rgba(251,146,60,0.4)',  hue: 24,  icon: 'stomach' },
  'Musculoskeletal Diseases':       { primary: '#f472b6', accent: '#db2777', glow: 'rgba(244,114,182,0.4)', hue: 330, icon: 'bone' },
  'Renal and Urinary Diseases':     { primary: '#38bdf8', accent: '#0284c7', glow: 'rgba(56,189,248,0.4)',  hue: 200, icon: 'kidney' },
  'Genetic and Congenital Disorders': { primary: '#e879f9', accent: '#c026d3', glow: 'rgba(232,121,249,0.4)', hue: 293, icon: 'dna' },
  'Skin Diseases':                  { primary: '#fb7185', accent: '#e11d48', glow: 'rgba(251,113,133,0.4)', hue: 351, icon: 'shield' },
  'Eye and Ear Diseases':           { primary: '#4ade80', accent: '#16a34a', glow: 'rgba(74,222,128,0.4)',  hue: 143, icon: 'eye' },
  'Autoimmune Diseases':            { primary: '#facc15', accent: '#ca8a04', glow: 'rgba(250,204,21,0.4)',  hue: 48,  icon: 'shield' },
  'Nutritional Deficiency Diseases': { primary: '#a3e635', accent: '#65a30d', glow: 'rgba(163,230,53,0.4)',  hue: 80,  icon: 'apple' },
};

function getCategoryTheme(category: string) {
  return CATEGORY_THEMES[category] || {
    primary: '#2dd4bf',
    accent: '#0d9488',
    glow: 'rgba(45,212,191,0.4)',
    hue: 174,
    icon: 'activity'
  };
}

// ── NARRATION SCRIPT BUILDER ──────────────────────────────────────────────
interface ChapterNarrative {
  title: string;
  badge: string;
  script: string;
  points: string[];
  iconType: 'pathology' | 'symptoms' | 'diagnostics' | 'treatment' | 'danger';
}

function buildDiseaseChapters(video: DiseaseVideoItem): ChapterNarrative[] {
  const g = video.clinicalGuideline;
  const name = video.diseaseName;

  return [
    {
      title: `Etiology & Cellular Pathophysiology of ${name}`,
      badge: 'Chapter 1 • Etiology & Basics',
      iconType: 'pathology',
      points: [
        `Definition: ${g.caseDefinition}`,
        `Biological target: Cellular & systemic physiological disruption`,
        `Risk profile: Classified under ${video.category} in Uganda Clinical Guidelines`
      ],
      script: `Welcome to VitaNova HealthTube. I am your AI Health Assistant, K.I Ezra. In this clinical masterclass, we explore ${name}, a significant condition classified under ${video.category}. Clinically, ${name} is defined as ${g.caseDefinition}. Understanding the underlying cellular pathophysiology allows for early detection and targeted medical intervention before systemic complications escalate.`
    },
    {
      title: `Clinical Signs & Diagnostic Hallmarks`,
      badge: 'Chapter 2 • Symptoms & Presentation',
      iconType: 'symptoms',
      points: [
        g.diagnosticCriteria[0] || `Primary presentation and hallmark complaints of ${name}`,
        g.diagnosticCriteria[1] || `Physiological biomarker progression and systemic changes`,
        g.diagnosticCriteria[2] || `Risk stratification and secondary clinical indicators`
      ],
      script: `Now, let us examine the hallmark symptoms and clinical indicators of ${name}. In clinical presentations, patients characteristically manifest ${g.diagnosticCriteria[0] || 'distinct systemic symptoms'}. Furthermore, ${g.diagnosticCriteria[1] || 'progressive physiological changes develop'}. Early recognition of these key diagnostic hallmarks is vital for timely triage.`
    },
    {
      title: `Uganda MOH Diagnostic Criteria & Lab Investigations`,
      badge: 'Chapter 3 • Lab Workup & Testing',
      iconType: 'diagnostics',
      points: [
        g.investigations[0] || `Confirmatory laboratory blood panels and rapid diagnostic tests`,
        g.investigations[1] || `Diagnostic imaging and organ function biomarkers`,
        g.investigations[2] || `Differential screening per Uganda Clinical Guidelines`
      ],
      script: `Moving to diagnostics and laboratory evaluation. In accordance with the Uganda Clinical Guidelines, confirmatory diagnosis of ${name} requires ${g.investigations[0] || 'targeted diagnostic tests'}. Healthcare practitioners must also carry out ${g.investigations[1] || 'diagnostic imaging and biomarker testing'} to distinguish this from secondary pathologies.`
    },
    {
      title: `Uganda Clinical Guidelines & First-Line Pharmacotherapy`,
      badge: 'Chapter 4 • Treatment & Management',
      iconType: 'treatment',
      points: [
        g.firstLineMedicines[0] || `Evidence-based first-line pharmacological regimen for ${name}`,
        g.treatmentProtocol[0] || `Immediate acute stabilization protocol and fluid management`,
        g.treatmentProtocol[1] || `Structured dosage titration and therapeutic monitoring`
      ],
      script: `For clinical management, the established Uganda first-line regimen for ${name} focuses on ${g.firstLineMedicines[0] || 'evidence-based pharmacotherapy'}. Immediate protocol calls for ${g.treatmentProtocol[0] || 'acute stabilization and supportive care'}. Patients must strictly adhere to prescribed regimens alongside clinical monitoring.`
    },
    {
      title: `Danger Signs, Referral Protocols & Prevention`,
      badge: 'Chapter 5 • Red Flags & Prevention',
      iconType: 'danger',
      points: [
        `Red Flag: ${g.dangerSigns[0] || 'Acute worsening or hemodynamic instability'}`,
        `Action: ${g.referralProtocol}`,
        `Prevention: ${g.preventionCounseling[0] || 'Adherence to therapy and routine clinical screening'}`
      ],
      script: `Finally, essential awareness regarding red flag danger signs. Immediate emergency referral is required if the patient presents with ${g.dangerSigns[0] || 'severe organ compromise or unstable vitals'}. For long-term prevention and family health, follow ${g.preventionCounseling[0] || 'prescribed lifestyle adaptations'}. Early medical action saves lives. Thank you for learning with VitaNova HealthTube.`
    }
  ];
}

// ── YOUTUBE-STYLE VIDEO PLAYER COMPONENT ─────────────────────────────────
interface YouTubePlayerProps {
  video: DiseaseVideoItem;
  allVideos: DiseaseVideoItem[];
  onSelectVideo: (v: DiseaseVideoItem) => void;
  onBackToBrowse: () => void;
  onConsultDoctor?: (doctorName: string) => void;
}

export const YouTubeWatchPage: React.FC<YouTubePlayerProps> = ({
  video,
  allVideos,
  onSelectVideo,
  onBackToBrowse,
  onConsultDoctor
}) => {
  // Navigation & Chapters
  const chapters = useMemo(() => buildDiseaseChapters(video), [video]);
  const theme = useMemo(() => getCategoryTheme(video.category), [video.category]);
  const durationTotal = 135; // 2 minutes 15 seconds masterclass

  // Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [audioBlocked, setAudioBlocked] = useState<boolean>(false);
  const [audioWaveform, setAudioWaveform] = useState<number[]>([40, 65, 85, 55, 90, 45, 70]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Social & Interactivity
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(() => 12400 + Math.floor(Math.random() * 8500));
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [isDescExpanded, setIsDescExpanded] = useState<boolean>(false);
  const [activeGuidelineTab, setActiveGuidelineTab] = useState<'symptoms' | 'diagnostics' | 'medicines' | 'danger' | 'prevention'>('medicines');
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<Array<{ id: string; user: string; role: string; text: string; time: string; likes: number }>>([
    {
      id: 'c1',
      user: 'Dr. Sarah Nabirye',
      role: 'Consultant Physician, Mulago NRH',
      text: `Excellent masterclass presentation by K.I Ezra on ${video.diseaseName}. The emphasis on Uganda first-line medicines and early referral danger signs is 100% aligned with national clinical protocols.`,
      time: '1 day ago',
      likes: 42
    },
    {
      id: 'c2',
      user: 'Kato Ronald',
      role: 'Clinical Officer • Jinja Regional Referral',
      text: `The visual overlay breakdown makes understanding ${video.diseaseName} so straightforward. Having the AI Health Assistant speak the guidelines directly is invaluable for community awareness.`,
      time: '3 days ago',
      likes: 19
    }
  ]);

  // Sidebar recommendation filter
  const [recFilter, setRecFilter] = useState<'Same Category' | 'All' | 'High Yield'>('Same Category');

  // Refs
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const activeChapter = chapters[currentChapterIdx] || chapters[0];

  // Filtered Up Next videos
  const recommendedVideos = useMemo(() => {
    let list = allVideos.filter(v => v.id !== video.id);
    if (recFilter === 'Same Category') {
      const same = list.filter(v => v.category === video.category);
      if (same.length > 0) return same.slice(0, 16);
    }
    return list.slice(0, 16);
  }, [allVideos, video.id, video.category, recFilter]);

  // ── WEB SPEECH SYNTHESIS ENGINE ─────────────────────────────────────────
  const speakCurrentChapter = useCallback((idx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const chap = chapters[idx];
    if (!chap) return;

    const utterance = new SpeechSynthesisUtterance(chap.script);
    utterance.rate = 0.93 * playbackSpeed;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : volume;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice =
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('David') || v.name.includes('James'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setAudioBlocked(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      setIsSpeaking(false);
      if (e.error === 'not-allowed') {
        setAudioBlocked(true);
      }
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [chapters, playbackSpeed, isMuted, volume]);

  // When active video changes
  useEffect(() => {
    setCurrentTime(0);
    setCurrentChapterIdx(0);
    setIsPlaying(true);
    setIsLiked(false);
    setIsDisliked(false);
    speakCurrentChapter(0);
  }, [video.id]);

  // Waveform animation pulse while speaking
  useEffect(() => {
    if (!isSpeaking) {
      setAudioWaveform([20, 20, 20, 20, 20, 20, 20]);
      return;
    }
    const interval = setInterval(() => {
      setAudioWaveform([
        Math.floor(25 + Math.random() * 65),
        Math.floor(40 + Math.random() * 60),
        Math.floor(55 + Math.random() * 45),
        Math.floor(70 + Math.random() * 30),
        Math.floor(45 + Math.random() * 55),
        Math.floor(60 + Math.random() * 40),
        Math.floor(30 + Math.random() * 70)
      ]);
    }, 120);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Playback timer loop
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPlaying) return;

    const chapterDuration = durationTotal / chapters.length;

    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + 0.25 * playbackSpeed;
        if (next >= durationTotal) {
          setIsPlaying(false);
          return durationTotal;
        }

        const newChapIdx = Math.min(
          chapters.length - 1,
          Math.floor(next / chapterDuration)
        );

        if (newChapIdx !== currentChapterIdx) {
          setCurrentChapterIdx(newChapIdx);
          speakCurrentChapter(newChapIdx);
        }

        return next;
      });
    }, 250);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, durationTotal, chapters.length, currentChapterIdx, speakCurrentChapter]);

  // ── CANVAS 60FPS MEDICAL BACKGROUND RENDERER ────────────────────────────
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

      const W = canvas.width = canvas.parentElement?.clientWidth || 800;
      const H = canvas.height = canvas.parentElement?.clientHeight || 450;
      const hue = theme.hue;

      // 1. Studio deep background
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, `hsl(${hue}, 45%, 7%)`);
      grad.addColorStop(0.6, `hsl(${(hue + 25) % 360}, 40%, 5%)`);
      grad.addColorStop(1, '#030712');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // 2. Subtle medical coordinate grid lines
      ctx.strokeStyle = `hsla(${hue}, 60%, 40%, 0.07)`;
      ctx.lineWidth = 1;
      const gridGap = 40;
      for (let x = 0; x < W; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // 3. Floating bio-particles
      for (let i = 0; i < 20; i++) {
        const t = (frame * 0.007 + i * 0.4) % (Math.PI * 2);
        const px = (i / 20) * W + Math.sin(t + i) * 35;
        const py = (H * 0.45) + Math.cos(t * 0.8 + i) * (H * 0.35);
        const rad = 2 + Math.abs(Math.sin(frame * 0.03 + i)) * 3;

        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = `${theme.primary}33`;
        ctx.fill();
      }

      // 4. Studio Vignette
      const vign = ctx.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.85);
      vign.addColorStop(0, 'rgba(0,0,0,0)');
      vign.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, W, H);

      // 5. Live ECG Vital Line across player bottom
      const ecgY = H - 35;
      const ecgSpan = 220;
      const ecgSpeed = isPlaying ? 3.2 : 0;
      const ecgOffset = (frame * ecgSpeed) % W;

      ctx.save();
      ctx.strokeStyle = `${theme.primary}90`;
      ctx.lineWidth = 2;
      ctx.shadowColor = theme.primary;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      for (let x = 0; x < W; x += 2) {
        const off = (x - ecgOffset + W * 3) % ecgSpan;
        let y = ecgY;
        if (off > 20 && off < 35) y -= Math.sin(((off - 20) / 15) * Math.PI) * 5;
        else if (off >= 38 && off < 44) y += 6;
        else if (off >= 44 && off < 52) {
          const p = (off - 44) / 8;
          y -= p < 0.5 ? p * 45 : (1 - p) * 45;
        } else if (off >= 52 && off < 58) y += Math.sin(((off - 52) / 6) * Math.PI) * 7;
        else if (off >= 70 && off < 100) y -= Math.sin(((off - 70) / 30) * Math.PI) * 8;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      alive = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [theme, isPlaying]);

  // Controls Handlers
  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.pause();
      setIsPlaying(false);
    } else {
      window.speechSynthesis?.resume();
      if (!isSpeaking) speakCurrentChapter(currentChapterIdx);
      setIsPlaying(true);
    }
  };

  const jumpToChapter = (idx: number) => {
    const chapterDuration = durationTotal / chapters.length;
    const targetTime = idx * chapterDuration;
    setCurrentTime(targetTime);
    setCurrentChapterIdx(idx);
    setIsPlaying(true);
    speakCurrentChapter(idx);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pct * durationTotal;
    setCurrentTime(targetTime);
    const chapterDuration = durationTotal / chapters.length;
    const newIdx = Math.min(chapters.length - 1, Math.floor(targetTime / chapterDuration));
    if (newIdx !== currentChapterIdx) {
      setCurrentChapterIdx(newIdx);
      speakCurrentChapter(newIdx);
    }
  };

  const formatSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentPct = (currentTime / durationTotal) * 100;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: `user_${Date.now()}`,
        user: 'You (Patient/Clinician)',
        role: 'Verified Community Member',
        text: newComment.trim(),
        time: 'Just now',
        likes: 0
      },
      ...comments
    ]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-24">
      {/* ── YOUTUBE TOP NAVBAR ── */}
      <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToBrowse}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Library</span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm text-white tracking-tight">VitaNova</span>
              <span className="text-[11px] font-bold text-red-500 ml-1 uppercase tracking-wider">HealthTube</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb Info */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400">
          <span className="text-slate-500">Uganda Clinical Guidelines</span>
          <span>•</span>
          <span className="font-medium" style={{ color: theme.primary }}>{video.category}</span>
          <span>•</span>
          <span className="font-semibold text-white truncate max-w-[200px]">{video.diseaseName}</span>
        </div>

        {/* Quick Nav next/prev */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              const curIdx = allVideos.findIndex(v => v.id === video.id);
              const prev = allVideos[(curIdx - 1 + allVideos.length) % allVideos.length];
              onSelectVideo(prev);
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
            title="Previous Disease"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-mono px-1">
            {allVideos.findIndex(v => v.id === video.id) + 1} / {allVideos.length}
          </span>
          <button
            onClick={() => {
              const curIdx = allVideos.findIndex(v => v.id === video.id);
              const next = allVideos[(curIdx + 1) % allVideos.length];
              onSelectVideo(next);
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
            title="Next Disease"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>Disease video link copied to clipboard!</span>
        </div>
      )}

      {/* ── MAIN 2-COLUMN YOUTUBE LAYOUT ── */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ═══ LEFT MAIN COLUMN (Player + Details + Guidelines + Comments) ═══ */}
        <div className="lg:col-span-8 space-y-4">

          {/* 1. 16:9 YOUTUBE VIDEO CONTAINER */}
          <div
            ref={playerContainerRef}
            className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl group select-none"
          >
            {/* Background Medical Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Tap to Unmute / Autoplay Banner */}
            {audioBlocked && (
              <div className="absolute top-4 inset-x-4 z-40 flex justify-center">
                <button
                  onClick={() => {
                    setAudioBlocked(false);
                    setIsMuted(false);
                    speakCurrentChapter(currentChapterIdx);
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold text-slate-950 shadow-2xl animate-pulse flex items-center space-x-2"
                  style={{ background: theme.primary }}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Tap to Enable Voice Narration (K.I Ezra)</span>
                </button>
              </div>
            )}

            {/* ── LIVE VISUAL PRESENTATION OVERLAY BOARD ── */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
              {/* Top Banner: Disease Title & Chapter Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm flex items-center space-x-1 text-slate-950"
                    style={{ background: theme.primary }}
                  >
                    <Activity className="w-3 h-3 text-slate-950" />
                    <span>{video.diseaseName}</span>
                  </span>
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/90 text-slate-300 border border-slate-700/60 backdrop-blur-md">
                    {activeChapter.badge}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold shadow-lg animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>AI LIVE CLINICAL MASTERCLASS</span>
                  </span>
                </div>
              </div>

              {/* Center Content: Animated Educational Infographic Card */}
              <div className="max-w-md sm:max-w-lg space-y-3 pointer-events-auto">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-extrabold uppercase tracking-wider flex items-center space-x-1.5"
                      style={{ color: theme.primary }}
                    >
                      {activeChapter.iconType === 'pathology' && <Sparkles className="w-3.5 h-3.5" />}
                      {activeChapter.iconType === 'symptoms' && <Stethoscope className="w-3.5 h-3.5" />}
                      {activeChapter.iconType === 'diagnostics' && <FileText className="w-3.5 h-3.5" />}
                      {activeChapter.iconType === 'treatment' && <Pill className="w-3.5 h-3.5" />}
                      {activeChapter.iconType === 'danger' && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                      <span>{activeChapter.badge}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Step {currentChapterIdx + 1} of {chapters.length}
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {activeChapter.title}
                  </h2>

                  {/* High-yield clinical bullet points */}
                  <div className="space-y-1.5 pt-1">
                    {activeChapter.points.map((pt, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ background: theme.primary }}
                        />
                        <span className="leading-tight">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: AI Health Presenter Studio Avatar (K.I Ezra) */}
              <div className="flex items-end justify-between pointer-events-auto">
                {/* Closed Captions subtitle box */}
                {showCaptions && (
                  <div className="max-w-[70%] sm:max-w-[75%] bg-black/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-xs sm:text-sm font-medium text-slate-100 leading-relaxed shadow-xl">
                    <span className="text-red-400 font-bold mr-1.5">K.I Ezra:</span>
                    <span>"{activeChapter.script.slice(0, 140)}..."</span>
                  </div>
                )}

                {/* AI Presenter Studio PIP Box */}
                <div className="flex items-center space-x-2.5 p-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl ml-auto">
                  {/* Avatar with speaking wave aura */}
                  <div className="relative">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        isSpeaking ? 'scale-105 shadow-lg' : ''
                      }`}
                      style={{
                        borderColor: isSpeaking ? theme.primary : 'rgba(255,255,255,0.2)',
                        boxShadow: isSpeaking ? `0 0 15px ${theme.glow}` : 'none'
                      }}
                    >
                      <img
                        src="/genesis_thumb.jpg"
                        alt="K.I Ezra"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Speaking mouth pulsation badge */}
                    {isSpeaking && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center animate-ping" />
                    )}
                  </div>

                  <div className="pr-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-[11px] font-bold text-white">K.I Ezra</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <p className="text-[9px] text-slate-400 font-medium">AI Clinical Presenter</p>

                    {/* Equalizer Frequency Bars */}
                    <div className="flex items-end space-x-0.5 h-3 mt-1">
                      {audioWaveform.map((h, idx) => (
                        <span
                          key={idx}
                          className="w-1 rounded-full transition-all duration-100"
                          style={{
                            height: `${h}%`,
                            background: isSpeaking ? theme.primary : '#475569'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── YOUTUBE SCRUBBER & CONTROLS OVERLAY (VISIBLE ON HOVER / TOUCH) ── */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-8 pb-2 px-3 sm:px-4 space-y-2 opacity-95 group-hover:opacity-100 transition-opacity">
              {/* Chapter ticks & scrubber bar */}
              <div
                onClick={handleSeek}
                className="relative h-2 rounded-full bg-white/20 hover:h-2.5 cursor-pointer transition-all group/scrub"
              >
                {/* Chapter dividers */}
                {chapters.map((_, i) => (
                  <span
                    key={i}
                    className="absolute inset-y-0 w-0.5 bg-black/60 z-10"
                    style={{ left: `${(i / chapters.length) * 100}%` }}
                  />
                ))}

                {/* Progress bar */}
                <div
                  className="h-full rounded-full relative"
                  style={{ width: `${currentPct}%`, background: theme.primary }}
                >
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md scale-0 group-hover/scrub:scale-100 transition-transform"
                  />
                </div>
              </div>

              {/* Bottom Controls Bar */}
              <div className="flex items-center justify-between text-white text-xs">
                {/* Left: Playback & Volume */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/15 text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>

                  {/* Skip buttons */}
                  <button
                    onClick={() => {
                      const prevTime = Math.max(0, currentTime - 10);
                      setCurrentTime(prevTime);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
                    title="Rewind 10s"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const nextTime = Math.min(durationTotal, currentTime + 10);
                      setCurrentTime(nextTime);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
                    title="Forward 10s"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>

                  {/* Volume */}
                  <button
                    onClick={() => setIsMuted(m => !m)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Time display */}
                  <span className="font-mono text-slate-300 text-[11px]">
                    {formatSec(currentTime)} / {formatSec(durationTotal)}
                  </span>
                </div>

                {/* Right: Chapter name, CC, Speed, Fullscreen */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="hidden sm:inline-block text-[11px] font-bold text-slate-300 truncate max-w-[180px]">
                    {activeChapter.title}
                  </span>

                  {/* CC Button */}
                  <button
                    onClick={() => setShowCaptions(c => !c)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      showCaptions
                        ? 'bg-red-600 border-red-500 text-white'
                        : 'border-white/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    CC
                  </button>

                  {/* Speed Selector */}
                  <button
                    onClick={() => {
                      const speeds = [0.75, 1, 1.25, 1.5, 2];
                      const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(nextSpeed);
                    }}
                    className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-white/10 hover:bg-white/20 text-slate-200"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={() => {
                      if (!playerContainerRef.current) return;
                      if (!document.fullscreenElement) {
                        playerContainerRef.current.requestFullscreen?.();
                        setIsFullscreen(true);
                      } else {
                        document.exitFullscreen?.();
                        setIsFullscreen(false);
                      }
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. VIDEO TITLE & METADATA */}
          <div className="space-y-3 pt-1">
            <h1 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              {video.diseaseName}: Comprehensive Medical Masterclass, Pathophysiology & Uganda Clinical Guidelines
            </h1>

            {/* Channel Info & Action Buttons (YouTube Row) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
              {/* Channel Profile */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden border-2"
                  style={{ borderColor: theme.primary }}
                >
                  <img src="/genesis_thumb.jpg" alt="K.I Ezra" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-sm text-white">VitaNova HealthTube • K.I Ezra</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">1.42M subscribers • Official AI Clinical Presenter</p>
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => setIsSubscribed(s => !s)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
                    isSubscribed
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-red-600 hover:bg-red-500 text-white'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>

              {/* YouTube Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Like / Dislike pill */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                  <button
                    onClick={() => {
                      if (!isLiked) {
                        setIsLiked(true);
                        setIsDisliked(false);
                        setLikeCount(l => l + 1);
                      } else {
                        setIsLiked(false);
                        setLikeCount(l => l - 1);
                      }
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold hover:bg-slate-800 transition-colors ${
                      isLiked ? 'text-red-500 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                    <span>{likeCount.toLocaleString()}</span>
                  </button>
                  <div className="w-[1px] h-4 bg-slate-800" />
                  <button
                    onClick={() => {
                      setIsDisliked(d => !d);
                      if (isLiked) {
                        setIsLiked(false);
                        setLikeCount(l => l - 1);
                      }
                    }}
                    className={`px-2.5 py-1.5 text-xs hover:bg-slate-800 transition-colors ${
                      isDisliked ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                {/* Save / Offline Button */}
                <button
                  onClick={() => setIsSaved(s => !s)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                    isSaved
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isSaved ? 'Saved Offline' : 'Save'}</span>
                </button>

                {/* Consult Doctor Button */}
                {onConsultDoctor && (
                  <button
                    onClick={() => onConsultDoctor('Dr. Sarah Nabirye')}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-950 transition-all shadow-md"
                    style={{ background: theme.primary }}
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Consult Doctor</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3. EXPANDABLE YOUTUBE DESCRIPTION BOX */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center space-x-3 text-xs font-bold text-slate-300">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{video.publishedDate}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                {video.category}
              </span>
              <span>•</span>
              <span className="text-emerald-400">Uganda Clinical Guideline Certified</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {video.summary}
            </p>

            {/* Clickable Chapters Index */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Video Chapters (Tap to jump):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {chapters.map((chap, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToChapter(idx)}
                    className={`flex items-center space-x-2 text-left p-2 rounded-xl text-xs transition-all ${
                      idx === currentChapterIdx
                        ? 'bg-slate-800 text-white font-bold border border-slate-700'
                        : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-red-400">
                      {formatSec(idx * (durationTotal / chapters.length))}
                    </span>
                    <span className="truncate">{chap.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Extra Details */}
            {isDescExpanded && (
              <div className="pt-3 border-t border-slate-800/60 space-y-2 text-xs text-slate-400">
                <p>
                  <strong className="text-slate-200">Level of Care:</strong> {video.levelOfCare}
                </p>
                <p>
                  <strong className="text-slate-200">Case Definition:</strong> {video.clinicalGuideline.caseDefinition}
                </p>
                <p>
                  <strong className="text-slate-200">Official Clinical Protocol:</strong> Sourced strictly from the Ministry of Health Uganda National Clinical Guidelines (5th Edition).
                </p>
              </div>
            )}

            <button
              onClick={() => setIsDescExpanded(e => !e)}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <span>{isDescExpanded ? 'Show less' : 'Show more'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDescExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* 4. UGANDA CLINICAL GUIDELINES INTERACTIVE PROTOCOL CARD */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-extrabold text-white tracking-tight">
                  Uganda Clinical Guidelines Clinical Sheet: {video.diseaseName}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                MOH Uganda Standard
              </span>
            </div>

            {/* Protocol Nav Tabs */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'medicines', label: 'First-Line Medicines', icon: Pill },
                { id: 'symptoms', label: 'Signs & Symptoms', icon: Stethoscope },
                { id: 'diagnostics', label: 'Lab Investigations', icon: Activity },
                { id: 'danger', label: 'Danger Signs (Red Flags)', icon: AlertTriangle },
                { id: 'prevention', label: 'Prevention & Counseling', icon: ShieldAlert }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeGuidelineTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveGuidelineTab(tab.id as any)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Card Content */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              {activeGuidelineTab === 'medicines' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-emerald-400">Prescribed First-Line Pharmacotherapy:</p>
                  <ul className="space-y-1.5">
                    {video.clinicalGuideline.firstLineMedicines.map((m, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeGuidelineTab === 'symptoms' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-sky-400">Diagnostic Criteria & Clinical Hallmark:</p>
                  <ul className="space-y-1.5">
                    {video.clinicalGuideline.diagnosticCriteria.map((d, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeGuidelineTab === 'diagnostics' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-indigo-400">Recommended Laboratory Workup:</p>
                  <ul className="space-y-1.5">
                    {video.clinicalGuideline.investigations.map((inv, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{inv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeGuidelineTab === 'danger' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-red-400 flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Immediate Referral Red Flags:</span>
                  </p>
                  <ul className="space-y-1.5">
                    {video.clinicalGuideline.dangerSigns.map((ds, i) => (
                      <li key={i} className="text-xs text-red-200 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        <span>{ds}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-red-300 font-medium pt-1 border-t border-red-500/20">
                    Protocol: {video.clinicalGuideline.referralProtocol}
                  </p>
                </div>
              )}

              {activeGuidelineTab === 'prevention' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-amber-400">Patient Counseling & Long-term Prevention:</p>
                  <ul className="space-y-1.5">
                    {video.clinicalGuideline.preventionCounseling.map((pc, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{pc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 5. INTERACTIVE COMMENTS SECTION */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-white">
                {comments.length} Clinical Discussion Comments
              </h3>
            </div>

            {/* Post comment input */}
            <form onSubmit={handlePostComment} className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                VN
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="Ask a clinical question or add a discussion note on this disease..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                {newComment.trim() && (
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setNewComment('')}
                      className="px-3 py-1 rounded-full text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Comment Threads */}
            <div className="space-y-3 pt-2">
              {comments.map((comm) => (
                <div key={comm.id} className="flex items-start space-x-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">
                    {comm.user.charAt(0)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{comm.user}</span>
                      <span className="text-[10px] text-slate-400">{comm.time}</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium">{comm.role}</p>
                    <p className="text-slate-300 leading-relaxed">{comm.text}</p>
                    <div className="flex items-center space-x-3 pt-1 text-slate-400 text-[11px]">
                      <button className="hover:text-white flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comm.likes}</span>
                      </button>
                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT SIDEBAR (Up Next / Recommended Videos) ═══ */}
        <div className="lg:col-span-4 space-y-3">
          {/* Header & Filter Chips */}
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-extrabold text-white">Up Next on HealthTube</h3>
            <span className="text-[11px] font-medium text-slate-400">Auto-play ON</span>
          </div>

          <div className="flex space-x-1.5 pb-1">
            {(['Same Category', 'All'] as const).map(chip => (
              <button
                key={chip}
                onClick={() => setRecFilter(chip)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  recFilter === chip
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Recommended Video List */}
          <div className="space-y-2.5">
            {recommendedVideos.map((rec) => {
              const recTheme = getCategoryTheme(rec.category);
              return (
                <button
                  key={rec.id}
                  onClick={() => onSelectVideo(rec)}
                  className="w-full flex items-start space-x-2.5 p-2 rounded-xl hover:bg-slate-900 transition-colors text-left group"
                >
                  {/* 16:9 Thumbnail */}
                  <div className="relative w-36 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 shrink-0 shadow-md">
                    <img
                      src={rec.videoThumbnail}
                      alt={rec.diseaseName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                      loading="lazy"
                    />

                    {/* Category color overlay */}
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{ background: `linear-gradient(135deg, ${recTheme.primary}, transparent)` }}
                    />

                    {/* Disease Name Badge */}
                    <div className="absolute inset-0 flex items-center justify-center p-1 text-center">
                      <span className="text-[10px] font-extrabold text-white drop-shadow-md leading-tight">
                        {rec.diseaseName}
                      </span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono font-bold text-white">
                      {rec.videoDuration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {rec.diseaseName}: Masterclass
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate flex items-center space-x-1">
                      <span>K.I Ezra</span>
                      <CheckCircle2 className="w-3 h-3 text-slate-500" />
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {rec.views} views • {rec.publishedDate}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// ── MAIN EDUCATION VIEW (BROWSE FEED + WATCH PAGE SWITCHER) ───────────────
export const EducationView: React.FC<EducationViewProps> = ({
  articles,
  onToggleDownload,
  onConsultDoctor
}) => {
  // Active viewing state (null = browse grid, DiseaseVideoItem = YouTube watch page)
  const [selectedVideo, setSelectedVideo] = useState<DiseaseVideoItem | null>(null);

  // Browse filtering
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

  // If a video is selected, render the YouTube Watch Experience!
  if (selectedVideo) {
    return (
      <YouTubeWatchPage
        video={selectedVideo}
        allVideos={DISEASE_VIDEOS}
        onSelectVideo={(v) => setSelectedVideo(v)}
        onBackToBrowse={() => setSelectedVideo(null)}
        onConsultDoctor={onConsultDoctor}
      />
    );
  }

  // Otherwise, render the YouTube Browse Library Feed!
  return (
    <div className="space-y-5 pb-28 text-white max-w-full overflow-x-hidden">
      {/* ── HEADER BANNER (YOUTUBE HEALTH HERO) ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800/90 p-5 sm:p-7 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                VitaNova HealthTube • Genesis Edition
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Diseases Known to Mankind
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AI Clinical Video Masterclasses presented by <strong>K.I Ezra</strong> (Genesis of our journey). Covering 213 diseases with full visual presentation overlays, pathophysiology, diagnostic criteria, and certified Uganda Clinical Guidelines.
            </p>
          </div>

          {/* Presenter Hero Badge */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-xl shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-red-500/80 shadow-lg">
              <img src="/genesis_thumb.jpg" alt="K.I Ezra" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-white">K.I Ezra</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-[10px] text-slate-400">Lead Health Visionary</p>
              <span className="text-[10px] font-bold text-red-400">213 AI Masterclasses</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH & CATEGORY CHIPS ── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search all ${DISEASE_VIDEOS.length} diseases (e.g. Malaria, Hypertension, Diabetes)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
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

          <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 self-start sm:self-auto">
            Showing {filteredVideos.length} videos
          </span>
        </div>

        {/* Category Horizontal Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar sticky top-16 z-20 bg-slate-950/95 backdrop-blur-md py-1">
          {categories.map((cat) => {
            const catTheme = getCategoryTheme(cat);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'text-slate-950 shadow-md scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                }`}
                style={isActive ? { background: cat === 'All' ? '#ffffff' : catTheme.primary } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── EMPTY STATE ── */}
      {filteredVideos.length === 0 && (
        <div className="p-12 text-center space-y-3 bg-slate-900/50 rounded-3xl border border-slate-800 max-w-md mx-auto my-8">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No disease videos found</h3>
          <p className="text-xs text-slate-400">
            Try searching for another disease like Tuberculosis, Asthma, Lupus, or Stroke.
          </p>
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

      {/* ── YOUTUBE VIDEO GRID (ALL 213 DISEASES) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {filteredVideos.map((vid) => {
          const theme = getCategoryTheme(vid.category);
          return (
            <button
              key={vid.id}
              onClick={() => setSelectedVideo(vid)}
              className="flex flex-col space-y-2.5 text-left group select-none focus:outline-none"
            >
              {/* 16:9 Video Thumbnail */}
              <div
                className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800/80 shadow-md group-hover:shadow-2xl transition-all duration-300"
                style={{ background: `hsl(${theme.hue}, 40%, 8%)` }}
              >
                {/* Genesis presenter thumbnail image */}
                <img
                  src={vid.videoThumbnail}
                  alt={vid.diseaseName}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-85"
                  loading="lazy"
                />

                {/* Category color overlay gradient */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}60, transparent 65%)` }}
                />

                {/* Prominent Disease Name in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                  <div
                    className="px-3.5 py-1.5 rounded-xl text-center backdrop-blur-md"
                    style={{ background: 'rgba(3, 7, 18, 0.75)', border: `1px solid ${theme.primary}50` }}
                  >
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                      {vid.diseaseName}
                    </p>
                    <p className="text-[9px] font-semibold text-slate-300">
                      Uganda Clinical Guidelines
                    </p>
                  </div>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform"
                    style={{ background: theme.primary, boxShadow: `0 0 35px ${theme.glow}` }}
                  >
                    <Play className="w-6 h-6 fill-slate-950 text-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Duration badge */}
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

              {/* Below Thumbnail: Avatar + Title + Metadata */}
              <div className="flex items-start space-x-2.5 px-0.5">
                <div
                  className="w-9 h-9 rounded-full overflow-hidden border-2 shrink-0 shadow"
                  style={{ borderColor: theme.primary }}
                >
                  <img src={vid.speakerAvatar} alt="K.I Ezra" className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                    {vid.diseaseName}: Masterclass & Uganda Protocols
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
  );
};

export default EducationView;
