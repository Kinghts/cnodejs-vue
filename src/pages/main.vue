<template>
  <div class="main">
    <topBar class="top-bar" styles="cnodejs">
      <img class="logo" slot="center" src="../assets/cnodejs_light.svg">
    </topBar>
    <div class="content">
      <div class="inner no-padding" id="topic_list">
        <cell v-for="topic in topics" :key="topic.id" :topic="topic"></cell>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/iconfont/iconfont.js'
  import appBar from '../components/appBar'
  import textField from '../components/textField'
  import cell from '../components/topicCell'
  import config from '../config.js'
  import { mapState, mapActions } from 'vuex'
  
  export default {
    name: 'main',
    data () {
      return {
        'config': config,
        'showTab': false
      }
    },
    mounted () {
      this.getTopics(this.$router.history.current.path)
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
        getTopics: 'topics/getTopics',
        getMsg: 'messages/getMessages',
        replaceUserInfoState: 'userInfo/replaceUserInfo'
      })
    },
    watch: {
      currentPath: function (currentPath) {
        console.log('current path: ' + currentPath)
        this.getTopics(currentPath)
      }
    },
    components: {
      'topBar': appBar,
      'textField': textField,
      'cell': cell
    }
  }
</script>

<style scoped lang="less">
  .top-bar {
    position: fixed;
    top: 0px;
    z-index: 100;
    .logo {
      max-height: 80%;
    }
  }
  .content {
    margin: 50px 0 50px 0;
  }
  .link {
    color: #ccc;
    text-decoration: none;
    text-align: center;
    line-height: inherit;
    margin: 0px 10px 0px 10px;
  }
</style>
