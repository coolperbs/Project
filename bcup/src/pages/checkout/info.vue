<template>
  <div class="checkout-info">
    <div class="main">{{ pageInfo.skuInfo.title }}</div>
    <!--<div class="spec"><span class="tag">地址/电话</span>{{pageInfo.skuInfo.title}}{{pageInfo.skuInfo.subTitle}}/{{pageInfo.skuInfo.storeVO.telphone}}</div>-->
  </div>
</template>


<style scoped>
  .main { 
    font-size : 18px;
  }
  .checkout-info {
    padding: 10px;
  }

  .spec {
    margin-top: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #999;
  }

  .spec .tag {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    padding: 0 10px;
    background-color: #ff6e1d;
    border-radius: 10px;
    margin-right: 10px;
    color : #fff;
  }
</style>

<script>
  export default {
    props: ['value'],
    computed: {
      pageInfo: function () {
        return this.value;
      }
    },
    data: function () {
      return {}
    }
  }
</script>
