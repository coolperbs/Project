<template>
  <div class="checkout-user">
    <ul class="list">
      <li>
        <div class="key">姓名 :</div>
        <div class="value">{{data.order?data.order.userName:''}}</div>
      </li>
      <li>
        <div class="key">手机号 :</div>
        <div class="value">{{data.order?data.order.userPhone:''}}</div>
      </li>
      <!--<li>
        <div class="key">电子码 :</div>
        <div class="value">
          {{data.order?data.order.orderId:''}}
        </div>
      </li>-->
    </ul>
  </div>
</template>


<style scoped>
  .checkout-user { padding : 5px 0; }
  .title { font-size : 12px; padding : 10px; }
  .list li { padding : 0 10px 0 80px; height : 30px; line-height: 30px; }
  .list li:after { content:""; display: block; clear:both; }
  .list .key { float : left; width : 70px; margin-left : -70px; }
  .list .key em { color : red; font-style: normal; margin-right :5px; position: relative; top : 3px; display: inline-block; width : 5px; }
  .list .value { position: relative; }
  .list input { height : 30px; display: inline-block; width : 100%; border : none; }
  .num-picker { height : 30px; border : solid 1px #ccc; border-radius : 5px; display: inline-block; overflow: hidden; margin-top: 10px; }
  .num-picker .num-picker-mod { float: left; display: inline-block; height : 30px; line-height: 30px; text-align: center; width : 30px; border-right : solid 1px #ccc; font-size : 24px; }
  .num-picker .num-picker-mod:last-child { border-right : none; }
  .num-picker input.num-picker-mod { height : 100%; width : 40px; font-size : 18px; }
</style>

<script>
  export default {
    props:{
      data:{}
    }
  }
</script>
