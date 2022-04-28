import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home'
import Play from '@/components/play/Play'
import Game from '@/components/game/Game501'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
