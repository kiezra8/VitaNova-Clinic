import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Search,
  ThumbsUp,
  Share2,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Activity,
  FileText,
  AlertTriangle,
  X,
  Radio,
  SlidersHorizontal,
  Bookmark,
  Heart,
  Volume1
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';
import { UCG_DISEASE_VIDEOS, UCGVideoItem } from '../../data/ucgVideos';

interface EducationViewProps {
  articles?: HealthEducationArticle[];
  onToggleDownload?: (articleId: string) => Promise<void>;
  onConsultDoctor?: (doctorName: string) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  onConsultDoctor
}) => {
  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<UCGVideoItem | null>(null);

  // Video Player Controls State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.9);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(4820);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [flashAction, setFlashAction] = useState<string | null>(null);
  const [speechBlocked, setSpeechBlocked] = useState<boolean>(false);
  const [nextVideoCountdown, setNextVideoCountdown] = useState<number | null>(null);

  // Refs
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Interactive Comments
  const [userComment, setUserComment] = useState<string>('');
  const [commentsList, setCommentsList] = useState<Array<{ author: string; role: string; text: string; time: string }>>([
    {
      author: 'Dr. Sarah Nabirye (Mbarara Regional Referral)',
      role: 'Medical Officer',
      text: 'The IV Artesunate dilution protocol explained in this video matches our daily ward practice at Mbarara. Crucial reminder on checking blood glucose first.',
      time: '2 days ago'
    },
    {
      author: 'Sister Grace Auma (Gulu Regional Referral Hospital)',
      role: 'Clinical Officer',
      text: 'Very clear explanation of the dosage adjustments. We use this exact UCG 2023 algorithm for all severe admissions.',
      time: '5 days ago'
    },
    {
      author: 'Kato Ronald (Kampala)',
      role: 'Patient / Caregiver',
      text: 'Thank you for breaking down the danger signs. This helped us know when to take my mother to hospital without delay.',
      time: '1 week ago'
    }
  ]);

  // YouTube Category Filter Chips
  const categories = [
    'All',
    'Infectious Diseases',
    'Cardiovascular',
    'Endocrine & Diabetes',
    'Respiratory',
    'Obstetrics & Maternal',
    'Childhood Illness & SAM',
    'Gastrointestinal & Hepatic',
    'Renal & Urinary',
    'Blood & Sickle Cell',
    'Emergencies & Trauma',
    'Musculoskeletal'
  ];

  // Filtered Video Library
  const filteredVideos = useMemo(() => {
    return UCG_DISEASE_VIDEOS.filter((vid) => {
      const matchesCategory = selectedCategory === 'All' || vid.category === selectedCategory;
      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        vid.title.toLowerCase().includes(q) ||
        vid.diseaseName.toLowerCase().includes(q) ||
        vid.summary.toLowerCase().includes(q) ||
        vid.speakerName.toLowerCase().includes(q) ||
        vid.clinicalGuideline.firstLineMedicines.some((med) => med.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Trigger visual feedback flash icon (Play/Pause/+10/-10)
  const triggerFlash = (action: string) => {
    setFlashAction(action);
    setTimeout(() => setFlashAction(null), 600);
  };

  // ══════════════════════════════════════════════════════════════════════
  // SPEECH SYNTHESIS ENGINE (REAL CLINICAL DOCTOR VOICE)
  // ══════════════════════════════════════════════════════════════════════
  const speakCurrentSlide = useCallback(
    (slideIdx: number) => {
      if (!selectedVideo) return;
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      const synth = window.speechSynthesis;
      synth.cancel();

      if (isMuted || !isPlaying) return;

      const slide = selectedVideo.videoSlides[slideIdx] || selectedVideo.videoSlides[0];
      if (!slide) return;

      // Construct spoken clinical text
      const narrationText = `Section ${slideIdx + 1}: ${slide.title}. ${slide.keyPoints.join('. ')}. Protocol from the Uganda Clinical Guidelines 2023.`;

      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.rate = Math.max(0.8, Math.min(1.8, playbackSpeed * 0.95));
      utterance.pitch = 1.0;
      utterance.volume = volume;

      // Pick clear English voice if available
      const voices = synth.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online'))) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onerror = (e) => {
        if (e.error === 'not-allowed') {
          setSpeechBlocked(true);
        }
      };

      utterance.onstart = () => {
        setSpeechBlocked(false);
      };

      speechUtteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [selectedVideo, isMuted, isPlaying, playbackSpeed, volume]
  );

  // Subtle telemetry pulse tone
  const playPulseBeep = useCallback(() => {
    if (isMuted || !isPlaying || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'running') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.015 * volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // AudioContext policy handled gracefully
    }
  }, [isMuted, isPlaying, volume]);

  // Handle Video Selection (Open YouTube Watch Page)
  const handleSelectVideo = (video: UCGVideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setCurrentSlideIndex(0);
    setCurrentTimeSec(0);
    setIsDescriptionExpanded(false);
    setNextVideoCountdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerFlash('play');
  };

  // Toggle Play / Pause
  const togglePlayPause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        triggerFlash('pause');
      } else {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          speakCurrentSlide(currentSlideIndex);
        }
        triggerFlash('play');
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Handle slide jump or scrub
  const seekToTime = (targetSec: number) => {
    if (!selectedVideo) return;
    const clamped = Math.max(0, Math.min(selectedVideo.durationSeconds, targetSec));
    setCurrentTimeSec(clamped);

    const slidesCount = selectedVideo.videoSlides.length;
    if (slidesCount > 0) {
      const slideDuration = selectedVideo.durationSeconds / slidesCount;
      const newIdx = Math.min(slidesCount - 1, Math.floor(clamped / slideDuration));
      if (newIdx !== currentSlideIndex) {
        setCurrentSlideIndex(newIdx);
        speakCurrentSlide(newIdx);
      }
    }
  };

  // Handle Seek in video progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedVideo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = Math.floor(pos * selectedVideo.durationSeconds);
    seekToTime(targetSec);
    triggerFlash('seek');
  };

  // Speed toggle (0.75x -> 1x -> 1.25x -> 1.5x -> 2x)
  const handleCycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    setPlaybackSpeed(nextSpeed);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPlaying) {
      speakCurrentSlide(currentSlideIndex);
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (nextMute) {
        window.speechSynthesis.cancel();
      } else {
        speakCurrentSlide(currentSlideIndex);
      }
    }
  };

  // Like button
  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setIsLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    setCommentsList((prev) => [
      {
        author: 'Sarah Namubiru (Patient)',
        role: 'Verified Patient',
        text: userComment.trim(),
        time: 'Just now'
      },
      ...prev
    ]);
    setUserComment('');
  };

  // Timer: progress through the video
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (selectedVideo && isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + playbackSpeed;
          if (next >= selectedVideo.durationSeconds) {
            // Video ended: start next video countdown
            setIsPlaying(false);
            setNextVideoCountdown(5);
            return selectedVideo.durationSeconds;
          }

          // Advance slide automatically according to time
          const slidesCount = selectedVideo.videoSlides.length;
          if (slidesCount > 0) {
            const slideDuration = selectedVideo.durationSeconds / slidesCount;
            const newIndex = Math.min(slidesCount - 1, Math.floor(next / slideDuration));
            if (newIndex !== currentSlideIndex) {
              setCurrentSlideIndex(newIndex);
              speakCurrentSlide(newIndex);
            }
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedVideo, isPlaying, playbackSpeed, currentSlideIndex, speakCurrentSlide]);

  // Autoplay next video countdown
  useEffect(() => {
    if (nextVideoCountdown === null || nextVideoCountdown <= 0) return;
    const countTimer = setTimeout(() => {
      if (nextVideoCountdown === 1 && selectedVideo) {
        // Find next video in list
        const currentIndex = UCG_DISEASE_VIDEOS.findIndex((v) => v.id === selectedVideo.id);
        const nextVideo = UCG_DISEASE_VIDEOS[(currentIndex + 1) % UCG_DISEASE_VIDEOS.length];
        handleSelectVideo(nextVideo);
      } else {
        setNextVideoCountdown(nextVideoCountdown - 1);
      }
    }, 1000);
    return () => clearTimeout(countTimer);
  }, [nextVideoCountdown, selectedVideo]);

  // Initialize Speech when video changes or user starts playback
  useEffect(() => {
    if (selectedVideo && isPlaying && !isMuted) {
      speakCurrentSlide(currentSlideIndex);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedVideo?.id, isPlaying, isMuted, speakCurrentSlide, currentSlideIndex]);

  // Preload background image for canvas
  useEffect(() => {
    if (selectedVideo) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedVideo.videoThumbnail;
      img.onload = () => {
        bgImageRef.current = img;
      };
    }
  }, [selectedVideo?.id]);

  // ══════════════════════════════════════════════════════════════════════
  // DYNAMIC 60FPS VIDEO CANVAS ANIMATION LOOP
  // ══════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!selectedVideo) return;

    let frameCount = 0;
    let ecgX = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isSubscribedLoop = true;

    const render = () => {
      if (!isSubscribedLoop || !canvas) return;

      const width = (canvas.width = canvas.parentElement?.clientWidth || 1280);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 720);

      frameCount++;

      // 1. Draw Background Image with Subtle Ken Burns Pan/Zoom
      if (bgImageRef.current && bgImageRef.current.complete) {
        const zoom = 1 + Math.sin(frameCount * 0.002) * 0.05;
        const panX = Math.sin(frameCount * 0.001) * 20;
        const panY = Math.cos(frameCount * 0.001) * 15;

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-width / 2 + panX, -height / 2 + panY);
        ctx.drawImage(bgImageRef.current, 0, 0, width, height);
        ctx.restore();
      } else {
        // Fallback clinical gradient
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#020617');
        bgGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Cinematic Dimmed Overlay
      const overlayGrad = ctx.createLinearGradient(0, 0, 0, height);
      overlayGrad.addColorStop(0, 'rgba(2, 6, 23, 0.75)');
      overlayGrad.addColorStop(0.5, 'rgba(2, 6, 23, 0.5)');
      overlayGrad.addColorStop(1, 'rgba(2, 6, 23, 0.92)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating Clinical Ambient Light Particles
      for (let i = 0; i < 15; i++) {
        const pX = ((i * 123 + frameCount * 0.8) % width);
        const pY = ((i * 87 + Math.sin(frameCount * 0.02 + i) * 30 + height * 0.3) % height);
        const pSize = (i % 3) + 1;
        ctx.beginPath();
        ctx.arc(pX, pY, pSize, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(45, 212, 191, 0.15)' : 'rgba(56, 189, 248, 0.12)';
        ctx.fill();
      }

      // 4. Real-time ECG Heart Monitor Telemetry Wave across the lower canvas
      const ecgY = height - 65;
      const speed = isPlaying ? 2.8 * playbackSpeed : 0;
      ecgX = (ecgX + speed) % width;

      // Draw ECG Grid Baseline
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, ecgY);
      ctx.lineTo(width, ecgY);
      ctx.stroke();

      // Sweeping ECG P-Q-R-S-T Signal
      ctx.save();
      ctx.shadowColor = '#2dd4bf';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const waveSpan = 180;
      for (let x = 0; x < width; x += 3) {
        const offset = (x - ecgX + width) % waveSpan;
        let y = ecgY;

        // Cardiac cycle formula
        if (offset > 20 && offset < 40) {
          // P-Wave
          y -= Math.sin(((offset - 20) / 20) * Math.PI) * 7;
        } else if (offset >= 45 && offset < 52) {
          // Q-Dip
          y += ((offset - 45) / 7) * 8;
        } else if (offset >= 52 && offset < 62) {
          // R-Spike (Peak)
          const prog = (offset - 52) / 10;
          y -= prog < 0.5 ? prog * 70 : (1 - prog) * 70;
          if (offset === 55 && isPlaying && frameCount % 60 === 0) {
            playPulseBeep();
          }
        } else if (offset >= 62 && offset < 70) {
          // S-Dip
          y += Math.sin(((offset - 62) / 8) * Math.PI) * 12;
        } else if (offset >= 90 && offset < 130) {
          // T-Wave
          y -= Math.sin(((offset - 90) / 40) * Math.PI) * 14;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Sweeping Beam Cursor
      ctx.fillStyle = '#a7f3d0';
      ctx.beginPath();
      ctx.arc(ecgX, ecgY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 5. Active Dynamic Audio Equalizer Bars (Top Right Canvas)
      const numBars = 18;
      const eqStartX = width - 180;
      const eqY = 40;
      for (let b = 0; b < numBars; b++) {
        const barHeight = isPlaying && !isMuted
          ? Math.abs(Math.sin(frameCount * 0.08 + b * 0.5)) * 22 + 4
          : 3;
        ctx.fillStyle = isPlaying ? '#38bdf8' : '#64748b';
        ctx.fillRect(eqStartX + b * 7, eqY - barHeight, 4, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isSubscribedLoop = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [selectedVideo, isPlaying, playbackSpeed, isMuted, playPulseBeep]);

  // Keyboard Shortcuts (Space: Play/Pause, Arrows: Seek, M: Mute, F: Fullscreen)
  useEffect(() => {
    if (!selectedVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekToTime(currentTimeSec - 10);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekToTime(currentTimeSec + 10);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          playerContainerRef.current?.requestFullscreen?.().catch(() => {});
          setIsFullscreen(true);
        } else {
          document.exitFullscreen?.().catch(() => {});
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo, currentTimeSec, isPlaying, isMuted, playbackSpeed]);

  // Format MM:SS
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ══════════════════════════════════════════════════════════════════════
  // VIEW 1: YOUTUBE THEATER / WATCH PLAYER VIEW (WHEN VIDEO SELECTED)
  // ══════════════════════════════════════════════════════════════════════
  if (selectedVideo) {
    const activeSlide =
      selectedVideo.videoSlides[currentSlideIndex] || selectedVideo.videoSlides[0];
    const progressPercent = Math.min(
      100,
      (currentTimeSec / selectedVideo.durationSeconds) * 100
    );

    return (
      <div className="space-y-6 pb-28 text-white max-w-full overflow-x-hidden">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              setSelectedVideo(null);
            }}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Guidelines</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 font-bold border border-red-500/30">
              {selectedVideo.ucgChapter}
            </span>
            <span className="hidden sm:inline bg-slate-800 px-2.5 py-1 rounded-full font-mono text-[11px] text-slate-300">
              Level: {selectedVideo.levelOfCare}
            </span>
          </div>
        </div>

        {/* ── 2-COLUMN YOUTUBE LAYOUT (MAIN PLAYER + RECOMMENDED SIDEBAR) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: MAIN VIDEO PLAYER & DETAILS (8 COLUMNS ON DESKTOP) */}
          <div className="lg:col-span-8 space-y-4">
            {/* 16:9 CINEMATIC AI VIDEO CANVAS PLAYER CONTAINER */}
            <div
              ref={playerContainerRef}
              className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group flex flex-col justify-between select-none"
            >
              {/* 1. Real-time Animated HTML5 Canvas Video Layer */}
              <canvas
                ref={canvasRef}
                onClick={togglePlayPause}
                className="absolute inset-0 w-full h-full object-cover z-0 cursor-pointer"
              />

              {/* 2. Interactive Center Play/Pause Overlay When Paused or Initial */}
              {!isPlaying && (
                <div
                  onClick={togglePlayPause}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all group-hover:bg-black/30 cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform active:scale-95 border-2 border-white/20">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-bold text-white tracking-wide bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-800">
                    Tap to Play UCG Clinical Masterclass
                  </p>
                </div>
              )}

              {/* 3. Action Flash Indicator Icon (+10 / -10 / play / pause) */}
              {flashAction && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-ping">
                  <div className="w-16 h-16 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white">
                    {flashAction === 'play' && <Play className="w-8 h-8 fill-white" />}
                    {flashAction === 'pause' && <Pause className="w-8 h-8 fill-white" />}
                    {flashAction === 'seek' && <RotateCw className="w-8 h-8" />}
                  </div>
                </div>
              )}

              {/* 4. Autoplay Audio Banner / Unmute Helper if Speech Blocked */}
              {speechBlocked && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
                  <button
                    onClick={() => {
                      setSpeechBlocked(false);
                      setIsMuted(false);
                      speakCurrentSlide(currentSlideIndex);
                    }}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-xl animate-bounce"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Click to Enable Doctor Voice Audio</span>
                  </button>
                </div>
              )}

              {/* 5. Active Clinical Presentation Overlay Content */}
              <div
                onClick={togglePlayPause}
                className="relative z-10 flex-1 p-4 sm:p-6 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Overlay Badge & Telemetry Bar */}
                <div className="flex items-center justify-between pointer-events-none">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>LIVE UCG 2023</span>
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[10px] font-bold truncate max-w-[200px]">
                      {selectedVideo.diseaseName}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-teal-400 font-mono">
                    <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                    <span className="hidden sm:inline">Telemetry Active • MoH Guidelines</span>
                  </div>
                </div>

                {/* Center Dynamic Clinical Slide Presentation Card */}
                <div className="my-auto max-w-xl space-y-2.5 bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-teal-500/40 shadow-2xl pointer-events-auto">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>
                        Slide {currentSlideIndex + 1} of {selectedVideo.videoSlides.length} • {activeSlide.badge}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/60">
                      {activeSlide.timing}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                    {activeSlide.title}
                  </h3>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-100">
                    {activeSlide.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0 shadow-sm" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Presenter PIP & Dynamic Voice Subtitle Caption */}
                <div className="flex items-end justify-between gap-3 pointer-events-none">
                  {/* Doctor Speech Subtitle Bar */}
                  <div className="flex-1 bg-slate-950/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center space-x-2.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span className="truncate">
                      <strong className="text-teal-300">{selectedVideo.speakerName}:</strong>{' '}
                      <span className="text-slate-100">
                        "{activeSlide.title} — {activeSlide.keyPoints[0]}"
                      </span>
                    </span>
                  </div>

                  {/* Doctor Picture-in-Picture with Speech Spectrum Ring */}
                  <div className="w-20 sm:w-24 h-16 sm:h-20 rounded-2xl overflow-hidden border-2 border-teal-500 shadow-2xl relative bg-slate-900 shrink-0">
                    <img
                      src={selectedVideo.speakerAvatar}
                      alt={selectedVideo.speakerName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                    <div className="absolute bottom-1 inset-x-1.5 flex items-center justify-between">
                      <span className="text-[8px] font-bold text-white truncate max-w-[65%]">
                        {selectedVideo.speakerName.split(' ')[0]}
                      </span>
                      {isPlaying && !isMuted ? (
                        <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
                      ) : (
                        <span className="text-[8px] text-slate-400">Off</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Next Video Autoplay Countdown Modal */}
              {nextVideoCountdown !== null && (
                <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                    Up Next in {nextVideoCountdown}s
                  </span>
                  <h3 className="text-lg font-bold text-white max-w-md">
                    {UCG_DISEASE_VIDEOS[(UCG_DISEASE_VIDEOS.findIndex((v) => v.id === selectedVideo.id) + 1) % UCG_DISEASE_VIDEOS.length].title}
                  </h3>
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => setNextVideoCountdown(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = UCG_DISEASE_VIDEOS.findIndex((v) => v.id === selectedVideo.id);
                        const nextVideo = UCG_DISEASE_VIDEOS[(currentIndex + 1) % UCG_DISEASE_VIDEOS.length];
                        handleSelectVideo(nextVideo);
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-lg"
                    >
                      Play Now
                    </button>
                  </div>
                </div>
              )}

              {/* ── YOUTUBE SCRUBBER & VIDEO CONTROLS BAR ── */}
              <div className="relative z-30 bg-gradient-to-t from-black via-black/95 to-transparent pt-4 pb-2.5 px-3 sm:px-4 space-y-1.5">
                {/* Clickable Scrubber Progress Bar with Slide Chapter Marks */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-2 hover:h-3 bg-white/20 rounded-full cursor-pointer transition-all group/scrub"
                >
                  {/* Chapter tick marks */}
                  {selectedVideo.videoSlides.map((_, idx) => {
                    const markPct = (idx / selectedVideo.videoSlides.length) * 100;
                    return (
                      <span
                        key={idx}
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-950 z-10"
                        style={{ left: `${markPct}%` }}
                      />
                    );
                  })}

                  <div
                    className="h-full bg-red-600 rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-red-600 scale-0 group-hover/scrub:scale-100 transition-transform shadow-lg border-2 border-white" />
                  </div>
                </div>

                {/* Control Buttons Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlayPause}
                      className="p-1.5 hover:text-red-500 transition-colors"
                      title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-white" />
                      ) : (
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Rewind 10s */}
                    <button
                      onClick={() => seekToTime(currentTimeSec - 10)}
                      className="p-1 hover:text-slate-300 transition-colors"
                      title="Rewind 10s (Left Arrow)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Forward 10s */}
                    <button
                      onClick={() => seekToTime(currentTimeSec + 10)}
                      className="p-1 hover:text-slate-300 transition-colors"
                      title="Skip 10s (Right Arrow)"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Volume Mute & Slider */}
                    <div className="flex items-center space-x-1 group/vol">
                      <button
                        onClick={handleToggleMute}
                        className="p-1 hover:text-slate-300 transition-colors"
                        title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-red-400" />
                        ) : volume > 0.5 ? (
                          <Volume2 className="w-4 h-4" />
                        ) : (
                          <Volume1 className="w-4 h-4" />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setVolume(val);
                          setIsMuted(val === 0);
                        }}
                        className="w-14 h-1 bg-white/30 accent-red-600 rounded cursor-pointer hidden sm:inline"
                        title="Speech Volume"
                      />
                    </div>

                    {/* Time Counter */}
                    <span className="text-[11px] font-mono text-slate-300">
                      {formatSeconds(currentTimeSec)} / {selectedVideo.videoDuration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Previous/Next Slide */}
                    <button
                      onClick={() => {
                        const newIdx = Math.max(0, currentSlideIndex - 1);
                        setCurrentSlideIndex(newIdx);
                        const slideSec = (selectedVideo.durationSeconds / selectedVideo.videoSlides.length) * newIdx;
                        setCurrentTimeSec(Math.floor(slideSec));
                        speakCurrentSlide(newIdx);
                      }}
                      disabled={currentSlideIndex === 0}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      title="Previous Section"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                      Section {currentSlideIndex + 1}/{selectedVideo.videoSlides.length}
                    </span>

                    <button
                      onClick={() => {
                        const newIdx = Math.min(selectedVideo.videoSlides.length - 1, currentSlideIndex + 1);
                        setCurrentSlideIndex(newIdx);
                        const slideSec = (selectedVideo.durationSeconds / selectedVideo.videoSlides.length) * newIdx;
                        setCurrentTimeSec(Math.floor(slideSec));
                        speakCurrentSlide(newIdx);
                      }}
                      disabled={currentSlideIndex === selectedVideo.videoSlides.length - 1}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      title="Next Section"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Playback Speed Toggle */}
                    <button
                      onClick={handleCycleSpeed}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold font-mono transition-colors"
                      title="Playback Speed"
                    >
                      {playbackSpeed}x
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          playerContainerRef.current?.requestFullscreen?.().catch(() => {});
                          setIsFullscreen(true);
                        } else {
                          document.exitFullscreen?.().catch(() => {});
                          setIsFullscreen(false);
                        }
                      }}
                      className="p-1 hover:text-slate-300 transition-colors"
                      title="Toggle Fullscreen (F)"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CHAPTER JUMP BAR (CLICK TO SEEK DIRECTLY TO SLIDE) ── */}
            <div className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">
                Chapters:
              </span>
              {selectedVideo.videoSlides.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                const slideSec = (selectedVideo.durationSeconds / selectedVideo.videoSlides.length) * idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      setCurrentTimeSec(Math.floor(slideSec));
                      speakCurrentSlide(idx);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-teal-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <span>{idx + 1}.</span>
                    <span className="truncate max-w-[140px]">{slide.title}</span>
                  </button>
                );
              })}
            </div>

            {/* ── VIDEO TITLE & ACTION BUTTONS ROW (PURE YOUTUBE) ── */}
            <div className="space-y-3 pt-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight">
                {selectedVideo.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                {/* Channel / Presenter Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedVideo.speakerAvatar}
                    alt={selectedVideo.speakerName}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-slate-700 shadow"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm text-white leading-tight">
                        {selectedVideo.channelName}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-400 leading-tight">
                      Presented by {selectedVideo.speakerName} • 184K subscribers
                    </p>
                  </div>

                  {/* Subscribe Button */}
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`ml-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      isSubscribed
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white hover:bg-slate-200 text-slate-950 shadow-md active:scale-95'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                </div>

                {/* YouTube Action Buttons: Like, Share, Ask Doctor */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleLike}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      isLiked
                        ? 'bg-white text-slate-950'
                        : 'bg-slate-800/90 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likeCount.toLocaleString()}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Video link copied to clipboard!');
                      }
                    }}
                    className="px-3.5 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>

                  {onConsultDoctor && (
                    <button
                      onClick={() => onConsultDoctor(selectedVideo.speakerName)}
                      className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold flex items-center space-x-1.5 shadow-md shadow-teal-500/20 transition-all active:scale-95"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Consult Doctor</span>
                    </button>
                  )}
                </div>
              </div>

              {/* ── EXPANDABLE YOUTUBE DESCRIPTION BOX ── */}
              <div
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="bg-slate-900/90 hover:bg-slate-850 p-4 rounded-2xl border border-slate-800/80 cursor-pointer transition-colors space-y-2.5 text-xs sm:text-sm text-slate-200"
              >
                <div className="flex flex-wrap items-center gap-2 font-bold text-slate-300 text-xs">
                  <span>{selectedVideo.views} views</span>
                  <span>•</span>
                  <span>{selectedVideo.publishedDate}</span>
                  <span>•</span>
                  <span className="text-teal-400">{selectedVideo.ucgChapter}</span>
                  <span>•</span>
                  <span className="text-amber-400">{selectedVideo.levelOfCare}</span>
                </div>

                <p className="leading-relaxed font-normal text-slate-300">
                  {selectedVideo.summary}
                </p>

                {/* Expanded Detailed Guideline Extraction directly from UCG 2023 */}
                {isDescriptionExpanded ? (
                  <div className="pt-3 border-t border-slate-800 space-y-4 text-xs">
                    {/* Case Definition */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-amber-300 uppercase tracking-wide">
                        1. Case Definition & Diagnostic Criteria
                      </h4>
                      <p className="text-slate-300">
                        {selectedVideo.clinicalGuideline.caseDefinition}
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-1 pt-1">
                        {selectedVideo.clinicalGuideline.diagnosticCriteria.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Investigations */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-teal-300 uppercase tracking-wide">
                        2. Laboratory Investigations & Tests
                      </h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedVideo.clinicalGuideline.investigations.map((inv, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px]"
                          >
                            ✓ {inv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Treatment Protocol & Dosages */}
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-emerald-300 uppercase tracking-wide">
                        3. First-Line Medicines & Dosages (UCG 2023)
                      </h4>
                      <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                        {selectedVideo.clinicalGuideline.firstLineMedicines.map((med, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span className="text-slate-200 font-medium">{med}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Danger Signs */}
                    <div className="space-y-1 bg-red-950/20 border border-red-500/30 p-3 rounded-xl">
                      <h4 className="font-bold text-red-400 uppercase tracking-wide flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>4. Red Flag Danger Signs (Immediate Escalation)</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-0.5 text-red-200/90 pl-1">
                        {selectedVideo.clinicalGuideline.dangerSigns.map((sign, idx) => (
                          <li key={idx}>{sign}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Referral Protocol */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-blue-300 uppercase tracking-wide">
                        5. Hospital Referral Protocol
                      </h4>
                      <p className="text-slate-300">
                        {selectedVideo.clinicalGuideline.referralProtocol}
                      </p>
                    </div>

                    {/* Prevention & Counseling */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-purple-300 uppercase tracking-wide">
                        6. Patient Self-Care & Prevention Advice
                      </h4>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-1">
                        {selectedVideo.clinicalGuideline.preventionCounseling.map(
                          (counsel, idx) => (
                            <li key={idx}>{counsel}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <p className="text-[11px] text-teal-400 font-bold pt-1">
                      Show less ▲
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-teal-400 font-bold pt-0.5">
                    ...Show full clinical protocol (dosages, investigations & danger signs) ▼
                  </p>
                )}
              </div>

              {/* ── YOUTUBE COMMENTS SECTION ── */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-extrabold text-white">
                    Clinical Discussion ({commentsList.length})
                  </h3>
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-extrabold text-xs flex items-center justify-center shrink-0">
                    SN
                  </div>
                  <input
                    type="text"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Add a clinical question or comment on this guideline..."
                    className="flex-1 bg-transparent border-b border-slate-700 focus:border-white text-xs sm:text-sm text-white placeholder-slate-500 py-1.5 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!userComment.trim()}
                    className="px-4 py-1.5 rounded-full bg-white disabled:opacity-40 text-slate-950 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-3.5 pt-2">
                  {commentsList.map((comm, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {comm.author.charAt(0)}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs">{comm.author}</span>
                          <span className="text-[10px] text-slate-500">{comm.time}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{comm.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: YOUTUBE "UP NEXT" RECOMMENDED VIDEOS SIDEBAR (4 COLUMNS) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 px-1">
              Recommended Guidelines (UCG 2023)
            </h3>

            <div className="space-y-3">
              {UCG_DISEASE_VIDEOS.filter((v) => v.id !== selectedVideo.id)
                .slice(0, 12)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectVideo(item)}
                    className="flex space-x-3 cursor-pointer group rounded-xl p-1 hover:bg-slate-900 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-36 sm:w-40 aspect-video rounded-xl overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={item.videoThumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/85 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded">
                        {item.videoDuration}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-teal-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate flex items-center space-x-1">
                        <span>{item.channelName.split('•')[0]}</span>
                        <CheckCircle2 className="w-2.5 h-2.5 text-slate-400 inline" />
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {item.views} views • {item.publishedDate}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // VIEW 2: YOUTUBE VIDEO BROWSER / GRID VIEW (DEFAULT)
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-4 pb-28 text-white max-w-full overflow-x-hidden">
      {/* ── TOP YOUTUBE HEADER BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* YouTube Brand Badge */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center space-x-1.5">
              <span>VitaNova HealthTube</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                UCG 2023
              </span>
            </h1>
          </div>
        </div>

        {/* YouTube Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guidelines by disease or medicine (e.g., Malaria, Amlodipine, Pre-eclampsia)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
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

        {/* Guideline Count Badge */}
        <span className="hidden lg:inline text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          24 Guidelines • MoH Uganda
        </span>
      </div>

      {/* ── YOUTUBE CATEGORY CHIPS (HORIZONTAL SCROLL) ── */}
      <div className="flex space-x-2 overflow-x-auto pb-1.5 pt-1 scrollbar-none no-scrollbar sticky top-16 z-20 bg-slate-950/90 backdrop-blur-md py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
              selectedCategory === cat
                ? 'bg-white text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── EMPTY STATE ── */}
      {filteredVideos.length === 0 && (
        <div className="p-12 text-center space-y-3 bg-slate-900/50 rounded-3xl border border-slate-800 max-w-md mx-auto my-8">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No guideline videos found</h3>
          <p className="text-xs text-slate-400">
            No disease matched "{searchQuery}". Try searching for Malaria, Hypertension, Diabetes, or Asthma.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}

      {/* ── YOUTUBE VIDEO GRID (MODERN YOUTUBE CARDS) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleSelectVideo(video)}
            className="flex flex-col space-y-2.5 cursor-pointer group select-none"
          >
            {/* 16:9 Thumbnail Box */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/60 shadow-md group-hover:shadow-xl transition-all duration-300">
              <img
                src={video.videoThumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Center Play Button Prompt on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Top-Left Level of Care Pill */}
              <div className="absolute top-2 left-2">
                <span className="bg-slate-950/85 backdrop-blur-md text-[10px] font-extrabold text-teal-300 px-2 py-0.5 rounded-md border border-teal-500/30">
                  {video.levelOfCare.split('–')[0].trim()}
                </span>
              </div>

              {/* Bottom-Right Duration Badge */}
              <div className="absolute bottom-2 right-2">
                <span className="bg-black/90 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded shadow">
                  {video.videoDuration}
                </span>
              </div>
            </div>

            {/* Below Thumbnail Details (Channel Avatar + Title + Views) */}
            <div className="flex items-start space-x-3 px-0.5">
              {/* Doctor / Presenter Avatar */}
              <img
                src={video.speakerAvatar}
                alt={video.speakerName}
                className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0 mt-0.5"
              />

              {/* Text Block */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-teal-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <span className="truncate">{video.channelName.split('•')[0]}</span>
                  <CheckCircle2 className="w-3 h-3 text-slate-400 shrink-0" />
                </p>
                <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.publishedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationView;
