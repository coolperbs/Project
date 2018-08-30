<template>
  <div class="account">
    <ul class="list">
      <li>
        <div class="key">name :</div>
        <div class="value"><input /></div>
      </li>
      <li>
        <div class="key">account :</div>
        <div class="value"><input /></div>
      </li>
    </ul>
    <div class="save">save</div>
  </div>
</template>


<style scoped>
  .account { padding : 10px; }
  .list { border-top : dashed 1px #f0f0f0; margin-top : 10px; background-color: #fff;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .list li { padding : 0 10px 0 80px; height : 40px; line-height: 30px; border-bottom : solid 1px #f0f0f0; }
  .list li:last-child { border-bottom : 0; }
  .list li:after { content:""; display: block; clear:both; }
  .list .key { float : left; width : 70px; margin-left : -70px; height : 40px; line-height: 40px; }
  .list .key em { color : red; font-style: normal; margin-right :5px; position: relative; top : 3px; display: inline-block; width : 5px; }
  .list .value { position: relative; }
  .list input { height : 40px; display: inline-block; width : 100%; border : none; }  

  .save { background-color: #eee; margin-top : 20px; height : 40px; line-height: 40px; text-align: center; border-radius : 22px; }
</style>

<script>
  export default {
    components : {
    },
    data : function() {
      return {
      }
    }
  }
</script>