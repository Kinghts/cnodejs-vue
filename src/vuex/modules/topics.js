import config from '../../config'
import { Topic } from '../../models/topic'

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
    getTopics ({ commit }, [that, path]) {
      const url = config.topics[path.split('/')[2]].url
      that.$http.get(url)
        .then(res => {
          let _data = res.body.data
          commit('CHANGE_TOPICS', handleData(_data))
        }, () => {
          alert('请求出错')
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
