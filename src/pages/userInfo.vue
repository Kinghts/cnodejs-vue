/**
  用户详细信息
 */
<template>
  <div id="user_info">
    <div class="avatar">
      <img :src="user.avatar_url" alt="avatar">
      <span>{{ user.loginname }}</span>
      <input v-if="user.accesstoken" @click="logout" value="退出登录" type="button">
    </div>
    <div class="user_score">{{ user.score }}积分</div>
    <div class="user_githubname">
      <a :href="config.githubUrl + '/' + user.githubUsername">@{{ user.githubUsername }}</a>
    </div>
    <div class="create_at">注册时间{{ user.create_at }}</div>
    <div class="recent_topies">
      <div>最近创建的话题</div>
      <cell v-for="topic in user.recent_topics" :topic="topic" :key="topic.id"></cell>
    </div>
    <div class="recent_replies">
      <div>最近参与的话题</div>
      <cell v-for="topic in user.recent_replies" :topic="topic" :key="topic.id"></cell>
    </div>
  </div>
</template>

<script>
  import config from '../config'
  import cell from '../components/topicCell'
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
      'cell': cell
    }
  }
</script>

<style scoped>
  .avatar {
    text-align: left;
  }
</style>
