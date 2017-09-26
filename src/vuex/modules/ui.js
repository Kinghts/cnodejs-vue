export default {
  namespaced: true,
  state: {
    isShowTransit: false
  },
  mutations: {
    SHOW_TRANSIT (state, show) {
      state.isShowTransit = show
    }
  },
  actions: {
    showTransit ({ commit }, show) {
      commit('SHOW_TRANSIT', show)
    }
  }
}
