<template>
    <div class="userinfo">
      <div class="logo"><img /></div>
      <div class="info">
        <div class="name">name</div>
        <div class="sub">id:subinfo</div>
      </div>
    </div>
</template>


<style scoped>
  .userinfo { height : 80px; background-color: #eee; padding-left : 70px; }
  .info { position: relative; top : 20px; }
  .info .name { font-size : 20px; }
  .info .sub { font-size : 12px; color : #999; }
  .userinfo .logo { height : 50px; width : 50px; border-radius : 50%; background-color: #ccc; float: left; margin-left : -60px; margin-top : 15px; }
</style>

<script>
  export default {
    components : {
    },
    data : function() {
      return {
      }
    }
  }
</script>