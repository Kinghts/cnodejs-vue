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

<style scoped lang="less">
  .app-bar-common {
    height: 50px;
    line-height: 48px;
    width: 100%;
    text-align: center;
  }
  .app-bar-default {
    .app-bar-common;
    border: 1px solid lightgray;
    background-color: rgb(51,51,51);
  }
  .app-bar-white {
    .app-bar-common;
    border: 1px solid lightgray;
    background-color: white;
  }
  .app-bar-cnodejs {
    .app-bar-common;
    border: 1px solid #444;
    background-color: #444;
    color: #ccc;
  }

  .app-bar-janshu-common {
    border: 1px solid lightgray;
    border-left: none;
    border-right: none;
    background-color: white;
  }
  .app-bar-janshu-top {
    .app-bar-common;
    .app-bar-janshu-common;
    border-top: none;
  }
  .app-bar-janshu-bottom {
    .app-bar-common;
    .app-bar-janshu-common;
    border-bottom: none;
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
