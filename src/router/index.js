import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/main'
import Login from '../pages/login'
import UserInfo from '../pages/userInfo'
import config from '../config.js'

Vue.use(Router)

export default new Router({
  routes: initRouters()
})

function initRouters () {
  let routers = []

  // login
  routers.push({
    path: '/login',
    name: '登录',
    component: Login
  })
  // userinfo
  routers.push({
    path: '/userinfo',
    name: '用户信息',
    component: UserInfo,
    beforeEnter: (to, from, next) => {
      next(vm => { // 访问userinfo组件的实例
        console.log(vm)
      })
    }
  })

  // pages
  const _pages = config.pages
  for (let page in _pages) {
    if (_pages.hasOwnProperty(page)) {
      let element = _pages[page]
      let router = {
        path: element.path,
        name: element.name,
        component: Main
      }
      if (element.redirect) {
        router.redirect = element.url
      }
      if (element.component) {
        router.component = element.component
      }
      routers.push(router)
    }
  }

  // topics
  const _topics = config.topics
  for (let topic in _topics) {
    if (_topics.hasOwnProperty(topic)) {
      let element = _topics[topic]
      routers.push({
        path: element.path,
        name: element.name,
        component: Main
      })
    }
  }

  return routers
}
