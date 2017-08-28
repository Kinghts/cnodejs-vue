/**
  过渡画面
 */
<template>
  <div class="transit">{{ content }}</div>
</template>

<script>
  export default {
    props: ['content']
  }
</script>

<style scoped>
  .transit {
    width: 100%;
    height: 100%;
    background-color: lightpink;
    color: black;
    line-height: 100%;
    text-align: center;
  }
</style>

