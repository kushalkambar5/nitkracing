import React from 'react';
import './interactive-hover-button.css';

export function InteractiveHoverButton({
  children,
  text = 'Button',
  className = '',
  ...props
}) {
  const displayText = children || text;

  return (
    <button
      className={`interactive-hover-button ${className}`}
      {...props}
    >
      <div className="btn-content-visible">
        <div className="btn-dot"></div>
        <span className="btn-text-visible">
          {displayText}
        </span>
      </div>
      <div className="btn-content-hidden">
        <span>{displayText}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="arrow-icon"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
