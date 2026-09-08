import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Play,
  Pause,
  Download,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Search,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  BookOpen,
  HeartPulse,
  AlertTriangle,
  ArrowLeft,
  X,
  Share2,
  BookmarkCheck,
  Stethoscope
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';

interface EducationViewProps {
  articles: HealthEducationArticle[];
  onToggleDownload: (articleId: string) => Promise<void>;
  onConsultDoctor?: (doctorName: string) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  articles,
  onToggleDownload,
  onConsultDoctor
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<HealthEducationArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeContentTab, setActiveContentTab] = useState<'overview' | 'causes' | 'symptoms' | 'prevention' | 'treatment'>('overview');

  // Video Player Simulation State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(30); // percentage

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (selectedArticle && isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress((prev) => (prev >= 98 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [selectedArticle, isPlaying]);

  const categories = [
    'all',
    'Chronic Disease',
    'Infectious Diseases',
    'Maternal Health',
    'Child Health',
    'Nutrition'
  ];

  const filteredArticles = articles
    .filter((a) => selectedCategory === 'all' || a.category === selectedCategory)
    .filter((a) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.diseaseName.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.speakerName.toLowerCase().includes(q)
      );
    });

  const handleOpenTalk = (article: HealthEducationArticle) => {
    setSelectedArticle(article);
    setIsPlaying(true);
    setPlaybackProgress(15);
    setActiveContentTab('overview');
  };

  return (
    <div className="space-y-6 pb-24 max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border border-teal-500/20 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Video className="w-3.5 h-3.5 text-teal-400" />
              <span>Doctor-Led Video Talks</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Ugandan Clinical Context</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Health Education Talks & Disease Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Watch certified Ugandan physicians and midwives explain common conditions from root causes and early signs to local prevention and hospital treatments. Download any talk to watch anytime without data.
          </p>
        </div>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search talks by disease (e.g., Blood Pressure, Diabetes, Malaria)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category horizontal scroll */}
        <div className="flex space-x-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Video Talks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center space-y-3 max-w-lg mx-auto">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No video talks found</h3>
          <p className="text-xs text-slate-400">
            We couldn't find any talks matching "{searchQuery}". Try searching for hypertension, diabetes, or malaria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold hover:bg-teal-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Video Talks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-slate-900 rounded-3xl border border-slate-800/80 overflow-hidden hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-teal-500/5"
          >
            {/* Top Thumbnail & Video Preview */}
            <div>
              <div
                className="relative cursor-pointer aspect-video overflow-hidden bg-slate-950"
                onClick={() => handleOpenTalk(article)}
              >
                <img
                  src={article.videoThumbnail || article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-teal-500/90 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-teal-400 transition-transform duration-200">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-500/30">
                    {article.category}
                  </span>
                  {article.isDownloaded ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 flex items-center space-x-1 shadow-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Saved Offline</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-300 backdrop-blur-md">
                      HD Video
                    </span>
                  )}
                </div>

                {/* Bottom Video Duration & Disease Badge */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-slate-950/90 backdrop-blur-md font-mono font-bold text-[11px] px-2 py-0.5 rounded-md flex items-center space-x-1 border border-slate-800">
                    <Clock className="w-3 h-3 text-teal-400" />
                    <span>{article.videoDuration || '8:00'} min talk</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 truncate max-w-[50%]">
                    {article.diseaseName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5">
                {/* Speaker Info */}
                <div className="flex items-center space-x-2.5">
                  <img
                    src={article.speakerAvatar}
                    alt={article.speakerName}
                    className="w-8 h-8 rounded-full object-cover border border-teal-500/40 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">{article.speakerName}</h4>
                    <p className="text-[10px] text-teal-400 truncate">{article.speakerRole}</p>
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3
                    onClick={() => handleOpenTalk(article)}
                    className="text-sm sm:text-base font-bold text-white hover:text-teal-300 transition-colors cursor-pointer line-clamp-2 leading-snug break-words"
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed break-words">
                    {article.summary}
                  </p>
                </div>

                {/* Quick Outline Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                    Causes
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                    Symptoms
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                    Ugandan Diet
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                    Hospital Treatment
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-3 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
              <button
                onClick={() => handleOpenTalk(article)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-teal-300" />
                <span>Watch Talk</span>
              </button>

              <button
                onClick={() => onToggleDownload(article.id)}
                title={article.isDownloaded ? 'Saved in IndexedDB offline storage' : 'Save for offline watching without mobile data'}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                  article.isDownloaded
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="text-[11px]">{article.isDownloaded ? 'Offline Ready' : 'Download'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN VIDEO TALK & DISEASE BREAKDOWN MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl my-auto overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0">
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
                  {selectedArticle.category}
                </span>
                <span className="text-xs font-bold text-amber-300 truncate">
                  {selectedArticle.diseaseName}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onToggleDownload(selectedArticle.id)}
                  className={`p-2 rounded-xl text-xs border transition-colors ${
                    selectedArticle.isDownloaded
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={selectedArticle.isDownloaded ? 'Cached for offline' : 'Download talk'}
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
              {/* Interactive Video Player */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-slate-800 shadow-xl group">
                <img
                  src={selectedArticle.videoThumbnail || selectedArticle.thumbnail}
                  alt={selectedArticle.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isPlaying ? 'opacity-70' : 'opacity-90'
                  }`}
                />

                {/* Animated Doctor Video Call / Speaking Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 pointer-events-none">
                  {/* Top Doctor Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-slate-800">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-xs font-bold text-white">{selectedArticle.speakerName}</span>
                      <span className="text-[10px] text-teal-400">({selectedArticle.speakerRole})</span>
                    </div>

                    <div className="bg-teal-950/80 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold">
                      {isPlaying ? 'PLAYING HD' : 'PAUSED'}
                    </div>
                  </div>

                  {/* Center Play/Pause button on pause */}
                  {!isPlaying && (
                    <div className="flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center shadow-2xl">
                        <Play className="w-6 h-6 fill-slate-950 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Live Caption / Topic Banner */}
                  <div className="bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800/80 max-w-xl">
                    <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2">
                      🗣️ <span className="text-teal-300 font-semibold">{selectedArticle.speakerName}:</span> "In our clinical experience across Uganda, early understanding of {selectedArticle.diseaseName} prevents 80% of complications."
                    </p>
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-3 pt-6 flex flex-col space-y-2">
                  {/* Progress Scrubber */}
                  <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-teal-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${playbackProgress}%` }}
                    ></div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 hover:text-teal-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 hover:text-teal-400 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="font-mono text-[11px] text-slate-400">
                        {Math.floor((playbackProgress / 100) * 8)}:
                        {String(Math.floor(((playbackProgress / 100) * 480) % 60)).padStart(2, '0')}{' '}
                        / {selectedArticle.videoDuration || '08:45'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-emerald-400 font-semibold hidden sm:inline">
                        1080p Crystal Audio
                      </span>
                      <button
                        onClick={() => {
                          const elem = document.fullscreenElement;
                          if (!elem) {
                            document.documentElement.requestFullscreen?.().catch(() => {});
                          }
                        }}
                        className="p-1.5 hover:text-teal-400 transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Talk Title & Speaker Strip */}
              <div className="space-y-2">
                <h2 className="text-lg sm:text-2xl font-black text-white leading-tight break-words">
                  {selectedArticle.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center space-x-2">
                    <img
                      src={selectedArticle.speakerAvatar}
                      alt={selectedArticle.speakerName}
                      className="w-9 h-9 rounded-full object-cover border border-teal-500/50"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{selectedArticle.speakerName}</p>
                      <p className="text-[11px] text-teal-400">{selectedArticle.speakerRole}</p>
                    </div>
                  </div>

                  {onConsultDoctor && (
                    <button
                      onClick={() => {
                        onConsultDoctor(selectedArticle.speakerName);
                        setSelectedArticle(null);
                      }}
                      className="ml-auto px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Ask Dr. Mukasa a Question</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Disease Deep-Dive Navigation Tabs */}
              <div className="border-b border-slate-800">
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                  {[
                    { id: 'overview', label: '1. Overview' },
                    { id: 'causes', label: '2. Causes & Risks' },
                    { id: 'symptoms', label: '3. Symptoms' },
                    { id: 'prevention', label: '4. Prevention & Diet' },
                    { id: 'treatment', label: '5. Hospital Treatment' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveContentTab(tab.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeContentTab === tab.id
                          ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm'
                          : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents: Properly fit on phone screen with word-wrapping and clear readability */}
              <div className="space-y-4">
                {/* 1. OVERVIEW */}
                {activeContentTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                      <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <HeartPulse className="w-4 h-4" />
                        <span>Clinical Overview & Ugandan Context</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words">
                        {selectedArticle.talkContent.overview}
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/20 space-y-1.5">
                      <h5 className="text-xs font-bold text-teal-300">Why this video talk matters for your family:</h5>
                      <p className="text-xs text-slate-300 leading-relaxed break-words">
                        {selectedArticle.summary}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. CAUSES */}
                {activeContentTab === 'causes' && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        Primary Causes & Risk Factors in Uganda
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedArticle.talkContent.causes.map((cause, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-start space-x-3"
                        >
                          <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words flex-1">
                            {cause}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. SYMPTOMS */}
                {activeContentTab === 'symptoms' && (
                  <div className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Signs & Symptoms to Watch Out For
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedArticle.talkContent.symptoms.map((symptom, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2"></div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words flex-1">
                            {symptom}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. PREVENTION & LOCAL DIET */}
                {activeContentTab === 'prevention' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                      <h4 className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Ugandan Dietary Practices & Prevention Tips</span>
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedArticle.talkContent.prevention.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start space-x-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words flex-1">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. TREATMENT & HOSPITAL PROTOCOL */}
                {activeContentTab === 'treatment' && (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/40">
                      <h4 className="text-xs sm:text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <Stethoscope className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Medical Care, Medications & Hospital Treatment</span>
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedArticle.talkContent.treatment.map((tx, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-start space-x-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            ✓
                          </span>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words flex-1">
                            {tx}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* EMERGENCY WARNING BOX (Always visible on all tabs at the bottom) */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2 mt-4">
                  <div className="flex items-center space-x-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <h5 className="text-xs font-bold uppercase tracking-wider">
                      When to Go Directly to Hospital Emergency
                    </h5>
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed break-words">
                    {selectedArticle.talkContent.whenToSeekEmergency}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Close Talk
              </button>

              <button
                onClick={() => onToggleDownload(selectedArticle.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  selectedArticle.isDownloaded
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{selectedArticle.isDownloaded ? 'Downloaded Offline' : 'Download for Offline Study'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EducationView;
