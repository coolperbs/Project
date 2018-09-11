<template>
  <router-link :to="{ path : '/orders/detail' }" class="order">
    <div class="main clearfix">
      <div class="text ellipsis-2">{{item.wareVO.title}}
      </div>
      <div class="price">+{{fixPrice(item.userMoney.price)}}</div>
    </div>
    <div class="time">{{fixTime(item.userMoney.created)}}</div>
  </router-link>
</template>


<style scoped>
    .order { display: block; padding : 10px 10px 0 10px; position: relative; }
    .status { padding : 5px 10px; background-color: #ccc; color : #fff; position: absolute; left : -5px; top : 5px; }
    .status:after { content: ''; display: block; width: 0; height: 0; border: 3px solid gray; border-left: 3px solid transparent; border-bottom: 3px solid transparent; position: absolute; left : 0; bottom : -5px; }
    .main { padding-right : 80px; }
    .main .text { float : left; }
    .price { float : right; margin-right: -80px; width : 70px; text-align: center; line-height: 60px; height : 30px; font-size : 20px; }

    .time { padding : 10px 0; color : #999; }

    .act { border-top : dashed 1px #f0f0f0; padding : 10px 0; text-align: right; }
    .act .btn { display: inline-block; background-color: #ccc; padding : 8px 15px; border-radius : 20px; }
</style>

<script>
  import utils from '@/common/utils/utils'
  export default {
    props:{
      item:{
        required:true
      }
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
