<template>
  <div class="member clearfix">
    <div class="logo">
      <div class="num">{{rank}}</div>
      <img :src="item.avatarUrl"/>
    </div>
    <div class="info">
      <div class="name">{{item.userName}}</div>
      <div class="sub"></div>
    </div>
    <div class="sales">
      ￥{{fixPrice(item.totalRakeBack)}}
    </div>
  </div>
</template>


<style scoped>
  .member { height : 60px; padding : 10px ; display: flex;justify-content: flex-start ;align-items: center;}
  .member .logo {  display: flex;align-items: center;}
  .member img { width : 50px; height : 50px; margin : 5px 0 0 5px; background-color: #ccc; border-radius : 50%; }
  .member .num {  font-size : 20px; font-weight : bold; font-style : italic; }
  .member .info {display: flex;width: 100%;margin-left: 10px;}
  .member .info .name { font-weight : bold; }
  .member .info .sub { font-size : 12px;  color : #999; }
  .member .sales { text-align: center; line-height: 60px; font-size : 16px; }
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
