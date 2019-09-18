import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
