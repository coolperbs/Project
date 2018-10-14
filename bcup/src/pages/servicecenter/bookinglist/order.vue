<template>
  <div class="order">
  <!--  <div class="status">{{fixEnum(item)}}</div>-->
    <div class="main ellipsis-2">{{item.wareSkuStore.features}}{{item.wareSkuStore.subTitle}}</div>
    <ul class="list">
      <li>
        <div class="key">到店支付:</div>
        <div class="value">￥{{item.wareStockOrder.plusPrice}}</div>
      </li>
      <li>
        <div class="key">名称:</div>
        <div class="value">{{item.username}}</div>
      </li>
      <li>
        <div class="key">手机号 :</div>
        <div class="value">{{item.userphone}}</div>
      </li>
      <li>
        <div class="key">订单号 :</div>
        <div class="value">
          {{item.orderId}}
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .order {
    display: block;
    padding: 10px 10px 0 10px;
    position: relative;
  }

  .status {
    padding: 5px 10px;
    background-color: #5f3f95;
    color: #fff;
    position: absolute;
    left: -5px;
    top: 5px;
  }

  .status:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 3px solid #000;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: 0;
    bottom: -5px;
  }

  .main {
    margin-top: 30px;
    font-size : 18px;
  }

  .list {
    border-top: dashed 1px #f0f0f0;
    margin-top: 10px;
    padding : 5px 0;
  }

  .list li {
    padding: 0 10px 0 70px;
    height: 30px;
    line-height: 30px;
  }

  .list li:after {
    content: "";
    display: block;
    clear: both;
  }

  .list .key {
    float: left;
    width: 70px;
    margin-left: -70px;
  }

  .list .key em {
    color: red;
    font-style: normal;
    margin-right: 5px;
    position: relative;
    top: 3px;
    display: inline-block;
    width: 5px;
  }

  .list .value {
    position: relative;
  }

  .list input {
    height: 30px;
    display: inline-block;
    width: 100%;
    border: none;
  }

  .act {
    border-top: dashed 1px #f0f0f0;
    padding: 10px 0;
    text-align: right;
  }

  .act .btn {
    display: inline-block;
    border: 1px solid #eee;
    padding: 5px 15px;
    background: linear-gradient( #ffff, #f0f0f0 );
    border-radius: 20px;
  }

  .act .btn.pay {
    background-color : #ff6e1d;
    color: #fff;
  }
</style>

<script>
  import ENUM from '@/pages/distribution/enum'
  import orderService from '@/services/order/order'
  import payServ from '@/services/pay/pay'
  import utils from '@/common/utils/utils'
  export default {
    props: ['item'],
    methods: {
      fixEnum (el) {
        return ENUM[el.orderStatus] || ''
      }
    }
  }
</script>
