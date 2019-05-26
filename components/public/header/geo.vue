<template>
  <div class="m-geo">
    <i class=" el-icon-location"/>{{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    [酒泉 张掖 敦煌]
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>
