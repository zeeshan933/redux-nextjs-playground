'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../lib/redux/hooks';
import { clearAlerts } from '../lib/redux/slices/alertSlice';
import { 
  Activity, 
  Database, 
  Copy, 
  Check, 
  Trash2, 
  Layers, 
  Clock, 
  Terminal 
} from 'lucide-react';

export default function ReduxStoreInspector() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const actionLog = useAppSelector((state) => state.alert.actionLog);
  const [copied, setCopied] = useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(0);

  const handleCopyState = () => {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActionBadgeStyle = (type: string) => {
    if (type.includes('SET_ALERT')) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    if (type.includes('REMOVE_ALERT')) {
      return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
    if (type.includes('CLEAR_ALERTS')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4" />
              DevTools & State Inspector
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Live Redux Store & Action Stream
            </h2>
            <p className="text-zinc-300 text-sm mt-1">
              Observe state transitions and dispatched actions in real-time as you trigger alerts across the application.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyState}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-zinc-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy State JSON
                </>
              )}
            </button>

            <button
              onClick={() => dispatch(clearAlerts())}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-950/80 text-rose-300 hover:text-rose-100 text-xs font-semibold transition-colors cursor-pointer border border-rose-500/30"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: State Tree on Left, Action History on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Redux State Tree */}
        <div className="lg:col-span-6 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Current Root State Tree</h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              Active Alerts: <strong className="text-white">{state.alert.alerts.length}</strong>
            </span>
          </div>

          <div className="flex-1 bg-zinc-950 rounded-xl p-4 border border-zinc-800/80 font-mono text-xs overflow-auto max-h-[450px]">
            <pre className="text-emerald-300 whitespace-pre">
              {JSON.stringify(
                {
                  alert: {
                    alerts: state.alert.alerts,
                    totalDispatchedCount: actionLog.length,
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        {/* Right: Dispatched Action History Stream */}
        <div className="lg:col-span-6 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Action Dispatch History</h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              Total Logged: <strong className="text-white">{actionLog.length}</strong>
            </span>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto max-h-[450px] pr-1">
            {actionLog.map((log, index) => {
              const isSelected = selectedActionIndex === index;
              return (
                <div
                  key={log.id + index}
                  onClick={() => setSelectedActionIndex(isSelected ? null : index)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-950 border-indigo-500/60 ring-1 ring-indigo-500/30'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getActionBadgeStyle(
                        log.type
                      )}`}
                    >
                      {log.type}
                    </span>
                    <span
                      className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono"
                      suppressHydrationWarning
                    >
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {log.timestamp}
                    </span>
                  </div>

                  {log.payload && typeof log.payload === 'object' && (
                    <div className="mt-2 pt-2 border-t border-zinc-800/80 bg-zinc-900/90 rounded-lg p-2 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                      <pre className="text-sky-300">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

