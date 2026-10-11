import React from 'react';
import { BarChart2, Download, Trash2, Clock, CheckCircle2, Award, Calendar } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';

export function AnalyticsPage() {
  const { history, clearHistory, addToast } = useTimerContext();

  const totalSessions = history.length;
  const totalSecondsFocused = history.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalMinutes = Math.round(totalSecondsFocused / 60);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Group by category
  const categoryCounts = history.reduce((acc, curr) => {
    const cat = curr.category || 'General';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Export JSON
  const handleExportJSON = () => {
    if (history.length === 0) {
      addToast('No history records to export', 'warning');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `chronos_timer_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('History exported as JSON', 'success');
  };

  // Export CSV
  const handleExportCSV = () => {
    if (history.length === 0) {
      addToast('No history records to export', 'warning');
      return;
    }
    const headers = ['ID', 'Title', 'Category', 'DurationSeconds', 'CompletedAt'];
    const rows = history.map((h) => [
      h.id,
      `"${h.title.replace(/"/g, '""')}"`,
      h.category,
      h.duration,
      h.completedAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chronos_timer_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    addToast('History exported as CSV', 'success');
  };

  return (
    <div className="animate-slide-up">
      {/* Top Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          background: 'var(--analytics-hero-gradient)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <BarChart2 size={14} /> SESSION LOGS & PRODUCTIVITY ANALYTICS
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Focus <span className="gradient-text">Analytics</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
            Detailed logs of all completed countdown timers, focus streaks, category breakdown, and exportable logs for analysis.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handleExportCSV} className="btn btn-secondary">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={handleExportJSON} className="btn btn-primary">
            <Download size={16} /> Export JSON
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Clock size={28} color="var(--accent-primary)" style={{ margin: '0 auto 0.5rem' }} />
          <div className="mono-time" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-number)' }}>
            {totalHours}h
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 600 }}>
            Total Focus Time ({totalMinutes} mins)
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <CheckCircle2 size={28} color="var(--accent-emerald)" style={{ margin: '0 auto 0.5rem' }} />
          <div className="mono-time" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            {totalSessions}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 600 }}>
            Completed Sessions
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Award size={28} color="var(--accent-amber)" style={{ margin: '0 auto 0.5rem' }} />
          <div className="mono-time" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
            {Object.keys(categoryCounts).length}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 600 }}>
            Active Categories
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Completed Timer History Log</h2>
          {history.length > 0 && (
            <button onClick={clearHistory} className="btn btn-secondary btn-sm" style={{ color: '#f87171' }}>
              <Trash2 size={14} /> Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>
            No completed sessions recorded yet. Start and complete a countdown timer to see logs here!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Title</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Duration</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Completed At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.title}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className={`badge badge-${(item.category || 'study').toLowerCase()}`}>
                        {item.category || 'General'}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {Math.floor(item.duration / 60)}m {item.duration % 60}s
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(item.completedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
