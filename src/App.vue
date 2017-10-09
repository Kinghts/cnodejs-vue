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
      this.updateUserInfo(UserService.getLoggedUserInfo())
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
      updateUserInfo: 'loggedUser/updateUserInfo',
      showTransit: 'ui/showTransit',
      updateUserInfoPage: 'userInfo/replaceUserInfo'
    })
  },
  components: {
    'transit': Transition
  }
}
</script>
  
<style lang="less">
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
@import './assets/common.less';
</style>
