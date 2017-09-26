export default {
  namespaced: true,
  state: {
    isShowTransit: false,
    isShowOverlay: false
  },
  mutations: {
    SHOW_TRANSIT (state, show) {
      state.isShowTransit = show
    },
    SHOW_OVERLAY (state, show) {
      state.isShowOverlay = show
    }
  },
  actions: {
    showTransit ({ commit }, show) {
      commit('SHOW_TRANSIT', show)
    },
    showOverlay ({ commit }, show) {
      commit('SHOW_OVERLAY', show)
    }
  }
}
