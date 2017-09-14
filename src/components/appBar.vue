<template>
  <div :class="'app-bar-' + styles">
    <span class="bar-left" >
      <slot name="left"></slot>
    </span>
    <span class="bar-center" >
      <slot name="center"></slot>
    </span>
    <span class="bar-right" >
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
  export default {
    props: [
      'styles'
    ]
  }
</script>

<style scoped>
  .app-bar-default {
    height: 50px;
    line-height: 48px;
    width: 100%;
    border: 1px solid lightgray;
    background-color: rgb(51,51,51);
    text-align: center;
  }
  .app-bar-white {
    height: 50px;
    line-height: 48px;
    width: 100%;
    border: 1px solid lightgray;
    background-color: white;
    text-align: center;
  }
  .bar-left {
    float: left;
    margin-left: 10px;
  }
  .bar-right {
    float: right;
    margin-right: 10px;
  }
</style>
