export  default {
  // mongoose数据库
  dbs:'mongodb://127.0.0.1:27017/student',
  // redis数据库
  redis:{
    get host(){
      return '127.0.0.1'
    },
    get port(){
      return 6379
    }
  },
  // 邮箱链接服务
  smtp:{
    // 邮箱地址
    get host(){
      return 'smtp.qq.com'
    },
    // 邮箱用户名
    get user(){
      return '953131010@qq.com'
    },
    // 链接授权
    get pass(){
      return 'ohtrhhvugnkxbcac'
    },
    // 设置随机验证码
    get code(){
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    // 设置验证码有效时间
    get expire(){
      return ()=>{
        return new Date().getTime()+60*60*1000
      }
    }
  }
}
