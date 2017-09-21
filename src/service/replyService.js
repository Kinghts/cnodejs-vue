import VUE from 'vue'
import config from '../config'

function replyAction (accesstoken, topicID, content, replyID) {
  const url = config.apiBaseUrl + '/topic/' + topicID + '/replies'
  let params = {
    accesstoken: accesstoken,
    content: content
  }
  if (replyID) {
    params.reply_id = replyID
  }
  return new Promise((resolve, reject) => {
    VUE.http.post(url, params)
      .then(res => {
        if (res.body.success) {
          resolve(res.body.reply_id)
        } else {
          reject(res)
        }
      })
      .catch(err => reject(err))
  })
}

export default {
  replyTopic (accesstoken, topicID, content) {
    return replyAction(accesstoken, topicID, content)
  },
  replyUser (accesstoken, topicID, content, replyID) {
    return replyAction(accesstoken, topicID, content, replyID)
  },
  thumbsUp (accesstoken, replyId) {
    const url = config.apiBaseUrl + '/reply/' + replyId + '/ups'
    return new Promise((resolve, reject) => {
      VUE.http.post(url, {
        accesstoken: accesstoken
      }).then(res => {
        if (res.body.success) {
          resolve(res.body.action)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
