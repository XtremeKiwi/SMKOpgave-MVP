# Tasks

## 1. Verify artwork and design sources

- [x] 1.1 Select fifteen artworks from SMK Open or another documented, appropriate source; verify each title, artist, image provenance, and applicable image-use terms, and record the source references alongside the content. Verify every selected field against its source; if all fifteen compliant works cannot be verified, stop and report the blocker rather than adding invented or substitute works.
- [ ] 1.2 Check the SMK design guide for applicable color and typography tokens and record only values confirmed by the guide. Verify each token against the source; if the guide remains inaccessible, use browser defaults without claiming SMK brand fidelity.

## 2. Set up TypeScript and navigation

- [x] 2.1 Add the minimal TypeScript configuration and compiler dependency required by the current Vite/Vue setup, convert the existing app entry point and router to TypeScript, and preserve Vue 3 Options API usage. Verify `npm run build` succeeds.
- [x] 2.2 Add simple routes for the start screen, schematic game map, artwork challenge, and collection. Verify each route loads its intended screen and `npm run build` succeeds.

## 3. Build the start screen and schematic map

- [x] 3.1 Build a Danish-language start screen with a visible, replaceable placeholder game name and a clear start action, plus clear navigation to the collection. Verify the start action reaches the map and the placeholder is visible and easy to replace.
- [x] 3.2 Build the mobile-first schematic map with fifteen selectable challenge markers and an explicit explanation that markers do not represent actual artwork locations. Verify all fifteen markers are accessible and no unverified room or location names appear.
- [x] 3.3 Apply responsive CSS and only verified design-guide tokens; otherwise retain browser defaults for color and typography. Verify the start and map screens remain readable and usable at a narrow mobile viewport.

## 4. Add verified artwork challenges

- [x] 4.1 Define a typed local artwork data model and add the fifteen source-verified artwork records, including image attribution/source, clue, one multiple-choice question, answer options, and the correct option. Verify each displayed fact and image against its recorded source.
- [x] 4.2 Build the artwork challenge view to display the verified image, title, artist, clue, and question, with clear text feedback for correct and incorrect answers. Verify a correct answer enables collection and an incorrect answer leaves the work uncollected and lets the player try again.
- [x] 4.3 Assign all fifteen artworks to the exact four requested categories in the shared artwork data model and display each category on cards, challenges, and collected artworks. Verify the assignments and category totals.
- [x] 4.4 Store all fifteen artwork images in `public/images/`, use local image paths for display, and retain SMK Open/API source and rights references. Verify all files are valid images and every artwork record points to its matching local asset.

## 5. Add collection, score, and local persistence

- [x] 5.1 Implement local progress storage for unique collected artwork IDs, deriving score as one point per unique work and progress from the collected set. Verify a new game starts at zero, collecting a new work adds one point, and collecting it again adds no points.
- [x] 5.2 Build the collection view to show collected artworks and score/progress out of fifteen. Verify it reflects the same collection as the map and challenge views.
- [x] 5.3 Handle unavailable or invalid local storage without claiming unsaved progress was restored. Verify the player receives a clear persistence warning when saving fails and the game remains usable for the current visit.
- [x] 5.4 Verify saved progress is restored after a page reload on the same device, using the browser's local storage and a reload as the check.

## 6. Verify integrated accessibility and behavior

- [x] 6.1 Manually verify the complete start → map → challenge → collection flow, including correct and incorrect answers, score/progress, duplicate collection, and reload persistence; verify `npm run build` succeeds.
- [x] 6.2 Verify keyboard navigation, meaningful control names, readable text and feedback, and usable layout on a narrow mobile viewport across all screens; fix any issues found and repeat the checks.

## 7. Add Achievements

- [x] 7.1 Extend the existing progress storage with unique first-answer history, preserve and migrate legacy collected-ID arrays, and continue deriving completed challenge progress from the existing unique artwork IDs.
- [x] 7.2 Define the eight typed Achievements from existing category and progress data; add the dedicated responsive `Achievements` page, route, global navigation link, icons, descriptions, progress, and locked/unlocked status.
- [x] 7.3 Verify all eight Achievements, category and overall thresholds, duplicate challenge handling, first-answer correctness, legacy collection migration, reload persistence, and unchanged artwork/category/collection behavior; run TypeScript check and production build.
