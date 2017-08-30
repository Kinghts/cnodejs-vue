import config from '../../config'
import VUE from 'vue'
import { User } from '../../models/user'

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
        User.update('local', state.loginname, data)
      }
    }
  },
  actions: {
    login ({ commit }, accesstoken) {
      return new Promise((resolve, reject) => {
        VUE.http.post(config.accesstokenCheckUrl, {accesstoken: accesstoken})
          .then(res => {
            commit('UPDATE_USERINFO', [res.body, true]) // 更新id
            const url = config.apiUserBaseUrl + '/' + res.body.loginname
            return VUE.http.get(url)
          })
          .then(res => {
            let _data = res.body.data
            _data.accesstoken = accesstoken
            commit('UPDATE_USERINFO', [_data, true]) // 更新其他详细信息
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject('请求失败,accesstoken可能不正确')
          })
      })
    },
    getUserInfo ({ commit }, username) {
      VUE.http.get(config.apiUserBaseUrl + '/' + username)
        .then(res => {
          commit('UPDATE_USERINFO', [res.body.data, false])
        })
    }
  }
}
