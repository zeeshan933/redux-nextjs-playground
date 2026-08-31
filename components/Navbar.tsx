'use client';

import { useAppSelector } from '../lib/redux/hooks';
import { Layers, Activity, BellRing, Sparkles, BookOpen, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const alerts = useAppSelector((state) => state.alert.alerts);
  const actionLog = useAppSelector((state) => state.alert.actionLog);

  const tabs = [
    { id: 'playground', label: 'Interactive Playground', icon: Sparkles },
    { id: 'gist', label: '1. The Gist of Redux', icon: BookOpen },
    { id: 'store', label: '2. Creating Store', icon: Layers },
    { id: 'reducers', label: '3. Reducer, Actions & Types', icon: Terminal },
    { id: 'inspector', label: 'Live State & Action Logs', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Redux in Next.js
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  App Router
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Mastering State, Stores, Actions & Reducers
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <BellRing className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Active Alerts:</span>
              <span className="font-bold text-white px-1.5 py-0.2 rounded bg-indigo-600/40 text-[11px]">
                {alerts.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Actions Dispatched:</span>
              <span className="font-bold text-emerald-300 px-1.5 py-0.2 rounded bg-emerald-600/20 text-[11px]">
                {actionLog.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-medium">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

