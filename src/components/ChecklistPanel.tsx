import React from 'react';
import { PolicyEntry } from '../types/policy';
import { ProgressIndicator } from './ProgressIndicator';
import { ResetProgressControl } from './ResetProgressControl';

interface ChecklistPanelProps {
  policy: PolicyEntry;
  checkedStepIds: string[];
  onToggleStep: (stepId: string) => void;
  onResetProgress: () => void;
  isStorageActive?: boolean;
}

export const ChecklistPanel: React.FC<ChecklistPanelProps> = ({
  policy,
  checkedStepIds,
  onToggleStep,
  onResetProgress,
  isStorageActive = true
}) => {
  const totalSteps = policy.steps.length;
  const completedCount = checkedStepIds.length;

  return (
    <section className="cf-checklist-panel cf-panel" aria-labelledby="checklist-heading">
      <div className="cf-panel-header">
        <div className="cf-panel-title-group">
          <span className="cf-panel-icon cf-icon-moss" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </span>
          <div>
            <h2 id="checklist-heading" className="cf-panel-title">
              Action Checklist
            </h2>
            <p className="cf-panel-subtitle">Official verified steps to complete this process</p>
          </div>
        </div>

        <ResetProgressControl
          onReset={onResetProgress}
          disabled={completedCount === 0}
          policyTitle={policy.documentTitle}
        />
      </div>

      <ProgressIndicator
        completedCount={completedCount}
        totalCount={totalSteps}
      />

      <div className="cf-steps-list" role="list" aria-label="Procedural steps">
        {policy.steps.map((step, index) => {
          const isChecked = checkedStepIds.includes(step.id);
          const stepNumber = index + 1;

          return (
            <div
              key={step.id}
              className={`cf-step-item ${isChecked ? 'is-completed' : ''}`}
              role="listitem"
            >
              <div className="cf-step-checkbox-wrapper">
                <input
                  type="checkbox"
                  id={`step-chk-${step.id}`}
                  checked={isChecked}
                  onChange={() => onToggleStep(step.id)}
                  className="cf-checkbox-native sr-only"
                  aria-describedby={step.hint ? `step-hint-${step.id}` : undefined}
                />
                <label
                  htmlFor={`step-chk-${step.id}`}
                  className="cf-checkbox-custom"
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </label>
              </div>

              <div className="cf-step-content">
                <label htmlFor={`step-chk-${step.id}`} className="cf-step-label">
                  <span className="cf-step-number">{stepNumber}.</span>
                  <span className="cf-step-text">{step.text}</span>
                </label>

                {step.hint && (
                  <p id={`step-hint-${step.id}`} className="cf-step-hint">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span>{step.hint}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="cf-checklist-footer">
        <div className="cf-storage-status">
          <span className="cf-status-dot" aria-hidden="true"></span>
          <span>
            {isStorageActive
              ? 'Progress persists automatically in your local browser profile'
              : 'Storage is currently disabled in this browser session'}
          </span>
        </div>
      </div>
    </section>
  );
};
