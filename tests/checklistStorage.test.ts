import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEY,
  loadChecklistProgress,
  saveChecklistProgress,
  resetChecklistProgress,
  clearAllProgress
} from '../src/lib/checklistStorage.ts';

// Mock localStorage for Node test environment
class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

// Attach mock window & localStorage
const mockStorage = new MockLocalStorage();
(globalThis as unknown as { window: { localStorage: MockLocalStorage } }).window = {
  localStorage: mockStorage
};

test('Checklist Storage - Save and Load', () => {
  mockStorage.clear();
  const policyId = 'ucb-course-enrollment';
  const steps = ['step-1', 'step-2'];

  const saved = saveChecklistProgress(policyId, steps);
  assert.equal(saved, true);

  const loaded = loadChecklistProgress(policyId);
  assert.deepEqual(loaded, steps);
});

test('Checklist Storage - Scoped Reset', () => {
  mockStorage.clear();
  saveChecklistProgress('policy-a', ['step-1', 'step-2']);
  saveChecklistProgress('policy-b', ['step-3']);

  resetChecklistProgress('policy-a');

  // Policy A should be empty
  assert.deepEqual(loadChecklistProgress('policy-a'), []);
  // Policy B should remain intact
  assert.deepEqual(loadChecklistProgress('policy-b'), ['step-3']);
});

test('Checklist Storage - Clear All Data', () => {
  mockStorage.clear();
  saveChecklistProgress('policy-a', ['step-1']);
  saveChecklistProgress('policy-b', ['step-2']);

  clearAllProgress();

  assert.deepEqual(loadChecklistProgress('policy-a'), []);
  assert.deepEqual(loadChecklistProgress('policy-b'), []);
  assert.equal(mockStorage.getItem(STORAGE_KEY), null);
});

test('Checklist Storage - Corrupt Data Recovery', () => {
  mockStorage.setItem(STORAGE_KEY, 'corrupt{invalid_json');

  // Should not throw, should return empty array safely
  const loaded = loadChecklistProgress('policy-a');
  assert.deepEqual(loaded, []);
});

test('Checklist Storage - Non-Object Data Recovery', () => {
  mockStorage.setItem(STORAGE_KEY, JSON.stringify(["just", "an", "array"]));

  const loaded = loadChecklistProgress('policy-a');
  assert.deepEqual(loaded, []);
});
