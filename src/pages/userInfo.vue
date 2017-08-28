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
      <cell v-for="topic in user.recent_topics" :topic="topic" :key="topic"></cell>
    </div>
    <div class="recent_replies">
      <div>最近参与的话题</div>
      <cell v-for="topic in user.recent_replies" :topic="topic" :key="topic"></cell>
    </div>
  </div>
</template>

<script>
  import config from '../config'
  import VUE from 'vue'
  import cell from '../components/topicCell'
  export default {
    data () {
      return {
        config: config,
        user: {
          loginname: '',
          avatar_url: '',
          githubUsername: '',
          create_at: '',
          score: '',
          recent_topics: '',
          recent_replies: ''
        }
      }
    },
    mounted () {
      let username = this.$store.state.route.params.username
      if (username) {
        this.getUserInfo(username)
      }
    },
    methods: {
      getUserInfo: function (username) {
        VUE.http.get(config.apiUserBaseUrl + '/' + username)
          .then(res => {
            let _data = res.body.data
            for (let key in _data) {
              if (this.user.hasOwnProperty(key)) {
                this.user[key] = _data[key]
              }
            }
          })
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
