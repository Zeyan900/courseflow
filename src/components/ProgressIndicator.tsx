import React from 'react';

interface ProgressIndicatorProps {
  completedCount: number;
  totalCount: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  completedCount,
  totalCount
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = totalCount > 0 && completedCount === totalCount;
  const isNotStarted = completedCount === 0;

  return (
    <div className="cf-progress-section" aria-label="Checklist completion status">
      <div className="cf-progress-header">
        <div className="cf-progress-text-row">
          <span className="cf-progress-count">
            <strong>{completedCount}</strong> of <strong>{totalCount}</strong> procedural steps completed
          </span>
          <span className="cf-progress-percent cf-font-mono" aria-hidden="true">{percentage}%</span>
        </div>

        <div className="cf-progress-badge-wrapper">
          {isComplete ? (
            <span className="cf-badge cf-badge-moss cf-complete-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Completed</span>
            </span>
          ) : isNotStarted ? (
            <span className="cf-badge cf-badge-muted">
              <span>Not Started</span>
            </span>
          ) : (
            <span className="cf-badge cf-badge-moss-subtle">
              <span className="cf-pulsing-dot" aria-hidden="true"></span>
              <span>In Progress</span>
            </span>
          )}
        </div>
      </div>

      <div
        className="cf-progress-bar-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${completedCount} of ${totalCount} procedural steps completed (${percentage}%)`}
      >
        <div
          className={`cf-progress-bar-fill ${isComplete ? 'is-complete' : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
