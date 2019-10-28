const state = {
  userInfo: {},
  isUserId: false
}
const mutations = {
  saveUser (state, payload) {
    state.userInfo = payload
  },
  switchIsUserId (state, payload) {
    state.isUserId = payload
  }

}

export default {
  namespaced: true,
  state,
  mutations
}
