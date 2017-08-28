import VUE from 'vue'
import config from '../../config.js'
import { Topic } from '../../models/topic'

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
    getCollections ({ commit }, [loginname]) {
      let url = config.apiBaseUrl + '/topic_collect/' + loginname
      VUE.http.get(url)
        .then(res => {
          if (res.body.success) {
            commit('CHANGE_COLLECTIONS', handleCollectData(res.body.data))
          }
        })
        .catch(err => {
          alert(err)
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
