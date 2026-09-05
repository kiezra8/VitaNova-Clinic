import React, { useState } from 'react';
import {
  HeartPulse,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  UserCheck,
  FileCheck,
  PenTool,
  ShieldCheck,
  Send
} from 'lucide-react';
import { HomeCareRequest, SyncStatus } from '../../types';

interface HomeCareViewProps {
  requests: HomeCareRequest[];
  onRequestHomeCare: (req: Omit<HomeCareRequest, 'id' | 'syncStatus'>) => Promise<void>;
  onCompleteVisit: (id: string, notes: string) => Promise<void>;
  networkState: string;
}

export const HomeCareView: React.FC<HomeCareViewProps> = ({
  requests,
  onRequestHomeCare,
  onCompleteVisit,
  networkState
}) => {
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedVisitForDocumentation, setSelectedVisitForDocumentation] = useState<HomeCareRequest | null>(null);

  // Booking Form State
  const [serviceType, setServiceType] = useState<HomeCareRequest['serviceType']>('Nursing');
  const [address, setAddress] = useState<string>('Plot 14, Ntinda-Nakawa Road, Kampala');
  const [patientName, setPatientName] = useState<string>('Sarah Namubiru');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-09-12 10:00 AM');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Documentation Form State
  const [visitNotes, setVisitNotes] = useState<string>('');
  const [signatureDone, setSignatureDone] = useState<boolean>(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onRequestHomeCare({
        patientId: 'pat_sarah_001',
        patientName,
        serviceType,
        address,
        scheduledDate,
        status: networkState === 'offline' ? 'pending_sync' : 'confirmed',
        clinicalNotes: notes || 'Routine assessment & wellness visit.',
        assignedWorkerName: serviceType === 'Nursing' ? 'Sister Florence Nabatanzi' : 'Dr. Brian Kato (PT)'
      });
      setShowBookingModal(false);
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisitForDocumentation) return;
    await onCompleteVisit(selectedVisitForDocumentation.id, visitNotes);
    setSelectedVisitForDocumentation(null);
    setVisitNotes('');
    setSignatureDone(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Community Home Care</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Bedside & Outreach
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Licensed nurses, midwives, and physiotherapists visiting homes across Greater Kampala.
          </p>
        </div>

        <button
          onClick={() => setShowBookingModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Request Home Visit</span>
        </button>
      </div>

      {/* Services List Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-teal-400">Home Nursing</span>
          <p className="text-[11px] text-slate-400">IV administration, vitals monitoring, catheter care.</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-teal-400">Midwifery & ANC</span>
          <p className="text-[11px] text-slate-400">Antenatal checkups, post-partum healing, lactation coaching.</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-teal-400">Wound & Post-Op</span>
          <p className="text-[11px] text-slate-400">Sterile surgical dressing, drain monitoring, stitch removal.</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-teal-400">Physiotherapy</span>
          <p className="text-[11px] text-slate-400">Elderly mobility rehab, stroke recovery, joint mobilization.</p>
        </div>
      </div>

      {/* Active & Scheduled Home Visits */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight">Your Home Care Visits</h2>
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {req.serviceType} Visit • {req.patientName}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{req.address}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      req.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : 'bg-teal-500/10 text-teal-300 border-teal-500/20'
                    }`}
                  >
                    {req.status === 'completed' ? 'Completed' : 'Confirmed'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="flex items-center space-x-3">
                  <img
                    src={req.assignedWorkerAvatar || (req.serviceType === 'Nursing'
                      ? 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80'
                      : 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80')}
                    alt={req.assignedWorkerName || 'Health Worker'}
                    className="w-11 h-11 rounded-xl object-cover border border-teal-500/40 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{req.assignedWorkerName || 'Sister Florence Nabatanzi'}</p>
                    <p className="text-[11px] text-teal-400 font-medium">{req.serviceType} Specialist • Verified Clinician</p>
                  </div>
                </div>
                <div className="text-left sm:text-right text-xs text-slate-300">
                  <span className="text-[11px] text-slate-400 block">Scheduled Arrival:</span>
                  <span className="font-bold text-white">{req.scheduledDate}</span>
                </div>
              </div>

              {req.clinicalNotes && (
                <p className="text-xs text-slate-400 bg-slate-800/50 p-3 rounded-xl border border-slate-800 italic">
                  "{req.clinicalNotes}"
                </p>
              )}

              {/* Documentation / Verification Trigger */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  {req.syncStatus === 'synced' ? '✓ Synced with Server' : '⏳ Queued for Offline Sync'}
                </span>

                {req.status !== 'completed' && (
                  <button
                    onClick={() => {
                      setSelectedVisitForDocumentation(req);
                      setVisitNotes(req.clinicalNotes || '');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-semibold text-xs transition-colors"
                  >
                    Complete Visit Notes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Book Community Home Visit</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Nursing">Home Nursing (Vitals, IV, Dressing)</option>
                  <option value="Midwifery">Midwifery & Antenatal/Postnatal</option>
                  <option value="Physiotherapy">Physiotherapy & Mobility Rehab</option>
                  <option value="Doctor Home Visit">Doctor Home Visit</option>
                  <option value="Elderly Care">Elderly Care Support</option>
                  <option value="Wound Care">Specialized Wound Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Physical Address (Kampala / Suburbs)</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 14, Ntinda-Nakawa Road, Kampala"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date & Time</label>
                <input
                  type="text"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Special Clinical Requests / Instructions</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Needs surgical stitch inspection and dressing change..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clinician Visit Documentation Modal */}
      {selectedVisitForDocumentation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Document Home Visit Completion</h3>
              <button onClick={() => setSelectedVisitForDocumentation(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleDocSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Clinical Progress & Dressing Notes</label>
                <textarea
                  rows={4}
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="Record vitals checked, sterile dressing applied, patient education provided..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              {/* Patient Signature / Acknowledgment Simulation */}
              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Patient Bedside Acknowledgment</span>
                  <PenTool className="w-4 h-4 text-teal-400" />
                </div>
                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={signatureDone}
                    onChange={(e) => setSignatureDone(e.target.checked)}
                    className="rounded bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500"
                    required
                  />
                  <span className="text-xs text-slate-300">
                    Patient / Guardian confirms completion of visit and nursing care.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedVisitForDocumentation(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!signatureDone}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
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
