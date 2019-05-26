<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">立即登录</nuxt-link>
      <nuxt-link
        to="/register"
        class="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          user:''
        }
      },
      /*
      请求结果处理的一种方式async await处理
      另一种方式在pages/register.vue中实现
       */
      async mounted(){
       const{status,data:{user}} = await this.$axios.get('/users/getUser')
        if(status==200){
         this.user = user
        }
      }
    }
</script>

<style scoped>

</style>
