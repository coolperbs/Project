<template>
    <div class="userinfo">
      <div class="logo"><img :src="item.user?item.user.avatarUrl:''"/></div>
      <div class="info">
        <div class="name">{{item.user?item.user.nickName:''}}</div>
        <div class="sub">id:{{item.user?item.user.id:''}}</div>
      </div>
    </div>
</template>


<style scoped>
  .userinfo { height : 80px; background: linear-gradient( #EF648F,#ef8d56 ); color : #fff; padding-left : 70px; }
  .info { position: relative; top : 20px; }
  .info .name { font-size : 20px; }
  .info .sub { font-size : 12px; color : #fff; }
  .userinfo .logo { height : 50px; width : 50px; border-radius : 50%; background-color: #ccc; float: left; margin-left : -60px; margin-top : 15px; overflow: hidden}
  .userinfo .logo img{
    height: inherit;
    width: inherit;
  }
</style>

<script>
  export default {
    props:{
      item:{}
    }
  }
</script>
