<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import { artworks, type Artwork } from '../data/artworks'
import { loadProgress, recordAnswer } from '../game/progress'

export default defineComponent({
  name: 'ArtworkChallengeView',
  components: {
    Header
  },
  data() {
    const progress = loadProgress()

    return {
      collectedIds: progress.collectedIds,
      selectedOptionId: '',
      feedback: '',
      feedbackIsCorrect: false,
      storageWarning: progress.warning
    }
  },
  computed: {
    artwork(): Artwork | undefined {
      return artworks.find((item) => item.id === this.$route.params.id)
    }
  },
  watch: {
    '$route.params.id'() {
      const progress = loadProgress()
      this.collectedIds = progress.collectedIds
      this.selectedOptionId = ''
      this.feedback = ''
      this.feedbackIsCorrect = false
      this.storageWarning = progress.warning
    }
  },
  methods: {
    submitAnswer() {
      if (!this.artwork || !this.selectedOptionId) {
        return
      }

      const isCorrect = this.selectedOptionId === this.artwork.question.correctOptionId
      const alreadyCollected = this.collectedIds.includes(this.artwork.id)
      const progress = recordAnswer(this.artwork.id, isCorrect)
      this.collectedIds = progress.collectedIds
      this.storageWarning = progress.warning

      if (!isCorrect) {
        this.feedback = 'Det er ikke det rigtige svar. Prøv igen.'
        this.feedbackIsCorrect = false
        return
      }

      this.feedback = alreadyCollected
        ? 'Rigtigt svar! Værket er allerede i din samling, så du får ikke et ekstra point.'
        : 'Rigtigt svar! Værket er føjet til din samling.'
      this.feedbackIsCorrect = true
    }
  }
})
</script>

<template>
  <Header />
  <section v-if="artwork" class="challenge-page" aria-labelledby="challenge-title">
    <p v-if="storageWarning" class="storage-warning" role="status">
      {{ storageWarning }}
    </p>
    <RouterLink class="back-link" to="/art-cards">Tilbage til kunstkortene</RouterLink>
    <h1 id="challenge-title">{{ artwork.title }}</h1>
    <p>{{ artwork.category }}</p>
    <figure class="challenge-artwork">
      <img :src="artwork.imageUrl" :alt="artwork.imageAlt">
      <figcaption>
        <span>{{ artwork.artist }} · {{ artwork.productionPeriod }}</span>
        <a :href="artwork.artworkSourceUrl" target="_blank" rel="noreferrer">
          Se værket hos SMK Open
        </a>
        <span>
          Billede:
          <a :href="artwork.imageSourceUrl" target="_blank" rel="noreferrer">SMK</a>
          · {{ artwork.imageRights.attribution }}
          ·
          <a :href="artwork.imageRights.url" target="_blank" rel="noreferrer">
            {{ artwork.imageRights.label }}
          </a>
        </span>
      </figcaption>
    </figure>

    <p><strong>Ledetråd:</strong> {{ artwork.clue }}</p>
    <form class="question-form" @submit.prevent="submitAnswer">
      <fieldset>
        <legend>{{ artwork.question.prompt }}</legend>
        <label
          v-for="option in artwork.question.options"
          :key="option.id"
          class="answer-option"
        >
          <input
            v-model="selectedOptionId"
            type="radio"
            name="answer"
            :value="option.id"
          >
          <span>{{ option.text }}</span>
        </label>
      </fieldset>
      <button class="primary-action" type="submit" :disabled="!selectedOptionId">
        Tjek svar
      </button>
      <p
        v-if="feedback"
        class="answer-feedback"
        :class="{ 'answer-feedback-correct': feedbackIsCorrect }"
        role="status"
        aria-live="polite"
      >
        {{ feedback }}
      </p>
    </form>

    <nav class="page-actions" aria-label="Videre navigation">
      <RouterLink to="/art-cards">Til kunstkortene</RouterLink>
      <RouterLink to="/collection">Til min samling</RouterLink>
      <RouterLink to="/achievements">Til Achievements</RouterLink>
    </nav>
  </section>

  <section v-else class="placeholder-page" aria-labelledby="not-found-title">
    <h1 id="not-found-title">Kunstværket blev ikke fundet</h1>
    <p>Vælg et af spillets værker for at åbne en udfordring.</p>
    <RouterLink to="/art-cards">Til kunstkortene</RouterLink>
  </section>
</template>
