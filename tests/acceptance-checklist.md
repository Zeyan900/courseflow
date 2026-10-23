# CourseFlow QA & Acceptance Verification Checklist

**Product:** CourseFlow — Campus Action Guide (Alexa+-style local-first web simulation)  
**Verification Date:** October 23, 2026  
**Environment:** Local laptop development (Node v24.18.0, npm 11.16.0, Vite 6, React 19, TypeScript 5.7)

---

## 1. Functional Acceptance Tests

| ID | Test Scenario | Expected Outcome | Verification Status |
|:---|:---|:---|:---:|
| **FAT-01** | Initial State & Shell | Clear title ("CourseFlow"), subtitle ("Campus Action Guide"), "Prototype" badge, and simulation disclosure pill visible. Input composer is empty with visible label and sample question chips. | **PASS** |
| **FAT-02** | Exact Sample Prompt Search | Submitting `"How do I enroll in classes for Phase 1 and Phase 2 at UC Berkeley?"` returns `ucb-course-enrollment` with score >= 0.90. | **PASS** |
| **FAT-03** | Source Evidence Panel | Matched result displays Institution ("University of California, Berkeley"), Department ("Office of the University Registrar"), verified date ("2026-10-23"), exact quotation excerpt, and clickable official source link with external icon. | **PASS** |
| **FAT-04** | Action Checklist Display | Displays 6 procedural steps supported directly by the cited excerpt. No fabricated steps or unsupported advice. | **PASS** |
| **FAT-05** | Step Completion & Progress Indicator | Toggling steps (e.g. Steps 1, 2, 3) immediately updates the progress indicator to "3 of 6 steps completed (50%)" with Moss Green visual bar. | **PASS** |
| **FAT-06** | Browser Local Persistence | Progress is saved under `courseflow_checklist_state_v1`. Refreshing or revisiting the policy restores checked states without loss. | **PASS** |
| **FAT-07** | Step Reset & Confirmation | Clicking "Reset checklist" prompts for confirmation ("Clear all checked steps for [title]?"). Confirming resets the progress to "0 of 6 steps completed (0%)" and removes stored state. | **PASS** |
| **FAT-08** | Safe Refusal on Unrelated Queries | Querying unrelated topics (`"parking pass"`, `"nearest dining hall"`, `"Harvard GPA"`, `"order a pizza"`) returns status `no_match` with the exact message: *"I couldn’t verify this from the selected source"* and refuses to guess. | **PASS** |
| **FAT-09** | Safe Handling on Ambiguous Queries | Querying general overlapping keywords (`"classes at Berkeley"`) triggers the ambiguous state with multiple candidate procedure cards (`"Course Enrollment"` vs `"Schedule Changes/Drops"`). | **PASS** |
| **FAT-10** | Empty & Whitespace Validation | Submitting empty or whitespace queries triggers accessible inline validation warning without throwing or querying. | **PASS** |
| **FAT-11** | Storage Failure & Corrupt JSON Recovery | Malformed or non-JSON localStorage data triggers automatic error recovery and defaults to an empty store without crashing the app. | **PASS** |
| **FAT-12** | Keyboard Operability | All controls (input, submit, chips, checkboxes, external links, reset buttons) are reachable and operable via keyboard alone with visible violet focus outline (`2px solid #A55BFF`). | **PASS** |
| **FAT-13** | Responsive Layout Reflow | Main container constrained to 1120px on desktop with 2-column results grid (Evidence + Checklist). Stacks cleanly on viewports down to 320px with comfortable touch targets. | **PASS** |
| **FAT-14** | Production Build & Static Compilation | `npm run build` succeeds with zero TypeScript errors and zero warnings, emitting optimized static bundle into `dist/`. | **PASS** |

---

## 2. Automated Test Run Log

```text
> courseflow@1.0.0 test
> tsx --test tests/**/*.test.ts

✔ Checklist Storage - Save and Load (2.005ms)
✔ Checklist Storage - Scoped Reset (0.123ms)
✔ Checklist Storage - Clear All Data (0.083ms)
✔ Checklist Storage - Corrupt Data Recovery (0.654ms)
✔ Checklist Storage - Non-Object Data Recovery (0.073ms)
✔ Policy Data Integrity (0.400ms)
✔ Exact Sample Question Matching (0.357ms)
✔ Natural Language Keyword Query Matching (0.125ms)
✔ Safe Fallback on Unrelated / Unsupported Queries (0.675ms)
✔ Empty or Whitespace Input Handling (0.056ms)
✔ Empty Policy Configuration Handling (0.059ms)
✔ Ambiguity Detection on Overlapping Generic Terms (0.076ms)

ℹ tests 12
ℹ pass 12
ℹ fail 0
ℹ duration_ms 74.25ms
```

---

## 3. Scope & Non-Affiliation Verification

- [x] Simulation Disclosure: Persistent header and footer notices confirm CourseFlow is an Alexa+-style simulated prototype.
- [x] Non-Affiliation Disclosure: Explicitly states the app is not an official university service or an official Amazon Alexa+ product.
- [x] Zero Fake Telemetry: No external API requests, no runtime cloud services, no remote LLMs, no analytics trackers.
