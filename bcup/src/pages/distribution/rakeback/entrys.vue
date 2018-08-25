<template>
  <div class="entrys">
    <ul class="list">
      <li class="clearfix">
        <div class="key">my rake-back</div>
        <div class="more">></div>
      </li>
      <li class="clearfix">
        <div class="key">account</div>
        none
        <div class="more">></div>
      </li>
      <li class="clearfix">
        <div class="key">record</div>
        has $100.00
        <div class="more">></div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .entrys { background-color: #fff; padding : 0 10px; }

  .title { padding : 10px 0; }
  .data { }


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