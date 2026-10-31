import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  BookOpen,
  ChevronRight,
  X,
  AlertTriangle,
  Pill,
  ShieldCheck,
  Plus,
  Share2,
  Calendar,
  User,
  HeartPulse,
  Activity
} from 'lucide-react';
import { HealthEducationArticle } from '../../types';
import { DISEASE_VIDEOS, DiseaseVideoItem } from '../../data/diseaseVideos';
import { fetchEducationArticles, supabase } from '../../lib/supabase';

interface EducationViewProps {
  articles?: HealthEducationArticle[];
  onToggleDownload?: (articleId: string) => Promise<void>;
  onConsultDoctor?: (doctorName: string) => void;
  isAdmin?: boolean;
}

export const EducationView: React.FC<EducationViewProps> = ({
  onConsultDoctor,
  isAdmin = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<DiseaseVideoItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New blog post state (Admin)
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Infectious Diseases');
  const [postSummary, setPostSummary] = useState('');
  const [postOverview, setPostOverview] = useState('');
  const [postSymptoms, setPostSymptoms] = useState('');
  const [postTreatment, setPostTreatment] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User/Supabase articles
  const [customArticles, setCustomArticles] = useState<DiseaseVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('vitanova_disease_blogs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load any published articles from Supabase
  useEffect(() => {
    let alive = true;
    fetchEducationArticles()
      .then((rows) => {
        if (!alive || !rows) return;
        const mapped: DiseaseVideoItem[] = rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          diseaseName: r.title,
          category: r.category || 'General Health',
          summary: r.summary || '',
          videoDuration: '3 min read',
          durationSeconds: 180,
          views: `${r.view_count || 120}`,
          publishedDate: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recent',
          channelName: 'VitaNova Health',
          speakerName: r.author_name || 'Dr. Israel Kisakye',
          speakerRole: 'Doctor',
          speakerAvatar: r.author_avatar || '/ki_ezra_avatar.jpg',
          videoThumbnail: r.thumbnail_url || r.video_url || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
          videoUrl: '',
          audioUrl: '',
          levelOfCare: 'Primary Care',
          diseaseClass: r.category || 'Health Article',
          clinicalGuideline: {
            caseDefinition: r.summary || '',
            diagnosticCriteria: [],
            investigations: [],
            firstLineMedicines: [],
            treatmentProtocol: [],
            dangerSigns: [],
            referralProtocol: '',
            preventionCounseling: []
          },
          videoSlides: []
        }));

        setCustomArticles((prev) => {
          const ids = new Set(prev.map((a) => a.id));
          const fresh = mapped.filter((m) => !ids.has(m.id));
          return [...fresh, ...prev];
        });
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  // Merge built-in disease guide library + custom articles
  const allArticles = useMemo(() => {
    return [...customArticles, ...DISEASE_VIDEOS];
  }, [customArticles]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    DISEASE_VIDEOS.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allArticles.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.diseaseName.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [allArticles, selectedCategory, searchQuery]);

  // Save new blog post
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;
    setIsSubmitting(true);

    const newArticle: DiseaseVideoItem = {
      id: `blog_${Date.now()}`,
      title: postTitle.trim(),
      diseaseName: postTitle.trim(),
      category: postCategory,
      summary: postSummary.trim() || 'Health guidance and prevention tips.',
      videoDuration: '4 min read',
      durationSeconds: 240,
      views: '1',
      publishedDate: 'Today',
      channelName: 'VitaNova Health',
      speakerName: 'Dr. Israel Kisakye',
      speakerRole: 'Doctor',
      speakerAvatar: '/ki_ezra_avatar.jpg',
      videoThumbnail:
        postImageUrl.trim() ||
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      videoUrl: '',
      audioUrl: '',
      levelOfCare: 'Community',
      diseaseClass: postCategory,
      clinicalGuideline: {
        caseDefinition: postOverview.trim() || postSummary.trim(),
        diagnosticCriteria: postSymptoms ? postSymptoms.split('\n').filter(Boolean) : [],
        investigations: [],
        firstLineMedicines: postTreatment ? postTreatment.split('\n').filter(Boolean) : [],
        treatmentProtocol: [],
        dangerSigns: ['Severe pain', 'Difficulty breathing', 'High persistent fever'],
        referralProtocol: 'Consult your doctor if symptoms worsen',
        preventionCounseling: ['Maintain good hygiene and balanced nutrition', 'Follow clinical guidance']
      },
      videoSlides: []
    };

    const updated = [newArticle, ...customArticles];
    setCustomArticles(updated);
    try {
      localStorage.setItem('vitanova_disease_blogs', JSON.stringify(updated));
    } catch (_) {}

    // Upload to Supabase if possible
    try {
      await supabase.from('education_articles').insert({
        id: newArticle.id,
        title: newArticle.title,
        category: newArticle.category,
        summary: newArticle.summary,
        thumbnail_url: newArticle.videoThumbnail,
        author_name: 'Dr. Israel Kisakye',
        is_published: true
      });
    } catch (_) {}

    setIsSubmitting(false);
    setShowAddModal(false);
    setPostTitle('');
    setPostSummary('');
    setPostOverview('');
    setPostSymptoms('');
    setPostTreatment('');
    setPostImageUrl('');
  };

  return (
    <div className="space-y-6 pb-28 text-slate-900 bg-white min-h-screen">
      {/* ── TOP HEADER ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-700 flex items-center justify-center border border-teal-500/30 shrink-0">
              <BookOpen className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Health Articles
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {allArticles.length} Conditions
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Simple guides and treatment advice for everyday conditions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search disease or symptom..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Article</span>
              </button>
            )}
          </div>
        </div>

        {/* ── CATEGORY PILLS BAR ── */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-4 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ARTICLES GRID ── */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-2">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No articles found</h3>
          <p className="text-xs text-slate-500">Try a different search word or select another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredArticles.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500/40 transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.videoThumbnail || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-teal-300 border border-teal-500/30">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                    {item.diseaseName || item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.summary || item.clinicalGuideline?.caseDefinition}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.videoDuration || 'Quick read'}
                  </span>
                  <span className="text-xs font-bold text-teal-600 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── ARTICLE READER MODAL (TAP TO SEE MORE) ── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col text-slate-900 my-auto">
            {/* Modal Header Cover */}
            <div className="relative w-full h-48 sm:h-56 bg-slate-900 shrink-0">
              <img
                src={selectedArticle.videoThumbnail || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'}
                alt={selectedArticle.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors border border-white/20"
                title="Close Article"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Title on Image */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/30 text-teal-200 border border-teal-500/40 inline-block mb-1.5">
                  {selectedArticle.category}
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                  {selectedArticle.diseaseName || selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 space-y-5 overflow-y-auto">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1.5">
                  Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedArticle.clinicalGuideline?.caseDefinition || selectedArticle.summary}
                </p>
              </div>

              {/* Symptoms / Diagnostic Signs */}
              {selectedArticle.clinicalGuideline?.diagnosticCriteria &&
                selectedArticle.clinicalGuideline.diagnosticCriteria.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                      <Activity className="w-3.5 h-3.5 text-teal-600" />
                      <span>Signs & Common Symptoms</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedArticle.clinicalGuideline.diagnosticCriteria.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Treatment & Approved Medicines */}
              {selectedArticle.clinicalGuideline?.firstLineMedicines &&
                selectedArticle.clinicalGuideline.firstLineMedicines.length > 0 && (
                  <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center space-x-1.5">
                      <Pill className="w-3.5 h-3.5 text-teal-700" />
                      <span>Care & Recommended Medicines</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedArticle.clinicalGuideline.firstLineMedicines.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Red Flags / Emergency Warnings */}
              {selectedArticle.clinicalGuideline?.dangerSigns &&
                selectedArticle.clinicalGuideline.dangerSigns.length > 0 && (
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>When to Seek Urgent Care</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-rose-900">
                      {selectedArticle.clinicalGuideline.dangerSigns.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Prevention & Counseling */}
              {selectedArticle.clinicalGuideline?.preventionCounseling &&
                selectedArticle.clinicalGuideline.preventionCounseling.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Prevention Tips</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedArticle.clinicalGuideline.preventionCounseling.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  Close
                </button>
                {onConsultDoctor && (
                  <button
                    onClick={() => {
                      const docName = selectedArticle.speakerName || 'Dr. Israel Kisakye';
                      setSelectedArticle(null);
                      onConsultDoctor(docName);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center space-x-1.5"
                  >
                    <span>Consult a Doctor</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE ARTICLE MODAL (ADMIN ONLY) ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 border border-slate-200 shadow-2xl space-y-4 text-slate-900 my-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Health Article</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Condition / Article Title *</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Typhoid Fever"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                >
                  <option value="Infectious Diseases">Infectious Diseases</option>
                  <option value="Cardiovascular Diseases">Cardiovascular Diseases</option>
                  <option value="Respiratory Diseases">Respiratory Diseases</option>
                  <option value="Endocrine and Metabolic Diseases">Endocrine & Metabolic</option>
                  <option value="Mental Health Conditions">Mental Health</option>
                  <option value="Skin Diseases">Skin Diseases</option>
                  <option value="Community Health & Wellness">General Wellness</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL (optional)</label>
                <input
                  type="url"
                  value={postImageUrl}
                  onChange={(e) => setPostImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  placeholder="Brief 1-2 sentence description..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Symptoms (one per line)</label>
                <textarea
                  rows={2}
                  value={postSymptoms}
                  onChange={(e) => setPostSymptoms(e.target.value)}
                  placeholder="Fever\nHeadache\nFatigue..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Treatment & Advice (one per line)</label>
                <textarea
                  rows={2}
                  value={postTreatment}
                  onChange={(e) => setPostTreatment(e.target.value)}
                  placeholder="Drink oral rehydration fluids\nAntibiotic course as prescribed..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 font-medium resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  {isSubmitting ? 'Saving...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
