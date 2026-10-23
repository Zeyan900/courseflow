import React from 'react';
import { MatchStatus as MatchStatusType, PolicyEntry } from '../types/policy';

interface MatchStatusProps {
  status: MatchStatusType;
  query: string;
  score?: number;
  matchedKeywords?: string[];
  candidates?: PolicyEntry[];
  refusalReason?: string;
  onSelectCandidate?: (policy: PolicyEntry) => void;
  onTryExample?: (example: string) => void;
}

export const MatchStatus: React.FC<MatchStatusProps> = ({
  status,
  query,
  score,
  matchedKeywords = [],
  candidates = [],
  refusalReason,
  onSelectCandidate,
  onTryExample
}) => {
  if (status === 'idle') return null;

  if (status === 'searching') {
    return (
      <div className="cf-status-box cf-status-searching" role="status" aria-live="polite">
        <span className="cf-spinner cf-spinner-lg" aria-hidden="true"></span>
        <div className="cf-status-text">
          <p className="cf-status-title">Verifying against official policy records...</p>
          <p className="cf-status-sub">Evaluating keyword overlap and source citations.</p>
        </div>
      </div>
    );
  }

  if (status === 'no_match') {
    return (
      <div className="cf-status-box cf-status-nomatch cf-panel" role="alert">
        <div className="cf-status-header">
          <div className="cf-status-icon cf-icon-warning" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h2 className="cf-status-heading">
              {refusalReason || "I couldn’t verify this from the selected source."}
            </h2>
            <p className="cf-status-explanation">
              No official policy passage verified for &ldquo;{query}&rdquo;. CourseFlow enforces strict source-grounding. Because this question is not supported
              by our configured official documents, we will not fabricate an answer, deadline, or contact.
            </p>
          </div>
        </div>

        <div className="cf-status-suggestions">
          <p className="cf-suggestion-label">Try asking about verified procedures:</p>
          <div className="cf-suggestion-chips">
            <button
              type="button"
              className="cf-btn-secondary cf-btn-sm"
              onClick={() => onTryExample?.("How do I enroll in classes for Phase 1 and Phase 2 at UC Berkeley?")}
            >
              Course Enrollment & Phase Limits
            </button>
            <button
              type="button"
              className="cf-btn-secondary cf-btn-sm"
              onClick={() => onTryExample?.("How do I drop or swap a course at UC Berkeley?")}
            >
              Class Drops & Schedule Adjustments
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'ambiguous') {
    return (
      <div className="cf-status-box cf-status-ambiguous cf-panel" role="region" aria-labelledby="ambiguous-title">
        <div className="cf-status-header">
          <div className="cf-status-icon cf-icon-info" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <h2 id="ambiguous-title" className="cf-status-heading">
              Multiple official procedures match your question
            </h2>
            <p className="cf-status-explanation">
              Your inquiry relates to more than one configured procedure. Rather than guessing your intent,
              please choose the specific topic you need guidance on:
            </p>
          </div>
        </div>

        <div className="cf-candidates-grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="cf-candidate-card cf-panel-raised">
              <div className="cf-candidate-meta">
                <span className="cf-badge cf-badge-emerald">{candidate.institution}</span>
                <span className="cf-text-dim">·</span>
                <span className="cf-candidate-dept">{candidate.department}</span>
              </div>
              <h3 className="cf-candidate-title">{candidate.documentTitle}</h3>
              <p className="cf-candidate-excerpt">{candidate.excerpt.slice(0, 140)}...</p>
              <button
                type="button"
                className="cf-btn-primary cf-candidate-select-btn"
                onClick={() => onSelectCandidate?.(candidate)}
              >
                <span>View this procedure</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === 'matched') {
    return (
      <div className="cf-match-banner" role="status" aria-live="polite">
        <div className="cf-match-banner-content">
          <div className="cf-match-badge-group">
            <span className="cf-status-icon-matched" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="cf-match-title">Official Verification Match</span>
            {score !== undefined && (
              <span className="cf-badge cf-badge-emerald" title="Deterministic match confidence score">
                {Math.round(score * 100)}% Match
              </span>
            )}
          </div>

          {matchedKeywords.length > 0 && (
            <div className="cf-matched-keywords" title="Matched policy terms">
              <span className="cf-keywords-label">Grounded terms:</span>
              {matchedKeywords.slice(0, 4).map((kw) => (
                <span key={kw} className="cf-keyword-pill">{kw}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
