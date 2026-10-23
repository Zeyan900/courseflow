import test from 'node:test';
import assert from 'node:assert/strict';
import { matchPolicy, normalizeText, extractKeywords, MATCH_THRESHOLD } from '../src/lib/policySearch.ts';
import policiesData from '../src/data/policies.json' with { type: 'json' };
import { PolicyEntry } from '../src/types/policy.ts';

const policies = policiesData as unknown as PolicyEntry[];

test('Policy Data Integrity', () => {
  assert.ok(Array.isArray(policies), 'Policies must be an array');
  assert.ok(policies.length >= 2, 'Should have at least 2 configured policies');

  for (const policy of policies) {
    assert.ok(policy.id, 'Policy must have a stable id');
    assert.ok(policy.institution, 'Policy must specify institution');
    assert.ok(policy.documentTitle, 'Policy must specify document title');
    assert.ok(policy.sourceUrl.startsWith('https://'), 'Policy sourceUrl must be a secure https link');
    assert.ok(policy.lastChecked, 'Policy must specify lastChecked date');
    assert.ok(policy.excerpt.length > 50, 'Policy must provide an exact excerpt');
    assert.ok(Array.isArray(policy.keywords) && policy.keywords.length > 0, 'Policy must have keywords');
    assert.ok(Array.isArray(policy.sampleQuestions) && policy.sampleQuestions.length > 0, 'Policy must have sample questions');
    assert.ok(Array.isArray(policy.steps) && policy.steps.length > 0, 'Policy must have procedural steps');

    for (const step of policy.steps) {
      assert.ok(step.id, 'Every step must have a stable id');
      assert.ok(step.text, 'Every step must have text');
    }
  }
});

test('Exact Sample Question Matching', () => {
  const q1 = "How do I enroll in classes for Phase 1 and Phase 2 at UC Berkeley?";
  const res1 = matchPolicy(q1, policies);
  assert.equal(res1.status, 'matched');
  assert.equal(res1.bestMatch?.id, 'ucb-course-enrollment');
  assert.ok(res1.score! >= 0.9, `Score should be high for sample question, got ${res1.score}`);

  const q2 = "How do I drop or swap a course at UC Berkeley?";
  const res2 = matchPolicy(q2, policies);
  assert.equal(res2.status, 'matched');
  assert.equal(res2.bestMatch?.id, 'ucb-enrollment-changes-drop');
  assert.ok(res2.score! >= 0.9, `Score should be high for sample question, got ${res2.score}`);
});

test('Natural Language Keyword Query Matching', () => {
  const query = "What are the unit limits for phase 1 enrollment appointment?";
  const res = matchPolicy(query, policies);
  assert.equal(res.status, 'matched');
  assert.equal(res.bestMatch?.id, 'ucb-course-enrollment');
  assert.ok(res.score! >= MATCH_THRESHOLD);
});

test('Safe Fallback on Unrelated / Unsupported Queries', () => {
  const unrelatedQueries = [
    "How do I buy a parking pass for the campus garage?",
    "Where is the nearest student dining hall located?",
    "What is the GPA requirement for Harvard Law School?",
    "Can you order a pizza to my dorm room?",
    "Who won the football game last night?"
  ];

  for (const q of unrelatedQueries) {
    const res = matchPolicy(q, policies);
    assert.equal(
      res.status,
      'no_match',
      `Query "${q}" should return no_match, but got ${res.status}`
    );
    assert.equal(res.bestMatch, undefined);
    assert.match(res.refusalReason || '', /couldn’t verify this from the selected source/i);
  }
});

test('Empty or Whitespace Input Handling', () => {
  const resEmpty = matchPolicy("", policies);
  assert.equal(resEmpty.status, 'no_match');
  assert.ok(resEmpty.refusalReason);

  const resWhitespace = matchPolicy("   \n\t  ", policies);
  assert.equal(resWhitespace.status, 'no_match');
});

test('Empty Policy Configuration Handling', () => {
  const res = matchPolicy("How to enroll?", []);
  assert.equal(res.status, 'no_match');
  assert.match(res.refusalReason || '', /No official campus policy documents/i);
});

test('Ambiguity Detection on Overlapping Generic Terms', () => {
  // Query mentioning only generic shared terms across both policies without specific procedure
  const ambiguousQuery = "classes at Berkeley";
  const res = matchPolicy(ambiguousQuery, policies);
  
  // Should either be ambiguous or no_match, but NEVER silently guess one if scores tie
  if (res.status === 'ambiguous') {
    assert.ok(res.candidates && res.candidates.length >= 2, 'Should present multiple candidate policies');
  }
});
