import React, { useState } from 'react';
import {
  Activity,
  Plus,
  Heart,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Calendar,
  X,
  FileText
} from 'lucide-react';
import { VitalRecord, SyncStatus, UserRole } from '../../types';

interface VitalsChartsViewProps {
  vitals: VitalRecord[];
  onAddVital: (vital: Omit<VitalRecord, 'id' | 'syncStatus'>) => Promise<void>;
  networkState: string;
}

type TimeRange = 'today' | '7d' | '30d' | '6m' | '1y';

export const VitalsChartsView: React.FC<VitalsChartsViewProps> = ({
  vitals,
  onAddVital,
  networkState
}) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'bp' | 'glucose' | 'hr' | 'spo2'>('bp');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Vital Form State
  const [systolic, setSystolic] = useState<string>('130');
  const [diastolic, setDiastolic] = useState<string>('84');
  const [glucose, setGlucose] = useState<string>('5.2');
  const [glucoseType, setGlucoseType] = useState<'fasting' | 'post-prandial' | 'random'>('fasting');
  const [heartRate, setHeartRate] = useState<string>('72');
  const [temperature, setTemperature] = useState<string>('36.6');
  const [weight, setWeight] = useState<string>('67.5');
  const [spO2, setSpO2] = useState<string>('99');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddVital({
        patientId: 'pat_sarah_001',
        timestamp: new Date().toISOString(),
        systolicBP: systolic ? parseInt(systolic, 10) : undefined,
        diastolicBP: diastolic ? parseInt(diastolic, 10) : undefined,
        bloodGlucose: glucose ? parseFloat(glucose) : undefined,
        glucoseType,
        heartRate: heartRate ? parseInt(heartRate, 10) : undefined,
        temperature: temperature ? parseFloat(temperature) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        spO2: spO2 ? parseInt(spO2, 10) : undefined,
        notes: notes.trim() || undefined,
        recordedBy: 'Sarah Namubiru',
        recordedByRole: 'patient',
        deviceId: 'local_device'
      });
      setShowAddModal(false);
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter vitals based on time range
  const now = Date.now();
  const filteredVitals = vitals.filter((v) => {
    const time = new Date(v.timestamp).getTime();
    switch (selectedRange) {
      case 'today':
        return now - time <= 86400000;
      case '7d':
        return now - time <= 7 * 86400000;
      case '30d':
        return now - time <= 30 * 86400000;
      case '6m':
        return now - time <= 180 * 86400000;
      case '1y':
        return now - time <= 365 * 86400000;
      default:
        return true;
    }
  }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Helper to render SVG line chart
  const renderChart = () => {
    if (filteredVitals.length === 0) {
      return (
        <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs">
          <Calendar className="w-8 h-8 mb-2 opacity-40" />
          <span>No vital records in this timeframe.</span>
        </div>
      );
    }

    const width = 600;
    const height = 180;
    const padding = 30;

    let points: { x: number; y: number; val: number; label: string; date: string; isPending: boolean }[] = [];
    let points2: { x: number; y: number; val: number }[] = []; // for diastolic BP

    if (selectedMetric === 'bp') {
      const valid = filteredVitals.filter(v => v.systolicBP && v.diastolicBP);
      if (valid.length === 0) return null;
      const minVal = 60;
      const maxVal = 180;
      const stepX = valid.length > 1 ? (width - padding * 2) / (valid.length - 1) : 0;

      points = valid.map((v, i) => {
        const x = valid.length === 1 ? width / 2 : padding + i * stepX;
        const y = height - padding - ((v.systolicBP! - minVal) / (maxVal - minVal)) * (height - padding * 2);
        return {
          x,
          y,
          val: v.systolicBP!,
          label: `${v.systolicBP}/${v.diastolicBP}`,
          date: new Date(v.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
          isPending: v.syncStatus === 'pending'
        };
      });

      points2 = valid.map((v, i) => {
        const x = valid.length === 1 ? width / 2 : padding + i * stepX;
        const y = height - padding - ((v.diastolicBP! - minVal) / (maxVal - minVal)) * (height - padding * 2);
        return { x, y, val: v.diastolicBP! };
      });
    } else if (selectedMetric === 'glucose') {
      const valid = filteredVitals.filter(v => v.bloodGlucose);
      const minVal = 3.0;
      const maxVal = 12.0;
      const stepX = valid.length > 1 ? (width - padding * 2) / (valid.length - 1) : 0;

      points = valid.map((v, i) => {
        const x = valid.length === 1 ? width / 2 : padding + i * stepX;
        const y = height - padding - ((v.bloodGlucose! - minVal) / (maxVal - minVal)) * (height - padding * 2);
        return {
          x,
          y,
          val: v.bloodGlucose!,
          label: `${v.bloodGlucose} mmol/L`,
          date: new Date(v.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
          isPending: v.syncStatus === 'pending'
        };
      });
    } else if (selectedMetric === 'hr') {
      const valid = filteredVitals.filter(v => v.heartRate);
      const minVal = 50;
      const maxVal = 120;
      const stepX = valid.length > 1 ? (width - padding * 2) / (valid.length - 1) : 0;

      points = valid.map((v, i) => {
        const x = valid.length === 1 ? width / 2 : padding + i * stepX;
        const y = height - padding - ((v.heartRate! - minVal) / (maxVal - minVal)) * (height - padding * 2);
        return {
          x,
          y,
          val: v.heartRate!,
          label: `${v.heartRate} bpm`,
          date: new Date(v.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
          isPending: v.syncStatus === 'pending'
        };
      });
    }

    const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
    const pathD2 = points2.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');

    return (
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 select-none">
          {/* Target Zone Guide Line for BP */}
          {selectedMetric === 'bp' && (
            <line
              x1={padding}
              y1={height - padding - ((130 - 60) / (180 - 60)) * (height - padding * 2)}
              x2={width - padding}
              y2={height - padding - ((130 - 60) / (180 - 60)) * (height - padding * 2)}
              stroke="#10b981"
              strokeDasharray="4 4"
              strokeWidth="1"
              opacity="0.4"
            />
          )}

          {/* Secondary Path for Diastolic */}
          {points2.length > 0 && (
            <path d={pathD2} fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3 3" />
          )}

          {/* Primary Path */}
          <path d={pathD} fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />

          {/* Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={p.isPending ? "5" : "4"}
                fill={p.isPending ? "#f59e0b" : "#0d9488"}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x={p.x} y={p.y - 10} fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">
                {p.val}
              </text>
              <text x={p.x} y={height - 8} fill="#64748b" fontSize="8" textAnchor="middle">
                {p.date}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Record Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Vitals & Clinical Trends</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Offline IndexedDB
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Recorded locally with zero-latency. Synchronizes automatically when online.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Vitals</span>
        </button>
      </div>

      {/* Metric Selector & Chart Card */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-6 space-y-4">
        {/* Metric Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedMetric('bp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedMetric === 'bp' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setSelectedMetric('glucose')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedMetric === 'glucose' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Blood Glucose
            </button>
            <button
              onClick={() => setSelectedMetric('hr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedMetric === 'hr' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Heart Rate
            </button>
          </div>

          {/* Time Range Filters: Today, 7d, 30d, 6m, 1y */}
          <div className="flex bg-slate-800 p-0.5 rounded-lg text-[11px] font-medium text-slate-400">
            {(['today', '7d', '30d', '6m', '1y'] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  selectedRange === r ? 'bg-slate-700 text-white font-bold' : 'hover:text-slate-200'
                }`}
              >
                {r === 'today' ? 'Today' : r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chart Display */}
        {renderChart()}

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span>
              <span>Primary Trend</span>
            </span>
            {selectedMetric === 'bp' && (
              <>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-300 inline-block"></span>
                  <span>Diastolic (dashed)</span>
                </span>
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <span className="w-2.5 h-0.5 bg-emerald-400 inline-block"></span>
                  <span>Target (&lt;130 mmHg)</span>
                </span>
              </>
            )}
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>Pending Sync</span>
            </span>
          </div>

          <span className="text-[10px] text-slate-500">Local Chart Engine</span>
        </div>
      </div>

      {/* Clinical Safety Disclaimer (Mandatory) */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Clinical Safety Notice:</strong> Automated trends and vital statistics are provided solely for personal tracking and clinical reference. They do not constitute an automated medical diagnosis. For clinical symptoms or persistent abnormal readings, contact your physician.
        </p>
      </div>

      {/* Vitals History Log Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight">Recorded Vitals History</h2>
        <div className="space-y-2">
          {vitals.map((vital) => (
            <div
              key={vital.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-white">
                    BP: {vital.systolicBP && vital.diastolicBP ? `${vital.systolicBP}/${vital.diastolicBP} mmHg` : '—'}
                  </span>
                  {vital.bloodGlucose && (
                    <span className="text-xs text-slate-300">
                      Glucose: <strong className="text-teal-400">{vital.bloodGlucose} mmol/L</strong> ({vital.glucoseType})
                    </span>
                  )}
                  {vital.heartRate && (
                    <span className="text-xs text-slate-300">
                      HR: <strong className="text-rose-400">{vital.heartRate} bpm</strong>
                    </span>
                  )}
                  {vital.spO2 && (
                    <span className="text-xs text-slate-300">
                      SpO2: <strong className="text-blue-400">{vital.spO2}%</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{new Date(vital.timestamp).toLocaleString()}</span>
                  <span>•</span>
                  <span>Recorded by: {vital.recordedBy} ({vital.recordedByRole})</span>
                </div>

                {vital.notes && (
                  <p className="text-xs text-slate-300 italic pt-1">
                    "{vital.notes}"
                  </p>
                )}
              </div>

              {/* Sync Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    vital.syncStatus === 'synced'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : vital.syncStatus === 'pending'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                  }`}
                >
                  {vital.syncStatus === 'synced' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Synced</span>
                    </>
                  ) : vital.syncStatus === 'pending' ? (
                    <>
                      <RefreshCw className="w-3 h-3 text-amber-400" />
                      <span>Pending sync</span>
                    </>
                  ) : (
                    <span>{vital.syncStatus}</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record New Vitals Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Record Vitals Offline</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Blood Pressure */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Blood Pressure (mmHg)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Systolic (e.g. 130)"
                      value={systolic}
                      onChange={(e) => setSystolic(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-[10px] text-slate-400">Systolic</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Diastolic (e.g. 84)"
                      value={diastolic}
                      onChange={(e) => setDiastolic(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-[10px] text-slate-400">Diastolic</span>
                  </div>
                </div>
              </div>

              {/* Blood Glucose & Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Blood Glucose (mmol/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 5.2"
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Timing
                  </label>
                  <select
                    value={glucoseType}
                    onChange={(e) => setGlucoseType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="fasting">Fasting</option>
                    <option value="random">Random</option>
                    <option value="post-prandial">Post-prandial</option>
                  </select>
                </div>
              </div>

              {/* Heart Rate & SpO2 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 72"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 99"
                    value={spO2}
                    onChange={(e) => setSpO2(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Temperature & Weight */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 36.6"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 67.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Clinical Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notes / Symptoms
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Taken after 5 mins rest. No headache."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95"
                >
                  {isSubmitting ? 'Saving Locally...' : 'Save Vitals'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
