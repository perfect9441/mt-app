import Router from  'koa-router'

import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'
import City from '../dbs/models/city'
import Position from '../dbs/models/position'

let router = new Router({
  prefix:'/geo'
})

// const sign = 'a3c9fe0782107295ee9f1709edd15218'
/*
获取不到线上数据，用本地数据代替
 */

// 原因待查，获取不到position的result
router.get('/getPosition', async (ctx) =>{
  const result = await Position.findOne() // Operating a local database
  console.info(result)
  ctx.body = {
    province:"甘肃",
    city:"三亚"
    // province: result.province,
    // city: result.city
  }
})


// router.get('/getPosition', async ctx => {
//   const result = await Position.findOne() // Operating a local database
//   console.info(result)
//   ctx.body = {
//     province: result.province,
//     city: result.city
//   }
// })


router.get('/menu', async ctx => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
})

router.get('/province',async (ctx) => {
  const result = await Province.find()
  ctx.body = {
      province : result.map(item => {
        return {
          id:item.id,
          name:item.value[0]
        }
      })
  }
})

export default router
