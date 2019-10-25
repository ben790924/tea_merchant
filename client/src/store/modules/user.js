const state = {
  userInfo: {}
}
const mutations = {
  saveUser (state, payload) {
    state.userInfo = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
