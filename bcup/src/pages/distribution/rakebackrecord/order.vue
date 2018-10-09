<template>
  <router-link :to="{ path : '/orders/detail' ,query:{orderid:item.order.orderId}}" class="order">
    <div class="main clearfix">
      <div class="text ellipsis-2">{{item.wareVO.title}}
      </div>
      <div class="price">+<em>{{fixPrice(item.userMoney.price)}}</em></div>
    </div>
    <div class="time">{{fixTime(item.order.orderTime)}}</div>
  </router-link>
</template>


<style scoped>
    .order { display: block; padding : 10px 10px 0 10px; position: relative; }
    .status { padding : 5px 10px; background-color: #ccc; color : #fff; position: absolute; left : -5px; top : 5px; }
    .status:after { content: ''; display: block; width: 0; height: 0; border: 3px solid gray; border-left: 3px solid transparent; border-bottom: 3px solid transparent; position: absolute; left : 0; bottom : -5px; }
    .main { padding-right : 80px; font-size : 18px; }
    .main .text { float : left; }
    .price { float : right; margin-right: -80px; width : 80px; text-align: center; line-height: 60px; height : 30px; color : #ef8d56; }
    .price em { font-size : 24px; font-weight : bold; font-style: normal; }

    .time { padding : 10px 0; color : #999; }

    .act { border-top : dashed 1px #f0f0f0; padding : 10px 0; text-align: right; }
    .act .btn { display: inline-block; background-color: #ccc; padding : 8px 15px; border-radius : 20px; }
</style>

<script>
  import utils from '@/common/utils/utils'
  export default {
    props:{
      item:{}
    },
    methods:{
      fixPrice(val){
        return utils.fixPrice(val)
      },
      fixTime(val){
        let time=utils.formatDateTime(val)
        return `${time.year}-${time.month}-${time.day}   ${time.hour}:${time.minute}`
      }
    }
  }
</script>
