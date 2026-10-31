import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  AlertCircle
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
  // Check if user has actually completed a paid subscription
  const [hasPaid] = useState<boolean>(() => {
    return localStorage.getItem('vitanova_membership_paid') === 'true';
  });

  const [activePlanId] = useState<string | null>(() => {
    return localStorage.getItem('vitanova_active_plan_id') || null;
  });

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
        'Direct Chat & Video Consultations',
        'Automated WhatsApp Reminders',
        '10% Off Clinic Lab Tests'
      ],
      discounts: '10% Off Labs'
    },
    {
      id: 'plan_family_01',
      name: 'Family',
      tagline: 'Comprehensive coverage for parents and up to 3 dependants.',
      priceUGX: 95000,
      period: 'monthly',
      consultationsTotal: 5,
      consultationsUsed: 0,
      homeVisitsTotal: 2,
      homeVisitsUsed: 0,
      physioSessionsTotal: 2,
      physioSessionsUsed: 0,
      features: [
        '5 Doctor & Specialist Consultations',
        '2 Free Community Home Nursing Visits',
        '2 In-home Physiotherapy Sessions',
        'Emergency Clinic Priority Access',
        '20% Off Clinic Diagnostics'
      ],
      discounts: '20% Off Clinic Outpatient Diagnostics'
    },
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
        'Dedicated Doctor Protocol Reviews',
        'Monthly Home Nurse BP & Glucose Audit',
        'Prescription Refill Support in Kampala',
        'Direct Clinical WhatsApp Access'
      ],
      discounts: '15% Off Cardiovascular Diagnostics'
    },
    {
      id: 'plan_premium',
      name: 'Premium Comprehensive',
      tagline: 'All-inclusive executive healthcare with priority on-call response.',
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
        'Doctor On Call Priority 24/7',
        'Emergency Clinic Dispatch Priority',
        '30% Off All Medical Services'
      ],
      discounts: '30% Off Everything'
    }
  ];

  const activePlan = hasPaid && activePlanId ? allPlans.find((p) => p.id === activePlanId) : null;

  return (
    <div className="space-y-6 pb-28 bg-white min-h-screen text-slate-900">
      {/* ── HEADER ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Prepaid Health Plans
          </h1>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            {hasPaid && activePlan ? 'Active Member' : 'Pay As You Go'}
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Simple prepaid plans offering guaranteed clinical consultations and outpatient benefits.
        </p>
      </div>

      {/* ── STATUS CARD (UNPAID VS PAID) ── */}
      {!hasPaid || !activePlan ? (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center space-x-2 text-slate-700">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              No Active Subscription
            </span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Standard Pay-As-You-Go</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              You are currently billed per consultation or visit. Select any plan below to activate monthly consultations and clinic benefits.
            </p>
          </div>
        </div>
      ) : (
        /* Only shown if user has actually paid */
        <div className="p-6 rounded-3xl bg-teal-900 text-white border border-teal-600 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                Active Subscription
              </span>
              <h2 className="text-xl font-bold text-white">{activePlan.name} Membership</h2>
              <p className="text-xs text-teal-200/80 mt-0.5">
                Active • UGX {activePlan.priceUGX.toLocaleString()} / month
              </p>
            </div>
            <button
              onClick={() => onUpgradePlan(activePlan)}
              disabled={networkState === 'offline'}
              className="px-4 py-2 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs shadow-sm flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <CreditCard className="w-4 h-4" />
              <span>Renew via MoMo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-teal-950/60 border border-teal-800 text-xs">
              <span className="text-teal-200">Doctor Consultations</span>
              <p className="text-sm font-bold text-white mt-1">{activePlan.consultationsTotal} Remaining</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-teal-950/60 border border-teal-800 text-xs">
              <span className="text-teal-200">Home Nursing Visits</span>
              <p className="text-sm font-bold text-white mt-1">{activePlan.homeVisitsTotal} Included</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-teal-950/60 border border-teal-800 text-xs">
              <span className="text-teal-200">Outpatient Discounts</span>
              <p className="text-sm font-bold text-white mt-1">{activePlan.discounts}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── PLANS COMPARISON ── */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Available Plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allPlans.map((plan) => {
            const isThisPlanActive = hasPaid && activePlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`p-5 rounded-3xl bg-white border flex flex-col justify-between transition-all ${
                  isThisPlanActive
                    ? 'border-teal-600 ring-2 ring-teal-600 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{plan.name}</h4>
                    {isThisPlanActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xl font-extrabold text-slate-900">
                      UGX {plan.priceUGX.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500"> / month</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{plan.tagline}</p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => onUpgradePlan(plan)}
                    disabled={networkState === 'offline' || isThisPlanActive}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors ${
                      isThisPlanActive
                        ? 'bg-slate-100 text-slate-400 cursor-default'
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                    }`}
                  >
                    {isThisPlanActive ? 'Current Plan' : 'Subscribe via MoMo'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};