/**
  主题详情页面
 */
<template>
  <div class="detail">
    <topBar class="top-bar" styles="cnodejs">
      <span @click="goBack" slot="left">返回</span>
      <span slot="right">
        <router-link @click.native="editTopic" :to="{ name: '编辑主题' }" v-if="detail.author_id === user_id">编辑</router-link>
        <span v-if="is_collect" @click="de_collectTopic">取消收藏</span>
        <span v-else-if="user_id" @click="collectTopic">收藏</span>
      </span>
    </topBar>
    <div class="topic">
      <div class="header topic-header">
        <div class="userinfo">
          <router-link @click.native="getUserInfo" :to="{ name: '用户信息' }">
            <img class="avatar" :src="detail.author.avatar_url" alt="avatar">
          </router-link>
          <span class="otherinfo">
            <span>{{ detail.author.loginname }}</span>
            <br>
            <span>{{ detail.create_at }}</span>
          </span>
        </div>
      </div>
      <div class="topic-content inner">
        <div class="title">{{ detail.title }}</div>
        <div class="accessinfo">
          <span>{{ detail.visit_count }}次浏览</span>
          <span>{{ config.topics[detail.tab].name }}</span>
        </div>
        <div v-html="detail.content" class="content">
        </div>
      </div>
        <a name="reply" id="reply"></a>
        <div class="replies">
          <reply-cell @reply="changeReplyStatus" @ups="submitRUps" :index="index" :reply="reply" v-for="(reply, index) in detail.replies" :key="reply.id"></reply-cell>
        </div>
    </div>
    <bottomBar class="bottom-bar" styles="cnodejs">
      <span v-if="user_id" slot="left">
        <span @click="open">写下你的评论</span>
      </span>
      <span slot="right">
        <span @click="jumpToReply">评论{{detail.reply_count}}</span>
      </span>
    </bottomBar>
    <popup class="popup-reply" position="bottom" :open="bottomPopup" @close="close">
      <div class="editor-reply">
        <textarea @input="updateTReplyContent" name="reply"></textarea>
      </div>
      <div class="editor-submit">
        <span v-if="isReplyTopic" @click="submitTReply">发表评论</span>
        <span v-else @click="submitOReply" class="btn-primary">{{repliedAuthor}}</span>
      </div>
    </popup>
  </div>
</template>

<script>
  import config from '../config'
  import replyCell from '../components/replyCell'
  import Editor from '../components/editor'
  import appBar from '../components/appBar'
  import popup from '../components/popup'
  import { mapState, mapActions } from 'vuex'

  export default {
    mounted () {
      if (this.$route.params.id) {
        this.getTopicContent([this.$route.params.id, this.accesstoken])
      }
    },
    data () {
      return {
        'config': config,
        'topicReply': '', // 回复内容
        'isReplyTopic': true, // 回复主题或者回复评论
        'repliedId': '', // 被回复的评论的id
        'repliedAuthor': '', // 被回复的评论的作者
        bottomPopup: false
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
      goBack () {
        this.$router.go(-1)
      },
      open () {
        this.bottomPopup = true
      },
      close () {
        this.bottomPopup = false
      },
      jumpToReply () {
        let reply = document.querySelector('.replies')
        let distance = reply.offsetTop - 50
        document.body.scrollTop = distance // chrome
        document.documentElement.scrollTop = distance // firefox
        window.pageYOffset = distance // total
      },
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
      updateTReplyContent (e) { // 从textarea传来的更新
        this.topicReply = e.target.value
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
      'topBar': appBar,
      'bottomBar': appBar,
      'reply-cell': replyCell,
      'editor': Editor,
      'popup': popup
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/common-var.less';
  .detail {
    .top-bar {
      position: fixed;
      top: 0px;
      z-index: @app-bar-z-index;
    }
    .topic {
      margin: @app-bar-height 0 @app-bar-height 0;
    }
    .userinfo {
      text-align: left;
      vertical-align: middle;
      .otherinfo {
        vertical-align: middle;
        display: inline-block;
      }
    }
    .topic-content {
      background-color: white;
      padding-bottom: 20px;
      text-align: left;
      .title {
        font-size: 22px;
        font-weight: 700;
        margin: 8px 0;
        display: inline-block;
        line-height: 130%;
        text-align: left;
      }
      .accessinfo {
        text-align: left;
      }
      .content {
        overflow: auto;
        text-align: left;
      }
    }
    .popup-reply {
      width: 100%;
      min-width: 400px;
      .editor-reply {
        background-color: white;
        padding: 10px;
        textarea {
          width: 100%;
          height: 100px;
          border: 1px solid lightgray;
          padding: 10px;
        }
      }
      .editor-submit {
        background-color: white;
        padding: 0px 10px 10px 0px;
        text-align: right;
        span {
          border-radius: 3px;
          border: 1px solid #80bd01;
          color: #80bd01;
          padding: 5px 3px;
        }
      }
    } 
    .bottom-bar {
      position: fixed;
      bottom: 0px;
      z-index: 100;
      color: #ccc;
    }
  }
  .changes span:before {
    content: '•'
  }
</style>
