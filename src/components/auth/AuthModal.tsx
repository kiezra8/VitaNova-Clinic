import React, { useState, useRef } from 'react';
import {
  X,
  User,
  Stethoscope,
  Lock,
  Mail,
  Phone,
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { db } from '../../lib/db';
import { PatientProfile, HealthcareWorker } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'patient' | 'doctor';
  initialAction?: 'signin' | 'signup';
  callPromptMessage?: string | null;
  onPatientLogin: (patient: PatientProfile) => void;
  onDoctorLogin: (doctor: HealthcareWorker, isAdmin: boolean) => void;
  onRegisterDoctor: (newDoctor: HealthcareWorker) => Promise<void> | void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'patient',
  initialAction = 'signin',
  callPromptMessage,
  onPatientLogin,
  onDoctorLogin,
  onRegisterDoctor
}) => {
  const [role, setRole] = useState<'patient' | 'doctor'>(initialRole);
  const [action, setAction] = useState<'signin' | 'signup'>(initialAction);

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+256 ');
  const [fullName, setFullName] = useState('');

  // Patient Extra Fields
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState<'Male' | 'Female'>('Female');
  const [bloodGroup, setBloodGroup] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'>('O+');
  const [location, setLocation] = useState('Kampala, Uganda');

  // Doctor Extra Fields
  const [specialty, setSpecialty] = useState('General Physician & Telehealth');
  const [feeUGX, setFeeUGX] = useState<number>(45000);
  const [experienceYears, setExperienceYears] = useState<number>(8);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle local image file upload & convert to base64 Data URL
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setProfilePreview(result);
      setProfilePictureUrl(result);
    };
    reader.readAsDataURL(file);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Secret Admin / Dr. Israel Kisakye Check
      const isAdminEmail =
        cleanEmail === 'israelezrakisakye@gmail.com' ||
        cleanEmail === 'israelerzrakisakye@gmail.com';
      const isAdminPass = cleanPass === '88888888';

      if (isAdminEmail && isAdminPass) {
        // Authenticate directly as Dr. Israel Kisakye (Doctor + Admin)
        const drIsrael: HealthcareWorker = {
          id: 'doc_israel',
          name: 'Dr. Israel Kisakye',
          profession: 'Doctor',
          specialty: 'Chief Medical Consultant & Telehealth Lead',
          experienceYears: 12,
          verified: true,
          available: true,
          feeUGX: 45000,
          avatar: profilePictureUrl || '/ki_ezra_avatar.jpg',
          phone: '+256 772 888 888',
          whatsapp: '+256 772 888 888',
          email: 'israelezrakisakye@gmail.com',
          inAppCallRoom: 'vitanova-doc-israel-kisakye',
          bio: 'Chief Medical Officer at VitaNova Clinic. Lead Telehealth Consultant and Clinical Director.',
          languages: ['English', 'Luganda'],
          rating: 5.0,
          reviewCount: 180,
          registrationNumber: 'UMDPC-MED-2010-3104',
          education: 'MBChB (Makerere University), MSc Telemedicine (Edinburgh)',
          hospitalAffiliation: 'VitaNova Central Nakawa Clinic & Mulago Referral',
          conditionsTreated: [
            'Cardiovascular & Hypertension Therapy',
            'Family Health Consultation',
            'Telehealth Clinical Triage'
          ],
          availabilityHours: 'Daily: 7:00 AM – 10:00 PM (EAT)',
          responseSpeed: '< 2 mins direct response'
        };

        setSuccessMessage('Welcome Dr. Israel Kisakye (Admin Access Enabled)');
        setTimeout(() => {
          onDoctorLogin(drIsrael, true);
          onClose();
        }, 500);
        return;
      }

      // DOCTOR FLOW
      if (role === 'doctor') {
        if (action === 'signin') {
          // Standard doctor sign in lookup
          const storedDocs = localStorage.getItem('vitanova_registered_doctors');
          let foundDoc: HealthcareWorker | null = null;
          if (storedDocs) {
            try {
              const list: HealthcareWorker[] = JSON.parse(storedDocs);
              foundDoc = list.find((d) => d.email?.toLowerCase() === cleanEmail) || null;
            } catch (_) {}
          }

          if (foundDoc) {
            setSuccessMessage(`Welcome back, ${foundDoc.name}!`);
            setTimeout(() => {
              onDoctorLogin(foundDoc!, false);
              onClose();
            }, 500);
            return;
          }

          // If no doctor matched
          setErrorMessage('Invalid doctor email or password. Please verify your credentials.');
          return;
        } else {
          // DOCTOR SIGN UP / REGISTRATION
          if (!fullName.trim()) {
            setErrorMessage('Please enter your full name.');
            return;
          }
          if (!cleanEmail) {
            setErrorMessage('Please provide a valid clinic email.');
            return;
          }
          if (cleanPass.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
            return;
          }

          const docId = `doc_${Date.now().toString(36)}`;
          const avatar =
            profilePictureUrl ||
            'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80';

          const newDoctor: HealthcareWorker = {
            id: docId,
            name: fullName.startsWith('Dr.') ? fullName : `Dr. ${fullName}`,
            profession: 'Doctor',
            specialty: specialty.trim() || 'General Physician',
            experienceYears: experienceYears || 5,
            verified: true,
            available: true,
            feeUGX: feeUGX || 45000,
            avatar,
            phone: phone.trim(),
            whatsapp: phone.trim(),
            email: cleanEmail,
            inAppCallRoom: `vitanova-${docId}`,
            bio: `${specialty} at VitaNova Telehealth Network. Dedicated to personalized patient care.`,
            languages: ['English', 'Luganda'],
            rating: 5.0,
            reviewCount: 1,
            registrationNumber: `UMDPC-${Date.now().toString().slice(-6)}`,
            education: 'MBChB Medicine & Surgery',
            hospitalAffiliation: 'VitaNova Health Clinic',
            conditionsTreated: ['Primary Care', 'Telehealth Consultation'],
            availabilityHours: 'Daily: 8:00 AM – 8:00 PM',
            responseSpeed: '< 5 mins direct response'
          };

          // Save to local registered doctors
          try {
            const stored = localStorage.getItem('vitanova_registered_doctors');
            const list: HealthcareWorker[] = stored ? JSON.parse(stored) : [];
            list.push(newDoctor);
            localStorage.setItem('vitanova_registered_doctors', JSON.stringify(list));
          } catch (_) {}

          await onRegisterDoctor(newDoctor);
          setSuccessMessage(`Account created! Welcome, ${newDoctor.name}!`);
          setTimeout(() => {
            onDoctorLogin(newDoctor, false);
            onClose();
          }, 600);
          return;
        }
      }

      // PATIENT FLOW
      if (role === 'patient') {
        if (action === 'signin') {
          // Find existing patient by email or phone in IndexedDB
          const existingPatients = await db.patients.toArray();
          const matched = existingPatients.find(
            (p) =>
              (p.email && p.email.toLowerCase() === cleanEmail) ||
              (p.phone && p.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''))
          );

          if (matched) {
            setSuccessMessage(`Welcome back, ${matched.fullName}!`);
            setTimeout(() => {
              onPatientLogin(matched);
              onClose();
            }, 500);
            return;
          }

          // If no patient found, prompt to create account
          setErrorMessage(
            'Account not found. Please click "Create Account" below to register in under 1 minute.'
          );
          return;
        } else {
          // PATIENT SIGN UP
          if (!fullName.trim()) {
            setErrorMessage('Please enter your full name.');
            return;
          }
          if (cleanPass.length < 4) {
            setErrorMessage('Please set a password of at least 4 characters.');
            return;
          }

          const patId = `pat_${Date.now().toString(36)}`;
          const newPatient: PatientProfile = {
            id: patId,
            fullName: fullName.trim(),
            dateOfBirth: dateOfBirth || '1995-01-01',
            sex,
            phone: phone.trim(),
            email: cleanEmail || `${patId}@vitanova.ug`,
            location: location.trim() || 'Kampala, Uganda',
            emergencyContact: {
              name: 'Next of Kin',
              relationship: 'Family',
              phone: phone.trim() || '+256 700 000 000'
            },
            bloodGroup,
            allergies: [],
            medicalConditions: [],
            currentMedications: [],
            profileImage:
              profilePictureUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            consentGiven: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            syncStatus: 'pending'
          };

          await db.patients.add(newPatient);

          setSuccessMessage(`Welcome to VitaNova Clinic, ${newPatient.fullName}!`);
          setTimeout(() => {
            onPatientLogin(newPatient);
            onClose();
          }, 600);
          return;
        }
      }
    } catch (err: any) {
      console.warn('[VitaNova Auth Error]:', err);
      setErrorMessage(err?.message || 'Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl space-y-4 my-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 border border-slate-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Call Prompt Notice */}
        {callPromptMessage && (
          <div className="p-3 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center space-x-2 text-xs text-teal-300">
            <Sparkles className="w-4 h-4 shrink-0 text-teal-400 animate-pulse" />
            <span>{callPromptMessage}</span>
          </div>
        )}

        {/* Portal Role Tabs: Patient vs Doctor */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setRole('patient');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              role === 'patient'
                ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('doctor');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              role === 'doctor'
                ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor Portal</span>
          </button>
        </div>

        {/* Title & Action Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div>
            <h3 className="text-base font-extrabold text-white">
              {role === 'doctor'
                ? action === 'signin'
                  ? 'Doctor Sign In'
                  : 'Register New Doctor'
                : action === 'signin'
                ? 'Patient Sign In'
                : 'Create Patient Account'}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {role === 'doctor'
                ? 'Access consultation calls & patient clinical triage'
                : 'Consult doctors, track vitals & book doorstep healthcare'}
            </p>
          </div>

          <div className="flex rounded-lg bg-slate-800 p-0.5 text-[11px] font-semibold border border-slate-700">
            <button
              type="button"
              onClick={() => {
                setAction('signin');
                setErrorMessage(null);
              }}
              className={`px-2 py-1 rounded-md transition-colors ${
                action === 'signin' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAction('signup');
                setErrorMessage(null);
              }}
              className={`px-2 py-1 rounded-md transition-colors ${
                action === 'signup' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* PROFILE PICTURE UPLOAD FOR DOCTOR SIGNUP (or Patient) */}
          {action === 'signup' && (
            <div className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-teal-500/40 flex items-center justify-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-slate-500" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-teal-500 text-slate-950 shadow-md hover:bg-teal-400"
                  title="Upload picture"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">
                  {role === 'doctor' ? 'Doctor Profile Photo' : 'Profile Photo'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Upload your photo to appear on video calls and clinical records.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1.5 inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-700 text-[10px] font-semibold text-teal-300 hover:bg-slate-600"
                >
                  <Upload className="w-3 h-3" />
                  <span>Choose Photo File</span>
                </button>
              </div>
            </div>
          )}

          {/* Full Name for Sign Up */}
          {action === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                {role === 'doctor' ? 'Full Doctor Name (e.g. Dr. Jane Kigozi)' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={role === 'doctor' ? 'Dr. Name' : 'Your Full Name'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          )}

          {/* Doctor Specialty & Consultation Fee for Doctor Sign Up */}
          {role === 'doctor' && action === 'signup' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="e.g. Cardiologist"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Fee (UGX)</label>
                <input
                  type="number"
                  value={feeUGX}
                  onChange={(e) => setFeeUGX(Number(e.target.value))}
                  placeholder="45000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Email Address {role === 'doctor' ? '(Clinic / Doctor Email)' : ''}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'doctor' ? 'doctor@vitanova.ug' : 'patient@example.com'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Phone Number (Sign up or patient sign in) */}
          {(action === 'signup' || role === 'patient') && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Patient Details on Sign Up: Blood group & Location */}
          {role === 'patient' && action === 'signup' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
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
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location / District</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Kampala, Uganda"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Password Input */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Messages */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[11px] text-red-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>
                {role === 'doctor'
                  ? action === 'signin'
                    ? 'Sign In to Doctor Line'
                    : 'Register as Doctor'
                  : action === 'signin'
                  ? 'Sign In to Patient Portal'
                  : 'Create Patient Account & Proceed'}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
