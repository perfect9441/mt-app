import Router from  'koa-router'
import Poi from '../dbs/models/poi'
import ResultsByKeywords from '../dbs/models/resultsByKeywords'

let router = new Router({
  prefix: '/search'
})

router.get('/top',async (ctx) => {
  try {
    const top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body={
      code:0,
      top:top.map(item => {
        return {
          name: item.name,
          type:item.type
        }
      })
    }
  }catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

router.get('/hotPlace',async (ctx) => {
  const city = ctx.store?ctx.store.geo.position.city:ctx.query.city
  try{
    const result = await Poi.find({
      city,
      type : ctx.query.type || '丽人'
    })
    ctx.body={
      code:0,
      result:result.map(item => {
        return {
          name:item.name,
          type:item.type
        }
      })
    }
  }catch (e) {
    ctx.body={
      code:-1,
      result:[]
    }
  }
})
/*实际查询需要时如城市及关键字，本地数据支撑少，采用直接查询结果方式
 */
router.get('/resultsByKeywords' ,async (ctx) => {
  try {
    const result = await ResultsByKeywords.findOne()
    ctx.body = {
      count: result.count,
      pois: result.pois
    }
  } catch (e) {
    ctx.body = {
      count: 0,
      pois: []
    }
  }
})

export default router
