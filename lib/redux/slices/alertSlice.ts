import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AlertItem, AlertState, AlertType, ActionLogEntry } from '../types/alertTypes';

const initialState: AlertState = {
  alerts: [],
  actionLog: [
    {
      id: 'init-1',
      type: '@@INIT',
      payload: 'Redux Store Initialized',
      timestamp: 'Initial State',
    },
  ],
};

// Async thunk action creator for setting an alert with auto-removal timeout
export const triggerAlert = createAsyncThunk(
  'alert/triggerAlert',
  async (
    {
      msg,
      alertType,
      timeout = 4000,
    }: {
      msg: string;
      alertType: AlertType;
      timeout?: number;
    },
    { dispatch }
  ) => {
    // Generate a unique ID
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 9);
      
    const newAlert: AlertItem = {
      id,
      msg,
      alertType,
      timeout,
      createdAt: Date.now(),
    };

    // Dispatch the synchronous set alert
    dispatch(setAlert(newAlert));

    // Auto-remove after timeout
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
      state.actionLog.unshift({
        id: Math.random().toString(36).substring(2, 9),
        type: 'SET_ALERT',
        payload: action.payload,
        timestamp: new Date().toLocaleTimeString(),
      });
      // Keep action log trimmed to last 25 items
      if (state.actionLog.length > 25) {
        state.actionLog.pop();
      }
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
      state.actionLog.unshift({
        id: Math.random().toString(36).substring(2, 9),
        type: 'REMOVE_ALERT',
        payload: { id: action.payload },
        timestamp: new Date().toLocaleTimeString(),
      });
      if (state.actionLog.length > 25) {
        state.actionLog.pop();
      }
    },
    clearAlerts: (state) => {
      state.alerts = [];
      state.actionLog.unshift({
        id: Math.random().toString(36).substring(2, 9),
        type: 'CLEAR_ALERTS',
        payload: null,
        timestamp: new Date().toLocaleTimeString(),
      });
      if (state.actionLog.length > 25) {
        state.actionLog.pop();
      }
    },
  },
});

export const { setAlert, removeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;

