import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  Circle,
  Scale,
  Footprints,
  RotateCcw,
  Activity,
  Heart,
  Dumbbell,
  Flame,
  ShieldCheck
} from 'lucide-react';

interface FitnessViewProps {
  onNavigateVitals?: () => void;
}

interface FitnessGoal {
  id: string;
  title: string;
  desc: string;
  icon: any;
  tasks: string[];
}

const FITNESS_GOALS: FitnessGoal[] = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    desc: 'Daily walking, hydration, and portion control',
    icon: Flame,
    tasks: [
      '30-minute brisk walk or continuous movement',
      'Drink 2 to 3 liters of clean water',
      'Avoid sodas and sweetened drinks today',
      'Fill half your plate with leafy greens or vegetables'
    ]
  },
  {
    id: 'strength',
    title: 'Build Strength & Tone',
    desc: 'Simple bodyweight exercises and core training',
    icon: Dumbbell,
    tasks: [
      '3 sets of 12 bodyweight squats',
      '3 sets of push-ups (incline or standard)',
      '3 sets of 30-second core planks',
      'Eat a protein source with each main meal'
    ]
  },
  {
    id: 'heart-health',
    title: 'Heart Health & Cardio',
    desc: 'Aerobic movement and cardiovascular wellness',
    icon: Heart,
    tasks: [
      '25 minutes of steady aerobic activity (fast walking or jogging)',
      'Take stairs instead of the lift when possible',
      '5 minutes of relaxed diaphragmatic breathing',
      'Keep added salt and stock cubes minimal today'
    ]
  },
  {
    id: 'daily-steps',
    title: 'Daily Steps & Movement',
    desc: 'Active lifestyle and posture breaks',
    icon: Footprints,
    tasks: [
      'Reach at least 8,000 steps today',
      'Stand up and walk around 2 minutes every hour',
      '10-minute morning body stretch',
      'Short 15-minute evening stroll after dinner'
    ]
  },
  {
    id: 'flexibility',
    title: 'Flexibility & Back Care',
    desc: 'Joint mobility, posture relief, and stretching',
    icon: Activity,
    tasks: [
      '10-minute morning spine, hamstring, and hip stretches',
      'Midday neck and shoulder posture reset',
      '20-minute easy walk without rushing',
      'Gentle lower-back release stretches before bed'
    ]
  }
];

export const FitnessView: React.FC<FitnessViewProps> = () => {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(() => {
    return localStorage.getItem('vitanova_fitness_goal') || null;
  });

  const todayKey = new Date().toISOString().slice(0, 10);

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`vitanova_tasks_${todayKey}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentWeight, setCurrentWeight] = useState<string>(() => {
    return localStorage.getItem('vitanova_logged_weight') || '';
  });

  const [stepsToday, setStepsToday] = useState<string>(() => {
    return localStorage.getItem(`vitanova_steps_${todayKey}`) || '';
  });

  const selectedGoal = FITNESS_GOALS.find((g) => g.id === selectedGoalId);

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    localStorage.setItem('vitanova_fitness_goal', goalId);
  };

  const handleResetGoal = () => {
    setSelectedGoalId(null);
    localStorage.removeItem('vitanova_fitness_goal');
  };

  const handleToggleTask = (taskIndex: number) => {
    const updated = {
      ...completedTasks,
      [taskIndex]: !completedTasks[taskIndex]
    };
    setCompletedTasks(updated);
    try {
      localStorage.setItem(`vitanova_tasks_${todayKey}`, JSON.stringify(updated));
    } catch (_) {}
  };

  const handleSaveWeight = (val: string) => {
    setCurrentWeight(val);
    localStorage.setItem('vitanova_logged_weight', val);
  };

  const handleSaveSteps = (val: string) => {
    setStepsToday(val);
    localStorage.setItem(`vitanova_steps_${todayKey}`, val);
  };

  return (
    <div className="space-y-6 pb-28 text-slate-900 bg-white min-h-screen">
      {/* ── HEADER ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Fitness & Daily Routine
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Select your goal and follow a simple, practical daily plan.
            </p>
          </div>

          {selectedGoal && (
            <button
              onClick={handleResetGoal}
              className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Goal</span>
            </button>
          )}
        </div>
      </div>

      {/* ── EMPTY STATE: SELECT A GOAL ── */}
      {!selectedGoal ? (
        <div className="space-y-4 max-w-2xl mx-auto py-4">
          <div className="text-center space-y-1">
            <h2 className="text-base font-bold text-slate-900">Choose your health goal</h2>
            <p className="text-xs text-slate-500">Pick one to load your personalized daily routine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {FITNESS_GOALS.map((g) => {
              const Icon = g.icon;
              return (
                <button
                  key={g.id}
                  onClick={() => handleSelectGoal(g.id)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all text-left flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── ACTIVE PLAN: SIMPLE DAILY CHECKLIST ── */
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Current Goal Badge */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Active Goal
                </span>
                <h3 className="text-sm font-bold text-slate-900">{selectedGoal.title}</h3>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Today's Routine</h3>
                <p className="text-xs text-slate-500">Tap to check off tasks as you complete them.</p>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {Object.values(completedTasks).filter(Boolean).length} / {selectedGoal.tasks.length} done
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {selectedGoal.tasks.map((task, idx) => {
                const isDone = !!completedTasks[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleTask(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : ''}`}>
                      {task}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics (Weight & Steps) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <Scale className="w-3.5 h-3.5 text-teal-600" />
                <span>Weight (kg)</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 70"
                value={currentWeight}
                onChange={(e) => handleSaveWeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <Footprints className="w-3.5 h-3.5 text-teal-600" />
                <span>Steps Today</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 6500"
                value={stepsToday}
                onChange={(e) => handleSaveSteps(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};