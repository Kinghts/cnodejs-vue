<template>
  <div :class="{ show: show}">
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        show: state => state.ui.isShowOverlay
      })
    }
  }
</script>

<style lang="less" scoped>
  .show {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: #000;
    opacity: 0.4;
  }
</style>
