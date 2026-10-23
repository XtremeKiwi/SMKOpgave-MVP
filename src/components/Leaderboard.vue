<script setup lang="ts">
import { computed, inject } from 'vue'

interface Profile {
  Username: string
  Score: number
}

const userProfile = inject<Profile>('userProfile')
const friendProfiles = inject<Profile[]>('friendProfile')

if (!userProfile) {
  throw new Error('Leaderboard requires userProfile to be provided by an ancestor.')
}

if (!friendProfiles) {
  throw new Error('Leaderboard requires friendProfile to be provided by an ancestor.')
}

const leaderboard = computed(() =>
  [userProfile, ...friendProfiles]
    .map(({ Username, Score }) => ({ Username, Score }))
    .sort((first, second) => second.Score - first.Score)
)

const totalPoints = computed(() =>
  leaderboard.value.reduce((total, profile) => total + profile.Score, 0)
)

function placeLabel(index: number): string {
  const place = index + 1
  if (place === 1) return '1st'
  if (place === 2) return '2nd'
  if (place === 3) return '3rd'
  return `${place}th`
}
</script>

<template>
  <section class="leaderboard" aria-labelledby="leaderboard-title">
    <h2 id="leaderboard-title">Leaderboard</h2>
    <p class="leaderboard__total">Total points: <strong>{{ totalPoints }}</strong></p>
    <ol class="leaderboard__list">
      <li v-for="(profile, index) in leaderboard" :key="profile.Username">
        <span class="leaderboard__place">{{ placeLabel(index) }} place</span>
        <span class="leaderboard__name">{{ profile.Username }}</span>
        <strong>{{ profile.Score }} points</strong>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.leaderboard {
  padding: 1.2rem;
  color: #111111;
  background: #fff;
  border: 2px solid #111111;
  border-radius: 0;
  box-shadow: none;
}

.leaderboard__total {
  margin: 0 0 1rem;
  color: #404040;
}

.leaderboard__list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.leaderboard__list li {
  display: grid;
  grid-template-columns: 6rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 0.9rem;
  border: 2px solid #111111;
  border-radius: 0;
  background: #f9f6f2;
}

.leaderboard__place {
  color: #404040;
  font-weight: 700;
}

.leaderboard__list li:nth-child(-n + 3) .leaderboard__place {
  color: #6a311d;
}
</style>
