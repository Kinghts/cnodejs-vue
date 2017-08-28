// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/index.js' // store只能用小写!!!!
import router from './router'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.use(VueResource)

Vue.http.options.emulateJSON = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
