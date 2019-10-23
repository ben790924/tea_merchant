import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import tryVuex from '../store/modules/tryVuex'
import cart from '../store/modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    getters,
    tryVuex,
    cart
  }

})
