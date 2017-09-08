/**
  登录界面
 */
<template>
  <div id="login">
    <div class="panel">
      <input v-model="accesstoken" class="token_input" placeholder="请输入accesstoken" type="text" id="accesstoken">
      <button @click="login" class="token_button">登录</button>
    </div>
    <div class="panel">
      <button class="scan_btn">扫描二维码登录</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import UserService from '../service/userService'

  export default {
    data: function () {
      return {
        accesstoken: ''
      }
    },
    methods: {
      ...mapActions({
        aLogin: 'user/login'
      }),
      login: function () {
        if (this.accesstoken) {
          this.aLogin([this.accesstoken])
            .then(() => {
              let userInfo = UserService.getLoggedUserInfo()
              this.updateTopBarUserState([userInfo.loginname, userInfo.avatar_url])
              this.$router.push('home')
            })
            .catch((err) => {
              alert(err)
            })
        } else {
          alert('accesstoken不能为空')
        }
      }
    }
  }
</script>

<style scoped>
  #login {
    margin: 10px 5px;
  }
  .token_input {
    padding: 3px 3px;
    border: 1px solid #888;
    border-radius: 3px;
  }
  .token_button {
    margin-left: 5px;
  }
  .scan_btn {
    padding: 3px 3px;
    cursor: pointer;
    background-color: #80bd01;
    border: 1px solid #eee;
    border-radius: 3px;
  }
  .panel {
    padding: 10px 20px;
    background-color: #fff;
    border-top: 1px solid #eee;
    border-radius: 3px;
    font-size: 15px;
    text-align: left;
  }
</style>
