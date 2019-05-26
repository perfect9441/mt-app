import Router from  'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix:'/geo'
})

const sign = 'a3c9fe0782107295ee9f1709edd15218'
/*
获取不到真实数据，用假数据代替
 */
router.get('/getPosition',async(ctx)=>{
  let data = {
    province:'甘肃',
    city:'嘉峪关'
  }
  ctx.body = data
  ctx.statusCode = 200
  /*
  真实数据获取方法  没有有效的sign
   */
  // let {status,data:{province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  // if(status === 200){
  //   ctx.body={
  //     province,
  //     city
  //   }
  // }else{
  //   province:''
  //   city:''
  // }
})
export default router
