/**
发布主题和编辑主题都复用这个
 */
<template>
  <div class="block inner">
    <div class="editor-selector align-left">
      <span>选择板块：</span>
      <select v-model="tab" name="tab-value" id="tab-select">
        <option value="">请选择</option>
        <option :value="key" :key="key" v-for="(topic, key) in config.topics" v-if="topic.create">{{topic.name}}</option>
      </select>
    </div>
    <textarea v-model="title" class="editor-title" name="title" id="title" rows="1" placeholder="标题字数10字以上"></textarea>
    <editor :content="content" @contentChange="updateContent"></editor>
    <div class="editor-submit">
      <input @click="submitTopic" class="btn-primary" value="提交" type="button">
    </div>
  </div>
</template>

<script>
  import config from '../config.js'
  import { mapState, mapActions } from 'vuex'
  import Editor from '../components/editor'
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
        eTopic: state => state.editor
      })
    },
    mounted () {
      if (this.eTopic.isNewTopic) { // 新建主题
      } else { // 修改主题
        this.id = this.eTopic.id
        this.tab = this.eTopic.tab
        this.title = this.eTopic.title
        this.content = this.eTopic.content
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
      updateContent (content) {
        this.updateTopicState({content})
      },
      submitTopic () {
        let accesstoken = this.$store.state.loggedUser.accesstoken
        if (this.eTopic.isNewTopic) {
          this.createTopic([accesstoken, this.eTopic.title, this.eTopic.tab, this.eTopic.content])
        } else {
          this.updateTopic([accesstoken, this.eTopic.id, this.eTopic.title, this.eTopic.tab, this.eTopic.content])
            .then(() => {
              this.getTopicContent([this, this.eTopic.id])
              this.$router.go(-1) // 跳转回上一级
            }).catch(err => {
              alert('保存主题失败')
              console.log(err)
            })
        }
      }
    },
    components: {
      'editor': Editor
    }
  }
</script>

<style scoped>
  #tab-select {
    width: 220px;
    border: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
  }
  .editor-selector {
    margin-bottom: 10px;
  }
  .editor-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: none;
  }
  .editor-submit {
    text-align: left;
  }
</style>

