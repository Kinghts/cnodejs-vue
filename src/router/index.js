import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/main'
import Login from '../pages/login'
import UserInfo from '../pages/userInfo'
import Detail from '../pages/detail'
import EditTopic from '../pages/editTopic'
import Collect from '../pages/collect'
import Messages from '../pages/messages'
import config from '../config'

Vue.use(Router)

export default new Router({
  routes: initRouters()
})

function initRouters () {
  let routers = [
    { path: '/login', name: '登录', component: Login },
    { path: '/userinfo', name: '用户信息', component: UserInfo },
    { path: '/home', name: '首页', component: Main, redirect: '/home/all' },
    { path: '/detail', name: '详情', component: Detail },
    { path: '/create', name: '发布主题', component: EditTopic },
    { path: '/editTopic', name: '编辑主题', component: EditTopic },
    { path: '/collections', name: '收藏', component: Collect },
    { path: '/messages', name: '消息', component: Messages }
  ]

  // topics
  Object.entries(config.topics).map((v) => {
    let topic = v[1]
    routers.push({ path: topic.path, name: topic.name, component: Main })
  })

  return routers
}
