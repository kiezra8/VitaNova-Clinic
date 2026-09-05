import React from 'react';
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
  Building2
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
  | 'clinician_portal'
  | 'admin';

interface NavigationProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingSyncCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  pendingSyncCount
}) => {
  return (
    <>
      {/* Desktop Horizontal Navigation Subheader */}
      <nav className="hidden md:block bg-slate-900/60 border-b border-slate-800/80 sticky top-16 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 text-xs font-medium">
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
              <span>Clinic Website</span>
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
              <span>Talk to Clinician</span>
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
              <BookOpen className="w-3.5 h-3.5" />
              <span>Health Library</span>
            </button>

            <button
              onClick={() => onSelectTab('family')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'family'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>My Family</span>
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

      {/* Mobile Bottom App Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-safe">
        <div className="grid grid-cols-5 h-14">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'home' ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('consultation')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'consultation' || activeTab === 'homecare'
                ? 'text-teal-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-[10px] font-medium">Care</span>
          </button>

          <button
            onClick={() => onSelectTab('vitals')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors relative ${
              activeTab === 'vitals' ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-medium">Vitals</span>
            {pendingSyncCount > 0 && (
              <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('records')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'records' ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] font-medium">Records</span>
          </button>

          <button
            onClick={() => onSelectTab('education')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              activeTab === 'education' || activeTab === 'family' || activeTab === 'membership'
                ? 'text-teal-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium">Library</span>
          </button>
        </div>
      </div>
    </>
  );
};
