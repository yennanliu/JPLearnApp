import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import PracticeView from '../components/Practice.vue'
import LikedSentencesView from '../components/LikedSentences.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/practice',
    name: 'PracticeView',
    component: PracticeView
  },
  {
    path: '/liked',
    name: 'LikedSentencesView',
    component: LikedSentencesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 