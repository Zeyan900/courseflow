/**
 * CourseFlow Checklist Storage
 * 
 * Local persistence management using browser localStorage.
 * Handles private browsing mode, disabled cookies/storage, and corrupt JSON safely.
 */

import { StoredProgressMap } from '../types/policy';

export const STORAGE_KEY = 'courseflow_checklist_state_v1';

/**
 * Checks if localStorage is available and writable
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    const testKey = '__cf_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads all stored progress maps safely
 */
function readAllStoredProgress(): StoredProgressMap {
  if (!isStorageAvailable()) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      console.warn('[CourseFlow Storage] Malformed localStorage data encountered. Resetting store.');
      return {};
    }

    // Validate entries
    const cleanMap: StoredProgressMap = {};
    for (const [policyId, entry] of Object.entries(parsed)) {
      if (
        entry &&
        typeof entry === 'object' &&
        Array.isArray((entry as { checkedStepIds?: unknown }).checkedStepIds)
      ) {
        cleanMap[policyId] = {
          checkedStepIds: (entry as { checkedStepIds: string[] }).checkedStepIds.filter(
            id => typeof id === 'string'
          ),
          updatedAt: typeof (entry as { updatedAt?: unknown }).updatedAt === 'string'
            ? (entry as { updatedAt: string }).updatedAt
            : new Date().toISOString()
        };
      }
    }

    return cleanMap;
  } catch (err) {
    console.warn('[CourseFlow Storage] Failed to read from localStorage:', err);
    return {};
  }
}

/**
 * Loads checked step IDs for a given policy ID
 */
export function loadChecklistProgress(policyId: string): string[] {
  if (!policyId) return [];
  const map = readAllStoredProgress();
  return map[policyId]?.checkedStepIds || [];
}

/**
 * Saves checked step IDs for a given policy ID
 */
export function saveChecklistProgress(policyId: string, checkedStepIds: string[]): boolean {
  if (!policyId || !isStorageAvailable()) return false;

  try {
    const map = readAllStoredProgress();
    map[policyId] = {
      checkedStepIds,
      updatedAt: new Date().toISOString()
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    return true;
  } catch (err) {
    console.warn('[CourseFlow Storage] Failed to save progress to localStorage:', err);
    return false;
  }
}

/**
 * Resets saved checklist progress for a single policy ID
 */
export function resetChecklistProgress(policyId: string): boolean {
  if (!policyId || !isStorageAvailable()) return false;

  try {
    const map = readAllStoredProgress();
    if (map[policyId]) {
      delete map[policyId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    }
    return true;
  } catch (err) {
    console.warn('[CourseFlow Storage] Failed to clear progress from localStorage:', err);
    return false;
  }
}

/**
 * Clears all CourseFlow stored data
 */
export function clearAllProgress(): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.warn('[CourseFlow Storage] Failed to wipe localStorage:', err);
    return false;
  }
}
