import React, { useState } from 'react';
import {
  HeartPulse,
  MapPin,
  PenTool,
  UserCheck,
  Baby,
  Activity,
  MessageCircle
} from 'lucide-react';
import { HomeCareRequest, HealthcareWorker } from '../../types';

interface HomeCareViewProps {
  requests: HomeCareRequest[];
  onRequestHomeCare: (req: Omit<HomeCareRequest, 'id' | 'syncStatus'>) => Promise<void>;
  onCompleteVisit: (id: string, notes: string) => Promise<void>;
  networkState: string;
  clinicians?: HealthcareWorker[];
  onOpenAdminChat?: () => void;
}

export const HomeCareView: React.FC<HomeCareViewProps> = ({
  requests,
  onRequestHomeCare,
  onCompleteVisit,
  networkState,
  clinicians = [],
  onOpenAdminChat
}) => {
  const [selectedVisitForDocumentation, setSelectedVisitForDocumentation] = useState<HomeCareRequest | null>(null);
  const [visitNotes, setVisitNotes] = useState<string>('');
  const [signatureDone, setSignatureDone] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Nurse' | 'Midwife' | 'Physiotherapist'>('all');

  const alliedWorkers = clinicians.filter(
    (c) => c.profession?.toLowerCase() !== 'doctor' && !!c.profession
  );

  const filteredWorkers = alliedWorkers.filter((w) => {
    if (activeCategory === 'all') return true;
    const prof = (w.profession || '').toLowerCase();
    if (activeCategory === 'Nurse') return prof.includes('nurse') || prof.includes('nursing');
    if (activeCategory === 'Midwife') return prof.includes('midwif');
    if (activeCategory === 'Physiotherapist') return prof.includes('physio');
    return true;
  });

  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisitForDocumentation) return;
    await onCompleteVisit(selectedVisitForDocumentation.id, visitNotes);
    setSelectedVisitForDocumentation(null);
    setVisitNotes('');
    setSignatureDone(false);
  };

  const nurseCount = alliedWorkers.filter(w => {
    const p = (w.profession || '').toLowerCase();
    return p.includes('nurse') || p.includes('nursing');
  }).length;
  const midwifeCount = alliedWorkers.filter(w => (w.profession || '').toLowerCase().includes('midwif')).length;
  const physioCount = alliedWorkers.filter(w => (w.profession || '').toLowerCase().includes('physio')).length;

  const categories: { id: 'all' | 'Nurse' | 'Midwife' | 'Physiotherapist'; label: string; icon: React.FC<{ className?: string }>; count: number }[] = [
    { id: 'all', label: 'All Staff', icon: HeartPulse, count: alliedWorkers.length },
    { id: 'Nurse', label: 'Nurses', icon: UserCheck, count: nurseCount },
    { id: 'Midwife', label: 'Midwives', icon: Baby, count: midwifeCount },
    { id: 'Physiotherapist', label: 'Physiotherapists', icon: Activity, count: physioCount },
  ];

  return (
    <div className="space-y-6 pb-20 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Community Home Care</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Bedside & Outreach
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Licensed nurses, midwives, and physiotherapists visiting homes across Greater Kampala.
          </p>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all active:scale-95 ${
                isActive
                  ? 'bg-teal-500 text-white border-teal-500 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Workers Section */}
      {filteredWorkers.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                {activeCategory === 'all'
                  ? 'Nurses, Midwives & Physiotherapists'
                  : activeCategory === 'Nurse' ? 'Nurses'
                  : activeCategory === 'Midwife' ? 'Midwives'
                  : 'Physiotherapists'}
              </h2>
            </div>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Verified Care Staff
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all p-3.5 flex flex-col items-center justify-between space-y-3"
              >
                {/* Profile Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Profession Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-teal-700 border border-teal-200 shadow-md">
                      {worker.profession}
                    </span>
                  </div>

                  {/* Name Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-2.5">
                    <div className="flex items-center space-x-1.5 min-w-0 w-full">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400 border border-white animate-pulse shrink-0" />
                      <span className="text-xs sm:text-sm font-extrabold text-white truncate drop-shadow">
                        {worker.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book via Chat */}
                <div className="w-full pt-0.5">
                  <button
                    onClick={() => onOpenAdminChat?.()}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm shadow-teal-500/25 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Book via Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm bg-slate-50 rounded-2xl border border-slate-100">
          No {activeCategory === 'all' ? 'staff' : activeCategory.toLowerCase() + 's'} available yet.
        </div>
      )}

      {/* Active & Scheduled Home Visits */}
      {requests.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Your Home Care Visits</h2>
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 hover:border-slate-300 transition-colors shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {req.serviceType} Visit • {req.patientName}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{req.address}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    req.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-teal-50 text-teal-700 border-teal-200'
                  }`}>
                    {req.status === 'completed' ? 'Completed' : 'Confirmed'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.assignedWorkerAvatar || 'https://i.pinimg.com/736x/aa/3d/91/aa3d912bc1941855c80362753d11ef2d.jpg'}
                      alt={req.assignedWorkerName || 'Health Worker'}
                      className="w-11 h-11 rounded-xl object-cover border border-teal-200 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{req.assignedWorkerName || 'Sister Florence Nabatanzi'}</p>
                      <p className="text-[11px] text-teal-600 font-medium">{req.serviceType} Specialist • Verified Clinician</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right text-xs text-slate-600">
                    <span className="text-[11px] text-slate-500 block">Scheduled Arrival:</span>
                    <span className="font-bold text-slate-900">{req.scheduledDate}</span>
                  </div>
                </div>

                {req.clinicalNotes && (
                  <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                    "{req.clinicalNotes}"
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {req.syncStatus === 'synced' ? '✓ Synced with Server' : '⏳ Queued for Offline Sync'}
                  </span>
                  {req.status !== 'completed' && (
                    <button
                      onClick={() => {
                        setSelectedVisitForDocumentation(req);
                        setVisitNotes(req.clinicalNotes || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-500 text-teal-600 hover:text-white font-semibold text-xs transition-colors border border-teal-200"
                    >
                      Complete Visit Notes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clinician Visit Documentation Modal */}
      {selectedVisitForDocumentation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Document Home Visit Completion</h3>
              <button onClick={() => setSelectedVisitForDocumentation(null)} className="text-slate-400 hover:text-slate-900 text-xl leading-none">✕</button>
            </div>
            <form onSubmit={handleDocSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Clinical Progress & Dressing Notes</label>
                <textarea
                  rows={4}
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="Record vitals checked, sterile dressing applied, patient education provided..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Patient Bedside Acknowledgment</span>
                  <PenTool className="w-4 h-4 text-teal-500" />
                </div>
                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={signatureDone}
                    onChange={(e) => setSignatureDone(e.target.checked)}
                    className="rounded border-slate-300 text-teal-500 focus:ring-teal-500"
                    required
                  />
                  <span className="text-xs text-slate-600">
                    Patient / Guardian confirms completion of visit and nursing care.
                  </span>
                </label>
              </div>
              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedVisitForDocumentation(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!signatureDone}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-bold text-xs"
                >
                  Save & Complete Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
