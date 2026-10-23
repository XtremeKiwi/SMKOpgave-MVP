<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import { artworks } from '../data/artworks'
import { loadProgress } from '../game/progress'

export default defineComponent({
  name: 'CollectionView',
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
  computed: {
    collectedArtworks() {
      return this.artworks.filter((artwork) => this.collectedIds.includes(artwork.id))
    }
  }
})
</script>

<template>
  <Header />
  <section class="collection-page" aria-labelledby="collection-title">
    <h1 id="collection-title">Min samling</h1>
    <p v-if="storageWarning" class="storage-warning" role="status">
      {{ storageWarning }}
    </p>
    <p class="progress-summary" aria-live="polite">
      Point: {{ collectedIds.length }} · Fremgang: {{ collectedIds.length }} / {{ artworks.length }}
    </p>

    <p v-if="collectedArtworks.length === 0">
      Din samling er tom. Besvar en udfordring rigtigt for at samle dit første værk.
    </p>

    <ul v-else class="collection-grid" aria-label="Indsamlede kunstværker">
      <li v-for="artwork in collectedArtworks" :key="artwork.id" class="artwork-card">
        <img :src="artwork.imageUrl" :alt="artwork.imageAlt" loading="lazy">
        <div class="artwork-card-details">
          <strong>{{ artwork.title }}</strong>
          <span>{{ artwork.artist }} · {{ artwork.productionPeriod }}</span>
          <span>{{ artwork.category }}</span>
          <a :href="artwork.artworkSourceUrl" target="_blank" rel="noreferrer">
            Kilde: SMK Open
          </a>
          <span>
            Billede og rettigheder:
            <a :href="artwork.imageRights.url" target="_blank" rel="noreferrer">
              {{ artwork.imageRights.label }}
            </a>
            · {{ artwork.imageRights.attribution }}
          </span>
        </div>
      </li>
    </ul>

    <RouterLink class="primary-action" to="/art-cards">Find flere værker</RouterLink>
  </section>
</template>
