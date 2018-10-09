<template>
  <div class="data">
    <div class="charts clearfix">
      <div class="show-data" v-if="showData.month>=0">
        {{showData.month}}月<br/>
        销售额：{{fixPrice(showData.traderSale)}}<br/>
        返佣：{{fixPrice(showData.traderBack)}}
      </div>
      <div class="cell" v-for="item,index in data.dataArr" :key="index">
        <div class="line" @click="showItem(item,index+1)">
          <div class="back" :style="{height : (100-fixPrice(item.traderBack)/1000)+'%'}"></div>
          <div class="color" :style="{height : fixPrice(item.traderBack)/100+'%'}"></div>
        </div>
        <div class="text">{{index+1}}</div>
      </div>
    </div>
    <div class="data-line clearfix">
      <div class="key price">总销售额:</div>
      <div class="value price">
        ￥<em>{{fixPrice(data.totalTraderSale)}}</em>
      </div>
    </div>

    <div class="data-line clearfix">
      <div class="key price">总返利:</div>
      <div class="value price">
        ￥<em>{{fixPrice(data.totalTraderBack)}}</em>
      </div>
    </div>

  </div>
</template>


<style scoped>
  .key.price { margin-top : 6px; }
  .value.price { font-size : 14px; font-weight: bold; color : #ef8d56; }
  .value.price em { font-size : 24px; font-style: normal; }
  .data {
    padding: 30px 10px 0 10px;
    background-color: #fff;
  }

  .data-line {
    padding: 10px 0 10px 90px;
  }

  .data-line .key {
    float: left;
    margin-left: -90px;
  }

  .charts {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    position: relative;
  }

  .charts .cell {
    width: 12.5%;
  }

  .charts .cell .line {
    height: 200px;
    width: 30%;
    margin: 0 auto;
  }

  .charts .cell .line .back {
    background-color: transparent;
  }

  .charts .cell .line .color {
    background-color: #ccc;
    position: relative;
  }

  .charts .cell .line .color .tag {
    font-size: 10px;
    margin: 0 auto;
  }

  .charts .cell .text {
    text-align: center;
    padding: 3px 0;
    font-size: 12px;
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

  .show-data {
    position: absolute;
    font-size: 12px;
    color: #808080;
    width: 200px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

</style>

<script>
  import utils from '@/common/utils/utils'

  export default {
    props: {
      data: {}
    },
    data: function () {
      return {showData: {}}
    },
    methods: {
      fixPrice (price) {
        return utils.fixPrice(price)
      },
      showItem (item, index) {
        this.showData = item;
        this.showData.month = index;
      }
    }
  }
</script>
