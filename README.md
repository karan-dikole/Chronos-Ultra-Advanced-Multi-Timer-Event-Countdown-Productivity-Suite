# Chronos Ultra — Advanced Multi-Timer & Event Countdown Suite
### Formative Assessment – 2 (FA-2) | Advanced Web Technologies
**Student Name:** Karan Ravindra Dikole  
**PRN:** `125M1H058` | **Class:** SYMCA (Semester III)  
**Institution:** Pimpri Chinchwad College of Engineering (PCCOE)  
**Course Owner:** Dr. Avinash Chormale | **Module Coordinator:** Dr. Rajkamal Sangole  

---

## 🔗 Project Links
- **GitHub Repository:** [https://github.com/karandikole2005/AWT-FA2-Countdown-Timer](https://github.com/karandikole2005/AWT-FA2-Countdown-Timer)
- **Live Application:** [https://karandikole2005.github.io/AWT-FA2-Countdown-Timer/](https://karandikole2005.github.io/AWT-FA2-Countdown-Timer/)
- **PowerPoint Presentation File:** `Chronos_Ultra_Presentation.pptx` (Generated in root directory)
- **Comprehensive Project Report:** `PROJECT_REPORT.md` (8–10 pages formatted for PCCOE MCA evaluation)

---

## 🌟 Overview
**Chronos Ultra** is a modern, responsive, component-driven web application built with **React 19**, **Vite 8**, **React Router v7**, and the browser **Web Audio API**. It provides high-precision concurrent countdown timers, milestone tracking, Pomodoro focus sessions, REST API timezone synchronization, and exportable analytics.

---

## 🚀 Key Features (FA-2 Scope)
- ⏱️ **Multi-Timer Dashboard:** Concurrent active countdowns with animated SVG progress rings, quick +1m/+5m time extensions, and customizable color accents.
- 🎯 **Target Date Event Countdowns:** Long-term milestone trackers (Days/Hours/Mins/Secs) for academic exams, project deadlines, and holidays.
- 🍅 **Pomodoro Focus Suite:** 25m Focus, 5m Short Break, and 15m Long Break intervals with session streak tracking.
- 🌐 **REST API World Time Sync:** Real-time global timezones fetched via WorldTimeAPI with offline browser fallback.
- 🔊 **Zero-Dependency Web Audio Synth:** 5 synthesized alert tones (Chime, Beep, Digital Alarm, Bell, Gong) built on Web Audio API.
- ☀️ **Dual Themes (Bright & Dark):** High-contrast radiant Bright Theme by default, with instant Sun/Moon theme toggle.
- 💾 **LocalStorage Persistence:** Auto-saves timers, event targets, sound preferences, and history logs.
- 📊 **Analytics & Data Export:** Focus metrics, category breakdown, and one-click export to CSV & JSON.
- 🧪 **Automated Testing Suite:** Unit and component tests with Vitest and React Testing Library (100% pass rate).
- 🛡️ **Error Boundary & Validation:** Graceful error catching and live form boundary validation.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

### 5. Generate / Regenerate PowerPoint PPTX
```bash
npm run ppt
```

### 6. Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 📁 Project Structure
```
d:/AWT FA2/
├── .github/workflows/deploy.yml # Automated GitHub Actions CI/CD to GitHub Pages
├── src/
│   ├── components/       # UI Components (TimerCard, EventCard, Modal, Navbar, Footer, etc.)
│   ├── context/          # Central TimerContext state provider & tick dispatcher
│   ├── hooks/            # Custom Hooks (useCountdown, useLocalStorage, useAudioAlert, useWorldTime)
│   ├── pages/            # Multi-page Views (Dashboard, Events, Pomodoro, WorldTime, Analytics, About)
│   ├── services/         # Web Audio API Synth & REST API client
│   ├── test/             # Vitest & React Testing Library test suites
│   ├── App.jsx           # Main Router and layout assembly
│   ├── index.css         # Radiant Bright & Dark theme CSS design system
│   └── main.jsx          # React DOM entry point
├── Chronos_Ultra_Presentation.pptx # 10-Slide Professional PowerPoint Presentation
├── PROJECT_REPORT.md     # 8-10 Page Academic Submission Report
├── PRESENTATION.md       # Slide Deck in Markdown format
├── VIVA_QUESTIONS_AND_ANSWERS.md # Technical Viva Preparation Guide
└── package.json
```
