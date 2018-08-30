<template>
  <div class="orderlist">
    <order-tab/>
    <order v-for="order in [1,2,3,4,5]" :key="order" class="mod"/>
  </div>
</template>


<style scoped>
  .orderlist { padding : 90px 10px 20px 10px; }
  .mod { border-radius: 5px; background-color: #fff; margin-top : 10px;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import orderTab from './tab'
  import order from './order'

  export default {
    components : {
      bHeader, orderTab, order
    },
    data : function() {
      return {
      }
    }
  }
</script>