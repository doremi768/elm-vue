import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
// let axios = require('axios')
const request = require('request');


Vue.config.productionTip = false
// Vue.prototype.$axios = axios
Vue.prototype.$ajax = request;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
