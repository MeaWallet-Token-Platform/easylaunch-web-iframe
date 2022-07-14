import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main-view.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
