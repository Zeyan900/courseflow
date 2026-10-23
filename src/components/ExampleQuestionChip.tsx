import React from 'react';

interface ExampleQuestionChipProps {
  question: string;
  onClick: (question: string) => void;
  disabled?: boolean;
}

export const ExampleQuestionChip: React.FC<ExampleQuestionChipProps> = ({
  question,
  onClick,
  disabled = false
}) => {
  return (
    <button
      type="button"
      className="cf-chip"
      onClick={() => onClick(question)}
      disabled={disabled}
      title={`Ask: "${question}"`}
    >
      <svg
        className="cf-chip-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span className="cf-chip-label">{question}</span>
    </button>
  );
};
