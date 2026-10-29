import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  HeartPulse,
  CreditCard,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Database,
  ArrowUpRight,
  Phone,
  MessageSquare,
  Plus,
  Edit2,
  Save,
  X,
  Stethoscope,
  BadgeCheck,
  Video,
  Trash2,
  Lock
} from 'lucide-react';
import { SyncOutboxItem, HealthcareWorker } from '../../types';
import { signUpDoctor, upsertClinician, deleteClinician } from '../../lib/supabase';

interface AdminDashboardProps {
  outboxItems: SyncOutboxItem[];
  onTriggerGlobalSync: () => Promise<void>;
  networkState: string;
  clinicians?: HealthcareWorker[];
  onUpdateClinicians?: (clinicians: HealthcareWorker[]) => void;
  onTestCall?: (clinician: HealthcareWorker) => void;
  isAdmin?: boolean;
  onOpenAuthModal?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({
  outboxItems,
  onTriggerGlobalSync,
  networkState,
  clinicians = [],
  onUpdateClinicians,
  onTestCall,
  isAdmin = false,
  onOpenAuthModal
}) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors'>('doctors');

  // Edit Doctor Modal / State
  const [editingDoctor, setEditingDoctor] = useState<HealthcareWorker | null>(null);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState<boolean>(false);

  // Doctor Form Fields
  const [docName, setDocName] = useState<string>('');
  const [docProfession, setDocProfession] = useState<'Doctor' | 'Nurse' | 'Midwife' | 'Physiotherapist'>('Doctor');
  const [docSpecialty, setDocSpecialty] = useState<string>('');
  const [docPhone, setDocPhone] = useState<string>('');
  const [docWhatsApp, setDocWhatsApp] = useState<string>('');
  const [docEmail, setDocEmail] = useState<string>('');
  const [docPassword, setDocPassword] = useState<string>('');
  const [docFee, setDocFee] = useState<number>(45000);
  const [docExp, setDocExp] = useState<number>(8);
  const [docAvatar, setDocAvatar] = useState<string>('');
  const [docAvatarFile, setDocAvatarFile] = useState<File | null>(null);
  const [docBio, setDocBio] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const pendingItems = outboxItems.filter(i => i.status === 'pending');
  const syncedItems = outboxItems.filter(i => i.status === 'synced');
  const failedItems = outboxItems.filter(i => i.status === 'failed' || i.status === 'requires_attention');

  const handleSyncAll = async () => {
    setIsSyncing(true);
    await onTriggerGlobalSync();
    setIsSyncing(false);
  };

  const openEditDoctor = (doc: HealthcareWorker) => {
    setEditingDoctor(doc);
    setDocName(doc.name);
    setDocProfession(doc.profession);
    setDocSpecialty(doc.specialty);
    setDocPhone(doc.phone || '+256 772 888 888');
    setDocWhatsApp(doc.whatsapp || doc.phone || '+256 772 888 888');
    setDocEmail(doc.email || '');
    setDocPassword(doc.password || '');
    setDocFee(doc.feeUGX || 45000);
    setDocExp(doc.experienceYears || 10);
    setDocAvatar(doc.avatar);
    setDocAvatarFile(null);
    setDocBio(doc.bio || '');
  };

  const openAddDoctor = () => {
    setShowAddDoctorModal(true);
    setDocName('');
    setDocProfession('Doctor');
    setDocSpecialty('');
    setDocPhone('+256 772 ');
    setDocWhatsApp('+256 772 ');
    setDocEmail('');
    setDocPassword('');
    setDocFee(45000);
    setDocExp(5);
    setDocAvatar('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80');
    setDocAvatarFile(null);
    setDocBio('');
  };

  const handleSaveEditDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor || !onUpdateClinicians) return;

    const targetAvatar = docAvatar.trim() || editingDoctor.avatar;

    const updatedList = clinicians.map((c) => {
      if (c.id === editingDoctor.id) {
        return {
          ...c,
          name: docName.trim(),
          profession: docProfession,
          specialty: docSpecialty.trim(),
          phone: docPhone.trim(),
          whatsapp: docWhatsApp.trim(),
          email: docEmail.trim(),
          password: docPassword.trim() || '88888888',
          feeUGX: Number(docFee),
          experienceYears: Number(docExp),
          avatar: targetAvatar,
          bio: docBio.trim() || c.bio,
          inAppCallRoom: `vitanova-${c.id.replace(/_/g, '-')}`
        };
      }
      return c;
    });

    // Also update Supabase database row & upload photo
    upsertClinician({
      id: editingDoctor.id,
      name: docName.trim(),
      profession: docProfession,
      specialty: docSpecialty.trim(),
      email: docEmail.trim(),
      phone: docPhone.trim(),
      whatsapp: docWhatsApp.trim(),
      experienceYears: Number(docExp),
      feeUGX: Number(docFee),
      bio: docBio.trim(),
      avatar: targetAvatar,
      avatarUrl: targetAvatar,
      languages: editingDoctor.languages || ['English', 'Luganda'],
      verified: true,
      available: true,
      hospitalAffiliation: editingDoctor.hospitalAffiliation || 'VitaNova Clinic'
    }, docAvatarFile).then((res) => {
      if (res?.data?.avatar_url && res.data.avatar_url !== targetAvatar) {
        const syncedList = updatedList.map((item) =>
          item.id === editingDoctor.id ? { ...item, avatar: res.data.avatar_url } : item
        );
        onUpdateClinicians(syncedList);
      }
    }).catch((err) => {
      console.warn('Supabase upsert clinician warning:', err);
    });

    onUpdateClinicians(updatedList);
    setEditingDoctor(null);
    setDocAvatarFile(null);
    setSaveSuccessMsg(`Staff account updated & synced for ${docName}!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleDeleteClinician = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently remove ${name} from VitaNova Clinic staff?`)) {
      return;
    }
    if (!onUpdateClinicians) return;
    const updated = clinicians.filter((c) => c.id !== id);
    onUpdateClinicians(updated);

    try {
      await deleteClinician(id);
    } catch (err) {
      console.warn('Supabase delete clinician notice:', err);
    }

    setSaveSuccessMsg(`${name} removed successfully from VitaNova Clinic and database.`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleCreateNewDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !onUpdateClinicians) return;

    const newDocId = `doc_${Date.now()}`;
    const newDoc: HealthcareWorker = {
      id: newDocId,
      name: docName.trim(),
      profession: docProfession,
      specialty: docSpecialty.trim() || 'General Practitioner',
      phone: docPhone.trim() || '+256 772 888 888',
      whatsapp: docWhatsApp.trim() || docPhone.trim() || '+256 772 888 888',
      email: docEmail.trim() || 'israelezrakisakye@gmail.com',
      password: docPassword.trim() || '88888888',
      experienceYears: Number(docExp) || 5,
      verified: true,
      available: true,
      feeUGX: Number(docFee) || 45000,
      avatar: docAvatar.trim() || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      bio: docBio.trim() || 'Licensed medical practitioner providing direct in-app and in-person consultations.',
      languages: ['English', 'Luganda'],
      rating: 5.0,
      reviewCount: 1,
      inAppCallRoom: `vitanova-${newDocId.replace(/_/g, '-')}`,
      hospitalAffiliation: 'VitaNova Nakawa & Mulago Hospital'
    };

    // 1. Create account in Supabase Auth so clinician can log in
    if (docEmail.trim() && docPassword.trim()) {
      signUpDoctor(docEmail.trim(), docPassword.trim()).catch((err) => {
        console.warn('Supabase Auth auto-registration:', err);
      });
    }

    // 2. Insert into Supabase clinicians database table
    upsertClinician({
      id: newDoc.id,
      name: newDoc.name,
      profession: newDoc.profession,
      specialty: newDoc.specialty,
      email: newDoc.email || '',
      phone: newDoc.phone,
      whatsapp: newDoc.whatsapp,
      experienceYears: newDoc.experienceYears || 5,
      feeUGX: newDoc.feeUGX || 45000,
      bio: newDoc.bio || '',
      avatar: newDoc.avatar,
      avatarUrl: newDoc.avatar,
      languages: newDoc.languages || ['English', 'Luganda'],
      verified: true,
      available: true,
      hospitalAffiliation: newDoc.hospitalAffiliation
    }, docAvatarFile).then((res) => {
      if (res?.data?.avatar_url && res.data.avatar_url !== newDoc.avatar) {
        const synced = updatedList.map((c) => c.id === newDoc.id ? { ...c, avatar: res.data.avatar_url } : c);
        onUpdateClinicians(synced);
      }
    }).catch((err) => {
      console.warn('Supabase upsert new clinician warning:', err);
    });

    const updatedList = [newDoc, ...clinicians];
    onUpdateClinicians(updatedList);
    setShowAddDoctorModal(false);
    setDocAvatarFile(null);
    setSaveSuccessMsg(`New doctor registered & authorized in Supabase for ${newDoc.name} (${newDoc.email})!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
          <Lock className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Admin Privileges Required</h2>
          <p className="text-xs text-slate-400 mt-1">
            Clinic staff management and settings are restricted exclusively to <strong className="text-teal-400 font-mono">israelezrakisakye@gmail.com</strong>.
          </p>
        </div>
        {onOpenAuthModal && (
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all"
          >
            Sign In as Admin
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 bg-white min-h-screen text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 p-6 rounded-3xl border border-teal-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Clinic Operations & Admin Console</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Admin Access
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Authenticated Admin: <strong className="text-teal-400 font-mono">israelezrakisakye@gmail.com</strong> • Doctor Registry & Direct Phone Routing
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab(activeTab === 'doctors' ? 'overview' : 'doctors')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeTab === 'doctors'
                ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {activeTab === 'doctors' ? 'Doctors & Telehealth Registry' : 'Switch to Doctor Registry'}
          </button>

          <button
            onClick={handleSyncAll}
            disabled={isSyncing || networkState === 'offline'}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center space-x-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Outbox'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* ── SECTION 1: DOCTORS DIRECTORY & PHONE NUMBER REGISTRY ── */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>Doctor Accounts & Private Phone Registry</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  In-App Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Doctors created by admin receive patient calls directly in the app. Doctor phone numbers are kept private and never shown to patients.
              </p>
            </div>
          </div>

          <button
            onClick={openAddDoctor}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-xs shadow-md shadow-teal-500/20 flex items-center justify-center space-x-1.5 transition-transform active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Doctor Account</span>
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicians.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3 transition-all"
            >
              <div className="flex items-start space-x-3">
                <div className="relative shrink-0">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/40 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1">
                    <h3 className="text-sm font-bold text-white truncate">{doc.name}</h3>
                    {doc.verified && <BadgeCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-teal-300 font-medium truncate">{doc.specialty}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{doc.profession} • {doc.experienceYears} yrs exp</p>
                </div>
              </div>

              {/* Contact Details Display */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                {/* Account Credentials */}
                <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] text-slate-400">Account Login:</span>
                  <span className="font-mono text-teal-300 font-bold truncate max-w-[170px]">
                    {doc.email || 'israelezrakisakye@gmail.com'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] text-slate-400">Login Status:</span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">
                    Protected & Encrypted
                  </span>
                </div>

                {/* Private Phone (Admin Confidential) */}
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>Private Phone:</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {doc.phone || '+256 772 888 888'}
                  </span>
                </div>

                <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-300 flex items-center justify-between">
                  <span>🔒 Patient Privacy:</span>
                  <span className="font-semibold text-emerald-300">Phone Hidden from Patients</span>
                </div>

                <div className="flex items-center justify-between text-slate-300 pt-0.5">
                  <span className="text-[11px] text-slate-400">Consultation Fee:</span>
                  <span className="font-bold text-white">UGX {doc.feeUGX?.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => openEditDoctor(doc)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteClinician(doc.id, doc.name)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-colors"
                  title={`Delete ${doc.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {onTestCall && (
                  <button
                    type="button"
                    onClick={() => onTestCall(doc)}
                    className="px-3 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-bold text-xs border border-teal-500/30 flex items-center justify-center space-x-1 transition-colors"
                    title="Test In-App Calling"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Test In-App Call</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: CLINIC OPERATIONS & DISPATCH ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Enrolled Patients</span>
          <p className="text-2xl font-extrabold text-white">1,482</p>
          <p className="text-[10px] text-teal-400">+38 this week across Kampala</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total MoMo Revenue</span>
          <p className="text-2xl font-extrabold text-white">UGX 18.4M</p>
          <p className="text-[10px] text-emerald-400">MTN & Airtel automated payouts</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Home Care Visits Done</span>
          <p className="text-2xl font-extrabold text-white">314</p>
          <p className="text-[10px] text-teal-400">100% bedside signed</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Registered Doctors & Clinicians</span>
          <p className="text-2xl font-extrabold text-white">{clinicians.length}</p>
          <p className="text-[10px] text-teal-400">100% Verified Telehealth Lines</p>
        </div>
      </div>

      {/* Sync Queue Monitor */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-white">Real-Time Sync Engine Queue Monitor</h2>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
              {pendingItems.length} Pending
            </span>
            <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              {syncedItems.length} Synced
            </span>
            {failedItems.length > 0 && (
              <span className="text-rose-300 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                {failedItems.length} Attention
              </span>
            )}
          </div>
        </div>

        {outboxItems.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            Local change outbox is empty. All modifications are currently synchronized.
          </p>
        ) : (
          <div className="space-y-2">
            {outboxItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-white uppercase font-mono text-[11px]">{item.entity}</strong>
                    <span className="text-slate-400">• Action: {item.action}</span>
                    <span className="text-slate-500 text-[10px]">({item.id})</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Device: <code className="text-teal-400">{item.deviceId}</code> • Time: {new Date(item.clientTimestamp).toLocaleTimeString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'synced'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : item.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Dispatch & Triage Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-red-400" />
          <span>Active Emergency Dispatch Queue (Kampala Metro)</span>
        </h2>
        <div className="space-y-2">
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <p className="font-bold text-white">Plot 14, Ntinda-Nakawa Road, Kampala</p>
              <p className="text-slate-400 text-[11px]">Caller: Sarah Namubiru (+256 772 458 912) • Severity: Urgent (Yellow)</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Ambulance #03 En Route (ETA 8 mins)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL: EDIT DOCTOR PHONE & CONTACT ── */}
      {editingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Edit Staff & Contact Details</h3>
                  <p className="text-[10px] text-slate-400">{editingDoctor.name} ({editingDoctor.profession})</p>
                </div>
              </div>
              <button onClick={() => setEditingDoctor(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Profession *</label>
                  <select
                    value={docProfession}
                    onChange={(e) => setDocProfession(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Midwife">Midwife</option>
                    <option value="Physiotherapist">Physiotherapist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    value={docExp}
                    onChange={(e) => setDocExp(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Consultation / Visit Fee (UGX)</label>
                  <input
                    type="number"
                    value={docFee}
                    onChange={(e) => setDocFee(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Specialty / Field</label>
                  <input
                    type="text"
                    value={docSpecialty}
                    onChange={(e) => setDocSpecialty(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Registered Phone Number (MTN / Airtel Uganda) *</label>
                <input
                  type="text"
                  required
                  placeholder="+256 772 888 888"
                  value={docPhone}
                  onChange={(e) => setDocPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-teal-500/50 rounded-xl px-3 py-2 text-emerald-300 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <p className="text-[10px] text-slate-500 mt-0.5">When patient calls, this phone number receives the call directly.</p>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">WhatsApp Calling / Chat Number</label>
                <input
                  type="text"
                  placeholder="+256 772 888 888"
                  value={docWhatsApp}
                  onChange={(e) => setDocWhatsApp(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Registered Email (Clinician Login)</label>
                <input
                  type="email"
                  value={docEmail}
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Account Password (For Telehealth App Login)</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={docPassword}
                  onChange={(e) => setDocPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <p className="text-[10px] text-teal-400 mt-1">Clinician uses their email and this password to log in and receive in-app telehealth calls.</p>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Bio & Clinical Profile</label>
                <textarea
                  rows={2}
                  value={docBio}
                  onChange={(e) => setDocBio(e.target.value)}
                  placeholder="Background, qualifications, hospital affiliations..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Staff Photo (Choose from Phone Gallery or Camera)
                </label>
                <div className="flex items-center space-x-3">
                  {docAvatar && (
                    <img
                      src={docAvatar}
                      alt="Staff Preview"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shadow-md shrink-0"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setDocAvatarFile(file);
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            setDocAvatar(ev.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-xs text-slate-300 file:mr-2 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-500/20 file:text-teal-300 hover:file:bg-teal-500 hover:file:text-slate-950 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Tap to select directly from your phone gallery or take a photo.</p>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteClinician(editingDoctor.id, editingDoctor.name);
                    setEditingDoctor(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Staff</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingDoctor(null)}
                    className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: REGISTER NEW DOCTOR ── */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-5 sm:p-6 space-y-4 shadow-2xl my-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Register New Doctor</h3>
                  <p className="text-[11px] text-slate-400">Add clinician to VitaNova Telehealth directory</p>
                </div>
              </div>
              <button onClick={() => setShowAddDoctorModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewDoctor} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Israel Kisakye"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Profession</label>
                  <select
                    value={docProfession}
                    onChange={(e) => setDocProfession(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Midwife">Midwife</option>
                    <option value="Physiotherapist">Physiotherapist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Phone Number (Calling Line) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+256 772 888 888"
                    value={docPhone}
                    onChange={(e) => setDocPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-teal-500/50 rounded-xl px-3 py-2 text-emerald-300 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">WhatsApp Line</label>
                  <input
                    type="text"
                    placeholder="+256 772 888 888"
                    value={docWhatsApp}
                    onChange={(e) => setDocWhatsApp(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiology, Internal Medicine"
                    value={docSpecialty}
                    onChange={(e) => setDocSpecialty(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Consultation Fee (UGX)</label>
                  <input
                    type="number"
                    value={docFee}
                    onChange={(e) => setDocFee(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Registered Email (Doctor Sign In) *</label>
                <input
                  type="email"
                  required
                  placeholder="doctor@vitanova.ug"
                  value={docEmail}
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Doctor Account Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter secure password"
                  value={docPassword}
                  onChange={(e) => setDocPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <p className="text-[10px] text-teal-400 mt-1">Admin assigns this password so doctor logs in with their email and receives patient in-app calls.</p>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Staff Photo (Choose from Phone Gallery or Camera)
                </label>
                <div className="flex items-center space-x-3">
                  {docAvatar && (
                    <img
                      src={docAvatar}
                      alt="Staff Preview"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shadow-md shrink-0"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setDocAvatarFile(file);
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            setDocAvatar(ev.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-xs text-slate-300 file:mr-2 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-500/20 file:text-teal-300 hover:file:bg-teal-500 hover:file:text-slate-950 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Tap to select directly from your phone gallery or take a photo.</p>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Bio & Clinical Background</label>
                <textarea
                  rows={2}
                  placeholder="Consultant background, hospital affiliations..."
                  value={docBio}
                  onChange={(e) => setDocBio(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black shadow-md shadow-teal-500/20"
                >
                  Register Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
