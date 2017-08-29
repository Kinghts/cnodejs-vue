/**
 * 用于保存当前正在编辑/发布的主题的信息
 */
export default {
  namespaced: true,
  state: {
    id: '',
    tab: '',
    title: '',
    content: '',
    isNewTopic: true
  },
  mutations: {
    UPDATE_TOPIC (state, data) {
      for (let key in data) {
        if (state.hasOwnProperty(key) && data.hasOwnProperty(key)) {
          state[key] = data[key]
        }
      }
    }
  },
  actions: {
    updateTopic ({ commit }, data) {
      commit('UPDATE_TOPIC', data)
    },
    toNewTopicMode ({ commit }) {
      commit('UPDATE_TOPIC', {
        id: '',
        tab: '',
        title: '',
        content: '',
        isNewTopic: true
      })
    },
    toEditMode ({ commit }, data) {
      let _data = { isNewTopic: false }
      Object.assign(_data, data)
      commit('UPDATE_TOPIC', _data)
    }
  }
}
