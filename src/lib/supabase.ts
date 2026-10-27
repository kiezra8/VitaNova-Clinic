// VitaNova Clinic — Supabase Client
// Project: skthogttabcvfvhqujra (https://skthogttabcvfvhqujra.supabase.co)
// Free tier: 500MB DB, 50k MAU, 1GB storage, 2GB bandwidth/month — no subscription needed

import { createClient } from '@supabase/supabase-js';

// ── Supabase Project Credentials ──────────────────────────────────────────────
const SUPABASE_URL = 'https://skthogttabcvfvhqujra.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdGhvZ3R0YWJjdmZ2aHF1anJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NjM1MzIsImV4cCI6MjEwNzUzOTUzMn0.EP3YFzoBVY7bumfTJpDgzwu7RwdWuqJU-0ekDop21pM';

// ── Supabase Client Instance ───────────────────────────────────────────────────
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'vitanova_auth'
  },
  realtime: {
    params: {
      eventsPerSecond: 5 // Conservative for Uganda's mobile networks
    }
  },
  global: {
    headers: {
      'X-VitaNova-Client': 'pwa-v1.0'
    }
  }
});

export const isSupabaseReady = (): boolean => true; // Always ready with real project

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — Doctor / Nurse Login via Supabase Auth (Email + Password)
// The admin registers a clinician's email in the `clinicians` table (verified=true).
// The clinician then signs up with that email via Supabase Auth.
// On login, we check if their email matches a verified clinician row.
// ─────────────────────────────────────────────────────────────────────────────

/** Sign up a new doctor account via Supabase Auth */
export const signUpDoctor = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { user: null, error: error.message };
  return { user: data.user, error: null };
};

/** Sign in a doctor/nurse/admin via Supabase Auth */
export const signInDoctor = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { user: null, session: null, error: error.message };
  return { user: data.user, session: data.session, error: null };
};

/** Sign out current doctor session */
export const signOutDoctor = async () => {
  await supabase.auth.signOut();
};

/** Get the current authenticated user session */
export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

/** Subscribe to auth state changes */
export const onAuthChange = (callback: (user: any) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
  return () => subscription.unsubscribe();
};

// ─────────────────────────────────────────────────────────────────────────────
// CLINICIANS API — Admin manages the clinician registry
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all verified clinicians (public-facing, for patients) */
export const fetchClinicians = async () => {
  const { data, error } = await supabase
    .from('clinicians')
    .select('*')
    .eq('verified', true)
    .order('rating', { ascending: false });

  if (error) {
    console.error('[VitaNova] fetchClinicians error:', error.message);
    return null;
  }

  return data.map((c) => ({
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
    languages: c.languages || [],
    rating: parseFloat(c.rating || '5.0'),
    reviewCount: c.review_count || 0,
    email: c.email,
    phone: c.phone,
    whatsapp: c.whatsapp,
    registrationNumber: c.registration_number,
    education: c.education,
    hospitalAffiliation: c.hospital_affiliation,
    inAppCallRoom: `vitanova-${c.id.replace(/_/g, '-')}`
  }));
};

/** Fetch a single clinician by their registered email (used after auth login) */
export const fetchClinicianByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('clinicians')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .eq('verified', true)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    profession: data.profession,
    specialty: data.specialty,
    experienceYears: data.experience_years,
    verified: data.verified,
    available: data.available,
    feeUGX: data.fee_ugx,
    avatar: data.avatar_url,
    bio: data.bio,
    languages: data.languages || [],
    rating: parseFloat(data.rating || '5.0'),
    reviewCount: data.review_count || 0,
    email: data.email,
    phone: data.phone,
    whatsapp: data.whatsapp,
    registrationNumber: data.registration_number,
    education: data.education,
    hospitalAffiliation: data.hospital_affiliation,
    inAppCallRoom: `vitanova-${data.id.replace(/_/g, '-')}`
  };
};

/**
 * Create or update a clinician record in Supabase (admin only).
 * Includes photo upload to Supabase Storage if a File is provided.
 */
export const upsertClinician = async (
  clinicianData: {
    id?: string;
    name: string;
    profession: string;
    specialty: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    experienceYears: number;
    feeUGX: number;
    bio: string;
    languages: string[];
    registrationNumber?: string;
    education?: string;
    hospitalAffiliation?: string;
    verified?: boolean;
    available?: boolean;
  },
  photoFile?: File | null
) => {
  let avatarUrl = '';

  // 1. Upload photo to Supabase Storage if a file was provided
  if (photoFile) {
    const ext = photoFile.name.split('.').pop() || 'jpg';
    const filePath = `clinicians/${clinicianData.id || 'new_' + Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('vitanova-assets')
      .upload(filePath, photoFile, { upsert: true, contentType: photoFile.type });

    if (uploadError) {
      console.error('[VitaNova] Photo upload error:', uploadError.message);
    } else {
      const { data: urlData } = supabase.storage
        .from('vitanova-assets')
        .getPublicUrl(filePath);
      avatarUrl = urlData.publicUrl;
    }
  }

  // 2. Build the DB row
  const row: Record<string, any> = {
    name: clinicianData.name.trim(),
    profession: clinicianData.profession,
    specialty: clinicianData.specialty.trim(),
    email: clinicianData.email.toLowerCase().trim(),
    phone: clinicianData.phone || '',
    whatsapp: clinicianData.whatsapp || clinicianData.phone || '',
    experience_years: clinicianData.experienceYears,
    fee_ugx: clinicianData.feeUGX,
    bio: clinicianData.bio.trim(),
    languages: clinicianData.languages,
    registration_number: clinicianData.registrationNumber || '',
    education: clinicianData.education || '',
    hospital_affiliation: clinicianData.hospitalAffiliation || '',
    verified: clinicianData.verified !== false, // Default: true
    available: clinicianData.available !== false,
    rating: 5.0,
    review_count: 1
  };

  if (avatarUrl) {
    row.avatar_url = avatarUrl;
  }

  if (clinicianData.id) {
    row.id = clinicianData.id;
  }

  const { data, error } = await supabase
    .from('clinicians')
    .upsert(row, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] upsertClinician error:', error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

/** Delete a clinician from the registry */
export const deleteClinician = async (clinicianId: string) => {
  const { error } = await supabase
    .from('clinicians')
    .delete()
    .eq('id', clinicianId);

  if (error) return { error: error.message };
  return { error: null };
};

// ─────────────────────────────────────────────────────────────────────────────
// VITAL RECORDS
// ─────────────────────────────────────────────────────────────────────────────

export const pushVitalRecord = async (memberId: string, vital: Record<string, any>) => {
  const { data, error } = await supabase
    .from('vital_records')
    .upsert({
      id: vital.id,
      member_id: memberId,
      recorded_at: vital.recordedAt || vital.timestamp || new Date().toISOString(),
      systolic_bp: vital.systolicBP,
      diastolic_bp: vital.diastolicBP,
      heart_rate: vital.heartRate,
      temperature: vital.temperature,
      spo2: vital.spO2,
      weight_kg: vital.weightKg,
      glucose_mg_dl: vital.glucoseMgDl,
      notes: vital.notes,
      recorded_by: vital.recordedBy,
      recorded_by_role: vital.recordedByRole
    }, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] pushVitalRecord error:', error.message);
    return null;
  }
  return data;
};

export const fetchVitalRecords = async (memberId: string) => {
  const { data, error } = await supabase
    .from('vital_records')
    .select('*')
    .eq('member_id', memberId)
    .order('recorded_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('[VitaNova] fetchVitalRecords error:', error.message);
    return null;
  }
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// MEDICAL RECORDS / CONSULTATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const sendConsultationMessage = async (
  memberId: string,
  clinicianId: string,
  messageText: string
) => {
  const { data, error } = await supabase
    .from('consultations')
    .insert({
      member_id: memberId,
      clinician_id: clinicianId,
      message_text: messageText,
      sent_at: new Date().toISOString(),
      direction: 'patient_to_doctor',
      status: 'delivered'
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] sendConsultationMessage error:', error.message);
    return null;
  }
  return data;
};

export const fetchConsultationHistory = async (memberId: string, clinicianId: string) => {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .eq('member_id', memberId)
    .eq('clinician_id', clinicianId)
    .order('sent_at', { ascending: true });

  if (error) {
    console.error('[VitaNova] fetchConsultationHistory error:', error.message);
    return null;
  }
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME CARE REQUESTS
// ─────────────────────────────────────────────────────────────────────────────

export const pushHomeCareRequest = async (memberId: string, request: Record<string, any>) => {
  const { data, error } = await supabase
    .from('home_care_requests')
    .upsert({
      id: request.id,
      member_id: memberId,
      service_type: request.serviceType,
      requested_date: request.requestedDate,
      address: request.address,
      notes: request.notes,
      status: request.status || 'pending',
      assigned_worker_id: request.assignedWorkerId
    }, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] pushHomeCareRequest error:', error.message);
    return null;
  }
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// MEMBER PROFILES
// ─────────────────────────────────────────────────────────────────────────────

export const upsertMemberProfile = async (profile: Record<string, any>) => {
  const { data, error } = await supabase
    .from('member_profiles')
    .upsert({
      id: profile.id,
      full_name: profile.fullName,
      date_of_birth: profile.dateOfBirth,
      sex: profile.sex,
      phone: profile.phone,
      email: profile.email,
      location_district: profile.locationDistrict,
      membership_tier: profile.membershipTier || 'basic',
      avatar_url: profile.avatar,
      health_id: profile.healthId
    }, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] upsertMemberProfile error:', error.message);
    return null;
  }
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// REALTIME — Subscribe to new messages
// ─────────────────────────────────────────────────────────────────────────────

export const subscribeToMessages = (
  memberId: string,
  clinicianId: string,
  onMessage: (msg: any) => void
) => {
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

// ─────────────────────────────────────────────────────────────────────────────
// BATCH SYNC OUTBOX → Supabase
// ─────────────────────────────────────────────────────────────────────────────

export const pushSyncBatch = async (items: any[]) => {
  if (items.length === 0) return { processed: [] };

  const rows = items.map((item) => ({
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
    console.error('[VitaNova] pushSyncBatch error:', error.message);
    return { processed: [] };
  }

  // Also write to entity-specific tables
  for (const item of items) {
    try {
      if (item.entity === 'vitals' && item.action === 'create') {
        await pushVitalRecord(item.userId, item.payload);
      } else if (item.entity === 'homeVisit' && item.action === 'create') {
        await pushHomeCareRequest(item.userId, item.payload);
      } else if (item.entity === 'consultation' && item.action === 'create') {
        await sendConsultationMessage(
          item.userId,
          item.payload.clinicianId,
          item.payload.messageText
        );
      }
    } catch (err) {
      console.warn('[VitaNova] Entity push error for', item.entity, err);
    }
  }

  return {
    processed: (data || []).map((row) => ({ outboxId: row.id, status: 'synced' }))
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH EDUCATION ARTICLES
// ─────────────────────────────────────────────────────────────────────────────

export const fetchEducationArticles = async () => {
  const { data, error } = await supabase
    .from('education_articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[VitaNova] fetchEducationArticles error:', error.message);
    return null;
  }
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// CALL SIGNALS — Cross-Device Telehealth Call Routing via Supabase Realtime
// Uses Supabase Realtime (free tier, no subscription cost).
// BroadcastChannel removed — only real Supabase signaling used.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a call signal to a specific doctor.
 * Inserts a row into call_signals; the doctor's subscribed Realtime listener fires.
 */
export interface CallSignalPayload {
  sessionId?: string;
  senderId?: string;
  fromRole?: 'patient' | 'doctor';
  sdp?: any;
  candidate?: any;
  message?: any;
  camOff?: boolean;
  [key: string]: unknown;
}

export interface CallSignalEvent {
  signalType: string;
  fromRole: 'patient' | 'doctor' | string;
  callerName: string;
  callType: 'video' | 'audio';
  sessionId?: string;
  senderId?: string;
  payload: CallSignalPayload;
}

/**
 * Send a call signal to a specific doctor or patient.
 * Inserts a row into call_signals; subscribers receive Realtime push.
 */
export const sendCallSignal = async (opts: {
  signalType: 'INCOMING_CALL' | 'OFFER' | 'ANSWER' | 'ICE' | 'DECLINE' | 'HANGUP' | 'READY_FOR_OFFER' | 'CAMERA_STATUS' | 'CALL_CHAT' | string;
  fromRole: 'patient' | 'doctor';
  callerName: string;
  targetClinicianId: string;
  callType?: 'video' | 'audio';
  sessionId?: string;
  senderId?: string;
  payload?: CallSignalPayload;
}) => {
  const mergedPayload: CallSignalPayload = {
    ...(opts.payload || {}),
    sessionId: opts.sessionId,
    senderId: opts.senderId,
    fromRole: opts.fromRole
  };

  const { data, error } = await supabase
    .from('call_signals')
    .insert({
      signal_type: opts.signalType,
      from_role: opts.fromRole,
      caller_name: opts.callerName,
      target_clinician_id: opts.targetClinicianId,
      call_type: opts.callType || 'video',
      session_id: opts.sessionId,
      payload: mergedPayload
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] sendCallSignal error:', error.message);
    return null;
  }
  return data;
};

/**
 * Fetch recent call signals (e.g. pending OFFER, ANSWER, or ICE candidates sent in the last 2 minutes).
 * Used when a doctor or patient opens the call modal to catch any signals sent prior to joining.
 */
export const fetchRecentCallSignals = async (
  clinicianId: string,
  signalTypes: string[],
  sessionId?: string,
  maxAgeSeconds = 120
): Promise<CallSignalEvent[]> => {
  try {
    const cutoff = new Date(Date.now() - maxAgeSeconds * 1000).toISOString();
    let query = supabase
      .from('call_signals')
      .select('*')
      .eq('target_clinician_id', clinicianId)
      .in('signal_type', signalTypes)
      .gt('created_at', cutoff)
      .order('created_at', { ascending: true })
      .limit(50);

    const { data, error } = await query;
    if (error || !data) return [];

    const results: CallSignalEvent[] = [];
    for (const row of data) {
      const p = (row.payload as CallSignalPayload) || {};
      const rowSessionId = row.session_id || p.sessionId;
      if (sessionId && rowSessionId && rowSessionId !== sessionId) {
        continue;
      }
      results.push({
        signalType: row.signal_type,
        fromRole: row.from_role || p.fromRole || 'patient',
        callerName: row.caller_name,
        callType: (row.call_type as 'video' | 'audio') || 'video',
        sessionId: rowSessionId,
        senderId: p.senderId,
        payload: p
      });
    }
    return results;
  } catch (err) {
    console.warn('[VitaNova] fetchRecentCallSignals error:', err);
    return [];
  }
};

/**
 * Subscribe to incoming call signals for a specific doctor ID.
 * Fires callback in real-time when a patient or doctor signals — works across ANY device.
 */
export const subscribeToCallSignals = (
  clinicianId: string,
  onSignal: (signal: CallSignalEvent) => void
): (() => void) => {
  const channel = supabase
    .channel(`call_signals_${clinicianId}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'call_signals',
        filter: `target_clinician_id=eq.${clinicianId}`
      },
      (payload) => {
        const row = payload.new as Record<string, any>;
        const p = (row.payload as CallSignalPayload) || {};
        onSignal({
          signalType: row.signal_type,
          fromRole: row.from_role || p.fromRole || 'patient',
          callerName: row.caller_name,
          callType: (row.call_type as 'video' | 'audio') || 'video',
          sessionId: p.sessionId,
          senderId: p.senderId,
          payload: p
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/** Clean up stale call signals older than 10 minutes */
export const cleanupStaleCallSignals = async () => {
  const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  await supabase.from('call_signals').delete().lt('created_at', cutoff);
};

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP-STYLE MESSAGING — Persistent chat between patients & doctors
// ─────────────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'patient' | 'doctor' | 'system';
  senderName: string;
  recipientId: string;
  messageType: 'text' | 'image' | 'voice' | 'document' | 'system' | 'call_event';
  content: string;
  mediaUrl?: string;
  mediaMimeType?: string;
  replyToId?: string;
  isRead: boolean;
  isDelivered: boolean;
  isStarred: boolean;
  callType?: 'video' | 'audio';
  callDurationSec?: number;
  createdAt: string;
}

/** Generate a deterministic conversation ID for two parties */
export const getConversationId = (id1: string, id2: string): string => {
  return id1 < id2 ? `${id1}__${id2}` : `${id2}__${id1}`;
};

/** Send a WhatsApp-style message */
export const sendMessage = async (opts: {
  senderId: string;
  senderRole: 'patient' | 'doctor';
  senderName: string;
  recipientId: string;
  content: string;
  messageType?: 'text' | 'image' | 'voice' | 'document' | 'system' | 'call_event';
  mediaUrl?: string;
  mediaMimeType?: string;
  replyToId?: string;
  callType?: 'video' | 'audio';
  callDurationSec?: number;
}): Promise<ChatMessage | null> => {
  const conversationId = getConversationId(opts.senderId, opts.recipientId);
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: opts.senderId,
      sender_role: opts.senderRole,
      sender_name: opts.senderName,
      recipient_id: opts.recipientId,
      message_type: opts.messageType || 'text',
      content: opts.content,
      media_url: opts.mediaUrl || null,
      media_mime_type: opts.mediaMimeType || null,
      reply_to_id: opts.replyToId || null,
      is_delivered: true,
      call_type: opts.callType || null,
      call_duration_sec: opts.callDurationSec || null
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] sendMessage error:', error.message);
    return null;
  }
  return mapDbRowToChatMessage(data);
};

/** Fetch all messages for a conversation */
export const fetchMessages = async (
  conversationId: string,
  limit = 100
): Promise<ChatMessage[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('[VitaNova] fetchMessages error:', error.message);
    return [];
  }
  return (data || []).map(mapDbRowToChatMessage);
};

/** Fetch all conversations for a user (latest message per conversation) */
export const fetchConversations = async (
  userId: string
): Promise<Array<{ conversationId: string; otherPartyId: string; lastMessage: ChatMessage; unreadCount: number }>> => {
  // Fetch all messages where user is sender or recipient, ordered by time
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false })
    .limit(500);

  if (error || !data) return [];

  // Group by conversation and take latest message
  const convMap = new Map<string, { msg: any; unread: number }>();
  for (const row of data) {
    const convId = row.conversation_id;
    if (!convMap.has(convId)) {
      convMap.set(convId, { msg: row, unread: 0 });
    }
    if (row.recipient_id === userId && !row.is_read) {
      const entry = convMap.get(convId)!;
      entry.unread++;
    }
  }

  return Array.from(convMap.entries()).map(([convId, { msg, unread }]) => ({
    conversationId: convId,
    otherPartyId: msg.sender_id === userId ? msg.recipient_id : msg.sender_id,
    lastMessage: mapDbRowToChatMessage(msg),
    unreadCount: unread
  }));
};

/** Mark all messages in a conversation as read */
export const markMessagesAsRead = async (conversationId: string, recipientId: string) => {
  await supabase
    .from('messages')
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .eq('recipient_id', recipientId)
    .eq('is_read', false);
};

/** Subscribe to new messages in a conversation (Supabase Realtime) */
export const subscribeToMessages_v2 = (
  conversationId: string,
  onNewMessage: (msg: ChatMessage) => void
): (() => void) => {
  const channel = supabase
    .channel(`chat_${conversationId}_${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        onNewMessage(mapDbRowToChatMessage(payload.new as any));
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/** Send typing indicator via Supabase Realtime Broadcast (ephemeral, not stored) */
export const sendTypingIndicator = (conversationId: string, userId: string, userName: string, isTyping: boolean) => {
  const channel = supabase.channel(`typing_${conversationId}`);
  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { userId, userName, isTyping }
      });
      // Cleanup after sending
      setTimeout(() => supabase.removeChannel(channel), 500);
    }
  });
};

/** Subscribe to typing indicators */
export const subscribeToTyping = (
  conversationId: string,
  onTyping: (data: { userId: string; userName: string; isTyping: boolean }) => void
): (() => void) => {
  const channel = supabase
    .channel(`typing_${conversationId}`)
    .on('broadcast', { event: 'typing' }, (payload) => {
      onTyping(payload.payload as any);
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
};

// ─────────────────────────────────────────────────────────────────────────────
// CALL LOGS — Persistent call history
// ─────────────────────────────────────────────────────────────────────────────

export interface CallLog {
  id: string;
  callerId: string;
  callerName: string;
  callerRole: 'patient' | 'doctor';
  calleeId: string;
  calleeName: string;
  callType: 'video' | 'audio';
  status: 'ringing' | 'answered' | 'missed' | 'declined' | 'ended';
  sessionId?: string;
  startedAt: string;
  answeredAt?: string;
  endedAt?: string;
  durationSec: number;
}

/** Create a call log entry */
export const createCallLog = async (opts: {
  callerId: string;
  callerName: string;
  callerRole: 'patient' | 'doctor';
  calleeId: string;
  calleeName: string;
  callType: 'video' | 'audio';
  sessionId?: string;
}): Promise<CallLog | null> => {
  const { data, error } = await supabase
    .from('call_logs')
    .insert({
      caller_id: opts.callerId,
      caller_name: opts.callerName,
      caller_role: opts.callerRole,
      callee_id: opts.calleeId,
      callee_name: opts.calleeName,
      call_type: opts.callType,
      session_id: opts.sessionId || null,
      status: 'ringing'
    })
    .select()
    .single();

  if (error) {
    console.error('[VitaNova] createCallLog error:', error.message);
    return null;
  }
  return mapDbRowToCallLog(data);
};

/** Update call log status (answered, ended, missed, declined) */
export const updateCallLog = async (logId: string, updates: {
  status?: string;
  answeredAt?: string;
  endedAt?: string;
  durationSec?: number;
}) => {
  const row: Record<string, any> = {};
  if (updates.status) row.status = updates.status;
  if (updates.answeredAt) row.answered_at = updates.answeredAt;
  if (updates.endedAt) row.ended_at = updates.endedAt;
  if (updates.durationSec !== undefined) row.duration_sec = updates.durationSec;

  await supabase.from('call_logs').update(row).eq('id', logId);
};

/** Fetch call history for a user */
export const fetchCallLogs = async (userId: string, limit = 50): Promise<CallLog[]> => {
  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .or(`caller_id.eq.${userId},callee_id.eq.${userId}`)
    .order('started_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data || []).map(mapDbRowToCallLog);
};

// ── Mapping helpers ──────────────────────────────────────────────────────────

const mapDbRowToChatMessage = (row: any): ChatMessage => ({
  id: row.id,
  conversationId: row.conversation_id,
  senderId: row.sender_id,
  senderRole: row.sender_role,
  senderName: row.sender_name,
  recipientId: row.recipient_id,
  messageType: row.message_type,
  content: row.content,
  mediaUrl: row.media_url,
  mediaMimeType: row.media_mime_type,
  replyToId: row.reply_to_id,
  isRead: row.is_read,
  isDelivered: row.is_delivered,
  isStarred: row.is_starred,
  callType: row.call_type,
  callDurationSec: row.call_duration_sec,
  createdAt: row.created_at
});

const mapDbRowToCallLog = (row: any): CallLog => ({
  id: row.id,
  callerId: row.caller_id,
  callerName: row.caller_name,
  callerRole: row.caller_role,
  calleeId: row.callee_id,
  calleeName: row.callee_name,
  callType: row.call_type,
  status: row.status,
  sessionId: row.session_id,
  startedAt: row.started_at,
  answeredAt: row.answered_at,
  endedAt: row.ended_at,
  durationSec: row.duration_sec || 0
});
