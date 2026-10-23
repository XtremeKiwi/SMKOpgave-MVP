<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import UserProfile from '../components/UserProfile.vue'
import FriendProfile from '../components/FriendProfile.vue'
import Streak from '../components/Streak.vue'

export default defineComponent({
  name: 'MyProfile',
  components: {
    Header,
    UserProfile,
    FriendProfile,
    Streak
  }
})
</script>

<template>
  <Header />
  <section class="my-profile-page" aria-labelledby="my-profile-title">
    <h1 id="my-profile-title">Min profil</h1>
    <UserProfile />
    <Streak />
    <FriendProfile />
  </section>
</template>
