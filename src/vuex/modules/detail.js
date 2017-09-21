import TopicService from '../../service/topicService'
import CollectService from '../../service/collectService'
import ReplyService from '../../service/replyService'

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
          break
        }
      }
    }
  },
  actions: {
    getTopicContent ({ commit }, [id, accesstoken]) {
      let params = [id, accesstoken, true]
      TopicService.getTopicContent(params)
        .then(detail => {
          commit('UPDATE_DETAIL', detail)
        })
        .catch(err => {
          alert('获取主题详情出错')
          console.log(err)
        })
    },
    createTopic ({ commit }, [accesstoken, title, tab, content]) {
      TopicService.createTopic([accesstoken, title, tab, content])
        .then(() => {
          alert('新建主题成功')
        })
        .catch((err) => {
          alert('新建主题失败')
          console.log(err)
        })
    },
    updateTopic ({ commit }, [accesstoken, topicID, title, tab, content]) {
      return TopicService.updateTopic([accesstoken, topicID, title, tab, content])
    },
    replyTopic ({ commit }, [accesstoken, topicID, content]) {
      return ReplyService.replyTopic(accesstoken, topicID, content)
    },
    replyUser ({ commit }, [accesstoken, topicID, content, replyID]) {
      return ReplyService.replyUser(accesstoken, topicID, content, replyID)
    },
    thumbsUp ({ commit }, [accesstoken, replyID, loggedUserID]) { // 给评论点赞/取消点赞
      ReplyService.thumbsUp(accesstoken, replyID)
        .then(action => {
          commit('UPDATE_REPLY_UPS', [replyID, loggedUserID, action === 'up'])
        })
        .catch(err => {
          alert('点赞失败')
          console.log(err)
        })
    },
    collectTopic ({ commit }, [accesstoken, topicID]) {
      return new Promise((resolve, reject) => {
        CollectService.collectTopic([accesstoken, topicID])
          .then(() => {
            commit('UPDATE_COLLECT_STATUS', true)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    decollectTopic ({ commit }, [accesstoken, topicID]) {
      return new Promise((resolve, reject) => {
        CollectService.decollectTopic([accesstoken, topicID])
          .then(() => {
            commit('UPDATE_COLLECT_STATUS', false)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
