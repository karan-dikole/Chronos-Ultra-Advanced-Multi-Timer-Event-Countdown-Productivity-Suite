import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom Hook for high-precision countdown logic
 * @param {Object} options
 * @param {number} options.initialSeconds - Duration in seconds
 * @param {boolean} options.autoStart - Whether to start immediately
 * @param {Function} options.onComplete - Callback when timer reaches 0
 */
export function useCountdown({ initialSeconds = 60, autoStart = false, onComplete = null } = {}) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Interval timer
  useEffect(() => {
    if (!isRunning || isPaused || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsCompleted(true);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, remainingSeconds]);

  const start = useCallback(() => {
    if (remainingSeconds <= 0) {
      setRemainingSeconds(totalSeconds);
    }
    setIsRunning(true);
    setIsPaused(false);
    setIsCompleted(false);
  }, [remainingSeconds, totalSeconds]);

  const pause = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (remainingSeconds > 0) {
      setIsPaused(false);
      setIsRunning(true);
    }
  }, [remainingSeconds]);

  const reset = useCallback((newInitialSeconds) => {
    const sec = typeof newInitialSeconds === 'number' ? newInitialSeconds : totalSeconds;
    setTotalSeconds(sec);
    setRemainingSeconds(sec);
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
  }, [totalSeconds]);

  const addTime = useCallback((secondsToAdd) => {
    setRemainingSeconds((prev) => Math.max(0, prev + secondsToAdd));
    setTotalSeconds((prev) => Math.max(0, prev + secondsToAdd));
    setIsCompleted(false);
  }, []);

  // Time calculations
  const days = Math.floor(remainingSeconds / (3600 * 24));
  const hours = Math.floor((remainingSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  // Percentage progress (0% to 100%)
  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 100;

  const formattedTime = [
    hours > 0 || days > 0 ? String(hours + days * 24).padStart(2, '0') : null,
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ].filter(Boolean).join(':');

  return {
    remainingSeconds,
    totalSeconds,
    isRunning,
    isPaused,
    isCompleted,
    days,
    hours,
    minutes,
    seconds,
    progress,
    formattedTime,
    start,
    pause,
    resume,
    reset,
    addTime,
    setRemainingSeconds
  };
}
