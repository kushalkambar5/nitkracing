import { useState, useEffect } from 'react';

// Detect if mobile/tablet or touch device
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isSmallScreen = window.innerWidth <= 1024;
  return isMobileUA || (isTouch && isSmallScreen);
};

// Global performance state (true = Eco Mode / Low Quality, false = High Quality)
let performanceModeInstance = (() => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('performanceMode');
  if (saved !== null) {
    return saved === 'eco';
  }
  // Default to Eco Mode (true) on mobile, High Quality (false) on desktop
  return isMobileDevice();
})();

const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach(listener => listener(performanceModeInstance));
};

export const getPerformanceMode = () => performanceModeInstance;

export const setPerformanceMode = (mode) => {
  performanceModeInstance = !!mode;
  localStorage.setItem('performanceMode', performanceModeInstance ? 'eco' : 'high');
  notifyListeners();
};

export const usePerformanceMode = () => {
  const [performanceMode, setPerformanceState] = useState(performanceModeInstance);

  useEffect(() => {
    const handleUpdate = (newMode) => {
      setPerformanceState(newMode);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return {
    performanceMode,
    setPerformanceMode
  };
};
