<template>
  <div class="member clearfix">
    <div class="logo">
      <div class="num">{{rank}}</div>
      <img :src="item.avatarUrl"/>
    </div>
    <div class="info">
      <div class="name">{{item.nickName ||item.realName}}</div>
      <div class="sub"></div>
    </div>
    <div class="sales">
      ￥<em>{{fixPrice(item.totalRakeBack)}}</em>
    </div>
  </div>
</template>


<style scoped>
  .member { height : 60px; padding : 10px ; display: flex;justify-content: flex-start ;align-items: center;}
  .member .logo {  display: flex;align-items: center;}
  .member img { margin-left : 10px; width : 50px; height : 50px; background-color: #ccc; border-radius : 50%; }
  .member .num { color:#ef8d56; font-size : 20px; font-weight : bold; font-style : italic; width : 30px; text-align: center; font-weight : 28px; }
  .member .info { margin-left : 10px; display: flex;width: 100%;margin-left: 10px;}
  .member .info .name { font-weight : bold; }
  .member .info .sub { font-size : 12px;  color : #999; }
  .member .sales { color : #ef8d56; text-align: center; line-height: 60px; font-size : 16px; }
  .member .sales em { font-size : 24px; font-weight: bold; font-style: normal; }
</style>

<script>
  import utils from '@/common/utils/utils'
  export default {
    props:{
      item:{},
      rank:{}
    },
    methods:{
      fixPrice:utils.fixPrice
    }
  }
</script>
