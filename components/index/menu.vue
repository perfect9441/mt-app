<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,idx) in $store.state.home.menu"
        :key="idx"
        @mouseenter="mouseenter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout">
      <template v-for="(item,idx) in curdetial.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          kind:'',
          // menu:[{
          //   type:'food',
          //   name:'美食',
          //   child:[{
          //     title:'美食',
          //     child:['代金券','饮品','烤肉','火锅','地方美食']
          //   }]
          // },{
          //   type:'takeout',
          //   name:'外卖',
          //   child:[{
          //     title:'外卖',
          //     child:['美食外卖','超市配送','外卖跑腿','更多精彩','敬请期待']
          //   }]
          // },
          // {
          //   type:'hotel',
          //   name:'酒店',
          //   child:[{
          //     title:'酒店星级',
          //     child:['经济型/快捷', '三星级','四星级','五星级','超豪华']
          //   }]
          // }
          // ]
        }
      },
      computed:{
        curdetial () {
          return this.$store.state.home.menu.filter((item) => item.type===this.kind)[0]
        }
      },
      methods:{
        mouseleave () {
          let self = this;
          self._timer=setTimeout(function () {
            self.kind=''
          },150)
        },
        mouseenter (e) {
          this.kind=e.target.querySelector('i').className
        },
        sover () {
          clearTimeout(this._timer)
        },
        sout () {
          let self = this;
          self._timer=setTimeout(function () {
            self.kind=''
          },150)
        }
      }
    }
</script>

<style>

</style>
