# Spec Delta

## Purpose

The art-hunt game gives museum visitors a simple, self-guided way to discover and learn about a small set of artworks. It supports a single player's collection and progress on the current device.

## ADDED Requirements

### Requirement: Start and navigation
The game MUST provide a start screen with a visible game name, which MAY be a placeholder until the final name is chosen, and a clear way to begin, plus clear navigation between the game map and the player's collection.

#### Scenario: Start a game
- **WHEN** a player opens the game before starting
- **THEN** the start screen displays the current game name or placeholder and a clear start action

#### Scenario: Navigate between game and collection
- **WHEN** a player is in the game
- **THEN** the player can move between the map and collection using clearly identified controls

### Requirement: Schematic game map
The game MUST provide a mobile-usable visual map or map-like overview for accessing all fifteen artwork challenges, and MUST NOT imply that its artwork markers represent verified physical museum locations.

#### Scenario: Choose an artwork challenge
- **WHEN** a player views the map
- **THEN** the player can identify and open each available artwork challenge

#### Scenario: Avoid unverified location claims
- **WHEN** a player views the map or an artwork marker
- **THEN** the presentation identifies it as a schematic game view and does not claim an actual gallery or museum location

### Requirement: Verified artwork content
Each of the fifteen artwork challenges MUST present an image, title, artist, clue, and question using information verified from a documented source; unverified artwork details and image attributions MUST NOT be presented as facts.

#### Scenario: View an artwork challenge
- **WHEN** a player opens an artwork challenge
- **THEN** the challenge displays its verified image, title, artist, clue, and question

#### Scenario: Artwork content has not been verified
- **WHEN** an artwork's required details or image source have not been verified
- **THEN** the game does not present invented or unverified content as a real artwork challenge

### Requirement: Answer artwork questions
Each artwork challenge MUST offer a multiple-choice question with one correct answer and provide clear feedback for the player's selection.

#### Scenario: Answer correctly
- **WHEN** a player selects the correct option
- **THEN** the game confirms the correct answer and makes the artwork collectible

#### Scenario: Answer incorrectly
- **WHEN** a player selects an incorrect option
- **THEN** the game indicates that the answer is incorrect, does not collect the artwork, and allows the player to try again

### Requirement: Artwork categories
The fifteen artworks MUST use exactly these categories and assignments: Portrætter (`KMSr14`, `KMS7961`, `KMSsp146`, `KMSsp789`); Skulpturer og statuer (`DEP44`, `KMS5781`, `KMS5680`, `KMS5415`); Landskaber og steder (`KMS3769`, `KMS445`, `KMS7385`, `KMS3605`); and Dyr (`KKSgb16521`, `DEP565`, `KMS446`).

#### Scenario: Browse categorized artworks
- **WHEN** a player views an artwork card, challenge, or collected artwork
- **THEN** the artwork is associated with its specified category

### Requirement: Locally stored artwork images
The game MUST display all fifteen artwork images from local project assets and retain the SMK Open/API artwork, image-source, and image-rights references alongside each record.

#### Scenario: Display an artwork image
- **WHEN** a player views an artwork card, challenge, or collected artwork
- **THEN** the image is served from the project's local assets rather than fetched from an external image host

### Requirement: Collect artworks
The game MUST add an artwork to the player's collection only after the player answers its question correctly, award one point for each uniquely collected artwork, and MUST prevent duplicate collection from increasing score or progress.

#### Scenario: Collect an artwork
- **WHEN** a player correctly answers a question for an artwork not yet collected
- **THEN** that artwork appears in the collection, the player's score increases by one point, and progress increases

#### Scenario: Correctly answer an already collected artwork
- **WHEN** a player correctly answers a question for an artwork already collected
- **THEN** the artwork remains collected and score and progress do not increase again

### Requirement: View collection and progress
The game MUST show collected artworks, a score equal to one point per unique collected artwork, and the player's progress toward collecting all fifteen artworks.

#### Scenario: View current collection
- **WHEN** a player opens the collection
- **THEN** the game shows which artworks are collected and the current score and progress out of fifteen

#### Scenario: Begin with no collected artworks
- **WHEN** a new player has not collected any artwork
- **THEN** the collection and progress show zero collected artworks and a score of zero

### Requirement: Persist player progress locally
The game MUST save and restore the player's collected artworks and challenge-answer history on the same device without requiring an account or backend, and MUST show the corresponding score, progress, and Achievements after restoration. Existing saved collections MUST be preserved when the progress format is extended.

#### Scenario: Restore saved progress
- **WHEN** a player returns to the game after closing or reloading it on the same device
- **THEN** the game restores the previously saved collection, score, and progress

#### Scenario: Local storage is unavailable
- **WHEN** the game cannot save progress in local storage
- **THEN** the game informs the player that progress may not persist after leaving the game

### Requirement: Achievements
The game MUST provide a separate responsive `Achievements` page reachable from the existing navigation. It MUST show all eight Achievements, locked or unlocked, with an icon, name, description, progress when applicable, and clear `Låst` or `Låst op` status.

#### Scenario: View all Achievements
- **WHEN** a player opens the `Achievements` page
- **THEN** all eight Achievements are visible with their current progress and locked or unlocked status

### Requirement: Category Achievements
Category Achievement progress MUST derive from unique completed artwork IDs and each artwork's existing category field, without a separate challenge-completion tracker. `Portrætekspert`, `Skulpturjæger`, `Stifinder`, and `Dyreven` MUST require three different completed works from `Portrætter`, `Skulpturer og statuer`, `Landskaber og steder`, and `Dyr`, respectively.

#### Scenario: Unlock a category Achievement
- **WHEN** a player completes three different challenges in one category
- **THEN** the corresponding category Achievement and `Three in a Row` are both unlocked, with progress shown as `3/3`

### Requirement: Overall completion Achievements
`Three in a Row` MUST unlock when three different challenges are completed in any one category. `Art Explorer` MUST count all fifteen unique completed challenges, and `Collector` MUST count all fifteen unique collected artworks.

#### Scenario: Count each completed challenge once
- **WHEN** a player reopens or completes the same artwork challenge again
- **THEN** category and overall challenge progress do not increase for that artwork a second time

#### Scenario: Complete the full set
- **WHEN** a player completes all fifteen different artwork challenges and collects all fifteen artworks
- **THEN** `Art Explorer` and `Collector` are unlocked with progress shown as `15/15`

### Requirement: First-answer Achievement
The game MUST record the first answer to each challenge once. `Perfect Answer` MUST unlock when any first answer is correct and MUST NOT count a challenge whose first answer was incorrect.

#### Scenario: Record a first-try correct answer
- **WHEN** a player's first answer to any artwork challenge is correct
- **THEN** `Perfect Answer` is unlocked

#### Scenario: First answer is incorrect
- **WHEN** a player's first answer to an artwork challenge is incorrect and a later answer is correct
- **THEN** the artwork may be collected, but that challenge does not qualify as a correct first try

### Requirement: Persist Achievement progress
Achievement progress and unlock state MUST survive reloads. Legacy collections MUST be preserved and count toward challenge and collection progress; legacy answers MUST NOT be assumed correct on the first try.

#### Scenario: Restore legacy and saved Achievement progress
- **WHEN** a player reloads the game or opens a legacy saved collection
- **THEN** collected works and derived Achievement progress are preserved, and no legacy answer is treated as a first-try success

### Requirement: Accessible responsive interface
The game MUST remain usable on mobile-sized screens and provide operable, clearly identified controls and perceivable text and feedback.

#### Scenario: Use the game on a mobile screen
- **WHEN** a player uses the game on a narrow mobile viewport
- **THEN** the start screen, map, artwork challenge, and collection remain readable and their controls remain usable

#### Scenario: Operate controls without a pointer
- **WHEN** a player navigates using a keyboard or assistive technology
- **THEN** interactive controls have meaningful names, can be reached and operated, and answer feedback is available as text
