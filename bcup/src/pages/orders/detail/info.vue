<template>
  <div class="checkout-info">
    <div class="status">{{fixEnum(data)}}</div>
    <div class="main">【预约】{{data.store?data.store.name:''}};{{data.store?data.store.introduce:''}}</div>
    <div class="spec"><span class="tag">地址/电话</span>{{data.store?data.store.address:''}}/{{data.store?data.store.telphone:''}}</div>
  </div>
</template>


<style scoped>
  .checkout-info {
    padding: 10px;
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

  .spec {
    margin-top: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #999;
  }

  .spec .tag {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    padding: 0 10px;
    background-color: #ccc;
    border-radius: 10px;
    margin-right: 10px;
    color: #444;
  }

  .orderinfo {
    border-top: solid 1px #f0f0f0;
    margin-top: 10px;
  }
</style>

<script>
  import ENUM from '@/pages/distribution/enum'

  export default {
    props: {
      data: {}
    },
    methods: {
      fixEnum (el) {
        if (el.order && el.order.orderStatus) {
          return ENUM[el.order.orderStatus]
        } else {
          return ''
        }

      }
    }
  }
</script>
