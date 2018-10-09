<template>
  <div class="entrys">
    <ul class="list">
      <li class="clearfix" @click="forward( '/distribution/team' )">
        <div class="key">达人团队</div>
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </li>
      <li class="clearfix" @click="forward( '/distribution/rakeback' )">
        <div class="key">返佣</div>
       已返￥{{fixPrice(item.totalRakeBack)}}
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </li>
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
  import Router from '@/router'
  import utils from '@/common/utils/utils'
  export default {
   props:{
     item:{}
   },
    methods : {
      forward : function( path ){
        Router.push( { path : path } );
      },
      fixPrice : utils.fixPrice
    },
    data : function() {
      return {
      }
    }
  }
</script>
