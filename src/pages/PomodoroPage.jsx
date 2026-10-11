import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Coffee, Sparkles, CheckCircle2, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../services/soundEngine';
import { useTimerContext } from '../context/TimerContext';

const MODES = {
  POMODORO: { name: 'Focus Session', duration: 25 * 60, color: '#ef4444', icon: Flame },
  SHORT_BREAK: { name: 'Short Break', duration: 5 * 60, color: '#10b981', icon: Coffee },
  LONG_BREAK: { name: 'Long Break', duration: 15 * 60, color: '#3b82f6', icon: Sparkles }
};

export function PomodoroPage() {
  const { soundEnabled, addToast } = useTimerContext();
  const [currentMode, setCurrentMode] = useState('POMODORO');
  const [remainingSeconds, setRemainingSeconds] = useState(MODES.POMODORO.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundType, setSoundType] = useState('chime');

  const modeConfig = MODES[currentMode];
  const total = modeConfig.duration;

  // Countdown effect
  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          if (soundEnabled) {
            soundEngine.playSound(soundType);
          }

          try {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          } catch {}

          if (currentMode === 'POMODORO') {
            const nextCount = completedSessions + 1;
            setCompletedSessions(nextCount);
            addToast(`Focus session completed! Great job (Streak: ${nextCount})`, 'success');

            // Switch to break
            if (nextCount % 4 === 0) {
              switchMode('LONG_BREAK');
            } else {
              switchMode('SHORT_BREAK');
            }
          } else {
            addToast('Break ended! Ready for another focus round?', 'info');
            switchMode('POMODORO');
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, currentMode, completedSessions, soundEnabled, soundType, addToast]);

  const switchMode = (modeKey) => {
    setCurrentMode(modeKey);
    setRemainingSeconds(MODES[modeKey].duration);
    setIsRunning(false);
  };

  const handleToggle = () => {
    if (remainingSeconds <= 0) {
      setRemainingSeconds(modeConfig.duration);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setRemainingSeconds(modeConfig.duration);
    setIsRunning(false);
  };

  // Calculations for display
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = (total - remainingSeconds) / total;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const Icon = modeConfig.icon;

  return (
    <div className="animate-slide-up" style={{ maxWidth: '750px', margin: '0 auto' }}>
      {/* Mode Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '6px',
          borderRadius: 'var(--radius-full)'
        }}
      >
        {Object.entries(MODES).map(([key, config]) => {
          const ModeIcon = config.icon;
          const isActive = currentMode === key;
          return (
            <button
              key={key}
              onClick={() => switchMode(key)}
              style={{
                flex: 1,
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: isActive ? config.color : 'transparent',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? `0 4px 15px ${config.color}55` : 'none'
              }}
            >
              <ModeIcon size={18} />
              <span>{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Focus Card */}
      <div
        className="glass-card"
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderTop: `5px solid ${modeConfig.color}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: modeConfig.color, marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          <Icon size={20} />
          {modeConfig.name}
        </div>

        {/* Large Circular Display */}
        <div className="circular-progress-wrap" style={{ margin: '1rem 0 2rem' }}>
          <svg width="240" height="240" viewBox="0 0 240 240">
            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke="var(--border-glass)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              className="progress-ring-circle"
              cx="120"
              cy="120"
              r={radius}
              stroke={modeConfig.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div className="mono-time" style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-number)', lineHeight: 1 }}>
              {timeString}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem', fontWeight: 600 }}>
              {isRunning ? 'IN PROGRESS' : 'PAUSED'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '360px', marginBottom: '2rem' }}>
          <button
            onClick={handleToggle}
            className="btn"
            style={{
              flex: 1,
              padding: '0.9rem',
              fontSize: '1.1rem',
              background: modeConfig.color,
              color: '#ffffff',
              boxShadow: `0 4px 20px ${modeConfig.color}66`
            }}
          >
            {isRunning ? (
              <>
                <Pause size={20} /> Pause Focus
              </>
            ) : (
              <>
                <Play size={20} /> Start Focus
              </>
            )}
          </button>
          <button onClick={handleReset} className="btn btn-secondary" style={{ padding: '0.9rem' }} title="Reset">
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Streak & Round Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Completed Sessions: <strong style={{ color: 'var(--text-main)' }}>{completedSessions}</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Round: <strong style={{ color: 'var(--text-main)' }}>{(completedSessions % 4) + 1} / 4</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
