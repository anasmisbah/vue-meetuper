import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import toasted from 'vue-toasted'

import filters from './filters'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'


import AppSocket from './plugins/socket'


Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)

Vue.use(vuelidate)
Vue.use(toasted)
Vue.use(AppSocket,{connection:'http://localhost:3001'})


filters()

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')
