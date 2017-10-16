<template>
  <div id="app">
    <transit v-if="isShowTransit" :content="transitContent"></transit>
    <div v-else>
      <router-view></router-view>
      <topicTab v-show="showTab" class="topic-tab" :topics="config.topics"></topicTab>
      <bottomBar v-if="isShowBottomBar" class="bottom-bar" styles="cnodejs">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Transition from './components/transition'
import appBar from './components/appBar'
import topicTab from './components/topicTab'
import UserService from './service/userService'
import config from './config.js'

export default {
  name: 'app',
  data () {
    return {
      transitContent: '',
      'config': config,
      'showTab': false
    }
  },
  mounted () {
    if (UserService.isLogged()) { // 用户以前登陆过
      this.updateUserInfo(UserService.getLoggedUserInfo())
    }
    this.$router.push('/home')
  },
  computed: {
    ...mapState({
      routeName: state => state.route.name,
      isShowTransit: state => state.ui.showTransit,
      isShowBottomBar: state => state.ui.showBottomBar,
      isLogged: state => Boolean(state.loggedUser.id),
      loggedUser: state => state.loggedUser
    })
  },
  methods: {
    ...mapActions({
      login: 'loggedUser/login',
      updateUserInfo: 'loggedUser/updateUserInfo',
      showTransit: 'ui/showTransit',
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
  components: {
    'transit': Transition,
    'topicTab': topicTab,
    'bottomBar': appBar
  }
}
</script>
  
<style lang="less">
  @import './assets/common-var.less';
  @import './assets/common.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .topic-tab {
    position: fixed;
    bottom: 50px;
  }
  .bottom-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: @app-bar-z-index;
  }
  .link {
    color: #ccc;
    text-decoration: none;
    text-align: center;
    line-height: inherit;
    margin: 0px 10px 0px 10px;
  }
</style>
