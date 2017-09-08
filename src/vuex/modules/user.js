import { User } from '../../models/user'
import UserService from '../../service/userService'

/**
 * 仅保存userInfo视图的状态，已登陆用户的信息存储在localStorage中
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
    UPDATE_USERINFO (state, [data, isLogin]) {
      if (!isLogin) {
        state.id = ''
        state.accesstoken = ''
      }
      for (var key in data) {
        if (data.hasOwnProperty(key) && state.hasOwnProperty(key)) {
          state[key] = data[key]
        }
      }
      if (isLogin) {
        UserService.updateLoggedUserInfo(data)
      }
    }
  },
  actions: {
    login ({ commit }, [accesstoken]) {
      return new Promise((resolve, reject) => {
        UserService.checkAccessToken(accesstoken)
          .then(data => {
            commit('UPDATE_USERINFO', [data, true]) // 更新id、loginname、avatar_url
            return UserService.getUserInfo(data.loginname)
          })
          .then(data => {
            data.accesstoken = accesstoken
            commit('UPDATE_USERINFO', [data, true]) // 更新其他详细信息
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout ({ commit }, [username, that]) {
      UserService.clearLoggedUserInfo()
      if (that.$store.state.user.loginname === username) {
        commit('UPDATE_USERINFO', [new User(), false])
      }
    },
    getUserInfo ({ commit }, username) {
      UserService.getUserInfo(username)
        .then(data => {
          commit('UPDATE_USERINFO', [data, false])
        })
    },
    getLoggedUserInfo ({ commit }) {
      let userInfo = UserService.getLoggedUserInfo()
      commit('UPDATE_USERINFO', [userInfo, false])
    }
  }
}
