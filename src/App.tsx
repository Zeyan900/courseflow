import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AppHeader } from './components/AppHeader';
import { QuestionComposer } from './components/QuestionComposer';
import { MatchStatus } from './components/MatchStatus';
import { EvidencePanel } from './components/EvidencePanel';
import { ChecklistPanel } from './components/ChecklistPanel';
import { ResultsSkeleton } from './components/ResultsSkeleton';
import { DisclosureFooter } from './components/DisclosureFooter';

import { PolicyEntry, MatchStatus as MatchStatusType } from './types/policy';
import { matchPolicy } from './lib/policySearch';
import {
  loadChecklistProgress,
  saveChecklistProgress,
  resetChecklistProgress,
  clearAllProgress,
  isStorageAvailable
} from './lib/checklistStorage';

import policiesData from './data/policies.json';

export const App: React.FC = () => {
  const policies = useMemo<PolicyEntry[]>(() => policiesData as PolicyEntry[], []);

  // UI & Search State
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<MatchStatusType>('idle');
  const [activePolicy, setActivePolicy] = useState<PolicyEntry | null>(null);
  const [matchScore, setMatchScore] = useState<number | undefined>(undefined);
  const [matchLabel, setMatchLabel] = useState<string | undefined>(undefined);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<PolicyEntry[]>([]);
  const [refusalReason, setRefusalReason] = useState<string | undefined>(undefined);

  // Persistence State
  const [checkedStepIds, setCheckedStepIds] = useState<string[]>([]);
  const [isStorageActive, setIsStorageActive] = useState<boolean>(true);
  const [hasStoredData, setHasStoredData] = useState<boolean>(false);

  // Sample questions aggregated from policies
  const sampleQuestions = useMemo(() => {
    return policies.flatMap(p => p.sampleQuestions).slice(0, 4);
  }, [policies]);

  // Initial check for storage availability and existing saved state
  useEffect(() => {
    const storageOk = isStorageAvailable();
    setIsStorageActive(storageOk);

    if (storageOk && typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem('courseflow_checklist_state_v1');
        if (raw && Object.keys(JSON.parse(raw)).length > 0) {
          setHasStoredData(true);
        }
      } catch {
        setHasStoredData(false);
      }
    }
  }, []);

  // Execute policy search without artificial loading delays
  const handleSearch = useCallback((userQuery: string) => {
    setQuery(userQuery);
    setStatus('searching');

    // Use requestAnimationFrame for immediate paint of searching state without artificial delay
    requestAnimationFrame(() => {
      try {
        const result = matchPolicy(userQuery, policies);

        if (result.status === 'matched' && result.bestMatch) {
          setActivePolicy(result.bestMatch);
          setMatchScore(result.score);
          setMatchLabel(result.matchLabel);
          setMatchedKeywords(result.matchedKeywords || []);
          setCandidates([]);
          setRefusalReason(undefined);
          setStatus('matched');

          // Restore saved checklist progress for this specific policy
          const savedSteps = loadChecklistProgress(result.bestMatch.id);
          setCheckedStepIds(savedSteps);
          if (savedSteps.length > 0) {
            setHasStoredData(true);
          }
        } else if (result.status === 'ambiguous') {
          setActivePolicy(null);
          setMatchScore(result.score);
          setMatchLabel(undefined);
          setCandidates(result.candidates || []);
          setRefusalReason(result.refusalReason);
          setStatus('ambiguous');
        } else {
          setActivePolicy(null);
          setMatchScore(result.score);
          setMatchLabel(undefined);
          setCandidates([]);
          setRefusalReason(result.refusalReason);
          setStatus('no_match');
        }
      } catch (err) {
        console.error('[CourseFlow Search Error]:', err);
        setStatus('error');
        setRefusalReason('An unexpected error occurred while parsing local policy data.');
      }
    });
  }, [policies]);

  // Handle selection of a candidate when query is ambiguous
  const handleSelectCandidate = useCallback((candidate: PolicyEntry) => {
    setActivePolicy(candidate);
    setMatchScore(1.0);
    setMatchLabel('Direct Procedural Match');
    setMatchedKeywords(candidate.keywords.slice(0, 4));
    setCandidates([]);
    setStatus('matched');

    const savedSteps = loadChecklistProgress(candidate.id);
    setCheckedStepIds(savedSteps);
    if (savedSteps.length > 0) {
      setHasStoredData(true);
    }
  }, []);

  // Toggle individual checklist step
  const handleToggleStep = useCallback((stepId: string) => {
    if (!activePolicy) return;

    setCheckedStepIds((prev) => {
      const isAlreadyChecked = prev.includes(stepId);
      const next = isAlreadyChecked
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId];

      // Save to localStorage
      saveChecklistProgress(activePolicy.id, next);
      setHasStoredData(true);
      return next;
    });
  }, [activePolicy]);

  // Reset checklist progress for current active policy
  const handleResetPolicyProgress = useCallback(() => {
    if (!activePolicy) return;
    resetChecklistProgress(activePolicy.id);
    setCheckedStepIds([]);
  }, [activePolicy]);

  // Reset all stored data across application
  const handleResetAll = useCallback(() => {
    clearAllProgress();
    setCheckedStepIds([]);
    setHasStoredData(false);
  }, []);

  return (
    <div className="cf-app">
      <AppHeader
        onResetAll={handleResetAll}
        hasStoredData={hasStoredData}
      />

      <main className="cf-main-content">
        <div className="cf-container">
          <QuestionComposer
            onSearch={handleSearch}
            isSearching={status === 'searching'}
            sampleQuestions={sampleQuestions}
            initialQuery={query}
          />

          <MatchStatus
            status={status}
            query={query}
            score={matchScore}
            matchLabel={matchLabel}
            matchedKeywords={matchedKeywords}
            candidates={candidates}
            refusalReason={refusalReason}
            onSelectCandidate={handleSelectCandidate}
            onTryExample={handleSearch}
          />

          {status === 'searching' && (
            <ResultsSkeleton />
          )}

          {status === 'matched' && activePolicy && (
            <div className="cf-results-grid cf-results-animated">
              <EvidencePanel policy={activePolicy} />
              
              <ChecklistPanel
                policy={activePolicy}
                checkedStepIds={checkedStepIds}
                onToggleStep={handleToggleStep}
                onResetProgress={handleResetPolicyProgress}
                isStorageActive={isStorageActive}
              />
            </div>
          )}
        </div>
      </main>

      <DisclosureFooter />
    </div>
  );
};

export default App;
