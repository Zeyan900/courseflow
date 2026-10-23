import React from 'react';

export const DisclosureFooter: React.FC = () => {
  return (
    <footer className="cf-footer" role="contentinfo">
      <div className="cf-container cf-footer-inner">
        <div className="cf-footer-section">
          <div className="cf-footer-brand">
            <span className="cf-footer-logo">CourseFlow</span>
            <span className="cf-badge cf-badge-emerald">Campus Action Guide</span>
          </div>
          <p className="cf-footer-description">
            A local-first, source-grounded assistant prototype designed to help students verify
            official campus procedures and track actionable procedural steps.
          </p>
        </div>

        <div className="cf-footer-disclaimers">
          <div className="cf-disclaimer-card cf-panel-raised">
            <h3 className="cf-disclaimer-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Simulation & Non-Affiliation Notice</span>
            </h3>
            <p className="cf-disclaimer-body">
              <strong>CourseFlow is an independent educational hackathon prototype.</strong> It simulates
              an Alexa+-style assistant experience locally in the browser and is <em>not</em> connected to live Alexa+,
              Amazon preview services, or university administrative backends. It is <em>not</em> an official
              service of the University of California, Berkeley or any other institution.
            </p>
          </div>

          <div className="cf-disclaimer-card cf-panel-raised">
            <h3 className="cf-disclaimer-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Source Grounding & Privacy Guarantee</span>
            </h3>
            <p className="cf-disclaimer-body">
              All returned advice is drawn strictly from configured public registrar documents.
              No answers or deadlines are fabricated. Questions are processed 100% locally on your machine—no
              analytics, tracking cookies, user accounts, or external API calls are made.
            </p>
          </div>
        </div>

        <div className="cf-footer-bottom">
          <p className="cf-copyright">
            CourseFlow Prototype © 2026 · Built for the Amazon Developer Hackathon (Alexa+ Web Simulation Track)
          </p>
          <div className="cf-footer-links">
            <span className="cf-pill-text">Local-First · Deterministic · Zero External Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
