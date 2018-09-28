<template>
  <div class="rank">
    <!--<order-tab/>-->
    <div class="pull-down" style="top:0;">
      <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
        <div class="pull-item">
          <order v-for="order,index in renderList" :item="order" :key="index+1" class="mod"/>
          <div v-if="renderList.length==0" style="text-align: center">暂无记录</div>
        </div>
      </PullTo>
    </div>


  </div>
</template>


<style scoped>
  .rank {
    padding: 10px;
  }

  .mod {
    background-color: #fff;
    border-bottom: solid 1px #f0f0f0;
  }

  .mod:last-child {
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
    border-bottom: 0;
  }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import orderTab from './tab'
  import order from './member'
  import distributionService from '@/services/distribution/distribution'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      bHeader, orderTab, order, PullTo
    },
    data: function () {
      return {
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
    mounted () {
      this.rakeBackList()
    },
    methods: {
      rakeBackList (callback) {
        distributionService.rakeBackList({currentPage: this.currentPage}, (res) => {
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
            callback(res.data.moneyApplys)
          } else {
            this.renderList = res.data.moneyApplys;
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
