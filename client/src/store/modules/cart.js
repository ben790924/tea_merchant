const state = {
  carts: []
}

const mutations = {
  setCarts (state, payload) {
    state.carts.push(payload)
  },
  deleteCarts (state, payload) {
    state.carts.splice(payload, 1)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
