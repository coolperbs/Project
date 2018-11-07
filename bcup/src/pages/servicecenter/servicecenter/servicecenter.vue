<template>
  <!--服务中心主页-->
  <div class="service-center">
    <div class="title">自助服务</div>
    <div class="cell">
      <!--<router-link :to="{path:'/servicecenter/bookinglist'}" class="item">
        <div class="item-img"><img src="/static/yuyuedingdan.png"></div>
        <div class="item-name">我的预约</div>
      </router-link>-->
      <router-link :to="{path : '/servicecenter/findecode'}" class="item">
        <div class="item-img"><img src="/static/code.png"></div>
        <div class="item-name">找回核销码</div>
      </router-link>
      <router-link :to="{path : '/servicecenter/bookinguse'}" class="item">
        <div class="item-img"><img src="/static/pre-order.png"></div>
        <div class="item-name">预约使用</div>
      </router-link>
      <router-link :to="{path : '/orders/list?type=1'}" class="item">
        <div class="item-img"><img src="/static/order-list.png"></div>
        <div class="item-name">查看订单</div>
      </router-link>
    </div>
    <!--<div class="title">常见问题</div>
    <div class="qr-list">
      <router-link :to="{ path : '/servicecenter/findecode', query : { id : ''} }"  class="qr-item">短信丢了/电子码丢了如何找回？</router-link>
      <router-link :to="{ path : '/servicecenter/findecode', query : { id : ''} }"  class="qr-item">要怎样预约使用？</router-link>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: "serviceenter"
  }
</script>

<style scoped>
  .service-center{
    background: #fff;
  }
  .title{
    font-size: 16px;
    font-weight: bold;
    color: #000;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .cell{
    display: flex;
    align-content: center;
    justify-content: space-around;
    margin-bottom: 20px;
    padding: 20px 0 10px 0;
  }
  .item{
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .item .item-img{
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    position: relative;
  }

  .item .item-img img {
    width : 48px;
    height: 48px;
    position: absolute;
    left : 6px;
    top : 6px;
  }

  .item .item-name{
    text-align: center;
    font-size: 13px;
    color: #666;
  }
  .qr-list{
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .qr-item{
    color: #666;
    font-size: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .qr-item:last-child { border-bottom : 0; }

</style>
