-- =====================================================
-- VitaNova Clinic — Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor (free tier)
-- Project URL: https://supabase.com/dashboard
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── CLINICIANS / HEALTHCARE WORKERS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinicians (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  profession       TEXT NOT NULL,           -- 'Doctor' | 'Nurse' | 'Midwife' | 'Physiotherapist'
  specialty        TEXT NOT NULL,
  experience_years INTEGER DEFAULT 0,
  verified         BOOLEAN DEFAULT false,
  available        BOOLEAN DEFAULT true,
  fee_ugx          INTEGER DEFAULT 45000,
  avatar_url       TEXT,
  bio              TEXT,
  languages        TEXT[] DEFAULT ARRAY['English'],
  rating           NUMERIC(3,1) DEFAULT 5.0,
  review_count     INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── MEMBER PROFILES (replaces "patients") ────────────────────────────────────
CREATE TABLE IF NOT EXISTS member_profiles (
  id              TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name       TEXT NOT NULL,
  date_of_birth   DATE,
  sex             TEXT CHECK (sex IN ('Female', 'Male', 'Other')),
  phone           TEXT,
  email           TEXT UNIQUE,
  address         TEXT,
  district        TEXT DEFAULT 'Kampala',
  next_of_kin     TEXT,
  next_of_kin_phone TEXT,
  blood_group     TEXT,
  allergies       TEXT[] DEFAULT '{}',
  chronic_conditions TEXT[] DEFAULT '{}',
  primary_clinician_id TEXT REFERENCES clinicians(id),
  membership_tier TEXT DEFAULT 'basic',
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── VITAL RECORDS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vital_records (
  id              TEXT PRIMARY KEY,
  member_id       TEXT NOT NULL REFERENCES member_profiles(id) ON DELETE CASCADE,
  recorded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  recorded_by     TEXT,                    -- 'self' | clinician id
  source          TEXT DEFAULT 'manual',   -- 'manual' | 'carewatch_ble' | 'clinician'
  systolic_bp     INTEGER,
  diastolic_bp    INTEGER,
  heart_rate      INTEGER,
  spo2            NUMERIC(5,2),
  temperature     NUMERIC(4,1),
  blood_glucose   NUMERIC(5,2),
  weight_kg       NUMERIC(5,1),
  height_cm       INTEGER,
  notes           TEXT,
  sync_status     TEXT DEFAULT 'pending',
  device_id       TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── HOME CARE REQUESTS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS home_care_requests (
  id                    TEXT PRIMARY KEY,
  member_id             TEXT NOT NULL REFERENCES member_profiles(id) ON DELETE CASCADE,
  request_type          TEXT NOT NULL,      -- 'Wound Care' | 'Injection' | 'Post-Op' | 'Elderly Check'
  urgency               TEXT DEFAULT 'routine',
  scheduled_date        TEXT,
  scheduled_time        TEXT,
  address               TEXT NOT NULL,
  district              TEXT DEFAULT 'Kampala',
  status                TEXT DEFAULT 'pending',
  assigned_worker_id    TEXT REFERENCES clinicians(id),
  notes                 TEXT,
  fee_ugx               INTEGER DEFAULT 35000,
  payment_status        TEXT DEFAULT 'unpaid',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  completed_at          TIMESTAMPTZ
);

-- ── CONSULTATIONS / MESSAGES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS consultations (
  id              TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id       TEXT NOT NULL REFERENCES member_profiles(id) ON DELETE CASCADE,
  clinician_id    TEXT NOT NULL REFERENCES clinicians(id),
  message_text    TEXT NOT NULL,
  is_from_member  BOOLEAN DEFAULT true,
  is_read         BOOLEAN DEFAULT false,
  attachments     TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SYNC OUTBOX (mirrors client-side IndexedDB outbox) ───────────────────────
CREATE TABLE IF NOT EXISTS sync_outbox_log (
  id                TEXT PRIMARY KEY,
  entity            TEXT NOT NULL,
  action            TEXT NOT NULL,
  payload           JSONB NOT NULL,
  client_timestamp  TIMESTAMPTZ NOT NULL,
  user_id           TEXT NOT NULL,
  device_id         TEXT NOT NULL,
  version           INTEGER DEFAULT 1,
  status            TEXT DEFAULT 'received',
  processed_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── HEALTH EDUCATION CONTENT ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS education_articles (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  category        TEXT NOT NULL,
  summary         TEXT,
  video_url       TEXT,
  thumbnail_url   TEXT,
  duration_mins   INTEGER,
  author_name     TEXT,
  author_avatar   TEXT,
  is_published    BOOLEAN DEFAULT true,
  view_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── FAMILY MEMBERS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS family_members (
  id              TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_member_id TEXT NOT NULL REFERENCES member_profiles(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  relationship    TEXT NOT NULL,
  date_of_birth   DATE,
  sex             TEXT,
  phone           TEXT,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES for performance ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_vitals_member_id ON vital_records(member_id);
CREATE INDEX IF NOT EXISTS idx_vitals_recorded_at ON vital_records(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_member ON consultations(member_id, clinician_id);
CREATE INDEX IF NOT EXISTS idx_homecare_member ON home_care_requests(member_id);
CREATE INDEX IF NOT EXISTS idx_homecare_worker ON home_care_requests(assigned_worker_id);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations(created_at DESC);

-- ── ROW LEVEL SECURITY (RLS) — Healthcare Data Protection ─────────────────────
-- Members can only see their own data
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_care_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Clinicians are publicly readable (directory listing)
ALTER TABLE clinicians ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clinicians are publicly readable" ON clinicians FOR SELECT USING (true);

-- Education content is public
ALTER TABLE education_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Education is public" ON education_articles FOR SELECT USING (is_published = true);

-- For demo: allow all authenticated users to read/write their own records
-- In production, tighten these using auth.uid() = member_id
CREATE POLICY "Members read own profile" ON member_profiles FOR SELECT USING (true);
CREATE POLICY "Members update own profile" ON member_profiles FOR UPDATE USING (true);
CREATE POLICY "Members read own vitals" ON vital_records FOR SELECT USING (true);
CREATE POLICY "Members insert own vitals" ON vital_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Members read own visits" ON home_care_requests FOR SELECT USING (true);
CREATE POLICY "Members insert own visits" ON home_care_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Members read own messages" ON consultations FOR SELECT USING (true);
CREATE POLICY "Members insert own messages" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Members read own family" ON family_members FOR SELECT USING (true);
CREATE POLICY "Members insert own family" ON family_members FOR INSERT WITH CHECK (true);

-- Allow sync log writes from any authenticated device
ALTER TABLE sync_outbox_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow sync writes" ON sync_outbox_log FOR INSERT WITH CHECK (true);
