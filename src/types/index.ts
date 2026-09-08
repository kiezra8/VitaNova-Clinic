// VitaNova Clinic - Core Healthcare Domain Types

export type UserRole = 'patient' | 'doctor' | 'nurse' | 'midwife' | 'physiotherapist' | 'admin';

export type SyncStatus = 'pending' | 'syncing' | 'synced' | 'failed' | 'requires_attention';

export type NetworkState = 'online' | 'offline' | 'poor' | 'syncing';

export interface SyncOutboxItem {
  id: string;
  entity: 'vitals' | 'medicalRecord' | 'consultation' | 'homeVisit' | 'message' | 'emergency';
  action: 'create' | 'update' | 'delete';
  payload: any;
  clientTimestamp: string;
  userId: string;
  deviceId: string;
  version: number;
  status: SyncStatus;
  retryCount: number;
  lastAttempt?: string;
  error?: string;
}

export interface PatientProfile {
  id: string;
  fullName: string;
  dateOfBirth: string;
  sex: 'Female' | 'Male' | 'Other';
  phone: string;
  email: string;
  location: string; // e.g., "Nakawa, Kampala, Uganda"
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  medicalConditions: string[];
  currentMedications: string[];
  profileImage: string;
  consentGiven: boolean;
  membershipPlanId?: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

export interface VitalRecord {
  id: string;
  patientId: string;
  timestamp: string;
  systolicBP?: number; // mmHg
  diastolicBP?: number; // mmHg
  heartRate?: number; // bpm
  bloodGlucose?: number; // mg/dL or mmol/L
  glucoseType?: 'fasting' | 'post-prandial' | 'random';
  temperature?: number; // Celsius
  weight?: number; // kg
  respiratoryRate?: number; // breaths/min
  spO2?: number; // percentage
  notes?: string;
  recordedBy: string;
  recordedByRole: UserRole;
  deviceId: string;
  syncStatus: SyncStatus;
  isConflict?: boolean;
}

export interface MedicalRecordEntry {
  id: string;
  patientId: string;
  timestamp: string;
  category: 'consultation' | 'condition' | 'allergy' | 'medication' | 'lab' | 'imaging' | 'procedure' | 'immunization';
  title: string;
  description: string;
  doctorName: string;
  doctorRole: string;
  doctorAvatar?: string;
  clinicBranch: string;
  attachments?: string[];
  vitalSnapshots?: Partial<VitalRecord>;
  syncStatus: SyncStatus;
  auditTrail: {
    createdAt: string;
    author: string;
    device: string;
    version: number;
  };
}

export interface HealthcareWorker {
  id: string;
  name: string;
  profession: 'Doctor' | 'Nurse' | 'Midwife' | 'Physiotherapist';
  specialty: string;
  experienceYears: number;
  verified: boolean;
  available: boolean;
  feeUGX: number;
  avatar: string;
  bio: string;
  languages: string[];
  rating: number;
  reviewCount: number;
}

export interface CarePlan {
  id: string;
  patientId: string;
  condition: 'Hypertension' | 'Diabetes Mellitus' | 'Asthma' | 'Cardiovascular Health' | 'Maternal Wellness';
  title: string;
  goals: string[];
  monitoringSchedule: string;
  prescribedMedications: {
    name: string;
    dosage: string;
    frequency: string;
    adherencePercentage: number;
  }[];
  careTeam: {
    name: string;
    role: string;
    phone: string;
    avatar?: string;
  }[];
  nextReviewDate: string;
  targetMetrics: {
    metric: string;
    target: string;
    current: string;
  }[];
  syncStatus: SyncStatus;
}

export interface HomeCareRequest {
  id: string;
  patientId: string;
  patientName: string;
  serviceType: 'Nursing' | 'Midwifery' | 'Physiotherapy' | 'Doctor Home Visit' | 'Elderly Care' | 'Wound Care' | 'Post-Operative' | 'Chronic Care';
  address: string;
  scheduledDate: string;
  status: 'draft' | 'pending_sync' | 'confirmed' | 'in_progress' | 'completed';
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  assignedWorkerAvatar?: string;
  clinicalNotes?: string;
  signatureCaptured?: boolean;
  vitalsRecorded?: Partial<VitalRecord>;
  syncStatus: SyncStatus;
}

export interface ActiveCallState {
  clinician: HealthcareWorker;
  type: 'video' | 'audio';
  status: 'connecting' | 'connected' | 'ended';
  startedAt?: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isSpeakerOn: boolean;
}

export interface HealthEducationArticle {
  id: string;
  title: string;
  diseaseName: string;
  category: 'Chronic Disease' | 'Maternal Health' | 'Child Health' | 'Infectious Diseases' | 'Mental Health' | 'Nutrition' | 'First Aid';
  summary: string;
  videoDuration: string;
  speakerName: string;
  speakerRole: string;
  speakerAvatar: string;
  videoThumbnail: string;
  isDownloaded: boolean;
  downloadedAt?: string;
  talkContent: {
    overview: string;
    causes: string[];
    symptoms: string[];
    prevention: string[];
    treatment: string[];
    whenToSeekEmergency: string;
  };
  articleContent?: {
    simpleExplanation: string;
    symptoms: string[];
    riskFactors: string[];
    prevention: string[];
    warningSigns: string[];
    whenToSeekCare: string;
  };
  thumbnail?: string;
  readTimeMinutes?: number;
}

export interface FamilyMember {
  id: string;
  fullName: string;
  relation: 'Mother' | 'Father' | 'Spouse' | 'Child' | 'Grandparent';
  dateOfBirth: string;
  bloodGroup: string;
  chronicConditions: string[];
  hasAuthorizedAccess: boolean;
  syncStatus: SyncStatus;
}

export interface MembershipPlan {
  id: string;
  name: 'Essential' | 'Family' | 'Chronic Care' | 'Premium';
  tagline: string;
  priceUGX: number;
  period: 'monthly' | 'annually';
  consultationsTotal: number;
  consultationsUsed: number;
  homeVisitsTotal: number;
  homeVisitsUsed: number;
  physioSessionsTotal: number;
  physioSessionsUsed: number;
  features: string[];
  discounts: string;
  isPopular?: boolean;
}

export interface WatchTelemetry {
  id: string;
  deviceId: string;
  deviceName: string;
  connected: boolean;
  batteryLevel: number; // percentage
  heartRateCurrent: number;
  stepsToday: number;
  sleepHours: number;
  spO2Current: number;
  lastSyncedLocal: string;
}

export interface WhatsAppFollowUp {
  id: string;
  patientId: string;
  patientPhone: string;
  templateType: 'Appointment Reminder' | 'Post-Consultation' | 'Home-Care Check-in' | 'Medication Alert' | 'Chronic Care Follow-up';
  scheduledTime: string;
  status: 'Queued' | 'Sent' | 'Delivered' | 'Read' | 'Offline Draft';
  messagePreview: string;
  optedOut: boolean;
}

export interface EmergencyAction {
  id: string;
  callerName: string;
  callerPhone: string;
  locationCoordinates?: { lat: number; lng: number };
  locationText: string;
  triageSeverity: 'Critical (Red)' | 'Urgent (Yellow)' | 'Standard (Green)';
  dispatchStatus: 'Offline Draft' | 'Transmitted' | 'Ambulance En Route' | 'Resolved';
  timestamp: string;
  syncStatus: SyncStatus;
}
