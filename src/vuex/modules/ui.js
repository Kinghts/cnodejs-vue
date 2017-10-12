export default {
  namespaced: true,
  state: {
    showTransit: false,
    showBottomBar: true
  },
  mutations: {
    SHOW_TRANSIT (state, show) {
      state.showTransit = show
    },
    SHOW_BOTTOMBAR (state, show) {
      state.showBottomBar = show
    }
  },
  actions: {
    showTransit ({ commit }, show) {
      commit('SHOW_TRANSIT', show)
    },
    showBottomBar ({ commit }, show) {
      commit('SHOW_BOTTOMBAR', show)
    }
  }
}
