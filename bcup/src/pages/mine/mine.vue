<template>
  <div class="mine">
    <div class="head">
      <div class="logo"><img :src="userData.avatarUrl"/></div>
      <div class="info">
        <div class="name">{{userData.nickName}}</div>
        <div class="sub">id:{{userData.id}}</div>
      </div>
    </div>

    <div class="mod">
      <div class="title">我的店铺</div>
      <div class="row">
        <div class="sale-info">
          <div class="sub-title">个人销售额<em>(元)</em></div>
          <div class="price orange">{{ fixPrice( pageInfo.totalSale ) }}</div>
          <div class="sub-title">今日销售额<em>(元)</em>：{{ fixPrice( pageInfo.todaySale ) }}</div>
        </div>

        <div class="sale-info">
          <div class="sub-title">个人收益<em>(元)</em></div>
          <div class="price">{{ fixPrice( pageInfo.totalRakeBack ) }}</div>
          <div class="sub-title">今日收益<em>(元)</em>：{{ fixPrice( pageInfo.todayRakeBack ) }}</div>
        </div>
      </div>

      <div class="row">
        <div class="sale-info">
          <div class="sub-title">团队销售额<em>(元)</em>：{{ fixPrice( totalTraderSale ) }}</div>
        </div>

        <div class="sale-info">
          <div class="sub-title">团队收益<em>(元)</em>：{{ fixPrice( totalTraderBack ) }}</div>
        </div>
      </div>
    </div>

    <div class="mod" >
      <div class="title">
        <router-link tag="div" class="text" :to="{path : '/distribution/rank'}">我的团队</router-link>
        <div class="btn"  @click="showSharePop">邀请达人</div>
      </div>
    </div>

    <ul class="list ordercenter">
      <router-link tag="li" class="mod-title" :to="{path:'/orders/list?type=1'}">
        <img src=""/>订单
        <div class="icon"><img src="static/arrow-right.png"></div>
      </router-link>
      <li class="sub clearfix">
        <router-link tag="div" :to="{path:'/orders/list?type=8'}" class="cell">
          <img src="static/order-wait.png"/>
          <div class="text">待支付</div>
        </router-link>
        <router-link tag="div" :to="{path:'/orders/list?type=16'}" class="cell">
          <img src="static/order-pay.png"/>
          <div class="text">待消费</div> <!-- 已支付 -->
        </router-link>
        <router-link tag="div" :to="{path:'/orders/list?type=512'}" class="cell">
          <img src="static/order-finished.png"/>
          <div class="text">已完成</div>
        </router-link>
       <!-- <router-link tag="div" :to="{path:'/orders/list?type=1024'}" class="cell">
          <img src="static/order-canceled.png"/>
          <div class="text">已取消</div>
        </router-link>-->
      </li>
    </ul>

    <ul class="list services">
      <router-link tag="li" class="mod-title" :to="{path:'/servicecenter'}">
        <img src=""/>服务中心
        <div class="icon"><img src="static/arrow-right.png"></div>
      </router-link>
      <li class="sub clearfix">
       <!-- <router-link tag="div" :to="{path:'/servicecenter/bookinglist'}" class="cell">
          <img src="static/yuyuedingdan.png"/>
          <div class="text">我的预约</div>
        </router-link>-->
        <router-link tag="div" :to="{path:'/servicecenter/findecode'}" class="cell">
          <img src="static/code.png"/>
          <div class="text">找回核销码</div>
        </router-link>
        <router-link tag="div" :to="{path:'/servicecenter/bookinguse'}" class="cell">
          <img src="static/pre-order.png"/>
          <div class="text">预约使用</div>
        </router-link>
        <router-link tag="div" :to="{path:'/servicecenter'}" class="cell">
          <img src="static/question.png"/>
          <div class="text">常见问题</div>
        </router-link>
      </li>
    </ul>

    <ul class="list" v-if="userData.trader==1">
      <router-link tag="li"  class="mod-title" :to="{path:'/distribution/index'}">
        <img src=""/>达人后台
        <div class="icon"><img src="static/arrow-right.png"></div>
      </router-link>
      <li class="sub">
        <router-link class="cell" :to="{path:'/distribution/index'}">
          <img src="static/fanyong.png"/>
          <div class="text">返佣记录</div>
        </router-link>
        <router-link class="cell" :to="{path:'/distribution/orders?type=1'}">
          <img  src="static/order-list.png"/>
          <div class="text">订单记录</div>
        </router-link>
        <router-link class="cell" :to="{path:'/distribution/team'}">
          <img src="static/team.png"/>
          <div class="text">达人团队</div>
        </router-link>
        <router-link class="cell" :to="{path:'/distribution/rakeback'}">
          <img src="static/money.png"/>
          <div class="text">提现</div>
        </router-link>
      </li>
    </ul>

    <!--<ul class="list services">
      <router-link tag="li" class="mod-title" :to="{path:'/servicecenter/bookinglist'}">
        <img src=""/>我的预约
        <div class="icon"><img src="static/arrow-right.png"></div>
      </router-link>
    </ul>-->
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
  .mine {
  }

  .mod { margin-top : 10px; background-color : #fff; padding : 10px; }
  .mod .title { display: flex; font-size : 16px; align-items: center; }
  .mod .title .btn { border-radius : 8px; background-color: #ef8d56; color : #fff; padding : 5px 10px; font-size : 16px; }
  .mod .title .text { width : 50%; }
  .mod .row { border-bottom : solid 1px #f0f0f0; padding : 0 10px 10px 10px; margin-top : 10px; display: flex; }
  .mod .row:last-child { border-bottom : 0; }
  .mod .row .sale-info { width : 50%; }
  .mod .row .sale-info .sub-title em { color : #999; margin : 0 5px; font-style : normal; }
  .mod .row .sale-info .price { font-size : 24px; font-weight : bold; }
  .mod .row .sale-info .price.orange { color : #ef8d56; }

  .mod-title {
    font-size : 16px;
  }

  .head {
    height: 80px;
    background: linear-gradient( #EF648F,#ef8d56 );
    color : #fff;
    padding-left: 70px;
  }

  .info {
    position: relative;
    top: 20px;
  }

  .info .name {
    font-weight : bold;
    font-size: 20px;
  }

  .info .sub {
    font-size: 12px;
  }

  .head .logo {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #ccc;
    float: left;
    margin-left: -60px;
    margin-top: 15px;
    overflow: hidden
  }

  .head .logo img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .list {
    margin-top: 10px;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }

  .list li {
    height: 50px;
    border-bottom: solid 1px #f0f0f0;
    line-height: 50px;
    padding: 0 20px 0 10px;
  }

  .list li:last-child {
    border-bottom: 0;
  }

  .list li .icon {
    float: right;
    margin-right: -10px;
  }

  .list li .icon img {
    width : 24px;
    height : 24px;
  }


  .list li.sub {
    height: 90px;
    display: flex;
    justify-content: space-around;
  }

  .list li.sub .cell {
    width: 100%;
    float: left;
    height: 100%;
    position: realtive;
  }

  .list.ordercenter li.sub .cell {
    width : 33.33%;
  }


  .list li.sub .cell img {
    width: 28px;
    height: 28px;
    margin: 0 auto;
    display: block;
    margin-top: 15px;
  }

  .list li.sub .cell .text {
    line-height: 18px;
    text-align: center;
    margin-top: 10px;
  }

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
  import distributionService from '@/services/distribution/distribution'
  import utils from '@/common/utils/utils'
  import config from '@/config.js'
  import teamServer from '@/services/team/team'

  export default {
    components: {},
    data: function () {
      return {
        showPop : false,
        userData: {},
        pageInfo : {},
        totalTraderBack : 0,
        totalTraderSale : 0
      }
    },
    methods : {
      fixPrice : utils.fixPrice,
      showSharePop: function ( e ) {
        console.log( e );
        this.showPop = true;
        this.shareImgUrl = this.shareImgUrl || config.host + '/app/user/shareimage';
        return false;
      },
      hideSharePop: function () {
        this.showPop = false;
        this.shareImgUrl = '';
      }
    },
    mounted () {
      var self = this;
      distributionService.getUserInfo((res) => {
        self.userData = res.data;
      })

      distributionService.getBaseInfo( function( baseInfo ) {
        self.pageInfo = baseInfo.data;
      } ); 

      teamServer.getTeam((baseInfo) => {
        self.totalTraderBack = baseInfo.data.totalTraderBack;
        self.totalTraderSale = baseInfo.data.totalTraderSale;
      });
    }
  }
</script>
