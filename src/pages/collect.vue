/**
"收藏"页面
 */
<template>
  <div>
    <div class="inner no-padding">
      <cell v-for="topic in collections" :key="topic.id" :topic="topic"></cell>
    </div>
  </div>
</template>

<script>
  import cell from '../components/topicCell.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
        loginname: ''
      }
    },
    mounted () {
      this.loginname = this.$store.state.loggedUser.loginname
    },
    computed: {
      ...mapState({
        collections: state => state.collect.collections
      })
    },
    methods: {
      ...mapActions({
        getCollections: 'collect/getCollections'
      })
    },
    components: {
      'cell': cell
    }
  }
</script>

<style scoped>
  
</style>

