<template>
  <div class="editor-content"></div>
</template>

<script>
  import config from '../config.js'
  import 'quill/dist/quill.snow.css'
  import Quill from 'quill/dist/quill.js'

  export default {
    props: ['content'],
    data () {
      return {
        'quill': null // markdown编辑器
      }
    },
    mounted () {
      this.quill = new Quill('.editor-content', {
        modules: { toolbar: config.editorToolBarOptions },
        theme: 'snow'
      })
      this.quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('contentChange', this.quill.getText())
      })
    },
    watch: {
      content: function (newV, oldV) { // mounted里拿不到content
        this.quill.setText(String(newV), 'user')
      }
    }
  }
</script>

<style scoped>
  .editor-content {
    display: block;
    background-color: white;
  }
</style>
