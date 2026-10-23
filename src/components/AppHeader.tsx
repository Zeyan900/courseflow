import React from 'react';

interface AppHeaderProps {
  onResetAll?: () => void;
  hasStoredData?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onResetAll, hasStoredData }) => {
  return (
    <header className="cf-header" role="banner">
      <div className="cf-container cf-header-inner">
        <div className="cf-brand-group">
          <div className="cf-logo-mark" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0D4C3C" />
              <path d="M9 16L14 21L23 11" stroke="#F4F1EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="23" cy="9" r="2.5" fill="#A55BFF"/>
            </svg>
          </div>
          <div>
            <div className="cf-brand-title-row">
              <span className="cf-brand-name">CourseFlow</span>
              <span className="cf-badge cf-badge-emerald">Prototype</span>
            </div>
            <p className="cf-brand-subtitle">Campus Action Guide</p>
          </div>
        </div>

        <div className="cf-header-meta">
          <div className="cf-disclaimer-pill" title="Local-first deterministic simulation">
            <span className="cf-status-dot" aria-hidden="true"></span>
            <span className="cf-pill-text">Alexa+-Style Simulation · Local-First</span>
          </div>

          {hasStoredData && onResetAll && (
            <button
              type="button"
              onClick={onResetAll}
              className="cf-btn-ghost cf-reset-all-btn"
              title="Clear all saved checklist progress across sessions"
              aria-label="Clear all saved checklist data"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
              <span>Clear Data</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
