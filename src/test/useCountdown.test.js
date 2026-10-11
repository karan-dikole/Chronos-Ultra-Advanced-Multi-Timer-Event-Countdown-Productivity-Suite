import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountdown } from '../hooks/useCountdown';

describe('useCountdown Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useCountdown({ initialSeconds: 120 }));

    expect(result.current.totalSeconds).toBe(120);
    expect(result.current.remainingSeconds).toBe(120);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.isCompleted).toBe(false);
  });

  it('should tick down every second when running', () => {
    const { result } = renderHook(() => useCountdown({ initialSeconds: 10, autoStart: true }));

    expect(result.current.remainingSeconds).toBe(10);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.remainingSeconds).toBe(7);
  });

  it('should trigger onComplete callback when reaching zero', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useCountdown({ initialSeconds: 2, autoStart: true, onComplete }));

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(result.current.remainingSeconds).toBe(0);
    expect(result.current.isCompleted).toBe(true);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('should support adding time dynamically', () => {
    const { result } = renderHook(() => useCountdown({ initialSeconds: 60 }));

    act(() => {
      result.current.addTime(60);
    });

    expect(result.current.remainingSeconds).toBe(120);
    expect(result.current.totalSeconds).toBe(120);
  });
});
