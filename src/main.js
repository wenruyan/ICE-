// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/en-US'
Vue.use(iView, { locale })
Vue.config.lang = 'en-US'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$ajax = axios

// 请求拦截器
axios.interceptors.request.use((config) => {
  showFullScreenLoading();
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
    tryHideFullScreenLoading();
  return response
}, (error) => {
  endLoading()
  return Promise.reject(error)
})
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
import { Loading } from 'element-ui'
let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading……',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}

function endLoading() {
  loading.close()
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
