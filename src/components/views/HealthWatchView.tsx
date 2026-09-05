import React, { useState } from 'react';
import {
  Watch,
  BatteryCharging,
  Wifi,
  Activity,
  Heart,
  Moon,
  Footprints,
  Shield,
  RefreshCw,
  Bluetooth,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { WatchTelemetry } from '../../types';

interface HealthWatchViewProps {
  watch: WatchTelemetry;
  onSyncWatchData: () => Promise<void>;
  onPairNewDevice: () => void;
}

export const HealthWatchView: React.FC<HealthWatchViewProps> = ({
  watch,
  onSyncWatchData,
  onPairNewDevice
}) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleManualWatchSync = async () => {
    setIsSyncing(true);
    await onSyncWatchData();
    setIsSyncing(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Smart Health Watch Integration</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              BLE Telemetry SDK
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized Bluetooth Low Energy (BLE) abstraction layer for clinical wearables.
          </p>
        </div>

        <button
          onClick={handleManualWatchSync}
          disabled={isSyncing}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Polling Device...' : 'Sync BLE Stream'}</span>
        </button>
      </div>

      {/* Paired Device Status Card */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Watch className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{watch.deviceName}</h3>
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Bluetooth className="w-3 h-3" />
                  <span>Paired & Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hardware ID: <code className="text-teal-400">{watch.deviceId}</code> • Firmware v2.4.1
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800 px-3 py-2 rounded-xl text-xs">
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-bold">{watch.batteryLevel}%</span>
              <span className="text-slate-400">Battery</span>
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry Stream Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Continuous Heart Rate */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Current Heart Rate</span>
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">{watch.heartRateCurrent} <span className="text-xs text-slate-400">bpm</span></p>
            <p className="text-[10px] text-emerald-400">Normal Sinus Rhythm</p>
          </div>

          {/* Daily Step Count */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Steps Today</span>
              <Footprints className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">{watch.stepsToday.toLocaleString()}</p>
            <p className="text-[10px] text-slate-400">Target: 8,000 steps</p>
          </div>

          {/* Sleep Tracking */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Sleep Duration</span>
              <Moon className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">{watch.sleepHours} <span className="text-xs text-slate-400">hrs</span></p>
            <p className="text-[10px] text-teal-400">Deep Sleep: 2.1 hrs</p>
          </div>

          {/* Continuous Blood Oxygen */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Pulse Oximetry</span>
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">{watch.spO2Current}%</p>
            <p className="text-[10px] text-emerald-400">Optimal Oxygenation</p>
          </div>
        </div>
      </div>

      {/* Integration Architecture Disclaimer & SDK Documentation */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white">Clinical Wearables Integration Architecture</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          VitaNova Clinic utilizes a standardized Web Bluetooth API & GATT Service interface (<code className="text-teal-400">0x180D Heart Rate</code> and <code className="text-teal-400">0x1822 Pulse Oximeter</code>). Device readings stream directly into device IndexedDB buffers without requiring internet, and synchronize to the clinician EMR when connectivity is available.
        </p>
      </div>
    </div>
  );
};
