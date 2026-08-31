'use client';

import { useState } from 'react';
import { Copy, Check, FileCode, Layers, Terminal, Sparkles } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  category: 'store' | 'types' | 'reducers' | 'components';
  description: string;
  code: string;
}

const codeFiles: CodeSnippet[] = [
  {
    id: 'store',
    name: 'store.ts',
    category: 'store',
    description: 'Creates the Redux store factory makeStore() configured for Next.js App Router SSR isolation.',
    code: `import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';

/**
 * makeStore function to create a new Redux store instance.
 * Recommended by Redux Toolkit for Next.js App Router to prevent state sharing across SSR requests.
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      alert: alertReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer types from makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];`,
  },
  {
    id: 'provider',
    name: 'StoreProvider.tsx',
    category: 'store',
    description: 'Client component wrapping children with Provider and maintaining a single store instance via useRef.',
    code: `'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}`,
  },
  {
    id: 'hooks',
    name: 'hooks.ts',
    category: 'store',
    description: 'Typed hooks (useAppDispatch, useAppSelector) for type-safe Redux interaction throughout your app.',
    code: `import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

// Use throughout your app instead of plain \`useDispatch\` and \`useSelector\`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;`,
  },
  {
    id: 'types',
    name: 'alertTypes.ts',
    category: 'types',
    description: 'Defines AlertItem, AlertType, action type string constants, and action interfaces.',
    code: `export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface AlertItem {
  id: string;
  msg: string;
  alertType: AlertType;
  timeout?: number;
  createdAt: number;
}

// Classic Action Types Constants
export const SET_ALERT = 'SET_ALERT' as const;
export const REMOVE_ALERT = 'REMOVE_ALERT' as const;
export const CLEAR_ALERTS = 'CLEAR_ALERTS' as const;

export interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: AlertItem;
}

export interface RemoveAlertAction {
  type: typeof REMOVE_ALERT;
  payload: string; // alert id
}

export interface ClearAlertsAction {
  type: typeof CLEAR_ALERTS;
}

export type AlertActionTypes = SetAlertAction | RemoveAlertAction | ClearAlertsAction;

export interface AlertState {
  alerts: AlertItem[];
  actionLog: any[];
}`,
  },
  {
    id: 'slice',
    name: 'alertSlice.ts (Redux Toolkit)',
    category: 'reducers',
    description: 'Modern Redux Toolkit slice containing reducers, actions, and createAsyncThunk for auto-dismissing alerts.',
    code: `import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AlertItem, AlertState, AlertType } from '../types/alertTypes';

const initialState: AlertState = {
  alerts: [],
  actionLog: [],
};

// Async thunk action creator for auto-dismissing alerts
export const triggerAlert = createAsyncThunk(
  'alert/triggerAlert',
  async (
    { msg, alertType, timeout = 4000 }: { msg: string; alertType: AlertType; timeout?: number },
    { dispatch }
  ) => {
    const id = crypto.randomUUID();
    const newAlert: AlertItem = { id, msg, alertType, timeout, createdAt: Date.now() };

    // 1. Dispatch SET_ALERT
    dispatch(setAlert(newAlert));

    // 2. Automatically dispatch REMOVE_ALERT after timeout
    if (timeout > 0) {
      setTimeout(() => {
        dispatch(removeAlert(id));
      }, timeout);
    }

    return newAlert;
  }
);

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertItem>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

export const { setAlert, removeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;`,
  },
  {
    id: 'classic-actions',
    name: 'alertActions.ts (Classic)',
    category: 'reducers',
    description: 'Classic Redux action creators returning action objects or Thunk functions using dispatch.',
    code: `import { Dispatch } from 'redux';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS, AlertItem, AlertType, AlertActionTypes } from '../types/alertTypes';

/**
 * Classic Redux Thunk Action Creator: setAlert
 */
export const setAlertClassic = (msg: string, alertType: AlertType = 'info', timeout = 4000) => {
  return (dispatch: Dispatch<AlertActionTypes>) => {
    const id = crypto.randomUUID();
    const alert: AlertItem = { id, msg, alertType, timeout, createdAt: Date.now() };

    // 1. Dispatch SET_ALERT action
    dispatch({
      type: SET_ALERT,
      payload: alert,
    });

    // 2. Automatically dispatch REMOVE_ALERT action after timeout
    if (timeout > 0) {
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        });
      }, timeout);
    }
  };
};

export const removeAlertClassic = (id: string): AlertActionTypes => ({
  type: REMOVE_ALERT,
  payload: id,
});`,
  },
  {
    id: 'classic-reducer',
    name: 'alertReducer.ts (Classic)',
    category: 'reducers',
    description: 'Classic Redux pure reducer function with switch/case statement and immutable spread operators.',
    code: `import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS, AlertActionTypes, AlertState } from '../types/alertTypes';

const initialState: AlertState = {
  alerts: [],
  actionLog: [],
};

/**
 * Classic Redux Alert Reducer
 * Pure function: (previousState, action) => newState
 */
export default function alertReducer(
  state: AlertState = initialState,
  action: AlertActionTypes
): AlertState {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };

    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
      };

    default:
      return state;
  }
}`,
  },
  {
    id: 'alert-component',
    name: 'Alert.tsx (Component)',
    category: 'components',
    description: 'Toast notification UI component subscribing to alerts array via useAppSelector and removing via useAppDispatch.',
    code: `'use client';

import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { removeAlert } from '../lib/redux/slices/alertSlice';

export default function Alert() {
  const dispatch = useAppDispatch();
  // 1. Read global alerts from Redux Store
  const alerts = useAppSelector((state) => state.alert.alerts);

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="alert-card">
          <span>{alert.msg}</span>
          {/* 2. Dispatch action call to remove alert */}
          <button onClick={() => dispatch(removeAlert(alert.id))}>×</button>
        </div>
      ))}
    </div>
  );
}`,
  },
];

interface CodeViewerProps {
  initialTab?: string;
}

export default function CodeViewer({ initialTab = 'store' }: CodeViewerProps) {
  const [selectedFileId, setSelectedFileId] = useState(initialTab);
  const [copied, setCopied] = useState(false);

  const currentFile = codeFiles.find((f) => f.id === selectedFileId) || codeFiles[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* File Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {codeFiles.map((file) => {
          const isSelected = selectedFileId === file.id;
          return (
            <button
              key={file.id}
              onClick={() => setSelectedFileId(file.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
              {file.name}
            </button>
          );
        })}
      </div>

      {/* Code Card */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden shadow-xl">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-950/90 border-b border-zinc-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white">
                {currentFile.name}
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                {currentFile.category}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">{currentFile.description}</p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-zinc-700 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Code
              </>
            )}
          </button>
        </div>

        {/* Code Body */}
        <div className="bg-zinc-950 p-5 overflow-x-auto max-h-[550px]">
          <pre className="font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre">
            {currentFile.code}
          </pre>
        </div>
      </div>
    </div>
  );
}

