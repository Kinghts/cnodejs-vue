import VUE from 'vue'
import config from '../config'

function collectAction ([accesstoken, topicID, collect]) {
  let url = config.apiBaseUrl + '/topic_collect/'
  if (collect) {
    url += 'collect'
  } else {
    url += 'de_collect'
  }
  return new Promise((resolve, reject) => {
    VUE.http.post(url, {
      accesstoken: accesstoken,
      topic_id: topicID
    })
    .then(res => {
      if (res.body.success) {
        resolve()
      } else {
        reject()
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

export default {
  collectTopic ([accesstoken, topicID]) {
    return collectAction([accesstoken, topicID, true])
  },
  decollectTopic ([accesstoken, topicID]) {
    return collectAction([accesstoken, topicID, false])
  },
  getUserCollections (loginname) {
    const url = config.apiBaseUrl + '/topic_collect/' + loginname
    return new Promise((resolve, reject) => {
      VUE.http.get(url)
        .then(res => {
          if (res.body.success) {
            resolve(res.body.data)
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
