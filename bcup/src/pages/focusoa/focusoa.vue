<template>
<div class="page">
 	<div class="focus">
 		<img src="/static/wechat.jpg"/>
 		<div class="title">请识别二维码，关注暴客优品公众号，分享爆款！</div>
 	</div>
 	<div @click="goHome" class="btn">去首页，直接购物</div>
</div>
</template>

<style scoped>
.page { height : 100%; text-align: center; }
.focus { text-align: center; }
.focus .title { font-size : 14px; }
.focus img { width : 60%; margin-top : 100px; }

  .btn {
    margin: 50px 10px 0 10px;
    height: 44px;
    background-color: #ff6e1d;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;
  }
</style>

<script>
	export default {
		methods : {
			goHome : function(){
				this.$router.replace( '/' );
			}
		}	
	}
</script>>