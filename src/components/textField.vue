<template>
  <div class="text-field">
    <svg v-if="icon" class="icon" aria-hidden="true">
      <use :xlink:href="'#icon-' + icon"></use>
    </svg>
    <input type="text">
  </div>
</template>

<script>
  export default {
    props: ['icon']
  }
</script>

<style scoped>
  .text-field {
    position: relative;
  }
  .icon {
    height: 24px;
    font-size: 24px;
    position: absolute;
    z-index: 105;
    top: 50%;
    margin-top: -12px;
    margin-left: 10px;
  }
  input {
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 20px;
    padding-left: 35px;
    font-size: 20px;
  }
</style>
