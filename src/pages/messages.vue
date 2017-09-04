<template>
  <div>
    <div class="new-message">
      <div class="header">
        未读消息
      </div>
      <div class="inner">
        <div :key="message.id" v-for="message in newMessages" class="cell">
          {{ message.author.loginname }}回复了话题{{message.topic.title}}
        </div>
      </div>
    </div>
    <div class="old-message">
      <div class="header">
        历史消息
      </div>
      <div class="inner">
        <div :key="message.id" v-for="message in oldMessages" class="cell">
          {{ message.author.loginname }}回复了话题{{message.topic.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        newMessages: state => state.messages.hasnot_read_messages,
        oldMessages: state => state.messages.has_read_messages
      })
    }
  }
</script>
