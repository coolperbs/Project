<template>
  <div>
    <userinfo/>
    <saledata class="mod"/>
    <entrys class="mod"/>
  </div>
</template>


<style scoped>
  .mod { box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); margin-bottom : 20px; }
</style>

<script>
  import userinfo from './userinfo'
  import saledata from './data'
  import entrys from './entrys'

  export default {
    components : {
      userinfo, saledata, entrys
    },
    data : function() {
      return {
      }
    }
  }
</script>