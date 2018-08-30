<template>
  <div class="team">
    <saledata/>
    <entrys class="mod"/>
    <div class="invite">apply</div>
  </div>
</template>


<style scoped>
  .team { padding-bottom : 20px; }
  .mod { box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); margin-bottom : 20px; }

  .invite { background-color: #eee; margin : 0 10px; height : 44px; line-height: 44px; text-align: center; border-radius : 22px; }
</style>

<script>
  import saledata from './data'
  import entrys from './entrys'

  export default {
    components : {
      saledata, entrys
    },
    data : function() {
      return {
      }
    }
  }
</script>