const githubUrl = 'https://github.com'
const baseUrl = 'https://cnodejs.org'
const apiBaseUrl = baseUrl + '/api/v1'
const apiTopicsUrl = apiBaseUrl + '/topics'
const topicUrl = baseUrl + '/topic'
const apiUserBaseUrl = apiBaseUrl + '/user'
const accesstokenCheckUrl = apiBaseUrl + '/accesstoken'

import Detail from './pages/detail'
import EditTopic from './pages/editTopic'
import Collect from './pages/collect'
import Messages from './pages/messages'

export default {
  topics: {
    all: {
      name: '全部',
      hideTab: false,
      path: '/home/all'
    },
    good: {
      name: '精华',
      hideTab: false,
      path: '/home/good'
    },
    share: {
      name: '分享',
      hideTab: false,
      path: '/home/share',
      create: true
    },
    ask: {
      name: '问答',
      hideTab: true,
      path: '/home/ask',
      create: true
    },
    job: {
      name: '招聘',
      hideTab: true,
      path: '/home/job',
      create: true
    },
    dev: {
      name: '客户端测试',
      hideTab: true,
      path: '/home/dev',
      create: true
    }
  },
  githubUrl: githubUrl,
  apiBaseUrl: apiBaseUrl,
  apiTopics: apiTopicsUrl,
  topicUrl: topicUrl,
  apiUserBaseUrl: apiUserBaseUrl,
  accesstokenCheckUrl: accesstokenCheckUrl,
  editorToolBarOptions: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ]
}
