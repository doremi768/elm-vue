import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'

import { Indicator } from 'mint-ui';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Mint);


// axios.defaults.baseURL = 'https://element-interface.herokuapp.com';
axios.defaults.baseURL = 'https://eleme4-beyond-50440.herokuapp.com'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  //加载动画
  Indicator.open();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Indicator.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
