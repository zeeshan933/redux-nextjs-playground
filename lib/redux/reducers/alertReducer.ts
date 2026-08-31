import {
  SET_ALERT,
  REMOVE_ALERT,
  CLEAR_ALERTS,
  AlertActionTypes,
  AlertState,
} from '../types/alertTypes';

const initialState: AlertState = {
  alerts: [],
  actionLog: [
    {
      id: 'init-classic',
      type: '@@INIT',
      payload: 'Classic Reducer Initialized',
      timestamp: 'Initial State',
    },
  ],
};

/**
 * Classic Redux Alert Reducer
 * Pure function: (previousState, action) => newState
 * Must never mutate state directly; always returns a new copy.
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
        actionLog: [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: SET_ALERT,
            payload: action.payload,
            timestamp: new Date().toLocaleTimeString(),
          },
          ...state.actionLog.slice(0, 24),
        ],
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
        actionLog: [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: REMOVE_ALERT,
            payload: { id: action.payload },
            timestamp: new Date().toLocaleTimeString(),
          },
          ...state.actionLog.slice(0, 24),
        ],
      };

    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
        actionLog: [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: CLEAR_ALERTS,
            payload: null,
            timestamp: new Date().toLocaleTimeString(),
          },
          ...state.actionLog.slice(0, 24),
        ],
      };

    default:
      return state;
  }
}

