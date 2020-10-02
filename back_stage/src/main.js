import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element UI框架
import './plugins/element'

// 导入封装axios模块，用于发请求
import request from './utils/request'
// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request


import "./assets/css/normalize.css"
import "./assets/css/base.css"
import "./assets/css/reset.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
