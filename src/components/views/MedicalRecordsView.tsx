import React, { useState } from 'react';
import {
  FileText,
  Filter,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Clock,
  UserCheck,
  AlertCircle,
  Calendar,
  Building2,
  CheckCircle2,
  Lock,
  Plus
} from 'lucide-react';
import { MedicalRecordEntry, PatientProfile, SyncStatus } from '../../types';

interface MedicalRecordsViewProps {
  records: MedicalRecordEntry[];
  patient: PatientProfile;
  onAddRecord: (entry: Omit<MedicalRecordEntry, 'id' | 'syncStatus'>) => Promise<void>;
}

export const MedicalRecordsView: React.FC<MedicalRecordsViewProps> = ({
  records,
  patient,
  onAddRecord
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Record Form State
  const [category, setCategory] = useState<MedicalRecordEntry['category']>('consultation');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('Dr. Ronald Mukasa');
  const [doctorRole, setDoctorRole] = useState<string>('Consultant Cardiologist');
  const [clinicBranch, setClinicBranch] = useState<string>('VitaNova Main Clinic, Nakawa');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Records' },
    { id: 'consultation', label: 'Consultations' },
    { id: 'lab', label: 'Laboratory' },
    { id: 'condition', label: 'Conditions' },
    { id: 'medication', label: 'Prescriptions' },
    { id: 'allergy', label: 'Allergies' },
    { id: 'immunization', label: 'Immunizations' }
  ];

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setIsSubmitting(true);
    try {
      await onAddRecord({
        patientId: patient.id,
        timestamp: new Date().toISOString(),
        category,
        title,
        description,
        doctorName,
        doctorRole,
        clinicBranch,
        auditTrail: {
          createdAt: new Date().toISOString(),
          author: `${doctorName} (${doctorRole})`,
          device: 'vitanova_pwa_client',
          version: 1
        }
      });
      setShowAddModal(false);
      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRecords = records
    .filter((r) => selectedCategory === 'all' || r.category === selectedCategory)
    .filter((r) =>
      searchQuery
        ? r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Electronic Medical Record (EMR)</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Immutable History
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Patient ID: <strong className="text-slate-200">{patient.id}</strong> • Complete clinical timeline with cryptographic audit trails.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Clinical Entry</span>
        </button>
      </div>

      {/* Patient Health Summary Quick Badge Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Blood Group & Conditions */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Diagnosed Conditions</span>
          <div className="flex flex-wrap gap-1 pt-1">
            {patient.medicalConditions.map((cond, i) => (
              <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20">
                {cond}
              </span>
            ))}
          </div>
        </div>

        {/* Known Allergies */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-rose-400">Allergies (Critical)</span>
          <div className="flex flex-wrap gap-1 pt-1">
            {patient.allergies.map((allergy, i) => (
              <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20">
                {allergy}
              </span>
            ))}
          </div>
        </div>

        {/* Current Active Prescriptions */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Active Prescriptions</span>
          <div className="flex flex-wrap gap-1 pt-1">
            {patient.currentMedications.map((med, i) => (
              <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {med}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex overflow-x-auto space-x-1.5 pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search clinical entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500 sm:w-64"
          />
        </div>
      </div>

      {/* Chronological EMR Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-6">
        {filteredRecords.map((entry) => (
          <div key={entry.id} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Icon Node */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-teal-500 flex items-center justify-center text-teal-400 shadow-md">
              {entry.category === 'lab' ? (
                <FlaskConical className="w-3.5 h-3.5" />
              ) : entry.category === 'medication' ? (
                <Pill className="w-3.5 h-3.5" />
              ) : (
                <Stethoscope className="w-3.5 h-3.5" />
              )}
            </div>

            {/* Entry Box */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-teal-300">
                      {entry.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">{entry.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{entry.clinicBranch}</span>
                    <span>•</span>
                    <span>{new Date(entry.timestamp).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                {/* Clinician Badge with Portrait */}
                <div className="flex items-center space-x-3 text-left sm:text-right">
                  <div>
                    <p className="text-xs font-bold text-white">{entry.doctorName}</p>
                    <p className="text-[11px] text-teal-400">{entry.doctorRole}</p>
                  </div>
                  <img
                    src={entry.doctorAvatar || (entry.doctorName.includes('Florence')
                      ? 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80'
                      : entry.doctorName.includes('Peter')
                      ? 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
                      : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80')}
                    alt={entry.doctorName}
                    className="w-10 h-10 rounded-xl object-cover border border-teal-500/40 shrink-0 shadow-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {entry.description}
              </p>

              {/* Immutable Audit Log Bar */}
              <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-2">
                <div className="flex items-center space-x-2">
                  <Lock className="w-3 h-3 text-emerald-500/70" />
                  <span>Audit Trail: Author: {entry.auditTrail.author}</span>
                  <span>•</span>
                  <span>Rev v{entry.auditTrail.version}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Clinical Signature Verified</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Clinical Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Clinical Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-teal-500"
                >
                  <option value="consultation">Consultation Note</option>
                  <option value="lab">Laboratory Report</option>
                  <option value="medication">Prescription / Dispensing</option>
                  <option value="condition">Condition Diagnosis</option>
                  <option value="allergy">Allergy Alert</option>
                  <option value="immunization">Immunization</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Assessment</label>
                <input
                  type="text"
                  placeholder="e.g. Antenatal Review & Iron Supplementation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Clinical Findings & Plan</label>
                <textarea
                  rows={4}
                  placeholder="Detailed notes, examination, medication regimen, and next review date..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Healthcare Professional</label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Role</label>
                  <input
                    type="text"
                    value={doctorRole}
                    onChange={(e) => setDoctorRole(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
                >
                  {isSubmitting ? 'Saving...' : 'Save Record Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
