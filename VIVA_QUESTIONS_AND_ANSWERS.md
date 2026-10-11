# CHRONOS ULTRA — VIVA QUESTIONS & ANSWERS GUIDE
### Advanced Web Technologies (FA-2) | PCCOE MCA Department
**Student:** Karan Ravindra Dikole (`125M1H058`) | **Project:** Countdown Timer Suite

---

## 1. Core React & Architecture Questions

### Q1: What is the difference between Phase-I (FA-1) and Phase-II (FA-2) in your project?
**Answer:**
- **FA-1 (Phase I):** Focused on basic React fundamentals—single timer state (`useState`), basic event handling, static UI, and simple countdown ticking.
- **FA-2 (Phase II):** Introduces advanced enterprise concepts:
  1. Multi-instance concurrent timers managed via **React Context API** (`TimerContext`).
  2. Multi-page navigation using **React Router DOM v7** (Dashboard, Events, Pomodoro, World Clock, Analytics, About).
  3. **Custom Hooks** (`useCountdown`, `useLocalStorage`, `useAudioAlert`, `useWorldTime`).
  4. **REST API Integration** (WorldTimeAPI for live global timezone sync with offline fallback).
  5. **Web Audio API sound synthesis** (zero external MP3 dependencies).
  6. **Automated unit & component testing** using Vitest and React Testing Library.
  7. Exportable analytics (CSV/JSON), Error Boundaries, LocalStorage persistence, and Bright/Dark dual themes.

---

### Q2: Why did you choose React Context API over Prop Drilling or Redux?
**Answer:**
- In Chronos Ultra, state such as active timers, events, alert preferences, and history logs need to be accessible across multiple pages (Dashboard, Events, Pomodoro, Analytics, Navbar badge).
- Prop drilling would require passing props through intermediate layout components that don't need them.
- Redux would introduce unnecessary boilerplate for an application of this scale.
- Context API combined with custom hooks provides a clean, centralized store with optimal reactivity and zero extra dependency weight.

---

### Q3: How do you prevent memory leaks when running intervals in React?
**Answer:**
When using `setInterval` inside a `useEffect` hook, a memory leak can occur if the interval continues running after the component unmounts.
We prevent this by always returning a cleanup function that invokes `clearInterval(intervalId)`:
```javascript
useEffect(() => {
  if (!isRunning || remainingSeconds <= 0) return;

  const interval = setInterval(() => {
    setRemainingSeconds((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval); // Cleanup on unmount or dependency change
}, [isRunning, remainingSeconds]);
```

---

## 2. Advanced Hooks & Custom Hooks

### Q4: Explain the custom hooks you built and their responsibilities.
**Answer:**
1. `useCountdown`: Encapsulates countdown arithmetic, formatted time string generation, circular progress percentage, play/pause/reset/add-time controls, and `onComplete` trigger.
2. `useLocalStorage`: Wraps `useState` to automatically synchronize state to `window.localStorage` with error handling and JSON parsing.
3. `useAudioAlert`: Interacts with the browser's Web Audio API and Web Notification API to emit sound alerts and desktop notifications.
4. `useWorldTime`: Manages asynchronous REST API fetching for global timezones with network timeout and offline `Intl.DateTimeFormat` fallback.

---

### Q5: What is the purpose of `useMemo` and `useCallback` in your application?
**Answer:**
- `useMemo`: Used for expensive filtering computations (e.g., filtering hundreds of timers by active category tags and search keywords) so the filter array is only recalculated when `timers`, `selectedCategory`, or `searchQuery` change.
- `useCallback`: Memoizes action functions (like `addTimer`, `deleteTimer`, `toggleTimer`) passed down to child components (`TimerCard`), preventing unnecessary re-renders of cards that didn't change.

---

## 3. Web Audio API & Integration Questions

### Q6: Why did you use the Web Audio API instead of standard `<audio src="...">` tags?
**Answer:**
1. **Zero Asset Dependencies:** Does not depend on external MP3 hosting links that could suffer from 404 errors, CORS issues, or slow network loading.
2. **Instant Playback:** Synthesizes waveforms (sine, square, sawtooth, triangle) directly via the browser's audio processor in zero milliseconds.
3. **Harmonic Customization:** Allows programmatic frequency ramping, arpeggios (Chime chords), and exponential gain decay (Bells/Gongs).

---

### Q7: How does your application handle REST API failures or offline mode?
**Answer:**
In `timeApi.js` / `useWorldTime.js`:
1. We attach an `AbortController` with a 4-second timeout to prevent network stalls.
2. In the `catch` block, if the API call fails or the user is offline, the app seamlessly falls back to the native JavaScript `Intl.DateTimeFormat` object with the target timezone, ensuring the UI always displays accurate local time without crashing.

---

## 4. Testing & Code Quality Questions

### Q8: How did you test your countdown logic?
**Answer:**
We created automated unit tests using **Vitest** and **React Testing Library**:
- We utilized `vi.useFakeTimers()` and `vi.advanceTimersByTime(3000)` to simulate real-time ticking without waiting in real time.
- Tested: Initial state values, 1-second countdown decrement, completion callback invocation, and dynamic time addition (+1m / +5m).
- All 5 test cases pass cleanly with 100% success rate.

---

### Q9: What is an Error Boundary and how does your project implement it?
**Answer:**
An Error Boundary is a React class component that implements `componentDidCatch` or `getDerivedStateFromError`. It catches uncaught JavaScript errors anywhere in its child component tree, logs the error, and renders a graceful fallback UI (with error message and reload button) instead of crashing the entire React application into a blank screen.
