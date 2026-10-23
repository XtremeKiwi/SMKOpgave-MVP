<script setup lang="ts">
import { inject } from 'vue'

interface UserProfileData {
  Username: string
  Age: string
  Skill: string
  School: string
  Score: number
  ProfilePicture: string
}

defineOptions({
  name: 'UserProfile'
})

const userProfile = inject<UserProfileData>('userProfile')

if (!userProfile) {
  throw new Error('UserProfile requires userProfile to be provided by an ancestor.')
}
</script>

<template>
  <section class="user-profile" aria-label="User profile">
    <img
      v-if="userProfile.ProfilePicture"
      class="user-profile__picture"
      :src="userProfile.ProfilePicture"
      :alt="`${userProfile.Username}'s profile picture`"
    />
    <div class="user-profile__information">
      <h2 class="user-profile__name">{{ userProfile.Username }}</h2>
      <dl class="user-profile__details">
        <div>
          <dt>Age</dt>
          <dd>{{ userProfile.Age }}</dd>
        </div>
        <div>
          <dt>Skill</dt>
          <dd>{{ userProfile.Skill }}</dd>
        </div>
        <div>
          <dt>School</dt>
          <dd>{{ userProfile.School }}</dd>
        </div>
        <div>
          <dt>Score</dt>
          <dd>{{ userProfile.Score }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  width: min(100%, 34rem);
  padding: 1.2rem;
  color: #111111;
  background: #fff;
  border: 2px solid #111111;
  border-radius: 0;
  box-shadow: none;
}

.user-profile__information {
  min-width: 0;
  flex: 1;
}

.user-profile__picture {
  width: 7rem;
  height: 7rem;
  flex: 0 0 7rem;
  object-fit: cover;
  border: 2px solid #111111;
  border-radius: 0;
}

.user-profile__name {
  margin: 0 0 0.5rem;
  font-size: 1.6rem;
}

.user-profile__details {
  display: grid;
  gap: 0.7rem;
  margin: 0;
}

.user-profile__details > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.user-profile__details dt {
  color: #404040;
}

.user-profile__details dd {
  margin: 0;
  font-weight: 700;
  text-align: right;
}
</style>
