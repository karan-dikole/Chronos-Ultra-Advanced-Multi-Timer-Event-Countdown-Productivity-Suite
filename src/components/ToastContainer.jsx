import React from 'react';
import { useTimerContext } from '../context/TimerContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useTimerContext();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = Info;
        let toastClass = 'toast-info';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          toastClass = 'toast-success';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          toastClass = 'toast-warning';
        } else if (toast.type === 'danger') {
          Icon = AlertCircle;
          toastClass = 'toast-danger';
        }

        return (
          <div key={toast.id} className={`toast-item ${toastClass}`}>
            <Icon size={20} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500 }}>
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
