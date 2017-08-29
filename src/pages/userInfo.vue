/**
  用户详细信息
 */
<template>
  <div id="user_info">
    <div class="avatar">
      <img class="" :src="user.avatar_url" alt="avatar">
      <span>{{ user.loginname }}</span>
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
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        config: config
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
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
