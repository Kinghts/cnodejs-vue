<template>
  <div class="main">
    <topBar class="top-bar" styles="janshu-top">
      <div slot="center" class="search">
        <textField icon="search"></textField>
      </div>
    </topBar>
    <div class="content">
      <top-tab class="header" :topics="config.topics"></top-tab>
      <div class="inner no-padding" id="topic_list">
        <cell v-for="topic in topics" :key="topic.id" :topic="topic"></cell>
      </div>
    </div>
    <bottom-bar class="bottom-bar"></bottom-bar>
  </div>
</template>

<script>
  import '../assets/iconfont/iconfont.js'
  import appBar from '../components/appBar'
  import textField from '../components/textField'
  import cell from '../components/topicCell'
  import topTab from '../components/topTab'
  import bottomBar from '../components/bottomBar'
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
      this.getTopics([this, this.$router.history.current.path])
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
        getUserInfo: 'userInfo/getUserInfo'
      })
    },
    watch: {
      currentPath: function (currentPath) {
        console.log('current path: ' + currentPath)
        this.getTopics([this, currentPath])
      }
    },
    components: {
      'topBar': appBar,
      'textField': textField,
      'bottomBar': appBar,
      'cell': cell,
      'top-tab': topTab,
      'bottom-bar': bottomBar
    }
  }
</script>

<style scoped>
  .top-bar {
    position: fixed;
    top: 0px;
    z-index: 100;
  }
  .content {
    margin-top: 60px;
  }
</style>
