<template>
  <div @click="click" :class="{ show: show}">
  </div>
</template>

<script>
  export default {
    props: ['show'],
    methods: {
      click () {
        this.$emit('clicked')
      }
    }
  }
</script>

<style lang="less" scoped>
  .show {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: #000;
    opacity: 0.4;
  }
</style>
