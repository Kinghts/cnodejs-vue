<template>
  <div class="top_tab">
    <!--a @click="changeTopic" :topic="tab" :href="tab.path" 
    :class="{ current_tab: tab.path === currentTab.path }" 
    v-for="(tab, key, index) in tabs">{{ tab.name }}</a-->
    <router-link :to="topic.path" :key="key" v-for="(topic, key) in topics">{{ topic.name }}</router-link>
  </div>
</template>

<script>
  export default {
    props: [ 'topics' ]
  }
</script>

<style scoped>
  .top_tab {
    text-align: left;
  }
  a {
    margin: 0px 5px;
    color: #80bd01;
    text-decoration: none;
    display: inline-block;
    padding: 2px 4px;
    border-radius: 3px;
  }
  a:hover {
    color: #08c;
  }
  .router-link-active {
    color: #fff;
    background-color: #80bd01;
  }
  .router-link-active:hover {
    color: #fff;
  }
</style>
