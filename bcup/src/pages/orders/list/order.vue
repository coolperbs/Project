<template>
  <router-link :to="{ path : '/orders/detail?orderid=' + orderId }" class="order">
    <div class="status">status</div>
    <div class="main ellipsis-2">【loc】many info many info many info many info many info many info many info many info many info many info many info many info many info many info many info many info many info many info many info many info </div>
    <ul class="list">
      <li>
        <div class="key">name :</div>
        <div class="value">haha</div>
      </li>
      <li>
        <div class="key">phone :</div>
        <div class="value">11111111111</div>
      </li>
      <li>
        <div class="key">code :</div>
        <div class="value">
          12341234
        </div>
      </li>
    </ul>
    <div class="act clearfix">
      <div class="btn">subscribe</div>
    </div>
  </router-link>
</template> 


<style scoped>
    .order { display: block; padding : 10px 10px 0 10px; position: relative; }
    .status { padding : 5px 10px; background-color: #ccc; color : #fff; position: absolute; left : -5px; top : 5px; }
    .status:after { content: ''; display: block; width: 0; height: 0; border: 3px solid gray; border-left: 3px solid transparent; border-bottom: 3px solid transparent; position: absolute; left : 0; bottom : -5px; }
    .main { margin-top : 25px; }

    .list { border-top : dashed 1px #f0f0f0; margin-top : 10px; }
    .list li { padding : 0 10px 0 70px; height : 30px; line-height: 30px; }
    .list li:after { content:""; display: block; clear:both; }
    .list .key { float : left; width : 70px; margin-left : -70px; }
    .list .key em { color : red; font-style: normal; margin-right :5px; position: relative; top : 3px; display: inline-block; width : 5px; }
    .list .value { position: relative; }
    .list input { height : 30px; display: inline-block; width : 100%; border : none; }    
    
    .act { border-top : dashed 1px #f0f0f0; padding : 10px 0; text-align: right; }
    .act .btn { display: inline-block; background-color: #ccc; padding : 8px 15px; border-radius : 20px; }
</style>

<script>
  export default {
    props : ['orderId'],
    data : function() {
      return {
      }
    }
  }
</script>