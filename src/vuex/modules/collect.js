import { Topic } from '../../models/topic'
import CollectService from '../../service/collectService'

export default {
  namespaced: true,
  state: {
    collections: []
  },
  mutations: {
    CHANGE_COLLECTIONS (state, data) {
      state.collections = data
    }
  },
  actions: {
    getUserCollections ({ commit }, loginname) {
      CollectService.getUserCollections(loginname)
        .then((collections) => {
          commit('CHANGE_COLLECTIONS', handleCollectData(collections))
        })
        .catch(err => {
          alert('获取用户收藏失败')
          console.log(err)
        })
    }
  }
}

function handleCollectData (data) {
  let collections = []
  data.forEach(function (e) {
    collections.push(Topic.createTopic(e))
  }, this)
  return collections
}
