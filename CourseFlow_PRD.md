# CourseFlow — Product Requirements Document

**Product:** CourseFlow — Campus Action Guide  
**Version:** 1.0 · MVP  
**Prepared:** October 23, 2026  
**Target environment:** Local laptop development in Antigravity; locally runnable web app  
**Hackathon route:** Alexa+ web-based simulated experience  

## 1. Executive summary

CourseFlow helps a student turn one official campus instruction into a short, source-linked checklist that can be completed and resumed. A student asks a question about one selected procedure. The app finds a matching passage in a small, locally stored set of verified public source text, displays the exact passage and source link, and presents only the steps recorded for that source. Progress is saved in the browser. If the source does not support an answer, CourseFlow says it could not verify the answer rather than guessing.

CourseFlow is a clearly disclosed Alexa+-style simulation. It is not connected to live Alexa+, Amazon preview services, or a college system. The official hackathon rules allow a web app to simulate an Alexa+ experience using the entrant’s own tools; the simulation does not require an MCP server or Alexa+ preview access. [1] [2]

## 2. Problem statement

Students can have trouble converting an official policy or notice into a clear next action. CourseFlow tests whether a small source-grounded guide can help a student locate the relevant instruction, understand what the source actually says, and track the next steps without losing the citation.

This is a product hypothesis, not a proven claim about all students or the selected campus. Validate it with quick user feedback if possible. Accessibility guidance for voice systems supports manageable prompts, task history, and text alternatives, but does not prove local student demand. [4]

## 3. Product vision and value proposition

**Vision:** Make routine institutional instructions easier to find, verify, and act on—without hiding the original source or inventing policy.

**Value proposition:** “Get the next step from the official instruction, with the source still in view.”

## 4. Goals and success criteria

### Goals

1. Support one institution, one public official document, and one guided task in the MVP.
2. Match a student’s question to a verified source passage using transparent local logic.
3. Show the exact passage, document title, and clickable official source URL.
4. Present an editable checklist containing only source-backed steps.
5. Preserve checklist progress in browser local storage.
6. Return a clear no-verification response when a source match is absent or weak.
7. Run locally without a runtime API, paid service, account, or network connection after dependencies and source content are present.
8. Clearly disclose the Alexa+-style simulation and that the app is not an official college service.

### Proposed measures (targets, not achieved results)

- **Evidence coverage:** Every policy claim shown by the app has a visible supporting source.
- **Safe fallback:** Unsupported test questions return no guessed policy in every test case.
- **Resume:** Checklist state restores after refresh in every tested run.
- **Usability target:** If five students can test it, at least four can find the citation and identify the next step without assistance.
- **Demo:** One complete question-to-source-to-checklist-to-resume flow can be shown reliably in under 90 seconds.

Report measured findings only after actually testing them.

## 5. Users

### Primary user

A student who needs to complete one routine campus process and wants to know the next step and where the instruction came from.

### Secondary user

A hackathon reviewer or developer evaluating whether CourseFlow’s answer is grounded, whether the simulation is disclosed, and whether the end-to-end flow works.

### Accessibility considerations

Use plain language, keyboard-operable controls, visible focus states, a readable transcript/result area, clear recovery from an unsupported question, and sufficient contrast. Text remains the primary input; microphone access is out of scope. W3C voice-system guidance recommends alternative modalities and usable task history for users who need them. [4]

## 6. Scope

### In scope — MVP

- One public official institutional source with title, URL, and date or last-checked date.
- One procedure or task described by that source.
- Local JSON data file containing exact excerpts, keywords, sample prompts, and supported steps.
- One responsive React + TypeScript web screen.
- Deterministic, local keyword matching; no external model call.
- Source citation panel with exact excerpt and link.
- Editable checklist and localStorage persistence.
- No-match state with a safe, explicit refusal to infer policy.
- Reset/delete-progress action.
- Simulation disclaimer and non-endorsement notice.
- README with run instructions, source attribution, and limitations.

### Out of scope

- Live Alexa+ integration, Alexa hardware, preview services, or a claim of Amazon connection.
- MCP server in the minimum build. A self-hosted MCP implementation is an optional future extension, not a requirement for the web-simulation route. [1]
- Login, student records, grades, attendance, eligibility decisions, or private course messages.
- Sending email, submitting forms, booking, payments, notifications, or making policy decisions.
- Multiple campuses, multiple procedures, broad web crawling, vector database, or admin dashboard.
- Paid APIs, external LLM inference, AWS runtime, analytics, or cloud storage.
- Voice capture, camera, or continuous sensing.

## 7. User stories

1. As a student, I want to enter a question or choose a sample prompt so I can find the relevant instruction quickly.
2. As a student, I want to see the exact official passage and its link so I can verify the answer.
3. As a student, I want the supported steps as checkboxes so I can track progress.
4. As a returning user, I want the checked steps to remain after refresh so I can resume.
5. As a user whose question is not answered by the source, I want the app to say it cannot verify the answer instead of guessing.
6. As a reviewer, I want the app to state that it is an Alexa+-style simulation, not a live integration or official college service.
7. As a developer, I want to edit the source data in a separate JSON file without rewriting the UI.

## 8. Functional requirements

| ID | Requirement | Priority | Acceptance condition |
|---|---|---|---|
| FR-01 | Load a curated source record locally | Must | Source record includes institution, document title, URL, last-checked date, excerpt, keywords, sample question, and supported steps. |
| FR-02 | Accept a typed question and sample prompts | Must | User can submit by button and keyboard; sample prompt fills or runs a valid query. |
| FR-03 | Match locally | Must | Matching uses transparent local keyword logic with a minimum-confidence/no-match behavior; no network call. |
| FR-04 | Show source evidence | Must | Result includes exact stored excerpt, document title, institution, date if available, and clickable URL. |
| FR-05 | Build the checklist | Must | Only the steps stored for the matched source appear; no generated or inferred policy steps. |
| FR-06 | Save and restore progress | Must | Checked states persist in localStorage across refresh and browser restart on the same browser profile. |
| FR-07 | Safe no-match result | Must | Weak or absent match shows “I couldn’t verify this from the selected source” and no policy answer. |
| FR-08 | Reset progress | Must | User can clear the saved checklist and return to the initial state. |
| FR-09 | Disclose simulation status | Must | UI and README say “Alexa+-style simulation; not connected to Alexa+” and “not an official college service.” |
| FR-10 | Keep the project local-first | Must | No runtime API, external LLM, login, analytics, or remote database is required. |
| FR-11 | Keyboard accessibility | Should | All fields, buttons, links, and checkboxes are labeled, reachable, and operable by keyboard; focus is visible. |
| FR-12 | Responsive UI | Should | Core flow works at desktop and narrow mobile widths without horizontal scrolling. |

## 9. User experience and design requirements

- **Primary screen:** CourseFlow title, simulation disclosure, question field, sample prompts, source-backed result, checklist, and reset control.
- **Trust hierarchy:** The source passage and link should be at least as visible as the summarized task steps.
- **States:** Initial, matching result, no match, empty source data, loading/searching (if applicable), and reset confirmation.
- **Design system:** Dark canvas `#0a0a08`; amber primary action; restrained teal and purple accents; Syne for headings, Instrument Serif for a small editorial accent, and JetBrains Mono for metadata. Use local font files if available or reliable system fallbacks so the page does not depend on downloading web fonts at runtime.
- **Accessibility:** High contrast, visible keyboard focus, semantic labels, simple text, and no color-only status indicators.
- **Branding:** Do not use Amazon/Alexa logos or suggest endorsement unless separately authorized.

## 10. Data requirements

The app uses a manually curated local file such as `src/data/policies.json`:

```ts
type PolicyEntry = {
  id: string;
  institution: string;
  documentTitle: string;
  sourceUrl: string;
  lastChecked?: string;
  keywords: string[];
  sampleQuestions: string[];
  excerpt: string; // exact verified text from the official source
  steps: string[]; // each step must be directly supported by the source
};

type ChecklistState = {
  policyId: string;
  checkedStepIds: string[];
  updatedAt: string;
};
```

Do not put placeholder rules, invented deadlines, private student data, or unsupported contacts in the dataset. Keep the source attribution adjacent to every returned excerpt.

## 11. User flow

1. The student opens the local CourseFlow app and sees the simulation and non-endorsement notices.
2. The student types a question or chooses a sample question.
3. The app normalizes the question and matches it against local keywords.
4. If confidence is sufficient, CourseFlow displays the exact saved passage, official link, and source-backed checklist.
5. The student checks or unchecks steps. The app persists the minimal checklist state in localStorage.
6. On refresh, the current checklist and checked state are restored.
7. If the match is weak or absent, CourseFlow shows the no-verification message and suggests opening the source or contacting the office named in the source, if one is actually provided.

## 12. Privacy, security, and reliability

- Use public source material only.
- Do not collect name, email, student ID, grades, attendance, or private messages.
- Do not record or transmit questions; no question history is needed for the MVP.
- Store only checklist state locally; provide a clear reset that deletes it.
- Do not include secrets or API keys; none are needed.
- Escape/render source text safely; never interpret source HTML as executable content.
- Open source URLs with safe link attributes if opening a new tab.
- Runtime can be local/offline after dependencies and the source file are available. Initial Node package installation, Antigravity’s AI features, and downloading a public source may require connectivity.

## 13. Risks and mitigations

| Risk | Mitigation |
|---|---|
| No relevant campus document is available | Use one clearly identified public institutional document; mark local demand as unvalidated. |
| Keyword match is wrong | Keep one task; use fixed sample prompts; add a threshold and test unrelated questions. |
| Source is ambiguous or old | Show date/last-checked date; refuse to interpret beyond the excerpt; direct the user to the source/official contact. |
| User mistakes it for live Alexa+ | Show persistent simulation disclosure in app, README, and demo. |
| User assumes college endorsement | State “not an official college service”; do not use a logo without permission. |
| Offline setup fails | Install dependencies when connected or from a pre-existing cache; keep runtime data and fonts local. |
| Time pressure adds unfinished features | Freeze scope once one complete match, citation, checklist, persistence, and no-match flow work. |

## 14. Test and acceptance plan

### Required functional tests

- Matching sample prompt returns the intended source entry.
- Exact source excerpt, title, institution, URL, and date are present.
- Checklist contains only the configured source-backed steps.
- Each checkbox can be toggled and remains after refresh.
- Reset clears state.
- Unrelated question returns no-verification text and no answer/checklist.
- Empty or malformed local source data produces a useful state rather than a crash.

### Release acceptance checklist

- [ ] `npm install` completes in the available local environment.
- [ ] `npm run dev` opens CourseFlow on localhost.
- [ ] The app has no runtime API or live Alexa+ claim.
- [ ] The selected public source and excerpt are verified and attributed.
- [ ] Match, no-match, persistence, and reset have been tested.
- [ ] Keyboard controls, labels, focus, and contrast have been checked.
- [ ] Source placeholders and example policies are removed.
- [ ] README accurately explains local operation, source, simulation, privacy, and limitations.
- [ ] Repository and demo are uploaded only after local completion and user review.

## 15. References

[1] [Official Amazon Developer Hackathon rules](https://amazonappdev2026.devpost.com/rules)  
[2] [Official hackathon FAQ](https://amazonappdev2026.devpost.com/details/faqs)  
[3] [Official event resource hub](https://amazonappdev2026.devpost.com/resources)  
[4] [W3C cognitive accessibility guidance for voice systems](https://www.w3.org/TR/coga-voice/)
