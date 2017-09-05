<template>
  <div class="cell">
    <div class="author_content">
      <a class="user_avatar" :href="config.apiUserBaseUrl + reply.author.loginname">
        <img :src="reply.author.avatar_url" alt="avatar">
      </a>
      <div class="user_info">
        <a :href="config.apiUserBaseUrl + reply.author.loginname">
          {{ reply.author.loginname }}
        </a>
        <a :href="config.topicUrl + '#' + reply.id">
          {{ index + 1 }}楼•{{ reply.create_at }}
        </a>
      </div>
      <div class="user_action">
        <i @click="ups" class="thumbs-up" title="喜欢">赞</i>
        <span class="up-count">{{ reply.ups.length }}</span>
        <span @click="replyOther" class="reply">回复</span>
      </div>
    </div>
    <div v-html="reply.content" class="reply_content">
    </div>
  </div>
</template>

<script>
  import config from '../config'
  export default {
    data () {
      return {
        'config': config
      }
    },
    props: ['index', 'reply'],
    methods: {
      replyOther () { // 回复其他评论
        this.$emit('reply', this.reply)
      },
      ups () { // 点赞
        this.$emit('ups', this.reply)
      }
    }
  }
</script>

<style scoped>
  .cell {
    background-color: #fff;
    font-size: 14px;
    text-align: left;
  }
  .author_content {

  }
  .user_avatar {
    display: inline-block;
  }
  .user_avatar img {
    display: block; /** 解决img撑大a标签的问题 */
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
  .user_info {
    margin: -15px 0 0 5px;
    display: inline-block;
    vertical-align: middle; /** 仅对inline、inline-block元素有效 */
  }
  .user_info a {
    text-decoration: none;
  }
  .user_info a:first-child {
    color: #444;
  }
  .user_action {
    float: right;
  }
  .user_action i {
    
  }
  .user_action i:before {
    content: "\f087"
  }
</style>
