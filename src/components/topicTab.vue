<template>
  <div class="top_tab">
    <!--a @click="changeTopic" :topic="tab" :href="tab.path" 
    :class="{ current_tab: tab.path === currentTab.path }" 
    v-for="(tab, key, index) in tabs">{{ tab.name }}</a-->
    <router-link :class="{ 'link-active': topic.name === currentTopic }" :to="topic.path" :key="key" v-for="(topic, key) in topics">{{ topic.name }}</router-link>
  </div>
</template>

<script>
  export default {
    props: [ 'topics' ],
    computed: {
      currentTopic: state => state.$router.name
    }
  }
</script>

<style scoped>
  .top_tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: white;
    border: 1px solid lightgray;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }
  a {
    margin: 0px 5px;
    color: #80bd01;
    text-decoration: none;
    display: inline-block;
    padding: 2px 4px;
    border-radius: 3px;
  }
  .router-link-active {
    color: #111;
  }
</style>
