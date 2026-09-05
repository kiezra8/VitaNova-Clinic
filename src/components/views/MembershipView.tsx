import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { MembershipPlan } from '../../types';

interface MembershipViewProps {
  onUpgradePlan: (plan: MembershipPlan) => void;
  networkState: string;
}

export const MembershipView: React.FC<MembershipViewProps> = ({
  onUpgradePlan,
  networkState
}) => {
  const currentPlan: MembershipPlan = {
    id: 'plan_family_01',
    name: 'Family',
    tagline: 'Comprehensive coverage for parents and up to 3 dependents.',
    priceUGX: 95000,
    period: 'monthly',
    consultationsTotal: 5,
    consultationsUsed: 3,
    homeVisitsTotal: 2,
    homeVisitsUsed: 1,
    physioSessionsTotal: 2,
    physioSessionsUsed: 0,
    features: [
      '5 Doctor & Specialist Consultations',
      '2 Free Community Home Nursing Visits',
      '2 In-home Physiotherapy Sessions',
      'Unlimited Offline EMR Sync',
      '24/7 Priority Emergency Ambulance Dispatch',
      '20% Off Laboratory & Pharmacy'
    ],
    discounts: '20% Off Clinic Outpatient Diagnostics',
    isPopular: true
  };

  const allPlans: MembershipPlan[] = [
    {
      id: 'plan_essential',
      name: 'Essential',
      tagline: 'Routine preventive healthcare for individuals.',
      priceUGX: 35000,
      period: 'monthly',
      consultationsTotal: 2,
      consultationsUsed: 0,
      homeVisitsTotal: 0,
      homeVisitsUsed: 0,
      physioSessionsTotal: 0,
      physioSessionsUsed: 0,
      features: [
        '2 Doctor Consultations / month',
        'Unlimited Offline Vitals & EMR',
        'Automated WhatsApp Reminders',
        '10% Off Physical Clinic Labs'
      ],
      discounts: '10% Off Labs'
    },
    currentPlan,
    {
      id: 'plan_chronic',
      name: 'Chronic Care',
      tagline: 'Dedicated protocol management for Hypertension & Diabetes.',
      priceUGX: 65000,
      period: 'monthly',
      consultationsTotal: 3,
      consultationsUsed: 0,
      homeVisitsTotal: 2,
      homeVisitsUsed: 0,
      physioSessionsTotal: 1,
      physioSessionsUsed: 0,
      features: [
        'Dedicated Cardiologist / Physician',
        'Monthly Home Nurse BP & Glucose Audit',
        'Prescription Refill Auto-Delivery in Kampala',
        'Direct WhatsApp Specialist Access'
      ],
      discounts: '15% Off Cardiovascular Diagnostics'
    },
    {
      id: 'plan_premium',
      name: 'Premium',
      tagline: 'Full concierge healthcare with unlimited support.',
      priceUGX: 180000,
      period: 'monthly',
      consultationsTotal: 10,
      consultationsUsed: 0,
      homeVisitsTotal: 4,
      homeVisitsUsed: 0,
      physioSessionsTotal: 4,
      physioSessionsUsed: 0,
      features: [
        '10 Specialist Consultations',
        '4 Scheduled Home Care / Nursing Visits',
        'Dedicated Family Doctor on Call 24/7',
        'Free Emergency Ambulance Dispatch (Kampala)',
        '30% Off All Clinic Services'
      ],
      discounts: '30% Off Everything'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">My Health Plan (Membership)</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            Prepaid Healthcare Services
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          VitaNova Clinic prepaid membership offering transparent, guaranteed clinical services. Not an insurance scheme.
        </p>
      </div>

      {/* Active Membership Benefit Quotas Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border border-teal-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Current Active Subscription</span>
            <h2 className="text-xl font-bold text-white">{currentPlan.name} Membership</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Renews on 2026-10-01 • UGX {currentPlan.priceUGX.toLocaleString()} / month
            </p>
          </div>
          <button
            onClick={() => onUpgradePlan(currentPlan)}
            disabled={networkState === 'offline'}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 flex items-center space-x-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Renew via MoMo</span>
          </button>
        </div>

        {/* Benefit Usage Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Doctor Consultations Meter */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Doctor Consultations</span>
              <span className="font-bold text-white">
                {currentPlan.consultationsUsed} / {currentPlan.consultationsTotal} used
              </span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full"
                style={{ width: `${(currentPlan.consultationsUsed / currentPlan.consultationsTotal) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-teal-400">
              {currentPlan.consultationsTotal - currentPlan.consultationsUsed} consultations remaining
            </p>
          </div>

          {/* Home Nursing Meter */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Home Nursing Visits</span>
              <span className="font-bold text-white">
                {currentPlan.homeVisitsUsed} / {currentPlan.homeVisitsTotal} used
              </span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full"
                style={{ width: `${(currentPlan.homeVisitsUsed / currentPlan.homeVisitsTotal) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-teal-400">
              {currentPlan.homeVisitsTotal - currentPlan.homeVisitsUsed} visit remaining
            </p>
          </div>

          {/* Physiotherapy Meter */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Physiotherapy</span>
              <span className="font-bold text-white">
                {currentPlan.physioSessionsUsed} / {currentPlan.physioSessionsTotal} used
              </span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full"
                style={{ width: `${(currentPlan.physioSessionsUsed / currentPlan.physioSessionsTotal) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-teal-400">
              {currentPlan.physioSessionsTotal - currentPlan.physioSessionsUsed} sessions remaining
            </p>
          </div>
        </div>
      </div>

      {/* Available Plans Catalog */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Compare Membership Plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allPlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-5 rounded-3xl bg-slate-900 border flex flex-col justify-between ${
                plan.id === currentPlan.id
                  ? 'border-teal-500 ring-1 ring-teal-500/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                  {plan.id === currentPlan.id && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500 text-slate-950">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white">UGX {plan.priceUGX.toLocaleString()}</span>
                  <span className="text-xs text-slate-400"> / mo</span>
                </div>
                <p className="text-xs text-slate-400">{plan.tagline}</p>
                <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4">
                <button
                  onClick={() => onUpgradePlan(plan)}
                  disabled={networkState === 'offline' || plan.id === currentPlan.id}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
                >
                  {plan.id === currentPlan.id ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
