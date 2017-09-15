<template>
  <div class="main">
    <topBar class="top-bar" styles="janshu-top">
      <div slot="center" class="search">
        <textField icon="search"></textField>
      </div>
    </topBar>
    <div class="content">
      <div class="inner no-padding" id="topic_list">
        <cell v-for="topic in topics" :key="topic.id" :topic="topic"></cell>
      </div>
    </div>
    <topicTab v-show="showTab" class="topic-tab" :topics="config.topics"></topicTab>
    <bottomBar class="bottom-bar" styles="janshu-bottom">
      <div slot="center">
        <router-link class="link" to="/home/all">首页</router-link>
        <span @click="showTopicTab" class="link">话题</span>
        <router-link v-if="isLogged" class="link" to="/create">
          新建主题
        </router-link>
        <router-link v-if="isLogged" class="link" to="/messages">
          消息
        </router-link>
        <router-link v-if="isLogged" class="link" to="/userinfo">
          我的
        </router-link>
        <router-link v-else class="link" to="/login">
          登录
        </router-link>
      </div>
    </bottomBar>
  </div>
</template>

<script>
  import '../assets/iconfont/iconfont.js'
  import appBar from '../components/appBar'
  import textField from '../components/textField'
  import cell from '../components/topicCell'
  import topicTab from '../components/topicTab'
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
      this.getTopics([this, this.$router.history.current.path])
    },
    computed: {
      ...mapState({
        topics: state => state.topics.topics,
        currentPath: state => state.route.path,
        mainPath: state => state.route.path.split('/')[1],
        isLogged: state => Boolean(state.loggedUser.id)
      })
    },
    methods: {
      ...mapActions({
        getTopics: 'topics/getTopics',
        getUserInfo: 'userInfo/getUserInfo'
      }),
      showTopicTab () {
        this.showTab = !this.showTab
      }
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
      'topicTab': topicTab
    }
  }
</script>

<style scoped lang="less">
  .top-bar {
    position: fixed;
    top: 0px;
    z-index: 100;
  }
  .content {
    margin: 50px 0px 50px 0px;
  }
  .topic-tab {
    position: fixed;
    bottom: 50px;
  }
  .link {
    color: rgb(100,100,100);
    text-decoration: none;
    text-align: center;
    line-height: inherit;
    margin: 0px 10px 0px 10px;
  }
</style>
