import React, { useState } from 'react';
import {
  Shield,
  Target,
  Pill,
  Users,
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
  ChevronRight,
  Stethoscope,
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
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3 my-6">
        <Stethoscope className="w-10 h-10 text-teal-400 mx-auto opacity-70" />
        <h3 className="text-base font-bold text-white">No Care Plan Issued Yet</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          When your consulting Doctor or Nurse issues your personalized care protocol, medications, and clinical goals, it will be visible here.
        </p>
      </div>
    );
  }

  // Determine author (Doctor or Nurse)
  const authorName = carePlan.careTeam?.[0]?.name || 'Dr. Ronald Mukasa';
  const authorRole = carePlan.careTeam?.[0]?.role || 'Doctor';
  const isNurse = authorRole.toLowerCase().includes('nurse');

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">My Care Plan: {carePlan.condition}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Personalized Protocol
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Supervised by {authorName} ({authorRole}) • Synchronized for offline daily reference.
          </p>
        </div>

        <button
          onClick={onRecordVital}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Activity className="w-4 h-4" />
          <span>Log Protocol Vitals</span>
        </button>
      </div>

      {/* ── Practitioner Authorship Banner (Clearly shows if Doctor or Nurse created it) ── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 border border-teal-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/15 text-teal-300 flex items-center justify-center border border-teal-500/30 shrink-0">
            {isNurse ? <UserCheck className="w-6 h-6 text-teal-400" /> : <Stethoscope className="w-6 h-6 text-teal-400" />}
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-sm font-extrabold text-white">
                Prescribed & Issued by: {authorName}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isNurse
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {authorRole} Prescribed
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Verified clinical protocol for Sarah Namubiru • Active Daily Schedule
            </p>
          </div>
        </div>
      </div>

      {/* Target Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {carePlan.targetMetrics.map((tm, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{tm.metric}</span>
              <Target className="w-4 h-4 text-teal-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-white">{tm.current}</span>
              <span className="text-xs text-emerald-400 font-semibold">Goal: {tm.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Clinical Goals & Lifestyle Targets */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Target className="w-5 h-5 text-teal-400" />
          <span>Care Plan Goals & Objectives</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {carePlan.goals.map((goal, i) => (
            <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prescribed Medications & Adherence Tracker */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Pill className="w-5 h-5 text-teal-400" />
            <span>Prescription Regimen & Adherence</span>
          </h2>
          <span className="text-xs text-teal-400 font-bold">Overall: 96% Adherence</span>
        </div>

        <div className="space-y-3">
          {carePlan.prescribedMedications.map((med, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{med.name} {med.dosage}</h4>
                  <p className="text-xs text-slate-400">{med.frequency}</p>
                </div>
                <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                  {med.adherencePercentage}% Taken
                </span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
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
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Users className="w-5 h-5 text-teal-400" />
          <span>Assigned Multidisciplinary Team</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {carePlan.careTeam.map((member, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover border border-teal-500/40 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-teal-400">{member.role}</p>
                </div>
              </div>
              <a
                href={`tel:${member.phone.replace(/[\s-]/g, '')}`}
                className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-bold text-xs transition-colors whitespace-nowrap"
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
