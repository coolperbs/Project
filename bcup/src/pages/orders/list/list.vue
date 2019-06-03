<template>
  <div class="orderlist">
    <div class="entry-wapper">
      <div class="entry">
        <router-link :to="{path:'/servicecenter/bookinguse'}" class="cell">
          <img src="/static/yuyueshiyong.png">
        </router-link>
        <router-link :to="{path:'/servicecenter/findecode'}" class="cell">
          <img src="/static/zhaohuihexiaoma.png">
        </router-link>
      </div>
      <div class="info">联系客服：4007728772</div>
    </div>

    <order-tab class="tab" v-model="tab" @changeTab="changeTab"/>
    <div class="pull-down">
      <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
        <div class="pull-item">
          <order v-if="realList.length>0" v-for="order,index in realList " :item="order" :key="index" class="mod"/>
        </div>
        <div v-if="realList.length==0" style="text-align: center;font-size: 12px;padding: 10px; margin-top : 20px">没有更多数据</div>
      </PullTo>
    </div>

    <b-bottom/>
  </div>
</template>


<style scoped>
  .entry-wapper { position: relative; padding :0 10px; background-color: #fff; }
  .entry { position: relative; height : 150px; display: flex; align-items: center; justify-content: space-between; background-color: #fff; padding : 0 20px; border-bottom : solid 1px #f0f0f0; }
  .entry-wapper .info { margin-top : -40px; }
  .entry .cell { width : 45%; }
  .entry .cell img { width : 100%; }
  .pull-down { margin-top : 150px;  }

  .mod {
    border-radius: 5px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }
  .mod:last-child { margin-bottom : 80px; }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import orderTab from './tab'
  import order from './order'
  import orderServ from '@/services/order/order'
  import utils from '@/common/utils/utils'
  import PullTo from 'vue-pull-to'
  import bBottom from '@/widgets/bottom/bottom'

  export default {
    components: {
      bHeader, orderTab, order, PullTo, bBottom
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
            value: 8
          }, {
            name: '待消费', // 已支付
            value: 16
          }, {
            name: '已完成',
            value: 512
          }/*, {
            name: '已取消',
            value: 1024
          }*/]
        },
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
      this.tab.current = this.$route.query.type || 1
      this.render();
    },
    methods: {
      render: function (callback) {
        let self = this;
        orderServ.getList({type: 1, currentPage: this.currentPage}, (res) => {
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



