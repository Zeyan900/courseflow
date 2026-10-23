import React from 'react';
import { PolicyEntry } from '../types/policy';

interface EvidencePanelProps {
  policy: PolicyEntry;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ policy }) => {
  return (
    <article className="cf-evidence-panel cf-panel" aria-labelledby="evidence-heading">
      <div className="cf-panel-header">
        <div className="cf-panel-title-group">
          <span className="cf-panel-icon cf-icon-emerald" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </span>
          <div>
            <h2 id="evidence-heading" className="cf-panel-title">
              Official Source Evidence
            </h2>
            <p className="cf-panel-subtitle">Verbatim regulatory text cited directly for this procedure</p>
          </div>
        </div>

        <div className="cf-evidence-badges">
          <span className="cf-badge cf-badge-emerald" title="Issuing university">
            {policy.institution}
          </span>
        </div>
      </div>

      <div className="cf-source-metadata-card cf-panel-raised">
        <div className="cf-meta-row">
          <span className="cf-meta-label">Document:</span>
          <span className="cf-meta-value cf-doc-title">{policy.documentTitle}</span>
        </div>

        {policy.department && (
          <div className="cf-meta-row">
            <span className="cf-meta-label">Authority:</span>
            <span className="cf-meta-value">{policy.department}</span>
          </div>
        )}

        <div className="cf-meta-row">
          <span className="cf-meta-label">Verified date:</span>
          <span className="cf-meta-value cf-font-mono cf-date-value">
            {policy.lastChecked ? policy.lastChecked : 'Date not recorded'}
          </span>
        </div>

        <div className="cf-meta-row cf-meta-link-row">
          <span className="cf-meta-label">Source URL:</span>
          <a
            href={policy.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-source-external-link"
            title={`Open official document: ${policy.documentTitle}`}
            aria-label={`Open official source document for ${policy.documentTitle} in a new tab`}
          >
            <span>Open official document</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="cf-excerpt-container">
        <div className="cf-excerpt-header">
          <div className="cf-excerpt-header-left">
            <span className="cf-excerpt-quote-icon" aria-hidden="true">&ldquo;</span>
            <span className="cf-excerpt-label">Verbatim Institutional Excerpt</span>
          </div>
          <span className="cf-badge cf-badge-muted">Unmodified Public Record</span>
        </div>

        <blockquote className="cf-excerpt-quote">
          <p className="cf-excerpt-text">
            {policy.excerpt}
          </p>
        </blockquote>

        <div className="cf-excerpt-provenance">
          <div className="cf-excerpt-caveat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>All procedural tasks in the action checklist are backed directly by this verified passage. No external interpretations or deadlines have been inferred.</span>
          </div>
        </div>
      </div>
    </article>
  );
};
