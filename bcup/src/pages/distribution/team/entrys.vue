<template>
  <div class="entrys">
    <ul class="list">
      <router-link tag="li" :to="{path : '/distribution/rakebackrecord',query:{type:2}}" class="clearfix">
        <div class="key">团队订单</div>
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
      <router-link tag="li" :to="{path : '/distribution/orders',query:{type:2}}" class="clearfix">
        <div class="key">团队返佣</div>
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
      <router-link tag="li" :to="{ path : '/distribution/rank' }" class="clearfix">
        <div class="key">排行榜</div>
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
    </ul>
  </div>
</template>


<style scoped>
  .entrys { background-color: #fff; padding : 0 10px; }

  .title { padding : 10px 0; }
  .data { }


  .list li { text-align: right; padding : 13px 0; border-top : solid 1px #f0f0f0; color : #999; }
  .list li .key { float : left; color : #2c3e50; }
  .list li .more { float : right; margin-left : 5px; }
  .list li .more img { width : 18px; height : 18px; }  
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
