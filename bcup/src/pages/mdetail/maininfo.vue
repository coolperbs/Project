<template>
  <div class="maininfo" :style="{width:pageWidth}">
    <!--<div class="tab clearfix">
      <div class="item" :class="{ 'current' : tab.currentTab == 1 || !tab.currentTab }" @click="changeTab(1)">详情</div>
      <div class="item" :class="{ 'current' : tab.currentTab == 2 }" @click="changeTab(2)">使用说明</div>
    </div>-->
    <div class="text-imgs" v-if="tab.currentTab == 1 ||  !tab.currentTab" v-html="pageInfo.description"></div>
    <div class="parameter" v-if="tab.currentTab == 2">
      <div class="p-mod" v-for="item,key in pageInfo.pros" :key="item.index">
        <div class="p-title">{{key}}</div>
        <div class="cont">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .maininfo {
    background-color: #fff;
    width: 100%;
    overflow: hidden
  }

  .tab {
    border-bottom: solid 1px #f0f0f0;
  }

  .tab .item {
    width: 50%;
    float: left;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    color: #ccc;
  }

  .tab .item:first-child:before {
    content: '';
    display: block;
    height: 30px;
    width: 1px;
    background-color: #f0f0f0;
    position: absolute;
    right: 0;
    top: 5px;
  }

  .tab .item.current {
    color: #ff6e1d;
    font-size : 18px;
  }

  .tab .item.current:after {
    content: '';
    height: 4px;
    background-color: #ff6e1d;
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -25%;
    width: 50%;
  }

  .parameter {
    padding: 0 10px;
  }

  .p-mod {
    border-top: dashed 1px #f0f0f0;
    padding: 10px 0;
  }

  .p-mod:first-child {
    border-top: none;
  }

  .p-mod .p-title {
    font-weight: bold;
    font-size: 16px;
  }

  .p-mod p {
    line-height: 18px;
    margin: 5px 0;
    padding-left: 10px;
  }

</style>

<script>
  export default {
    props: ['pageInfo'],
    data: function () {
      return {
        tab: {
          currentTab: 1
        },
        content: 'adsfasf',
        pageWidth: '1px'
      }
    },
    mounted: function () {
      console.log(this.pageInfo);
      this.$nextTick(() => {
        this.pageWidth = window.innerWidth + 'px'
      })

    },
    methods: {
      changeTab: function (type) {
        this.tab.currentTab = type;
      }
    }
  }
</script>



