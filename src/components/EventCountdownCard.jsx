import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, Clock, AlertCircle } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';

export function EventCountdownCard({ event }) {
  const { deleteEvent } = useTimerContext();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const target = new Date(event.targetDate).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [event.targetDate]);

  const categoryLower = (event.category || 'exams').toLowerCase();
  const targetDateFormatted = new Date(event.targetDate).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderTop: `4px solid ${event.color || '#8b5cf6'}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <span className={`badge badge-${categoryLower}`} style={{ marginBottom: '0.4rem' }}>
            {event.category || 'General'}
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {event.title}
          </h3>
        </div>

        <button
          onClick={() => deleteEvent(event.id)}
          className="btn btn-secondary btn-icon"
          style={{ width: '32px', height: '32px', color: '#f87171' }}
          title="Delete Event"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {event.description && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.4 }}>
          {event.description}
        </p>
      )}

      {/* Target Date badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        <Calendar size={14} /> Target: {targetDateFormatted}
      </div>

      {/* Countdown Digits Grid */}
      {timeLeft.isPast ? (
        <div style={{
          padding: '1.5rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          color: '#f87171',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={20} /> Event Date has passed
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: 'auto' }}>
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((unit, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '0.75rem 0.25rem',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="mono-time" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-number)' }}>
                {String(unit.value).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px', fontWeight: 600 }}>
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
