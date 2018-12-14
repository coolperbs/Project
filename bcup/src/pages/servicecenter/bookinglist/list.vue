<template>
  <div class="orderlist">
    <div class="pull-down" style="top:0;">
      <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
        <div class="pull-item">
          <order v-if="realList.length>0" v-for="order,index in realList " :item="order" :key="index" class="mod"/>
        </div>
        <div v-if="realList.length==0" style="text-align: center;font-size: 12px;padding: 10px; margin-top : 20px">没有更多数据</div>
      </PullTo>
    </div>
  </div>
</template>


<style scoped>
  .mod {
    border-radius: 5px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }
</style>

<script>
  import order from './order'
  import distributionServ from '@/services/distribution/distribution'
  import utils from '@/common/utils/utils'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      order, PullTo
    },
    data: function () {
      return {
        currentPage: 1,
        realList: [],
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
    mounted: function () {
      this.render();
    },
    methods: {
      render: function (callback) {
        distributionServ.getBespokeList((res) => {
          if (utils.isErrorRes(res)) {
            utils.showError(res.msg || '获取列表信息错误');
            return;
          }
          this.hasMore = false;
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
            callback(res.data.bespeakList || [])
          } else {
            this.renderList = res.data.bespeakList || [];
            this.filterList()
          }
        });
      },
      changeTab (el) {
        this.tab.current = el.value;
        this.filterList()
      },
      filterList () {
        this.realList = this.renderList;
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



