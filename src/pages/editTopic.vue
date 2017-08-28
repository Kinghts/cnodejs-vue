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
  import { mapActions } from 'vuex'
  import Editor from '../components/editor'
  export default {
    data () {
      return {
        'config': config,
        'editMode': false,
        'id': '',
        'tab': '',
        'title': '',
        'content': ''
      }
    },
    mounted () {
      let _params = this.$store.state.route.params
      if (_params.id) { // 正在编辑主题
        this.id = _params.id
        this.editMode = true
        this.tab = _params.tab
        this.title = _params.title
        this.content = _params.content
      }
    },
    methods: {
      ...mapActions({
        createTopic: 'detail/createTopic',
        updateTopic: 'detail/updateTopic'
      }),
      updateContent (content) {
        this.content = content
      },
      submitTopic () {
        if (!this.editMode) {
          this.createTopic([this, this.tab, this.title, this.content])
        } else {
          this.updateTopic([this, this.id, this.tab, this.title, this.content])
            .then(res => {
              if (res.body.success) {
                this.$router.go(-1) // 跳转回上一级
              }
            }).catch(err => {
              alert(err)
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

