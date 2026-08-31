'use client';

import { Layers, CheckCircle2, AlertTriangle, Shield, Cpu, RefreshCw } from 'lucide-react';
import CodeViewer from './CodeViewer';

export default function StoreCreationGuide() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          Module 2 • Architecture & Setup
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Creating a Redux Store in Next.js App Router
        </h2>
        <p className="text-zinc-300 text-sm mt-2 max-w-3xl leading-relaxed">
          In Next.js App Router (React Server Components + SSR), Redux store creation requires special care. Unlike traditional Single Page Apps where a single global store is created at module load time, Next.js requires a <strong>per-request store factory</strong> pattern to prevent state leakage between concurrent users and SSR requests.
        </p>
      </div>

      {/* 3 Step Store Creation Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm font-mono">
                1
              </span>
              <span className="text-[11px] font-mono text-zinc-500">lib/redux/store.ts</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">
              1. Store Factory (`makeStore`)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Define a <code className="text-indigo-300 font-mono">makeStore()</code> function using Redux Toolkit&apos;s <code className="text-indigo-300 font-mono">configureStore()</code>. This creates a clean, isolated store instance on demand.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-emerald-400 font-mono">
            ✓ Isolated SSR instances
          </div>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                2
              </span>
              <span className="text-[11px] font-mono text-zinc-500">StoreProvider.tsx</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">
              2. Client Store Provider (`useRef`)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Wrap the component tree with a client component Provider that holds the store reference using <code className="text-purple-300 font-mono">useRef()</code> so the store instance persists across client re-renders.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-purple-400 font-mono">
            ✓ Single client-side singleton
          </div>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm font-mono">
                3
              </span>
              <span className="text-[11px] font-mono text-zinc-500">lib/redux/hooks.ts</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">
              3. Typed Hooks (`useAppDispatch`)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Export pre-typed hooks <code className="text-sky-300 font-mono">useAppDispatch</code> and <code className="text-sky-300 font-mono">useAppSelector</code> derived from <code className="text-sky-300 font-mono">RootState</code> and <code className="text-sky-300 font-mono">AppDispatch</code>.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-sky-400 font-mono">
            ✓ 100% Type-Safe State Access
          </div>
        </div>
      </div>

      {/* Code Inspector for Store */}
      <div>
        <h3 className="text-base font-bold text-white mb-3">
          Explore Store Configuration Code
        </h3>
        <CodeViewer initialTab="store" />
      </div>
    </div>
  );
}

