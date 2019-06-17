<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市:</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        @click="handleSelect(item.name)">
        {{ item.name === '市辖区'?item.province:item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
   return{
     list:[]
   }
  },
  async mounted(){
    // let {status,data:{ hots }} = await this.$axios.get('/geo/hotCity')
    // if(status === 200){
    //   this.list = hots
    // }

    const { status, data: { city }} = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      let wantArray
      for (const value of city) {
        wantArray = [...value.value]
        for (const value of wantArray) {
          if (value.province === "北京市") {
            this.list.push(value)
          }
        }
      }
    }

  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/hot.scss";
</style>
