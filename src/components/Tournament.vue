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
  padding: 1.25rem;
  color: #253044;
  background: #fff;
  border: 1px solid #dce2eb;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.9rem rgb(25 40 65 / 8%);
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
  padding: 0.75rem;
  background: #f5f7fa;
  border-radius: 0.5rem;
}
</style>
