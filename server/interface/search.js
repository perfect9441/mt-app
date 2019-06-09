import Router from  'koa-router'
import Poi from '../dbs/models/poi'

let router = new Router({
  prefix: '/search'
})

router.get('/top',async (ctx) => {
  try {
    const result = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body={
      code:0,
      top: result.map(item => {
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

export default router
