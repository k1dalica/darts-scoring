import Vue from 'vue'
import Vuesax from 'vuesax'
import store from './store'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import PortalVue from 'portal-vue'

import 'vuesax/dist/vuesax.css'
import '@/assets/scss/main.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(PortalVue)
Vue.use(Vuesax, {
  colors: {
    primary: '#008bfe',
    success: 'rgb(23, 201, 100)',
    danger: 'rgb(242, 19, 93)',
    warning: 'rgb(255, 130, 0)',
    dark: 'rgb(36, 33, 69)'
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
