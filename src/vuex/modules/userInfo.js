import UserService from '../../service/userService'

/**
 * 仅保存userInfo视图的状态，已登陆用户的信息存储在loggedUser中
 */
export default {
  namespaced: true,
  state: {
    id: '', // 已登陆用户才有
    loginname: '',
    avatar_url: '',
    githubUsername: '',
    create_at: '',
    score: '',
    recent_topics: '',
    recent_replies: '',
    accesstoken: '' // 已登陆用户才有
  },
  mutations: {
    UPDATE_USERINFO (state, data) {
      Object.assign(state, data)
    }
  },
  actions: {
    getUserInfo ({ commit }, username) {
      UserService.getUserInfo(username)
        .then(data => {
          data.id = ''
          data.accesstoken = ''
          commit('UPDATE_USERINFO', data)
        })
    },
    replaceUserInfo ({ commit }, data) {
      commit('UPDATE_USERINFO', data)
    }
  }
}
