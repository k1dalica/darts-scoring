import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home'
import Play from '@/components/play/Play'
import Game from '@/components/game/Game501'
import Page404 from '@/components/pages/Page404'

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
    name: '404',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
