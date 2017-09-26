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
  pages: {
    home: {
      name: '首页',
      path: '/home',
      redirect: true,
      url: '/home/all'
    },
    detail: {
      name: '详情',
      path: '/detail',
      redirect: false,
      url: '',
      component: Detail
    },
    create: {
      name: '发布主题',
      path: '/create',
      redirect: false,
      url: '',
      component: EditTopic
    },
    editTopic: {
      name: '编辑主题',
      path: '/editTopic',
      redirect: false,
      url: '',
      component: EditTopic
    },
    collections: {
      name: '收藏',
      path: '/collections',
      redirect: false,
      url: '',
      component: Collect
    },
    message: {
      name: '消息',
      path: '/messages',
      redirect: false,
      component: Messages
    }
  },
  topics: {
    all: {
      name: '全部',
      hideTab: false,
      path: '/home/all',
      url: apiTopicsUrl + ''
    },
    good: {
      name: '精华',
      hideTab: false,
      path: '/home/good',
      url: apiTopicsUrl + '?tab=good'
    },
    share: {
      name: '分享',
      hideTab: false,
      path: '/home/share',
      url: apiTopicsUrl + '?tab=share',
      create: true
    },
    ask: {
      name: '问答',
      hideTab: true,
      path: '/home/ask',
      url: apiTopicsUrl + '?tab=ask',
      create: true
    },
    job: {
      name: '招聘',
      hideTab: true,
      path: '/home/job',
      url: apiTopicsUrl + '?tab=job',
      create: true
    },
    dev: {
      name: '客户端测试',
      hideTab: true,
      path: '/home/dev',
      url: apiTopicsUrl + '?tab=dev',
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
