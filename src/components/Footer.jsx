import React from 'react';
import { Award, Code2, GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-glass)',
        background: 'rgba(10, 14, 23, 0.95)',
        padding: '2rem 1.5rem',
        marginTop: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem'
        }}
      >
        {/* Left student info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <GraduationCap size={18} color="var(--accent-primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
              Karan Ravindra Dikole
            </span>
            <span
              style={{
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600
              }}
            >
              PRN: 125M1H058
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Pimpri Chinchwad College of Engineering (PCCOE) • Department of MCA
          </p>
        </div>

        {/* Course & Faculty Info */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Code2 size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>
              Advanced Web Technologies (FA-2)
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            Course Owner: Dr. Avinash Chormale | Module Coordinator: Dr. Rajkamal Sangole
          </p>
        </div>
      </div>
    </footer>
  );
}
