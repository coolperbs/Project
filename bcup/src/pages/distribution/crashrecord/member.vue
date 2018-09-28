<template>
  <div class="member clearfix">
    <div class="info">
      <div class="name">{{item.userName}}</div>
      <div class="sub">{{item.carnum}} 状态:{{myEnmu[item.applyStatus]}}</div>
    </div>
    <div class="sales">
      ￥{{item.priceShow}}
    </div>
  </div>
</template>


<style scoped>
  .member {
    height: 60px;
    padding: 10px 90px 10px 10px;
    position: relative;
  }

  .member .logo {
    height: 60px;
    width: 60px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .member img {
    width: 50px;
    height: 50px;
    margin: 5px 0 0 5px;
    background-color: #ccc;
    border-radius: 50%;
  }

  .member .num {
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    top: 5px;
    left: 5px;
  }

  .member .info .name {
    font-weight: bold;
  }

  .member .info .sub {
    font-size: 12px;
    margin-top: 10px;
    color: #999;
  }

  .member .sales {
    height: 60px;
    width: 80px;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
  }
</style>

<script>
  export default {
    props: {
      item: {},
      key: {}
    },
    data () {
      return {
        myEnmu: {
          1: '申请中',
          2: '申请失败',
          3: '已处理'
        }
      }
    }
  }
</script>
