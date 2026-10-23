import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import AchievementsView from '../views/AchievementsView.vue'
import ArtCardsView from '../views/ArtCardsView.vue'
import ArtworkChallengeView from '../views/ArtworkChallengeView.vue'
import CollectionView from '../views/CollectionView.vue'
import Friends from '../views/Friends.vue'
import HomeView from '../views/HomeView.vue'
import MyProfile from '../views/MyProfile.vue'
import ScoreBoard from '../views/ScoreBoard.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/art-cards',
    name: 'art-cards',
    component: ArtCardsView
  },
  {
    path: '/artwork/:id',
    name: 'artwork-challenge',
    component: ArtworkChallengeView
  },
  {
    path: '/collection',
    name: 'collection',
    component: CollectionView
  },
  {
    path: '/achievements',
    name: 'achievements',
    component: AchievementsView
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: MyProfile
  },
  {
    path: '/scoreboard',
    name: 'scoreboard',
    component: ScoreBoard
  },
  {
    path: '/friend/:username',
    name: 'friend-profile',
    component: Friends
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
