<template>
  <div class="checkout-order">
    <ul class="list">
      <li>
        <div class="key">订单时间 :</div>
        <div class="value">{{fixDate(data.order)}}</div>
      </li>
      <li>
        <div class="key">订单号 :</div>
        <div class="value">{{data.order?data.order.orderId:''}}</div>
      </li>
      <li v-if="data.order?data.order.type==2:false">
        <div class="key">快递公司 :</div>
        <div class="value">{{data.order?data.order.transoport:''}}</div>
      </li>
      <li v-if="data.order?data.order.type==2:false">
        <div class="key">运单号 :</div>
        <div class="value">{{data.order?data.order.ecode:''}}</div>
      </li>
      <li v-if="data.order?data.order.type==2:false">
        <div class="key">快递地址 :</div>
        <div class="value">{{data.order?data.order.address:''}}</div>
      </li>
      <li>
        <div class="key">数量 :</div>
        <div class="value">{{data.order?data.order.skuNum:''}}</div>
      </li>
      <li>
        <div class="key">备注 :</div>
        <div class="value">
          {{data.order?data.order.remark:''}}
        </div>
      </li>
      <li class="total">
        <div class="key">价格 :</div>
        <div class="value">
          <span class="all-price"><em>￥</em> {{fixprice(data.order)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .checkout-order {
    padding: 5px 0;
  }

  .title {
    font-size: 12px;
    padding: 10px;
  }

  .list li {
    padding: 5px 10px 5px 90px;
  }

  .list li:after {
    content: "";
    display: block;
    clear: both;
  }

  .list .key {
    float: left;
    width: 70px;
    margin-left: -80px;
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

  .list li.total .key {
    line-height: 30px;
  }

  .list li.total .value {
    font-size: 20px;
    color : #ef8d56;
    font-weight : bold;
  }

  .list li.total .value em {
    font-style: normal;
    font-size: 14px;
  }

  .num-picker {
    height: 30px;
    border: solid 1px #ccc;
    border-radius: 5px;
    display: inline-block;
    overflow: hidden;
    margin-top: 10px;
  }

  .num-picker .num-picker-mod {
    float: left;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 30px;
    border-right: solid 1px #ccc;
    font-size: 24px;
  }

  .num-picker .num-picker-mod:last-child {
    border-right: none;
  }

  .num-picker input.num-picker-mod {
    height: 100%;
    width: 40px;
    font-size: 18px;
  }
</style>

<script>
  import utils from '@/common/utils/utils'

  export default {
    props: {
      data: {}
    },
    methods: {
      fixDate (el) {
        if (el) {
          let time = utils.formatDateTime(el.orderTime)
          return `${time.year}-${time.month}-${time.day}   ${time.hour}:${time.minute}`
        }
      },
      fixprice (order) {
        if (order) {
          return utils.fixPrice(order.payPrice)
        } else {
          return ''
        }
      }
    }
  }
</script>
