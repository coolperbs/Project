<template>
  <div class="entrys">
    <ul class="list">
      <li class="clearfix" @click="forward( '/distribution/team' )">
        <div class="key">team</div>
        <div class="more">></div>
      </li>
      <li class="clearfix" @click="forward( '/distribution/rakeback' )">
        <div class="key">revers</div>
        has $9.00
        <div class="more">></div>
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
</style>

<script>
  import Router from '@/router'

  export default {
    components : {
    },
    methods : {
      forward : function( path ){ 
        Router.push( { path : path } );
      }
    },
    data : function() {
      return {
      }
    }
  }
</script>