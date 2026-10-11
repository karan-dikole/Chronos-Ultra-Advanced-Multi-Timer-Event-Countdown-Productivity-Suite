import React, { useState } from 'react';
import { Globe, RefreshCw, Clock, MapPin, Wifi, WifiOff } from 'lucide-react';
import { TIMEZONES } from '../services/timeApi';
import { useWorldTime } from '../hooks/useWorldTime';
import { useTimerContext } from '../context/TimerContext';

function WorldClockCard({ tz }) {
  const { timeString, dateString, apiData, loading, error, refreshApiTime } = useWorldTime(tz.id);

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '4px solid var(--accent-cyan)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '1.5rem', marginRight: '0.4rem' }}>{tz.flag}</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{tz.city}</span>
          </div>
          <button
            onClick={refreshApiTime}
            className="btn btn-secondary btn-icon"
            style={{ width: '28px', height: '28px' }}
            title="Sync API Time"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
          {tz.name} ({tz.offset})
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div className="mono-time" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
          {timeString}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{dateString}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
            {apiData?.source === 'network' ? (
              <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                <Wifi size={10} /> Live API
              </span>
            ) : (
              <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <WifiOff size={10} /> Intl Clock
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WorldTimePage() {
  const [search, setSearch] = useState('');
  const { addToast } = useTimerContext();

  const filteredTimezones = TIMEZONES.filter((tz) =>
    tz.name.toLowerCase().includes(search.toLowerCase()) ||
    tz.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-slide-up">
      {/* Hero */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          background: 'var(--world-hero-gradient)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(6, 182, 212, 0.15)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Globe size={14} /> REST API & TIMEZONE SYNCHRONIZATION
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Global World <span className="gradient-text">Time Engine</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
            Synchronize local timers with official REST API World Time and timezone offsets for global deadlines and remote collaboration.
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
          <input
            type="text"
            placeholder="Filter cities / timezones..."
            className="input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of World Clocks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredTimezones.map((tz) => (
          <WorldClockCard key={tz.id} tz={tz} />
        ))}
      </div>
    </div>
  );
}
