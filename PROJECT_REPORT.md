# PIMPRI CHINCHWAD EDUCATION TRUST'S
# PIMPRI CHINCHWAD COLLEGE OF ENGINEERING (PCCOE)
### Department of Master of Computer Applications (MCA)
**Academic Year:** 2026 – 2027 | **Semester:** III | **Class:** SYMCA  
**Course Name:** Advanced Web Technologies (AWT)  
**Course Owner:** Dr. Avinash Chormale | **Module Coordinator:** Dr. Rajkamal Sangole  

---

# FORMATIVE ASSESSMENT – 2 (FA-2) PROJECT REPORT
## **Project Title:** Chronos Ultra — Advanced Multi-Timer, Event Countdown & Productivity Suite

**Submitted By:**
- **Student Name:** Karan Ravindra Dikole
- **PRN:** `125M1H058`
- **Roll No:** 58

---

## PROJECT LINKS & REPOSITORY DETAILS

- **GitHub Repository Link:** [https://github.com/karan-dikole/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite](https://github.com/karan-dikole/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite)
- **Live Deployment Link:** [https://karan-dikole.github.io/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite/](https://karan-dikole.github.io/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite/)
- **PowerPoint Presentation Deck:** `Chronos_Ultra_Presentation.pptx` (Located in root directory)

---

## TABLE OF CONTENTS
1. [Executive Summary / Abstract](#1-executive-summary--abstract)
2. [Problem Identification & Objectives](#2-problem-identification--objectives)
3. [System Architecture & Component Hierarchy](#3-system-architecture--component-hierarchy)
4. [Phase-II Advanced Features Implementation](#4-phase-ii-advanced-features-implementation)
   - 4.1 React Hooks Implementation
   - 4.2 React Router Navigation & Architecture
   - 4.3 Forms, Validation & Error Handling
   - 4.4 REST API & Timezone Synchronization
   - 4.5 CRUD Operations & State Persistence
   - 4.6 Web Audio API Synthesizer & Desktop Notifications
5. [Search, Categorization & Filtering Engine](#5-search-categorization--filtering-engine)
6. [Testing, Debugging & Performance Optimization](#6-testing-debugging--performance-optimization)
7. [Screenshots & UI Design Specification](#7-screenshots--ui-design-specification)
8. [Course Outcome (CO) & Bloom's Taxonomy Mapping](#8-course-outcome-co--blooms-taxonomy-mapping)
9. [Conclusion & Future Scope](#9-conclusion--future-scope)
10. [References](#10-references)

---

## 1. Executive Summary / Abstract

Effective time management and deadline awareness are critical skills in modern computing education and professional practice. Traditional web timer utilities often suffer from single-threaded limitations, lack of multi-timer support, external audio asset delivery failures, and absence of persistent milestone tracking.

**Chronos Ultra** is a full-featured, responsive, component-driven web application built using **React 19**, **JavaScript (ES6+)**, **Vite 8**, and **React Router DOM v7**. It extends the Phase-I core timer by introducing:
- Multi-instance concurrent countdown timers with animated SVG progress rings.
- Target-date event countdowns (Days/Hours/Mins/Secs) for exams, project deadlines, and milestones.
- Pomodoro & Interval focus technique suite with streak and round management.
- REST API integration via WorldTimeAPI for live global timezone synchronization.
- LocalStorage state persistence with fallback data synchronization.
- In-browser synthesized audio alerts via the Web Audio API without third-party audio files.
- Exportable focus history (CSV & JSON) and automated testing using Vitest and React Testing Library.

---

## 2. Problem Identification & Objectives

### 2.1 Problem Identification
- **Single-Timer Limitation:** Most basic countdown utilities can only track one counter at a time.
- **Data Loss on Refresh:** Lack of persistence resets all active counters upon tab reload.
- **Audio Asset Failure:** Relying on external `.mp3` links causes broken alerts if URLs change or offline.
- **Disjointed Timers vs Events:** Users need separate tools for short-term intervals (e.g., 25m Pomodoro) and long-term milestones (e.g., Exam on Nov 20).

### 2.2 Objectives
1. **Apply Advanced React Principles:** Implement modular functional components, Context API, and custom hooks (`useCountdown`, `useLocalStorage`, `useAudioAlert`, `useWorldTime`).
2. **Implement Multi-Route Single Page Application:** Enable seamless client-side navigation using React Router v7.
3. **Ensure Zero-Failure Alerts:** Utilize browser-native Web Audio API frequency synthesis for crisp alarm tones.
4. **Provide Full CRUD Operations:** Create, Read, Update, Delete, and Batch Clear countdown items with live filtering and search.
5. **Demonstrate Software Testing:** Provide automated unit tests verifying timer tick down, interval cleanup, and completion triggers.

---

## 3. System Architecture & Component Hierarchy

```
                                  [App.jsx]
                                      │
                         ┌────────────┴────────────┐
                 [ErrorBoundary]               [TimerProvider]
                         │                         │
            ┌────────────┴────────────┬────────────┴────────────┐
         [Navbar]                [Routes]                  [Footer]
            │                         │                         │
      [ToastContainer]      ┌─────────┼─────────┬───────────────┤
                            │         │         │               │
                     [Dashboard]  [Events]  [Pomodoro]    [WorldClock]
                            │         │         │               │
                     [TimerCard] [EventCard] [Analytics]     [About]
                            │         │
                     [TimerModal] ◄───┘
```

---

## 4. Phase-II Advanced Features Implementation

### 4.1 React Hooks Implementation
- **`useState`**: Tracks active remaining seconds, search query, selected category tags, and modal forms.
- **`useEffect`**: Manages the single master interval ticker (1000ms) that ticks all running timers concurrently, preventing memory leaks through cleanup callbacks (`clearInterval`).
- **`useRef`**: Tracks completion callback instances and prevents stale closure execution.
- **`useMemo`**: Computes filtered timer subsets and analytics metrics without unnecessary recalculations.
- **`useCallback`**: Memoizes action handlers (`toggleTimer`, `resetTimer`, `deleteTimer`, `addToast`) passed to children.
- **Custom Hooks Developed:**
  1. `useCountdown`: Encapsulates start, pause, resume, reset, add-time, progress %, and onComplete callbacks.
  2. `useLocalStorage`: Handles synchronized, error-safe JSON serialization to `window.localStorage`.
  3. `useAudioAlert`: Drives synthesized tones and native browser desktop notifications.
  4. `useWorldTime`: Fetches network time for timezones and falls back to JavaScript `Intl.DateTimeFormat`.

### 4.2 React Router Navigation
The application employs React Router with standard client-side routing:
- `/`: Multi-timer dashboard & instant preset launchers.
- `/events`: Target-date long-term countdown milestones.
- `/pomodoro`: Structured 25/5/15 Pomodoro focus technique suite.
- `/world-clock`: Live timezone clocks via REST API.
- `/analytics`: Session logs, focus statistics, and CSV/JSON export.
- `/about`: Project compliance matrix, student details, and syllabus mappings.

### 4.3 Forms, Validation & Error Handling
- Comprehensive validation rules for timer creation:
  - Title length constraints ($\ge 3$ characters).
  - Duration constraint: Total seconds $> 0$.
  - Target Date constraint: Event datetime must be in the future.
- **Error Boundary:** Class-based component catching React lifecycle errors and rendering a self-healing fallback UI.

### 4.4 REST API & Timezone Synchronization
- Integrates with `https://worldtimeapi.org/api/timezone/{zone}`.
- Employs an `AbortController` timeout (4s) to ensure fast rendering.
- Seamless fallback to native browser `Intl.DateTimeFormat` if offline.

### 4.5 Web Audio API Synthesizer
Instead of external MP3s, audio alerts are generated using `AudioContext`, `OscillatorNode`, and `GainNode`:
- **Chime:** C5 - E5 - G5 - C6 melodic arpeggio.
- **Beep:** 880Hz to 440Hz exponential frequency ramp.
- **Digital Alarm:** Triple pulsed 1000Hz-1200Hz square waves.
- **Bell:** 587Hz resonant decay sine wave.
- **Gong:** 220Hz harmonic sawtooth pulse.

---

## 5. Search, Categorization & Filtering Engine

The application features instant multi-criteria filtering:
1. **Category Filter:** Filter by tags (`All`, `Study`, `Coding`, `Work`, `Fitness`, `Cooking`, `Exams`, `Personal`).
2. **Search Query:** Real-time text filter matching titles and descriptions.
3. **State Filter:** View running, paused, and completed counters.

---

## 6. Testing, Debugging & Performance Optimization

### 6.1 Automated Test Suite
Vitest and `@testing-library/react` are used to guarantee timer logic reliability:
- **`useCountdown.test.js`**:
  - Test 1: Initialization with total/remaining seconds.
  - Test 2: Accurate tick down with `vi.advanceTimersByTime(3000)`.
  - Test 3: `onComplete` firing upon reaching 0 seconds.
  - Test 4: Dynamic time increment (`addTime`).
- **`TimerCard.test.jsx`**:
  - Validates title, category badge, and time display formatting.

### 6.2 Test Results
```
✓ src/test/useCountdown.test.js (4 tests)
✓ src/test/TimerCard.test.jsx (1 test)
Test Files: 2 passed (2)
Tests: 5 passed (5)
Duration: 1.15s
```

### 6.3 Performance Optimization
- **Production Build:** Bundle size minimized to 105 kB gzipped JavaScript and 2.9 kB CSS.
- **Single Global Ticker:** One central interval drives all running timers, eliminating interval drift and CPU thrashing.
- **SVG Circular Animation:** Progress rings computed via hardware-accelerated SVG `strokeDashoffset`.

---

## 7. Course Outcome (CO) & Bloom's Taxonomy Mapping

| Evaluation Criteria | CO1 | CO2 | CO3 | Bloom's Level |
| :--- | :---: | :---: | :---: | :---: |
| Problem Analysis & System Design | ✓ | | | L4 (Analyze) |
| JavaScript (ES6+) Implementation | ✓ | | | L3 (Apply) |
| React Components & UI Development | | ✓ | ✓ | L5 (Evaluate) |
| Routing, Hooks, API & CRUD | | | ✓ | L6 (Create) |
| Testing, Debugging & Optimization | | ✓ | ✓ | L5 (Evaluate) |
| Documentation & Presentation | ✓ | ✓ | ✓ | L6 (Create) |

---

## 8. Conclusion & Future Scope

### 8.1 Conclusion
The **Chronos Ultra** Countdown Timer Suite successfully fulfills all requirements of **Formative Assessment – 2 (FA-2)** for the Advanced Web Technologies course. By combining modern React 19 architecture, custom hooks, audio synthesis, REST API communication, client-side routing, automated test coverage, and dual-theme presentation, the application delivers a complete, production-grade productivity solution.

### 8.2 Future Scope
- Backend cloud synchronization with user authentication (Firebase / Supabase).
- Audio recording feature for personalized voice alerts.
- Progressive Web App (PWA) offline installation with background service workers.

---

## 9. References
1. React 19 Documentation: https://react.dev/
2. React Router Documentation: https://reactrouter.com/
3. MDN Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
4. Vitest Testing Framework: https://vitest.dev/
5. PCCOE MCA Department AWT Course Syllabus & FA Guidelines.
