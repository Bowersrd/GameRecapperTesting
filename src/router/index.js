import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recaps/game/001',
    name: 'Game Recap 001',
    component: () => import('@/views/recaps/Game-Recap-001/index.vue')
  },
  {
    path: '/graphics/player/001',
    name: 'Player Graphic 001',
    component: () => import('@/views/graphics/Player-Graphic-001/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
