import config from '../../config'
import VUE from 'vue'

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
    UPDATE_USERINFO (state, data) {
      for (var key in data) {
        if (data.hasOwnProperty(key) && state.hasOwnProperty(key)) {
          state[key] = data[key]
          // 将用户信息持久化
          localStorage[key] = data[key]
        }
      }
    }
  },
  actions: {
    login ({ commit }, accesstoken) {
      return new Promise((resolve, reject) => {
        VUE.http.post(config.accesstokenCheckUrl, {accesstoken: accesstoken})
          .then(res => {
            commit('UPDATE_USERINFO', res.body) // 更新id
            const url = config.apiUserBaseUrl + '/' + res.body.loginname
            return VUE.http.get(url)
          })
          .then(res => {
            let _data = res.body.data
            _data.accesstoken = accesstoken
            commit('UPDATE_USERINFO', _data) // 更新其他详细信息
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject('请求失败,accesstoken可能不正确')
          })
      })
    }
  }
}
