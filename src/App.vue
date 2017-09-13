<template>
  <div id="app">
    <transit v-if="isShowTransit" :content="transitContent"></transit>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Transition from './components/transition'
import UserService from './service/userService'

export default {
  name: 'app',
  data () {
    return {
      transitContent: ''
    }
  },
  mounted () {
    if (UserService.isLogged()) { // 用户以前登陆过
      /*
      if (!this.$store.state.topBar.loginname) { // 用户当前并未登录
        this.autoLogin()
      } */
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
      login: 'loggedUser/login',
      showTransit: 'ui/showTransit',
      updateUserInfoPage: 'userInfo/replaceUserInfo'
    }),
    autoLogin () {
      this.transitContent = '自动登陆中...'
      this.showTransit(true)
      this.login([UserService.getLoggedUserInfo().accesstoken])
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
.bottom-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
}

@import './assets/common.css'
</style>
