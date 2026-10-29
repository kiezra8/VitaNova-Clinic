import React, { useState, useMemo } from 'react';
import {
  FileText,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Clock,
  AlertCircle,
  Calendar,
  Building2,
  CheckCircle2,
  Lock,
  Plus,
  Search,
  Printer,
  Copy,
  Check,
  Layers,
  Table as TableIcon,
  Syringe,
  X,
  User,
  Phone,
  Edit2,
  Save,
  Target
} from 'lucide-react';
import { MedicalRecordEntry, PatientProfile, CarePlan } from '../../types';

interface MedicalRecordsViewProps {
  records: MedicalRecordEntry[];
  patient: PatientProfile;
  onAddRecord: (entry: Omit<MedicalRecordEntry, 'id' | 'syncStatus'>) => Promise<void>;
  isClinicianView?: boolean;
  isAdmin?: boolean;
  carePlan?: CarePlan;
  onUpdateDemographics?: (demographics: Partial<PatientProfile>) => Promise<void>;
}

export const MedicalRecordsView: React.FC<MedicalRecordsViewProps> = ({
  records = [],
  patient,
  onAddRecord,
  isClinicianView = false,
  isAdmin = false,
  carePlan,
  onUpdateDemographics
}) => {
  // Use ONLY real records, no hardcoded demo records
  const allRecords = useMemo(() => records || [], [records]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'grouped' | 'table'>('timeline');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modals & Document Views
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedDocRecord, setSelectedDocRecord] = useState<MedicalRecordEntry | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);

  // Demographic edit state (Patient fills this in)
  const [isEditingDemographics, setIsEditingDemographics] = useState<boolean>(false);
  const [demoFullName, setDemoFullName] = useState<string>(patient.fullName || '');
  const [demoDob, setDemoDob] = useState<string>(patient.dateOfBirth || '');
  const [demoSex, setDemoSex] = useState<string>(patient.sex || 'Female');
  const [demoPhone, setDemoPhone] = useState<string>(patient.phone || '');
  const [demoLocation, setDemoLocation] = useState<string>(patient.location || '');
  const [demoBloodGroup, setDemoBloodGroup] = useState<string>(patient.bloodGroup || 'O+');
  const [demoEmergencyName, setDemoEmergencyName] = useState<string>(patient.emergencyContact?.name || '');
  const [demoEmergencyPhone, setDemoEmergencyPhone] = useState<string>(patient.emergencyContact?.phone || '');
  const [demoEmergencyRel, setDemoEmergencyRel] = useState<string>(patient.emergencyContact?.relationship || 'Family');
  const [isSavingDemographics, setIsSavingDemographics] = useState<boolean>(false);

  // New Record Form State (Only for Healthcare Team)
  const [category, setCategory] = useState<MedicalRecordEntry['category']>('consultation');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('Dr. Israel Kisakye');
  const [doctorRole, setDoctorRole] = useState<string>('Medical Consultant');
  const [clinicBranch, setClinicBranch] = useState<string>('VitaNova Central Clinic, Kampala');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allRecords.length,
      consultation: 0,
      lab: 0,
      medication: 0,
      condition: 0,
      immunization: 0,
      allergy: 0
    };
    allRecords.forEach((r) => {
      if (counts[r.category] !== undefined) {
        counts[r.category]++;
      }
    });
    return counts;
  }, [allRecords]);

  const categories = [
    { id: 'all', label: 'All Records', count: categoryCounts.all, icon: Layers },
    { id: 'consultation', label: 'Doctor Notes', count: categoryCounts.consultation, icon: Stethoscope },
    { id: 'lab', label: 'Lab Reports', count: categoryCounts.lab, icon: FlaskConical },
    { id: 'medication', label: 'Prescriptions', count: categoryCounts.medication, icon: Pill },
    { id: 'condition', label: 'Diagnoses', count: categoryCounts.condition, icon: ShieldCheck },
    { id: 'immunization', label: 'Vaccines', count: categoryCounts.immunization, icon: Syringe },
    { id: 'allergy', label: 'Allergies', count: categoryCounts.allergy, icon: AlertCircle }
  ];

  const uniqueDoctors = useMemo(() => {
    const docs = new Set<string>();
    allRecords.forEach((r) => {
      if (r.doctorName) docs.add(r.doctorName);
    });
    return Array.from(docs);
  }, [allRecords]);

  const filteredRecords = useMemo(() => {
    return allRecords
      .filter((r) => selectedCategory === 'all' || r.category === selectedCategory)
      .filter((r) => selectedDoctor === 'all' || r.doctorName === selectedDoctor)
      .filter((r) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.doctorName.toLowerCase().includes(q) ||
          r.clinicBranch.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [allRecords, selectedCategory, selectedDoctor, searchQuery, sortOrder]);

  const formatUgDate = (iso: string): string => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const formatUgDateTime = (iso: string): string => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} at ${hh}:${min}`;
  };

  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: MedicalRecordEntry[] } = {};
    filteredRecords.forEach((rec) => {
      const d = new Date(rec.timestamp);
      const key = isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(rec);
    });
    return groups;
  }, [filteredRecords]);

  const handleSaveDemographics = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingDemographics(true);
    try {
      if (onUpdateDemographics) {
        await onUpdateDemographics({
          fullName: demoFullName,
          dateOfBirth: demoDob,
          sex: demoSex as any,
          phone: demoPhone,
          location: demoLocation,
          bloodGroup: demoBloodGroup as any,
          emergencyContact: {
            name: demoEmergencyName,
            phone: demoEmergencyPhone,
            relationship: demoEmergencyRel
          }
        });
      }
      setIsEditingDemographics(false);
    } finally {
      setIsSavingDemographics(false);
    }
  };

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

  const handleCopyNotes = (rec: MedicalRecordEntry) => {
    const text = `[VitaNova Clinic — Medical Record]\nDate: ${formatUgDateTime(rec.timestamp)}\nCategory: ${rec.category.toUpperCase()}\nTitle: ${rec.title}\nClinician: ${rec.doctorName} (${rec.doctorRole})\nFacility: ${rec.clinicBranch}\n\nClinical Summary:\n${rec.description}`;
    navigator.clipboard.writeText(text);
    setCopyFeedbackId(rec.id);
    setTimeout(() => setCopyFeedbackId(null), 2500);
  };

  const getCategoryTheme = (cat: MedicalRecordEntry['category']) => {
    switch (cat) {
      case 'lab':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-700',
          badge: 'bg-purple-100 text-purple-800 border-purple-200',
          dot: 'bg-purple-500',
          icon: FlaskConical,
          label: 'Laboratory'
        };
      case 'medication':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: Pill,
          label: 'Prescription'
        };
      case 'condition':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-700',
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          icon: ShieldCheck,
          label: 'Condition'
        };
      case 'immunization':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-700',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          icon: Syringe,
          label: 'Vaccine'
        };
      case 'allergy':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800 border-red-200',
          dot: 'bg-red-500',
          icon: AlertCircle,
          label: 'Allergy Alert'
        };
      case 'consultation':
      default:
        return {
          bg: 'bg-teal-50',
          border: 'border-teal-200',
          text: 'text-teal-700',
          badge: 'bg-teal-100 text-teal-800 border-teal-200',
          dot: 'bg-teal-500',
          icon: Stethoscope,
          label: 'Consultation'
        };
    }
  };

  return (
    <div className="space-y-6 pb-24 bg-white min-h-screen">
      {/* ── 1. PATIENT DEMOGRAPHIC SECTION (PATIENT FILLS THIS IN) ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {patient.fullName || 'Patient Profile'}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  MRN: {patient.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Blood: {patient.bloodGroup || 'O+'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Patient Demographics & Electronic Health Record
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditingDemographics((prev) => !prev)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Edit2 className="w-3.5 h-3.5 text-teal-600" />
              <span>{isEditingDemographics ? 'Close Edit' : 'Edit Demographics'}</span>
            </button>

            {/* Print Summary */}
            <button
              onClick={() => setShowExportModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-teal-600" />
              <span>Print</span>
            </button>

            {/* New Entry Button — Visible ONLY to Healthcare Team / Admin */}
            {(isClinicianView || isAdmin) && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-extrabold text-xs shadow-sm shadow-teal-500/20 transition-all flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Clinical Entry</span>
              </button>
            )}
          </div>
        </div>

        {/* Demographic Fields View or Edit Form */}
        {isEditingDemographics ? (
          <form onSubmit={handleSaveDemographics} className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={demoFullName}
                  onChange={(e) => setDemoFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={demoDob}
                  onChange={(e) => setDemoDob(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Gender / Sex</label>
                <select
                  value={demoSex}
                  onChange={(e) => setDemoSex(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={demoPhone}
                  onChange={(e) => setDemoPhone(e.target.value)}
                  placeholder="e.g. +256 700 000 000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Home Address / Location</label>
                <input
                  type="text"
                  value={demoLocation}
                  onChange={(e) => setDemoLocation(e.target.value)}
                  placeholder="e.g. Ntinda, Kampala"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Blood Group</label>
                <select
                  value={demoBloodGroup}
                  onChange={(e) => setDemoBloodGroup(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-700 mb-2">Emergency Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    value={demoEmergencyName}
                    onChange={(e) => setDemoEmergencyName(e.target.value)}
                    placeholder="Contact Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={demoEmergencyPhone}
                    onChange={(e) => setDemoEmergencyPhone(e.target.value)}
                    placeholder="Contact Phone"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={demoEmergencyRel}
                    onChange={(e) => setDemoEmergencyRel(e.target.value)}
                    placeholder="Relationship (e.g. Spouse)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingDemographics(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingDemographics}
                className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingDemographics ? 'Saving...' : 'Save Demographics'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Date of Birth</span>
              <span className="font-bold text-slate-800">{patient.dateOfBirth || 'Not specified'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Gender</span>
              <span className="font-bold text-slate-800">{patient.sex || 'Female'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Phone</span>
              <span className="font-bold text-slate-800">{patient.phone || 'Not provided'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Location</span>
              <span className="font-bold text-slate-800">{patient.location || 'Kampala, Uganda'}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. ACTIVE CARE PLAN IN RECORDS (DOCTOR & NURSE AUTHORED, PATIENT CANNOT CHANGE) ── */}
      {carePlan && (
        <div className="bg-white rounded-3xl border border-teal-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-teal-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Prescribed Care Plan: {carePlan.condition}
              </h2>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Clinician Authored • Read-Only
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Formulated by {carePlan.careTeam?.[0]?.name || 'Attending Clinician'} ({carePlan.careTeam?.[0]?.role || 'Doctor'})
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {carePlan.goals?.slice(0, 4).map((g, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>{g}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. HEALTHCARE TEAM RECORDS TOOLBAR (SEARCH & CATEGORIES) ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-3 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search records, diagnoses, lab results, prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Clinicians</option>
              {uniqueDoctors.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Timeline</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border active:scale-95 ${
                  isSelected
                    ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white font-extrabold' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. RECORDS DISPLAY SECTION ── */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Clinical Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {allRecords.length === 0
              ? 'Your healthcare team has not documented any entries yet. Clinical notes, lab results, and prescriptions will appear here once saved.'
              : 'No entries match your search query.'}
          </p>
          {(isClinicianView || isAdmin) && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-xs shadow-sm hover:bg-teal-400"
            >
              Add First Clinical Record
            </button>
          )}
        </div>
      ) : viewMode === 'timeline' ? (
        <div className="space-y-6">
          {Object.entries(groupedByMonth).map(([monthYear, monthRecords]) => (
            <div key={monthYear} className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-teal-800 text-xs font-bold border border-slate-200 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>{monthYear}</span>
                </span>
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[11px] text-slate-400 font-semibold">{monthRecords.length} records</span>
              </div>

              <div className="space-y-3">
                {monthRecords.map((entry) => {
                  const theme = getCategoryTheme(entry.category);
                  const IconComp = theme.icon;

                  return (
                    <div
                      key={entry.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 p-4 sm:p-5 space-y-3 transition-all shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${theme.badge}`}>
                              {theme.label}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900">
                              {entry.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                            <span>{formatUgDateTime(entry.timestamp)}</span>
                            <span>•</span>
                            <span className="text-teal-600 font-semibold">{entry.doctorName}</span>
                            <span>({entry.doctorRole})</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCopyNotes(entry)}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 flex items-center space-x-1"
                          >
                            {copyFeedbackId === entry.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-400" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {entry.description}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Building2 className="w-3 h-3" />
                          <span>{entry.clinicBranch}</span>
                        </span>
                        <span className="font-mono text-[10px]">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Title / Summary</th>
                  <th className="p-3">Clinician</th>
                  <th className="p-3">Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((r) => {
                  const theme = getCategoryTheme(r.category);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80">
                      <td className="p-3 text-slate-500 whitespace-nowrap">{formatUgDate(r.timestamp)}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${theme.badge}`}>
                          {theme.label}
                        </span>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{r.title}</p>
                        <p className="text-slate-500 line-clamp-1 text-[11px] mt-0.5">{r.description}</p>
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap font-medium">{r.doctorName}</td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">{r.clinicBranch}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 5. NEW CLINICAL RECORD ENTRY MODAL (HEALTHCARE TEAM & ADMIN ONLY) ── */}
      {showAddModal && (isClinicianView || isAdmin) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Document Clinical Record</h3>
                <p className="text-[11px] text-slate-500">Record for {patient.fullName}</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Entry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="consultation">Doctor Consultation Note</option>
                  <option value="lab">Laboratory / Diagnostic Report</option>
                  <option value="medication">Prescription / Dispensing Order</option>
                  <option value="condition">Condition Diagnosis & Care Plan</option>
                  <option value="immunization">Vaccination / Immunization</option>
                  <option value="allergy">Allergy Alert / Adverse Reaction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Title / Assessment</label>
                <input
                  type="text"
                  placeholder="e.g. Routine Antenatal Review & Prescription"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Findings & Management Plan</label>
                <textarea
                  rows={4}
                  placeholder="Detailed observations, vitals, lab values, prescribed regimens, and review date..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Healthcare Professional</label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Role</label>
                  <input
                    type="text"
                    value={doctorRole}
                    onChange={(e) => setDoctorRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic Branch / Location</label>
                <input
                  type="text"
                  value={clinicBranch}
                  onChange={(e) => setClinicBranch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                >
                  {isSubmitting ? 'Saving...' : 'Save & Sign Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 6. PRINT SUMMARY MODAL ── */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">VitaNova Patient Medical Summary</h3>
                <p className="text-[11px] text-slate-500">Official Clinical Summary for {patient.fullName}</p>
              </div>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">✕</button>
            </div>

            <div className="space-y-4 text-xs text-slate-800">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p><strong>Patient:</strong> {patient.fullName} (MRN: {patient.id})</p>
                <p><strong>DOB / Sex:</strong> {patient.dateOfBirth} / {patient.sex}</p>
                <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
                <p><strong>Address:</strong> {patient.location}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Clinical Record History ({allRecords.length} entries)</h4>
                {allRecords.length === 0 ? (
                  <p className="text-slate-400 italic">No entries recorded yet.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {allRecords.map((r) => (
                      <div key={r.id} className="py-2 space-y-0.5">
                        <div className="flex justify-between font-bold">
                          <span>{r.title}</span>
                          <span className="text-slate-500 font-normal">{formatUgDate(r.timestamp)}</span>
                        </div>
                        <p className="text-slate-600">{r.description}</p>
                        <p className="text-[10px] text-teal-600 font-medium">By {r.doctorName} • {r.clinicBranch}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs shadow-sm"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MedicalRecordsView;
