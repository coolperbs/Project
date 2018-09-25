<template>
  <div class="checkout-submit">
    <div v-if="data.order.orderStatus==8" class="btn pay" @click="orderGoPayEvt">去支付</div>
    <div v-if="data.order.orderStatus==8" class="btn pay" @click="orderCancelEvt">取消</div>
    <div v-if="data.order.orderStatus==512" class="btn pay" @click="submit">申请返佣</div>
  </div>
</template>


<style scoped>
  .checkout-submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    display: flex;

  }

  .btn {
    height: 44px;
    background-color: #fff;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;
    width: 100%;
    margin-right: 10px;
  }
  .btn:last-child{
    margin-right: 0;
  }
   .btn.pay{
    border:1px solid #ee8e34;
    color: #ee8e34;
  }
</style>

<script>
  import orderService from '@/services/order/order'
  import payServ from '@/services/pay/pay'
  import utils from '@/common/utils/utils'
  export default {
    props: {
      data: {}
    },
    methods: {
      submit: function () {
        //todo 申请返佣
      },
      orderGoPayEvt(){
        payServ.getPayInfo( { orderId : this.data.order.orderId }, function( payRes ) {
          if ( utils.isErrorRes( payRes ) ) {
            utils.showError( payRes.msg || '创建订单失败' );
            window.location.reload()
            return;
          }
          // 3.换起微信支付
          payServ.WXPay( payRes.data, function( wxpayRes ) {
            window.location.reload()
          } );
        } );
      },
      orderCancelEvt () {
        orderService.cancelOrder({orderId: this.$route.query.orderid}, (res) => {
          window.location.reload()
        })
      }
    }
  }
</script>
