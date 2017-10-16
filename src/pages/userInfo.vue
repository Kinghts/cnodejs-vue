/**
  用户详细信息
 */
<template>
  <div>
    <topBar class="topBar" styles="cnodejs">
      <span slot="center">用户信息</span>
    </topBar>
    <div class="user-info">
      <div class="main-info">
        <img class="user-avatar" :src="user.avatar_url" alt="avatar">
        <span class="loginname">{{ user.loginname }}</span>
        <span class="exit-btn" v-if="user.accesstoken" @click="logout">退出登录</span>
      </div>
      <div class="other-info">
        <span>积分 {{ user.score }}</span>
        <br>
        <span>Github 
          <a :href="config.githubUrl + '/' + user.githubUsername">@{{ user.githubUsername }}</a>
        </span>
        <br>
        <span class="create_at">注册时间 {{ user.create_at }}</span>
      </div>
      <div class="recent_topies">
        <div>最近创建的话题</div>
        <cell v-for="topic in user.recent_topics" :topic="topic" :key="topic.id"></cell>
      </div>
      <div class="recent_replies">
        <div>最近参与的话题</div>
        <cell v-for="topic in user.recent_replies" :topic="topic" :key="topic.id"></cell>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../config'
  import cell from '../components/topicCell'
  import topBar from '../components/appBar'
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
        config: config
      }
    },
    computed: {
      ...mapState({
        user: state => state.userInfo
      })
    },
    methods: {
      ...mapActions({
        userLogout: 'loggedUser/logout'
      }),
      logout () {
        this.userLogout([this.user.loginname, this])
        this.clearTopBarUserInfo()
        this.$router.push('home/all')
      }
    },
    components: {
      'cell': cell,
      'topBar': topBar
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/common-var.less';
  .topBar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .user-info {
    margin: @app-bar-height 0 @app-bar-height 0;
    .main-info {
      background-color: white;
      border-bottom: 1px solid lightgray;
      text-align: left;
      .user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        border: 1px solid lightgray;
        vertical-align: middle;
        margin: 18px 18px 18px 20px;
      }
      .loginname {
        font-size: 20px;
      }
    }
    .other-info {
      background-color: white;
      padding: 20px;
      text-align: left;
    }
  }
</style>
