<template>
  <div class="data">
    <!--<div class="charts clearfix">
      <div class="cell" v-for="item in [1,2,3,4,5,6,7,8]" :key="item">
        <div class="line">
          <div class="back" style="height : 50%;"></div>
          <div class="color" style="height : 50%;"></div>
        </div>
        <div class="text">10m</div>
      </div>
    </div>-->

    <div class="data-line clearfix">
      <div class="key">all sale:</div>
      <div class="value">
        10.00
      </div>
    </div>

    <div class="data-line clearfix">
      <div class="key">all rake-back:</div>
      <div class="value">
        1.0
      </div>
    </div>

  </div>
</template>


<style scoped>
  .data { padding : 30px 10px 0 10px; background-color: #fff; }
  .data-line { padding : 10px 0 10px 90px; }
  .data-line .key { float : left; margin-left : -90px; }

  .charts .cell { width : 12.5%; float : left; }
  .charts .cell .line { height : 200px; width : 30%; margin : 0 auto; }
  .charts .cell .line .back { background-color: transparent; }
  .charts .cell .line .color { background-color : #ccc; position: relative; }
  .charts .cell .line .color .tag { font-size : 10px; margin : 0 auto; }
  .charts .cell .text { text-align: center; padding : 3px 0; font-size : 12px; }

  .list li { text-align: right; padding : 13px 0; border-top : solid 1px #f0f0f0; color : #999; }
  .list li .key { float : left; color : #2c3e50; }
  .list li .more { float : right; margin-left : 5px; }

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
