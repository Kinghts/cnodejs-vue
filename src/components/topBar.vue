<template>
  <div id="topTab">
    <div class="left-panel">
      <div class="link" @click="goBack">返回</div>
    </div>
    <div class="right-panel">
      <router-link class="link" to="/home/all">首页</router-link>
      <router-link class="avatar link" v-if="userinfo.loginname" :to="{ name: '用户信息' }">
        <img :src=userinfo.avatar_url alt="">
      </router-link>
      <router-link class="link" v-else to="/login">登录</router-link>
      <router-link @click.native="getCollect" class="favorites link" :to="{ name: '收藏' }">收藏</router-link>
      <router-link @click.native="getMsg" class="messages link" to="/messages">消息<span v-if="msgCount">{{ msgCount }}</span></router-link>
      <router-link class="link" to="/create">发布主题</router-link>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    mounted () {
      if (this.userinfo.accesstoken) { // 用户已登陆
        this.getMessagesCount([this, this.userinfo.accesstoken])
      }
    },
    computed: {
      ...mapState({
        userinfo: state => state.user,
        loginname: state => state.user.loginname,
        msgCount: state => state.messages.hasnot_read_count
      })
    },
    methods: {
      ...mapActions({
        getCollections: 'collect/getCollections',
        markAllMessages: 'messages/markAllMessages',
        getMessages: 'messages/getMessages',
        getMessagesCount: 'messages/getMessagesCount'
      }),
      getCollect () {
        this.getCollections([this.loginname])
      },
      getMsg () {
        if (this.msgCount) {
          this.markAllMessages([this, this.userinfo.accesstoken])
        }
        this.getMessages([this, this.userinfo.accesstoken])
      },
      goBack: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  #topTab {
    height: 60px;
    background-color: rgb(51,51,51);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .left-panel {
    margin-left: 20px;
  }
  .right-panel {
    min-width: 250px;
    display: flex;
    justify-content: space-between;
    margin-right: 40px;
  }
  .link {
    color: rgb(204,204,204);
    text-decoration: none;
    text-align: center;
    line-height: 60px;
  }
</style>
