import React, { useState } from 'react';
import {
  Stethoscope,
  HeartPulse,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  MapPin,
  Activity,
  PenTool,
  RefreshCw,
  WifiOff
} from 'lucide-react';
import { HealthcareWorker, PatientProfile, HomeCareRequest, VitalRecord } from '../../types';

interface ClinicianPortalViewProps {
  currentRole: string;
  patient: PatientProfile;
  assignedVisits: HomeCareRequest[];
  onDocumentVisit: (visitId: string, notes: string, vitals: Partial<VitalRecord>) => Promise<void>;
  networkState: string;
}

export const ClinicianPortalView: React.FC<ClinicianPortalViewProps> = ({
  currentRole,
  patient,
  assignedVisits,
  onDocumentVisit,
  networkState
}) => {
  const [activeTab, setActiveTab] = useState<'assigned' | 'charting'>('assigned');
  const [selectedVisit, setSelectedVisit] = useState<HomeCareRequest | null>(assignedVisits[0] || null);

  // Clinical Charting Form
  const [clinicalNotes, setClinicalNotes] = useState<string>('Patient visited at home in Nakawa. Sterile dressing applied to surgical site with povidone-iodine. Vitals taken. Healing well without erythema.');
  const [systolic, setSystolic] = useState<string>('126');
  const [diastolic, setDiastolic] = useState<string>('80');
  const [pulse, setPulse] = useState<string>('72');
  const [temp, setTemp] = useState<string>('36.7');
  const [patientConfirmed, setPatientConfirmed] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveDocumentation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisit) return;
    setIsSaving(true);
    try {
      await onDocumentVisit(selectedVisit.id, clinicalNotes, {
        systolicBP: systolic ? parseInt(systolic, 10) : undefined,
        diastolicBP: diastolic ? parseInt(diastolic, 10) : undefined,
        heartRate: pulse ? parseInt(pulse, 10) : undefined,
        temperature: temp ? parseFloat(temp) : undefined,
        timestamp: new Date().toISOString()
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const clinicianTitle =
    currentRole === 'doctor'
      ? 'Dr. Ronald Mukasa (Consultant Cardiologist)'
      : currentRole === 'nurse'
      ? 'Sister Florence Nabatanzi (Lead Community Health Nurse)'
      : currentRole === 'midwife'
      ? 'Midwife Agnes Akello (Maternal & Infant Health)'
      : 'Dr. Brian Kato (PT Physiotherapist)';

  return (
    <div className="space-y-6 pb-20">
      {/* Clinician Header */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 p-6 rounded-3xl border border-teal-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={
                currentRole === 'doctor'
                  ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
                  : currentRole === 'nurse'
                  ? 'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80'
                  : currentRole === 'midwife'
                  ? 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80'
                  : 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
              }
              alt={clinicianTitle}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/50 shadow-lg shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Healthcare Worker Portal</span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{clinicianTitle}</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Council Reg: <strong className="text-slate-200">UMDPC/8412</strong> • VitaNova Outreach Division
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-teal-300 font-semibold border border-slate-700">
              {networkState === 'offline' ? 'Offline Charting Active' : 'Connected to Clinic Cloud'}
            </span>
          </div>
        </div>
      </div>

      {/* Offline Community Workflow Helper */}
      {networkState === 'offline' && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-300">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Offline Bedside Mode Active:</strong> You can conduct home visits, review cached patient files, log vitals, and sign clinical documentation without active internet. All records are securely cached locally in IndexedDB and will synchronize to the central registry once internet connectivity resumes.
          </p>
        </div>
      )}

      {/* Assigned Patient & Home Visit List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assigned Patient Roster */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Today's Assigned Patient</span>
            <span className="text-[10px] font-semibold text-teal-400">1 Assigned</span>
          </h2>

          <div
            onClick={() => setSelectedVisit(assignedVisits[0])}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedVisit?.id === assignedVisits[0]?.id
                ? 'bg-slate-800/80 border-teal-500/50 ring-1 ring-teal-500/30'
                : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{patient.fullName}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300">
                {patient.bloodGroup}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{patient.location}</p>
            <p className="text-[11px] text-teal-400 mt-1">Diagnosis: {patient.medicalConditions[0]}</p>
            <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-700/50 mt-2">
              <span>Scheduled: Today 10:00 AM</span>
              <span className="text-emerald-400 font-semibold">Authorized Local Cache</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bedside Documentation & Clinical Notes Form */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white">Bedside Clinical Documentation</h2>
              <p className="text-xs text-slate-400">
                Patient: <strong className="text-white">{patient.fullName}</strong> • Plot 14 Ntinda-Nakawa Road
              </p>
            </div>

            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Visit Documented Locally!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveDocumentation} className="space-y-4">
            {/* Vitals Recorded at Bedside */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Bedside Vitals Captured
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <input
                    type="number"
                    placeholder="Systolic"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-slate-500">Systolic (mmHg)</span>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Diastolic"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-slate-500">Diastolic (mmHg)</span>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Heart Rate"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-slate-500">Pulse (bpm)</span>
                </div>
                <div>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Temp"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-slate-500">Temp (°C)</span>
                </div>
              </div>
            </div>

            {/* Clinical Progress Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Progress Notes & Interventions Provided
              </label>
              <textarea
                rows={4}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-teal-500 leading-relaxed"
                required
              />
            </div>

            {/* Bedside Acknowledgment */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center space-x-3">
              <input
                type="checkbox"
                id="clinicianConfirm"
                checked={patientConfirmed}
                onChange={(e) => setPatientConfirmed(e.target.checked)}
                className="rounded bg-slate-700 border-slate-600 text-teal-500"
                required
              />
              <label htmlFor="clinicianConfirm" className="text-xs text-slate-300 cursor-pointer">
                I certify that I personally evaluated the patient at the designated residence and verified vital signs and clinical stability.
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="submit"
                disabled={isSaving || !patientConfirmed}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center space-x-2"
              >
                <PenTool className="w-4 h-4" />
                <span>{isSaving ? 'Storing in IndexedDB...' : 'Sign & Complete Visit'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
