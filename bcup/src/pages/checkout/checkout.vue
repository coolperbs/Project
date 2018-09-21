<template>
  <div class="checkout">
    <b-header/>
    <checkout-info v-model="pageInfo" class="mod"/>
    <checkout-order v-model="pageInfo" class="mod" @setData="setData"/>
    <!--<checkout-payment class="mod"/>-->
    <checkout-submit :pageInfo="pageInfo"/>
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
  import detailServ from '@/services/detail/detail'

  export default {
    components : {
      bHeader, checkoutInfo, checkoutOrder, checkoutPayment, checkoutSubmit
    },
    data : function() {
      return {
        pageInfo : { 
          skuInfo : {},
          formInfo : {
            userName : '',
            userPhone : '',
            address : '',
            remark : '',
            payType : 1, // 1=微信, 2=余额
            skuId : '',
            skuNum : 1
          }
        }
      }
    },
    mounted : function() {
      let self = this;
      detailServ.query( { skuId : this.$route.query.skuId }, function( res ) {
        self.pageInfo.skuInfo = res.data || {};
        self.pageInfo.formInfo.skuId = res.data.skuId;
      } );
    },
    methods : {
      setData : function( val ) {
        this.pageInfo = val;
      }
    }
  }
</script>



