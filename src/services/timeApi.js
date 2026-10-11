// API Integration Service for Live Timezones & Network Time Sync

export const TIMEZONES = [
  { id: 'Asia/Kolkata', name: 'India (IST)', offset: '+05:30', city: 'Mumbai / Pune', flag: '🇮🇳' },
  { id: 'UTC', name: 'Universal Coordinated Time (UTC)', offset: '+00:00', city: 'UTC / GMT', flag: '🌐' },
  { id: 'America/New_York', name: 'Eastern Time (US & Canada)', offset: '-05:00', city: 'New York', flag: '🇺🇸' },
  { id: 'America/Los_Angeles', name: 'Pacific Time (US & Canada)', offset: '-08:00', city: 'San Francisco', flag: '🇺🇸' },
  { id: 'Europe/London', name: 'Greenwich Mean Time (UK)', offset: '+00:00', city: 'London', flag: '🇬🇧' },
  { id: 'Europe/Paris', name: 'Central European Time', offset: '+01:00', city: 'Paris / Berlin', flag: '🇪🇺' },
  { id: 'Asia/Dubai', name: 'Gulf Standard Time', offset: '+04:00', city: 'Dubai', flag: '🇦🇪' },
  { id: 'Asia/Singapore', name: 'Singapore Standard Time', offset: '+08:00', city: 'Singapore', flag: '🇸🇬' },
  { id: 'Asia/Tokyo', name: 'Japan Standard Time', offset: '+09:00', city: 'Tokyo', flag: '🇯🇵' },
  { id: 'Australia/Sydney', name: 'Australian Eastern Time', offset: '+11:00', city: 'Sydney', flag: '🇦🇺' }
];

export async function fetchWorldTime(timezone = 'Asia/Kolkata') {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // Using worldtimeapi.org or fallback to standard JS Intl
    const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      datetime: data.datetime,
      timezone: data.timezone,
      utcOffset: data.utc_offset,
      dayOfWeek: data.day_of_week,
      source: 'network'
    };
  } catch (err) {
    // Graceful offline fallback using browser Intl API
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return {
      datetime: now.toISOString(),
      timezone: timezone,
      utcOffset: 'Local/Calculated',
      source: 'offline-fallback',
      error: err.message
    };
  }
}

export function formatTimezoneTime(timezone, baseDate = new Date()) {
  try {
    const timeString = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(baseDate);

    const dateString = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(baseDate);

    return { timeString, dateString };
  } catch {
    return {
      timeString: baseDate.toLocaleTimeString(),
      dateString: baseDate.toLocaleDateString()
    };
  }
}
