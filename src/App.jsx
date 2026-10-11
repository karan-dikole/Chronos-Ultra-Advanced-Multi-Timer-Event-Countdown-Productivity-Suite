import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { DashboardPage } from './pages/DashboardPage';
import { EventsPage } from './pages/EventsPage';
import { PomodoroPage } from './pages/PomodoroPage';
import { WorldTimePage } from './pages/WorldTimePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <ErrorBoundary>
      <TimerProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/pomodoro" element={<PomodoroPage />} />
                <Route path="/world-clock" element={<WorldTimePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </TimerProvider>
    </ErrorBoundary>
  );
}
