import Vue from 'vue'
import Vuex from 'vuex'
import tryVuex from '../store/modules/tryVuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tryVuex
  }

})
