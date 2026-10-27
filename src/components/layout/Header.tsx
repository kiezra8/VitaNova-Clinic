import React, { useState, useEffect } from 'react';
import {
  Activity,
  Wifi,
  WifiOff,
  RefreshCw,
  Zap,
  PhoneCall,
  User,
  Stethoscope,
  LogOut,
  Shield,
  Sparkles
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
  loggedInDoctorName?: string;
  isAdmin?: boolean;
  isPatientLoggedIn: boolean;
  currentPatientName?: string;
  onOpenAuthModal: (role?: 'patient' | 'doctor', action?: 'signin' | 'signup') => void;
  onDoctorLogout: () => void;
  onPatientLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onEmergencyClick,
  onNavigateHome,
  isDoctorLoggedIn,
  loggedInDoctorName,
  isAdmin,
  isPatientLoggedIn,
  currentPatientName,
  onOpenAuthModal,
  onDoctorLogout,
  onPatientLogout
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

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none"
            onClick={onNavigateHome}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  VitaNova
                </span>
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
                  : `Tap to sync. Last: ${
                      syncState.lastSyncedTime
                        ? new Date(syncState.lastSyncedTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Just now'
                    }`
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
              title={
                isSimulated
                  ? 'Simulated Offline ON. Click to reconnect.'
                  : 'Click to test offline experience'
              }
              className={`hidden lg:flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                isSimulated
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Zap className={`w-3 h-3 ${isSimulated ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{isSimulated ? 'Offline Sim: ON' : 'Simulate Offline'}</span>
            </button>

            {/* Authentication States */}
            {isDoctorLoggedIn ? (
              <div className="flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-500/40 rounded-xl px-2.5 py-1 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold text-emerald-300 truncate max-w-[130px] sm:max-w-none">
                  {loggedInDoctorName || 'Dr. Israel Kisakye'}
                </span>
                {isAdmin && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Admin
                  </span>
                )}
                <button
                  type="button"
                  onClick={onDoctorLogout}
                  title="Sign out of doctor line"
                  className="p-1 hover:text-rose-400 text-slate-400 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : isPatientLoggedIn ? (
              <div className="flex items-center space-x-1.5 bg-teal-500/15 border border-teal-500/40 rounded-xl px-2.5 py-1 shadow-sm">
                <User className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] font-bold text-teal-300 truncate max-w-[120px] sm:max-w-none">
                  {currentPatientName || 'Patient'}
                </span>
                <button
                  type="button"
                  onClick={onPatientLogout}
                  title="Sign out of patient account"
                  className="p-1 hover:text-rose-400 text-slate-400 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('patient', 'signin')}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-[11px] shadow-sm shadow-teal-500/20 transition-all active:scale-95"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('doctor', 'signin')}
                  className="hidden sm:flex items-center space-x-1 px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition-colors"
                  title="Doctor portal"
                >
                  <Stethoscope className="w-3 h-3 text-teal-400" />
                  <span>Doctors</span>
                </button>
              </div>
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
    </header>
  );
};

export default Header;
