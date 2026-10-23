<script setup lang="ts">
import { inject } from 'vue'

interface FriendProfileData {
  Username: string
  Age: string
  Skill: string
  School: string
  Score: number
  ProfilePicture: string
}

defineOptions({
  name: 'FriendProfile'
})

const friendProfile = inject<FriendProfileData[]>('friendProfile')

if (!friendProfile) {
  throw new Error('FriendProfile requires friendProfile to be provided by an ancestor.')
}
</script>

<template>
  <section class="friend-profiles" aria-labelledby="friend-profiles-title">
    <h2 id="friend-profiles-title">Friends</h2>
    <div class="friend-profiles__list">
      <RouterLink
        v-for="profile in friendProfile"
        :key="profile.Username"
        class="friend-profile-link"
        :to="{ name: 'friend-profile', params: { username: profile.Username } }"
      >
        <article class="friend-profile">
          <div class="friend-profile__heading">
          <img
            v-if="profile.ProfilePicture"
            class="friend-profile__picture"
            :src="profile.ProfilePicture"
            :alt="`${profile.Username}'s profile picture`"
          />
          <h3 class="friend-profile__name">{{ profile.Username }}</h3>
          </div>
          <dl class="friend-profile__details">
          <div>
            <dt>Age</dt>
            <dd>{{ profile.Age }}</dd>
          </div>
          <div>
            <dt>Skill</dt>
            <dd>{{ profile.Skill }}</dd>
          </div>
          <div>
            <dt>School</dt>
            <dd>{{ profile.School }}</dd>
          </div>
          <div>
            <dt>Score</dt>
            <dd>{{ profile.Score }}</dd>
          </div>
          </dl>
        </article>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.friend-profiles {
  margin-top: 2rem;
}

.friend-profiles__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}

.friend-profile {
  width: min(100%, 20rem);
  padding: 1.25rem;
  color: #253044;
  background: #fff;
  border: 1px solid #dce2eb;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.9rem rgb(25 40 65 / 8%);
}

.friend-profile-link {
  display: block;
  color: inherit;
  text-decoration: none;
  border-radius: 0.75rem;
}

.friend-profile-link:hover .friend-profile {
  border-color: #9aa9bf;
  box-shadow: 0 0.4rem 1rem rgb(25 40 65 / 14%);
}

.friend-profile-link:focus-visible {
  outline: 3px solid #526d99;
  outline-offset: 3px;
}

.friend-profile__heading {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8ecf2;
}

.friend-profile__picture {
  width: 4rem;
  height: 4rem;
  flex: 0 0 4rem;
  object-fit: cover;
  border: 2px solid #e8ecf2;
  border-radius: 50%;
}

.friend-profile__name {
  margin: 0;
  font-size: 1.25rem;
}

.friend-profile__details {
  display: grid;
  gap: 0.7rem;
  margin: 1rem 0 0;
}

.friend-profile__details > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.friend-profile__details dt {
  color: #68758a;
}

.friend-profile__details dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}
</style>
