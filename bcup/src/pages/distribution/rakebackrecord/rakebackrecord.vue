<template>
  <div class="orderlist">
    <order-tab :tab-list="TABENUM" :current-key="type" @tabChange="tabChange" @searchEvt="searchEvt"></order-tab>
    <div class="pull-down" style="top: 100px;">
      <PullTo :bottom-load-method="loadBottom" :bottom-config="bottomconfig">
        <div class="pull-item">
          <order v-if="filterList(renderList).length>0" v-for="order,index in filterList(renderList)" :item="order" :key="index" class="mod"/>
          <div v-if="filterList(renderList).length==0" style="text-align: center;font-size: 12px;">没有更多数据</div>
        </div>
      </PullTo>
    </div>

  </div>
</template>


<style scoped>
  .orderlist {
    padding: 0 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
        TABENUM: [{key: 3, name: '全部'}, {key: 1, name: '店铺返佣'}, {key: 2, name: '达人返佣'}],
        filterKey: '',
        type: 3,
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
      this.type = Number(this.$route.query.type);
      this.getDataByType();

    },
    methods: {
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
      searchEvt (el) {
        this.filterKey = el;
      },
      filterList (list) {
        let Temp = [];
        for (let i = 0; i < this.renderList.length; i++) {
          let tem = this.renderList[i];
          if (tem.wareVO && tem.wareVO.title.indexOf(this.filterKey) > -1) {
            Temp.push(tem);
          }
        }
        console.log(Temp)
        return Temp
      },
      tabChange (el) {
        this.type = el.key;
        this.currentPage = 1;
        this.hasMore = true;
        this.getDataByType()
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
