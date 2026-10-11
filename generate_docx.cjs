const fs = require('fs');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} = require('docx');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Calibri',
          size: 22, // 11pt
          color: '1E293B'
        },
        paragraph: {
          spacing: { line: 276, before: 100, after: 100 } // 1.15 line spacing
        }
      }
    }
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } // 1 inch margins
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: 'PCCOE MCA | Advanced Web Technologies (FA-2) — Karan Dikole (125M1H058)',
                  size: 18,
                  color: '64748B',
                  italics: true
                })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: 'Page ', size: 18, color: '64748B' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '64748B' }),
                new TextRun({ text: ' of ', size: 18, color: '64748B' }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '64748B' })
              ]
            })
          ]
        })
      },
      children: [
        // COVER / HEADER
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "PIMPRI CHINCHWAD EDUCATION TRUST'S\n", bold: true, size: 24, color: '1E3A8A' }),
            new TextRun({ text: 'PIMPRI CHINCHWAD COLLEGE OF ENGINEERING (PCCOE)\n', bold: true, size: 28, color: '1E3A8A' }),
            new TextRun({ text: 'Department of Master of Computer Applications (MCA)\n', bold: true, size: 24, color: '2563EB' }),
            new TextRun({ text: 'Academic Year: 2026 – 2027  |  Semester: III  |  Class: SYMCA\n', size: 20, color: '475569' }),
            new TextRun({ text: 'Course: Advanced Web Technologies (AWT) — Course Code: MCA301\n', size: 20, color: '475569' })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 200 } }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'FORMATIVE ASSESSMENT – 2 (FA-2) PROJECT REPORT\n', bold: true, size: 26, color: 'D97706' }),
            new TextRun({ text: 'Mini Project – Phase II: Advanced Features, Testing and Deployment\n', bold: true, size: 22, color: '475569' })
          ]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Project Title: Chronos Ultra — Advanced Multi-Timer & Event Productivity Suite',
              bold: true,
              size: 28,
              color: '1E3A8A'
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 200 } }),

        // STUDENT CREDENTIALS TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Student Name', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  width: { size: 70, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Karan Ravindra Dikole', bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'PRN', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: '125M1H058', bold: true, color: '2563EB' })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Roll No / Class', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: '58  |  SYMCA (Division A)' })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Course Owner', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Dr. Avinash Chormale' })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Module Coordinator', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Dr. Rajkamal Sangole' })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'GitHub Repository', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'https://github.com/karan-dikole/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite',
                          color: '2563EB',
                          underline: {}
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Live Working URL', bold: true, color: '1E3A8A' })] })]
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'https://karan-dikole.github.io/Chronos-Ultra-Advanced-Multi-Timer-Event-Countdown-Productivity-Suite/',
                          color: '059669',
                          bold: true,
                          underline: {}
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 300, after: 150 } }),

        // SECTION 1: EXECUTIVE SUMMARY
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '1. Executive Summary & Abstract', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'In higher education and modern agile environments, accurate time management and milestone tracking are paramount. Conventional web timers are often limited to single-threaded operations, suffer from data loss upon page refresh, depend on fragile external MP3 assets that fail when offline, and do not combine short focus sessions with long-term milestone countdowns.'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Chronos Ultra is a production-grade, component-driven web application developed with React 19, Vite 8, React Router v7, and the browser Web Audio API. Built as the Phase-II culmination of Formative Assessment 2 (FA-2) in Advanced Web Technologies, it expands upon foundational React mechanics by integrating multi-instance concurrent timers, target date countdowns (Days/Hours/Mins/Secs), a full Pomodoro Focus technique suite with streaks, REST API global timezone synchronization, zero-dependency synthesized audio alerts, full CRUD operations, and an automated testing suite utilizing Vitest and React Testing Library.'
            })
          ]
        }),

        // SECTION 2: PROBLEM IDENTIFICATION & OBJECTIVES
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '2. Problem Identification & Objectives', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: '2.1 Problem Identification', bold: true, size: 22, color: '2563EB' })]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '1. Single-Timer Constraint: ', bold: true }),
            new TextRun({ text: 'Standard countdown websites only permit running one timer at once, restricting productivity for multi-tasking students.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '2. Session Volatility: ', bold: true }),
            new TextRun({ text: 'Active counters and configurations vanish upon accidental browser reload due to absence of local caching mechanisms.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '3. Audio Asset Fragility: ', bold: true }),
            new TextRun({ text: 'Relying on external .mp3 audio links introduces cross-origin CORS errors, 404 broken URLs, and silent alarm failures.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '4. Lack of Milestone Planning: ', bold: true }),
            new TextRun({ text: 'Students need unified tools combining micro-sprints (e.g. 25m Pomodoro) with macro-deadlines (e.g. semester exams in 45 days).' })
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: '2.2 Objectives of Phase-II', bold: true, size: 22, color: '2563EB' })]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Modular Functional Architecture: ', bold: true }),
            new TextRun({ text: 'Implement React 19 functional components, Context API, and 4 specialized custom hooks.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Client-Side Routing: ', bold: true }),
            new TextRun({ text: 'Design a multi-page Single Page Application (SPA) using React Router DOM v7.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• High-Fidelity Audio Synthesis: ', bold: true }),
            new TextRun({ text: 'Build a browser-native Web Audio API synthesizer for 100% reliable alert chimes and beeps.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• REST API & Timezones: ', bold: true }),
            new TextRun({ text: 'Integrate WorldTimeAPI with fallback to Intl.DateTimeFormat for worldwide collaborative scheduling.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Automated Test Coverage: ', bold: true }),
            new TextRun({ text: 'Verify ticker math, lifecycle boundaries, and component rendering using Vitest and React Testing Library.' })
          ]
        }),

        // SECTION 3: SYSTEM ARCHITECTURE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '3. System Architecture & Component Hierarchy', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'The application employs a centralized unidirectional data flow governed by React Context API. The root component (App.jsx) is encapsulated within an ErrorBoundary and TimerProvider, ensuring error recovery and state propagation across all routes.'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Core Container: ', bold: true }),
            new TextRun({ text: 'App.jsx wraps ErrorBoundary -> TimerProvider -> BrowserRouter -> Layout (Navbar, Routes, Footer, ToastContainer).' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Routing Views: ', bold: true }),
            new TextRun({ text: 'DashboardPage (/), EventsPage (/events), PomodoroPage (/pomodoro), WorldTimePage (/world-clock), AnalyticsPage (/analytics), AboutPage (/about).' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Reusable UI Layer: ', bold: true }),
            new TextRun({ text: 'TimerCard (with SVG circular progress), EventCountdownCard, TimerModal (dual mode creator), SoundPicker, Toast notifications.' })
          ]
        }),

        // SECTION 4: ADVANCED FEATURES IMPLEMENTATION
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '4. Advanced Features Implementation (Phase-II Scope)', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: '4.1 React Hooks Implementation', bold: true, size: 22, color: '2563EB' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Chronos Ultra demonstrates comprehensive utilization of built-in React hooks and 4 purpose-built custom hooks:'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '1. useState: ', bold: true }),
            new TextRun({ text: 'Maintains local view states including search queries, selected tag categories, form validation states, and theme mode.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '2. useEffect: ', bold: true }),
            new TextRun({ text: 'Powers the master 1-second interval ticker across all concurrent active timers with memory leak prevention via clearInterval cleanup.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '3. useRef: ', bold: true }),
            new TextRun({ text: 'Preserves latest completion callbacks across renders to prevent stale closures during async interval execution.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '4. useMemo & useCallback: ', bold: true }),
            new TextRun({ text: 'Memoizes filtered lists, category searches, and action handlers passed down to TimerCard components.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '5. Custom Hook useCountdown: ', bold: true }),
            new TextRun({ text: 'Encapsulates countdown math, days/hours/mins/secs breakdown, play, pause, resume, reset, add-time, and onComplete triggers.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '6. Custom Hook useLocalStorage: ', bold: true }),
            new TextRun({ text: 'Provides transparent JSON serialization and synchronization to window.localStorage with error recovery.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '7. Custom Hook useAudioAlert: ', bold: true }),
            new TextRun({ text: 'Drives synthesized alerts via Web Audio API and manages desktop Web Notifications permission.' })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '8. Custom Hook useWorldTime: ', bold: true }),
            new TextRun({ text: 'Fetches real network time from WorldTimeAPI with fallback to JavaScript Intl.DateTimeFormat.' })
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: '4.2 Web Audio API Sound Synthesizer', bold: true, size: 22, color: '2563EB' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Unlike standard projects that link to third-party MP3 files, Chronos Ultra implements a pure mathematical oscillator sound synthesizer using the browser AudioContext. It generates 5 distinct acoustic profiles:\n'
            }),
            new TextRun({ text: '• Melodic Chime: ', bold: true }),
            new TextRun({ text: 'Harmonic C5 -> E5 -> G5 -> C6 arpeggio chord.\n' }),
            new TextRun({ text: '• Classic Beep: ', bold: true }),
            new TextRun({ text: '880Hz to 440Hz exponential frequency sweep.\n' }),
            new TextRun({ text: '• Digital Alarm: ', bold: true }),
            new TextRun({ text: 'Pulsed triple square wave alerts at 1000Hz-1200Hz.\n' }),
            new TextRun({ text: '• Resonant Bell & Zen Gong: ', bold: true }),
            new TextRun({ text: 'Natural sine & sawtooth waveforms with exponential amplitude decay.' })
          ]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: '4.3 Form Validation, CRUD & Dual Themes', bold: true, size: 22, color: '2563EB' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'The application enforces strict live form validation rules:\n• Title constraint: Must be at least 3 characters.\n• Duration constraint: Duration must exceed 0 seconds.\n• Target date constraint: Must be set to a valid future timestamp.\n• Dual Theme Support: Offers a radiant modern Bright Theme by default alongside a sleek Dark Theme, with one-click toggle in the navbar.'
            })
          ]
        }),

        // SECTION 5: TESTING & PERFORMANCE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '5. Automated Testing & Verification Results', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Automated testing was conducted using Vitest and React Testing Library in a jsdom environment. All test suites executed with 100% success rate.'
            })
          ]
        }),

        // TEST RESULTS TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Test Suite', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Target Concept', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Assertions Tested', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true, color: '059669' })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'useCountdown.test.js' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Custom Hook' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Default values initialization' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PASSED', bold: true, color: '059669' })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'useCountdown.test.js' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Time Ticker' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '1s decrement via vi.advanceTimersByTime' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PASSED', bold: true, color: '059669' })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'useCountdown.test.js' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Callback Trigger' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'onComplete fires when remaining = 0' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PASSED', bold: true, color: '059669' })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'useCountdown.test.js' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Dynamic Extension' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'addTime(+60s) updates total and remaining' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PASSED', bold: true, color: '059669' })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'TimerCard.test.jsx' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Component Render' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Renders title, badge, 05:00, Start button' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PASSED', bold: true, color: '059669' })] })] })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 150 } }),

        // SECTION 6: CO MAPPING
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "6. Course Outcome (CO) & Bloom's Taxonomy Mapping", bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Evaluation Criteria', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CO1', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CO2', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CO3', bold: true, color: '1E3A8A' })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Bloom's Level", bold: true, color: '1E3A8A' })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: 'Problem Analysis & Design' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: 'L4 (Analyze)' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: 'JavaScript (ES6+) Implementation' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: 'L3 (Apply)' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: 'React Components & UI Development' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: 'L5 (Evaluate)' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: 'Routing, Hooks, API & CRUD' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: 'L6 (Create)' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: 'Testing, Debugging & Optimization' })] }),
                new TableCell({ children: [new Paragraph({ text: '-' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: 'L5 (Evaluate)' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: 'Documentation & Presentation' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: '✓' })] }),
                new TableCell({ children: [new Paragraph({ text: 'L6 (Create)' })] })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 150 } }),

        // SECTION 7: CONCLUSION
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '7. Conclusion & Future Enhancements', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Chronos Ultra successfully meets and exceeds all objectives established for Formative Assessment – 2 (FA-2) in the Advanced Web Technologies curriculum. The application demonstrates solid mastery over modern React 19 paradigms, functional component composition, state management through Context and custom hooks, resilient Web Audio API frequency synthesis, REST API integration with graceful offline fallbacks, client-side routing, automated testing, and cloud deployment.'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Future extensions include implementing backend database persistence with user authentication (Supabase / Firebase), mobile push notifications via service workers, and voice-recorded custom completion alerts.'
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 100 } }),

        // SECTION 8: REFERENCES
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '8. References', bold: true, size: 24, color: '1E3A8A' })]
        }),
        new Paragraph({ children: [new TextRun({ text: '1. React Documentation: https://react.dev/' })] }),
        new Paragraph({ children: [new TextRun({ text: '2. React Router Documentation: https://reactrouter.com/' })] }),
        new Paragraph({ children: [new TextRun({ text: '3. MDN Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API' })] }),
        new Paragraph({ children: [new TextRun({ text: '4. Vitest Testing Framework: https://vitest.dev/' })] }),
        new Paragraph({ children: [new TextRun({ text: '5. PCCOE MCA Department AWT Course Curriculum & Rubrics.' })] })
      ]
    }
  ]
});

Packer.toBuffer(doc)
  .then((buffer) => {
    fs.writeFileSync('Chronos_Ultra_Project_Report.docx', buffer);
    console.log('Successfully generated Word Document: Chronos_Ultra_Project_Report.docx');
  })
  .catch((err) => {
    console.error('Error generating document:', err);
    process.exit(1);
  });
