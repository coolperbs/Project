<template>
  <div class="data">
    <div class="data-line clearfix">
      <div class="key">30days:</div>
      <div class="value">
        <div class="line">
          <div class="color" style="width : 20%"></div>
          <div class="tag" style="margin-left : -22.5px;">10.00</div>
        </div>
      </div>
    </div>
    <div class="data-line has-line clearfix">
      <div class="key">30days:</div>
      <div class="value">
        <div class="line">
          <div class="color" style="width : 20%"></div>
          <div class="tag" style="margin-left : -22.5px;">10.00</div>
        </div>
      </div>
    </div>  
    <div class="data-line clearfix">
      <div class="key">all:</div>
      <div class="value">
        10.00
      </div>
    </div>  
    <div class="data-line clearfix">
      <div class="key">all num:</div>
      <div class="value">
        1
      </div>
    </div>    

    <ul class="list">
      <li class="clearfix">
        <router-link :to="{ path : '/distribution/rakebackrecord' }">
          <div class="key">revers</div>
          asfasfasf
          <div class="more">></div>
        </router-link>
      </li>
      <li class="clearfix">
        <div class="key">revers</div>
        asfasfasf
        <div class="more">></div>
      </li>
    </ul>

  </div>
</template>


<style scoped>
  .data { padding : 30px 10px 0 10px; background-color: #fff; }
  .data-line { padding : 10px 0 10px 80px; }
  .data-line.has-line { margin-top : 30px; }
  .data-line .key { float : left; margin-left : -80px; }
  .data-line .line,
  .data-line .line .color { width : 100%; background-color: #ccc; height : 10px; border-radius : 10px; margin-top : 3px; position: relative; }
  .data-line .line .color { background-color: #999; }
  .data-line .line .tag { background-color: #ccc; position: absolute; height : 20px; line-height: 20px; padding : 0 5px; border-radius : 5px; top : -30px; left : 20%; }
  .data-line .line .tag:after { content : ''; display: block; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #ccc; position: absolute; left : 50%; margin-left : -5px; bottom : -6px; }

  .list li { text-align: right; padding : 13px 0; border-top : solid 1px #f0f0f0; color : #999; }
  .list li .key { float : left; color : #2c3e50; }
  .list li .more { float : right; margin-left : 5px; }
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