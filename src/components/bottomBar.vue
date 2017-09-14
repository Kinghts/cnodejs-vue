<template>
  <div>
    <appBar styles="default">
      <div slot="left" class="link" @click="goBack">返回</div>
      <div slot="right">
        <router-link class="link" to="/home/all">首页</router-link>
        <router-link class="avatar link" v-if="loggedUserInfo.loginname" :to="{ name: '用户信息' }">
          <img :src="loggedUserInfo.avatar_url" alt="">
        </router-link>
        <router-link class="link" v-else to="/login">登录</router-link>
        <router-link @click.native="getCollect" class="favorites link" :to="{ name: '收藏' }">收藏</router-link>
        <router-link @click.native="getMsg" class="messages link" to="/messages">消息<span v-if="msgCount">{{ msgCount }}</span></router-link>
        <router-link class="link" to="/create">发布主题</router-link>
      </div>
    </appBar>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import appBar from './appBar'

  export default {
    mounted () {
      if (this.isLogged) { // 用户已登陆
        this.getMessagesCount([this, this.loggedUserInfo.accesstoken])
      }
    },
    computed: {
      ...mapState({
        loggedUserInfo: state => state.loggedUser,
        msgCount: state => state.messages.hasnot_read_count,
        isLogged: state => Boolean(state.loggedUser.accesstoken)
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
        if (this.isLogged) {
          this.getCollections([this.loggedUserInfo.loginname])
        }
      },
      getMsg () {
        if (this.isLogged) {
          if (this.msgCount) {
            this.markAllMessages([this, this.loggedUserInfo.accesstoken])
          }
          this.getMessages([this, this.loggedUserInfo.accesstoken])
        }
      },
      goBack: function () {
        this.$router.go(-1)
      }
    },
    components: {
      'appBar': appBar
    }
  }
</script>

<style scoped>
  .link {
    color: rgb(204,204,204);
    text-decoration: none;
    text-align: center;
    line-height: inherit;
  }
</style>
