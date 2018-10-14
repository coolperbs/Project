<template>
  <div class="orderlist">
    <div class="pull-down">
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
    mounted: function () {
      this.render();
    },
    methods: {
      render: function (callback) {
        distributionServ.getBespokeList({type: 1, currentPage: this.currentPage}, (res) => {
          if (utils.isErrorRes(res)) {
            utils.showError(res.msg || '获取列表信息错误');
            return;
          }
          //TODO 核对接口数据格式
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
            callback(res.data.order || [])
          } else {
            this.renderList = res.data.order || [];
            this.filterList()
          }
        });
      },
      changeTab (el) {
        this.tab.current = el.value;
        this.filterList()
      },
      filterList () {
        if (this.tab.current == 1) {
          this.realList = this.renderList;
          return
        }
        let temp = [];
        for (let i = 0; i < this.renderList.length; i++) {
          let item = this.renderList[i];
          if (item.orderStatus == this.tab.current) {
            temp.push(item)
          }
        }
        this.realList = temp;
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
        this.render((res) => {
          this.renderList.push(res);
          this.switch = true;
          this.filterList();
          loaded()
        })
      }
    }
  }
</script>



