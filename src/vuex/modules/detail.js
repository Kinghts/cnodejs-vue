import VUE from 'vue'
import config from '../../config'

export default {
  namespaced: true,
  state: {
    id: '',
    author_id: '',
    tab: 'share',  // 由于获取主题数据是异步的，先设置一个防止vue渲染时报错
    content: '',
    title: '',
    last_reply_at: '',
    good: false,
    top: false,
    reply_count: 0,
    visit_count: 0,
    create_at: '',
    replies: [],
    author: {
      loginname: '',
      avatar_url: ''
    },
    is_collect: false
  },
  mutations: {
    UPDATE_DETAIL (state, detail) {
      for (var key in detail) {
        if (detail.hasOwnProperty(key) && state.hasOwnProperty(key)) {
          state[key] = detail[key]
        }
      }
    },
    UPDATE_COLLECT_STATUS (state, collect) {
      state.is_collect = collect
    },
    UPDATE_REPLY_UPS (state, [replyId, userId, up]) {
      for (let reply of state.replies) {
        if (reply.id === replyId) {
          if (up) {
            reply.ups.push(userId)
          } else {
            reply.ups.pop() // 注意：这里并没有从数组中移除登录用户的id
          }
        }
      }
    }
  },
  actions: {
    getTopicContent ({ commit }, [that, id]) {
      console.log(id)
      let url = config.apiBaseUrl + '/topic/' + id + '?mdrender=true'
      if (that.$store.state.user.accesstoken) { // 用户已登录
        url += '&accesstoken=' + that.$store.state.user.accesstoken
      }
      VUE.http.get(url)
        .then(res => {
          commit('UPDATE_DETAIL', res.body.data)
        }, () => {
          alert('请求出错')
        })
    },
    createTopic ({ commit }, [that, tab, title, content]) {
      let url = config.apiTopics
      that.$http.post(
        url,
        {
          accesstoken: that.$store.state.user.accesstoken,
          title: title,
          tab: 'dev', // tab,
          content: content
        }
      ).then(res => {
        if (res.body.success) {
          console.log('提交成功')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateTopic ({ commit }, [that, id, tab, title, content]) {
      let url = config.apiBaseUrl + '/topics/update'
      return new Promise(function (resolve, reject) {
        VUE.http.post(url, {
          accesstoken: that.$store.state.user.accesstoken,
          topic_id: id,
          title: title,
          tab: tab,
          content: content
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
      })
    },
    submitTopicReply ({ commit }, [that, id, content]) {
      let url = config.apiBaseUrl + '/topic/' + id + '/replies'
      VUE.http.post(url, {
        accesstoken: that.$store.state.user.accesstoken,
        content: content
      }).then((res) => {
        if (res.body.success) {
          that.getTopicContent([that, id]) // 回复成功，更新内容
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    submitOtherReply ({ commit }, [that, id, content, replyId]) {
      let url = config.apiBaseUrl + '/topic/' + id + '/replies'
      VUE.http.post(url, {
        accesstoken: that.$store.state.user.accesstoken,
        content: content,
        reply_id: replyId
      }).then((res) => {
        if (res.body.success) {
          that.getTopicContent([that, id])
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    submitReplyUps ({ commit }, [that, replyId]) { // 给评论点赞/取消点赞
      let url = config.apiBaseUrl + '/reply/' + replyId + '/ups'
      VUE.http.post(url, {
        accesstoken: that.$store.state.user.accesstoken
      }).then((res) => {
        if (res.body.success) {
          let up = false
          if (res.body.action === 'up') {
            up = true
          }
          commit('UPDATE_REPLY_UPS', [replyId, that.$store.state.user.id, up])
        } else {
          console.log(res.body.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    collectTopic ({ commit }, [that, id, collect]) {
      let url = config.apiBaseUrl + '/topic_collect/'
      if (collect) {
        url += 'collect'
      } else {
        url += 'de_collect'
      }
      return new Promise(function (resolve, reject) {
        VUE.http.post(url, {
          accesstoken: that.$store.state.user.accesstoken,
          topic_id: id
        })
        .then(res => {
          if (res.body.success) {
            commit('UPDATE_COLLECT_STATUS', collect)
            resolve(true)
          } else {
            reject('收藏/取消收藏失败')
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  }
}
