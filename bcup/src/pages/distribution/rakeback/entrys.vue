<template>
  <div class="entrys">
    <ul class="list">
      <router-link tag="li" :to="{path : '/distribution/rakebackrecord',query:{type:3} }" class="clearfix">
        <div class="key">我的返佣</div>
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
      <router-link tag="li" :to="{path : '/distribution/crashaccount' }" class="clearfix">
        <div class="key">提现账号</div>
        {{tradeData.account?tradeData.account:'暂未设置'}}
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
      <router-link tag="li" :to="{path : '/distribution/crashrecord' }" class="clearfix">
        <div class="key">提现记录</div>
        已提:￥{{fixPrice(tradeData.alreadyGet)}}
        <div class="more"><img src="/static/arrow-right.png"/></div>
      </router-link>
    </ul>
  </div>
</template>


<style scoped>
  .entrys {
    background-color: #fff;
    padding: 0 10px;
  }

  .title {
    padding: 10px 0;
  }

  .data {
  }

  .list li {
    text-align: right;
    padding: 13px 0;
    border-top: solid 1px #f0f0f0;
    color: #999;
  }

  .list li .key {
    float: left;
    color: #2c3e50;
  }

  .list li .more {
    float: right;
    margin-left: 5px;
  }
  .list li .more img { width : 18px; height : 18px; }
</style>

<script>
  import utils from '@/common/utils/utils'
  import distributionService from '@/services/distribution/distribution'

  export default {
    props: {
      tradeData: {}
    },

    methods: {
      fixPrice: utils.fixPrice
    },
    mounted () {
    }
  }
</script>
