'use client';

import { useState } from 'react';
import { useAppDispatch } from '../lib/redux/hooks';
import { triggerAlert, setAlert, clearAlerts } from '../lib/redux/slices/alertSlice';
import { AlertType } from '../lib/redux/types/alertTypes';
import { 
  Send, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Layers, 
  Sparkles, 
  Trash2, 
  Zap, 
  Timer, 
  Code 
} from 'lucide-react';

export default function AlertTrigger() {
  const dispatch = useAppDispatch();

  // Custom Form State
  const [customMsg, setCustomMsg] = useState('User profile successfully updated in database!');
  const [customType, setCustomType] = useState<AlertType>('success');
  const [timeoutSeconds, setTimeoutSeconds] = useState(4);
  const [useThunk, setUseThunk] = useState(true);

  // Quick Action Call Presets
  const handleQuickSuccess = () => {
    dispatch(
      triggerAlert({
        msg: 'Authentication successful! Welcome back to Redux Dashboard.',
        alertType: 'success',
        timeout: 4000,
      })
    );
  };

  const handleQuickError = () => {
    dispatch(
      triggerAlert({
        msg: 'Error 500: Database connection timed out. Please try again.',
        alertType: 'danger',
        timeout: 5000,
      })
    );
  };

  const handleQuickWarning = () => {
    dispatch(
      triggerAlert({
        msg: 'Warning: Your access token will expire in 5 minutes.',
        alertType: 'warning',
        timeout: 4500,
      })
    );
  };

  const handleQuickInfo = () => {
    dispatch(
      triggerAlert({
        msg: 'System Notice: Redux Toolkit 2.x and React 19 are active.',
        alertType: 'info',
        timeout: 3500,
      })
    );
  };

  const handleBatchTrigger = () => {
    dispatch(
      triggerAlert({
        msg: 'Batch Task #1: Fetching user profile from REST API...',
        alertType: 'info',
        timeout: 3000,
      })
    );
    setTimeout(() => {
      dispatch(
        triggerAlert({
          msg: 'Batch Task #2: Synchronizing state to Redux Root Store...',
          alertType: 'warning',
          timeout: 4000,
        })
      );
    }, 400);
    setTimeout(() => {
      dispatch(
        triggerAlert({
          msg: 'Batch Task #3: All records successfully persisted!',
          alertType: 'success',
          timeout: 5000,
        })
      );
    }, 800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    if (useThunk) {
      // Async thunk action call
      dispatch(
        triggerAlert({
          msg: customMsg,
          alertType: customType,
          timeout: timeoutSeconds * 1000,
        })
      );
    } else {
      // Synchronous direct action call
      const id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 9);
        
      dispatch(
        setAlert({
          id,
          msg: customMsg,
          alertType: customType,
          timeout: timeoutSeconds * 1000,
          createdAt: Date.now(),
        })
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-zinc-900 border border-indigo-500/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Module 4 • Action Calling & Dispatching
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Alert Component & Action Call Playground
            </h2>
            <p className="text-zinc-300 text-sm mt-1 max-w-2xl">
              Dispatch actions to the Redux store from any frontend React component using the typed{' '}
              <code className="text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/60">
                useAppDispatch()
              </code>{' '}
              hook. Notice how the global Alert toast dynamically reflects state changes!
            </p>
          </div>

          <button
            onClick={() => dispatch(clearAlerts())}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-rose-950/80 border border-zinc-700 hover:border-rose-500/50 text-zinc-300 hover:text-rose-200 text-sm font-medium transition-all cursor-pointer shrink-0 shadow-lg"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            Clear All Alerts
          </button>
        </div>
      </div>

      {/* Preset Action Call Buttons */}
      <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-semibold text-white">
            Quick Action Dispatchers (One-Click Testing)
          </h3>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Click any preset button below to trigger real Redux action dispatches with auto-dismiss timers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Success Preset */}
          <button
            onClick={handleQuickSuccess}
            className="group flex flex-col items-start p-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 hover:border-emerald-500/60 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-emerald-950/30"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Success
              </span>
              <span className="text-[10px] font-mono text-emerald-500/80">4s timeout</span>
            </div>
            <p className="text-xs text-zinc-300 group-hover:text-white line-clamp-2">
              Dispatch: <code className="text-emerald-300 font-mono">SET_ALERT (success)</code>
            </p>
          </button>

          {/* Danger Preset */}
          <button
            onClick={handleQuickError}
            className="group flex flex-col items-start p-4 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-500/30 hover:border-rose-500/60 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-rose-950/30"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                <AlertOctagon className="w-4 h-4" />
                Danger / Error
              </span>
              <span className="text-[10px] font-mono text-rose-500/80">5s timeout</span>
            </div>
            <p className="text-xs text-zinc-300 group-hover:text-white line-clamp-2">
              Dispatch: <code className="text-rose-300 font-mono">SET_ALERT (danger)</code>
            </p>
          </button>

          {/* Warning Preset */}
          <button
            onClick={handleQuickWarning}
            className="group flex flex-col items-start p-4 rounded-xl bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 hover:border-amber-500/60 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-amber-950/30"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                Warning
              </span>
              <span className="text-[10px] font-mono text-amber-500/80">4.5s timeout</span>
            </div>
            <p className="text-xs text-zinc-300 group-hover:text-white line-clamp-2">
              Dispatch: <code className="text-amber-300 font-mono">SET_ALERT (warning)</code>
            </p>
          </button>

          {/* Info Preset */}
          <button
            onClick={handleQuickInfo}
            className="group flex flex-col items-start p-4 rounded-xl bg-sky-950/40 hover:bg-sky-950/70 border border-sky-500/30 hover:border-sky-500/60 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-sky-950/30"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
                <Info className="w-4 h-4" />
                Info
              </span>
              <span className="text-[10px] font-mono text-sky-500/80">3.5s timeout</span>
            </div>
            <p className="text-xs text-zinc-300 group-hover:text-white line-clamp-2">
              Dispatch: <code className="text-sky-300 font-mono">SET_ALERT (info)</code>
            </p>
          </button>

          {/* Batch Stacking Preset */}
          <button
            onClick={handleBatchTrigger}
            className="group flex flex-col items-start p-4 rounded-xl bg-purple-950/40 hover:bg-purple-950/70 border border-purple-500/30 hover:border-purple-500/60 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-purple-950/30"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Layers className="w-4 h-4" />
                Batch Burst
              </span>
              <span className="text-[10px] font-mono text-purple-400">3 Alerts</span>
            </div>
            <p className="text-xs text-zinc-300 group-hover:text-white line-clamp-2">
              Test sequential state immutability & stacking
            </p>
          </button>
        </div>
      </div>

      {/* Custom Action Dispatch Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Send className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">
              Custom Action Dispatcher Form
            </h3>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {/* Alert Message */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Alert Message Payload (<code className="text-indigo-400 font-mono">msg: string</code>)
              </label>
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Enter alert notification text..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                required
              />
            </div>

            {/* Alert Type Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['success', 'danger', 'warning', 'info'] as AlertType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setCustomType(type)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    customType === type
                      ? type === 'success'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
                        : type === 'danger'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20'
                        : type === 'warning'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-md shadow-sky-500/20'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  {type === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {type === 'danger' && <AlertOctagon className="w-3.5 h-3.5" />}
                  {type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                  {type === 'info' && <Info className="w-3.5 h-3.5" />}
                  {type}
                </button>
              ))}
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                <span className="flex items-center gap-1 font-semibold">
                  <Timer className="w-3.5 h-3.5 text-zinc-400" />
                  Auto-Dismiss Duration:
                </span>
                <span className="font-mono text-indigo-400 font-bold">
                  {timeoutSeconds === 0 ? 'Persistent (No auto-dismiss)' : `${timeoutSeconds} seconds`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={timeoutSeconds}
                onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                <span>0s (Manual close only)</span>
                <span>5s</span>
                <span>10s</span>
              </div>
            </div>

            {/* Dispatch Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
              <div>
                <span className="font-semibold text-zinc-200 block">Dispatch Mechanism:</span>
                <span className="text-zinc-400">
                  {useThunk
                    ? 'Async Thunk Creator (Handles UUID generation & setTimeout)'
                    : 'Synchronous Direct Dispatch (Raw Action Object)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setUseThunk(!useThunk)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border ${
                  useThunk
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}
              >
                {useThunk ? 'Redux Thunk' : 'Direct Action'}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Dispatch Action to Redux Store
            </button>
          </form>
        </div>

        {/* Code Snippet Reference Box */}
        <div className="lg:col-span-5 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-semibold text-white">How This Action Call Works</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-3">
              Under the hood, this component dispatches an action to the Redux store via:
            </p>

            <div className="bg-zinc-950 rounded-xl p-3.5 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 space-y-2 overflow-x-auto">
              <div className="text-zinc-500">// 1. Get the typed dispatch function</div>
              <div>
                <span className="text-purple-400">const</span> dispatch ={' '}
                <span className="text-sky-400">useAppDispatch</span>();
              </div>

              <div className="text-zinc-500 pt-1">// 2. Dispatch action creator</div>
              <div>
                dispatch(
                <div className="pl-4">
                  <span className="text-indigo-400">triggerAlert</span>({'{'}
                  <div className="pl-4 text-emerald-300">
                    msg: <span className="text-amber-300">"{customMsg.substring(0, 24)}..."</span>,
                  </div>
                  <div className="pl-4 text-emerald-300">
                    alertType: <span className="text-amber-300">"{customType}"</span>,
                  </div>
                  <div className="pl-4 text-emerald-300">
                    timeout: <span className="text-cyan-300">{timeoutSeconds * 1000}</span>
                  </div>
                  {'}'})
                </div>
                );
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300">
            💡 <strong>Component Subscription:</strong> The floating <code className="font-mono text-white">Alert.tsx</code> component automatically listens to <code className="font-mono text-white">state.alert.alerts</code> via <code className="font-mono text-white">useAppSelector()</code> and re-renders instantaneously when state updates!
          </div>
        </div>
      </div>
    </div>
  );
}

