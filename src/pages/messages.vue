<template>
  <div id="messages">
    <topBar class="top-bar" styles="cnodejs">
      <span slot="center">消息</span>
    </topBar>
    <div class="new-message">
      <div class="header">
        未读消息
      </div>
      <div class="inner messages">
        <div :key="message.id" v-for="message in newMessages" class="cell">
          {{ message.author.loginname }}回复了话题{{message.topic.title}}
        </div>
      </div>
    </div>
    <div class="old-message">
      <div class="header">
        历史消息
      </div>
      <div class="messages">
        <div class="message cell" :key="message.id" v-for="message in oldMessages">
          {{ message.author.loginname }}回复了话题 
          <router-link :to="{ name: '详情', params: { id: message.topic.id }}">{{message.topic.title}}</router-link>
          <span class="message-time">{{ message.reply.create_at }}</span>
          <p class="message-content">{{ message.reply.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import appBar from '../components/appBar'
  export default {
    computed: {
      ...mapState({
        newMessages: state => state.messages.hasnot_read_messages,
        oldMessages: state => state.messages.has_read_messages
      })
    },
    components: {
      'topBar': appBar
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/common-var.less';
  #messages {
    margin: @app-bar-height 0 @app-bar-height 0;
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      z-index: @app-bar-z-index;
    }
    .messages {
      text-align: left;
      background-color: white;
      .message {
        position: relative;
        .message-time {
          position: absolute;
          right: 10px;
        }
        .message-content {
          border: 1px solid #80bd01;
          border-radius: 3px;
          padding: 5px;
          word-wrap: break-word;
          color: #888;
        }
      }
    }
  }
</style>

