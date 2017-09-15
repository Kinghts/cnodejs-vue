<template>
  <div class="cell">
    <div class="topic-top">
      <router-link @click.native="getUserInfo" :to="{ name: '用户信息' }">
        <img class="avatar" :src="topic.avatar_url" alt="avatar">
        <span class="author-name">{{ topic.author_name }}</span>
      </router-link>
      <span class="last-reply-time">{{ topic.last_reply_at }}</span>
    </div>
    <div class="topic-middle">
      <router-link class="topic-title" @click.native="getTopicDetail"  :to="{ name: '详情'}">
        {{ topic.title }}
      </router-link>
    </div>
    <div class="topic-bottom">
      <span class="tab" :class="[{ hide: topic.hideTab, put_good: topic.good || topic.top }, 'put_normal']">{{ topic.tab }}</span>
      <span class="topic-count">
        <span>阅读{{ topic.visit_count }}</span>
        <span>评论{{ topic.reply_count }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'cell',
    props: [
      'topic'
    ],
    methods: {
      ...mapActions({
        getTopicContent: 'detail/getTopicContent',
        getUInfo: 'userInfo/getUserInfo'
      }),
      getUserInfo: function () {
        this.getUInfo(this.topic.author_name)
      },
      getTopicDetail () {
        this.getTopicContent([this, this.topic.id])
      }
    }
  }
</script>

<style scoped lang="less">
  @color-light: #999;
  @font-small: 10px;
  .cell {
    background-color: #fff;
    text-align: left;
    padding-left: 20px;
  }
  .topic-top {
    .author-name {
      margin-left: 5px;
      font-size: 16px;
      color: black;
    }
    .last-reply-time {
      font-size: @font-small;
      color: @color-light;
    }
  }
  .topic-middle {
    overflow: hidden;
    text-overflow: ellipsis;
    .topic-title {
      font-size: 20px;
      color: black;
      white-space: nowrap;
    }
  }
  .topic-bottom {
    .tab {
      padding: 3px 4px;
      border-radius: 3px;
      margin-right: 5px;
    }
    .topic-count {
      font-size: @font-small;
      color: @color-light;
    }
  }
  .title_wrapper {
    padding-left: 45px;
    white-space: nowrap; /** 可以让容器内部行内元素不换行 */
    text-overflow: ellipsis;
    height: 40px;
  }

</style>
