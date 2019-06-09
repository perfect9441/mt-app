const state = () =>({
  menu:[],
  hotPlace:[]
})

const mutations = {
  setMenu(state,val){
    state.menu = val
  },
  setHotPlace(state,val){
    state.hotPlace = val
  }
}

const actions = {
<<<<<<< HEAD
  setMenu:({commit},menu)=>{
    commit('setMenu',menu)
  },
  setHotPlace:({commit},hotPlace)=>{
    commit('setHotPlace',hotPlace)
=======
  setPosition:({commit},menu)=>{
    commit('setMenu',menu)
  },
  setHotPlace:({commit},hotPlace)=>{
    commit('sethotPlace',hotPlace)
>>>>>>> 2dd0d027c94386d4f4f512d6681cd6c792e73329
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
