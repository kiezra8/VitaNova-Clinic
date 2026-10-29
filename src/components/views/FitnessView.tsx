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
  Droplets,
  Heart,
  Trophy,
  Star,
  Footprints,
  Plus,
  Save
} from 'lucide-react';

interface FitnessViewProps {
  onNavigateVitals?: () => void;
}

export const FitnessView: React.FC<FitnessViewProps> = ({ onNavigateVitals }) => {
  const [activeGoal, setActiveGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');
  const [currentWeight, setCurrentWeight] = useState<string>(() => localStorage.getItem('vitanova_curr_weight') || '');
  const [targetWeight, setTargetWeight] = useState<string>(() => localStorage.getItem('vitanova_target_weight') || '');

  // Weekly steps log — user-driven
  const [weeklySteps, setWeeklySteps] = useState<{ day: string; steps: number; cals: number }[]>(() => {
    try { return JSON.parse(localStorage.getItem('vitanova_weekly_steps') || '[]'); } catch { return []; }
  });
  const [todaySteps, setTodaySteps] = useState<string>('');
  const [todayCals, setTodayCals] = useState<string>('');
  const [showLogForm, setShowLogForm] = useState<boolean>(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayIndex = new Date().getDay(); // 0=Sun..6=Sat
  const todayLabel = days[dayIndex === 0 ? 6 : dayIndex - 1];

  const handleSaveWeights = () => {
    localStorage.setItem('vitanova_curr_weight', currentWeight);
    localStorage.setItem('vitanova_target_weight', targetWeight);
  };

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const steps = parseInt(todaySteps) || 0;
    const cals = parseInt(todayCals) || 0;
    const existing = weeklySteps.findIndex(d => d.day === todayLabel);
    let updated: { day: string; steps: number; cals: number }[];
    if (existing >= 0) {
      updated = weeklySteps.map((d, i) => i === existing ? { ...d, steps, cals } : d);
    } else {
      updated = [...weeklySteps, { day: todayLabel, steps, cals }].slice(-7);
    }
    setWeeklySteps(updated);
    localStorage.setItem('vitanova_weekly_steps', JSON.stringify(updated));
    setTodaySteps('');
    setTodayCals('');
    setShowLogForm(false);
  };

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

  const currentWeightNum = parseFloat(currentWeight);
  const targetWeightNum = parseFloat(targetWeight);
  const weightDiff = (!isNaN(currentWeightNum) && !isNaN(targetWeightNum)) ? currentWeightNum - targetWeightNum : null;
  const progressPercent = (weightDiff !== null && currentWeightNum > 0)
    ? Math.min(100, Math.max(0, 100 - (weightDiff / currentWeightNum) * 100 * 3))
    : 0;
  const maxSteps = weeklySteps.length > 0 ? Math.max(...weeklySteps.map(d => d.steps), 1) : 1;
  const totalSteps = weeklySteps.reduce((sum, d) => sum + d.steps, 0);
  const avgSteps = weeklySteps.length > 0 ? Math.round(totalSteps / weeklySteps.length) : 0;
  const avgCals = weeklySteps.length > 0 ? Math.round(weeklySteps.reduce((s, d) => s + d.cals, 0) / weeklySteps.length) : 0;

  return (
    <div className="space-y-5 pb-24 max-w-full overflow-x-hidden bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-white border border-emerald-100 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Fitness & Wellness Journey</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>Ugandan Lifestyle Programme</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Your Fitness & Wellness Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Set your personal goal, log daily activity, follow Ugandan-friendly nutrition advice, and track your progress — all guided by our clinical team.
          </p>
        </div>
      </div>

      {/* Goal Selector */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Target className="w-4 h-4 text-emerald-500" />
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
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900'
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
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Current Weight</label>
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <Scale className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="number"
                placeholder="e.g. 72"
                value={currentWeight}
                onChange={e => setCurrentWeight(e.target.value)}
                onBlur={handleSaveWeights}
                className="bg-transparent text-slate-900 text-sm font-bold w-full focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 shrink-0">kg</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Target Weight</label>
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <input
                type="number"
                placeholder="e.g. 65"
                value={targetWeight}
                onChange={e => setTargetWeight(e.target.value)}
                onBlur={handleSaveWeights}
                className="bg-transparent text-slate-900 text-sm font-bold w-full focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 shrink-0">kg</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {weightDiff !== null && weightDiff > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Progress to goal</span>
              <span className="font-bold text-emerald-600">{weightDiff.toFixed(1)} kg to go</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-teal-500" />
            <span>This Week's Activity</span>
          </h2>
          <button
            onClick={() => setShowLogForm(f => !f)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Today</span>
          </button>
        </div>

        {/* Log Today Form */}
        {showLogForm && (
          <form onSubmit={handleLogActivity} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-xs font-semibold text-slate-700">Log today's activity ({todayLabel})</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Steps today</label>
                <input
                  type="number"
                  placeholder="e.g. 8000"
                  value={todaySteps}
                  onChange={e => setTodaySteps(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Calories burned</label>
                <input
                  type="number"
                  placeholder="e.g. 200"
                  value={todayCals}
                  onChange={e => setTodayCals(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button type="button" onClick={() => setShowLogForm(false)} className="px-3 py-1.5 text-xs text-slate-500 font-semibold">Cancel</button>
              <button type="submit" className="flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold">
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </form>
        )}

        {/* Step Bars */}
        {weeklySteps.length > 0 ? (
          <>
            <div className="flex items-end justify-between space-x-1.5 h-20">
              {weeklySteps.map((day) => {
                const height = (day.steps / maxSteps) * 100;
                return (
                  <div key={day.day} className="flex flex-col items-center flex-1 space-y-1">
                    <div className="relative w-full rounded-t-lg overflow-hidden" style={{ height: '56px' }}>
                      <div
                        className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400"
                        style={{ height: `${height}%`, minHeight: '4px' }}
                      />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500">{day.day}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
              <div className="text-center">
                <p className="text-base font-extrabold text-slate-900">{avgSteps.toLocaleString()}</p>
                <p className="text-[10px] text-slate-500">Avg Steps/Day</p>
              </div>
              <div className="text-center">
                <p className="text-base font-extrabold text-emerald-600">~{avgCals}</p>
                <p className="text-[10px] text-slate-500">Avg kcal Burned</p>
              </div>
              <div className="text-center">
                <p className="text-base font-extrabold text-teal-600">{weeklySteps.length}</p>
                <p className="text-[10px] text-slate-500">Active Days</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No activity logged yet. Tap <strong className="text-slate-600">Log Today</strong> to start tracking your steps!
          </div>
        )}
      </div>

      {/* Workout Plans */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Recommended Workouts</span>
          </h2>
          <span className="text-[10px] text-slate-400">Kampala-friendly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {workoutPlans.map((plan) => {
            const IconComp = plan.icon;
            return (
              <div key={plan.title} className={`p-4 rounded-2xl border ${plan.bgColor} space-y-2.5 bg-white`}>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-white/70 flex items-center justify-center border border-slate-100">
                    <IconComp className={`w-4.5 h-4.5 ${plan.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{plan.title}</p>
                    <p className="text-[10px] text-slate-500">{plan.intensity} intensity</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-600">⏱ {plan.duration}</span>
                  <span className="font-bold text-emerald-600">🔥 {plan.calories}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ugandan Nutrition Tips */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Apple className="w-4 h-4 text-emerald-500" />
          <span>Ugandan Nutrition & Healthy Eating Guide</span>
        </h2>
        <div className="space-y-2">
          {nutritionTips.map((item, i) => (
            <div key={i} className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-base shrink-0">{item.icon}</span>
              <p className="text-xs text-slate-700 leading-relaxed break-words">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-r from-amber-50 to-white border border-amber-100 rounded-3xl p-5 space-y-3 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <Star className="w-4 h-4 text-amber-500" />
          <span>Your Achievements This Month</span>
        </h2>
        {weeklySteps.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">
            Complete your first week of activity to earn achievements! 🏆
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: `${weeklySteps.length} Days Active`, emoji: '🏃', done: weeklySteps.length >= 3 },
              { label: `${(totalSteps / 1000).toFixed(0)}k Total Steps`, emoji: '👟', done: totalSteps >= 10000 },
              { label: avgCals > 0 ? `~${avgCals} kcal/day` : 'Log Calories', emoji: '🔥', done: avgCals > 100 },
              { label: weightDiff !== null && weightDiff <= 0 ? 'Goal Reached!' : 'Goal Set', emoji: '🎯', done: currentWeight !== '' && targetWeight !== '' },
            ].map((ach) => (
              <div key={ach.label} className={`p-2.5 rounded-2xl border text-center space-y-1 ${ach.done ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <div className="text-xl">{ach.emoji}</div>
                <p className="text-[9px] font-bold text-slate-800 leading-snug">{ach.label}</p>
                {ach.done && <CheckCircle2 className="w-3 h-3 text-amber-500 mx-auto" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessView;
