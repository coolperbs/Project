<template>
  <div class="orderlist">
    <order-tab v-model="tab" @changeTab="changeTab"/>
    <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
      <order v-if="renderList.length>0" v-for="order,index in renderList" :item="order" :key="index" class="mod"/>
      <div v-if="renderList.length==0" style="text-align: center;font-size: 12px;">没有更多数据</div>
    </PullTo>
  </div>
</template>


<style scoped>
  .orderlist {
    padding: 40px 10px 20px 10px;
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
  import orderServ from '@/services/order/order'
  import utils from '@/common/utils/utils'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      bHeader, orderTab, order, PullTo
    },
    data: function () {
      return {
        tab: {
          current: 1,
          list: [{
            name: '全部',
            value: 1,
          }, {
            name: '待支付',
            value: 5
          }, {
            name: '已支付',
            value: 3
          }, {
            name: '已完成',
            value: 4
          }, {
            name: '已取消',
            value: 2
          }]
        },
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
    mounted: function () {
      this.render();
    },
    methods: {
      render: function (callback) {
        let self = this;
        orderServ.getList({type: self.tab.current, currentPage: this.currentPage}, (res) => {
          if (utils.isErrorRes(res)) {
            utils.showError(res.msg || '获取列表信息错误');
            return;
          }
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
          }
        });
      },
      changeTab (el) {
        this.type = el.value;
        this.tab.current = this.type;
        this.currentPage = 1;
        this.hasMore = true;
        this.render()
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
          loaded()
        })
      }
    }
  }
</script>



