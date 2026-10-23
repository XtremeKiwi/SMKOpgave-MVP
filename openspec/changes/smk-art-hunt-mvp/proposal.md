# Proposal

## Why

Museum visits can feel passive to young visitors and school groups. This change introduces a small, self-contained mobile game that encourages players to discover and learn about artworks during a visit, without requiring accounts, network services, or location tracking.

## What Changes

- Add a Danish-language mobile-first art-hunt game with a start screen, a clearly schematic museum map, fifteen artwork challenges in four categories, a collection view, and visible score and progress.
- Store all fifteen artwork images locally in the project while retaining their SMK Open/API source and rights references.
- Add an Achievements page with eight unlockable goals based on unique completed challenges, categories, first-try answers, and the collection.
- Let players answer one question per artwork and collect it only after a correct answer, with clear feedback.
- Persist collected artworks and progress locally in `localStorage`.
- Use Vue 3 Options API and TypeScript, with simple Vue Router navigation and accessible, responsive CSS.
- Use only artwork details and images that can be verified from SMK Open or another documented, appropriate source. Do not imply real-world artwork locations; the map is an illustrative game navigation surface.

## Capabilities

### New Capabilities

- `art-hunt-game`: The player's museum art-hunt experience, including navigation, challenges, collection, score, progress, and local persistence.

### Modified Capabilities

None.

## Impact

- Affects the existing Vue app entry point, root component, router, and new view, game-data, persistence, and style modules.
- Requires introducing TypeScript support into the current JavaScript-based Vite setup while preserving the requested Vue 3 Options API.
- Uses Vue Router already present in the project; no backend or runtime service is introduced.
- Artwork selection and metadata remain a research prerequisite: the available design and collection pages were not sufficient to verify specific works, images, or physical locations during exploration.
