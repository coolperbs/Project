<template>  
  <div class="tab">
    <div class="filter clearfix">
      <div class="cell">
        <select>
          <option>time</option>
        </select>
      </div>
      <div class="cell">
        <select>
          <option>status</option>
        </select>
      </div>
    </div>
    <div class="search">
      <div class="input">
        <input placeholder="name/phone/productsname"/>
      </div>
      <div class="btn">search</div>
    </div>
  </div>
</template>


<style scoped>
  .tab { position: fixed; top : 0; left : 0; width : 100%; box-shadow : 0 5px 5px rgba( 100, 100, 100, 0.1 ); z-index: 100; background-color: #fff; }
  .filter .cell { height : 40px; float : left; width : 50%; padding : 5px 10px; }
  .filter .cell select { height : 30px; width : 100%; border : none; }

  .search { padding : 10px 60px 10px 10px; position: relative; }
  .search .input {}
  .search input { padding : 0 10px; width : 100%; height : 30px; line-height: 30px; border-radius : 15px; border  : 0; background-color: #ddd; }
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