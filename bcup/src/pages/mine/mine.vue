<template>
  <div class="mine">
    <div class="head">
      <div class="logo"><img :src="userData.avatarUrl"/></div>
      <div class="info">
        <div class="name">{{userData.nickName}}</div>
        <div class="sub">id:{{userData.id}}</div>
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
          <div class="text">已支付</div>
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
        <router-link tag="div" :to="{path:'/servicecenter/bookinglist'}" class="cell">
          <img src="static/yuyuedingdan.png"/>
          <div class="text">我的预约</div>
        </router-link>
        <router-link tag="div" :to="{path:'/servicecenter/findecode'}" class="cell">
          <img src="static/code.png"/>
          <div class="text">找回电子码</div>
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
  </div>

</template>


<style scoped>
  .mine {
  }

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
  }

  .list li.sub .cell {
    width: 25%;
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
</style>

<script>
  import distributionService from '@/services/distribution/distribution'

  export default {
    components: {},
    data: function () {
      return {
        userData: {}
      }
    },
    mounted () {
      distributionService.getUserInfo((res) => {
        this.userData = res.data;
      })
    }
  }
</script>
