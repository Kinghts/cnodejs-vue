import { Message } from '../../models/message'
import MsgService from '../../service/msgService'

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
    getMessages ({ commit }, accesstoken) {
      MsgService.getMessages(accesstoken)
        .then(data => {
          let newMsgs = []
          let oldMsgs = []
          data.hasnot_read_messages.forEach(function (msg) {
            newMsgs.push(Message.createMessage(msg))
          })
          data.has_read_messages.forEach(function (msg) {
            oldMsgs.push(Message.createMessage(msg))
          })
          commit('CHANGE_MESSAGES', {
            has_read_messages: oldMsgs,
            hasnot_read_messages: newMsgs
          })
        })
        .catch(err => {
          alert('获取消息出错')
          console.log(err)
        })
    },
    getMessagesCount ({ commit }, accesstoken) {
      MsgService.getMessagesCount(accesstoken)
        .then(count => {
          commit('UPDATE_COUNT', count)
        })
        .catch(err => {
          alert('获取未读消息数出错')
          console.log(err)
        })
    },
    markAllMessages ({ commit }, accesstoken) { // 将消息全部标记为已读
      MsgService.markAllMessages(accesstoken)
        .catch(err => {
          alert('标记全部消息已读出错')
          console.log(err)
        })
    }
  }
}
