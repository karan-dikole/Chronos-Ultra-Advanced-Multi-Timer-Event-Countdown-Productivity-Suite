import React from 'react';
import { Play, Pause, RotateCcw, Trash2, Edit2, Plus, CheckCircle, Volume2 } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';

export function TimerCard({ timer, onEdit }) {
  const { toggleTimer, resetTimer, deleteTimer, addTimeToTimer } = useTimerContext();

  const total = timer.totalSeconds || 60;
  const remaining = timer.remainingSeconds;
  const isRunning = timer.isRunning;
  const isCompleted = remaining === 0;

  // Calculate hours, minutes, seconds
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const timeString = `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Circular progress calculations
  const radius = 64;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = total > 0 ? (total - remaining) / total : 1;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const categoryLower = (timer.category || 'study').toLowerCase();

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderTop: `4px solid ${timer.color || '#6366f1'}`
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <span className={`badge badge-${categoryLower}`} style={{ marginBottom: '0.4rem' }}>
            {timer.category || 'General'}
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {timer.title}
          </h3>
        </div>

        {/* Action icons */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            onClick={() => onEdit && onEdit(timer)}
            className="btn btn-secondary btn-icon"
            style={{ width: '32px', height: '32px' }}
            title="Edit Timer"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => deleteTimer(timer.id)}
            className="btn btn-secondary btn-icon"
            style={{ width: '32px', height: '32px', color: '#f87171' }}
            title="Delete Timer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Circular Progress & Display */}
      <div className="circular-progress-wrap" style={{ margin: '1rem auto' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="var(--border-glass)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            className="progress-ring-circle"
            cx="80"
            cy="80"
            r={radius}
            stroke={isCompleted ? '#10b981' : timer.color || 'var(--accent-primary)'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isCompleted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckCircle size={32} color="#10b981" />
              <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700, marginTop: '4px' }}>DONE</span>
            </div>
          ) : (
            <>
              <span className="mono-time" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-number)' }}>
                {timeString}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                {isRunning ? 'RUNNING' : remaining < total ? 'PAUSED' : 'READY'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Quick Add Time Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          onClick={() => addTimeToTimer(timer.id, 60)}
          className="btn btn-secondary btn-sm"
          title="Add 1 minute"
          style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
        >
          <Plus size={12} /> 1m
        </button>
        <button
          onClick={() => addTimeToTimer(timer.id, 300)}
          className="btn btn-secondary btn-sm"
          title="Add 5 minutes"
          style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
        >
          <Plus size={12} /> 5m
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-dim)', fontSize: '0.75rem', marginLeft: 'auto' }}>
          <Volume2 size={13} /> {timer.sound || 'chime'}
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
        <button
          onClick={() => toggleTimer(timer.id)}
          className={`btn ${isRunning ? 'btn-rose' : 'btn-primary'}`}
          style={{ flex: 1 }}
        >
          {isRunning ? (
            <>
              <Pause size={16} /> Pause
            </>
          ) : isCompleted ? (
            <>
              <RotateCcw size={16} /> Restart
            </>
          ) : (
            <>
              <Play size={16} /> Start
            </>
          )}
        </button>

        <button
          onClick={() => resetTimer(timer.id)}
          className="btn btn-secondary"
          title="Reset to original duration"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
