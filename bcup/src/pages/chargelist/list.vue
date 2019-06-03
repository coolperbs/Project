<template>
  <div class="orderlist">

    <div class="pull-down">
      <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
        <div class="pull-item">
          <order v-if="renderList.length>0" v-for="order,index in renderList " :item="order" :key="index" class="mod"/>
        </div>
        <div v-if="renderList.length==0" style="text-align: center;font-size: 12px;padding: 10px; margin-top : 20px">没有更多数据</div>
      </PullTo>
    </div>

  </div>
</template>


<style scoped>
  .entry-wapper { position: relative; padding :0 10px; background-color: #fff; }
  .entry { position: relative; height : 150px; display: flex; align-items: center; justify-content: space-between; background-color: #fff; padding : 0 20px; border-bottom : solid 1px #f0f0f0; }
  .entry .cell { width : 45%; }
  .entry .cell img { width : 100%; }
  .pull-down { margin-top : 10px;  }

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
  import ajax from '@/common/ajax/ajax'
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
        ajax.get('/app/user/point',{currentPage: this.currentPage}, (res) => {
          if (utils.isErrorRes(res)) {
            utils.showError(res.msg || '获取列表信息错误');
            return;
          }
          // 3463E973205294840C43569EE6D4BBB68E8A6308673617E3F3965B9E7AA0978BF93C6B561F96600D199CCE17580780C0BAF202599824A309AD671B92B823960FBE8E9F52BDB922BD6AFC357600D2F8F9D5AA4D8E55198625BA74861DE131473455995624EFC2D01840837BA642E893761E91448BCB2AC3E0E20F3942F8BB1653
          this.cookie = document.cookie;

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
            this.renderList = res.data.points || [];
            //this.filterList()
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



