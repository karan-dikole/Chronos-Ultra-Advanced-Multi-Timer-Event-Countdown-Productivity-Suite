import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimerCard } from '../components/TimerCard';
import { TimerProvider } from '../context/TimerContext';

describe('TimerCard Component', () => {
  const mockTimer = {
    id: 'test-1',
    title: 'AWT Mini Project Sprint',
    category: 'Study',
    totalSeconds: 300,
    remainingSeconds: 300,
    isRunning: false,
    sound: 'chime',
    color: '#6366f1'
  };

  it('renders timer title and category properly', () => {
    render(
      <TimerProvider>
        <TimerCard timer={mockTimer} />
      </TimerProvider>
    );

    expect(screen.getByText('AWT Mini Project Sprint')).toBeInTheDocument();
    expect(screen.getByText('Study')).toBeInTheDocument();
    expect(screen.getByText('05:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
