<template>
  <div class="order">
    <div class="main ellipsis-2">{{item.wareVO.title}}</div>
    <ul class="list">
      <li v-if="fixStatus(item.order.orderStatus)">
        <div class="key">状态 :</div>
        <div class="value">{{fixStatus(item.order.orderStatus)}}</div>
      </li>
      <li>
        <div class="key">订单时间 :</div>
        <div class="value">{{fixTime(item.order.orderTime)}}</div>
      </li>
      <li>
        <div class="key">订单价格 :</div>
        <div class="value">￥{{fixPrice(item.order.payPrice)}}</div>
      </li>
      <li>
        <div class="key">佣金 :</div>
        <div class="value">￥{{fixPrice(item.userMoney.price)}}</div>
      </li>
      <li>
        <div class="key">姓名 :</div>
        <div class="value">{{item.order.userName}}</div>
      </li>
      <li>
        <div class="key">手机号 :</div>
        <div class="value">{{item.order.userPhone}}</div>
      </li>
    </ul>
    <div class="act clearfix">
      <div class="btn">功能按钮</div>
      <router-link :to="{ path : '/orders/detail',query:{orderid:item.order.orderId} }" class="btn">功能按钮</router-link>
    </div>
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
    background-color: #ccc;
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
    border: 3px solid gray;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: 0;
    bottom: -5px;
  }

  .main {
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
    background-color: #ccc;
    padding: 8px 15px;
    border-radius: 20px;
  }
</style>

<script>
  import utils from '@/common/utils/utils'
  import ENUM from '../enum'

  export default {
    props: {
      item: {}
    },
    data: function () {
      return {}
    },
    methods: {
      fixPrice (val) {
        return utils.fixPrice(val)
      },
      fixTime (val) {
        let time = utils.formatDateTime(val)
        return `${time.year}-${time.month}-${time.day}   ${time.hour}:${time.minute}`
      },
      fixStatus (el) {
        return ENUM[el]
      }
    }
  }
</script>
