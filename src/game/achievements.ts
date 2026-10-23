import { artworks, type ArtworkCategory } from '../data/artworks'
import type { ProgressState } from './progress'

export interface Achievement {
  id: string
  icon: string
  name: string
  description: string
  progress: string
  unlocked: boolean
}

const categoryAchievements: {
  category: ArtworkCategory
  id: string
  icon: string
  name: string
}[] = [
  {
    category: 'Portrætter',
    id: 'portrait-expert',
    icon: '🖼️',
    name: 'Portrætekspert'
  },
  {
    category: 'Skulpturer og statuer',
    id: 'sculpture-hunter',
    icon: '🗿',
    name: 'Skulpturjæger'
  },
  {
    category: 'Landskaber og steder',
    id: 'pathfinder',
    icon: '🧭',
    name: 'Stifinder'
  },
  {
    category: 'Dyr',
    id: 'animal-lover',
    icon: '🐾',
    name: 'Dyreven'
  }
]

export function getAchievements(progress: ProgressState): Achievement[] {
  const completedIds = new Set(progress.collectedIds)
  const completedArtworks = artworks.filter((artwork) => completedIds.has(artwork.id))
  const categoryCounts = new Map<ArtworkCategory, number>()

  for (const artwork of completedArtworks) {
    categoryCounts.set(artwork.category, (categoryCounts.get(artwork.category) ?? 0) + 1)
  }

  const achievements: Achievement[] = categoryAchievements.map((achievement) => {
    const count = categoryCounts.get(achievement.category) ?? 0
    const unlocked = count >= 3

    return {
      id: achievement.id,
      icon: achievement.icon,
      name: achievement.name,
      description: `Gennemfør 3 forskellige udfordringer i kategorien ${achievement.category}.`,
      progress: `${Math.min(count, 3)}/3`,
      unlocked
    }
  })

  const maxCategoryCount = Math.max(0, ...categoryCounts.values())
  const threeInARowUnlocked = maxCategoryCount >= 3
  const allChallengesCompleted = completedArtworks.length
  const firstTryCorrect = progress.firstTryCorrectIds.length > 0
  const allCollected = progress.collectedIds.length

  achievements.push(
    {
      id: 'three-in-a-row',
      icon: '🎯',
      name: 'Three in a Row',
      description: 'Gennemfør 3 forskellige udfordringer i den samme kategori.',
      progress: `${Math.min(maxCategoryCount, 3)}/3`,
      unlocked: threeInARowUnlocked
    },
    {
      id: 'art-explorer',
      icon: '🧭',
      name: 'Art Explorer',
      description: 'Gennemfør alle 15 kunstværksudfordringer.',
      progress: `${allChallengesCompleted}/15`,
      unlocked: allChallengesCompleted === artworks.length
    },
    {
      id: 'perfect-answer',
      icon: '✨',
      name: 'Perfect Answer',
      description: 'Besvar en udfordring korrekt i første forsøg.',
      progress: firstTryCorrect ? '1/1' : '0/1',
      unlocked: firstTryCorrect
    },
    {
      id: 'collector',
      icon: '🏆',
      name: 'Collector',
      description: 'Saml alle 15 kunstværker i din samling.',
      progress: `${allCollected}/15`,
      unlocked: allCollected === artworks.length
    }
  )

  return achievements
}
