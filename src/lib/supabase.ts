// VitaNova Clinic — Supabase Client
// Free tier: 500MB DB, 50k MAU, 1GB storage, 2GB bandwidth/month
// Dashboard: https://supabase.com/dashboard

import { createClient } from '@supabase/supabase-js';

// These come from your Supabase project Settings → API
// Supabase project credentials (configured with project hriftnnnhrocnhzduzrb)
const DEFAULT_SUPABASE_URL = 'https://hriftnnnhrocnhzduzrb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyaWZ0bm5uaHJvY25oemR1enJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NDc3NzUsImV4cCI6MjEwNDQyMzc3NX0.i_BB941oxs4HXb1wSaLwzVenrf8XTy25DIZ9Bwvb7cY';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || DEFAULT_SUPABASE_ANON_KEY;

// Create the Supabase client (works with live project + offline-first sync fallback)
export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'YOUR_PROJECT_URL'
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'vitanova_auth'
      },
      realtime: {
        params: {
          eventsPerSecond: 5 // Conservative for Uganda's network
        }
      },
      global: {
        headers: {
          'X-VitaNova-Client': 'pwa-v1.0'
        }
      }
    })
  : null;

export const isSupabaseReady = (): boolean => supabase !== null;

// ── CLINICIANS API ────────────────────────────────────────────────────────────
export const fetchClinicians = async () => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('clinicians')
    .select('*')
    .eq('verified', true)
    .order('rating', { ascending: false });

  if (error) {
    console.error('[VitaNova Supabase] fetchClinicians error:', error.message);
    return null;
  }

  // Map snake_case DB columns → camelCase TypeScript
  return data.map(c => ({
    id: c.id,
    name: c.name,
    profession: c.profession,
    specialty: c.specialty,
    experienceYears: c.experience_years,
    verified: c.verified,
    available: c.available,
    feeUGX: c.fee_ugx,
    avatar: c.avatar_url,
    bio: c.bio,
    languages: c.languages,
    rating: parseFloat(c.rating),
    reviewCount: c.review_count
  }));
};

// ── VITAL RECORDS API ─────────────────────────────────────────────────────────
export const pushVitalRecord = async (memberId: string, vital: Record<string, any>) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('vital_records')
    .insert({
      id: vital.id,
      member_id: memberId,
      recorded_at: vital.recordedAt || new Date().toISOString(),
      recorded_by: vital.recordedBy || 'self',
      source: vital.source || 'manual',
      systolic_bp: vital.systolicBP,
      diastolic_bp: vital.diastolicBP,
      heart_rate: vital.heartRate,
      spo2: vital.spO2,
      temperature: vital.temperature,
      blood_glucose: vital.bloodGlucose,
      weight_kg: vital.weightKg,
      height_cm: vital.heightCm,
      notes: vital.notes,
      device_id: vital.deviceId,
      sync_status: 'synced'
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova Supabase] pushVitalRecord error:', error.message);
    return null;
  }
  return data;
};

export const fetchVitalRecords = async (memberId: string, limit = 30) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('vital_records')
    .select('*')
    .eq('member_id', memberId)
    .order('recorded_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[VitaNova Supabase] fetchVitalRecords error:', error.message);
    return null;
  }
  return data;
};

// ── HOME CARE REQUESTS API ────────────────────────────────────────────────────
export const pushHomeCareRequest = async (memberId: string, request: Record<string, any>) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('home_care_requests')
    .insert({
      id: request.id,
      member_id: memberId,
      request_type: request.requestType,
      urgency: request.urgency,
      scheduled_date: request.scheduledDate,
      scheduled_time: request.scheduledTime,
      address: request.address,
      district: request.district || 'Kampala',
      notes: request.notes,
      fee_ugx: request.feeUGX || 35000,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova Supabase] pushHomeCareRequest error:', error.message);
    return null;
  }
  return data;
};

// ── CONSULTATION MESSAGES API ─────────────────────────────────────────────────
export const sendConsultationMessage = async (
  memberId: string,
  clinicianId: string,
  messageText: string
) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('consultations')
    .insert({
      member_id: memberId,
      clinician_id: clinicianId,
      message_text: messageText,
      is_from_member: true
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova Supabase] sendConsultationMessage error:', error.message);
    return null;
  }
  return data;
};

export const fetchMessages = async (memberId: string, clinicianId: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .eq('member_id', memberId)
    .eq('clinician_id', clinicianId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[VitaNova Supabase] fetchMessages error:', error.message);
    return null;
  }
  return data;
};

// ── REALTIME: Subscribe to new messages from a clinician ─────────────────────
export const subscribeToMessages = (
  memberId: string,
  clinicianId: string,
  onMessage: (msg: any) => void
) => {
  if (!supabase) return null;

  const channel = supabase
    .channel(`messages-${memberId}-${clinicianId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'consultations',
        filter: `member_id=eq.${memberId}`
      },
      (payload) => onMessage(payload.new)
    )
    .subscribe();

  return () => { supabase.removeChannel(channel); };
};

// ── BATCH SYNC OUTBOX → Supabase ──────────────────────────────────────────────
export const pushSyncBatch = async (items: any[]) => {
  if (!supabase || items.length === 0) return { processed: [] };

  const rows = items.map(item => ({
    id: item.id,
    entity: item.entity,
    action: item.action,
    payload: item.payload,
    client_timestamp: item.clientTimestamp,
    user_id: item.userId,
    device_id: item.deviceId,
    version: item.version,
    status: 'received'
  }));

  const { data, error } = await supabase
    .from('sync_outbox_log')
    .upsert(rows, { onConflict: 'id' })
    .select('id');

  if (error) {
    console.error('[VitaNova Supabase] pushSyncBatch error:', error.message);
    return { processed: [] };
  }

  // Also push individual records based on entity type
  for (const item of items) {
    try {
      if (item.entity === 'vitals' && item.action === 'create') {
        await pushVitalRecord(item.userId, item.payload);
      } else if (item.entity === 'homeVisit' && item.action === 'create') {
        await pushHomeCareRequest(item.userId, item.payload);
      } else if (item.entity === 'consultation' && item.action === 'create') {
        await sendConsultationMessage(item.userId, item.payload.clinicianId, item.payload.messageText);
      }
    } catch (err) {
      console.warn('[VitaNova Supabase] Entity push error for', item.entity, err);
    }
  }

  return {
    processed: (data || []).map(row => ({ outboxId: row.id, status: 'synced' }))
  };
};

// ── HEALTH EDUCATION ARTICLES ─────────────────────────────────────────────────
export const fetchEducationArticles = async () => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('education_articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[VitaNova Supabase] fetchEducationArticles error:', error.message);
    return null;
  }
  return data;
};
