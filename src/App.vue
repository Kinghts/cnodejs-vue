<template>
  <div id="app">
    <transit v-if="isShowTransit" :content="transitContent"></transit>
    <div v-else>
      <top-bar></top-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Transition from './components/transition'
import TopBar from './components/topBar'
export default {
  name: 'app',
  data () {
    return {
      transitContent: ''
    }
  },
  mounted () {
    if (localStorage.accesstoken) { // 用户以前登陆过
      if (!this.$store.state.user.id) { // 用户当前并未登录
        this.autoLogin()
      }
    }
    this.$router.push('/home')
  },
  computed: {
    ...mapState({
      routeName: state => state.route.name,
      isShowTransit: state => state.ui.isShowTransit
    })
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      showTransit: 'ui/showTransit'
    }),
    autoLogin () {
      this.transitContent = '自动登陆中...'
      this.showTransit(true)
      this.login(localStorage.accesstoken)
        .then(() => {
          console.log('自动登录成功')
          this.showTransit(false)
        })
        .catch((err) => {
          alert(err)
        })
      console.log('login')
    }
  },
  components: {
    'top-bar': TopBar,
    'transit': Transition
  }
}
</script>
  
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@import './assets/common.css'
</style>
