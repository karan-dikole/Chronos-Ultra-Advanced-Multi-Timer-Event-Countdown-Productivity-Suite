import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { soundEngine } from '../services/soundEngine';

const TimerContext = createContext(null);

// Initial Default Preset Timers
const DEFAULT_TIMERS = [
  {
    id: 'timer-1',
    title: 'AWT Lab Focus Sprint',
    category: 'Study',
    totalSeconds: 1500, // 25 min
    remainingSeconds: 1500,
    isRunning: false,
    sound: 'chime',
    color: '#6366f1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'timer-2',
    title: 'Short Coffee Break',
    category: 'Personal',
    totalSeconds: 300, // 5 min
    remainingSeconds: 300,
    isRunning: false,
    sound: 'bell',
    color: '#10b981',
    createdAt: new Date().toISOString()
  },
  {
    id: 'timer-3',
    title: 'React Code Debugging',
    category: 'Coding',
    totalSeconds: 2700, // 45 min
    remainingSeconds: 2700,
    isRunning: false,
    sound: 'digital',
    color: '#ec4899',
    createdAt: new Date().toISOString()
  }
];

// Initial Default Event Countdowns (Days/Hours/Mins/Secs)
const DEFAULT_EVENTS = [
  {
    id: 'event-1',
    title: 'PCCOE FA-2 Submission Deadline',
    targetDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    category: 'Exams',
    description: 'Final submission and demonstration of React Mini Project Phase II.',
    color: '#8b5cf6',
    sound: 'chime'
  },
  {
    id: 'event-2',
    title: 'End Semester University Exams',
    targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    category: 'Exams',
    description: 'Semester 3 Theory & Practical examinations.',
    color: '#3b82f6',
    sound: 'gong'
  },
  {
    id: 'event-3',
    title: 'New Year Celebration 2027',
    targetDate: '2027-01-01T00:00',
    category: 'Personal',
    description: 'Welcoming the new year with grand celebrations!',
    color: '#f59e0b',
    sound: 'bell'
  }
];

export const CATEGORIES = ['All', 'Study', 'Coding', 'Work', 'Fitness', 'Cooking', 'Exams', 'Personal'];

export function TimerProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('chronos_theme', 'light');
  const [timers, setTimers] = useLocalStorage('chronos_timers', DEFAULT_TIMERS);
  const [events, setEvents] = useLocalStorage('chronos_events', DEFAULT_EVENTS);
  const [history, setHistory] = useLocalStorage('chronos_history', []);
  const [soundEnabled, setSoundEnabled] = useLocalStorage('chronos_sound_enabled', true);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('chronos_notif_enabled', true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  // Sync theme with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  // Toast notification helper
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Trigger celebration & alert
  const triggerAlarm = useCallback((title, sound = 'chime') => {
    if (soundEnabled) {
      soundEngine.playSound(sound);
    }

    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('⏰ Timer Completed!', {
          body: `"${title}" has finished!`,
          icon: '/favicon.ico'
        });
      } catch (e) {
        console.warn(e);
      }
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti fails in test env
    }
  }, [soundEnabled, notificationsEnabled]);

  // Master 1-second tick for all running active timers
  useEffect(() => {
    const hasRunning = timers.some((t) => t.isRunning && t.remainingSeconds > 0);
    if (!hasRunning) return;

    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        let updated = false;
        const newTimers = prevTimers.map((timer) => {
          if (timer.isRunning && timer.remainingSeconds > 0) {
            updated = true;
            const nextSec = timer.remainingSeconds - 1;
            if (nextSec === 0) {
              // Finished
              triggerAlarm(timer.title, timer.sound);
              addToast(`Timer "${timer.title}" finished!`, 'success');
              
              // Record in history
              setHistory((h) => [
                {
                  id: 'hist-' + Date.now(),
                  title: timer.title,
                  category: timer.category,
                  duration: timer.totalSeconds,
                  completedAt: new Date().toISOString()
                },
                ...h
              ]);

              return {
                ...timer,
                remainingSeconds: 0,
                isRunning: false
              };
            }
            return {
              ...timer,
              remainingSeconds: nextSec
            };
          }
          return timer;
        });
        return updated ? newTimers : prevTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, triggerAlarm, addToast, setHistory, setTimers]);

  // Timer CRUD Operations
  const addTimer = useCallback((newTimer) => {
    const timer = {
      id: 'timer-' + Date.now(),
      title: newTimer.title || 'Untitled Timer',
      category: newTimer.category || 'General',
      totalSeconds: Number(newTimer.totalSeconds) || 60,
      remainingSeconds: Number(newTimer.totalSeconds) || 60,
      isRunning: Boolean(newTimer.autoStart),
      sound: newTimer.sound || 'chime',
      color: newTimer.color || '#6366f1',
      createdAt: new Date().toISOString()
    };
    setTimers((prev) => [timer, ...prev]);
    addToast(`Timer "${timer.title}" created successfully`, 'success');
    return timer;
  }, [setTimers, addToast]);

  const updateTimer = useCallback((id, updates) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          if (updates.totalSeconds !== undefined && t.remainingSeconds === t.totalSeconds) {
            updated.remainingSeconds = updates.totalSeconds;
          }
          return updated;
        }
        return t;
      })
    );
    addToast('Timer updated', 'info');
  }, [setTimers, addToast]);

  const deleteTimer = useCallback((id) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
    addToast('Timer removed', 'warning');
  }, [setTimers, addToast]);

  const toggleTimer = useCallback((id) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.remainingSeconds <= 0) {
            return { ...t, remainingSeconds: t.totalSeconds, isRunning: true };
          }
          return { ...t, isRunning: !t.isRunning };
        }
        return t;
      })
    );
  }, [setTimers]);

  const resetTimer = useCallback((id) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return { ...t, remainingSeconds: t.totalSeconds, isRunning: false };
        }
        return t;
      })
    );
  }, [setTimers]);

  const addTimeToTimer = useCallback((id, extraSeconds) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newRemaining = Math.max(0, t.remainingSeconds + extraSeconds);
          const newTotal = Math.max(t.totalSeconds, newRemaining);
          return { ...t, remainingSeconds: newRemaining, totalSeconds: newTotal };
        }
        return t;
      })
    );
  }, [setTimers]);

  // Event CRUD Operations
  const addEvent = useCallback((newEvent) => {
    const event = {
      id: 'event-' + Date.now(),
      title: newEvent.title || 'Untitled Event',
      targetDate: newEvent.targetDate,
      category: newEvent.category || 'General',
      description: newEvent.description || '',
      color: newEvent.color || '#8b5cf6',
      sound: newEvent.sound || 'chime',
      createdAt: new Date().toISOString()
    };
    setEvents((prev) => [event, ...prev]);
    addToast(`Event countdown "${event.title}" added`, 'success');
  }, [setEvents, addToast]);

  const updateEvent = useCallback((id, updates) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    addToast('Event updated', 'info');
  }, [setEvents, addToast]);

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    addToast('Event deleted', 'warning');
  }, [setEvents, addToast]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    addToast('History cleared', 'info');
  }, [setHistory, addToast]);

  // Filtered Timers
  const filteredTimers = useMemo(() => {
    return timers.filter((timer) => {
      const matchesCategory = selectedCategory === 'All' || timer.category === selectedCategory;
      const matchesSearch = timer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (timer.category && timer.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [timers, selectedCategory, searchQuery]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
      const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.description && ev.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  const totalActiveTimers = timers.filter((t) => t.isRunning).length;
  const totalCompletedCount = history.length;

  return (
    <TimerContext.Provider
      value={{
        theme,
        toggleTheme,
        timers,
        filteredTimers,
        events,
        filteredEvents,
        history,
        soundEnabled,
        setSoundEnabled,
        notificationsEnabled,
        setNotificationsEnabled,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        triggerAlarm,
        addTimer,
        updateTimer,
        deleteTimer,
        toggleTimer,
        resetTimer,
        addTimeToTimer,
        addEvent,
        updateEvent,
        deleteEvent,
        clearHistory,
        totalActiveTimers,
        totalCompletedCount
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}
