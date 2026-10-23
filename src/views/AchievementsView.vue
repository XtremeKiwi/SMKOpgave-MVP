<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import { getAchievements } from '../game/achievements'
import { loadProgress } from '../game/progress'

export default defineComponent({
  name: 'AchievementsView',
  components: {
    Header
  },
  data() {
    const progress = loadProgress()

    return {
      achievements: getAchievements(progress),
      storageWarning: progress.warning
    }
  }
})
</script>

<template>
  <Header />
  <section class="achievements-page" aria-labelledby="achievements-title">
    <h1 id="achievements-title">Achievements</h1>
    <p v-if="storageWarning" class="storage-warning" role="status">
      {{ storageWarning }}
    </p>

    <ul class="achievement-grid" aria-label="Alle Achievements">
      <li
        v-for="achievement in achievements"
        :key="achievement.id"
        class="achievement-card"
        :class="{ 'achievement-card-unlocked': achievement.unlocked }"
      >
        <span class="achievement-icon" aria-hidden="true">{{ achievement.icon }}</span>
        <div class="achievement-details">
          <h2>{{ achievement.name }}</h2>
          <p>{{ achievement.description }}</p>
          <p class="achievement-progress">Fremskridt: {{ achievement.progress }}</p>
          <strong
            class="achievement-status"
            :aria-label="achievement.unlocked ? 'Låst op' : 'Låst'"
          >
            {{ achievement.unlocked ? 'Låst op' : 'Låst' }}
          </strong>
        </div>
      </li>
    </ul>
  </section>
</template>
