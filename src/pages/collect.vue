/**
"收藏"页面
 */
<template>
  <div>
    <topBar class="top-bar" styles="cnodejs">
      <span @click="goBack" slot="left">返回</span>
      <span slot="center">收藏的话题</span>
    </topBar>
    <div class="collections inner no-padding">
      <cell v-for="topic in collections" :key="topic.id" :topic="topic"></cell>
    </div>
  </div>
</template>

<script>
  import cell from '../components/topicCell.vue'
  import topBar from '../components/appBar.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    mounted () {
      this.showBottomBar(false)
      this.getCollections(this.$store.state.loggedUser.loginname)
    },
    computed: {
      ...mapState({
        collections: state => state.collect.collections
      })
    },
    methods: {
      ...mapActions({
        getCollections: 'collect/getUserCollections',
        showBottomBar: 'ui/showBottomBar'
      }),
      goBack () {
        this.$router.go(-1)
      }
    },
    components: {
      'cell': cell,
      'topBar': topBar
    }
  }
</script>

<style lang="less" scoped>
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .collections {
    margin: 50px 0 50px 0;
  }
</style>

