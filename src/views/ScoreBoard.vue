<script setup lang="ts">
import Header from '../components/Header.vue'
import Leaderboard from '../components/Leaderboard.vue'
import Tournament from '../components/Tournament.vue'
</script>

<template>
  <Header />
  <section class="scoreboard-page" aria-labelledby="scoreboard-title">
    <h1 id="scoreboard-title">Scoreboard</h1>
    <div class="scoreboard-page__sections">
      <Leaderboard />
      <Tournament />
    </div>
  </section>
</template>

<style scoped>
.scoreboard-page__sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  align-items: start;
  gap: 1.25rem;
}
</style>
