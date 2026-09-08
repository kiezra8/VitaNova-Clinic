import React, { useState, useEffect } from 'react';
import {
  Activity,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  PhoneCall,
  User,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Lock,
  LogOut,
  X
} from 'lucide-react';
import { networkSentinel } from '../../lib/network';
import { syncEngine, SyncStateEnum } from '../../lib/syncEngine';
import { NetworkState, UserRole } from '../../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onEmergencyClick: () => void;
  onNavigateHome: () => void;
  lowBandwidth: boolean;
  onToggleLowBandwidth: () => void;
  isDoctorLoggedIn: boolean;
  onDoctorLogin: (email: string, pass: string) => boolean;
  onDoctorLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onEmergencyClick,
  onNavigateHome,
  lowBandwidth,
  onToggleLowBandwidth,
  isDoctorLoggedIn,
  onDoctorLogin,
  onDoctorLogout
}) => {
  const [networkState, setNetworkState] = useState<NetworkState>(networkSentinel.getState());
  const [isSimulated, setIsSimulated] = useState<boolean>(networkSentinel.isSimulated());
  const [syncState, setSyncState] = useState<{
    status: SyncStateEnum;
    pendingCount: number;
    lastSyncedTime: string | null;
    message: string;
  }>({
    status: 'synced',
    pendingCount: 0,
    lastSyncedTime: null,
    message: 'All changes synced'
  });

  // Doctor Sign In Modal State
  const [showDoctorLoginModal, setShowDoctorLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('israelezrakisakye@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const unsubNet = networkSentinel.subscribe((net, sim) => {
      setNetworkState(net);
      setIsSimulated(sim);
    });

    const unsubSync = syncEngine.subscribe((state) => {
      setSyncState(state);
    });

    return () => {
      unsubNet();
      unsubSync();
    };
  }, []);

  const handleManualSync = async () => {
    if (networkState === 'offline') return;
    await syncEngine.triggerSync('manual_header_click');
  };

  const toggleSimulatedOffline = () => {
    networkSentinel.setSimulatedOffline(!isSimulated);
  };

  const handleDoctorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const success = onDoctorLogin(loginEmail.trim(), loginPassword.trim());
    if (success) {
      setShowDoctorLoginModal(false);
      setLoginPassword('');
    } else {
      setLoginError('Invalid credentials. Use israelezrakisakye@gmail.com and password 88888888.');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none" onClick={onNavigateHome}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">VitaNova</span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Clinic
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden xs:block">Healthcare for You & Family</p>
            </div>
          </div>

          {/* Right Status & Controls Bar */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Sync & Connectivity Pill */}
            <div
              onClick={handleManualSync}
              title={
                networkState === 'offline'
                  ? 'App is working offline. Changes saved locally will sync when internet returns.'
                  : `Tap to sync. Last: ${syncState.lastSyncedTime ? new Date(syncState.lastSyncedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}`
              }
              className={`flex items-center space-x-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold cursor-pointer transition-all border shrink-0 ${
                networkState === 'offline'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : syncState.status === 'syncing'
                  ? 'bg-teal-500/10 text-teal-300 border-teal-500/30 animate-pulse'
                  : syncState.pendingCount > 0
                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {networkState === 'offline' ? (
                <>
                  <WifiOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  <span>Offline</span>
                  {syncState.pendingCount > 0 && (
                    <span className="bg-amber-400/20 text-amber-300 px-1 rounded-full text-[9px]">
                      {syncState.pendingCount}
                    </span>
                  )}
                </>
              ) : syncState.status === 'syncing' ? (
                <>
                  <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400 animate-spin shrink-0" />
                  <span className="hidden sm:inline">Syncing...</span>
                </>
              ) : syncState.pendingCount > 0 ? (
                <>
                  <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
                  <span>{syncState.pendingCount} queued</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="hidden sm:inline">Connected</span>
                  <span className="sm:hidden">Online</span>
                </>
              )}
            </div>

            {/* Offline Simulation Toggle Button (QA/Testing) */}
            <button
              type="button"
              onClick={toggleSimulatedOffline}
              title={isSimulated ? "Simulated Offline ON. Click to reconnect." : "Click to test offline experience"}
              className={`hidden lg:flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                isSimulated
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Zap className={`w-3 h-3 ${isSimulated ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{isSimulated ? 'Offline Sim: ON' : 'Simulate Offline'}</span>
            </button>

            {/* Clinician Staff Login — This is ONLY for healthcare staff, not regular users/members */}
            {isDoctorLoggedIn ? (
              <div className="flex items-center space-x-1.5 bg-teal-500/10 border border-teal-500/30 rounded-xl px-2.5 py-1">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[11px] font-bold text-teal-300 hidden sm:inline">Dr. Israel Kisakye</span>
                <span className="text-[11px] font-bold text-teal-300 sm:hidden">Doctor</span>
                <button
                  type="button"
                  onClick={onDoctorLogout}
                  title="Sign out of clinician portal"
                  className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDoctorLoginModal(true)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-semibold transition-colors"
                title="For healthcare staff only"
              >
                <Lock className="w-3 h-3 text-teal-400" />
                <span className="hidden xs:inline">Staff Login</span>
                <span className="xs:hidden">Staff</span>
              </button>
            )}

            {/* Emergency One-Touch Call 999 */}
            <button
              type="button"
              onClick={onEmergencyClick}
              className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30 transition-transform active:scale-95 shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>999</span>
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Sign In Modal */}
      {showDoctorLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Clinician & Staff Portal</h3>
              </div>
              <button
                onClick={() => setShowDoctorLoginModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-[11px] text-amber-300 font-semibold">⚕️ For Healthcare Staff Only</p>
              <p className="text-[10px] text-slate-400 mt-0.5">This portal is only for registered doctors, nurses, midwives, and clinical administrators. Regular members sign in from the member app.</p>
            </div>

            <form onSubmit={handleDoctorLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Doctor Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="israelezrakisakye@gmail.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              {loginError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[11px] text-red-300">
                  {loginError}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDoctorLoginModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20"
                >
                  Sign In as Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
