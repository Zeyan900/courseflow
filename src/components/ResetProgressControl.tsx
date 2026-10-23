import React, { useState } from 'react';

interface ResetProgressControlProps {
  onReset: () => void;
  disabled?: boolean;
  policyTitle?: string;
}

export const ResetProgressControl: React.FC<ResetProgressControlProps> = ({
  onReset,
  disabled = false,
  policyTitle
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onReset();
    setShowConfirm(false);
  };

  return (
    <div className="cf-reset-control">
      {!showConfirm ? (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={disabled}
          className="cf-btn-ghost cf-reset-trigger-btn"
          aria-label="Reset checklist progress for this procedure"
          title="Clear checked items and start over"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          <span>Reset checklist</span>
        </button>
      ) : (
        <div className="cf-reset-confirm-box" role="alertdialog" aria-labelledby="reset-confirm-title">
          <p id="reset-confirm-title" className="cf-reset-confirm-text">
            Clear all checked steps{policyTitle ? ` for "${policyTitle}"` : ''}?
          </p>
          <div className="cf-reset-confirm-actions">
            <button
              type="button"
              onClick={handleConfirm}
              className="cf-btn-secondary cf-btn-danger cf-btn-xs"
              autoFocus
            >
              Yes, reset
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="cf-btn-secondary cf-btn-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
