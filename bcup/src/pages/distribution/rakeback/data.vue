<template>
  <div class="data">
    <img class="icon" :src="item.user?item.user.avatarUrl:''" alt="">
    <div class="main">可提现余额 ￥{{fixPrice(item.totalSale)}}</div>
    <div class="sub">总返佣余额 ￥{{fixPrice(item.totalRakeBack)}}</div>
  </div>
</template>


<style scoped>
  .data { padding : 10px; padding-bottom : 20px; display: flex;flex-direction: column;align-items: center}
  .icon { width : 80px; height : 80px; background-color: #ccc; margin : 0 auto; border-radius : 50%; margin-top : 20px; overflow: hidden}
  .main { font-size : 20px; margin-top : 20px; text-align: center; }
  .sub { text-align: center; margin-top : 10px; }
</style>

<script>
  import utils from '@/common/utils/utils'
  export default {
    props:{
      item:{}
    },
    methods: {
      fixPrice: utils.fixPrice
    }
  }
</script>
