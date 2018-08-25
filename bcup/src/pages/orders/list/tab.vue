<template>  
  <div class="orderlist-tab">
    <ul class="list">
      <li v-for="item in ['all','wait','working','finished','other']" :key="item">
        <span class="text" :class="{current : item == 'all' }">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .orderlist-tab { position: fixed; top : 0; left : 0; width : 100%; box-shadow : 0 5px 5px rgba( 100, 100, 100, 0.1 ); z-index: 100; }
  .list li { display: inline-block; height : 40px; width : 20%; background-color: #fff; text-align: center; }
  .list li .text { display: inline-block; height : 100%; line-height: 40px; padding : 0 5px; }
  .list li .text.current { border-bottom : solid 2px; }
</style>

<script>
  export default {
    data : function() {
      return {
      }
    }
  }
</script>