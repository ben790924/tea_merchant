import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
// serviceWorker
import './registerServiceWorker'
// BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// mdbv
import 'mdbvue/build/css/mdb.css'
Vue.prototype.$axios = axios
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
