<template>
  <div class="orderlist">
    <!--<order-tab/>-->
    <div class="pull-down" style="top: 0;">
      <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
        <div class="pull-item">
          <order v-for="order,index in renderList" :item="order" :key="index" class="mod"/>
        </div>
        <div v-if="!renderList || !renderList.length" style="text-align:center; padding : 20px;">暂无数据</div>
      </PullTo>
    </div>
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
        switch: false,
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
      this.type=this.$route.query.type;
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
        this.switch = true;
        let that = this;
        this.getDataByType((res) => {
          that.renderList = [...that.renderList, ...res];
          that.switch = false;
          loaded()
        })
      }
    }
  }
</script>
