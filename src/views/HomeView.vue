<script lang="ts">
import { defineComponent } from 'vue'
import Events from '../components/Events.vue'
import Header from '../components/Header.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Header,
    Events
  },
  data() {
    return {
      gameName: 'Kunstjagt (arbejdstitel)'
    }
  }
})
</script>

<template>
  <Header />
  <section class="home-page" aria-labelledby="home-title">
    <h1 id="home-title">{{ gameName }}</h1>
    <p>Et lille spil om at gå på opdagelse i kunsten.</p>
    <RouterLink class="primary-action" to="/art-cards">Start spillet</RouterLink>
    <Events />
  </section>
</template>
