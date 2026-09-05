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
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onEmergencyClick,
  onNavigateHome,
  lowBandwidth,
  onToggleLowBandwidth
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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={onNavigateHome}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">VitaNova</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Clinic
                </span>
                <span className="hidden md:inline-flex items-center text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  Uganda
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Offline-First Healthcare System</p>
            </div>
          </div>

          {/* Right Status & Controls Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Sync & Connectivity Pill */}
            <div
              onClick={handleManualSync}
              title={
                networkState === 'offline'
                  ? 'Application is currently running offline. Local changes will synchronize automatically when connection returns.'
                  : `Click to trigger sync. Last sync: ${syncState.lastSyncedTime ? new Date(syncState.lastSyncedTime).toLocaleTimeString() : 'Never'}`
              }
              className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border ${
                networkState === 'offline'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                  : syncState.status === 'syncing'
                  ? 'bg-teal-500/10 text-teal-300 border-teal-500/30 animate-pulse'
                  : syncState.pendingCount > 0
                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
              }`}
            >
              {networkState === 'offline' ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Offline</span>
                  {syncState.pendingCount > 0 && (
                    <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 text-[10px] rounded-full font-bold">
                      {syncState.pendingCount}
                    </span>
                  )}
                </>
              ) : syncState.status === 'syncing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-teal-400 animate-spin" />
                  <span className="hidden xs:inline">Back online — syncing...</span>
                  <span className="xs:hidden">Syncing</span>
                </>
              ) : syncState.pendingCount > 0 ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                  <span>{syncState.pendingCount} pending</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">All changes synced</span>
                  <span className="sm:hidden">Synced</span>
                </>
              )}
            </div>

            {/* Offline Simulation Toggle Button (Crucial for QA testing) */}
            <button
              type="button"
              onClick={toggleSimulatedOffline}
              title={isSimulated ? "Simulated Offline active. Click to restore Online." : "Click to simulate Offline connection state"}
              className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSimulated
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isSimulated ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{isSimulated ? 'Offline Sim: ON' : 'Simulate Offline'}</span>
            </button>

            {/* Low-Bandwidth Mode Toggle */}
            <button
              type="button"
              onClick={onToggleLowBandwidth}
              title={lowBandwidth ? "Low-Bandwidth Mode active (optimizing data & battery)" : "Enable Low-Bandwidth Mode for slow 2G/3G connections"}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                lowBandwidth
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="hidden lg:inline">Low Data:</span>
              <span>{lowBandwidth ? 'ON' : 'OFF'}</span>
            </button>

            {/* Role Switcher (Patient / Doctor / Nurse / Admin) */}
            <div className="relative">
              <select
                aria-label="User Portal Role"
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-slate-800 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
              >
                <option value="patient">Patient (Sarah)</option>
                <option value="doctor">Doctor (Dr. Ronald)</option>
                <option value="nurse">Nurse (Sr. Florence)</option>
                <option value="admin">Clinic Admin</option>
              </select>
            </div>

            {/* Emergency Button */}
            <button
              type="button"
              onClick={onEmergencyClick}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30 transition-transform active:scale-95 animate-pulse-subtle"
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
