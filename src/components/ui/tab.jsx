import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TabContext = createContext(null);

export function useTabs() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}

export function TabsProvider({ children, defaultValue, wobbly = true, hover = false }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      setActiveTab(defaultValue);
    }
  }, [defaultValue]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, hoveredTab, setHoveredTab, wobbly, hover }}>
      {children}
    </TabContext.Provider>
  );
}

export function TabsBtn({ value, children, className = '' }) {
  const { activeTab, setActiveTab, hoveredTab, setHoveredTab, wobbly, hover } = useTabs();
  const isActive = activeTab === value;
  const isHovered = hoveredTab === value;

  // Spring transition presets
  const springTransition = wobbly
    ? { type: 'spring', stiffness: 500, damping: 30, mass: 1 }
    : { type: 'spring', stiffness: 300, damping: 30 };

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      onMouseEnter={() => hover && setHoveredTab(value)}
      onMouseLeave={() => hover && setHoveredTab(null)}
      className={`tab-btn-wrapper ${isActive ? 'active-tab' : ''} ${className}`}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px 16px',
        borderRadius: '6px',
        outline: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab-indicator"
          className="active-tab-indicator-bg"
          transition={springTransition}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />
      )}
      {hover && isHovered && !isActive && (
        <motion.div
          layoutId="hover-tab-indicator"
          className="hover-tab-indicator-bg"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
      )}
      <span className="tab-btn-content" style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </span>
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { activeTab } = useTabs();

  return (
    <AnimatePresence mode="wait">
      {activeTab === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{ width: '100%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
