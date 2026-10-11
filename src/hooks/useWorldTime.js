import { useState, useEffect, useCallback } from 'react';
import { fetchWorldTime, formatTimezoneTime } from '../services/timeApi';

/**
 * Custom hook to manage world clocks and live time updates
 */
export function useWorldTime(timezone = 'Asia/Kolkata') {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshApiTime = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchWorldTime(timezone);
      setApiData(data);
      if (data.datetime) {
        setCurrentTime(new Date(data.datetime));
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timezone]);

  // Initial fetch
  useEffect(() => {
    refreshApiTime();
  }, [refreshApiTime]);

  // Local ticker every 1000ms
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { timeString, dateString } = formatTimezoneTime(timezone, currentTime);

  return {
    currentTime,
    timeString,
    dateString,
    apiData,
    loading,
    error,
    refreshApiTime
  };
}
