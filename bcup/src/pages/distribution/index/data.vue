<template>
  <div class="data">
    <div class="data-line clearfix">
      <div class="key">近30营业额:</div>
      <div class="value">
        <div class="line">
          <div class="color"  :style="{width:pageInfo.thirtySale/10000+'%'}"></div>
          <div class="tag"  :style="{left: pageInfo.thirtySale /10000+'%'}">{{fixPrice( pageInfo.thirtySale )}}</div>
        </div>
      </div>
    </div>
    <div class="data-line has-line clearfix">
      <div class="key">近30天返佣:</div>
      <div class="value">
        <div class="line">
          <div class="color"  :style="{width: pageInfo.thirtyRakeBack/10000+'%'}"></div>
          <div class="tag" :style="{left:pageInfo.thirtyRakeBack /10000+'%'}">{{fixPrice( pageInfo.thirtyRakeBack )}}</div>
        </div>
      </div>
    </div>

    <div class="data-line clearfix">
      <div class="key price">总返佣:</div>
      <div class="value price">
        ￥<em>{{ fixPrice( pageInfo.totalRakeBack ) }}</em>
      </div>
    </div>
    <div class="data-line clearfix">
      <div class="key price">总返佣单数:</div>
      <div class="value allnum">
        {{ pageInfo.totalOrderCount }}
      </div>
    </div>

    <div class="data-line clearfix">
      <div class="key price">今日销售额:</div>
      <div class="value allnum price black">
      ￥<em>{{ fixPrice( pageInfo.todaySale ) }}</em>
      </div>
    </div>

    <div class="data-line clearfix">
      <div class="key price">今日总返佣:</div>
      <div class="value allnum price black">
       ￥<em>{{ fixPrice( pageInfo.todayRakeBack ) }}</em>
      </div>      
    </div>    

    <ul class="list">
      <li class="clearfix" @click="showSharePop">
        <div class="key">邀请达人</div>
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </li>
      <router-link tag="li" class="clearfix" :to="{ path : '/distribution/rakebackrecord',query:{type:1} }">
        <div class="key">返佣记录</div>
        累计总返佣￥{{fixPrice( pageInfo.totalRakeBack )  }}
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
      <router-link tag="li" class="clearfix" :to="{ path : '/distribution/orders',query:{type:1} }">
        <div class="key">订单记录</div>
        共{{ pageInfo.totalOrderCount }}单
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
    </ul>

    <div class="sharePop" v-if="showPop">
      <div class="pop">
        <div class="close" @click="hideSharePop">
          <img src="/static/cross.png"/>
        </div>
        <img :src="shareImgUrl"/>
      </div>
    </div>

  </div>
</template>


<style scoped>
  .data { padding : 30px 10px 0 10px; background-color: #fff; position: relative; }
  .data-line { padding : 10px 0 10px 90px; }
  .data-line.has-line { margin-top : 30px; }
  .data-line .key { float : left; margin-left : -90px; }
  .key.price { margin-top : 6px; }
  .value.price { font-size : 14px; font-weight: bold; color : #ef8d56; }
  .value.price em { font-size : 24px; font-style: normal; }
  .value.price.black { color : #2c3e50; }
  .allnum { font-size : 24px; font-size : bold; }
  .data-line .line,
  .data-line .line .color { width : 100%; background-color: #efefef; height : 10px; border-radius : 10px; margin-top : 3px; position: relative; }
  .data-line .line .color { background-color: #ee8e34; }
  .data-line .line .tag { background-color: #ee8e34;color: #fff; position: absolute; height : 20px; line-height: 20px; padding : 0 5px; border-radius : 5px; top : -30px; border-bottom-left-radius: 0; }
  .data-line .line .tag:after { content : ''; display: block; width: 0; height: 0; /*border-left: 5px solid transparent; */border-right: 5px solid transparent; border-top: 4px solid  #ee8e34; position: absolute; left : 0px; bottom : -4px; }

  .list li { text-align: right; padding : 13px 0; border-top : solid 1px #f0f0f0; color : #999; }
  .list li .key { float : left; color : #2c3e50; }
  .list li .more { float : right; margin-left : 5px; }
  .list li .more img { width : 18px; height : 18px; }

  .sharePop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10000;
  }
  .sharePop {
    text-align: center;
  }

  .pop {
    margin: 0 auto;
    width: 70%;
    margin-top: 10%;
    position: relative;
  }

  .pop .close {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    top: -20px;
    right: -20px;
    overflow : hidden;
    position: absolute;
  }

  .pop .close img {
    width : 24px;
    height : 24px;
    position: absolute;
    left : 8px;
    top : 8px;
  }

  .pop img {
    width: 100%;
    background-color: #fff;
  }  
</style>

<script>
  import utils from '@/common/utils/utils'
  import config from '@/config.js'

  export default {
    props : ['pageInfo'],
    components : {
    },
    data : function() {
      return {
        showPop: false
      }
    },

    methods : {
      fixPrice : utils.fixPrice,
      showSharePop: function () {
        this.showPop = true;
        this.shareImgUrl = this.shareImgUrl || config.host + '/app/user/shareimage';
      },
      hideSharePop: function () {
        this.showPop = false;
        this.shareImgUrl = '';
      },
    }
  }
</script>
