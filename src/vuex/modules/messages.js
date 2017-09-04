import config from '../../config'
import { Message } from '../../models/message'

export default {
  namespaced: true,
  state: {
    has_read_messages: [],
    hasnot_read_count: 0,
    hasnot_read_messages: []
  },
  mutations: {
    CHANGE_MESSAGES (state, data) {
      Object.assign(state, data)
    },
    UPDATE_COUNT (state, count) {
      state.hasnot_read_count = count
    }
  },
  actions: {
    getMessages ({ commit }, [that, accesstoken]) {
      const url = config.apiBaseUrl + '/messages'
      that.$http.get(url, {
        params: {
          accesstoken: accesstoken,
          mdrender: false
        }
      }).then(res => {
        let _data = res.body.data
        let newMsgs = []
        let oldMsgs = []
        _data.hasnot_read_messages.forEach(function (msg) {
          newMsgs.push(Message.createMessage(msg))
        })
        _data.has_read_messages.forEach(function (msg) {
          oldMsgs.push(Message.createMessage(msg))
        })
        commit('CHANGE_MESSAGES', {
          has_read_messages: oldMsgs,
          hasnot_read_messages: newMsgs
        })
      }).catch((err) => {
        alert('获取消息出错')
        console.log(err)
      })
    },
    getMessagesCount ({ commit }, [that, accesstoken]) {
      const url = config.apiBaseUrl + '/message/count'
      that.$http.get(url, {
        params: {
          accesstoken: accesstoken
        }
      }).then(res => {
        commit('UPDATE_COUNT', res.body.data)
      }).catch(err => {
        alert('获取未读消息数出错')
        console.log(err)
      })
    },
    markAllMessages ({ commit }, [that, accesstoken]) { // 将消息全部标记为已读
      const url = config.apiBaseUrl + '/message/mark_all'
      that.$http.post(url, {
        accesstoken: accesstoken
      }).catch(err => {
        alert('标记全部消息已读出错')
        console.log(err)
      })
    }
  }
}
