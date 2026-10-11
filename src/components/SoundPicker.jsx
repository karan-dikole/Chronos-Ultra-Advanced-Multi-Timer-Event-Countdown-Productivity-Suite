import React from 'react';
import { Volume2, Play } from 'lucide-react';
import { AVAILABLE_SOUNDS, soundEngine } from '../services/soundEngine';

export function SoundPicker({ value, onChange }) {
  const handleTestSound = (e, soundId) => {
    e.preventDefault();
    e.stopPropagation();
    soundEngine.playSound(soundId);
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
        Completion Alert Tone
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
        {AVAILABLE_SOUNDS.map((sound) => {
          const isSelected = value === sound.id;
          return (
            <div
              key={sound.id}
              onClick={() => onChange(sound.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Volume2 size={16} color={isSelected ? '#818cf8' : '#94a3b8'} />
                <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 600 : 400, color: isSelected ? '#f8fafc' : '#cbd5e1' }}>
                  {sound.name.split(' ')[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => handleTestSound(e, sound.id)}
                title="Preview sound"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <Play size={10} fill="currentColor" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
