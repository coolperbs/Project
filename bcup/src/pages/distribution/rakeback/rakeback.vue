<template>
  <div class="team">
    <saledata :item="userData" :tradeData="tradeData"/>
    <entrys :tradeData="tradeData" class="mod"/>
    <div class="invite" @click="getApply">申请返佣</div>
  </div>
</template>


<style scoped>
  .team {
    padding-bottom: 20px;
  }

  .mod {
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
    margin-bottom: 20px;
  }

  .invite {
    background-color: #eee;
    margin: 0 10px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 22px;
  }
</style>

<script>
  import saledata from './data'
  import entrys from './entrys'
  import distributionService from '@/services/distribution/distribution'
  import utils from '@/common/utils/utils'

  export default {
    components: {
      saledata, entrys
    },
    data: function () {
      return {
        userData: {},
        tradeData: {}
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        distributionService.getBaseInfo((res) => {
          this.userData = res.data;
        })
        distributionService.rakeInfo((res) => {
          this.tradeData = res.data;
        })
      },
      getApply () {
        if (this.tradeData.availableGet <= 200) {
          utils.showError('可提现余额不足2元');
          return
        }
        distributionService.applyMoney({price: utils.fixPrice(this.tradeData.availableGet)}, () => {
          alert('提现成功');
          setTimeout(() => {
            this.getData()
          }, 3000)
        })
      }
    }
  }
</script>
