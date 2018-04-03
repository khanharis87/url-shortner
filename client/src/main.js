import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

import VueState from './plugins/state'
import VueFetch from './plugins/fetch'

import router from './router'
import state from './state'

Vue.use(VueState, state)
Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/'
})

new Vue({
  el: '#app',
  data: state,
  router,
  render: h => h(App)
})
