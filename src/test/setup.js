import '@testing-library/jest-dom';

// Mock AudioContext for Node/jsdom test environments
if (typeof window !== 'undefined') {
  window.AudioContext = class {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.destination = {};
    }
    createOscillator() {
      return {
        type: 'sine',
        frequency: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {}
        },
        connect: () => {},
        start: () => {},
        stop: () => {}
      };
    }
    createGain() {
      return {
        gain: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {}
        },
        connect: () => {}
      };
    }
    resume() {
      return Promise.resolve();
    }
  };

  window.webkitAudioContext = window.AudioContext;
}
