import VUE from 'vue'
import config from '../config'

export default {
  getMessages (accesstoken) {
    const url = config.apiBaseUrl + '/messages'
    return new Promise((resolve, reject) => {
      VUE.http.get(url, {
        params: {
          accesstoken: accesstoken,
          mdrender: false
        }
      }).then(res => {
        resolve(res.body.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getMessagesCount (accesstoken) {
    const url = config.apiBaseUrl + '/message/count'
    return new Promise((resolve, reject) => {
      VUE.http.get(url, {
        params: {
          accesstoken: accesstoken
        }
      }).then(res => {
        resolve(res.body.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  markAllMessages (accesstoken) {
    const url = config.apiBaseUrl + '/message/mark_all'
    return new Promise((resolve, reject) => {
      VUE.http.post(url, {
        accesstoken: accesstoken
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
