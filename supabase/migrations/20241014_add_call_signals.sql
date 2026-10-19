-- =====================================================================
-- VitaNova Clinic — Migration: Add call_signals table
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- =====================================================================

-- 1. Create the call_signals table
CREATE TABLE IF NOT EXISTS call_signals (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  signal_type         TEXT NOT NULL,          -- 'INCOMING_CALL' | 'OFFER' | 'ANSWER' | 'ICE' | 'DECLINE' | 'HANGUP'
  from_role           TEXT NOT NULL,          -- 'patient' | 'doctor'
  caller_name         TEXT NOT NULL,
  target_clinician_id TEXT NOT NULL,          -- Which doctor this is meant for
  call_type           TEXT DEFAULT 'video',   -- 'video' | 'audio'
  payload             JSONB DEFAULT '{}',     -- WebRTC SDP/ICE payload
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index for fast lookup by clinician
CREATE INDEX IF NOT EXISTS idx_call_signals_target
  ON call_signals(target_clinician_id, created_at DESC);

-- 3. Row Level Security — open for now (tighten with auth.uid() in production)
ALTER TABLE call_signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert call signals"
  ON call_signals FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read call signals"
  ON call_signals FOR SELECT USING (true);

CREATE POLICY "Anyone can delete call signals"
  ON call_signals FOR DELETE USING (true);

-- 4. Enable Realtime for instant push to subscribed doctors
-- NOTE: If this errors with "already exists", it's already enabled — that's fine.
ALTER PUBLICATION supabase_realtime ADD TABLE call_signals;
