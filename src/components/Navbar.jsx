import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Timer, Calendar, Flame, Globe, BarChart2, Info, Volume2, VolumeX, Bell, Sun, Moon } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';
import { useAudioAlert } from '../hooks/useAudioAlert';

export function Navbar() {
  const { totalActiveTimers, soundEnabled, setSoundEnabled, theme, toggleTheme, addToast } = useTimerContext();
  const { requestNotificationPermission } = useAudioAlert();

  const handleNotificationRequest = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      addToast('Browser notifications enabled!', 'success');
    } else {
      addToast('Notification permission was not granted', 'warning');
    }
  };

  const navLinks = [
    { to: '/', label: 'Timers', icon: Timer, count: totalActiveTimers },
    { to: '/events', label: 'Events', icon: Calendar },
    { to: '/pomodoro', label: 'Pomodoro', icon: Flame },
    { to: '/world-clock', label: 'World Clock', icon: Globe },
    { to: '/analytics', label: 'Analytics', icon: BarChart2 },
    { to: '/about', label: 'Project Info', icon: Info }
  ];

  return (
    <header
      className="navbar-header"
      style={{
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glass)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Brand */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
            }}
          >
            <Timer size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              Chronos<span className="gradient-text">Ultra</span>
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.68rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              PCCOE SYMCA • FA-2
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span
                    style={{
                      background: 'var(--accent-emerald)',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.1rem 0.45rem',
                      fontSize: '0.7rem',
                      fontWeight: 800
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Global Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Theme Switcher */}
          <button
            onClick={() => {
              toggleTheme();
              addToast(`Switched to ${theme === 'light' ? 'Dark' : 'Bright'} theme`, 'info');
            }}
            className="btn btn-secondary btn-icon"
            style={{ width: '36px', height: '36px' }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Bright Mode'}
          >
            {theme === 'light' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#a5b4fc" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              addToast(`Sound alerts ${!soundEnabled ? 'enabled' : 'disabled'}`, 'info');
            }}
            className="btn btn-secondary btn-icon"
            style={{ width: '36px', height: '36px' }}
            title={soundEnabled ? 'Mute sound alerts' : 'Enable sound alerts'}
          >
            {soundEnabled ? <Volume2 size={16} color="var(--accent-emerald)" /> : <VolumeX size={16} color="var(--text-muted)" />}
          </button>

          {/* Browser Notifications */}
          <button
            onClick={handleNotificationRequest}
            className="btn btn-secondary btn-icon"
            style={{ width: '36px', height: '36px' }}
            title="Enable Desktop Notifications"
          >
            <Bell size={16} color="var(--accent-primary)" />
          </button>
        </div>
      </div>
    </header>
  );
}

