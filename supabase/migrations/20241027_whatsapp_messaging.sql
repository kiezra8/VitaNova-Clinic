-- =====================================================
-- VitaNova Clinic — WhatsApp-Style Messaging & Call Logs
-- Run this in your Supabase SQL Editor
-- Project: https://skthogttabcvfvhqujra.supabase.co
-- =====================================================

-- ── MESSAGES TABLE — WhatsApp-style chat messages ─────────────────────────────
-- Stores all direct messages between patients and clinicians.
-- Supports text, images, voice notes, documents, and system messages.
CREATE TABLE IF NOT EXISTS messages (
  id                TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  conversation_id   TEXT NOT NULL,               -- e.g. 'pat_sarah_001__doc_israel'
  sender_id         TEXT NOT NULL,               -- member_id or clinician_id
  sender_role       TEXT NOT NULL CHECK (sender_role IN ('patient', 'doctor', 'system')),
  sender_name       TEXT NOT NULL,
  recipient_id      TEXT NOT NULL,               -- the other party's ID
  message_type      TEXT NOT NULL DEFAULT 'text', -- 'text' | 'image' | 'voice' | 'document' | 'system' | 'call_event'
  content           TEXT NOT NULL,                -- message text or caption
  media_url         TEXT,                         -- URL for image/voice/document attachments
  media_mime_type   TEXT,                         -- e.g. 'image/jpeg', 'audio/ogg'
  reply_to_id       TEXT,                         -- ID of message being replied to
  is_read           BOOLEAN DEFAULT false,
  is_delivered      BOOLEAN DEFAULT false,
  is_starred        BOOLEAN DEFAULT false,
  call_type         TEXT,                         -- 'video' | 'audio' (for call_event messages)
  call_duration_sec INTEGER,                      -- duration in seconds (for call_event messages)
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- ── CALL LOGS TABLE — Track all call history ──────────────────────────────────
CREATE TABLE IF NOT EXISTS call_logs (
  id                TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  caller_id         TEXT NOT NULL,
  caller_name       TEXT NOT NULL,
  caller_role       TEXT NOT NULL CHECK (caller_role IN ('patient', 'doctor')),
  callee_id         TEXT NOT NULL,               -- clinician_id or member_id
  callee_name       TEXT NOT NULL,
  call_type         TEXT NOT NULL DEFAULT 'video', -- 'video' | 'audio'
  status            TEXT NOT NULL DEFAULT 'ringing', -- 'ringing' | 'answered' | 'missed' | 'declined' | 'ended'
  session_id        TEXT,
  started_at        TIMESTAMPTZ DEFAULT NOW(),
  answered_at       TIMESTAMPTZ,
  ended_at          TIMESTAMPTZ,
  duration_sec      INTEGER DEFAULT 0,
  notes             TEXT
);

CREATE INDEX IF NOT EXISTS idx_call_logs_caller ON call_logs(caller_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_logs_callee ON call_logs(callee_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_logs_session ON call_logs(session_id);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;

-- Messages: anyone can read/write (demo mode — tighten for production)
CREATE POLICY "Anyone can read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update messages" ON messages FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete messages" ON messages FOR DELETE USING (true);

-- Call logs: anyone can read/write (demo mode)
CREATE POLICY "Anyone can read call logs" ON call_logs FOR SELECT USING (true);
CREATE POLICY "Anyone can insert call logs" ON call_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update call logs" ON call_logs FOR UPDATE USING (true);

-- ── ENABLE REALTIME ───────────────────────────────────────────────────────────
-- This makes messages appear instantly on both sides (like WhatsApp)
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE call_logs;

-- ── CLINICIANS TABLE ADDITIONS ────────────────────────────────────────────────
-- Add missing columns to clinicians if not exist (safe ALTER)
DO $$ BEGIN
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS email TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS phone TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS whatsapp TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS registration_number TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS education TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS hospital_affiliation TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS conditions_treated TEXT[] DEFAULT '{}';
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS availability_hours TEXT;
  ALTER TABLE clinicians ADD COLUMN IF NOT EXISTS response_speed TEXT;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ── HELPER FUNCTION: Generate conversation ID ─────────────────────────────────
-- Deterministic: always sorts the two IDs alphabetically so both parties get same conversation
CREATE OR REPLACE FUNCTION get_conversation_id(id1 TEXT, id2 TEXT) RETURNS TEXT AS $$
BEGIN
  IF id1 < id2 THEN
    RETURN id1 || '__' || id2;
  ELSE
    RETURN id2 || '__' || id1;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
