COURSEFLOW
UI/UX Design System
Visual direction, interface patterns, interaction rules, and implementation guidance
Canvas#0A0A08
Ivory#F4F1EB
Emerald#0D4C3C
Moss#7AA05A
Violet#A55BFF
Document purpose
This document translates the agreed CourseFlow visual direction into a practical design system for implementation. It is intended to sit alongside the existing Product Requirements Document (PRD) and Tech Stack/System Architecture document. It specifies the intended UI and UX; it does not claim that the application has already been implemented or tested.
Product context
CourseFlow is a local-first, Alexa+-style web simulation that helps a student turn a question about an institutional procedure into a source-linked, actionable checklist. The prototype uses React, TypeScript, Vite, local JSON policy data, deterministic keyword matching, and localStorage for checklist progress. It has no backend, no live Alexa+ connection, and no official university affiliation.
Design principle
Premium, dark, editorial, emerald-led, and evidence-first. The interface should feel composed and credible rather than futuristic for its own sake. Visual effects support hierarchy; they must never compete with the official source or checklist.
1. Design goals and non-goals
Make the next action obvious after a student submits a question.
Make the source evidence easy to inspect and open.
Make checklist progress easy to understand and resume.
Use a distinctive but restrained visual identity inspired by the supplied Figma-style and luxury-palette references.
Keep the interface accessible, responsive, and usable with a keyboard.
Do not imply that local keyword matching is a fully autonomous AI system.
Do not imply university endorsement, official affiliation, or a live Alexa+ integration.
Do not add decorative complexity, multiple dashboards, or extra features that weaken the core workflow.
2. Visual direction and palette rationale
The selected direction combines the charcoal and dark canvas in the references, warm neutral tones, Dark Emerald and Moss Green, and a restrained violet accent inspired by the purple lighting effects in the Figma screenshots. The palette should communicate trust and clarity while retaining a distinctive premium feel.
Token / role
Color
Usage
Canvas
#0A0A08
Main application background; existing PRD canvas token.
Surface
#171715
Primary cards and grouped regions.
Raised surface / charcoal
#222222
Inputs, nested panels, secondary cards.
Border
#343434
Subtle dividers and component outlines.
Primary text / warm ivory
#F4F1EB
Headings and primary text on dark surfaces.
Secondary text
#B7B5B0
Supporting explanations and secondary labels.
Muted text
#92918E
Low-priority metadata only; check contrast before use.
Primary brand / Dark Emerald
#0D4C3C
Primary action, selected states, restrained brand moments.
Primary hover
#12624C
Hover/active variation for primary actions.
Progress / Moss Green
#7AA05A
Progress indicators and positive completion states.
Decorative violet
#A55BFF
Small ambient glow, selected focus accent, decorative details only.
Success
#7AA05A
Completed state, paired with icon/text.
Warning
#F0C36A
Caution and source freshness notices.
Error
#FF8585
Error or unavailable state, paired with explanatory text.
Information
#8FC9FF
Informational status, only when needed.
Optional light surface
#F4F1EB
Use sparingly for an evidence excerpt or alternate light presentation if needed.
Palette note: #222222, #F4F1EB, #0D4C3C, #7AA05A, and #A55BFF were selected from or inspired by the provided palette screenshots. Electric Tangerine (#FF6D1F) is intentionally not the primary action color because it competes with the calmer institutional tone. Do not use violet as a large glowing background on every screen.
3. Design tokens
3.1 Typography
Purpose
Font / size
Guidance
Hero headline
Syne, 40–48 px, semibold
Desktop only; reduce substantially on mobile.
Page heading
Syne, 28–32 px, semibold
One clear H1 per view.
Section heading
Inter, 18–20 px, semibold
Use consistent heading hierarchy.
Body
Inter, 15–16 px, regular
Comfortable line length and line-height.
Source excerpt
Inter, 15–16 px; line-height 1.65
Prioritize readability and preserve exact text.
Labels/helper text
Inter, 12–14 px
Keep contrast strong; do not make instructions tiny.
Source metadata
JetBrains Mono, 11–12 px
Optional; use sparingly for dates/IDs.
Optional editorial accent
Instrument Serif
Use only for a short decorative headline, not UI labels or instructions.
Use system fallbacks when fonts are unavailable. If custom fonts are downloaded, ensure the app still behaves sensibly offline.
3.2 Spacing, shape, and motion
Token
Value
Use
space-1 / space-2
4 / 8 px
Micro spacing, icon gaps.
space-3 / space-4
12 / 16 px
Control padding and compact component spacing.
space-6 / space-8
24 / 32 px
Card padding and section spacing.
space-12 / space-16
48 / 64 px
Major section separation and hero spacing.
radius-sm
8 px
Small controls and chips.
radius-md
12 px
Inputs and compact cards.
radius-lg
18 px
Primary panels.
radius-xl
24 px
Large feature surfaces; use selectively.
motion-fast
140 ms
Hover/focus transitions.
motion-normal
220 ms
Panel and state transitions.
Use a 4 px base spacing system. Avoid mixing many arbitrary radii. Honor prefers-reduced-motion and never require animation to understand a state.
3.3 CSS variables
:root {  --cf-bg: #0A0A08;  --cf-surface: #171715;  --cf-surface-raised: #222222;  --cf-border: #343434;  --cf-text-primary: #F4F1EB;  --cf-text-secondary: #B7B5B0;  --cf-text-muted: #92918E;  --cf-primary: #0D4C3C;  --cf-primary-hover: #12624C;  --cf-progress: #7AA05A;  --cf-violet: #A55BFF;  --cf-success: #7AA05A;  --cf-warning: #F0C36A;  --cf-error: #FF8585;  --cf-info: #8FC9FF;  --cf-font-heading: "Syne", sans-serif;  --cf-font-body: "Inter", sans-serif;  --cf-font-mono: "JetBrains Mono", monospace;  --cf-space-1: 4px;  --cf-space-2: 8px;  --cf-space-3: 12px;  --cf-space-4: 16px;  --cf-space-6: 24px;  --cf-space-8: 32px;  --cf-space-12: 48px;  --cf-space-16: 64px;  --cf-radius-sm: 8px;  --cf-radius-md: 12px;  --cf-radius-lg: 18px;  --cf-radius-xl: 24px;  --cf-duration-fast: 140ms;  --cf-duration-normal: 220ms;}
4. Layout and responsive grid
Viewport
Layout
Rules
Desktop: ≥ 1024 px
Centered content, max-width 1120 px; two-column results
Question area remains prominent. Evidence and checklist may sit side by side. Use 24–32 px section gaps.
Tablet: 768–1023 px
Narrower two-column or stacked layout
Keep source text readable. Collapse columns if either becomes cramped.
Mobile: < 768 px
Single column
Full-width composer and primary action. Stack evidence and checklist. No horizontal scrolling. Touch targets ideally 44 × 44 px.
The MVP does not need a persistent, full-height sidebar. Prefer a compact top bar and one focused workspace. Keep institution selection visible if multi-institution support is implemented; otherwise show the single supported institution plainly.
5. Screen-level specifications
5.1 App shell and first-use state
Header: CourseFlow wordmark, concise product descriptor, and a clear 'Simulation' or 'Prototype' disclosure.
Hero: a plain-language prompt such as 'What do you need to get done?' with one sentence explaining that answers are limited to configured sources.
Question composer: one labeled text input, one primary button, and two or three sample-question chips drawn from the supported policy dataset.
Trust note: state that CourseFlow is not an official university service and uses public documents.
Avoid fabricated testimonials, fake usage statistics, university logos, or endorsement language.
5.2 Question composer
Provide a visible label; placeholder text alone is insufficient.
Primary button label: 'Find my next step' or similarly direct language.
Submitting with Enter should work where appropriate; Shift+Enter may insert a newline only if a multiline input is chosen.
Disable duplicate submission while matching runs, even if the local operation is brief.
Example-question chips must correspond to supported entries in the current dataset.
Do not display a fake streaming response for a deterministic local matcher.
5.3 Matched result and evidence panel
Show the institution name, document title, last-checked date when available, and an 'Open official source' link.
Render the exact configured source excerpt; do not silently paraphrase or rewrite it.
Display the evidence before or alongside the checklist so the source is easy to inspect.
Open external links safely in a new tab when appropriate and make the destination clear.
If a source date is unknown, say 'Date not recorded' rather than inventing a freshness date.
5.4 Action checklist
Show only configured steps that are supported by the cited source(s).
Use native checkbox controls or accessible custom checkboxes with clear labels.
Display a simple completion count, such as '2 of 4 completed'; do not rely on color alone.
Persist progress by stable policy/entry ID and stable step IDs in localStorage.
Provide a reset action. Confirm before clearing progress if the action is destructive.
If the source does not fully describe the procedure, make the limitation explicit instead of filling gaps.
5.5 No-match, ambiguity, and error states
State
Required behavior / example copy
No match
“I couldn’t verify this from the selected source.” Offer supported example questions.
Ambiguous match / tie
Do not choose arbitrarily. Ask the user to clarify or show a short list of clearly labeled supported topics.
Empty or invalid policy data
Show a useful unavailable-state message; do not render a broken blank screen.
Source URL unavailable
Keep the configured excerpt visible if valid, but clearly state that the source link could not be opened or verified; never imply live verification.
Storage unavailable
Continue the session where possible and explain that progress may not persist in this browser.
Reset requested
Explain what will be cleared and ask for confirmation if necessary.
6. Component inventory
Component
Purpose
Key rules
AppHeader
Brand, product label, simulation disclosure
Compact, consistent, no fake institution branding.
QuestionComposer
Question entry and submission
Visible label, examples, keyboard support, clear disabled state.
ExampleQuestionChip
Discoverable supported queries
Only include questions represented in the local data.
MatchStatus
Searching, matched, no match, ambiguous
Use text and icon; do not rely on color alone.
EvidencePanel
Source and exact excerpt
Institution, title, date if available, URL, exact text.
ChecklistPanel
Action steps and progress
Stable step IDs, accessible controls, persistent state.
ProgressIndicator
Completion count / progress
Always show numeric text alongside visual progress.
ResetProgressControl
Clear saved checklist state
Confirm destructive reset where appropriate.
DisclosureFooter
Prototype and non-affiliation disclaimer
Visible but not intrusive.
7. Interaction and state model
State
Visual behavior
Functional expectation
Initial
Quiet empty state and sample questions
No result is implied before submission.
Searching
Subtle progress indication
Prevent duplicate submits; keep input context.
Match found
Evidence panel and checklist appear
Only show the selected configured record.
No match
Neutral explanatory state
No fabricated answer; suggest supported queries.
Ambiguous
Clarification or candidate selection
Never silently pick between close matches.
Progress saved
Small saved-state cue if useful
Refresh restores the same stable checklist state.
Reset
Confirmation then updated checklist
Clear only the intended entry's saved progress.
Keyboard focus
Visible high-contrast focus ring
Every interactive element is keyboard operable.
Reduced motion
No nonessential transitions
Honor prefers-reduced-motion.
8. Matching and data integrity requirements
These rules extend the visual system into product behavior. They should be implemented in the existing local matcher and policy data, not by introducing a backend or LLM.
Use a documented deterministic scoring method and threshold.
Normalize input consistently, but do not treat a shared generic word as sufficient proof of a match.
Define a minimum score and a minimum separation between the best and second-best match; otherwise abstain or ask for clarification.
Keep matching restricted to the selected institution if multi-institution support is later added.
Store stable IDs for institutions, policy entries, and checklist steps.
Keep the excerpt and steps separate so each can be reviewed against the official source.
Track lastChecked as the date the team actually reviewed the source, not the date the UI was generated.
Treat localStorage as browser-local persistence, not cloud sync or secure long-term storage.
9. Accessibility and inclusive design
Use semantic landmarks and a logical heading order.
Associate every form control with a programmatic label.
Ensure all flows work with keyboard alone and show a visible focus indicator.
Check text/background contrast against WCAG 2.2 AA targets; especially re-check muted text, emerald buttons, moss green, violet, and error colors.
Do not use color as the only indicator of success, warning, error, selection, or completion.
Use meaningful link text such as 'Open official source: [document title]' rather than 'click here'.
Make tap targets comfortably sized on mobile; aim for at least 44 × 44 px.
Honor browser zoom and reflow at narrow widths.
Honor prefers-reduced-motion and avoid flashing or continuously pulsing effects.
10. Motion, effects, and visual restraint
Use subtle hover/focus transitions of about 140–220 ms.
Use violet glow only for a small brand accent, focus detail, or restrained decorative illustration.
Avoid glowing borders around every card, blurred backgrounds behind long passages, and looping animation.
Do not animate source text or checklist items in a way that slows reading.
Keep shadows and borders subtle; hierarchy should primarily come from spacing, typography, and contrast.
Ensure every essential state is understandable when animation is disabled.
11. Suggested component and file structure
src/  app/    App.tsx  components/    AppHeader.tsx    QuestionComposer.tsx    ExampleQuestionChip.tsx    MatchStatus.tsx    EvidencePanel.tsx    ChecklistPanel.tsx    ProgressIndicator.tsx    ResetProgressControl.tsx    DisclosureFooter.tsx  data/    policies.json  lib/    matchPolicy.ts    checklistStorage.ts    policyTypes.ts  styles/    tokens.css    global.css    components.css
12. Implementation-ready CSS starter
:root {  color-scheme: dark;  background: var(--cf-bg);  color: var(--cf-text-primary);  font-family: var(--cf-font-body);}* { box-sizing: border-box; }body {  margin: 0;  min-width: 320px;  background: var(--cf-bg);  color: var(--cf-text-primary);  line-height: 1.55;}.cf-container {  width: min(100% - 32px, 1120px);  margin-inline: auto;}.cf-panel {  background: var(--cf-surface);  border: 1px solid var(--cf-border);  border-radius: var(--cf-radius-lg);  padding: var(--cf-space-6);}.cf-input {  width: 100%;  min-height: 48px;  padding: 12px 16px;  border: 1px solid var(--cf-border);  border-radius: var(--cf-radius-md);  background: var(--cf-surface-raised);  color: var(--cf-text-primary);  font: inherit;}.cf-button-primary {  min-height: 44px;  padding: 12px 18px;  border: 1px solid transparent;  border-radius: var(--cf-radius-md);  background: var(--cf-primary);  color: var(--cf-text-primary);  font: inherit;  font-weight: 600;  cursor: pointer;  transition: background var(--cf-duration-fast) ease;}.cf-button-primary:hover { background: var(--cf-primary-hover); }:where(button, input, textarea, a, [tabindex]):focus-visible {  outline: 2px solid var(--cf-violet);  outline-offset: 3px;}@media (min-width: 900px) {  .cf-results-grid {    display: grid;    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);    gap: var(--cf-space-6);    align-items: start;  }}@media (max-width: 899px) {  .cf-results-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }  .cf-panel { padding: 20px; }}@media (prefers-reduced-motion: reduce) {  *, *::before, *::after {    scroll-behavior: auto !important;    animation-duration: 0.01ms !important;    transition-duration: 0.01ms !important;  }}
13. Recommended updates to the existing PRD and architecture
Add this design system as the visual source of truth and replace conflicting primary-action colors with Dark Emerald.
Add the full interface state list: initial, searching, matched, no match, ambiguous, empty data, storage unavailable, and reset confirmation.
Specify a deterministic match threshold, tie behavior, and tests for misleading queries.
Specify stable policy/entry and step IDs, plus the exact localStorage data shape.
Add responsive breakpoints and mobile acceptance tests.
Add an accessibility checklist including keyboard-only use, visible focus, contrast verification, reduced motion, and semantic labels.
Keep multi-institution support out of the MVP until each institution has verified source records.
Keep MCP, accounts, backend services, voice capture, and live Alexa+ integration out of the MVP unless requirements change deliberately.
14. Acceptance checklist
☐  The initial screen clearly explains the product and its limits.
☐  The primary question flow works at desktop and mobile widths.
☐  Only configured, source-backed results are shown.
☐  The source excerpt is exact and the official source link is visible.
☐  The institution, document title, and last-checked date are accurate or explicitly unavailable.
☐  Ambiguous and unrelated queries do not produce arbitrary policy answers.
☐  Checklist steps are keyboard operable and have descriptive labels.
☐  Progress survives refresh in the same browser profile.
☐  Reset clears only the intended progress and communicates the effect.
☐  No-match, empty-data, and storage-failure states are handled.
☐  All interactive elements have visible keyboard focus.
☐  Contrast has been checked for text, buttons, borders, and status colors.
☐  The UI reflows without horizontal scrolling at 320 px width.
☐  Reduced-motion settings are respected.
☐  The UI clearly states that CourseFlow is a simulation and not an official university service.
☐  No unverified institutional claims, logos, testimonials, or usage statistics appear.
15. Design decision summary
Adopt a dark, editorial interface built around #0A0A08, warm ivory text, Dark Emerald primary actions, Moss Green progress, and restrained Electric Violet decorative accents. Prioritize source evidence and the action checklist over decorative AI motifs. Keep the architecture local-first and deterministic, and treat trust, responsive behavior, accessibility, and safe failure as part of the design—not optional polish.
CourseFlow UI/UX Design System · Version 1.0 · Prepared for implementation
