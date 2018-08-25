<template>
  <div class="checkout">
    <b-header/>
    <checkout-info class="mod"/>
    <checkout-order class="mod"/>
    <!--<checkout-payment class="mod"/>-->
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
  import checkoutInfo from '@/pages/checkout/info'
  import checkoutOrder from '@/pages/checkout/order'
  import checkoutPayment from '@/pages/checkout/payment'
  import checkoutSubmit from '@/pages/checkout/submit'

  export default {
    components : {
      bHeader, checkoutInfo, checkoutOrder, checkoutPayment, checkoutSubmit
    },
    data : function() {
      return {
      }
    }
  }
</script>