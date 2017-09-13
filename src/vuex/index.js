import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UIModule from './modules/ui'
import TopicsModule from './modules/topics'
import DetailModule from './modules/detail'
import UserInfoModule from './modules/userInfo'
import LoggedUserModule from './modules/loggedUser'
import EditorModule from './modules/editor'
import CollectModule from './modules/collect'
import MessagesModule from './modules/messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui: UIModule,
    topics: TopicsModule,
    detail: DetailModule,
    userInfo: UserInfoModule,
    loggedUser: LoggedUserModule,
    editor: EditorModule,
    collect: CollectModule,
    messages: MessagesModule
  },
  // 使用sessionStorage暂存状态
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
