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
  padding: 1.25rem;
  color: #253044;
  background: #fff;
  border: 1px solid #dce2eb;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.9rem rgb(25 40 65 / 8%);
}

.leaderboard__total {
  margin: 0 0 1rem;
  color: #526d99;
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
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f5f7fa;
  border-radius: 0.5rem;
}

.leaderboard__place {
  color: #68758a;
  font-weight: 600;
}

.leaderboard__list li:nth-child(-n + 3) .leaderboard__place {
  color: #526d99;
}
</style>
