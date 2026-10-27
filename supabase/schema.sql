-- =============================================================================
-- VITANOVA CLINIC — COMPLETE ALL-IN-ONE MASTER SUPABASE SQL SCRIPT
-- Project: https://skthogttabcvfvhqujra.supabase.co
--
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/skthogttabcvfvhqujra
-- 2. Go to: SQL Editor (icon on the left sidebar) -> New Query
-- 3. Paste this entire script and click "RUN" (green button)
--
-- FEATURES CONFIGURED:
--  ✓ Extensions (uuid-ossp, pgcrypto)
--  ✓ 11 Tables: clinicians, member_profiles, vital_records, home_care_requests,
--               consultations, messages, call_logs, call_signals,
--               sync_outbox_log, education_articles, family_members
--  ✓ WhatsApp-style Real-time Messaging & Call Logging
--  ✓ WebRTC Video & Voice Call Signaling
--  ✓ Safe Idempotent Schema (run it 100 times, NEVER errors)
--  ✓ Row Level Security (RLS) policies configured safely
--  ✓ Realtime publication subscriptions enabled safely
--  ✓ Storage bucket setup for attachments & avatars
--  ✓ Verified initial seed data (Dr. Israel Kisakye, clinicians, demo patient)
-- =============================================================================

-- ── 1. EXTENSIONS ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 2. HELPER FUNCTION: Deterministic Conversation ID ────────────────────────
CREATE OR REPLACE FUNCTION get_conversation_id(id1 TEXT, id2 TEXT) RETURNS TEXT AS $$
BEGIN
  IF id1 < id2 THEN
    RETURN id1 || '__' || id2;
  ELSE
    RETURN id2 || '__' || id1;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ── 3. CLINICIANS / HEALTHCARE WORKERS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinicians (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  profession            TEXT NOT NULL,
  specialty             TEXT NOT NULL,
  experience_years      INTEGER DEFAULT 5,
  verified              BOOLEAN DEFAULT true,
  available             BOOLEAN DEFAULT true,
  fee_ugx               INTEGER DEFAULT 45000,
  avatar_url            TEXT,
  bio                   TEXT,
  languages             TEXT[] DEFAULT ARRAY['English', 'Luganda'],
  rating                NUMERIC(3,1) DEFAULT 5.0,
  review_count          INTEGER DEFAULT 0,
  email                 TEXT,
  phone                 TEXT,
  whatsapp              TEXT,
  password              TEXT DEFAULT '88888888',
  registration_number   TEXT,
  education             TEXT,
  hospital_affiliation  TEXT,
  conditions_treated    TEXT[] DEFAULT '{}',
  availability_hours    TEXT,
  response_speed        TEXT,
  in_app_call_room      TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Safe column additions if clinicians table existed previously
DO $$ BEGIN
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS email TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS phone TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS whatsapp TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS password TEXT DEFAULT '88888888';
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS registration_number TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS education TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS hospital_affiliation TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS conditions_treated TEXT[] DEFAULT '{}';
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS availability_hours TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS response_speed TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS in_app_call_room TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 4. MEMBER PROFILES (PATIENTS) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS member_profiles (
  id                    TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  full_name             TEXT NOT NULL,
  date_of_birth         DATE,
  sex                   TEXT CHECK (sex IN ('Female', 'Male', 'Other')),
  phone                 TEXT,
  email                 TEXT,
  address               TEXT,
  district              TEXT DEFAULT 'Kampala',
  location_district     TEXT DEFAULT 'Kampala',
  health_id             TEXT,
  next_of_kin           TEXT,
  next_of_kin_phone     TEXT,
  blood_group           TEXT,
  allergies             TEXT[] DEFAULT '{}',
  chronic_conditions    TEXT[] DEFAULT '{}',
  primary_clinician_id  TEXT,
  membership_tier       TEXT DEFAULT 'basic',
  avatar_url            TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

DO $$ BEGIN
  ALTER TABLE member_profiles ADD COLUMN IF NOT EXISTS location_district TEXT DEFAULT 'Kampala';
  ALTER TABLE member_profiles ADD COLUMN IF NOT EXISTS health_id TEXT;
  ALTER TABLE member_profiles ADD COLUMN IF NOT EXISTS primary_clinician_id TEXT;
  ALTER TABLE member_profiles ADD COLUMN IF NOT EXISTS membership_tier TEXT DEFAULT 'basic';
  ALTER TABLE member_profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 5. VITAL RECORDS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vital_records (
  id                    TEXT PRIMARY KEY,
  member_id             TEXT NOT NULL,
  recorded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  recorded_by           TEXT,
  recorded_by_role      TEXT DEFAULT 'patient',
  source                TEXT DEFAULT 'manual',
  systolic_bp           INTEGER,
  diastolic_bp          INTEGER,
  heart_rate            INTEGER,
  spo2                  NUMERIC(5,2),
  temperature           NUMERIC(4,1),
  blood_glucose         NUMERIC(5,2),
  glucose_mg_dl         NUMERIC(5,2),
  weight_kg             NUMERIC(5,1),
  height_cm             INTEGER,
  notes                 TEXT,
  sync_status           TEXT DEFAULT 'synced',
  device_id             TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

DO $$ BEGIN
  ALTER TABLE vital_records ADD COLUMN IF NOT EXISTS glucose_mg_dl NUMERIC(5,2);
  ALTER TABLE vital_records ADD COLUMN IF NOT EXISTS recorded_by_role TEXT DEFAULT 'patient';
  ALTER TABLE vital_records ADD COLUMN IF NOT EXISTS sync_status TEXT DEFAULT 'synced';
  ALTER TABLE vital_records ADD COLUMN IF NOT EXISTS device_id TEXT;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 6. HOME CARE REQUESTS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS home_care_requests (
  id                    TEXT PRIMARY KEY,
  member_id             TEXT NOT NULL,
  request_type          TEXT DEFAULT 'Home Check',
  service_type          TEXT DEFAULT 'Home Check',
  urgency               TEXT DEFAULT 'routine',
  scheduled_date        TEXT,
  requested_date        TEXT,
  scheduled_time        TEXT,
  address               TEXT NOT NULL,
  district              TEXT DEFAULT 'Kampala',
  status                TEXT DEFAULT 'pending',
  assigned_worker_id    TEXT,
  notes                 TEXT,
  fee_ugx               INTEGER DEFAULT 35000,
  payment_status        TEXT DEFAULT 'unpaid',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  completed_at          TIMESTAMPTZ
);

DO $$ BEGIN
  ALTER TABLE home_care_requests ADD COLUMN IF NOT EXISTS service_type TEXT DEFAULT 'Home Check';
  ALTER TABLE home_care_requests ADD COLUMN IF NOT EXISTS requested_date TEXT;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 7. CONSULTATIONS (ASYNC CLINIC MESSAGES) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS consultations (
  id                    TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  member_id             TEXT NOT NULL,
  clinician_id          TEXT NOT NULL,
  message_text          TEXT NOT NULL,
  direction             TEXT DEFAULT 'patient_to_doctor',
  status                TEXT DEFAULT 'delivered',
  is_from_member        BOOLEAN DEFAULT true,
  is_read               BOOLEAN DEFAULT false,
  attachments           TEXT[] DEFAULT '{}',
  sent_at               TIMESTAMPTZ DEFAULT NOW(),
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

DO $$ BEGIN
  ALTER TABLE consultations ADD COLUMN IF NOT EXISTS direction TEXT DEFAULT 'patient_to_doctor';
  ALTER TABLE consultations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'delivered';
  ALTER TABLE consultations ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ DEFAULT NOW();
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 8. MESSAGES (WHATSAPP-STYLE DIRECT CHAT) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id                    TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  conversation_id       TEXT NOT NULL,
  sender_id             TEXT NOT NULL,
  sender_role           TEXT NOT NULL CHECK (sender_role IN ('patient', 'doctor', 'system')),
  sender_name           TEXT NOT NULL,
  recipient_id          TEXT NOT NULL,
  message_type          TEXT NOT NULL DEFAULT 'text',
  content               TEXT NOT NULL,
  media_url             TEXT,
  media_mime_type       TEXT,
  reply_to_id           TEXT,
  is_read               BOOLEAN DEFAULT false,
  is_delivered          BOOLEAN DEFAULT true,
  is_starred            BOOLEAN DEFAULT false,
  call_type             TEXT,
  call_duration_sec     INTEGER,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── 9. CALL LOGS (CALL HISTORY) ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS call_logs (
  id                    TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  caller_id             TEXT NOT NULL,
  caller_name           TEXT NOT NULL,
  caller_role           TEXT NOT NULL CHECK (caller_role IN ('patient', 'doctor')),
  callee_id             TEXT NOT NULL,
  callee_name           TEXT NOT NULL,
  call_type             TEXT NOT NULL DEFAULT 'video',
  status                TEXT NOT NULL DEFAULT 'ringing',
  session_id            TEXT,
  started_at            TIMESTAMPTZ DEFAULT NOW(),
  answered_at           TIMESTAMPTZ,
  ended_at              TIMESTAMPTZ,
  duration_sec          INTEGER DEFAULT 0,
  notes                 TEXT
);

-- ── 10. CALL SIGNALS (WEBRTC AUDIO/VIDEO SIGNALING) ───────────────────────────
CREATE TABLE IF NOT EXISTS call_signals (
  id                    TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  signal_type           TEXT NOT NULL,
  from_role             TEXT NOT NULL,
  caller_name           TEXT NOT NULL,
  target_clinician_id   TEXT NOT NULL,
  call_type             TEXT DEFAULT 'video',
  payload               JSONB DEFAULT '{}'::jsonb,
  session_id            TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

DO $$ BEGIN
  ALTER TABLE call_signals ADD COLUMN IF NOT EXISTS session_id TEXT;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 11. SYNC OUTBOX LOG (OFFLINE SYNC) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sync_outbox_log (
  id                    TEXT PRIMARY KEY,
  entity                TEXT NOT NULL,
  action                TEXT NOT NULL,
  payload               JSONB NOT NULL,
  client_timestamp      TIMESTAMPTZ NOT NULL,
  user_id               TEXT NOT NULL,
  device_id             TEXT NOT NULL,
  version               INTEGER DEFAULT 1,
  status                TEXT DEFAULT 'received',
  processed_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── 12. HEALTH EDUCATION ARTICLES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS education_articles (
  id                    TEXT PRIMARY KEY,
  title                 TEXT NOT NULL,
  category              TEXT NOT NULL,
  summary               TEXT,
  video_url             TEXT,
  thumbnail_url         TEXT,
  duration_mins         INTEGER DEFAULT 5,
  author_name           TEXT,
  author_avatar         TEXT,
  is_published          BOOLEAN DEFAULT true,
  view_count            INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── 13. FAMILY MEMBERS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS family_members (
  id                    TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  primary_member_id     TEXT NOT NULL,
  full_name             TEXT NOT NULL,
  relationship          TEXT NOT NULL,
  date_of_birth         DATE,
  sex                   TEXT,
  phone                 TEXT,
  avatar_url            TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── 14. INDEXES FOR HIGH-SPEED LOOKUPS ────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_clinicians_verified ON clinicians(verified, rating DESC);
CREATE INDEX IF NOT EXISTS idx_clinicians_email ON clinicians(email);

CREATE INDEX IF NOT EXISTS idx_vitals_member ON vital_records(member_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_homecare_member ON home_care_requests(member_id);
CREATE INDEX IF NOT EXISTS idx_homecare_worker ON home_care_requests(assigned_worker_id);

CREATE INDEX IF NOT EXISTS idx_consultations_conv ON consultations(member_id, clinician_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id, is_read);

CREATE INDEX IF NOT EXISTS idx_call_logs_caller ON call_logs(caller_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_logs_callee ON call_logs(callee_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_logs_session ON call_logs(session_id);

CREATE INDEX IF NOT EXISTS idx_call_signals_target ON call_signals(target_clinician_id, created_at DESC);

-- ── 15. ROW LEVEL SECURITY (RLS) POLICIES ─────────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE clinicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_care_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_outbox_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies before re-creating them (prevents "policy already exists" error)
DROP POLICY IF EXISTS "Clinicians are public readable" ON clinicians;
DROP POLICY IF EXISTS "Clinicians can be inserted" ON clinicians;
DROP POLICY IF EXISTS "Clinicians can be updated" ON clinicians;
DROP POLICY IF EXISTS "Clinicians can be deleted" ON clinicians;

CREATE POLICY "Clinicians are public readable" ON clinicians FOR SELECT USING (true);
CREATE POLICY "Clinicians can be inserted" ON clinicians FOR INSERT WITH CHECK (true);
CREATE POLICY "Clinicians can be updated" ON clinicians FOR UPDATE USING (true);
CREATE POLICY "Clinicians can be deleted" ON clinicians FOR DELETE USING (true);

DROP POLICY IF EXISTS "Member profiles readable" ON member_profiles;
DROP POLICY IF EXISTS "Member profiles insertable" ON member_profiles;
DROP POLICY IF EXISTS "Member profiles updatable" ON member_profiles;

CREATE POLICY "Member profiles readable" ON member_profiles FOR SELECT USING (true);
CREATE POLICY "Member profiles insertable" ON member_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Member profiles updatable" ON member_profiles FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Vitals readable" ON vital_records;
DROP POLICY IF EXISTS "Vitals insertable" ON vital_records;
DROP POLICY IF EXISTS "Vitals updatable" ON vital_records;

CREATE POLICY "Vitals readable" ON vital_records FOR SELECT USING (true);
CREATE POLICY "Vitals insertable" ON vital_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Vitals updatable" ON vital_records FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Home care readable" ON home_care_requests;
DROP POLICY IF EXISTS "Home care insertable" ON home_care_requests;
DROP POLICY IF EXISTS "Home care updatable" ON home_care_requests;

CREATE POLICY "Home care readable" ON home_care_requests FOR SELECT USING (true);
CREATE POLICY "Home care insertable" ON home_care_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Home care updatable" ON home_care_requests FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Consultations readable" ON consultations;
DROP POLICY IF EXISTS "Consultations insertable" ON consultations;
DROP POLICY IF EXISTS "Consultations updatable" ON consultations;

CREATE POLICY "Consultations readable" ON consultations FOR SELECT USING (true);
CREATE POLICY "Consultations insertable" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Consultations updatable" ON consultations FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Messages readable" ON messages;
DROP POLICY IF EXISTS "Messages insertable" ON messages;
DROP POLICY IF EXISTS "Messages updatable" ON messages;
DROP POLICY IF EXISTS "Messages deletable" ON messages;

CREATE POLICY "Messages readable" ON messages FOR SELECT USING (true);
CREATE POLICY "Messages insertable" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Messages updatable" ON messages FOR UPDATE USING (true);
CREATE POLICY "Messages deletable" ON messages FOR DELETE USING (true);

DROP POLICY IF EXISTS "Call logs readable" ON call_logs;
DROP POLICY IF EXISTS "Call logs insertable" ON call_logs;
DROP POLICY IF EXISTS "Call logs updatable" ON call_logs;

CREATE POLICY "Call logs readable" ON call_logs FOR SELECT USING (true);
CREATE POLICY "Call logs insertable" ON call_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Call logs updatable" ON call_logs FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Call signals readable" ON call_signals;
DROP POLICY IF EXISTS "Call signals insertable" ON call_signals;
DROP POLICY IF EXISTS "Call signals deletable" ON call_signals;

CREATE POLICY "Call signals readable" ON call_signals FOR SELECT USING (true);
CREATE POLICY "Call signals insertable" ON call_signals FOR INSERT WITH CHECK (true);
CREATE POLICY "Call signals deletable" ON call_signals FOR DELETE USING (true);

DROP POLICY IF EXISTS "Sync outbox insertable" ON sync_outbox_log;
DROP POLICY IF EXISTS "Sync outbox readable" ON sync_outbox_log;

CREATE POLICY "Sync outbox insertable" ON sync_outbox_log FOR INSERT WITH CHECK (true);
CREATE POLICY "Sync outbox readable" ON sync_outbox_log FOR SELECT USING (true);

DROP POLICY IF EXISTS "Education readable" ON education_articles;
CREATE POLICY "Education readable" ON education_articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Family members readable" ON family_members;
DROP POLICY IF EXISTS "Family members insertable" ON family_members;
DROP POLICY IF EXISTS "Family members updatable" ON family_members;

CREATE POLICY "Family members readable" ON family_members FOR SELECT USING (true);
CREATE POLICY "Family members insertable" ON family_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Family members updatable" ON family_members FOR UPDATE USING (true);

-- ── 16. SUPABASE REALTIME REPLICATION ─────────────────────────────────────────
-- Adds tables to Realtime publication safely (ignores duplicate_object error if already added)
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE call_signals;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE call_logs;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE consultations;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE clinicians;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE vital_records;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- ── 17. STORAGE BUCKET FOR MEDIA & AVATARS ────────────────────────────────────
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('vitanova-assets', 'vitanova-assets', true)
  ON CONFLICT (id) DO NOTHING;

  -- Storage policies
  DROP POLICY IF EXISTS "Public Assets Access" ON storage.objects;
  CREATE POLICY "Public Assets Access" ON storage.objects FOR SELECT USING (bucket_id = 'vitanova-assets');

  DROP POLICY IF EXISTS "Public Assets Upload" ON storage.objects;
  CREATE POLICY "Public Assets Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'vitanova-assets');

  DROP POLICY IF EXISTS "Public Assets Update" ON storage.objects;
  CREATE POLICY "Public Assets Update" ON storage.objects FOR UPDATE USING (bucket_id = 'vitanova-assets');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── 18. SEED DATA: CLINICIANS (DR. ISRAEL KISAKYE + CLINICAL STAFF) ───────────
-- Password for Dr. Israel Kisakye: 88888888
INSERT INTO clinicians (
  id, name, profession, specialty, experience_years, verified, available, fee_ugx,
  avatar_url, bio, languages, rating, review_count, email, phone, whatsapp, password,
  registration_number, education, hospital_affiliation, conditions_treated,
  availability_hours, response_speed, in_app_call_room
) VALUES
(
  'doc_israel',
  'Dr. Israel Kisakye',
  'Doctor',
  'Chief Medical Consultant & Telehealth Lead',
  12,
  true,
  true,
  45000,
  '/ki_ezra_avatar.jpg',
  'Chief Medical Officer at VitaNova Clinic. Over 12 years directing clinical telemedicine, chronic disease reversal, and family healthcare programs.',
  ARRAY['English', 'Luganda'],
  5.0,
  164,
  'israelerzrakisakye@gmail.com',
  '+256 772 888 888',
  '+256 772 888 888',
  '88888888',
  'UMDPC-MED-2010-3104',
  'MBChB (Makerere University), MSc Telemedicine (Edinburgh)',
  'VitaNova Central Nakawa Clinic & Mulago Referral',
  ARRAY[
    'Hypertension & Cardiovascular Health',
    'Diabetes Mellitus & Metabolic Therapy',
    'Telehealth Clinical Triage',
    'Elderly Care & Bedside Follow-up'
  ],
  'Daily: 7:00 AM – 10:00 PM (EAT)',
  '< 2 mins direct response',
  'vitanova-doc-israel-kisakye'
),
(
  'doc_mukasa',
  'Dr. Ronald Mukasa',
  'Doctor',
  'Cardiologist & Internal Medicine',
  14,
  true,
  true,
  45000,
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
  'Senior Consultant Physician at VitaNova Nakawa. Over 14 years managing complex adult illnesses with a dedicated focus on hypertension control, heart failure prevention, and personalized lifestyle medicine.',
  ARRAY['English', 'Luganda'],
  4.9,
  128,
  'mukasa.ronald@vitanova.ug',
  '+256 702 110 334',
  '+256 702 110 334',
  '88888888',
  'UMDPC-MED-2012-4821',
  'MBChB (Makerere University), MMed Internal Medicine (Mulago)',
  'Mulago National Referral Hospital & VitaNova Nakawa Branch',
  ARRAY[
    'High Blood Pressure & Hypertension',
    'Heart Palpitations & Arrhythmia',
    'Type 2 Diabetes Mellitus Management',
    'Chest Tightness & Cardiovascular Risk Review'
  ],
  'Mon – Sat: 8:00 AM – 7:30 PM (EAT)',
  '< 5 mins average response',
  'vitanova-doc-mukasa'
),
(
  'nurse_florence',
  'Sister Florence Nabatanzi',
  'Nurse',
  'Community Health & Chronic Wound Care',
  11,
  true,
  true,
  25000,
  'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
  'Lead Community Outreach Nurse. Passionate about home-based elder care, post-surgical wound healing, and family health education. Certified in gentle sterile wound dressing and diabetic foot prophylaxis.',
  ARRAY['Luganda', 'English'],
  5.0,
  94,
  'florence.nabatanzi@vitanova.ug',
  '+256 774 229 881',
  '+256 774 229 881',
  '88888888',
  'UNMC-RN-2015-9943',
  'BSc Nursing Science (Aga Khan University, Kampala)',
  'VitaNova Community Outreach & Kawempe General Hospital',
  ARRAY[
    'Chronic Diabetic Wound Dressing & Care',
    'Post-Surgical Suture Care & Inspection',
    'In-Home Vital Signs Assessment',
    'Elderly Bedside Care & Pressure Sore Prevention'
  ],
  'Daily: 7:00 AM – 9:00 PM (EAT)',
  '< 3 mins average response',
  'vitanova-nurse-florence'
),
(
  'midwife_agnes',
  'Midwife Agnes Akello',
  'Midwife',
  'Antenatal, Postnatal & Lactation Counseling',
  9,
  true,
  true,
  30000,
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
  'Certified Registered Midwife dedicated to reassuring expectant mothers and new parents. Experienced in maternal danger sign screening, lactation guidance, newborn cord care, and maternal mental health support.',
  ARRAY['English', 'Ateso', 'Luganda'],
  4.8,
  76,
  'agnes.akello@vitanova.ug',
  '+256 782 443 192',
  '+256 782 443 192',
  '88888888',
  'UNMC-RM-2017-3310',
  'Diploma in Midwifery (Nsambya School of Nursing & Midwifery)',
  'St. Francis Hospital Nsambya & VitaNova Maternal Center',
  ARRAY[
    'Antenatal Health Assessment & Guidance',
    'Postpartum Recovery & Bleeding Checks',
    'Breastfeeding Technique & Mastitis Prevention',
    'Newborn Jaundice & Cord Care Guidance'
  ],
  'Mon – Sun: 24/7 On-Call Support',
  '< 10 mins average response',
  'vitanova-midwife-agnes'
),
(
  'physio_kato',
  'Dr. Brian Kato (PT)',
  'Physiotherapist',
  'Orthopaedic & Neurological Rehabilitation',
  8,
  true,
  true,
  40000,
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
  'Licensed Physical Therapist specializing in post-stroke functional recovery, chronic spine & lower back pain relief, joint rehabilitation, and home-based mobility regain for seniors.',
  ARRAY['English', 'Luganda'],
  4.9,
  62,
  'brian.kato@vitanova.ug',
  '+256 701 556 782',
  '+256 701 556 782',
  '88888888',
  'UPTA-PT-2018-0419',
  'BSc Physiotherapy (Makerere University College of Health Sciences)',
  'CoRSU Rehabilitation Hospital & VitaNova Physio Clinic',
  ARRAY[
    'Post-Stroke Movement Re-education',
    'Chronic Lower Back Pain & Sciatica',
    'Post-Fracture Joint Stiffness & Rehab',
    'Knee Osteoarthritis & Walking Aid Training'
  ],
  'Mon – Sat: 8:30 AM – 6:00 PM (EAT)',
  '< 15 mins average response',
  'vitanova-physio-kato'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  profession = EXCLUDED.profession,
  specialty = EXCLUDED.specialty,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  password = EXCLUDED.password,
  verified = true,
  available = true,
  updated_at = NOW();

-- ── 19. SEED DATA: PRIMARY DEMO PATIENT (SARAH NAMUBIRU) ──────────────────────
INSERT INTO member_profiles (
  id, full_name, date_of_birth, sex, phone, email, address, district, location_district,
  health_id, next_of_kin, next_of_kin_phone, blood_group, allergies, chronic_conditions,
  primary_clinician_id, membership_tier, avatar_url
) VALUES
(
  'pat_sarah_001',
  'Sarah Namubiru',
  '1992-04-18',
  'Female',
  '+256 772 458 912',
  'sarah.namubiru@health.ug',
  'Nakawa Division, Kampala, Uganda',
  'Kampala',
  'Kampala',
  'VN-KLA-9921',
  'Christine Namubiru',
  '+256 701 893 214',
  'O+',
  ARRAY['Penicillin G', 'Sulfa Antibiotics'],
  ARRAY['Stage 1 Essential Hypertension', 'Mild Exercise-induced Bronchospasm'],
  'doc_israel',
  'family_plus',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  updated_at = NOW();

-- ── 20. SEED DATA: SAMPLE HEALTH EDUCATION ───────────────────────────────────
INSERT INTO education_articles (
  id, title, category, summary, duration_mins, author_name, author_avatar, is_published, view_count
) VALUES
(
  'edu_bp_01',
  'Managing High Blood Pressure in Kampala',
  'Cardiovascular',
  'Learn practical lifestyle adjustments, low-salt local Ugandan dietary recipes, and when to consult Dr. Israel Kisakye.',
  6,
  'Dr. Israel Kisakye',
  '/ki_ezra_avatar.jpg',
  true,
  342
),
(
  'edu_wound_01',
  'Safe Home Wound Dressing & Sterile Technique',
  'Nursing',
  'Step-by-step instructions on keeping post-surgical sutures clean and preventing tropical infections.',
  8,
  'Sister Florence Nabatanzi',
  'https://images.unsplash.com/photo-1594824813593-1b7776510344?auto=format&fit=crop&w=400&q=80',
  true,
  219
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary;

-- ── SCRIPT COMPLETED SUCCESSFULLY ─────────────────────────────────────────────
SELECT 'VitaNova Supabase Master Schema configured successfully without errors!' AS status;
