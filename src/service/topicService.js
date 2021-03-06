import VUE from 'vue'
import config from '../config'
import { Reply } from '../models/reply'

export default {
  getTopics (page, tab) {
    const url = config.apiBaseUrl + '/topics'
    return new Promise((resolve, reject) => {
      VUE.http.get(url, {
        params: {
          page: page,
          tab: tab
        }
      }).then(res => {
        resolve(res.body.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getTopicContent ([id, accesstoken, render]) {
    const url = config.apiBaseUrl + '/topic/' + id
    let params = {}
    if (accesstoken) {
      params.accesstoken = accesstoken
    }
    params.mdrender = render
    return new Promise((resolve, reject) => {
      VUE.http.get(url, {
        params: params
      })
      .then(res => {
        let _data = res.body.data
        for (let i = 0; i < _data.replies.length; i++) {
          _data.replies[i] = Reply.createReply(_data.replies[i])
          console.log(i)
        }
        resolve(_data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  createTopic ([accesstoken, title, tab, content]) {
    const url = config.apiTopics
    return new Promise((resolve, reject) => {
      VUE.http.post(url, {
        accesstoken: accesstoken,
        title: title,
        tab: tab,
        content: content
      })
      .then(res => {
        if (res.body.success) {
          resolve()
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  updateTopic ([accesstoken, topicID, title, tab, content]) {
    const url = config.apiTopics + '/update'
    return new Promise((resolve, reject) => {
      VUE.http.post(url, {
        accesstoken: accesstoken,
        topic_id: topicID,
        title: title,
        tab: tab,
        content: content
      })
      .then(res => {
        if (res.body.success) {
          resolve()
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
