export type AlertType = 'success' | 'danger' | 'warning' | 'info';

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

export interface ActionLogEntry {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
}

export interface AlertState {
  alerts: AlertItem[];
  actionLog: ActionLogEntry[];
}

