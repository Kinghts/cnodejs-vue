<template>
  <div>

    <top-tab class="header" :topics="config.topics"></top-tab>
    <div class="inner no-padding" id="topic_list">
      <cell v-for="topic in topics" :key="topic.id" :topic="topic"></cell>
    </div>
    
  </div>
</template>

<script>
  import cell from '../components/topicCell.vue'
  import topTab from '../components/topTab.vue'
  import config from '../config.js'
  import { mapState, mapActions } from 'vuex'
  
  export default {
    name: 'main',
    data () {
      return {
        'config': config
      }
    },
    mounted () {
      // this.getUserInfo(['2d4803b7-cefd-453f-a5f9-30a60ce1196b'])
    },
    computed: {
      ...mapState({
        topics: state => state.topics.topics,
        currentPath: state => state.route.path,
        mainPath: state => state.route.path.split('/')[1]
      })
    },
    methods: {
      ...mapActions({
        getTopics: 'topics/getTopics'
      }),
      ...mapActions({
        getUserInfo: 'user/getUserInfo'
      })
    },
    watch: {
      currentPath: function (currentPath) {
        console.log('current path: ' + currentPath)
        this.getTopics([this, currentPath])
      }
    },
    components: {
      'cell': cell,
      'top-tab': topTab
    }
  }
</script>

<style scoped>
  .top_bar {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 50px;
  }
</style>
