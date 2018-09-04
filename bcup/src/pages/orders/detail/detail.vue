<template>
  <div class="checkout">
    <b-header/>
    <checkout-info class="mod"/>
    <checkout-user class="mod"/>
    <checkout-order class="mod"/>
    <checkout-submit />
  </div>
</template>


<style scoped>
  .checkout { padding : 40px 10px 74px 10px; }
  .mod { border-radius: 5px; background-color: #fff; margin-top : 10px;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .mod:first-child { margin-top : 0; }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import checkoutInfo from './info'
  import checkoutOrder from './order'
  import checkoutUser from './user'
  import checkoutSubmit from './submit'
  import orderServ from '@/services/order/order'

  export default {
    components : {
      bHeader, checkoutInfo, checkoutOrder, checkoutSubmit, checkoutUser
    },
    data : function() {
      return {
      }
    },
    mounted : function() {
      let self = this;
      orderServ.get( { orderId : this.$route.query.orderid }, function( res ) {
      } );
    }
  }
</script>