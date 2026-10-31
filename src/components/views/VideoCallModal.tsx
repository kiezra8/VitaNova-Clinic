import React, { useEffect, useState, useCallback, useRef } from 'react';
import { HealthcareWorker } from '../../types';
import {
  sendCallSignal,
  subscribeToCallSignals,
  updateCallLogBySession
} from '../../lib/supabase';
import { stopRingbackTone, playHangupTone } from '../../lib/callSounds';
import { fetchDailyRoom } from '../../lib/daily';
import { VideoCall } from '../video/VideoCall';
import { Loader2, PhoneOff, AlertCircle, RefreshCw } from 'lucide-react';

interface VideoCallModalProps {
  clinician: HealthcareWorker;
  callType: 'video' | 'audio';
  userRole?: 'doctor' | 'patient';
  memberName: string;
  callerName?: string;
  sessionId?: string;
  onEnd: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  clinician,
  callType,
  userRole = 'patient',
  memberName,
  callerName,
  sessionId: propSessionId,
  onEnd
}) => {
  const [sessionId] = useState(
    () =>
      propSessionId ||
      `vitanova_call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );

  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const endedRef = useRef(false);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const remoteDisplayName =
    userRole === 'doctor' ? callerName || 'Patient' : clinician.name;

  const handleEndCall = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;

    stopRingbackTone();
    playHangupTone();

    sendCallSignal({
      signalType: 'HANGUP',
      fromRole: userRole,
      callerName: memberName,
      targetClinicianId: clinician.id,
      callType,
      sessionId
    }).catch(() => {});

    updateCallLogBySession(sessionId, {
      status: 'ended',
      endedAt: new Date().toISOString()
    }).catch(() => {});

    setTimeout(() => onEndRef.current(), 300);
  }, [sessionId, userRole, memberName, clinician.id, callType]);

  // Listen for remote hangup or decline signals
  useEffect(() => {
    const unsub = subscribeToCallSignals(clinician.id, (sig) => {
      if (sig.sessionId && sig.sessionId !== sessionId) return;
      if (sig.signalType === 'HANGUP' || sig.signalType === 'DECLINE') {
        handleEndCall();
      }
    });
    return () => unsub();
  }, [clinician.id, sessionId, handleEndCall]);

  // Fetch Daily room (re-runs when retryCount changes)
  useEffect(() => {
    let alive = true;
    setIsLoading(true);
    setFetchError(null);

    const displayName =
      memberName?.trim() ||
      (userRole === 'doctor' ? 'Dr. Israel Kisakye' : 'Patient');

    fetchDailyRoom({
      appointmentId: sessionId,
      userName: displayName,
      isDoctor: userRole === 'doctor'
    })
      .then((room) => {
        if (!alive) return;
        setRoomUrl(room.roomUrl);
        setToken(room.token);
        setIsLoading(false);
      })
      .catch((err: any) => {
        if (!alive) return;
        console.error('[VitaNova VideoCallModal] Room fetch error:', err);
        setFetchError(
          err?.message ||
            'Could not set up video consultation room. Make sure the backend server is running.'
        );
        setIsLoading(false);
      });

    return () => {
      alive = false;
      stopRingbackTone();
    };
  }, [sessionId, memberName, userRole, retryCount]);

  const handleRetry = () => {
    setRoomUrl(null);
    setToken(undefined);
    setRetryCount((n) => n + 1);
  };

  // ── Error screen ──────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="fixed inset-0 z-[10002] bg-slate-950/95 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">
            Video Room Unavailable
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            {fetchError}
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRetry}
              className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-black text-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
            <button
              onClick={handleEndCall}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading screen ────────────────────────────────────────────────────────
  if (isLoading || !roomUrl) {
    return (
      <div className="fixed inset-0 z-[10002] bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-teal-500/40 flex items-center justify-center shadow-xl">
            <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
          </div>
        </div>
        <h3 className="text-base font-black text-white mb-1">
          Calling {remoteDisplayName}...
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mb-6">
          {retryCount > 0
            ? `Retrying connection (attempt ${retryCount + 1})...`
            : 'Setting up encrypted video consultation room'}
        </p>
        <button
          onClick={handleEndCall}
          className="px-5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>
    );
  }

  // ── Active call ───────────────────────────────────────────────────────────
  return (
    <VideoCall
      roomUrl={roomUrl}
      token={token}
      userName={
        memberName?.trim() ||
        (userRole === 'doctor' ? 'Doctor' : 'Patient')
      }
      title={remoteDisplayName}
      subtitle={callType === 'video' ? 'Video Consultation' : 'Voice Call'}
      callType={callType}
      onLeave={handleEndCall}
      onError={(err) => {
        console.error('[VideoCall component error]', err);
        setFetchError(err.message);
        setRoomUrl(null);
      }}
    />
  );
};
