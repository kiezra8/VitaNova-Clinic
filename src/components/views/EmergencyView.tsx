import React, { useState } from 'react';
import {
  PhoneCall,
  AlertTriangle,
  MapPin,
  ShieldAlert,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  WifiOff
} from 'lucide-react';

interface EmergencyViewProps {
  networkState: string;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({
  networkState
}) => {
  const [callerName, setCallerName] = useState<string>('Sarah Namubiru');
  const [callerPhone, setCallerPhone] = useState<string>('+256 772 458 912');
  const [locationText, setLocationText] = useState<string>('Plot 14, Ntinda-Nakawa Road, Kampala');
  const [severity, setSeverity] = useState<string>('Critical (Red)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dispatchResult, setDispatchResult] = useState<any | null>(null);

  const handleAmbulanceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (networkState === 'offline') {
      // Offline safety rule: NEVER falsely claim an ambulance is dispatched!
      setTimeout(() => {
        setIsSubmitting(false);
        setDispatchResult({
          offline: true,
          message: 'You are currently offline. Online GPS ambulance dispatch cannot be transmitted right now. Please tap the red Emergency Call button below to dial 999 or 112 directly through your phone carrier.'
        });
      }, 600);
      return;
    }

    try {
      const response = await fetch('/api/emergency/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callerName,
          callerPhone,
          locationText,
          triageLevel: severity
        })
      });

      const data = await response.json();
      setDispatchResult({
        offline: false,
        ...data
      });
    } catch {
      setDispatchResult({
        offline: true,
        message: 'Could not connect to dispatch server. Please place a direct phone call immediately.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Critical Emergency Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 border-2 border-red-500/40 space-y-4 shadow-xl shadow-red-950/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Emergency Medical Response</h1>
            <p className="text-xs text-red-300 font-semibold">
              24/7 Rapid Dispatch & Critical Care Assistance across Uganda
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          If you or someone nearby is experiencing acute chest pain, difficulty breathing, severe bleeding, sudden unconsciousness, or traumatic injury, act immediately.
        </p>

        {/* Direct One-Touch Emergency Dialers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* 999 National Emergency */}
          <a
            href="tel:999"
            className="p-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-red-600/30 transition-transform active:scale-95 text-center"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call 999 (National Emergency)</span>
          </a>

          {/* 112 Mobile Emergency */}
          <a
            href="tel:112"
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center space-x-2 transition-colors text-center"
          >
            <PhoneCall className="w-5 h-5 text-red-400" />
            <span>Call 112 (Toll-Free Mobile)</span>
          </a>

          {/* Personal Emergency Contact */}
          <a
            href="tel:+256701893214"
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center space-x-2 transition-colors text-center"
          >
            <PhoneCall className="w-4 h-4 text-teal-400" />
            <span>Call Next of Kin (Mother)</span>
          </a>
        </div>
      </div>

      {/* Ambulance Dispatch Form */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Request VitaNova Rapid Ambulance Dispatch</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dispatches ICU-equipped response vehicle from Nakawa, Kampala central hub.
            </p>
          </div>
          {networkState === 'offline' && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
              <WifiOff className="w-3 h-3" />
              <span>Offline Mode</span>
            </span>
          )}
        </div>

        {/* Offline Safety Warning */}
        {networkState === 'offline' && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Safety Notice:</strong> You are currently offline. Online GPS ambulance routing requires an internet connection. If in an acute life-threatening situation, please use the direct telephone button above to call <strong>999</strong> immediately!
            </span>
          </div>
        )}

        {dispatchResult ? (
          <div className={`p-5 rounded-2xl border space-y-3 ${
            dispatchResult.offline
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
          }`}>
            <div className="flex items-center space-x-2 font-bold text-white text-sm">
              {dispatchResult.offline ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
              <span>{dispatchResult.offline ? 'Immediate Phone Call Required' : 'Ambulance En Route!'}</span>
            </div>

            <p className="text-xs leading-relaxed text-slate-200">
              {dispatchResult.message}
            </p>

            {!dispatchResult.offline && (
              <div className="text-xs text-slate-300 space-y-1 pt-1 font-mono">
                <p>Allocated Unit: <strong className="text-white">{dispatchResult.unit}</strong></p>
                <p>Estimated Arrival Time: <strong className="text-emerald-400">~{dispatchResult.etaMinutes} minutes</strong></p>
                <p>Tracking Code: <span className="text-teal-400">{dispatchResult.dispatchId}</span></p>
              </div>
            )}

            <button
              onClick={() => setDispatchResult(null)}
              className="text-xs text-slate-400 hover:text-white underline pt-1 block"
            >
              Submit another request or reset
            </button>
          </div>
        ) : (
          <form onSubmit={handleAmbulanceRequest} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Caller / Patient Name</label>
                <input
                  type="text"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Callback Phone Number</label>
                <input
                  type="text"
                  value={callerPhone}
                  onChange={(e) => setCallerPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Landmark Description (Kampala)</label>
              <input
                type="text"
                placeholder="e.g. Plot 14, Ntinda-Nakawa Road, opposite Shell station"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Triage Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-teal-500"
              >
                <option value="Critical (Red)">Critical (Red) — Unresponsive, severe chest pain, major hemorrhage</option>
                <option value="Urgent (Yellow)">Urgent (Yellow) — High fever with convulsion, severe fracture, severe asthma</option>
                <option value="Standard (Green)">Standard (Green) — Moderate illness requiring clinic transport</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Dispatch Request...' : 'Dispatch Emergency Ambulance'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
