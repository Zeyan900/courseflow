import React, { useState, useRef, useEffect } from 'react';
import { ExampleQuestionChip } from './ExampleQuestionChip';

interface QuestionComposerProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  sampleQuestions: string[];
  initialQuery?: string;
}

export const QuestionComposer: React.FC<QuestionComposerProps> = ({
  onSearch,
  isSearching,
  sampleQuestions,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setValidationError('Please enter a question to locate the official guidance.');
      inputRef.current?.focus();
      return;
    }
    setValidationError(null);
    onSearch(trimmed);
  };

  const handleChipClick = (question: string) => {
    setQuery(question);
    setValidationError(null);
    onSearch(question);
  };

  const handleClear = () => {
    setQuery('');
    setValidationError(null);
    inputRef.current?.focus();
  };

  return (
    <section className="cf-composer-section" aria-labelledby="composer-heading">
      <div className="cf-composer-card cf-panel">
        <div className="cf-composer-intro">
          <h1 id="composer-heading" className="cf-composer-title">
            What do you need to get done?
          </h1>
          <p className="cf-composer-description">
            CourseFlow turns official campus instructions into verified, source-backed checklists.
            Answers are restricted strictly to configured public institutional records.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="cf-composer-form" noValidate>
          <label htmlFor="policy-question-input" className="cf-composer-label">
            Ask a procedure question
          </label>
          
          <div className={`cf-input-wrapper ${validationError ? 'has-error' : ''}`}>
            <span className="cf-input-leading-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>

            <input
              id="policy-question-input"
              ref={inputRef}
              type="text"
              className="cf-input cf-main-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g., How do I enroll in classes for Phase 1 and Phase 2 at UC Berkeley?"
              disabled={isSearching}
              autoComplete="off"
              spellCheck="false"
              aria-describedby={validationError ? 'composer-error' : undefined}
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="cf-clear-btn"
                aria-label="Clear input query"
                title="Clear question"
                disabled={isSearching}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            <button
              type="submit"
              className="cf-btn-primary cf-submit-btn"
              disabled={isSearching}
              aria-label="Find my next step"
            >
              {isSearching ? (
                <>
                  <span className="cf-spinner" aria-hidden="true"></span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Find my next step</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {validationError && (
            <div id="composer-error" className="cf-validation-message" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{validationError}</span>
            </div>
          )}
        </form>

        {sampleQuestions.length > 0 && (
          <div className="cf-sample-questions">
            <span className="cf-sample-heading">Configured examples:</span>
            <div className="cf-chips-grid" role="group" aria-label="Sample questions">
              {sampleQuestions.map((q) => (
                <ExampleQuestionChip
                  key={q}
                  question={q}
                  onClick={handleChipClick}
                  disabled={isSearching}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
