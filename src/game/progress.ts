import { artworks } from '../data/artworks'

const storageKey = 'smk-art-hunt-progress-v1'
const artworkIds = new Set(artworks.map((artwork) => artwork.id))

interface StoredProgress {
  version: 2
  collectedIds: string[]
  answeredIds: string[]
  firstTryCorrectIds: string[]
}

export interface ProgressState {
  collectedIds: string[]
  answeredIds: string[]
  firstTryCorrectIds: string[]
  warning: string | null
}

let sessionProgress: StoredProgress = {
  version: 2,
  collectedIds: [],
  answeredIds: [],
  firstTryCorrectIds: []
}
let hasUnsavedProgress = false

const storageWarning =
  'Spillet kan ikke gemme din fremgang på denne enhed. Den kan gå tabt, når du forlader spillet.'

function isArtworkIdArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((id): id is string => typeof id === 'string' && artworkIds.has(id))
  )
}

function uniqueIds(ids: readonly string[]): string[] {
  return [...new Set(ids)]
}

function toProgressState(warning: string | null): ProgressState {
  return {
    collectedIds: [...sessionProgress.collectedIds],
    answeredIds: [...sessionProgress.answeredIds],
    firstTryCorrectIds: [...sessionProgress.firstTryCorrectIds],
    warning
  }
}

function restoreProgress(savedValue: unknown): StoredProgress | null {
  if (Array.isArray(savedValue) && isArtworkIdArray(savedValue)) {
    const collectedIds = uniqueIds(savedValue)
    return {
      version: 2,
      collectedIds,
      answeredIds: [...collectedIds],
      firstTryCorrectIds: []
    }
  }

  if (
    typeof savedValue !== 'object' ||
    savedValue === null ||
    !('version' in savedValue) ||
    savedValue.version !== 2 ||
    !('collectedIds' in savedValue) ||
    !('answeredIds' in savedValue) ||
    !('firstTryCorrectIds' in savedValue) ||
    !isArtworkIdArray(savedValue.collectedIds) ||
    !isArtworkIdArray(savedValue.answeredIds) ||
    !isArtworkIdArray(savedValue.firstTryCorrectIds)
  ) {
    return null
  }

  const collectedIds = uniqueIds(savedValue.collectedIds)
  const answeredIds = uniqueIds(savedValue.answeredIds)
  const firstTryCorrectIds = uniqueIds(savedValue.firstTryCorrectIds)
  const collectedIdSet = new Set(collectedIds)
  const answeredIdSet = new Set(answeredIds)

  if (
    !collectedIds.every((id) => answeredIdSet.has(id)) ||
    !firstTryCorrectIds.every((id) => collectedIdSet.has(id))
  ) {
    return null
  }

  return {
    version: 2,
    collectedIds,
    answeredIds,
    firstTryCorrectIds
  }
}

function persistProgress(progress: StoredProgress): ProgressState {
  sessionProgress = progress

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(progress))
    hasUnsavedProgress = false
    return toProgressState(null)
  } catch {
    hasUnsavedProgress = true
    return toProgressState(storageWarning)
  }
}

export function loadProgress(): ProgressState {
  let savedProgress: string | null

  try {
    savedProgress = window.localStorage.getItem(storageKey)
  } catch {
    return toProgressState(storageWarning)
  }

  if (savedProgress === null) {
    if (hasUnsavedProgress) {
      return toProgressState(storageWarning)
    }

    sessionProgress = {
      version: 2,
      collectedIds: [],
      answeredIds: [],
      firstTryCorrectIds: []
    }
    return toProgressState(null)
  }

  let parsedProgress: unknown
  try {
    parsedProgress = JSON.parse(savedProgress)
  } catch {
    sessionProgress = {
      version: 2,
      collectedIds: [],
      answeredIds: [],
      firstTryCorrectIds: []
    }
    return toProgressState('Den gemte fremgang kunne ikke læses. Du starter med en tom samling.')
  }

  const restoredProgress = restoreProgress(parsedProgress)
  if (!restoredProgress) {
    sessionProgress = {
      version: 2,
      collectedIds: [],
      answeredIds: [],
      firstTryCorrectIds: []
    }
    return toProgressState('Den gemte fremgang kunne ikke læses. Du starter med en tom samling.')
  }

  sessionProgress = restoredProgress
  hasUnsavedProgress = false
  return toProgressState(null)
}

export function recordAnswer(artworkId: string, isCorrect: boolean): ProgressState {
  if (!artworkIds.has(artworkId)) {
    throw new Error(`Cannot record an answer for unknown artwork "${artworkId}".`)
  }

  const isFirstAnswer = !sessionProgress.answeredIds.includes(artworkId)
  const answeredIds = uniqueIds([...sessionProgress.answeredIds, artworkId])
  const firstTryCorrectIds =
    isCorrect && isFirstAnswer
      ? uniqueIds([...sessionProgress.firstTryCorrectIds, artworkId])
      : sessionProgress.firstTryCorrectIds
  const collectedIds = isCorrect
    ? uniqueIds([...sessionProgress.collectedIds, artworkId])
    : sessionProgress.collectedIds

  return persistProgress({
    version: 2,
    collectedIds,
    answeredIds,
    firstTryCorrectIds
  })
}
