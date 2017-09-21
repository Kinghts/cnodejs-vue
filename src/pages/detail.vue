/**
  主题详情页面
 */
<template>
  <div id="content">
    <div class="panel">
      <div class="header topic_header">
        <span class="title">{{ detail.title }}</span>
        <div class="changes">
          <span>发布于{{ detail.create_at }}</span>
          <router-link @click.native="getUserInfo" :to="{ name: '用户信息' }">作者{{ detail.author.loginname }}</router-link>
          <span>{{ detail.visit_count }}次浏览</span>
          <span>来自{{ config.topics[detail.tab].name }}</span>
          <br>
          <router-link @click.native="editTopic" :to="{ name: '编辑主题' }" v-if="detail.author_id === user_id">编辑</router-link>
        </div>
        <input v-if="is_collect" @click="de_collectTopic" class="btn-common collect-btn" value="取消收藏" type="button">
        <input v-else @click="collectTopic" class="btn-success collect-btn" value="收藏" type="button">
      </div>
      <div class="inner">
        <div v-html="detail.content" class="topic_content">
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="header">
        <span class="col_fade">{{ detail.reply_count }}回复</span>
      </div>
      <div class="replies">
        <reply-cell @reply="changeReplyStatus" @ups="submitRUps" :index="index" :reply="reply" v-for="(reply, index) in detail.replies" :key="reply.id"></reply-cell>
      </div>
    </div>
    <div class="panel">
      <div class="header">
        <span class="col_fade">添加回复</span>
      </div>
      <div class="edit-reply">
        <editor @contentChange="updateTReplyContent"></editor>
      </div>
      <div class="editor-submit">
        <input v-if="isReplyTopic" @click="submitTReply" class="btn-primary" value="回复" type="button">
        <input v-else @click="submitOReply" class="btn-primary" :value="repliedAuthor" type="button">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import config from '../config'
  import replyCell from '../components/replyCell'
  import Editor from '../components/editor'
  export default {
    data () {
      return {
        'config': config,
        'topicReply': '', // 回复内容
        'isReplyTopic': true, // 回复主题或者回复评论
        'repliedId': '', // 被回复的评论的id
        'repliedAuthor': '' // 被回复的评论的作者
      }
    },
    computed: {
      ...mapState({
        detail: state => state.detail,
        is_collect: state => state.detail.is_collect,
        user_id: state => state.loggedUser.id, // 已登录用户的id
        accesstoken: state => state.loggedUser.accesstoken
      })
    },
    methods: {
      ...mapActions({
        getTopicContent: 'detail/getTopicContent',
        collect: 'detail/collectTopic',
        decollect: 'detail/decollectTopic',
        replyTopic: 'detail/replyTopic',
        replyUser: 'detail/replyUser',
        thumbsUp: 'detail/thumbsUp',
        toEditMode: 'editor/toEditMode',
        getCollections: 'collect/getCollections',
        getUInfo: 'userInfo/getUserInfo'
      }),
      getUserInfo () {
        this.getUInfo(this.detail.author.loginname)
      },
      editTopic () {
        this.toEditMode(this.detail)
      },
      collectTopic () {
        this.collect([this.$store.state.loggedUser.accesstoken, this.detail.id])
          .then(res => {
            console.log('收藏成功')
            setTimeout(() => {
              this.getCollections([this.$store.state.loggedUser.loginname])
            }, 2000)
          })
          .catch(err => {
            alert('收藏失败')
            console.log(err)
          })
      },
      de_collectTopic () {
        this.decollect([this.$store.state.loggedUser.accesstoken, this.detail.id, false])
          .then(res => {
            console.log('取消收藏成功')
            setTimeout(() => {
              this.getCollections([this.$store.state.loggedUser.loginname])
            }, 2000)
          })
          .catch(err => {
            alert('取消收藏失败')
            console.log(err)
          })
      },
      updateTReplyContent (content) { // 从editor传来的更新
        this.topicReply = content
      },
      submitTReply () {
        this.replyTopic([this.accesstoken, this.detail.id, this.topicReply])
          .then(() => {
            alert('回复成功，2秒后刷新页面')
            setTimeout(() => {
              this.getTopicContent([this.detail.id, this.accesstoken])
            }, 2000)
          })
      },
      changeReplyStatus (reply) {
        this.isReplyTopic = false
        this.repliedId = reply.id
        this.repliedAuthor = '回复' + reply.author.loginname
      },
      submitOReply () { // 回复其他人的评论
        this.replyUser([this.accesstoken, this.detail.id, this.topicReply, this.repliedId])
          .then(() => {
            alert('回复成功，2秒后刷新页面')
            setTimeout(() => {
              this.getTopicContent([this.detail.id, this.accesstoken])
            }, 2000)
          })
      },
      submitRUps (reply) { // 点赞评论
        this.thumbsUp([this.accesstoken, reply.id, this.user_id])
      }
    },
    components: {
      'reply-cell': replyCell,
      'editor': Editor
    }
  }
</script>

<style scoped>
  #content {
    margin: 0 5px;
  }
  .topic_header {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  .topic_content {
    padding: 10px 10px;
    text-align: left;
  }
  .inner {
    background-color: #fff;
  }
  .header {
    text-align: left;
  }
  .title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    line-height: 130%;
  }
  .changes {
    color: #838383;
  }
  .changes * {
    font-size: 12px;
  }
  .changes span:before {
    content: '•'
  }
  .edit-reply div {
    height: 200px;
  }
  .editor-submit {
    margin-top: 50px;
  }
</style>
