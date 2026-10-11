import React, { useState } from 'react';
import { Plus, Search, Timer as TimerIcon, Play, Pause, RotateCcw, Zap, Sparkles, Filter } from 'lucide-react';
import { useTimerContext, CATEGORIES } from '../context/TimerContext';
import { TimerCard } from '../components/TimerCard';
import { TimerModal } from '../components/TimerModal';

export function DashboardPage() {
  const {
    filteredTimers,
    timers,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    addTimer,
    updateTimer,
    totalActiveTimers,
    totalCompletedCount
  } = useTimerContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTimer, setEditingTimer] = useState(null);

  const handleOpenCreate = () => {
    setEditingTimer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (timer) => {
    setEditingTimer(timer);
    setIsModalOpen(true);
  };

  const handleSaveModal = (data) => {
    if (editingTimer) {
      updateTimer(editingTimer.id, data);
    } else {
      addTimer(data);
    }
  };

  // Quick Preset Adders
  const quickPresets = [
    { title: '2 Min Quick Break', duration: 120, category: 'Personal', color: '#10b981', sound: 'bell' },
    { title: '10 Min Focus Sprint', duration: 600, category: 'Study', color: '#6366f1', sound: 'chime' },
    { title: '15 Min Coffee Routine', duration: 900, category: 'Cooking', color: '#f59e0b', sound: 'gong' },
    { title: '30 Min Deep Coding', duration: 1800, category: 'Coding', color: '#ec4899', sound: 'digital' }
  ];

  return (
    <div className="animate-slide-up">
      {/* Top Banner / Hero */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          background: 'var(--hero-gradient)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(99, 102, 241, 0.12)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> MULTI-COUNTDOWN ENGINE
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Precision Countdown <span className="gradient-text">Dashboard</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
            Manage multiple concurrent timers, customizable alarm sounds, and category filters with millisecond precision state synchronization.
          </p>
        </div>

        {/* Quick Stats Widget */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', textAlign: 'center', minWidth: '110px' }}>
            <div className="mono-time" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {timers.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Timers
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', textAlign: 'center', minWidth: '110px' }}>
            <div className="mono-time" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {totalActiveTimers}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Running
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', textAlign: 'center', minWidth: '110px' }}>
            <div className="mono-time" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
              {totalCompletedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Presets Row */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Zap size={16} color="var(--accent-amber)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Instant Presets
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {quickPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => addTimer({ title: p.title, totalSeconds: p.duration, category: p.category, color: p.color, sound: p.sound, autoStart: true })}
              className="glass-card"
              style={{
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${p.color}`,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>{p.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.duration / 60} minutes • {p.category}</div>
              </div>
              <Play size={14} color={p.color} />
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem'
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input & Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, justifyContent: 'flex-end', minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search timers..."
              className="input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem', height: '40px' }}
            />
          </div>

          <button onClick={handleOpenCreate} className="btn btn-primary" style={{ whiteSpace: 'nowrap', height: '40px' }}>
            <Plus size={18} /> New Timer
          </button>
        </div>
      </div>

      {/* Timers Grid */}
      {filteredTimers.length === 0 ? (
        <div className="glass-card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <TimerIcon size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem', opacity: 0.7 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Timers Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            {searchQuery || selectedCategory !== 'All'
              ? 'No timers match your search/category filter.'
              : 'You have no timers configured. Create your first countdown now!'}
          </p>
          <button onClick={handleOpenCreate} className="btn btn-primary">
            <Plus size={18} /> Create Timer
          </button>
        </div>
      ) : (
        <div className="timers-grid">
          {filteredTimers.map((timer) => (
            <TimerCard key={timer.id} timer={timer} onEdit={handleOpenEdit} />
          ))}
        </div>
      )}

      {/* Modal for Create & Edit */}
      <TimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        mode="timer"
        initialData={editingTimer}
      />
    </div>
  );
}
