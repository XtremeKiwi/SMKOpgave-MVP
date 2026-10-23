<script setup lang="ts">
import { computed, inject } from 'vue'

interface SchoolScore {
  School: string
  Score: number
}

const tournamentScores = inject<SchoolScore[]>('tournamentScores')

if (!tournamentScores) {
  throw new Error('Tournament requires tournamentScores to be provided by an ancestor.')
}

const rankedSchools = computed(() =>
  [...tournamentScores].sort((first, second) => second.Score - first.Score)
)
</script>

<template>
  <section class="tournament" aria-labelledby="tournament-title">
    <h2 id="tournament-title">Tournament</h2>
    <ol class="tournament__list">
      <li v-for="school in rankedSchools" :key="school.School">
        <span>{{ school.School }}</span>
        <strong>{{ school.Score }} points</strong>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.tournament {
  padding: 1.2rem;
  color: #111111;
  background: #fff;
  border: 2px solid #111111;
  border-radius: 0;
  box-shadow: none;
}

.tournament__list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tournament__list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0.9rem;
  background: #f9f6f2;
  border: 2px solid #111111;
  border-radius: 0;
}
</style>
