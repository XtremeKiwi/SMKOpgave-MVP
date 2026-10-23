<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'

interface FriendProfileData {
  Username: string
  Age: string
  Skill: string
  School: string
  Score: number
  ProfilePicture: string
}

defineOptions({
  name: 'Friends'
})

const friendProfiles = inject<FriendProfileData[]>('friendProfile')

if (!friendProfiles) {
  throw new Error('Friends requires friendProfile to be provided by an ancestor.')
}

const route = useRoute()
const profile = computed(() => {
  const username = route.params.username
  return typeof username === 'string'
    ? friendProfiles.find((friend) => friend.Username === username)
    : undefined
})
</script>

<template>
  <Header />
  <section class="friend-page" aria-labelledby="friend-page-title">
    <template v-if="profile">
      <h1 id="friend-page-title">{{ profile.Username }}'s profile</h1>
      <article class="friend-profile">
        <img
          v-if="profile.ProfilePicture"
          class="friend-profile__picture"
          :src="profile.ProfilePicture"
          :alt="`${profile.Username}'s profile picture`"
        />
        <div class="friend-profile__information">
          <h2 class="friend-profile__name">{{ profile.Username }}</h2>
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
        </div>
      </article>
    </template>
    <p v-else role="status">Friend profile not found.</p>
  </section>
</template>

<style scoped>
.friend-profile {
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

.friend-profile__information {
  min-width: 0;
  flex: 1;
}

.friend-profile__picture {
  width: 200px;
  height: 200px;
  flex: 0 0 200px;
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
