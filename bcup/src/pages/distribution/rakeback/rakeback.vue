<template>
  <div class="team">
    <saledata :item="userData" :tradeData="tradeData"/>
    <entrys :tradeData="tradeData" class="mod"/>
    <div class="invite" @click="showPop">申请返佣</div>
    <div class="rakeback">目前为人工提现，每次提现时，请向暴客优品的可财务客服人员（微信号：bc-up001）发送：“爆米花妹儿，我要提现！”的指令，即可很快到账</div>
    <div class="modal" v-if="showRebackModal" @click.self="cancelEvt">
      <div class="box">
        <div class="body">
          <div class="label">提现金额：</div>
          <div class="input-box"><input type="text" v-model.trim="rakebackValue"></div>
        </div>
        <div class="footer">
          <div class="ftbtn" @click="cancelEvt">取消</div>
          <div class="ftbtn" style="background: #ef8d56;color:#fff" @click="getRakeback">确认提现</div>
        </div>
      </div>
    </div>

    <div class="poparea" v-if="isShowPop">
      <div class="pop">
        <div class="row">
          <input placeholder="请输入提款金额" v-model.trim="rakebackValue"/>
          <div class="label">元</div>
        </div>
        <div class="act">
          <div class="btn" @click="getRakeback">确认</div>
          <div class="btn cancel" @click="hidePop">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .poparea { height: 100%; width : 100%; background-color : rgba( 0,0, 0, 0.3 ); position: fixed; top : 0; left : 0; }
  .pop { width : 80%; background-color : #fff; padding : 30px; border-radius: 10px; position: absolute; top : 50%; left : 10%; margin-top : -150px; }
  .pop .row { margin-top : 30px; font-size : 22px; padding-right : 25px; position: relative; }
  .pop .row .label { position: absolute; top : 0; font-size : 22px; right :0;  top : 50%; margin-top : -12px; }
  .pop input { display: block; height : 30px; font-size : 22px; border-bottom : solid 1px #f0f0f0; padding : 20px 0; width : 100%; }
  .pop .act { margin-top : 30px; position: relative; text-align: center; }
  .pop .act .btn { display: inline-block; width: 100px; color : #fff; background-color : #ef8d56; font-size : 18px; height : 40px; line-height: 40px; text-align: center; border-radius: 20px; }
  .pop .act .btn:first-child { margin-right : 10px; }
  .pop .act .btn.cancel { background-color: #ccc; }

  .team {
    padding-bottom: 20px;
  }

  .rakeback {
    font-size: 12px;
    color: #888;
    padding: 10px 20px;
  }

  .mod {
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
    margin-bottom: 20px;
  }

  .invite {
    background-color: #ef8d56;
    color: #fff;
    font-size: 18px;
    margin: 0 10px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 22px;
  }

  .modal {
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    margin: 20px;
    padding: 20px 10px 0 10px;
  }

  .body {
    display: flex;
  }

  .input-box {
    border-bottom: 1px solid #444444;
    width: 100%;
  }

  input {
    border: none;
    width: inherit;
  }

  .label {
    font-size: 13px;
    color: #444444;
    word-break: keep-all;
    white-space: nowrap;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
  }

  .ftbtn {
    background: #bfbfbf;
    border-radius: 4px;
    padding: 10px;
    text-align: center;
    margin: 0 5px;
    color: #444444;
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
        tradeData: {},
        rakebackValue: '',
        isShowPop : false,
        showRebackModal: false
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
        if (this.tradeData.availableGet <= 1000) {
          utils.showError('可提现余额不足10元');
          return
        }
        this.showRebackModal = true;
      },
      cancelEvt () {
        this.showRebackModal = false;
      },
      showPop : function() {
        this.isShowPop = true;
      },
      hidePop : function() {
        this.isShowPop = false;
      },      
      getRakeback () {
        var reg = /^[0-9]+$/;
        // if(this.rakebackValue*100>this.tradeData.availableGet){
        //   alert('提现金额大于可提现金额')
        //   return
        // }
        distributionService.applyMoney({price: this.rakebackValue}, () => {
          alert('提现成功');
          this.isShowPop = false;
          setTimeout(() => {
            this.getData()
          }, 2000)
        })
        // if (reg.test(this.rakebackValue) && this.rakebackValue >= 10) {
        // } else {
        //   alert('提现金额需大于10且为整数')
        // }

      }
    }
  }
</script>
