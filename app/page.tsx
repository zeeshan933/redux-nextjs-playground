'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import AlertTrigger from '../components/AlertTrigger';
import ReduxGistVisualizer from '../components/ReduxGistVisualizer';
import StoreCreationGuide from '../components/StoreCreationGuide';
import ReducerGuide from '../components/ReducerGuide';
import ReduxStoreInspector from '../components/ReduxStoreInspector';
import { Sparkles, BookOpen, Layers, Terminal, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('playground');

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sticky Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab 1: Interactive Playground */}
        {activeTab === 'playground' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Overview Hero */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <button
                onClick={() => setActiveTab('gist')}
                className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-indigo-400">01</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="font-semibold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  The Gist Of Redux
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Unidirectional cycle & 3 core principles.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-purple-400">02</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors">
                  Creating Redux Store
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Next.js App Router StoreProvider & hooks.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('reducers')}
                className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-sky-400">03</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 transition-colors" />
                </div>
                <div className="font-semibold text-sm text-white group-hover:text-sky-300 transition-colors">
                  Reducer, Actions & Types
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  SET_ALERT, auto-timeouts & pure reducers.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('inspector')}
                className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-emerald-400">04</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="font-semibold text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Live DevTools Inspector
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Real-time state tree & action log stream.
                </p>
              </button>
            </div>

            {/* Action Calling Interactive Form & Presets */}
            <AlertTrigger />

            {/* Live State & Dispatched Stream */}
            <ReduxStoreInspector />
          </div>
        )}

        {/* Tab 2: The Gist Of Redux */}
        {activeTab === 'gist' && (
          <div className="animate-fadeIn">
            <ReduxGistVisualizer />
          </div>
        )}

        {/* Tab 3: Creating a Redux Store */}
        {activeTab === 'store' && (
          <div className="animate-fadeIn">
            <StoreCreationGuide />
          </div>
        )}

        {/* Tab 4: Alert Reducer, Action & Types */}
        {activeTab === 'reducers' && (
          <div className="animate-fadeIn">
            <ReducerGuide />
          </div>
        )}

        {/* Tab 5: Live State & Action Logs */}
        {activeTab === 'inspector' && (
          <div className="animate-fadeIn space-y-6">
            <ReduxStoreInspector />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Next.js App Router + Redux Toolkit + React Redux</span>
          </div>
          <p>
            Covering: The Gist of Redux • Store Creation • Alert Reducer, Action & Types • Alert Component & Action Calling
          </p>
        </div>
      </footer>
    </div>
  );
}
