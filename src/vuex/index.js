import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UIModule from './modules/ui'
import TopicsModule from './modules/topics'
import DetailModule from './modules/detail'
import UserModule from './modules/user'
import EditorModule from './modules/editor'
import CollectModule from './modules/collect'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui: UIModule,
    topics: TopicsModule,
    detail: DetailModule,
    user: UserModule,
    editor: EditorModule,
    collect: CollectModule
  },
  // 使用sessionStorage暂存状态
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
