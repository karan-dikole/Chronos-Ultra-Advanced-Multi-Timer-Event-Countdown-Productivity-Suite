const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();

pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Karan Ravindra Dikole';
pptx.company = 'Pimpri Chinchwad College of Engineering (PCCOE)';
pptx.subject = 'AWT FA-2 Mini Project Presentation';
pptx.title = 'Chronos Ultra - Countdown Timer Suite';

// Color Palette
const COLORS = {
  primary: '3B49DF',
  dark: '0F172A',
  cardBg: 'F8FAFC',
  accent: '6366F1',
  secondary: '06B6D4',
  emerald: '10B981',
  muted: '64748B',
  white: 'FFFFFF',
  gold: 'F59E0B'
};

// SLIDE 1: Title Slide
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.dark };

  // Decorative top bar
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.accent } });

  slide.addText('PIMPRI CHINCHWAD EDUCATION TRUST’S\nPIMPRI CHINCHWAD COLLEGE OF ENGINEERING (PCCOE)', {
    x: 0.8, y: 0.6, w: 11.5, h: 0.8,
    fontSize: 14, color: COLORS.secondary, bold: true, align: 'center', fontFace: 'Arial'
  });

  slide.addText('Department of Master of Computer Applications (MCA) | Academic Year 2026-2027', {
    x: 0.8, y: 1.3, w: 11.5, h: 0.4,
    fontSize: 11, color: COLORS.muted, align: 'center', fontFace: 'Arial'
  });

  slide.addText('CHRONOS ULTRA', {
    x: 0.8, y: 2.1, w: 11.5, h: 1.0,
    fontSize: 40, color: COLORS.white, bold: true, align: 'center', fontFace: 'Arial'
  });

  slide.addText('Advanced Multi-Timer, Event Countdown & Productivity Suite (Phase-II)', {
    x: 0.8, y: 3.1, w: 11.5, h: 0.6,
    fontSize: 18, color: COLORS.gold, bold: true, align: 'center', fontFace: 'Arial'
  });

  // Student Details Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 4.2, w: 8.3, h: 2.4,
    fill: { color: '1E293B' }, line: { color: COLORS.accent, width: 1.5 }, rectRadius: 0.15
  });

  slide.addText([
    { text: 'Student Name: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'Karan Ravindra Dikole\n', options: { color: COLORS.white, bold: true } },
    { text: 'PRN: ', options: { bold: true, color: COLORS.secondary } },
    { text: '125M1H058    |    ', options: { color: COLORS.white } },
    { text: 'Class: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'SYMCA (Semester III)\n', options: { color: COLORS.white } },
    { text: 'Course: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'Advanced Web Technologies (AWT) - Formative Assessment 2 (FA-2)\n', options: { color: COLORS.white } },
    { text: 'Faculty / Mentors: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'Dr. Avinash Chormale (Course Owner) & Dr. Rajkamal Sangole (Coordinator)', options: { color: COLORS.muted } }
  ], {
    x: 2.8, y: 4.4, w: 7.7, h: 2.0,
    fontSize: 13, align: 'center', fontFace: 'Arial', lineSpacing: 22
  });
}

// Helper function for content slides
function createHeader(slide, title, subtitle) {
  slide.background = { color: 'F1F5F9' };
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: COLORS.primary } });
  slide.addText(title, {
    x: 0.8, y: 0.4, w: 11, h: 0.6,
    fontSize: 24, color: COLORS.dark, bold: true, fontFace: 'Arial'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8, y: 0.95, w: 11, h: 0.4,
      fontSize: 12, color: COLORS.muted, fontFace: 'Arial'
    });
  }
}

// SLIDE 2: Problem Statement & Motivation
{
  const slide = pptx.addSlide();
  createHeader(slide, '1. Problem Statement & Motivation', 'Why standard browser timers fail in real-world scenarios');

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.5, h: 4.8,
    fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
  });
  slide.addText('Limitations of Existing Tools', {
    x: 1.1, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, color: 'DC2626', bold: true, fontFace: 'Arial'
  });
  slide.addText([
    { text: '• Single-Timer Constraint: ', options: { bold: true } },
    { text: 'Users cannot monitor concurrent tasks or sprint intervals simultaneously.\n\n' },
    { text: '• State Volatility: ', options: { bold: true } },
    { text: 'Accidental browser reloads or tab closures wipe out active timers.\n\n' },
    { text: '• External Audio Failure: ', options: { bold: true } },
    { text: 'Relying on hosted MP3 files causes 404s, CORS blocks, or silence when offline.\n\n' },
    { text: '• No Milestone Tracking: ', options: { bold: true } },
    { text: 'Lack of days/hours/minutes countdowns for semester exams and deadlines.' }
  ], {
    x: 1.1, y: 2.4, w: 4.9, h: 3.7,
    fontSize: 12, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 18
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.7, y: 1.6, w: 5.8, h: 4.8,
    fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
  });
  slide.addText('The Chronos Ultra Solution', {
    x: 7.0, y: 1.9, w: 5.2, h: 0.4,
    fontSize: 16, color: COLORS.emerald, bold: true, fontFace: 'Arial'
  });
  slide.addText([
    { text: '✓ Concurrent Multi-Timers: ', options: { bold: true } },
    { text: 'Central tick dispatcher managing independent countdown instances.\n\n' },
    { text: '✓ Resilient State Persistence: ', options: { bold: true } },
    { text: 'LocalStorage synchronizer restoring state across browser sessions.\n\n' },
    { text: '✓ Web Audio API Synthesis: ', options: { bold: true } },
    { text: 'Mathematical harmonic frequencies (chimes, beeps) with zero external dependencies.\n\n' },
    { text: '✓ Dual-Horizon Engine: ', options: { bold: true } },
    { text: 'Handles micro-focus intervals (Pomodoro) alongside macro target date events.' }
  ], {
    x: 7.0, y: 2.4, w: 5.2, h: 3.7,
    fontSize: 12, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 18
  });
}

// SLIDE 3: System Architecture & Tech Stack
{
  const slide = pptx.addSlide();
  createHeader(slide, '2. System Architecture & Tech Stack', 'Modern component-driven Single Page Application design');

  const tech = [
    { name: 'React 19', role: 'Component Framework', detail: 'Functional components, Hooks, Virtual DOM reconciliation' },
    { name: 'Vite 8', role: 'Build Tool & Bundler', detail: 'Instant HMR, tree-shaking, production bundle optimization' },
    { name: 'React Router v7', role: 'Client Routing', detail: 'Multi-view navigation with zero full-page browser reloads' },
    { name: 'Context API', role: 'State Management', detail: 'Single source of truth for timers, events, and session logs' },
    { name: 'Web Audio API', role: 'Sound Synthesis', detail: 'AudioContext oscillator & gain nodes for zero-failure alerts' },
    { name: 'Vitest & RTL', role: 'Automated Testing', detail: 'Unit test suite with mocked timers and component validation' }
  ];

  tech.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.0;
    const y = 1.6 + row * 2.6;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 3.7, h: 2.3,
      fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
    });

    slide.addText(t.name, {
      x: x + 0.2, y: y + 0.25, w: 3.3, h: 0.35,
      fontSize: 16, color: COLORS.primary, bold: true, fontFace: 'Arial'
    });
    slide.addText(t.role, {
      x: x + 0.2, y: y + 0.65, w: 3.3, h: 0.3,
      fontSize: 11, color: COLORS.emerald, bold: true, fontFace: 'Arial'
    });
    slide.addText(t.detail, {
      x: x + 0.2, y: y + 1.05, w: 3.3, h: 1.0,
      fontSize: 11, color: COLORS.muted, fontFace: 'Arial', lineSpacing: 14
    });
  });
}

// SLIDE 4: React Hooks & Custom Hooks
{
  const slide = pptx.addSlide();
  createHeader(slide, '3. Advanced React Hooks Implementation', 'Modular state isolation and custom hook engineering');

  const hooks = [
    { name: 'useCountdown', purpose: 'Core ticker, pause, resume, reset, add +1m/+5m, circular progress % and completion trigger.' },
    { name: 'useLocalStorage', purpose: 'Safe JSON serialization, schema migration, and synchronization with window.localStorage.' },
    { name: 'useAudioAlert', purpose: 'Zero-dependency frequency synthesizers (Chime, Beep, Bell, Gong) + Web Notifications API.' },
    { name: 'useWorldTime', purpose: 'Fetches live time from WorldTimeAPI with fallback to browser native Intl.DateTimeFormat.' }
  ];

  hooks.forEach((h, i) => {
    const y = 1.6 + i * 1.25;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 11.7, h: 1.05,
      fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
    });
    slide.addText(h.name, {
      x: 1.1, y: y + 0.2, w: 3.0, h: 0.6,
      fontSize: 15, color: COLORS.primary, bold: true, fontFace: 'Courier New'
    });
    slide.addText(h.purpose, {
      x: 4.2, y: y + 0.2, w: 8.0, h: 0.65,
      fontSize: 12, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 16
    });
  });
}

// SLIDE 5: Multi-Page Modules
{
  const slide = pptx.addSlide();
  createHeader(slide, '4. Feature Modules & Client-Side Routing', 'Six dedicated workspaces in a cohesive single-page application');

  const pages = [
    { title: 'Dashboard (/)', desc: 'Concurrent timer cards, animated SVG progress rings, instant preset buttons, and tag filters.' },
    { title: 'Events (/events)', desc: 'Long-term target date countdowns (Days/Hours/Mins/Secs) with past vs upcoming status.' },
    { title: 'Pomodoro (/pomodoro)', desc: '25m Focus / 5m Short Break / 15m Long Break with automatic cycle transitions and streaks.' },
    { title: 'World Clock (/world-clock)', desc: 'Live global timezone clocks synchronized via REST API with city search and difference calculator.' },
    { title: 'Analytics (/analytics)', desc: 'Completed session history log, total focus duration metrics, and CSV/JSON data export.' },
    { title: 'Project Info (/about)', desc: 'Academic compliance checklist, student credentials, and Course Outcome mappings.' }
  ];

  pages.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.0;
    const y = 1.6 + row * 1.7;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.7, h: 1.45,
      fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
    });
    slide.addText(p.title, {
      x: x + 0.25, y: y + 0.15, w: 5.2, h: 0.35,
      fontSize: 14, color: COLORS.primary, bold: true, fontFace: 'Arial'
    });
    slide.addText(p.desc, {
      x: x + 0.25, y: y + 0.55, w: 5.2, h: 0.8,
      fontSize: 11, color: COLORS.muted, fontFace: 'Arial', lineSpacing: 14
    });
  });
}

// SLIDE 6: REST API & Audio Synthesis
{
  const slide = pptx.addSlide();
  createHeader(slide, '5. REST API & Web Audio Engine', 'Enterprise-grade integration and sound synthesis');

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.6, h: 4.8,
    fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
  });
  slide.addText('REST API: WorldTimeAPI Sync', {
    x: 1.1, y: 1.9, w: 5.0, h: 0.35,
    fontSize: 16, color: COLORS.secondary, bold: true, fontFace: 'Arial'
  });
  slide.addText([
    { text: '• Live Network Synchronization:\n', options: { bold: true } },
    { text: 'Fetches UTC offsets and timezones from worldtimeapi.org.\n\n' },
    { text: '• Resilient AbortController:\n', options: { bold: true } },
    { text: '4-second timeout prevents network stalls and hanging UI renders.\n\n' },
    { text: '• Offline Graceful Fallback:\n', options: { bold: true } },
    { text: 'Switches automatically to browser native Intl.DateTimeFormat if internet fails.' }
  ], {
    x: 1.1, y: 2.4, w: 5.0, h: 3.7,
    fontSize: 12, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 18
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 1.6, w: 5.7, h: 4.8,
    fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
  });
  slide.addText('Web Audio API Synthesizer', {
    x: 7.1, y: 1.9, w: 5.0, h: 0.35,
    fontSize: 16, color: COLORS.emerald, bold: true, fontFace: 'Arial'
  });
  slide.addText([
    { text: '• 100% Asset-Free Generation:\n', options: { bold: true } },
    { text: 'No external MP3 files; synthesized directly in browser memory.\n\n' },
    { text: '• Sound Profiles:\n', options: { bold: true } },
    { text: '- Chime: C5-E5-G5-C6 harmonic arpeggio\n- Beep: 880Hz to 440Hz exponential frequency ramp\n- Digital: Pulsed square-wave triple alarms\n- Bell & Gong: Resonant sine & sawtooth decay curves.\n\n' },
    { text: '• Instant Playback: ', options: { bold: true } },
    { text: 'Zero latency and zero network overhead.' }
  ], {
    x: 7.1, y: 2.4, w: 5.1, h: 3.7,
    fontSize: 12, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 18
  });
}

// SLIDE 7: Form Validation, CRUD & Themes
{
  const slide = pptx.addSlide();
  createHeader(slide, '6. Form Validation, CRUD & Dual Themes', 'User experience and defensive coding');

  const items = [
    { title: 'Full CRUD Operations', detail: 'Create, Read, Update, Delete, and Batch Clear countdown instances. Instant reactive updates through Context dispatchers.' },
    { title: 'Interactive Form Validation', detail: 'Boundary enforcement on title length (>= 3 chars), duration (> 0 secs), and target date (must be in the future). Error highlights in real time.' },
    { title: 'Multi-Dimensional Search & Filters', detail: 'Filter timers by category tags (Study, Coding, Work, Fitness, Cooking, Exams, Personal) combined with instant keyword search.' },
    { title: 'Dual Theme Architecture', detail: 'Radiant modern Bright Theme by default alongside Sleek Dark Theme, switchable instantly with persistent state saved in LocalStorage.' }
  ];

  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.0;
    const y = 1.6 + row * 2.5;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.7, h: 2.2,
      fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
    });
    slide.addText(it.title, {
      x: x + 0.3, y: y + 0.25, w: 5.1, h: 0.35,
      fontSize: 15, color: COLORS.primary, bold: true, fontFace: 'Arial'
    });
    slide.addText(it.detail, {
      x: x + 0.3, y: y + 0.7, w: 5.1, h: 1.3,
      fontSize: 12, color: COLORS.muted, fontFace: 'Arial', lineSpacing: 16
    });
  });
}

// SLIDE 8: Automated Testing & Performance
{
  const slide = pptx.addSlide();
  createHeader(slide, '7. Automated Testing & Performance Metrics', 'Verification and build optimization results');

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 6.8, h: 4.8,
    fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
  });
  slide.addText('Vitest & React Testing Library Results', {
    x: 1.1, y: 1.9, w: 6.2, h: 0.35,
    fontSize: 16, color: COLORS.emerald, bold: true, fontFace: 'Arial'
  });
  slide.addText([
    { text: '✓ Test Suite 1: useCountdown.test.js\n', options: { bold: true, color: COLORS.primary } },
    { text: '  - Initialization with initial duration and flags\n  - 1-second interval decrement (vi.advanceTimersByTime)\n  - onComplete callback trigger upon reaching zero\n  - Dynamic time increment (+1m, +5m) verification\n\n' },
    { text: '✓ Test Suite 2: TimerCard.test.jsx\n', options: { bold: true, color: COLORS.primary } },
    { text: '  - Component render and title verification\n  - Badge, formatted time (05:00), and Start button checks\n\n' },
    { text: 'SUMMARY: 5 of 5 tests passed (100% pass rate in ~1.2s)', options: { bold: true, color: COLORS.emerald } }
  ], {
    x: 1.1, y: 2.35, w: 6.2, h: 3.8,
    fontSize: 11.5, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 16
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.9, y: 1.6, w: 4.6, h: 4.8,
    fill: { color: COLORS.white }, line: { color: 'CBD5E1', width: 1 }, rectRadius: 0.1
  });
  slide.addText('Production Build Metrics', {
    x: 8.2, y: 1.9, w: 4.0, h: 0.35,
    fontSize: 16, color: COLORS.secondary, bold: true, fontFace: 'Arial'
  });
  slide.addText([
    { text: '• Build Time: ', options: { bold: true } },
    { text: '289 ms (Vite 8)\n\n' },
    { text: '• HTML Bundle: ', options: { bold: true } },
    { text: '0.70 kB (0.44 kB gzip)\n\n' },
    { text: '• CSS Bundle: ', options: { bold: true } },
    { text: '9.78 kB (2.91 kB gzip)\n\n' },
    { text: '• JS Bundle: ', options: { bold: true } },
    { text: '347 kB (105 kB gzip)\n\n' },
    { text: '• Single Master Ticker: ', options: { bold: true } },
    { text: 'Zero interval drift, low CPU footprint.' }
  ], {
    x: 8.2, y: 2.4, w: 4.0, h: 3.7,
    fontSize: 12, color: COLORS.dark, fontFace: 'Arial', lineSpacing: 18
  });
}

// SLIDE 9: Course Outcome (CO) & Rubrics Mapping
{
  const slide = pptx.addSlide();
  createHeader(slide, '8. Academic Compliance & CO Mapping', 'Mapping against PCCOE syllabus and Bloom’s taxonomy');

  const rows = [
    ['Evaluation Criteria', 'CO1', 'CO2', 'CO3', 'Bloom’s Level'],
    ['Problem Analysis & System Design', '✓', '', '', 'L4 (Analyze)'],
    ['JavaScript (ES6+) Implementation', '✓', '', '', 'L3 (Apply)'],
    ['React Components & UI Development', '', '✓', '✓', 'L5 (Evaluate)'],
    ['Routing, Hooks, API & CRUD Operations', '', '', '✓', 'L6 (Create)'],
    ['Testing, Debugging & Optimization', '', '✓', '✓', 'L5 (Evaluate)'],
    ['Documentation, Deployment & Presentation', '✓', '✓', '✓', 'L6 (Create)']
  ];

  slide.addTable(rows, {
    x: 0.8, y: 1.8, w: 11.7, h: 4.2,
    colW: [4.5, 1.2, 1.2, 1.2, 3.6],
    fill: { color: COLORS.white },
    border: { color: 'CBD5E1', width: 1 },
    fontSize: 12,
    align: 'center',
    fontFace: 'Arial',
    autoPage: false
  });
}

// SLIDE 10: Conclusion & Demo Links
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.dark };

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.accent } });

  slide.addText('CONCLUSION & DELIVERABLES', {
    x: 0.8, y: 0.8, w: 11.5, h: 0.8,
    fontSize: 32, color: COLORS.white, bold: true, align: 'center', fontFace: 'Arial'
  });

  slide.addText('Formative Assessment – 2 (FA-2) Successfully Completed', {
    x: 0.8, y: 1.6, w: 11.5, h: 0.5,
    fontSize: 16, color: COLORS.gold, align: 'center', fontFace: 'Arial'
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.8, y: 2.4, w: 9.7, h: 4.2,
    fill: { color: '1E293B' }, line: { color: COLORS.accent, width: 1.5 }, rectRadius: 0.15
  });

  slide.addText([
    { text: '✓ Complete Source Code: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'React 19 + Vite + React Router + Audio Synthesis\n' },
    { text: '✓ Comprehensive Project Report: ', options: { bold: true, color: COLORS.secondary } },
    { text: '10-page report formatted per PCCOE MCA guidelines\n' },
    { text: '✓ Automated Test Suite: ', options: { bold: true, color: COLORS.secondary } },
    { text: '100% tests passing with Vitest & React Testing Library\n' },
    { text: '✓ Live Deployment: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'Configured for GitHub Pages & Vercel\n' },
    { text: '✓ Viva & Demonstration Prep: ', options: { bold: true, color: COLORS.secondary } },
    { text: 'Technical Q&A reference covering all concepts\n\n' },
    { text: 'Thank you Dr. Avinash Chormale & Dr. Rajkamal Sangole for your mentorship!', options: { color: COLORS.gold, bold: true } }
  ], {
    x: 2.2, y: 2.65, w: 8.9, h: 3.7,
    fontSize: 13, color: COLORS.white, fontFace: 'Arial', lineSpacing: 22
  });
}

// Write to file
pptx.writeFile({ fileName: 'Chronos_Ultra_Presentation.pptx' })
  .then((fileName) => {
    console.log(`Successfully generated presentation: ${fileName}`);
  })
  .catch((err) => {
    console.error('Error generating presentation:', err);
    process.exit(1);
  });
