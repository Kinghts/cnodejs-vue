import { Topic } from '../../models/topic'
import TopicService from '../../service/topicService'

export default {
  namespaced: true,
  state: {
    topics: []
  },
  mutations: {
    CHANGE_TOPICS (state, data) {
      state.topics = data
    }
  },
  actions: {
    getTopics ({ commit }, path) {
      TopicService.getTopics(1, path.split('/')[2])
        .then(topics => {
          commit('CHANGE_TOPICS', handleData(topics))
        })
        .catch(err => {
          alert('获取主题首页出错')
          console.log(err)
        })
    }
  }
}

/** 处理获取到的topics数据 */
function handleData (data) {
  let topics = []
  data.forEach(e => {
    let topic = Topic.createTopic(e)
    if (topic.top) { // 置顶
      topic.tab = '置顶'
      topics.unshift(topic)
    } else {
      topics.push(topic)
    }
  }, this)
  return topics
}
