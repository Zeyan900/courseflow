/**
 * CourseFlow TypeScript Types
 * Based on CourseFlow PRD & Technical Architecture Specifications
 */

export interface PolicyStep {
  id: string;
  text: string;
  hint?: string;
}

export interface PolicyEntry {
  id: string;
  institution: string;
  documentTitle: string;
  sourceUrl: string;
  lastChecked: string;
  keywords: string[];
  sampleQuestions: string[];
  excerpt: string; // exact verified text from official source
  steps: PolicyStep[];
  topics?: string[];
  department?: string;
}

export interface ChecklistState {
  policyId: string;
  checkedStepIds: string[];
  updatedAt: string;
}

export type MatchStatus = 
  | 'idle' 
  | 'searching' 
  | 'matched' 
  | 'no_match' 
  | 'ambiguous' 
  | 'error';

export interface ScoredPolicyMatch {
  policy: PolicyEntry;
  score: number;
  matchedKeywords: string[];
  exactPhraseMatch: boolean;
}

export type MatchLabel = 'Exact Document Match' | 'Direct Procedural Match' | 'Source-Grounded Match';

export interface MatchResult {
  status: 'matched' | 'no_match' | 'ambiguous';
  bestMatch?: PolicyEntry;
  score?: number;
  matchLabel?: MatchLabel;
  matchedKeywords?: string[];
  candidates?: PolicyEntry[]; // For ambiguous matches requiring user clarification
  refusalReason?: string;
}

export interface StoredProgressMap {
  [policyId: string]: {
    checkedStepIds: string[];
    updatedAt: string;
  };
}
