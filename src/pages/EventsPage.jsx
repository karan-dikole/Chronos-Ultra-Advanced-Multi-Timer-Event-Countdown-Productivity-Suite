import React, { useState } from 'react';
import { Plus, Calendar, Search, Sparkles } from 'lucide-react';
import { useTimerContext, CATEGORIES } from '../context/TimerContext';
import { EventCountdownCard } from '../components/EventCountdownCard';
import { TimerModal } from '../components/TimerModal';

export function EventsPage() {
  const { filteredEvents, events, addEvent, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useTimerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveEvent = (data) => {
    addEvent(data);
  };

  return (
    <div className="animate-slide-up">
      {/* Top Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          background: 'var(--events-hero-gradient)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(168, 85, 247, 0.15)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> TARGET DATE & MILESTONE TRACKER
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Event <span className="gradient-text">Countdowns</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
            Track major academic deadlines, project submissions, exam dates, and personal milestones with real-time day/hour/min/sec tickers.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ height: '44px' }}>
          <Plus size={18} /> Add Event Target
        </button>
      </div>

      {/* Filter & Search Bar */}
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

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search events..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem', height: '40px' }}
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <Calendar size={48} color="var(--accent-secondary)" style={{ margin: '0 auto 1rem', opacity: 0.7 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Events Scheduled</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Set a target date for exams, milestones, or project deadlines.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} /> Create Event
          </button>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCountdownCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Modal */}
      <TimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        mode="event"
      />
    </div>
  );
}
