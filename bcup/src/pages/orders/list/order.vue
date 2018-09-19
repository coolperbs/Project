<template>
  <router-link tag="div" :to="{ path : '/orders/detail?orderid=' + item.orderId }" class="order">
    <div class="status">{{fixEnum(item)}}</div>
    <div class="main ellipsis-2">{{item.skus[0].title}}{{item.skus[0].subTitle}}</div>
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
    </ul>
    <div class="act clearfix" >
      <div v-if="item.orderStatus==8" class="btn pay" @click="goPay">去支付</div>
      <div v-if="item.orderStatus==8" class="btn pay" @click="cancelEvt">取消</div>
      <div class="btn" @click="goDetail">订单详情</div>
    </div>
  </router-link>
</template>


<style scoped>
  .order {
    display: block;
    padding: 10px 10px 0 10px;
    position: relative;
  }

  .status {
    padding: 5px 10px;
    background-color: #ee8e34;
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
    border: 3px solid #ee8e34;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: 0;
    bottom: -5px;
  }

  .main {
    margin-top: 25px;
  }

  .list {
    border-top: dashed 1px #f0f0f0;
    margin-top: 10px;
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
    background-color: #fff;
    border:1px solid #eee;
    padding: 8px 15px;
    border-radius: 20px;
  }
  .act .btn.pay{
    border:1px solid #ee8e34;
    color: #ee8e34;
  }
</style>

<script>
  import ENUM from '@/pages/distribution/enum'

  export default {
    props: ['item'],
    methods: {
      fixEnum (el) {
        return ENUM[el.orderStatus] || ''
      },
      goPay(){

      },
      goDetail(){

      },
      cancelEvt(){

      }
    }
  }
</script>
