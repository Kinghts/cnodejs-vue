export default {
  namespaced: true,
  state: {
    loginname: '',
    avatarURL: ''
  },
  mutations: {
    UPDATE_USERINFO (state, [loginname, avatarURL]) {
      state.loginname = loginname
      state.avatarURL = avatarURL
    }
  },
  actions: {
    updateUserInfo ({ commit }, [loginname, avatarURL]) {
      commit('UPDATE_USERINFO', [loginname, avatarURL])
    },
    clearUserInfo ({ commit }) {
      commit('UPDATE_USERINFO', ['', ''])
    }
  }
}
