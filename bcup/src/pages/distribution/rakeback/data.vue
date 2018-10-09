<template>
  <div class="data">
    <img class="icon" :src="item.user?item.user.avatarUrl:''" alt="">
    <div class="main">可提现余额 ￥{{fixPrice(tradeData.availableGet)}}</div>
    <div class="sub">总返佣余额 ￥{{fixPrice(tradeData.totalGet)}}</div>
  </div>
</template>


<style scoped>
  .data {
    padding: 10px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient( #EF648F,#ef8d56 );
    color : #fff;
  }

  .icon {
    width: 80px;
    height: 80px;
    background-color: #ccc;
    margin: 0 auto;
    border-radius: 50%;
    margin-top: 20px;
    overflow: hidden
  }

  .main {
    font-size: 20px;
    margin-top: 20px;
    text-align: center;
  }

  .sub {
    text-align: center;
    margin-top: 10px;
  }
</style>

<script>
  import utils from '@/common/utils/utils'
  import distributionService from '@/services/distribution/distribution'
  export default {
    props: {
      item: {},
      tradeData:{}
    },
    methods: {
      fixPrice: utils.fixPrice
    }
  }
</script>
