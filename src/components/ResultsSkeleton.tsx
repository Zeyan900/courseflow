import React from 'react';

export const ResultsSkeleton: React.FC = () => {
  return (
    <div className="cf-results-grid cf-results-skeleton" role="status" aria-label="Loading verified policy results">
      {/* Evidence Panel Skeleton */}
      <div className="cf-panel cf-skeleton-panel" aria-hidden="true">
        <div className="cf-skeleton-header">
          <div className="cf-skeleton-icon"></div>
          <div className="cf-skeleton-text-group">
            <div className="cf-skeleton-line cf-skeleton-title"></div>
            <div className="cf-skeleton-line cf-skeleton-subtitle"></div>
          </div>
        </div>

        <div className="cf-panel-raised cf-skeleton-meta-card">
          <div className="cf-skeleton-line cf-skeleton-meta-row"></div>
          <div className="cf-skeleton-line cf-skeleton-meta-row"></div>
          <div className="cf-skeleton-line cf-skeleton-meta-row"></div>
          <div className="cf-skeleton-line cf-skeleton-meta-row cf-skeleton-half"></div>
        </div>

        <div className="cf-skeleton-excerpt">
          <div className="cf-skeleton-line cf-skeleton-label"></div>
          <div className="cf-skeleton-quote-box">
            <div className="cf-skeleton-line"></div>
            <div className="cf-skeleton-line"></div>
            <div className="cf-skeleton-line cf-skeleton-short"></div>
          </div>
        </div>
      </div>

      {/* Checklist Panel Skeleton */}
      <div className="cf-panel cf-skeleton-panel" aria-hidden="true">
        <div className="cf-skeleton-header">
          <div className="cf-skeleton-icon cf-skeleton-icon-moss"></div>
          <div className="cf-skeleton-text-group">
            <div className="cf-skeleton-line cf-skeleton-title"></div>
            <div className="cf-skeleton-line cf-skeleton-subtitle"></div>
          </div>
        </div>

        <div className="cf-panel-raised cf-skeleton-progress-box">
          <div className="cf-skeleton-line cf-skeleton-progress-label"></div>
          <div className="cf-skeleton-line cf-skeleton-progress-bar"></div>
        </div>

        <div className="cf-skeleton-steps">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="cf-skeleton-step-item">
              <div className="cf-skeleton-checkbox"></div>
              <div className="cf-skeleton-step-content">
                <div className="cf-skeleton-line cf-skeleton-step-title"></div>
                <div className="cf-skeleton-line cf-skeleton-step-hint"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
