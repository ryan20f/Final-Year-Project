# AI assistance: initial GPS prototype

This checkpoint contains an Expo-generated starter application and code generated
with ChatGPT/Codex assistance. It is not a record of independently written code.

## Prompt

> okay and help me get started with the code please

The preceding conversation specified a React Native/Expo TypeScript mobile app
for a golf final year project, initially capturing two GPS positions and measuring
their distance. Development took place on Windows with an iPhone as the target.

## Output adopted

- Replaced `src/app/index.tsx` with a two-position GPS measurement screen,
  foreground permission handling, loading/error states and reset controls.
- Added `src/utils/distance.ts`, implementing the standard Haversine formula.
- Updated `app.json` with the display name and location permission explanation.
- Installed the Expo-compatible location dependency and Expo lint tooling.
- Fixed starter-template typing in `src/components/app-tabs.web.tsx`, added
  `src/types/styles.d.ts`, and updated `src/hooks/use-color-scheme.web.ts`
  to address a lint issue.
- Added `GETTING-STARTED.md` and this disclosure document.

The navigation, example screens, assets and most other files were supplied by
the Expo starter template. The commit includes those files alongside the
AI-generated changes because the mobile directory was previously untracked.

## Verification and limitations

The assistant ran TypeScript and ESLint checks successfully and checked the
distance function for identical points, a known approximate distance and
symmetry. These are assistant-run checks, not a claim of student testing.
Successful operation on the student's iPhone has not yet been confirmed.
Positions are held in memory; database persistence and strokes-gained modelling
are not implemented in this checkpoint.

## Transcript evidence

This document summarises the contribution. Retain the actual conversation's
prompts and responses separately to meet the project's AI disclosure requirements.
The commit identifies the resulting code; it does not replace that transcript.
Subsequent setup, debugging and explanatory assistance should also be logged.
