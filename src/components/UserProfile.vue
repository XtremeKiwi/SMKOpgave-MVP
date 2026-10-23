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
  gap: 1.25rem;
  width: min(100%, 34rem);
  padding: 1.25rem;
  color: #253044;
  background: #fff;
  border: 1px solid #dce2eb;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.9rem rgb(25 40 65 / 8%);
}

.user-profile__information {
  min-width: 0;
  flex: 1;
}

.user-profile__picture {
  width: 200px;
  height: 200px;
  flex: 0 0 200px;
  object-fit: cover;
  border: 2px solid #e8ecf2;
  border-radius: 50%;
}

.user-profile__name {
  margin: 0;
  font-size: 1.25rem;
}

.user-profile__details {
  display: grid;
  gap: 0.7rem;
  margin: 1rem 0 0;
}

.user-profile__details > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.user-profile__details dt {
  color: #68758a;
}

.user-profile__details dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}
</style>
