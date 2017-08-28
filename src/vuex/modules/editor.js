/**
 * 用于保存编辑器的内容
 */
export default {
  state: {
    content: ''
  },
  mutations: {
    UPDATE_CONTENT (state, content) {
      state.content = content
    }
  },
  actions: {
    updateContent ({ commit }, content) {
      commit('UPDATE_CONTENT', content)
    }
  }
}
