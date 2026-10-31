import React, { useState } from 'react';
import {
  Home,
  UserCheck,
  FileText,
  Activity,
  Users,
  HeartPulse,
  BookOpen,
  MessageSquare,
  Shield,
  Watch,
  Building2,
  Zap,
  Menu,
  X,
  ChevronRight,
  PhoneCall
} from 'lucide-react';

export type NavTab =
  | 'home'
  | 'landing'
  | 'consultation'
  | 'homecare'
  | 'records'
  | 'vitals'
  | 'chronic'
  | 'watch'
  | 'education'
  | 'family'
  | 'membership'
  | 'whatsapp'
  | 'emergency'
  | 'fitness'
  | 'clinician_portal'
  | 'admin';

interface NavigationProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingSyncCount: number;
  isAdmin?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  pendingSyncCount,
  isAdmin = false
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setIsMoreOpen(false);
  };

  const allServicesList: { id: NavTab; label: string; desc: string; icon: any; badge?: string }[] = [
    ...(isAdmin
      ? [
          {
            id: 'admin' as NavTab,
            label: 'Admin Staff Console',
            desc: 'Edit staff details, fees & upload gallery photos',
            icon: Shield,
            badge: 'Admin'
          }
        ]
      : []),
    { id: 'home', label: 'Home Dashboard', desc: 'Doctors on call & quick booking', icon: Home },
    { id: 'consultation', label: 'Doctor Care', desc: 'Direct in-app calls & chat with doctors', icon: UserCheck },
    { id: 'homecare', label: 'Home Care', desc: 'Nurses, midwives & physios home visits', icon: HeartPulse },
    { id: 'chronic', label: 'Care Plan', desc: 'Chronic disease tracking & authored plans', icon: Shield },
    { id: 'vitals', label: 'Vitals & Charts', desc: 'Blood pressure, glucose & pulse logs', icon: Activity },
    { id: 'records', label: 'Medical Records', desc: 'Clinical notes & prescriptions', icon: FileText },
    { id: 'watch', label: 'CareWatch', desc: 'Wearable health sensor sync', icon: Watch },
    { id: 'education', label: 'Articles', desc: 'Medical guides & health articles', icon: BookOpen },
    { id: 'family', label: 'Nearby Clinics', desc: 'Medical centers & GPS proximity', icon: Building2 },
    { id: 'fitness', label: 'Fitness Hub', desc: 'Workouts, BMI & weight tracking', icon: Zap },
    { id: 'whatsapp', label: 'WhatsApp Reminders', desc: 'Direct medicine & follow-up alerts', icon: MessageSquare },
    { id: 'landing', label: 'Website', desc: 'Public portal & branches', icon: Building2 },
    { id: 'emergency', label: 'Emergency 999', desc: 'Ambulance dispatch & urgent care', icon: PhoneCall, badge: '999' },
  ];

  return (
    <>
      {/* ── DESKTOP HORIZONTAL NAVIGATION SUBHEADER ── */}
      <nav className="hidden md:block bg-slate-900/60 border-b border-slate-800/80 sticky top-16 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 text-xs font-medium">
            {/* Admin Console Desktop Button — Strictly visible ONLY to authenticated admin */}
            {isAdmin && (
              <button
                onClick={() => onSelectTab('admin')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  activeTab === 'admin'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                    : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800 font-semibold'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Console</span>
              </button>
            )}

            <button
              onClick={() => onSelectTab('home')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onSelectTab('landing')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'landing'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>

            <button
              onClick={() => onSelectTab('consultation')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'consultation'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Care & Clinicians</span>
            </button>

            <button
              onClick={() => onSelectTab('homecare')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'homecare'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Home Care</span>
            </button>

            <button
              onClick={() => onSelectTab('vitals')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'vitals'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Vitals & Charts</span>
            </button>

            <button
              onClick={() => onSelectTab('records')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'records'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Medical Records</span>
            </button>

            <button
              onClick={() => onSelectTab('chronic')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'chronic'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Care Plan</span>
            </button>

            <button
              onClick={() => onSelectTab('watch')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'watch'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Watch className="w-3.5 h-3.5" />
              <span>CareWatch</span>
            </button>

            <button
              onClick={() => onSelectTab('education')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'education'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>Articles</span>
            </button>

            <button
              onClick={() => onSelectTab('family')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'family'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Nearby Clinics</span>
            </button>

            <button
              onClick={() => onSelectTab('fitness')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'fitness'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fitness</span>
            </button>

            <button
              onClick={() => onSelectTab('whatsapp')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'whatsapp'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Reminders</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE BOTTOM NAVIGATION BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-safe">
        <div className="grid grid-cols-5 h-14">
          {/* 1. Home */}
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'home' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>

          {/* 2. Care */}
          <button
            onClick={() => onSelectTab('consultation')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'consultation' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-[10px] font-medium">Care</span>
          </button>

          {/* 3. Articles */}
          <button
            onClick={() => onSelectTab('education')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'education' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium">Articles</span>
          </button>

          {/* 4. ADMIN (For Admin) OR Records (For Regular Users) */}
          {isAdmin ? (
            <button
              onClick={() => onSelectTab('admin')}
              className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
                activeTab === 'admin' ? 'text-amber-400 font-black' : 'text-amber-500/70 hover:text-amber-300'
              }`}
            >
              <div className="relative">
                <Shield className="w-5 h-5 text-amber-400" />
                {activeTab === 'admin' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <span className="text-[10px] font-bold text-amber-300">Admin</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('records')}
              className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
                activeTab === 'records' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-medium">Records</span>
            </button>
          )}

          {/* 5. More / All Services Drawer Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors relative ${
              isMoreOpen ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">More</span>
            {pendingSyncCount > 0 && (
              <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE "MORE SERVICES" BOTTOM SHEET ── */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-slate-700 rounded-t-3xl max-h-[82vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Sheet Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">All Sections</h3>
                <p className="text-[10px] text-slate-400">Tap to open</p>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="overflow-y-auto p-4 space-y-2">
              {allServicesList.map((svc) => {
                const Icon = svc.icon;
                const isSelected = activeTab === svc.id;
                const isAdminItem = svc.id === 'admin';

                return (
                  <button
                    key={svc.id}
                    onClick={() => handleTabClick(svc.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? isAdminItem
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                          : 'bg-teal-500/20 border-teal-400 text-teal-200'
                        : isAdminItem
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-200 hover:bg-amber-500/20'
                        : 'bg-slate-800/60 border-slate-800 hover:border-slate-700 text-slate-200'
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
                          <span className="text-xs sm:text-sm font-bold truncate">{svc.label}</span>
                          {svc.badge && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {svc.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{svc.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setIsMoreOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
