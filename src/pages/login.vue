/**
  登录界面
 */
<template>
  <div id="login">
    <div class="panel">
      <input v-model="accesstoken" class="token_input" placeholder="请输入accesstoken" type="text" id="accesstoken">
      <button @click="login" class="token_button">登录</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data: function () {
      return {
        accesstoken: ''
      }
    },
    methods: {
      ...mapActions({
        aLogin: 'loggedUser/login',
        updateUserInfoPage: 'userInfo/replaceUserInfo'
      }),
      login: function () {
        if (this.accesstoken) {
          this.aLogin([this.accesstoken, this])
            .then(() => {
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
  .panel {
    padding: 10px 20px;
    background-color: #fff;
    border-top: 1px solid #eee;
    border-radius: 3px;
    font-size: 15px;
    text-align: left;
  }
</style>
