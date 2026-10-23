# Design

## Context

See `proposal.md` for motivation and `specs/art-hunt-game/spec.md` for the player-facing behavior. The current app is a small Vue 3/Vite project using JavaScript, an empty Vue Router route list, and no existing game state or styling. Vue Router is already a dependency; TypeScript is not.

The available design-guide and collection-page checks did not establish verifiable artwork records, image attribution/usage terms, museum locations, or brand design tokens. These must not be guessed.

## Goals / Non-Goals

**Goals:**

- Keep the implementation small and client-side, using Vue 3 Options API, TypeScript, Vue Router, CSS, and browser `localStorage`.
- Keep artwork content separate from player progress so verified content can be maintained independently.
- Keep score and progress consistent with the unique collected-artwork set.

**Non-Goals:**

- Add a backend, accounts, GPS, QR codes, leaderboard, or tournament features.
- Represent real gallery locations or reproduce a physical floor plan.
- Select or fabricate artwork records, images, clues, questions, or SMK brand tokens without verification.

## Decisions

1. **Use Vue Router for the main screens.** Keep the start screen, schematic game map, artwork challenge, and collection as direct, navigable views. This builds on the existing router dependency and avoids adding a separate navigation system.

2. **Use Options API components and typed static data.** Define a small typed artwork model containing stable ID, title, artist, category, image and attribution/source references, clue, question, options, and correct option. Keep the fifteen verified records in a local data module and store their display images in local project assets; preserve the original SMK image and metadata references and image-use terms with each record.

3. **Keep player state local and minimal.** Store unique collected artwork IDs and first-answer history in the existing `localStorage` progress record. Derive score as one point per unique collected artwork and completed-challenge/category Achievement progress from that same set rather than maintaining duplicate challenge counters. Migrate the legacy collected-ID array without dropping collected works; never infer that a legacy answer was correct on its first try. Derive Achievement unlocks from the persisted progress, and if browser storage is unavailable, explain that progress may not persist.

4. **Make the map illustrative, not geographic.** Present fifteen clearly selectable challenge markers in a schematic composition with text explaining that the markers are game navigation and not actual artwork locations. Do not show floor names, rooms, or spatial claims without a verified source.

5. **Use a replaceable placeholder for the game name.** Show a visible temporary name on the start screen until the final name is chosen; keep the placeholder easy to replace without changing game behavior.

6. **Defer brand styling until sources can be checked.** Do not choose SMK colors, fonts, or other brand tokens from memory. Check the design guide before applying them; if it remains inaccessible, retain browser defaults for color and typography and do not claim to reproduce SMK branding.

7. **Add TypeScript with the smallest Vite-compatible setup.** Convert the app entry and router to TypeScript and add the necessary project configuration and compiler dependency, while keeping Vue components on Options API. Avoid adding a state-management library for this small single-player game.

8. **Treat artwork and design research as implementation prerequisites.** Before adding artwork records, verify the source facts and image use terms for all fifteen works and record their provenance. Use the specified four categories without reassigning works. Do not substitute invented records if the sources cannot be verified; report the blocker instead. Check SMK's design guide before applying brand tokens.

9. **Build Achievements from existing progress.** Keep the eight Achievement definitions in a small typed module and derive each status and counter from existing artwork categories, unique collected IDs, and persisted first-answer data. Add a dedicated responsive `Achievements` route and link it through the global navigation. Do not create a second store for completed challenges or duplicate unlock counters.

## Risks / Trade-offs

- [Artwork facts or image rights cannot be verified] → Treat verification and permitted-use checks as a prerequisite to populating the fifteen records; do not ship invented content or unlabeled image placeholders as real works.
- [SMK design guide remains inaccessible] → Do not claim brand fidelity or guess brand colors and fonts; record the limitation and keep the interface legible without unverified brand tokens.
- [Browser storage can be disabled, cleared, or malformed] → Keep the game usable for the current visit, inform the player when progress cannot be saved, and recover safely from invalid saved data without reporting it as restored progress.
- [The map could be mistaken for a real floor plan] → Label it as schematic and avoid room names or real-world location markers.

## Migration Plan

1. Add TypeScript/Vite configuration and convert the existing JavaScript entry point and router without changing the app's existing bootstrap behavior.
2. Add the game views, verified content module, typed local progress helper, and responsive styles.
3. Build and manually verify the core start → challenge → collection flow, reload persistence, mobile layout, and keyboard access.

Rollback is limited to reverting the app and configuration changes in this feature; no server or persisted remote data is involved. A storage key/version should be scoped to this game so it can be safely ignored or cleared if the local format changes during development.
