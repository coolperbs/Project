<template>
  <div class="new-order">
    <div class="time">
      {{
        formatDateTime( item.created ).year + '年' +
        formatDateTime( item.created ).month + '月' +
        formatDateTime( item.created ).day + '日' + ' ' +

        formatDateTime( item.created ).hour + ':' +
        formatDateTime( item.created ).second + ':' +
        formatDateTime( item.created ).minute
      }}
    </div>
    <div class="desc" :class="{ pay : item.type == 2 }">
      {{ item.type == 2 ? '消费' : '充值'}} {{ fixPrice( item.price ) }} 元
    </div>
    <!--<div class="status">{{ item.type == 1 ? '消费' : '充值' }}</div>
    <ul class="list">
      <li>
        <div class="key">名称:</div>
        <div class="value">{{item.userName}}</div>
      </li>
      <li>
        <div class="key">手机号 :</div>
        <div class="value">{{item.userPhone}}</div>
      </li>
      <li>
        <div class="key">订单号 :</div>
        <div class="value">
          {{item.orderId}}
        </div>
      </li>
    </ul>-->
  </div>
</template>


<style scoped>
  .new-order { padding : 15px 10px; display: flex; justify-content: space-between; }

  .new-order .desc { color : green; }
  .new-order .desc.pay { color : red;  }

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
    background:  #fff ;
    border-radius: 20px;
  }

  .act .btn.pay {
    background : #ff6e1d !important;
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
      fixPrice: utils.fixPrice,
      formatDateTime : utils.formatDateTime
    }
  }
</script>
