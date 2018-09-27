<template>
  <div class="checkout-submit">
    <div class="btn" @click="submitEvt">submit</div>
  </div>
</template>


<style scoped>
  .checkout-submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
  }

  .btn {
    height: 44px;
    background-color: #ccc;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;
  }
</style>

<script>
  import payServ from '@/services/pay/pay'
  import orderServ from '@/services/order/order'
  import utils from '@/common/utils/utils'


  export default {
    props: ['pageInfo'],
    methods: {
      submitEvt: function () {
        // @TODO : 这里要对form格式进行验证，或者和后端商量后端验证，也避免xxs攻击
        debugger
        let that = this;
        if (this.pageInfo.formInfo.userName == '') {
          utils.showError('请输入姓名');
          return
        }
        if (this.pageInfo.formInfo.userPhone == '') {
          utils.showError('请输入手机号');
          return
        }

        // 1.创建订单
        orderServ.create(this.pageInfo.formInfo, function (orderRes) {
          if (utils.isErrorRes(orderRes) || !orderRes.data.orderId) {
            utils.showError(orderRes.msg || '创建订单失败');
            return;
          }
          // 2.获取支付信息
          payServ.getPayInfo({orderId: orderRes.data.orderId}, function (payRes) {
            if (utils.isErrorRes(payRes)) {
              utils.showError(payRes.msg || '创建订单失败');
              Router.push({path: '/orders/detail?orderid=' + orderRes.data.orderId});
              return;
            }
            // 3.换起微信支付
            payServ.WXPay(payRes.data, function (wxpayRes) {
              that.$router.push({path: '/orders/detail?orderid=' + orderRes.data.orderId});
            });
          });
        });
      }
    },
    data: function () {
      return {}
    }
  };
</script>
