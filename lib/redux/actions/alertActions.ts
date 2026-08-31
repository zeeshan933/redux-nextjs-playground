import { Dispatch } from 'redux';
import {
  SET_ALERT,
  REMOVE_ALERT,
  CLEAR_ALERTS,
  AlertItem,
  AlertType,
  AlertActionTypes,
} from '../types/alertTypes';

/**
 * Classic Redux Action Creator: setAlert
 * In traditional Redux with Redux Thunk middleware, this returns a function
 * that dispatches SET_ALERT and dispatches REMOVE_ALERT after the timeout.
 */
export const setAlertClassic = (
  msg: string,
  alertType: AlertType = 'info',
  timeout: number = 4000
) => {
  return (dispatch: Dispatch<AlertActionTypes>) => {
    // Generate UUID or unique ID
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 9);

    const alert: AlertItem = {
      id,
      msg,
      alertType,
      timeout,
      createdAt: Date.now(),
    };

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

/**
 * Synchronous Action Creator to remove an alert by ID
 */
export const removeAlertClassic = (id: string): AlertActionTypes => ({
  type: REMOVE_ALERT,
  payload: id,
});

/**
 * Synchronous Action Creator to clear all alerts
 */
export const clearAlertsClassic = (): AlertActionTypes => ({
  type: CLEAR_ALERTS,
});

