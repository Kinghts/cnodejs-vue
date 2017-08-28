<template>
  <div>
    <textarea class="editor-content"></textarea>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/lib/codemirror.css'
  export default {
    props: ['content'],
    data () {
      return {
        'codemirror': null
      }
    },
    mounted () {
      this.codemirror = CodeMirror.fromTextArea(document.querySelector('.editor-content'))
      this.codemirror.on('change', (codemirror) => {
        this.$emit('contentChange', codemirror.getValue())
      })
    },
    watch: {
      content: function (newV, oldV) { // mounted里拿不到content
        this.codemirror.setValue(String(newV))
      }
    }
  }
</script>

