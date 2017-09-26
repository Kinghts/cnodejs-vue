<template>
  <div class="popup" :class="styles">
    <overlay @clicked="close" :show="showOverlay"></overlay>
    <div class="slot">
      <slot></slot>
    </div>
  </div>  
</template>

<script>
  import overlay from './overlay'

  export default {
    props: ['position', 'open'],
    computed: {
      styles () {
        return this.open ? 'open-' + this.position : 'close-' + this.position
      },
      showOverlay () {
        return this.open
      }
    },
    methods: {
      close () {
        this.$emit('close')
      }
    },
    components: {
      'overlay': overlay
    }
  }
</script>

<style lang="less" scoped>
  .popup {
    position: fixed;
    z-index: 1000;
    background-color: white;
    .slot {
      position: relative;
      z-index: 1001;
    }
  }
  .open-bottom {
    bottom: 0px;
  }
  .close-bottom {
    bottom: 0px;
    transform: translateY(100%);
  }
</style>
