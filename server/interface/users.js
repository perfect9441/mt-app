import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer'
import User from '../dbs/models/user'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'
// 定义前缀
let router = new Router({
  perfix:'/users'
})
 let Store = new Redis().client
// 注册接口
router.post('/singup',async(ctx)=>{
  const{
    username,
    password,
    email,
    code
  } = ctx.request.body
  // 获取保存的验证码、有效期
  if(code){
    const saveCode = await Store.hget(`nodemail:${userrname}`,'code')
    const saveExpire = await Store.hget(`nodemail:${username}`,'code')
    if(code === saveCode){
      if(new Date().getTime()-saveExpire>0){
        ctx.body={
          code:-1,
          msg:'验证码已经过期，请重新尝试'
        }
        return fase
      }
    }else{
      ctx.body={
        code:-1,
        msg:'请填写正确的验证码'
      }
    }
  }else{
    ctx.body={
      code:-1,
      msg:'请填写验证码'
    }
  }
  let user = await User.find({
    username
  })
  if(user.length){
    ctx.body={
      code:-1,
      msg:'已被注册'
    }
    return
  }
  let nuser = await user.create({
    username,
    password,
    email
  })
  if(nuser){
    let res = await axios.post('/users/singin',{
      username,
      password
    })
    if(red.data&&res.data.code===0){
      ctx.body={
        code:0,
        msg:'注册成功！',
        user:res.data.user
      }
    }else{
      ctx.body={
        code:-1,
        msg:'error'
      }
    }
  }else{
    ctx.body={
      code:-1,
      msg:'注册失败！'
    }
  }
})
// 登录接口
router.post('/singin',async(ctx,next)=>{
  return Passport.authenticate('local',function(err,user,info,status){
   if(err){
     ctx.body={
       code:-1,
       msg:err
     }
   }else{
     if(user){
       ctx.body={
         code:0,
         msg:'登陆成功！',
         user
       }
       return ctx.login(user)
     }else{
       ctx.body={
         code:1,
         msg:info
       }
     }
   }
  })(ctx,next)
})
// 验证码接收
router.post('/verify',async(ctx,next)=>{
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if(saveExpire&&new Date().getTime()-saveExpire<0){
    ctx.body={
      code:-1,
      msg:'验证请求过频繁，请一分钟内请求一次'
    }
    return false
  }
  let transporter =nodeMailer.createTransport({
    host:Email.smtp.host,
    port:587,
    secure:false,
    auth:{
      user:Email.smtp.user,
      pass:Email.smtp.pass
    }
  })
  let ko = {
    code:Email.smtp.code(),
    expire:Email.smtp.expire(),
    email:ctx.request.body.email,
    user:ctx.request.body.username
  }
  let mailOption={
    from:`"认证邮件" <${Email.smtp.user}>`,
    to:ko.email,
    subject:'Vue学习美团网实战————注册码',
    html: `您收到的验证码是${ko.code},请您在一分钟内填写，过期失效`
  }
  await transporter.sendMail(mailOption,(error,info)=>{
    if(error){
      return console.log('error')
    }else{
      Store.hmset(`nodemail${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  ctx.body={
    code:0,
    msg:'验证码已发送,请注意查收'
  }
})
// 退出登录
router.get('/exit',async (ctx,next)=>{
  await ctx.logout()
  if(!ctx.isAuthenticated()){
    ctx.body={
      code:0
    }
  }else{
    ctx.body={
      code:-1
    }
  }
})
// 获取用户
router.get('/getUser',async (ctx)=>{
  if(ctx.isAuthenticated()){
    const {username,email}= ctx.session.passport.user
    ctx.body={
      user:username,
      email:email
    }
  }else{
    ctx.body={
      user:'',
      email:''
    }
  }
})

export default router
