import { User } from '../../models/user'
import UserService from '../../service/userService'

/**
 * 仅保存userInfo视图的状态，已登陆用户的信息存储在localStorage中
 */
export default {
  namespaced: true,
  state: {
    id: '',
    loginname: '',
    avatar_url: '',
    githubUsername: '',
    create_at: '',
    score: '',
    recent_topics: '',
    recent_replies: '',
    accesstoken: ''
  },
  mutations: {
    UPDATE_USERINFO (state, [data]) {
      for (var key in data) {
        if (data.hasOwnProperty(key) && state.hasOwnProperty(key)) {
          state[key] = data[key]
        }
      }
      UserService.updateLoggedUserInfo(data)
    }
  },
  actions: {
    login ({ commit }, [accesstoken, that]) {
      return new Promise((resolve, reject) => {
        UserService.checkAccessToken(accesstoken)
          .then(data => {
            commit('UPDATE_USERINFO', [data]) // 更新id、loginname、avatar_url
            return UserService.getUserInfo(data.loginname)
          })
          .then(data => {
            data.accesstoken = accesstoken
            commit('UPDATE_USERINFO', [data]) // 更新其他详细信息
            UserService.clearLoggedUserInfo()
            UserService.saveLoggedUserInfo(that.$store.state.loggedUser)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout ({ commit }, [username, that]) {
      UserService.clearLoggedUserInfo()
      commit('UPDATE_USERINFO', [new User()])
    },
    getUserInfo ({ commit }, username) {
      UserService.getUserInfo(username)
        .then(data => {
          commit('UPDATE_USERINFO', [data])
        })
    },
    updateUserInfo ({ commit }, userinfo) {
      commit('UPDATE_USERINFO', userinfo)
    }
  }
}
