<template>
  <div class="checkout-submit">
    <div class="btn" @click="submitEvt">提交</div>
    <div class="modal" v-if="showModal" @click.self="cancelEvt">
      <div class="box">
        <div class="body">
          <img src="/static/wechat.jpg" style="width: 100%;height: 100%;" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .modal {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    margin: 20px;
    padding: 20px 10px 0 10px;
  }

  .body {
    display: flex;
  }

  .checkout-submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
  }

  .btn {
    height: 44px;
    background-color: #ff6e1d;
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

  var lock = false;
  var timmer = null;

  export default {
    props: ['pageInfo'],
    methods: {
      submitEvt: function () {
        if (timmer) {
          clearTimeout(timmer);
          timmer = null;
        }
        if (lock) {
          return;
        }

        // @TODO : 这里要对form格式进行验证，或者和后端商量后端验证，也避免xxs攻击
        let that = this;
        if (this.pageInfo.formInfo.userName == '') {
          utils.showError('请输入姓名');
          return
        }
        if (this.pageInfo.formInfo.userPhone == '' || this.pageInfo.formInfo.userPhone.length != 11) {
          utils.showError('请输入正确的手机号');
          return
        }
        if (this.pageInfo.formInfo.address == '' && this.pageInfo.formInfo.type == 2) {

          utils.showError('请输入收货地址');
          return
        }

        let forminfo = this.pageInfo.formInfo;
        delete forminfo.type;
        lock = true;
        // 1.创建订单
        orderServ.create(forminfo, function (orderRes) {
          if (utils.isErrorRes(orderRes) || !orderRes.data.orderId) {
            utils.showError(orderRes.msg || '创建订单失败');
            lock = false;
            return;
          }
          that.orderId = orderRes.data.orderId;
          // 2.获取支付信息
          payServ.getPayInfo({orderId: orderRes.data.orderId}, function (payRes) {
            if (utils.isErrorRes(payRes)) {
              utils.showError(payRes.msg || '创建订单失败');
              Router.push({path: '/orders/detail?orderid=' + orderRes.data.orderId});
              lock = false;
              return;
            }
            // 3.换起微信支付
            timmer = setTimeout(function () {
              lock = false;
            }, 500);
            payServ.WXPay(payRes.data, function (wxpayRes) {
              //展示modal
              that.orderId = orderRes.data.orderId;
              that.showModal = true;
            });
          });
        });
      },
      cancelEvt: function () {
        this.showModal = false;
        this.$router.push({path: '/orders/detail?orderid=' + this.orderId});
      }
    },
    data: function () {
      return {
        showModal: false,
        orderId: ''
      }
    }
  };
</script>
