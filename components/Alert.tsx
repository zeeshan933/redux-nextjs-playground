'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { removeAlert, clearAlerts } from '../lib/redux/slices/alertSlice';
import { AlertItem, AlertType } from '../lib/redux/types/alertTypes';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  X, 
  Bell, 
  Trash2 
} from 'lucide-react';

interface AlertItemProps {
  alert: AlertItem;
  onDismiss: (id: string) => void;
}

function AlertCard({ alert, onDismiss }: AlertItemProps) {
  const timeout = alert.timeout || 4000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeout <= 0) return;
    const intervalTime = 50;
    const decrement = (intervalTime / timeout) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement;
        return next > 0 ? next : 0;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [timeout]);

  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-950/50',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          progressBar: 'bg-emerald-400',
          title: 'Success',
        };
      case 'danger':
        return {
          container: 'bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-rose-950/50',
          icon: <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />,
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          progressBar: 'bg-rose-400',
          title: 'Error / Danger',
        };
      case 'warning':
        return {
          container: 'bg-amber-950/90 border-amber-500/50 text-amber-100 shadow-amber-950/50',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          progressBar: 'bg-amber-400',
          title: 'Warning',
        };
      case 'info':
      default:
        return {
          container: 'bg-sky-950/90 border-sky-500/50 text-sky-100 shadow-sky-950/50',
          icon: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
          progressBar: 'bg-sky-400',
          title: 'Information',
        };
    }
  };

  const style = getAlertStyles(alert.alertType);

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-xl border backdrop-blur-md p-4 shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 hover:scale-[1.02] ${style.container}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{style.icon}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border tracking-wide ${style.badge}`}>
              {style.title}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              ID: {alert.id.substring(0, 8)}
            </span>
          </div>
          <p className="text-sm font-medium leading-snug break-words">
            {alert.msg}
          </p>
        </div>

        <button
          onClick={() => onDismiss(alert.id)}
          className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss alert"
          title="Remove alert"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Countdown progress bar */}
      {timeout > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ease-linear ${style.progressBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default function Alert() {
  const dispatch = useAppDispatch();
  // Subscribing to alerts in Redux store state
  const alerts = useAppSelector((state) => state.alert.alerts);

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 w-full max-w-md pointer-events-none px-4 sm:px-0">
      <div className="pointer-events-auto flex items-center justify-between bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-lg shadow-lg backdrop-blur">
        <span className="flex items-center gap-1.5 font-medium">
          <Bell className="w-3.5 h-3.5 text-indigo-400" />
          Active Redux Alerts ({alerts.length})
        </span>
        {alerts.length > 1 && (
          <button
            onClick={() => dispatch(clearAlerts())}
            className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          onDismiss={(id) => dispatch(removeAlert(id))}
        />
      ))}
    </div>
  );
}

