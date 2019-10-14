const state = {
  msg: 'msg from state'
}

const mutations = {
  showMsg (state) {
    return state.msg
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
