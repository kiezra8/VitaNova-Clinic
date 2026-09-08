import React, { useState } from 'react';
import {
  Dumbbell,
  Scale,
  Target,
  TrendingDown,
  Apple,
  Flame,
  Activity,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Heart,
  Trophy,
  Star,
  Footprints
} from 'lucide-react';

interface FitnessViewProps {
  onNavigateVitals?: () => void;
}

export const FitnessView: React.FC<FitnessViewProps> = ({ onNavigateVitals }) => {
  const [activeGoal, setActiveGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');
  const [currentWeight, setCurrentWeight] = useState<string>('72');
  const [targetWeight, setTargetWeight] = useState<string>('65');

  const weeklyProgress = [
    { day: 'Mon', steps: 8200, cals: 1850, logged: true },
    { day: 'Tue', steps: 6100, cals: 2100, logged: true },
    { day: 'Wed', steps: 9800, cals: 1780, logged: true },
    { day: 'Thu', steps: 5500, cals: 1950, logged: true },
    { day: 'Fri', steps: 7300, cals: 2020, logged: true },
    { day: 'Sat', steps: 3100, cals: 2300, logged: true },
    { day: 'Sun', steps: 0, cals: 0, logged: false },
  ];

  const workoutPlans = [
    {
      title: 'Morning Walk — Kampala',
      duration: '30 min',
      intensity: 'Easy',
      calories: '~120 kcal',
      icon: Footprints,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Home Bodyweight Circuit',
      duration: '20 min',
      intensity: 'Moderate',
      calories: '~200 kcal',
      icon: Dumbbell,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      title: 'Swimming or Water Aerobics',
      duration: '40 min',
      intensity: 'Moderate',
      calories: '~280 kcal',
      icon: Droplets,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Cardio Dance / Zumba',
      duration: '45 min',
      intensity: 'Vigorous',
      calories: '~350 kcal',
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 border-orange-500/20'
    }
  ];

  const nutritionTips = [
    { tip: 'Replace white posho with whole millet or sorghum ugali', icon: '🌾' },
    { tip: 'Eat steamed matooke instead of fried versions', icon: '🍌' },
    { tip: 'Drink 8–10 glasses of clean water daily', icon: '💧' },
    { tip: 'Eat leafy greens: dodo, nakati, sukuma wiki daily', icon: '🥦' },
    { tip: 'Limit Royco cubes and table salt — use garlic and lemon instead', icon: '🧄' },
    { tip: 'Avoid sodas and fruit juice — prefer fresh whole fruit', icon: '🍊' },
  ];

  const weightDiff = parseFloat(currentWeight) - parseFloat(targetWeight);
  const progressPercent = Math.min(100, Math.max(0, 100 - (weightDiff / parseFloat(currentWeight)) * 100 * 3));
  const maxSteps = Math.max(...weeklyProgress.map(d => d.steps));

  return (
    <div className="space-y-5 pb-24 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Fitness & Wellness Journey</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>Ugandan Lifestyle Programme</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Your Weight Loss & Fitness Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Set your personal goal, track daily activity, follow Ugandan-friendly nutrition advice, and monitor your weight loss progress with guidance from our clinical team.
          </p>
        </div>
      </div>

      {/* Goal Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>My Fitness Goal</span>
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {([
            { id: 'lose', label: 'Lose Weight', emoji: '📉' },
            { id: 'maintain', label: 'Stay Healthy', emoji: '⚖️' },
            { id: 'gain', label: 'Build Muscle', emoji: '💪' }
          ] as const).map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGoal(g.id)}
              className={`p-3 rounded-2xl text-center border transition-all ${
                activeGoal === g.id
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-lg">{g.emoji}</div>
              <p className="text-[10px] font-bold mt-0.5">{g.label}</p>
            </button>
          ))}
        </div>

        {/* Weight Input */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Current Weight</label>
            <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
              <Scale className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="number"
                value={currentWeight}
                onChange={e => setCurrentWeight(e.target.value)}
                className="bg-transparent text-white text-sm font-bold w-full focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 shrink-0">kg</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Weight</label>
            <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <input
                type="number"
                value={targetWeight}
                onChange={e => setTargetWeight(e.target.value)}
                className="bg-transparent text-white text-sm font-bold w-full focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 shrink-0">kg</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {weightDiff > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Progress to goal</span>
              <span className="font-bold text-emerald-400">{weightDiff.toFixed(1)} kg to go</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>This Week's Activity</span>
          </h2>
          <span className="text-[10px] font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
            6 / 7 days active
          </span>
        </div>

        {/* Step Bars */}
        <div className="flex items-end justify-between space-x-1.5 h-20">
          {weeklyProgress.map((day) => {
            const height = maxSteps > 0 ? (day.steps / maxSteps) * 100 : 0;
            return (
              <div key={day.day} className="flex flex-col items-center flex-1 space-y-1">
                <div className="relative w-full rounded-t-lg overflow-hidden" style={{ height: '56px' }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                      day.logged ? 'bg-gradient-to-t from-emerald-500 to-teal-400' : 'bg-slate-800'
                    }`}
                    style={{ height: `${height}%`, minHeight: day.logged ? '6px' : '0' }}
                  />
                </div>
                <span className={`text-[9px] font-bold ${day.logged ? 'text-slate-300' : 'text-slate-600'}`}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Count Summary */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800">
          <div className="text-center">
            <p className="text-base font-extrabold text-white">6,143</p>
            <p className="text-[10px] text-slate-400">Avg Steps/Day</p>
          </div>
          <div className="text-center">
            <p className="text-base font-extrabold text-emerald-400">~245</p>
            <p className="text-[10px] text-slate-400">Avg kcal Burned</p>
          </div>
          <div className="text-center">
            <p className="text-base font-extrabold text-teal-400">6</p>
            <p className="text-[10px] text-slate-400">Active Days</p>
          </div>
        </div>
      </div>

      {/* Workout Plans */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Recommended Workouts for You</span>
          </h2>
          <span className="text-[10px] text-slate-400">Kampala-friendly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {workoutPlans.map((plan) => {
            const IconComp = plan.icon;
            return (
              <div key={plan.title} className={`p-4 rounded-2xl border ${plan.bgColor} space-y-2.5`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl bg-slate-900/60 flex items-center justify-center`}>
                    <IconComp className={`w-4.5 h-4.5 ${plan.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{plan.title}</p>
                    <p className="text-[10px] text-slate-400">{plan.intensity} intensity</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-300">⏱ {plan.duration}</span>
                  <span className="font-bold text-emerald-400">🔥 {plan.calories}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ugandan Nutrition Tips */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <Apple className="w-4 h-4 text-emerald-400" />
          <span>Ugandan Nutrition & Healthy Eating Guide</span>
        </h2>

        <div className="space-y-2">
          {nutritionTips.map((item, i) => (
            <div key={i} className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-800/50 border border-slate-800">
              <span className="text-base shrink-0">{item.icon}</span>
              <p className="text-xs text-slate-200 leading-relaxed break-words">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Milestone Achievements */}
      <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <Star className="w-4 h-4 text-amber-400" />
          <span>Your Achievements This Month</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: '6 Days Active', emoji: '🏃', done: true },
            { label: 'Drank 8L Water', emoji: '💧', done: true },
            { label: '2 kg Lost', emoji: '📉', done: true },
            { label: '10,000 Steps', emoji: '👟', done: false },
          ].map((ach) => (
            <div key={ach.label} className={`p-2.5 rounded-2xl border text-center space-y-1 ${ach.done ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800/40 border-slate-800 opacity-50'}`}>
              <div className="text-xl">{ach.emoji}</div>
              <p className="text-[9px] font-bold text-white leading-snug">{ach.label}</p>
              {ach.done && <CheckCircle2 className="w-3 h-3 text-amber-400 mx-auto" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessView;
