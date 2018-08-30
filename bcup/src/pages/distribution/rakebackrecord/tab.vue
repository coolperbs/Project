<template>  
  <div class="orderlist-tab">
    <div class="search">
      <div class="input">
        <input />
      </div>
      <div class="btn">search</div>
    </div>
    <ul class="list">
      <li v-for="item in ['all','shop','team']" :key="item">
        <span class="text" :class="{current : item == 'all' }">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .orderlist-tab { position: fixed; top : 0; left : 0; width : 100%; box-shadow : 0 5px 5px rgba( 100, 100, 100, 0.1 ); z-index: 100; background-color: #fff; }
  .list li { display: inline-block; height : 40px; width : 33.33%; background-color: #fff; text-align: center; }
  .list li .text { display: inline-block; height : 100%; line-height: 40px; padding : 0 5px; }
  .list li .text.current { border-bottom : solid 2px; }

  .search { padding : 10px 60px 10px 10px; position: relative; }
  .search .input {}
  .search input { width : 100%; height : 30px; line-height: 30px; border-radius : 15px; border  : 0; background-color: #ddd; }
  .search .btn { height : 30px; line-height: 30px; width : 40px; overflow: hidden; float : right; position: absolute; right : 10px; top : 10px; }
</style>

<script>
  export default {
    data : function() {
      return {
      }
    }
  }
</script>