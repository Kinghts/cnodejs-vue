/**
发布主题和编辑主题都复用这个
 */
<template>
  <div class="editor">
    <topBar class="top-bar" styles="cnodejs">
      <span @click="goBack" slot="left">返回</span>
      <span @click="submitTopic" slot="right">发布</span>
    </topBar>
    <div class="topic">
      <select v-model="tab" name="tab-value" id="editor-tab">
        <option value="">请选择板块</option>
        <option :value="key" :key="key" v-for="(topic, key) in config.topics" v-if="topic.create">{{topic.name}}</option>
      </select>
      <hr>
      <textarea v-model="title" class="editor-title" name="title" placeholder="标题字数10字以上"></textarea>
      <hr>
      <textarea @input="updateContent" v-model="content" class="editor-content" name="content"></textarea>
    </div>
    <bottomBar class="bottom-bar" styles="cnodejs">

    </bottomBar>
  </div>
</template>

<script>
  import config from '../config.js'
  import { mapState, mapActions } from 'vuex'
  import Editor from '../components/editor'
  import appBar from '../components/appBar'
  import TopicService from '../service/topicService'
  export default {
    data () {
      return {
        'config': config,
        'id': '',
        'tab': '',
        'title': '',
        'content': '',
        'isNewTopic': true
      }
    },
    computed: {
      ...mapState({
        eTopic: state => state.editor,
        accesstoken: state => state.loggedUser.accesstoken
      })
    },
    mounted () {
      if (this.eTopic.isNewTopic) { // 新建主题
      } else { // 修改主题
        this.id = this.eTopic.id
        this.tab = this.eTopic.tab
        this.title = this.eTopic.title
        // content使用未渲染的文本
        TopicService.getTopicContent([this.id, this.accesstoken, false])
          .then(topic => {
            this.content = topic.content
          })
          .catch(err => {
            alert('获取原始主题出错')
            console.log(err)
          })
        this.isNewTopic = false
      }
    },
    watch: {
      tab: function (tab) { this.updateTopicState({tab}) },
      title: function (title) { this.updateTopicState({title}) }
    },
    methods: {
      ...mapActions({
        getTopicContent: 'detail/getTopicContent',
        createTopic: 'detail/createTopic',
        updateTopic: 'detail/updateTopic',
        updateTopicState: 'editor/updateTopic'
      }),
      goBack () {
        this.$router.go(-1)
      },
      updateContent (e) {
        this.updateTopicState({content: e.target.value})
      },
      submitTopic () {
        let accesstoken = this.$store.state.loggedUser.accesstoken
        if (this.eTopic.isNewTopic) {
          this.createTopic([accesstoken, this.eTopic.title, this.eTopic.tab, this.eTopic.content])
        } else {
          this.updateTopic([accesstoken, this.eTopic.id, this.eTopic.title, this.eTopic.tab, this.eTopic.content])
            .then(() => {
              // this.getTopicContent([this, this.eTopic.id])
              // this.$router.go(-1) // 跳转回上一级
              alert('发布主题成功')
            }).catch(err => {
              alert('保存主题失败')
              console.log(err)
            })
        }
      }
    },
    components: {
      'editor': Editor,
      'topBar': appBar,
      'bottomBar': appBar
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/common-var.less';
  .editor {
    padding: 10px;
    text-align: left;
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      z-index: @app-bar-z-index;
    }
    .topic {
      margin: @app-bar-height 0 @app-bar-height 0;
      #editor-tab {
        width: 220px;
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        background-color: inherit;
      }
      .editor-title, .editor-content {
        width: 100%;
        height: 30px;
        vertical-align: middle;
        border: none;
        background-color: inherit;
      }
      .editor-content {
        height: 400px;
      }
    }
    .bottom-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 100;
    }
  }
</style>

