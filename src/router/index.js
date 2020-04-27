import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../components/Game'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Game',
    component: Game
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
