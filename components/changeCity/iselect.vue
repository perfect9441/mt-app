<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
  /*
  页面要用localhost，不能用127.0.0.1
   */
  import _ from 'lodash'
    export default {
      data(){
        return{
          province:[],
          pvalue:'',
          city:[],
          cvalue:'',
          input:'',
          cities:[]
        }
      },
      /*
      城市监听省份变化，跟随变动
       */
      watch:{
        pvalue:async function (newPvalue) {
          const self = this;
          const { status, data:{ city }}= await self.$axios.get(`/geo/province/${newPvalue}`)
          if(status === 200){
            self.city = city.map(item => {
              return{
                value:item.id,
                label:item.name
              }
            })
            self.cvalue=''
          }
        }
      },
      /*
      页面加载时加载省份
       */
      mounted:async function(){
        const self = this;
        const { status, data:{ province }} = await self.$axios.get('/geo/province')
        console.info(status,province)
        if(status === 200){
          this.province = province.map(item => {
            return {
              value:item.id,
              label:item.name
            }
          })
        }
      },
      methods:{
        /*
        indexOf报错，原因未知
         */
        querySearchAsync:_.debounce (async function(queryer,cb){
          let self = this;
          if(self.cities.length){
            cb(self.cities.filter(item => item.value.indexOf(queryer) > -1))
          }else{
            let {status,data:{city}} = await self.$axios.get('/geo/city')
            if(status === 200){
              self.cities = city.map(item => {
                return {
                  value:item.name
                }
              })
              cb(self.cities.filter(item => item.value.indexOf(queryer) > -1))
            }else{
              cb([])
            }
          }
        },100),
        handleSelect(e){
          this.$store.commit('geo/setCity', e.value)
        }
      }
    }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss";
</style>
