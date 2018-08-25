<template>
  <div class="mine">
    <div class="head">
      <div class="logo"><img /></div>
      <div class="info">
        <div class="name">name</div>
        <div class="sub">id:subinfo</div>
      </div>
    </div>

    <ul class="list">
      <li>
        <router-link :to="{path:'/orders/list'}">
        <img src=""/>order
        <div class="icon">></div>
        </router-link>
      </li>
      <li class="sub clearfix">
        <router-link :to="{path:'/orders/list'}">
        <div class="cell">
          <img />
          <div class="text">wait</div>
        </div>
        <div class="cell">
          <img />
          <div class="text">working</div>
        </div>
        <div class="cell">
          <img />
          <div class="text">finished</div>
        </div>
        <div class="cell">
          <img />
          <div class="text">other</div>
        </div>
        </router-link>
      </li>
    </ul>
    <ul class="list">
      <li>
        <router-link :to="{path:'/distribution/index'}">
          <img src=""/>superman
          <div class="icon">></div>
        </router-link>
      </li>
      <li class="sub">
        <router-link :to="{path:'/distribution/index'}">
          <div class="cell">
            <img />
            <div class="text">wait</div>
          </div>
          <div class="cell">
            <img />
            <div class="text">working</div>
          </div>
          <div class="cell">
            <img />
            <div class="text">finished</div>
          </div>
          <div class="cell">
            <img />
            <div class="text">other</div>
          </div>  
        </router-link>      
      </li>
    </ul>
  </div>

</template>


<style scoped>
  .mine {}
  .head { height : 80px; background-color: #eee; padding-left : 70px; }
  .info { position: relative; top : 20px; }
  .info .name { font-size : 20px; }
  .info .sub { font-size : 12px; color : #999; }
  .head .logo { height : 50px; width : 50px; border-radius : 50%; background-color: #ccc; float: left; margin-left : -60px; margin-top : 15px; }

  .list { margin-top : 10px; background-color: #fff; box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .list li { height : 50px; border-bottom: solid 1px #f0f0f0; line-height: 50px; padding : 0 20px 0 10px; }
  .list li:last-child { border-bottom : 0; }
  .list li .icon { float : right; margin-right : -10px; }

  .list li.sub { height : 75px; }
  .list li.sub .cell { width : 25%; float : left; height : 100%; position: realtive; }
  .list li.sub .cell img { width : 40px; height : 40px; background-color: #ccc; margin: 0 auto; display: block; margin-top : 10px; }
  .list li.sub .cell .text { line-height : 18px; text-align: center; margin-top : 1px; }
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