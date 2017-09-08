import VUE from 'vue'
import config from '../config'
import { User } from '../models/user'
import Store from 'store2'

let localStore = Store.local.namespace('user')

export default {
  localStore: localStore,
  checkAccessToken: function (accessToken) {
    return new Promise((resolve, reject) => {
      VUE.http.post(config.accesstokenCheckUrl, {accesstoken: accessToken})
        .then(res => {
          if (res.body.success) {
            resolve(res.body)
          } else {
            reject('accesstoken可能不正确')
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getUserInfo: function (loginname) {
    return new Promise((resolve, reject) => {
      VUE.http.get(config.apiUserBaseUrl + '/' + loginname)
        .then(res => {
          if (res.body.success) {
            resolve(res.body.data)
          } else {
            reject('获取用户信息失败')
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getLoggedUserInfo: function () {
    let loginname = this.localStore.keys()[0]
    return User.createUser(this.localStore(loginname))
  },
  saveLoggedUserInfo: function (userInfo) {
    this.localStore.set(userInfo.loginname, userInfo)
  },
  getLoggedUserName: function () {
    return this.localStore.keys()[0]
  },
  updateLoggedUserInfo: function (data) {
    let oldV = this.getLoggedUserInfo()
    let newV
    if (!oldV) {
      newV = User.createUser(data)
    } else {
      newV = Object.assign(oldV, data)
    }
    this.localStore(newV.loginname, newV)
  },
  clearLoggedUserInfo: function () {
    this.localStore.clear()
  }
}
