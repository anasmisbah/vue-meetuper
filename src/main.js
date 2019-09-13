import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import toasted from 'vue-toasted'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'

import moment from 'moment'

import AppSocket from './plugins/socket'


Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)

Vue.use(vuelidate)
Vue.use(toasted)
Vue.use(AppSocket,{connection:'http://localhost:3001'})

Vue.filter('capitalize',function(value) {
  if (value && typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  return ''
})

Vue.filter('formatDate', function (value,formatType = 'LL') {
  if (!value) {
    return ''
  }

  return moment(value).format(formatType)

})

Vue.filter('fromNow', function (value) {
  if (!value) {
    return ''
  }

  return moment(value).fromNow()

})


new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')
