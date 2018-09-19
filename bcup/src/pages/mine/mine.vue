<template>
  <div class="mine">
    <div class="head">
      <div class="logo"><img :src="userData.avatarUrl"/></div>
      <div class="info">
        <div class="name">{{userData.nickName}}</div>
        <div class="sub">id:{{userData.id}}</div>
      </div>
    </div>
    <ul class="list">
      <router-link tag="li" :to="{path:'/orders/list?type=1'}">
        <img src=""/>订单
        <div class="icon">></div>
      </router-link>
      <li class="sub clearfix">
        <router-link tag="div" :to="{path:'/orders/list?type=5'}" class="cell">
          <img/>
          <div class="text">待支付</div>
        </router-link>
        <router-link tag="div" :to="{path:'/orders/list?type=3'}" class="cell">
          <img/>
          <div class="text">已支付</div>
        </router-link>
        <router-link tag="div" :to="{path:'/orders/list?type=4'}" class="cell">
          <img/>
          <div class="text">已完成</div>
        </router-link>
        <router-link tag="div" :to="{path:'/orders/list?type=2'}" class="cell">
          <img/>
          <div class="text">已取消</div>
        </router-link>
      </li>
    </ul>
    <ul class="list">
      <router-link tag="li" :to="{path:'/distribution/index'}">
        <img src=""/>达人
        <div class="icon">></div>
      </router-link>
      <!--<li class="sub">
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
      </li>-->
    </ul>
  </div>

</template>


<style scoped>
  .mine {
  }

  .head {
    height: 80px;
    background-color: #eee;
    padding-left: 70px;
  }

  .info {
    position: relative;
    top: 20px;
  }

  .info .name {
    font-size: 20px;
  }

  .info .sub {
    font-size: 12px;
    color: #999;
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

  .list li.sub {
    height: 75px;
  }

  .list li.sub .cell {
    width: 25%;
    float: left;
    height: 100%;
    position: realtive;
  }

  .list li.sub .cell img {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    margin: 0 auto;
    display: block;
    margin-top: 10px;
  }

  .list li.sub .cell .text {
    line-height: 18px;
    text-align: center;
    margin-top: 1px;
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
