import React from 'react';
import {
  Target,
  Pill,
  Users,
  Activity,
  CheckCircle2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { CarePlan } from '../../types';

interface ChronicCareViewProps {
  carePlan?: CarePlan;
  onRecordVital: () => void;
}

export const ChronicCareView: React.FC<ChronicCareViewProps> = ({
  carePlan,
  onRecordVital
}) => {
  if (!carePlan) {
    return (
      <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-3xl space-y-3 my-6 min-h-[50vh] flex flex-col items-center justify-center">
        <ShieldCheck className="w-10 h-10 text-teal-500 mx-auto opacity-70" />
        <h3 className="text-base font-bold text-slate-900">No Care Plan Issued Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          When your consulting Doctor or Nurse issues your personalized care protocol, medications, and clinical goals, it will be visible here. Patients cannot alter their clinical care plan directly.
        </p>
      </div>
    );
  }

  // Determine author (Doctor or Nurse)
  const authorName = carePlan.careTeam?.[0]?.name || 'Attending Clinician';
  const authorRole = carePlan.careTeam?.[0]?.role || 'Doctor';
  const isNurse = authorRole.toLowerCase().includes('nurse');

  return (
    <div className="space-y-6 pb-20 bg-white min-h-screen text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">My Care Plan: {carePlan.condition}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Personalized Protocol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supervised by {authorName} ({authorRole}) • Clinician-issued, read-only patient reference.
          </p>
        </div>

        <button
          onClick={onRecordVital}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Activity className="w-4 h-4" />
          <span>Log Protocol Vitals</span>
        </button>
      </div>

      {/* Practitioner Authorship Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-teal-200 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
            {isNurse ? <UserCheck className="w-6 h-6 text-teal-600" /> : <ShieldCheck className="w-6 h-6 text-teal-600" />}
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-sm font-extrabold text-slate-900">
                Prescribed & Issued by: {authorName}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isNurse
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {authorRole} Prescribed
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Verified clinical protocol • Active daily schedule
            </p>
          </div>
        </div>
      </div>

      {/* Target Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {carePlan.targetMetrics.map((tm, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{tm.metric}</span>
              <Target className="w-4 h-4 text-teal-500" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-slate-900">{tm.current}</span>
              <span className="text-xs text-emerald-600 font-semibold">Goal: {tm.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Clinical Goals & Lifestyle Targets */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Target className="w-5 h-5 text-teal-600" />
          <span>Care Plan Goals & Objectives</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {carePlan.goals.map((goal, i) => (
            <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prescribed Medications & Adherence Tracker */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Pill className="w-5 h-5 text-teal-600" />
            <span>Prescription Regimen & Adherence</span>
          </h2>
          <span className="text-xs text-teal-700 font-bold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Adherence Monitored
          </span>
        </div>

        <div className="space-y-3">
          {carePlan.prescribedMedications.map((med, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{med.name} {med.dosage}</h4>
                  <p className="text-xs text-slate-500">{med.frequency}</p>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  {med.adherencePercentage}% Taken
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full transition-all"
                  style={{ width: `${med.adherencePercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multidisciplinary Care Team Contacts */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Users className="w-5 h-5 text-teal-600" />
          <span>Assigned Multidisciplinary Team</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {carePlan.careTeam.map((member, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover border border-teal-300 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs text-teal-600">{member.role}</p>
                </div>
              </div>
              <a
                href={`tel:${member.phone.replace(/[\s-]/g, '')}`}
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-500 text-teal-700 hover:text-white font-bold text-xs transition-colors whitespace-nowrap border border-teal-200"
              >
                Call
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChronicCareView;
