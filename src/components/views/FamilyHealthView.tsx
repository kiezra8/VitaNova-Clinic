import React, { useState } from 'react';
import {
  Users,
  Plus,
  ShieldCheck,
  Heart,
  Calendar,
  Lock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { FamilyMember } from '../../types';

interface FamilyHealthViewProps {
  members: FamilyMember[];
  onAddMember: (member: Omit<FamilyMember, 'id' | 'syncStatus'>) => Promise<void>;
}

export const FamilyHealthView: React.FC<FamilyHealthViewProps> = ({
  members,
  onAddMember
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [relation, setRelation] = useState<FamilyMember['relation']>('Mother');
  const [dob, setDob] = useState<string>('1965-08-12');
  const [bloodGroup, setBloodGroup] = useState<string>('O+');
  const [conditions, setConditions] = useState<string>('');
  const [hasConsent, setHasConsent] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;
    setIsSubmitting(true);
    try {
      await onAddMember({
        fullName,
        relation,
        dateOfBirth: dob,
        bloodGroup,
        chronicConditions: conditions ? conditions.split(',').map(s => s.trim()) : [],
        hasAuthorizedAccess: hasConsent
      });
      setShowAddModal(false);
      setFullName('');
      setConditions('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">My Family Health Circle</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Role-Based Access
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage authorized health records for dependents, children, and elderly parents in Uganda.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Authorized Family Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">{member.fullName}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300">
                    {member.relation}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  DOB: {member.dateOfBirth} • Blood Group: <strong className="text-white">{member.bloodGroup}</strong>
                </p>
              </div>

              <span className="p-2 rounded-xl bg-slate-800 text-teal-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            {/* Conditions Tag */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Recorded Conditions:</span>
              <div className="flex flex-wrap gap-1 pt-1">
                {member.chronicConditions.length > 0 ? (
                  member.chronicConditions.map((c, i) => (
                    <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No chronic illnesses noted.</span>
                )}
              </div>
            </div>

            {/* Access Status */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized Offline Access</span>
              </span>
              <button className="text-teal-400 hover:text-teal-300 font-semibold text-xs">
                View Records
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Family Dependent</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Christine Namubiru"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Relationship</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Grandparent">Grandparent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Known Chronic Illnesses (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Osteoarthritis, Type 2 Diabetes"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
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
                  {isSubmitting ? 'Saving...' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
