<template>  
  <div class="checkout-order">
    <ul class="list">
      <li>
        <div class="key">time :</div>
        <div class="value">2019-2-1 10:11:11</div>
      </li>
      <li>
        <div class="key">orderC :</div>
        <div class="value">12123123</div>
      </li>
      <li>
        <div class="key">detail :</div>
        <div class="value">
          12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info 12341234 info
        </div>
      </li>
      <li class="total">
        <div class="key">total :</div>
        <div class="value">
          <span class="all-price"><em>$</em> 10.00</span>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .checkout-order { padding : 5px 0; }
  .title { font-size : 12px; padding : 10px; }
  .list li { padding : 5px 10px 5px 80px; }
  .list li:after { content:""; display: block; clear:both; }
  .list .key { float : left; width : 70px; margin-left : -70px; }
  .list .key em { color : red; font-style: normal; margin-right :5px; position: relative; top : 3px; display: inline-block; width : 5px; }
  .list .value { position: relative; }
  .list input { height : 30px; display: inline-block; width : 100%; border : none; }
  .list li.total .key { line-height: 20px; }
  .list li.total .value { font-size : 20px; }
  .list li.total .value em { font-style: normal; font-size : 14px; }
  .num-picker { height : 30px; border : solid 1px #ccc; border-radius : 5px; display: inline-block; overflow: hidden; margin-top: 10px; }
  .num-picker .num-picker-mod { float: left; display: inline-block; height : 30px; line-height: 30px; text-align: center; width : 30px; border-right : solid 1px #ccc; font-size : 24px; }
  .num-picker .num-picker-mod:last-child { border-right : none; }
  .num-picker input.num-picker-mod { height : 100%; width : 40px; font-size : 18px; }
</style>

<script>
  export default {
    data : function() {
      return {
      }
    }
  }
</script>