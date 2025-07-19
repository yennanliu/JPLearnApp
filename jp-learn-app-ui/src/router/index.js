import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import PracticeView from '../components/Practice.vue'
import LikedSentencesView from '../components/LikedSentences.vue'
import ArticlesView from '../components/Articles.vue'

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
  },
  {
    path: '/articles',
    name: 'ArticlesView',
    component: ArticlesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 