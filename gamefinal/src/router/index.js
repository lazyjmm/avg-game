import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import GameView from '../views/GameView.vue'

const routes = [
  { path: '/', component: MainMenu },
  { path: '/game', component: GameView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router