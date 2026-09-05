import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  CheckCircle2,
  Clock,
  Video,
  ShieldAlert,
  HelpCircle,
  Search,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';

interface EducationViewProps {
  articles: HealthEducationArticle[];
  onToggleDownload: (articleId: string) => Promise<void>;
}

export const EducationView: React.FC<EducationViewProps> = ({
  articles,
  onToggleDownload
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<HealthEducationArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'all',
    'Chronic Disease',
    'Maternal Health',
    'First Aid',
    'Child Health',
    'Nutrition'
  ];

  const filteredArticles = articles
    .filter((a) => selectedCategory === 'all' || a.category === selectedCategory)
    .filter((a) =>
      searchQuery
        ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Health Education Library</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            Offline Downloadable
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Evidence-based healthcare guides in clear Ugandan context. Download once, read anytime without mobile data.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search health guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500 sm:w-64"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="relative">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-44 object-cover"
                />
                {article.videoDuration && (
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-sm text-white font-medium text-[10px] px-2 py-0.5 rounded-md flex items-center space-x-1">
                    <Video className="w-3 h-3 text-teal-400" />
                    <span>{article.videoDuration}</span>
                  </span>
                )}
                {article.isDownloaded ? (
                  <span className="absolute top-2 right-2 bg-emerald-500/90 text-slate-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Available Offline</span>
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-slate-900/80 text-slate-300 font-medium text-[10px] px-2 py-0.5 rounded-full">
                    Online
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-teal-400 font-semibold">
                  <span>{article.category}</span>
                  <span className="text-slate-400">{article.readTimeMinutes} min read</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{article.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center space-x-1"
              >
                <span>Read Guide</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleDownload(article.id)}
                title={article.isDownloaded ? 'Cached offline in IndexedDB' : 'Download for offline reading'}
                className={`p-2 rounded-xl text-xs border transition-colors flex items-center space-x-1.5 ${
                  article.isDownloaded
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="text-[11px]">{article.isDownloaded ? 'Downloaded' : 'Save Offline'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-white text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Simple Explanation */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-1.5">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Simple Explanation</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedArticle.articleContent.simpleExplanation}
                </p>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Symptoms</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedArticle.articleContent.symptoms.map((sym, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention & Ugandan Home Tips */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Prevention & Local Dietary Practices</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedArticle.articleContent.prevention.map((prev, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{prev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warning Signs */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Warning Signs (Do Not Ignore)</span>
                </h4>
                <ul className="space-y-1 text-xs text-rose-200">
                  {selectedArticle.articleContent.warningSigns.map((ws, i) => (
                    <li key={i}>• {ws}</li>
                  ))}
                </ul>
              </div>

              {/* When to Seek Care */}
              <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-1">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">When to Seek Care</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedArticle.articleContent.whenToSeekCare}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
