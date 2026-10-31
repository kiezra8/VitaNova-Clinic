import React, { useState, useEffect } from 'react';
import {
  Activity,
  Wifi,
  WifiOff,
  RefreshCw,
  Zap,
  PhoneCall,
  User,
  LogOut,
  Shield,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  HeartPulse,
  FileText,
  Watch,
  BookOpen,
  Users,
  MessageSquare,
  Building2
} from 'lucide-react';
import { networkSentinel } from '../../lib/network';
import { syncEngine, SyncStateEnum } from '../../lib/syncEngine';
import { NetworkState, UserRole } from '../../types';
import { NavTab } from './Navigation';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onEmergencyClick: () => void;
  onNavigateHome: () => void;
  onNavigateAdmin?: () => void;
  onNavigateTab?: (tab: NavTab) => void;
  activeTab?: NavTab;
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
  onNavigateAdmin,
  onNavigateTab,
  activeTab,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
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

  const handleAdminClick = () => {
    if (onNavigateAdmin) {
      onNavigateAdmin();
    } else if (onNavigateTab) {
      onNavigateTab('admin');
    }
    setIsMobileMenuOpen(false);
  };

  const handleTabClick = (tab: NavTab) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
    setIsMobileMenuOpen(false);
  };

  const menuSections: { id: NavTab; label: string; desc: string; icon: any; badge?: string; badgeColor?: string }[] = [
    ...(isAdmin
      ? [
          {
            id: 'admin' as NavTab,
            label: 'Admin Staff Console',
            desc: 'Edit doctors, nurses, midwives, physios & upload gallery photos',
            icon: Shield,
            badge: 'Admin Only',
            badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          }
        ]
      : []),
    {
      id: 'home',
      label: 'Home Dashboard',
      desc: 'Doctors on call, allied health & instant booking',
      icon: Activity
    },
    {
      id: 'consultation',
      label: 'Doctor Care & Telehealth',
      desc: 'Video call, audio call & in-app direct chat',
      icon: Activity
    },
    {
      id: 'homecare',
      label: 'Home Care Visits',
      desc: 'Nurses, midwives & physios doorstep care',
      icon: HeartPulse
    },
    {
      id: 'chronic',
      label: 'Care Plan',
      desc: 'Chronic disease tracking with Doctor & Nurse authorship',
      icon: Shield
    },
    {
      id: 'vitals',
      label: 'Vitals & Charts',
      desc: 'Blood pressure, glucose & health metrics',
      icon: Activity
    },
    {
      id: 'records',
      label: 'Medical Records',
      desc: 'Prescriptions, clinical notes & health history',
      icon: FileText
    },
    {
      id: 'watch',
      label: 'CareWatch Telemetry',
      desc: 'Smart health wearable sync & monitoring',
      icon: Watch
    },
    {
      id: 'education',
      label: 'Video Health Talks',
      desc: 'Doctor educational lectures & wellness guides',
      icon: BookOpen
    },
    {
      id: 'family',
      label: 'Family Health Circle',
      desc: 'Manage dependants & household members',
      icon: Users
    },
    {
      id: 'fitness',
      label: 'Fitness & Weight Loss',
      desc: 'Daily exercise routines, BMI & progress',
      icon: Zap
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Reminders',
      desc: 'Prescription & appointment WhatsApp alerts',
      icon: MessageSquare
    },
    {
      id: 'landing',
      label: 'Public Website',
      desc: 'Overview, branch locations & services',
      icon: Building2
    },
    {
      id: 'emergency',
      label: 'Emergency 999 Response',
      desc: '24/7 Rapid ambulance & emergency triage',
      icon: PhoneCall,
      badge: '999',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40'
    }
  ];

  return (
    <>
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
                </div>
                <p className="text-[10px] text-slate-400 hidden xs:block">Healthcare for You & Family</p>
              </div>
            </div>

            {/* Right Status & Controls Bar */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* ADMIN BUTTON — Strictly visible ONLY to authenticated admin (israelezrakisakye@gmail.com) */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleAdminClick}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold shadow-sm active:scale-95 transition-all shrink-0 ${
                    activeTab === 'admin'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-amber-500/20'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
                  }`}
                  title="Staff Management"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </button>
              )}

              {/* Sync & Connectivity Pill */}
              <div
                onClick={handleManualSync}
                title={
                  networkState === 'offline'
                    ? 'Offline. Changes saved locally will sync when online.'
                    : `Last sync: ${
                        syncState.lastSyncedTime
                          ? new Date(syncState.lastSyncedTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Just now'
                      }`
                }
                className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold cursor-pointer transition-all border shrink-0 ${
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
                  </>
                ) : syncState.status === 'syncing' ? (
                  <>
                    <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400 animate-spin shrink-0" />
                    <span className="hidden sm:inline">Syncing</span>
                  </>
                ) : syncState.pendingCount > 0 ? (
                  <>
                    <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
                    <span>{syncState.pendingCount} queued</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="hidden sm:inline">Connected</span>
                  </>
                )}
              </div>

              {/* Authentication States */}
              {isDoctorLoggedIn ? (
                <div className="flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-500/40 rounded-xl px-2 sm:px-2.5 py-1 shadow-sm">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 truncate max-w-[90px] sm:max-w-none">
                    {loggedInDoctorName || 'Dr. Israel Kisakye'}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={handleAdminClick}
                      className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 border border-amber-400/30 cursor-pointer active:scale-95 transition-all"
                      title="Open Admin Console"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onDoctorLogout}
                    title="Sign out of doctor line"
                    className="p-1 hover:text-rose-400 text-slate-400 transition-colors ml-0.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : isPatientLoggedIn ? (
                <div className="flex items-center space-x-1.5 bg-teal-500/15 border border-teal-500/40 rounded-xl px-2 sm:px-2.5 py-1 shadow-sm">
                  <User className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="text-[11px] font-bold text-teal-300 truncate max-w-[80px] sm:max-w-none">
                    {currentPatientName || 'Patient'}
                  </span>
                  <button
                    type="button"
                    onClick={onPatientLogout}
                    title="Sign out of patient account"
                    className="p-1 hover:text-rose-400 text-slate-400 transition-colors ml-0.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('patient', 'signin')}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-[11px] shadow-sm shadow-teal-500/20 transition-all active:scale-95 shrink-0"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('doctor', 'signin')}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition-colors shrink-0"
                    title="Doctor Login"
                  >
                    <span>Doctors</span>
                  </button>
                </div>
              )}

              {/* Mobile All-Services Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-colors shrink-0"
                aria-label="Toggle All Services Menu"
                title="All Clinic Services & Admin"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 text-teal-400" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE ALL-SERVICES DRAWER / SLIDE-DOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-slate-700 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">VitaNova Mobile Portal</h3>
                  <p className="text-[10px] text-slate-400">All Clinic Features, Admin & Services</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Items List */}
            <div className="overflow-y-auto p-4 space-y-2">
              {menuSections.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                const isAdminItem = item.id === 'admin';

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? isAdminItem
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                          : 'bg-teal-500/20 border-teal-400 text-teal-200'
                        : isAdminItem
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-200 hover:bg-amber-500/20'
                        : 'bg-slate-800/60 border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          isAdminItem
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : isSelected
                            ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm font-bold truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${
                                item.badgeColor || 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>

            {/* Bottom Close Bar */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">VitaNova Fully Mobile Web App</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
