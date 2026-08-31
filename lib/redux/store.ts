import { configureStore } from '@reduxjs/toolkit';
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

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

