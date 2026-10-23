<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import { artworks } from '../data/artworks'
import { loadProgress } from '../game/progress'

export default defineComponent({
  name: 'ArtCardsView',
  components: {
    Header
  },
  data() {
    const progress = loadProgress()

    return {
      artworks,
      collectedIds: progress.collectedIds,
      storageWarning: progress.warning
    }
  },
  methods: {
    isCollected(id: string) {
      return this.collectedIds.includes(id)
    }
  }
})
</script>

<template>
  <Header />
  <section class="art-cards-page" aria-labelledby="art-cards-title">
    <h1 id="art-cards-title">Vælg et kunstværk</h1>
    <p class="schematic-note">
      Dette er en skematisk spiloversigt. Valgene viser ikke værkernes faktiske placering på museet.
    </p>
    <p v-if="storageWarning" class="storage-warning" role="status">
      {{ storageWarning }}
    </p>
    <p class="progress-summary">Point: {{ collectedIds.length }} / {{ artworks.length }}</p>

    <ol class="artwork-grid" aria-label="Spillets 15 kunstværksudfordringer">
      <li v-for="(artwork, index) in artworks" :key="artwork.id" class="artwork-card">
        <RouterLink
          class="artwork-card-link"
          :to="{ name: 'artwork-challenge', params: { id: artwork.id } }"
          :aria-label="`Udfordring ${index + 1}: ${artwork.title} af ${artwork.artist}`"
        >
          <span class="artwork-number" aria-hidden="true">{{ index + 1 }}</span>
          <img :src="artwork.imageUrl" :alt="artwork.imageAlt" loading="lazy">
          <span class="artwork-card-details">
            <strong>{{ artwork.title }}</strong>
            <span>{{ artwork.artist }} · {{ artwork.productionPeriod }}</span>
            <span>{{ artwork.category }}</span>
            <span class="collection-status">
              {{ isCollected(artwork.id) ? 'Indsamlet' : 'Åbn udfordring' }}
            </span>
          </span>
        </RouterLink>
      </li>
    </ol>
  </section>
</template>
