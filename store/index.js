import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)
// 创建实例
const store = () => new Vuex.Store({
  modules:{
    geo,
    home
  },
  actions:{
    async nuxtServerInit({commit},{req,app}){

      const {
        status,
        data:{
          province,
          city
        }
      }=await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})
<<<<<<< HEAD

=======
>>>>>>> 2dd0d027c94386d4f4f512d6681cd6c792e73329
      const {
        status:status2,
        data:{
          menu
        }
      }=await app.$axios.get('/geo/menu')
<<<<<<< HEAD
=======
      console.info(menu)
>>>>>>> 2dd0d027c94386d4f4f512d6681cd6c792e73329
      commit('home/setMenu',status2===200?menu:[])
    }
  }
})

export default store
