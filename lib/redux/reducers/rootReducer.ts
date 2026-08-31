import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from '../slices/alertSlice';

export const rootReducer = combineReducers({
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

