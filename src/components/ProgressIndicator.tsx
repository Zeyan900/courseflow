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

  return (
    <div className="cf-progress-section" aria-label="Checklist completion status">
      <div className="cf-progress-header">
        <div className="cf-progress-text-row">
          <span className="cf-progress-count">
            <strong>{completedCount}</strong> of <strong>{totalCount}</strong> steps completed
          </span>
          <span className="cf-progress-percent cf-font-mono">{percentage}%</span>
        </div>

        {isComplete && (
          <span className="cf-badge cf-badge-emerald cf-complete-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>All Steps Complete</span>
          </span>
        )}
      </div>

      <div
        className="cf-progress-bar-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${completedCount} of ${totalCount} steps completed (${percentage}%)`}
      >
        <div
          className={`cf-progress-bar-fill ${isComplete ? 'is-complete' : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
