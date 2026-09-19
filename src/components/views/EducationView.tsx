import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Download,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Activity,
  Send,
  MessageSquare,
  FileText,
  AlertTriangle,
  X,
  SlidersHorizontal
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
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(4820);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

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

  // Handle Video Selection (Open YouTube Watch Page)
  const handleSelectVideo = (video: UCGVideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setCurrentSlideIndex(0);
    setCurrentTimeSec(15);
    setIsDescriptionExpanded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timer simulation for active video presentation playback
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (selectedVideo && isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + playbackSpeed;
          if (next >= selectedVideo.durationSeconds) {
            return 0;
          }
          // Advance slide automatically according to time
          const slidesCount = selectedVideo.videoSlides.length;
          if (slidesCount > 0) {
            const slideDuration = selectedVideo.durationSeconds / slidesCount;
            const newIndex = Math.min(slidesCount - 1, Math.floor(next / slideDuration));
            setCurrentSlideIndex(newIndex);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedVideo, isPlaying, playbackSpeed]);

  // Format MM:SS
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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

  // Handle Seek in video progress
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedVideo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = Math.floor(pos * selectedVideo.durationSeconds);
    setCurrentTimeSec(targetSec);
    const slidesCount = selectedVideo.videoSlides.length;
    if (slidesCount > 0) {
      const slideDuration = selectedVideo.durationSeconds / slidesCount;
      setCurrentSlideIndex(Math.min(slidesCount - 1, Math.floor(targetSec / slideDuration)));
    }
  };

  // Speed toggle (1x -> 1.25x -> 1.5x -> 2x)
  const handleCycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
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
            onClick={() => setSelectedVideo(null)}
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
            {/* 16:9 CINEMATIC AI VIDEO CANVAS PLAYER */}
            <div
              ref={playerContainerRef}
              className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group flex flex-col justify-between"
            >
              {/* Background Video Visual Layer (Dynamic Presentation Screen) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={selectedVideo.videoThumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover filter brightness-[0.25] blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
              </div>

              {/* ── ACTIVE AI CLINICAL PRESENTATION CANVAS ── */}
              <div className="relative z-10 flex-1 p-4 sm:p-6 flex flex-col justify-between">
                {/* Top Overlay Badge & Level of Care */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                      LIVE UCG 2023
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                      {selectedVideo.diseaseName}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-teal-400 font-mono">
                    <Activity className="w-3 h-3 text-teal-400 animate-pulse" />
                    <span>MoH Uganda Approved Protocol</span>
                  </div>
                </div>

                {/* Center Clinical Slide Content (Dynamic AI Presentation) */}
                <div className="my-auto max-w-xl space-y-2.5 bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/60 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                      Slide {currentSlideIndex + 1} of {selectedVideo.videoSlides.length} •{' '}
                      {activeSlide.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {activeSlide.timing}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                    {activeSlide.title}
                  </h3>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                    {activeSlide.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Presenter PIP & Dynamic Voice Caption */}
                <div className="flex items-end justify-between gap-3">
                  {/* Doctor Speech Subtitle Bar */}
                  <div className="flex-1 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span className="truncate">
                      <strong className="text-teal-300">{selectedVideo.speakerName}:</strong>{' '}
                      "According to the 2023 Uganda Clinical Guidelines, {activeSlide.title.toLowerCase()}..."
                    </span>
                  </div>

                  {/* Doctor Video Picture-in-Picture with Audio Waveform */}
                  <div className="w-24 sm:w-28 h-20 sm:h-24 rounded-2xl overflow-hidden border-2 border-teal-500/70 shadow-2xl relative bg-slate-900 shrink-0">
                    <img
                      src={selectedVideo.speakerAvatar}
                      alt={selectedVideo.speakerName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Animated equalizer waves */}
                    <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-between">
                      <span className="text-[8px] font-bold text-white truncate max-w-[60%]">
                        {selectedVideo.speakerName.split(' ')[0]}
                      </span>
                      <div className="flex items-center space-x-0.5">
                        {[40, 80, 50, 95, 60].map((h, i) => (
                          <span
                            key={i}
                            className="w-0.5 bg-teal-400 rounded-full transition-all duration-200"
                            style={{
                              height: isPlaying ? `${(h * (currentTimeSec % 3 + 1)) / 30}px` : '3px'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── YOUTUBE SCRUBBER & VIDEO CONTROLS BAR ── */}
              <div className="relative z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-4 pb-2 px-3 sm:px-4 space-y-1.5">
                {/* Clickable Scrubber Progress Bar */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer transition-all group/scrub"
                >
                  <div
                    className="h-full bg-red-600 rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-600 scale-0 group-hover/scrub:scale-100 transition-transform shadow" />
                  </div>
                </div>

                {/* Control Buttons Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Play/Pause */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 hover:text-red-500 transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-white" />
                      ) : (
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Rewind 10s */}
                    <button
                      onClick={() => setCurrentTimeSec((t) => Math.max(0, t - 10))}
                      className="p-1 hover:text-slate-300 transition-colors"
                      title="Rewind 10 seconds"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Forward 10s */}
                    <button
                      onClick={() =>
                        setCurrentTimeSec((t) =>
                          Math.min(selectedVideo.durationSeconds, t + 10)
                        )
                      }
                      className="p-1 hover:text-slate-300 transition-colors"
                      title="Skip 10 seconds"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Volume Mute */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 hover:text-slate-300 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-red-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    {/* Time Counter */}
                    <span className="text-[11px] font-mono text-slate-300">
                      {formatSeconds(currentTimeSec)} / {selectedVideo.videoDuration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Previous/Next Slide */}
                    <button
                      onClick={() => setCurrentSlideIndex((i) => Math.max(0, i - 1))}
                      disabled={currentSlideIndex === 0}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                      Slide {currentSlideIndex + 1}/{selectedVideo.videoSlides.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentSlideIndex((i) =>
                          Math.min(selectedVideo.videoSlides.length - 1, i + 1)
                        )
                      }
                      disabled={
                        currentSlideIndex === selectedVideo.videoSlides.length - 1
                      }
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      title="Next Slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Playback Speed */}
                    <button
                      onClick={handleCycleSpeed}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold font-mono transition-colors"
                      title="Playback Speed"
                    >
                      {playbackSpeed}x
                    </button>

                    {/* Fullscreen */}
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

            {/* ── VIDEO TITLE ── */}
            <div className="space-y-3 pt-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight">
                {selectedVideo.title}
              </h1>

              {/* ── CHANNEL BAR & ACTION BUTTONS ROW (PURE YOUTUBE) ── */}
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

                {/* YouTube Action Buttons: Like, Share, Download UCG, Ask Doctor */}
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
                .slice(0, 10)
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
