<template>
  <div class="rank">
    <order-tab/>
    <order v-for="order in [1,2,3,4,5]" :key="order" class="mod"/>
  </div>
</template>


<style scoped>
  .rank { padding : 60px 10px 20px 10px; }
  .mod { background-color: #fff; border-bottom : solid 1px #f0f0f0; }
  .mod:last-child { box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); border-bottom : 0; }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import orderTab from './tab'
  import order from './member'

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