/**
 * CourseFlow Deterministic Policy Matcher
 * 
 * Rules:
 * - Pure deterministic keyword, phrase, and sample-question scoring
 * - No external LLMs, no remote APIs, no probabilistic hallucinations
 * - Strict thresholding: queries below threshold return a safe no-match refusal
 * - Ambiguity detection: ties or near-ties within margin trigger user clarification
 */

import { PolicyEntry, MatchResult, ScoredPolicyMatch } from '../types/policy';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any',
  'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between',
  'both', 'but', 'by', 'can', 'did', 'do', 'does', 'doing', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here',
  'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is',
  'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor',
  'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 's', 'same', 'she', 'should', 'so', 'some',
  'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves',
  'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your', 'yours'
]);

// Minimum score required to return a verified policy match
export const MATCH_THRESHOLD = 0.38;

// If top match and second match score within this margin, flag as ambiguous
export const AMBIGUITY_MARGIN = 0.12;

/**
 * Normalizes input text by removing punctuation and lowercasing
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts significant non-stopword tokens from normalized string
 */
export function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  
  return normalized
    .split(' ')
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * Computes deterministic score for a query against a policy entry
 */
export function scorePolicy(query: string, policy: PolicyEntry): ScoredPolicyMatch {
  const normQuery = normalizeText(query);
  const queryTokens = extractKeywords(normQuery);

  if (!normQuery || queryTokens.length === 0) {
    return {
      policy,
      score: 0,
      matchedKeywords: [],
      exactPhraseMatch: false
    };
  }

  // 1. Check exact or near-identical sample question match
  for (const sample of policy.sampleQuestions) {
    const normSample = normalizeText(sample);
    if (normQuery === normSample) {
      return {
        policy,
        score: 1.0,
        matchedKeywords: policy.keywords.slice(0, 5),
        exactPhraseMatch: true
      };
    }
    // Substring containment of long sample
    if (normSample.length > 15 && normQuery.includes(normSample)) {
      return {
        policy,
        score: 0.95,
        matchedKeywords: policy.keywords.slice(0, 5),
        exactPhraseMatch: true
      };
    }
  }

  const matchedKeywords: string[] = [];
  let score = 0;

  // 2. Multi-word phrase matching from keywords or topics
  for (const kw of policy.keywords) {
    const normKw = normalizeText(kw);
    if (normKw.includes(' ')) {
      if (normQuery.includes(normKw)) {
        matchedKeywords.push(kw);
        score += 0.35; // Significant bonus for specific domain phrases like 'phase 1' or 'drop class'
      }
    }
  }

  // 3. Single-word keyword matching
  const policyKeywordTokens = new Set(
    policy.keywords
      .map(k => normalizeText(k))
      .flatMap(k => k.split(' '))
      .filter(w => !STOP_WORDS.has(w) && w.length > 2)
  );

  let queryTokenHits = 0;
  for (const token of queryTokens) {
    if (policyKeywordTokens.has(token)) {
      queryTokenHits++;
      if (!matchedKeywords.includes(token)) {
        matchedKeywords.push(token);
      }
    }
  }

  // Ratio of user query meaningful words that matched policy keywords
  const queryCoverage = queryTokens.length > 0 ? queryTokenHits / queryTokens.length : 0;
  score += queryCoverage * 0.45;

  // 4. Topic and title keyword match bonus
  const titleTokens = extractKeywords(policy.documentTitle);
  let titleHits = 0;
  for (const token of queryTokens) {
    if (titleTokens.includes(token)) {
      titleHits++;
    }
  }
  if (titleTokens.length > 0 && titleHits > 0) {
    score += Math.min(0.25, (titleHits / titleTokens.length) * 0.3);
  }

  // Cap score at 1.0
  const finalScore = Math.min(1.0, Math.round(score * 100) / 100);

  return {
    policy,
    score: finalScore,
    matchedKeywords,
    exactPhraseMatch: finalScore >= 0.9
  };
}

/**
 * Searches local policies deterministically
 */
export function matchPolicy(query: string, policies: PolicyEntry[]): MatchResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      status: 'no_match',
      refusalReason: 'Please enter a question to find official procedural guidance.'
    };
  }

  if (!policies || policies.length === 0) {
    return {
      status: 'no_match',
      refusalReason: 'No official campus policy documents are currently configured.'
    };
  }

  // Score all policies
  const scoredMatches = policies
    .map(p => scorePolicy(trimmed, p))
    .sort((a, b) => b.score - a.score);

  const topMatch = scoredMatches[0];

  // Check if top match meets the minimum confidence threshold
  if (!topMatch || topMatch.score < MATCH_THRESHOLD) {
    return {
      status: 'no_match',
      score: topMatch ? topMatch.score : 0,
      refusalReason: 'I couldn’t verify this from the selected source.'
    };
  }

  // Check for ambiguity (near-tie between top candidates)
  if (scoredMatches.length > 1) {
    const secondMatch = scoredMatches[1];
    const scoreDiff = topMatch.score - secondMatch.score;

    if (secondMatch.score >= MATCH_THRESHOLD && scoreDiff <= AMBIGUITY_MARGIN) {
      // Both meet threshold and are closely ranked -> Ambiguous
      return {
        status: 'ambiguous',
        candidates: scoredMatches
          .filter(m => m.score >= MATCH_THRESHOLD && (topMatch.score - m.score) <= AMBIGUITY_MARGIN)
          .map(m => m.policy),
        score: topMatch.score,
        refusalReason: 'Your question relates to multiple official procedures. Please select which topic you want guidance on.'
      };
    }
  }

  let matchLabel: 'Exact Document Match' | 'Direct Procedural Match' | 'Source-Grounded Match' = 'Source-Grounded Match';
  if (topMatch.exactPhraseMatch || topMatch.score >= 0.9) {
    matchLabel = 'Exact Document Match';
  } else if (topMatch.score >= 0.55) {
    matchLabel = 'Direct Procedural Match';
  }

  return {
    status: 'matched',
    bestMatch: topMatch.policy,
    score: topMatch.score,
    matchLabel,
    matchedKeywords: topMatch.matchedKeywords
  };
}
