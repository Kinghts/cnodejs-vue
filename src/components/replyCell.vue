<template>
  <div class="cell">
    <div class="author-content">
      <router-link @click.native="getUserInfo" :to="{ name: '用户信息' }">
        <img class="avatar" :src="reply.author.avatar_url" alt="avatar">
      </router-link>
      <span class="user-info">
        <router-link @click.native="getUserInfo" :to="{ name: '用户信息' }">{{reply.author.loginname}}</router-link>
        <a :href="config.topicUrl + '#' + reply.id">
          {{ index + 1 }}楼•{{ reply.create_at }}
        </a>
      </span>
      <span class="user-action">
        <span @click="ups" class="thumbs-up" title="喜欢">赞</span>
        <span class="up-count">{{ reply.ups.length }}</span>
        <span @click="replyOther" class="reply">回复</span>
      </span>
    </div>
    <div v-html="reply.content" class="reply_content">
    </div>
  </div>
</template>

<script>
  import config from '../config'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        'config': config
      }
    },
    props: ['index', 'reply'],
    methods: {
      ...mapActions({
        getUInfo: 'userInfo/getUserInfo'
      }),
      getUserInfo: function () {
        this.getUInfo(this.reply.author.loginname)
      },
      replyOther () { // 回复其他评论
        this.$emit('reply', this.reply)
      },
      ups () { // 点赞
        this.$emit('ups', this.reply)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cell {
    background-color: #fff;
    font-size: 14px;
    text-align: left;
  }
  .user-info {
    margin: -15px 0 0 5px;
    vertical-align: baseline; /** 仅对inline、inline-block元素有效 */
  }
  .user-info a {
    text-decoration: none;
  }
  .user-info a:first-child {
    color: #444;
  }
  .user-action {
    float: right;
    vertical-align: baseline;
  }
</style>
