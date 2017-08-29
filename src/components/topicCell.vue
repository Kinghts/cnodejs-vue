<template>
  <div class="cell">
    <router-link :username="2333" class="avatar pull-left" :to="{ name: '用户信息',params: { username: topic.author_name }}">
      <img :src="topic.avatar_url" alt="avatar">
    </router-link>
    <div class="title_wrapper">
      <span class="tab" :class="{ hide: topic.hideTab, put_good: topic.good, put_top: topic.top }">{{ topic.tab }}</span>
      <!--这里传参数给router了-->
      <router-link @click.native="getTopicDetail" class="topic_title" :to="{ name: '详情'}">{{ topic.title }}</router-link>
    </div>
    <span class="count">{{ topic.reply_count }}/{{ topic.visit_count }}</span>
    <a class="last_reply_at" :href="topic.article_url">
      <span >{{ topic.last_reply_at }}</span>
    </a>
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
        'getTopicContent': 'detail/getTopicContent'
      }),
      getTopicDetail () {
        this.getTopicContent([this, this.topic.id])
      }
    }
  }
</script>

<style scoped>
  .cell {
    background-color: #fff;
  }
  .count {
    position: absolute;
    bottom: 0;
    left: 98px;
    text-align: left;
  }
  .last_reply_at {
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: .8em;
    color: #778087;
  }
  .last_reply_at span {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
  }
  .title_wrapper {
    padding-left: 45px;
    white-space: nowrap; /** 可以让容器内部行内元素不换行 */
    text-overflow: ellipsis;
    height: 40px;
  }
  .tab {
    padding: 1px 4px;
    display: inline-block;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1.5em;
    background-color: #e5e5e5;
    color: #999;
    vertical-align: middle;
    margin-top: 3px;
  }
  .topic_title {
    font-size: 1em;
    width: 100%;
    line-height: 30px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    vertical-align: middle;
    text-decoration: none;
    color: #000;
  }
</style>
