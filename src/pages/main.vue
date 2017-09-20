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
    <topicTab v-show="showTab" class="topic-tab" :topics="config.topics"></topicTab>
    <bottomBar class="bottom-bar" styles="cnodejs">
      <div slot="center">
        <router-link class="link" to="/home/all">首页</router-link>
        <span @click="showTopicTab" class="link">话题</span>
        <router-link v-if="isLogged" class="link" to="/create">
          新建主题
        </router-link>
        <router-link v-if="isLogged" @click.native="getMessages" class="link" to="/messages">
          消息
        </router-link>
        <router-link v-if="isLogged" @click.native="replaceUserInfo" class="link" to="/userinfo">
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
      this.getTopics(this.$router.history.current.path)
    },
    computed: {
      ...mapState({
        topics: state => state.topics.topics,
        currentPath: state => state.route.path,
        mainPath: state => state.route.path.split('/')[1],
        isLogged: state => Boolean(state.loggedUser.id),
        loggedUser: state => state.loggedUser
      })
    },
    methods: {
      ...mapActions({
        getTopics: 'topics/getTopics',
        getMsg: 'messages/getMessages',
        replaceUserInfoState: 'userInfo/replaceUserInfo'
      }),
      showTopicTab () {
        this.showTab = !this.showTab
      },
      getMessages () {
        this.getMsg(this.loggedUser.accesstoken)
      },
      replaceUserInfo () {
        this.replaceUserInfoState(this.loggedUser)
      }
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
    .logo {
      max-height: 80%;
    }
  }
  .content {
    margin: 50px 0px 50px 0px;
  }
  .topic-tab {
    position: fixed;
    bottom: 50px;
  }
  .link {
    color: #ccc;
    text-decoration: none;
    text-align: center;
    line-height: inherit;
    margin: 0px 10px 0px 10px;
  }
</style>
