<template>
  <div class="data">
    <div class="data-line clearfix">
      <div class="key">近30营业额:</div>
      <div class="value">
        <div class="line">
          <div class="color"  :style="{width:fixPrice( pageInfo.thirtyRakeBack )/1000+'%'}"></div>
          <div class="tag"  :style="{left:fixPrice( pageInfo.thirtyRakeBack )/1000+'%'}">{{fixPrice( pageInfo.thirtyRakeBack )}}</div>
        </div>
      </div>
    </div>
    <div class="data-line has-line clearfix">
      <div class="key">近30天返佣:</div>
      <div class="value">
        <div class="line">
          <div class="color"  :style="{width:fixPrice( pageInfo.thirtySale )/10000+'%'}"></div>
          <div class="tag" :style="{left:fixPrice( pageInfo.thirtySale )/10000+'%'}">{{fixPrice( pageInfo.thirtySale )}}</div>
        </div>
      </div>
    </div>
    <div class="data-line clearfix">
      <div class="key">总返佣:</div>
      <div class="value">
        {{ fixPrice( pageInfo.totalRakeBack ) }}
      </div>
    </div>
    <div class="data-line clearfix">
      <div class="key">总返佣单数:</div>
      <div class="value">
        {{ pageInfo.totalOrderCount }}
      </div>
    </div>

    <ul class="list">
      <router-link tag="li" class="clearfix" :to="{ path : '/distribution/rakebackrecord',query:{type:1} }">
        <div class="key">返佣记录</div>
        累计总返佣￥{{ pageInfo.totalRakeBack }}
        <div class="more">></div>
      </router-link>
      <router-link tag="li" class="clearfix" :to="{ path : '/distribution/orders',query:{type:1} }">
        <div class="key">订单记录</div>
        共{{ pageInfo.totalOrderCount }}单
        <div class="more">></div>
      </router-link>
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
  .data-line .line .tag { background-color: #ee8e34;color: #fff; position: absolute; height : 20px; line-height: 20px; padding : 0 5px; border-radius : 5px; top : -30px; left : 20%; }
  .data-line .line .tag:after { content : ''; display: block; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid  #ee8e34; position: absolute; left : 50%; margin-left : -5px; bottom : -6px; }

  .list li { text-align: right; padding : 13px 0; border-top : solid 1px #f0f0f0; color : #999; }
  .list li .key { float : left; color : #2c3e50; }
  .list li .more { float : right; margin-left : 5px; }
</style>

<script>
  import utils from '@/common/utils/utils'

  export default {
    props : ['pageInfo'],
    components : {
    },
    data : function() {
      return {
      }
    },
    methods : {
      fixPrice : utils.fixPrice
    }
  }
</script>
