import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSocketIOExt from 'vue-socket.io-extended'
import SocketIO from 'socket.io-client'
import axios from 'axios'
import VueAxios from 'vue-axios'

const socket = SocketIO('http://localhost:3000')
// Socket config
Vue.use(VueSocketIOExt, socket)
Vue.use(VueMaterial)
// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value))
}

Storage.prototype.getObject = function (key) {
  var value = this.getItem(key)
  return value && JSON.parse(value)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
