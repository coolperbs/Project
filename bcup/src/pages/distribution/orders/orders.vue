<template>
  <div class="orderlist">
    <!--<order-tab/>-->
    <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
      <order v-for="order,index in renderList" :item="order" :key="index" class="mod"/>
    </PullTo>
  </div>
</template>


<style scoped>
  .orderlist {
    padding: 10px;
  }

  .mod {
    border-radius: 5px;
    background-color: #fff;
    margin-top: 10px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import orderTab from './tab'
  import order from './order'
  import distributionService from '@/services/distribution/distribution'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      bHeader, orderTab, order, PullTo
    },
    data: function () {
      return {
        type: 1,
        currentPage: 1,
        switch: true,
        hasMore: false,
        renderList: [],
        bottomconfig: {
          pullText: '上拉加载',
          triggerText: '释放更新',
          loadingText: '加载中...',
          doneText: '加载完成',
          failText: '加载失败',
          loadedStayTime: 400,
          stayDistance: 50,
          triggerDistance: 70
        }
      }
    },
    mounted(){
      this.getDataByType();
    },
    methods:{
      getDataByType (callback) {
        distributionService.getRakeBackRecord({type: this.type, currentPage: this.currentPage}, (res) => {
          this.hasMore = res.data.hasMore;
          if (!this.hasMore) {
            this.bottomconfig.doneText = ''
            this.bottomconfig.pullText = ''
            this.bottomconfig.triggerText = ''
          } else {
            this.bottomconfig = {
              pullText: '上拉加载',
              triggerText: '释放更新',
              loadingText: '加载中...',
              doneText: '加载完成',
              failText: '加载失败',
              loadedStayTime: 400,
              stayDistance: 50,
              triggerDistance: 70
            }
          }
          if (callback) {
            callback(res.data.moneys)
          } else {
            this.renderList = res.data.moneys;
          }
        })
      },
      loadBottom (loaded) {
        if (!this.hasMore) {
          loaded();
          return
        }
        if (this.switch) {
          loaded();
          return
        }
        this.currentPage += 1;
        this.switch = false;
        this.getDataByType((res) => {
          this.renderList.push(res);
          this.switch = true;
          loaded()
        })
      }
    }
  }
</script>
