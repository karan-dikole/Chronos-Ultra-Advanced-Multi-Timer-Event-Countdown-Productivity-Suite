import { useCallback } from 'react';
import { soundEngine } from '../services/soundEngine';

/**
 * Custom Hook for playing synthesized audio alerts and browser notifications
 */
export function useAudioAlert() {
  const playAlert = useCallback((soundType = 'chime') => {
    try {
      soundEngine.playSound(soundType);
    } catch (err) {
      console.warn('Audio playback error:', err);
    }
  }, []);

  const sendNotification = useCallback((title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options
        });
      } catch (err) {
        console.warn('Notification error:', err);
      }
    }
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  return {
    playAlert,
    sendNotification,
    requestNotificationPermission
  };
}
