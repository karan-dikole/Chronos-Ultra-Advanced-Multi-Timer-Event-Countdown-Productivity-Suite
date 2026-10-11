import React from 'react';
import { Award, BookOpen, CheckCircle, Code, Layers, ShieldCheck, User } from 'lucide-react';

export function AboutPage() {
  const fa2Features = [
    { title: 'React Hooks Mastery', desc: 'useState, useEffect, useRef, useMemo, useCallback, and 4 Custom Hooks (useCountdown, useLocalStorage, useAudioAlert, useWorldTime).' },
    { title: 'React Router v7 Navigation', desc: 'Multi-page architecture with dynamic routing (Timers, Events, Pomodoro, World Clock, Analytics, About).' },
    { title: 'Forms & Live Validation', desc: 'Custom duration & target date creators, regex and field boundary checks, responsive UI error highlights.' },
    { title: 'REST API & Timezone Sync', desc: 'WorldTimeAPI integration with resilient offline fallback using modern Intl DateTimeFormat.' },
    { title: 'Full CRUD & State Persistence', desc: 'Create, Read, Update, Delete, and Batch Clear operations synced seamlessly to browser LocalStorage.' },
    { title: 'Audio Alert Synthesizer', desc: 'Zero-asset Web Audio API harmonic oscillator engine (Chime, Beep, Bell, Digital Alarm, Gong).' },
    { title: 'Search & Category Filters', desc: 'Real-time multi-dimensional filter system by category tags, search terms, and active states.' },
    { title: 'Error Boundary & Robustness', desc: 'Class-based Error Boundary with friendly fallback recovery UI to prevent application crashes.' },
    { title: 'Testing Suite (Vitest & RTL)', desc: 'Unit & component test coverage with Vitest and React Testing Library.' }
  ];

  return (
    <div className="animate-slide-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Student & Course Academic Card */}
      <div
        className="glass-card"
        style={{
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          borderTop: '5px solid var(--accent-primary)',
          background: 'var(--about-hero-gradient)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Award size={28} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Formative Assessment – 2 (FA-2) Project Overview
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Student Name</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Karan Ravindra Dikole</div>
          </div>
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>PRN</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>125M1H058</div>
          </div>
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Class & Program</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>SYMCA • Semester III</div>
          </div>
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Institution</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>PCCOE, Pune</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span><strong>Course:</strong> Advanced Web Technologies</span>
          <span><strong>Course Owner:</strong> Dr. Avinash Chormale</span>
          <span><strong>Module Coordinator:</strong> Dr. Rajkamal Sangole</span>
        </div>
      </div>

      {/* FA-2 Deliverables Checklist */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
          <ShieldCheck size={22} color="var(--accent-emerald)" />
          FA-2 Syllabus & Requirements Implementation Matrix
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {fa2Features.map((item, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1rem', borderLeft: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem', fontSize: '0.95rem' }}>
                <CheckCircle size={16} color="var(--accent-emerald)" />
                {item.title}
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={22} color="var(--accent-primary)" />
          Technical Stack & Architecture
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          Built with <strong>React 19</strong> and <strong>Vite</strong> for lightning-fast HMR and bundle optimization. The state layer utilizes a centralized Context Provider with custom hooks for audio synthesis and real-time world synchronization. Responsive styling is implemented using custom glassmorphic CSS variables, delivering top-tier performance and 60fps animations.
        </p>
      </div>
    </div>
  );
}
