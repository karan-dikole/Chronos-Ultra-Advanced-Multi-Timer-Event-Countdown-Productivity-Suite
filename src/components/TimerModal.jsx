import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../context/TimerContext';
import { SoundPicker } from './SoundPicker';

const COLOR_OPTIONS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#3b82f6'  // Blue
];

export function TimerModal({ isOpen, onClose, onSave, mode = 'timer', initialData = null }) {
  const [tab, setTab] = useState(mode); // 'timer' or 'event'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');
  const [sound, setSound] = useState('chime');
  const [color, setColor] = useState('#6366f1');
  const [autoStart, setAutoStart] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setCategory(initialData.category || 'Study');
        setColor(initialData.color || '#6366f1');
        setSound(initialData.sound || 'chime');

        if (initialData.totalSeconds !== undefined) {
          setTab('timer');
          const h = Math.floor(initialData.totalSeconds / 3600);
          const m = Math.floor((initialData.totalSeconds % 3600) / 60);
          const s = initialData.totalSeconds % 60;
          setHours(h);
          setMinutes(m);
          setSeconds(s);
        } else if (initialData.targetDate) {
          setTab('event');
          setTargetDate(initialData.targetDate);
          setDescription(initialData.description || '');
        }
      } else {
        // Reset defaults
        setTab(mode);
        setTitle('');
        setCategory('Study');
        setHours(0);
        setMinutes(5);
        setSeconds(0);
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
        setTargetDate(tomorrow.toISOString().slice(0, 16));
        setDescription('');
        setSound('chime');
        setColor('#6366f1');
        setAutoStart(false);
      }
      setErrors({});
    }
  }, [isOpen, initialData, mode]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (tab === 'timer') {
      const totalSec = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
      if (totalSec <= 0) {
        errs.duration = 'Duration must be at least 1 second';
      }
    } else {
      if (!targetDate) {
        errs.targetDate = 'Target date & time is required';
      } else {
        const targetTime = new Date(targetDate).getTime();
        if (isNaN(targetTime)) {
          errs.targetDate = 'Invalid date format';
        } else if (targetTime <= Date.now() && !initialData) {
          errs.targetDate = 'Target date must be in the future';
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (tab === 'timer') {
      const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
      onSave({
        type: 'timer',
        title: title.trim(),
        category,
        totalSeconds,
        sound,
        color,
        autoStart
      });
    } else {
      onSave({
        type: 'event',
        title: title.trim(),
        category,
        targetDate,
        description: description.trim(),
        sound,
        color
      });
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          backgroundColor: 'var(--modal-bg)',
          border: '1px solid var(--border-glass)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {initialData ? 'Edit Timer' : 'Create New Countdown'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Configure duration, alerts, and categorization
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-icon"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mode Selector (Timer vs Target Date Event) */}
        {!initialData && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--bg-panel)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
            <button
              type="button"
              onClick={() => setTab('timer')}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '8px',
                border: 'none',
                background: tab === 'timer' ? 'var(--accent-primary)' : 'transparent',
                color: tab === 'timer' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              <Clock size={16} /> Quick Duration
            </button>
            <button
              type="button"
              onClick={() => setTab('event')}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '8px',
                border: 'none',
                background: tab === 'event' ? 'var(--accent-secondary)' : 'transparent',
                color: tab === 'event' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              <Calendar size={16} /> Target Date / Event
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Timer Title *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. AWT React Exam Prep"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-rose)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                <AlertCircle size={14} /> {errors.title}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Category
            </label>
            <select
              className="select-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tab: Duration Timer */}
          {tab === 'timer' ? (
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Duration (Hours : Minutes : Seconds) *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    className="input-field mono-time"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', display: 'block', marginTop: '2px' }}>Hours</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    className="input-field mono-time"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="5"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', display: 'block', marginTop: '2px' }}>Minutes</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    className="input-field mono-time"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', display: 'block', marginTop: '2px' }}>Seconds</span>
                </div>
              </div>
              {errors.duration && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                  <AlertCircle size={14} /> {errors.duration}
                </div>
              )}
            </div>
          ) : (
            /* Tab: Target Date Event */
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Target Date & Time *
              </label>
              <input
                type="datetime-local"
                className="input-field"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
              {errors.targetDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                  <AlertCircle size={14} /> {errors.targetDate}
                </div>
              )}

              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Event Note / Description (Optional)
                </label>
                <textarea
                  className="textarea-field"
                  rows="2"
                  placeholder="Additional context or agenda..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Sound Picker */}
          <SoundPicker value={sound} onChange={setSound} />

          {/* Color Accent Picker */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Color Theme Accent
            </label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {COLOR_OPTIONS.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    cursor: 'pointer',
                    boxShadow: color === c ? '0 0 0 3px #ffffff' : 'none',
                    transform: color === c ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.15s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Auto Start checkbox */}
          {tab === 'timer' && !initialData && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <input
                type="checkbox"
                checked={autoStart}
                onChange={(e) => setAutoStart(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
              />
              Start countdown immediately upon creation
            </label>
          )}

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {initialData ? 'Update' : 'Create Countdown'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
