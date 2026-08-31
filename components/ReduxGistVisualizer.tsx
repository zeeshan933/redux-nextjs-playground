'use client';

import { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Database, 
  Layers, 
  MousePointerClick, 
  Sparkles, 
  Eye 
} from 'lucide-react';

export default function ReduxGistVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const steps = [
    {
      id: 'view',
      title: '1. UI / View Event',
      subtitle: 'User interaction triggers intent',
      icon: MousePointerClick,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/50',
      bgColor: 'bg-blue-950/40',
      textColor: 'text-blue-400',
      description:
        'A user clicks "Submit Form" or a server responds with an error. The UI component initiates an intent to modify global state.',
      code: `// Button Click in React Component\n<button onClick={() => handleCreateAlert()}>\n  Show Success Alert\n</button>`,
    },
    {
      id: 'action',
      title: '2. Action & Creator',
      subtitle: 'Plain JavaScript Object describing WHAT happened',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-500',
      borderColor: 'border-purple-500/50',
      bgColor: 'bg-purple-950/40',
      textColor: 'text-purple-400',
      description:
        'An Action is a plain JS object containing a mandatory "type" field and an optional "payload". Action creators package this object.',
      code: `// Action Object\n{\n  type: 'SET_ALERT',\n  payload: {\n    id: 'a9f2-b8',\n    msg: 'Login successful!',\n    alertType: 'success'\n  }\n}`,
    },
    {
      id: 'dispatch',
      title: '3. Dispatch & Thunk',
      subtitle: 'Passes action into Redux store pipeline',
      icon: ArrowRight,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/50',
      bgColor: 'bg-emerald-950/40',
      textColor: 'text-emerald-400',
      description:
        'dispatch() is the only way to trigger a state change in Redux. Async Thunk middleware handles side effects (like setTimeout or API calls).',
      code: `// Calling dispatch\nconst dispatch = useAppDispatch();\ndispatch(setAlert(payload));\n// or Thunk with auto-dismiss timer`,
    },
    {
      id: 'reducer',
      title: '4. Pure Reducer Function',
      subtitle: 'Calculates the next state = (prevState, action) => newState',
      icon: Cpu,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500/50',
      bgColor: 'bg-amber-950/40',
      textColor: 'text-amber-400',
      description:
        'Reducers are pure functions without side effects. They take the current state and incoming action, and return a new state tree without mutating the previous state.',
      code: `// Reducer pure function\nfunction alertReducer(state, action) {\n  switch (action.type) {\n    case 'SET_ALERT':\n      return { ...state, alerts: [...state.alerts, action.payload] };\n    default:\n      return state;\n  }\n}`,
    },
    {
      id: 'store',
      title: '5. Redux Central Store',
      subtitle: 'Single Source of Truth holding entire state',
      icon: Database,
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/50',
      bgColor: 'bg-pink-950/40',
      textColor: 'text-pink-400',
      description:
        'The Redux Store replaces fragmented state. All application state lives in a single immutable JavaScript object tree.',
      code: `// Store State Tree\n{\n  alert: {\n    alerts: [{ id: 'a9f2-b8', msg: 'Login successful!' }]\n  }\n}`,
    },
    {
      id: 'selector',
      title: '6. UI Subscription & Re-render',
      subtitle: 'Components select data & update reactively',
      icon: Eye,
      color: 'from-indigo-500 to-cyan-400',
      borderColor: 'border-indigo-500/50',
      bgColor: 'bg-indigo-950/40',
      textColor: 'text-indigo-400',
      description:
        'Components use useAppSelector to read state. When the store updates, only components subscribed to that specific state slice re-render efficiently.',
      code: `// Alert.tsx Component\nconst alerts = useAppSelector((state) => state.alert.alerts);\nreturn alerts.map(alert => <Toast key={alert.id} alert={alert} />);`,
    },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1500);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          Module 1 • Conceptual Architecture
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          The Gist of Redux: Unidirectional Data Flow
        </h2>
        <p className="text-zinc-300 text-sm mt-2 max-w-3xl leading-relaxed">
          Redux is a predictable state container for JavaScript applications. Instead of scattering state across dozens of deeply nested components, Redux enforces a <strong>strict unidirectional data cycle</strong>. This makes state mutations completely trackable, debuggable, and deterministic.
        </p>
      </div>

      {/* Interactive Unidirectional Flow Pipeline */}
      <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Interactive Data Flow Cycle
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Click any step or press &quot;Run Cycle Simulation&quot; to trace how data travels through Redux.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSimulating
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isSimulating ? 'Simulating Cycle...' : 'Run Cycle Simulation'}
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={s.id}
                onClick={() => {
                  setIsSimulating(false);
                  setActiveStep(idx);
                }}
                className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? `${s.bgColor} ${s.borderColor} shadow-lg ring-2 ring-indigo-500/40 scale-[1.03]`
                    : isCompleted
                    ? 'bg-zinc-950/90 border-zinc-700 text-zinc-300'
                    : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isCurrent
                        ? `bg-gradient-to-tr ${s.color} text-white shadow-md`
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400">0{idx + 1}</span>
                </div>

                <div className="font-semibold text-xs text-white mb-0.5">{s.title}</div>
                <div className="text-[10px] text-zinc-400 line-clamp-1">{s.subtitle}</div>

                {isCurrent && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Details & Code Explanation */}
        <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${steps[activeStep].borderColor} ${steps[activeStep].bgColor} ${steps[activeStep].textColor}`}>
                  Active Stage
                </span>
                <h4 className="text-lg font-bold text-white">
                  {steps[activeStep].title}
                </h4>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {steps[activeStep].description}
              </p>

              <div className="flex items-center gap-2 pt-2 text-xs text-zinc-400 font-mono">
                <span className="text-indigo-400 font-bold">Flow Phase:</span> Step {activeStep + 1} of {steps.length}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/80 border-b border-zinc-800 text-[11px] text-zinc-400 font-mono">
                  <span>Code Implementation Sample</span>
                  <span className="text-indigo-400 font-semibold">{steps[activeStep].id}.ts</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                  {steps[activeStep].code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Core Principles Cards */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          The 3 Fundamental Principles of Redux
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Principle 1 */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-3">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                1. Single Source of Truth
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The state of your whole application is stored in an object tree within a single <strong>Store</strong>. This makes it easy to serialize, persist, and hydrate server state in Next.js.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-indigo-300 font-mono">
              Store = {'{ alert: { alerts: [...] } }'}
            </div>
          </div>

          {/* Principle 2 */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                2. State is Read-Only
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The only way to change the state is to emit an <strong>Action</strong>, an object describing what took place. No component can silently mutate global state directly.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-purple-300 font-mono">
              dispatch({'{'} type: 'SET_ALERT' {'}'})
            </div>
          </div>

          {/* Principle 3 */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                3. Changes with Pure Functions
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                To specify how the state tree is transformed by actions, you write pure <strong>Reducers</strong>. Given the same input, they always return the same output without side effects.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-emerald-300 font-mono">
              nextState = reducer(state, action)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

