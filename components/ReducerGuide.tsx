'use client';

import { useState } from 'react';
import { Terminal, Code, Cpu, Sparkles, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import CodeViewer from './CodeViewer';

export default function ReducerGuide() {
  const [selectedView, setSelectedView] = useState<'rtk' | 'classic'>('rtk');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4" />
          Module 3 • State Architecture
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Alert Reducer, Action & Types
        </h2>
        <p className="text-zinc-300 text-sm mt-2 max-w-3xl leading-relaxed">
          The Alert system in Redux demonstrates how global UI notifications are managed. It consists of <strong>Action Types</strong> (unique identifiers), <strong>Action Creators & Thunks</strong> (dispatches with payloads and timers), and a <strong>Reducer</strong> (calculates the new immutable state array).
        </p>
      </div>

      {/* 3 Core Pillars of Alert System */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
              <Code className="w-4 h-4" />
              1. Action Types
            </div>
            <h3 className="text-sm font-bold text-white mb-2">
              Constants & Interfaces
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Action types act as unique names that prevent spelling typos and define the TypeScript shape for each action payload.
            </p>
          </div>
          <div className="mt-4 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-purple-300">
            SET_ALERT, REMOVE_ALERT
          </div>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
              2. Action Creators & Thunks
            </div>
            <h3 className="text-sm font-bold text-white mb-2">
              Payload & Auto-Timeout
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Functions that generate random UUIDs, build the alert object, dispatch <code className="text-emerald-300 font-mono">SET_ALERT</code>, and set a timer for <code className="text-rose-300 font-mono">REMOVE_ALERT</code>.
            </p>
          </div>
          <div className="mt-4 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-emerald-300">
            triggerAlert(msg, type, timeout)
          </div>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
              <Cpu className="w-4 h-4" />
              3. Pure Reducer
            </div>
            <h3 className="text-sm font-bold text-white mb-2">
              Immutable State Updates
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Handles incoming actions. For <code className="text-emerald-300 font-mono">SET_ALERT</code>, returns <code className="text-sky-300 font-mono">[...state, payload]</code>. For <code className="text-rose-300 font-mono">REMOVE_ALERT</code>, filters out the ID.
            </p>
          </div>
          <div className="mt-4 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-sky-300">
            alerts.filter(a =&gt; a.id !== id)
          </div>
        </div>
      </div>

      {/* Comparison: RTK Slice vs Classic Reducer */}
      <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Modern Redux Toolkit Slice vs. Classic Redux
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Redux Toolkit modernizes Redux by drastically cutting boilerplate while keeping the exact same core state principles.
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0">
            <button
              onClick={() => setSelectedView('rtk')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedView === 'rtk'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Modern Redux Toolkit
            </button>
            <button
              onClick={() => setSelectedView('classic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedView === 'classic'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Classic Redux Pattern
            </button>
          </div>
        </div>

        {selectedView === 'rtk' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Why RTK is the Modern Standard
              </h4>
              <ul className="text-xs text-zinc-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>createSlice()</strong> automatically generates action creators and action types for you.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Includes <strong>Immer</strong> internally: you write intuitive mutating syntax (`state.alerts.push()`) and Immer translates it to safe immutable updates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>createAsyncThunk</strong> provides clean lifecycle action dispatching for async workflows.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 overflow-x-auto">
              <pre className="text-indigo-300">
{`// Redux Toolkit Slice
const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alerts.push(action.payload); // Immer handles immutability!
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
    }
  }
});`}
              </pre>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Classic Redux Architecture
              </h4>
              <ul className="text-xs text-zinc-300 space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Requires manual action type strings (<code className="font-mono text-amber-300">SET_ALERT = &apos;SET_ALERT&apos;</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Explicit switch-case statements inside pure reducer functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Manual spread operators (<code className="font-mono text-amber-300">&#123; ...state, alerts: [...state.alerts, action.payload] &#125;</code>) to preserve immutability.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 overflow-x-auto">
              <pre className="text-amber-300">
{`// Classic Redux Reducer
function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(a => a.id !== action.payload)
      };
    default:
      return state;
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Code Inspector */}
      <div>
        <h3 className="text-base font-bold text-white mb-3">
          Explore Reducer, Types & Actions Code
        </h3>
        <CodeViewer initialTab="slice" />
      </div>
    </div>
  );
}
