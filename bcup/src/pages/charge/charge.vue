<template>
  <div class="charge">
    <b-header ref="header"/>

    <!--<div class="banner">
      <img src="/static/banner.jpeg"/>
    </div>-->
    <div class="list">
      <div
        v-for="( card, index ) in list"
        class = "cell"
      >
        <div 
          class="card"
          @click="showPop( card )"
        >
          <div class="price">{{ card.realMoney }}元</div>
          <div class="des">{{ card.title }}</div>
        </div>
      </div>
    </div>

    <div class="more-info">
      <router-link :to="{ path : '/chargelist' }" class="charge-data">查看充值记录></router-link>
    </div>

    <div class="more">
充值完成后，工作人员在48小时内联系发放福利；<br/>
如有任何疑问：请联系广电热线96655<br/>
<br/>
额外福利：<br/>
<br/>
1.新用户赠送4个月广电基础高清收视+4个月100M光纤+20G流量/月*4个月+300分钟通话/月*4个月<br/>
<br/>
说明：充值300  赠送1所述福利<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值600  赠送1所述福利+ 3个月广电高清基础收视<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值1200  赠送1所述福利+8个月广电高清基础收视<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值1800  赠送1所述福利+13个月广电高清基础收视<br/>
<br/>
2.老用户<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值300  赠送2个月广电高清基础收视<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值600  赠送5个月广电高清基础收视<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值1200 赠送10个月广电高清基础收视<br/>
&nbsp;&nbsp;&nbsp;&nbsp;充值1800 赠送15个月广电高清基础收视<br/>
      
    </div>

    <!--<b-bottom/>-->

    <div v-if="isShowPop" class="poparea">
      <div class="pop">
        <div class="title">请完善用户信息</div>
        <div class="cell">
          <div class="key"><em>*</em> 姓名：</div>
          <div class="val"><input v-model="username" placeholder="请填写姓名" /></div>
        </div>
        <div class="cell">
          <div class="key"><em>*</em> 电话：</div>
          <div class="val"><input v-model="userphone" placeholder="请填写电话"/></div>
        </div>
        <div class="cell">
          <div class="key"><em>*</em> 住址：</div>
          <div class="val"><input v-model="useraddress" placeholder="请填写家庭住址"/></div>
        </div>
        <div class="cell">
          <div class="key"><em>&nbsp;</em> 备注：</div>
          <div class="val"><input v-model="note" placeholder="备注信息"/></div>
        </div>
        <div class="btnarea">
          <div v-if="selectedCard" class="btn"  @click="pay()">确认支付{{ selectedCard.realMoney }}元</div>
        </div>
      </div>

      <div class="mask" @click="closepop"></div>
    </div>
  </div>
</template>


<style scoped>
.more-info { text-align: right; }
.charge-data { color : blue; margin-right : 10px; }
.more { padding : 10px; background-color: #f0f0f0; border-radius : 5px; margin: 10px; }
.poparea { position: fixed; top :0; left : 0; width : 100%; height  :100%; z-index: 1; display: flex; justify-content: center;align-items: center; }
.pop { background-color: #fff; border-radius: 4px; box-shadow: 0 5px 5px rgba( 0, 0, 0, 0.4 ); font-size:12px; z-index: 2; position: relative; margin-top : -30px; }
.poparea .mask { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba( 0, 0, 0, 0.2 ); }
.pop .title { border-bottom  :solid 1px #f0f0f0; font-size : 16px; height : 50px; display: flex; align-items: center; color:#444; }
.pop .cell { width : 300px; display: flex; border-bottom : solid 1px #f0f0f0; height : 50px; }

.pop .btnarea { padding:10px; }
.pop .btnarea .btn { width : 100%; height : 50px; color : #fff; display: flex; align-items: center; justify-content: center; background-color: #52b36c; border-radius: 4px; font-size : 16px; }

.pop .cell .key { padding : 5px 0; font-size : 14px; display: flex; align-items: center; }
.pop .cell .key em { color : red; font-size : 14px; margin-right : 5px; }
.pop .cell .val { flex-grow: 1; display: flex; align-items: center; }
.pop .cell input { height : 30px; line-height: 30px; border : none; width : 100%; }

.title { color : #999; padding : 0 10px; font-size : 14px; }
.charge { padding-top : 40px; position : relative; overflow-y: auto; overflow-x: hidden; }
.list {  margin-top : 20px; display: flex; flex-wrap: wrap; padding : 5px; }
.cell { width : 33.33%; padding : 5px; }
.card { background-color: #fefefe; height : 60px; font-size : 12px; border : solid 1px #52b36c; border-radius: 4px; padding : 5px; display: flex; align-items: center; justify-content: center; flex-direction: column; color : #52b36c; }
.card.selected { color : #fff; background-color: #52b36c; }
.card .price { font-size : 20px; font-weight : bold; }
.banner { width : 100%; margin-top : 10px; }
.banner img { width : 100%; }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import bBottom from '@/widgets/mallbottom/bottom'
  import ajax from '@/common/ajax/ajax'
  import utils from '@/common/utils/utils'
  import distributionService from '@/services/distribution/distribution'
  import weixin from '@/common/weixin/weixin'
  import payServ from '@/services/pay/pay'

  let _fn;
  let catId;

  export default {
    data : function() {
      return {
        list : [],
        isShowPop : false,
        username : '',
        userphone : '',
        address : ''
      }
    },   
    mounted: function () {
      var self = this;
      _fn.getData( function( res ) {
        self.list = res.data;
      } );
    },

    updated : function() {
      if ( this.$route.query.c == 1 ) {
        this.$refs.header.setTitle( 1 );
      }
    },

    methods: {
      closepop : function() {
        this.isShowPop = false;
      },
      showPop : function( card ) {
        this.selectedCard = card;
        this.isShowPop = true;
      },
      fixPrice: utils.fixPrice,

      pay : function() {
        var self = this,  
            card = self.selectedCard;
        if ( (self.username + '').trim() == ''
          || (self.userphone + '').trim() == ''
          || (self.useraddress + '').trim() == '' ) {
          alert( '请完善用户信息' );
          return;
        }

        // 1.后去基本支付信息
        _fn.getPayInfo( { 
            cardId : card.id,
            username : self.username,
            userphone : self.userphone,
            address : self.useraddress,
            note : self.note
          }, function( res ) {
            //that.isShowPop = false;
          // 2.唤醒支付
            payServ.WXPay(res.data, function (wxpayRes) {
              that.isShowPop = false;
              //that.orderId = orderRes.data.orderId;
              //that.showModal = true;
            });
        } );
      }
    },

    components: {
      bHeader, bBottom
    }
  }

  _fn = {
    getData: function (callback) {
      var id = localStorage.getItem( 'venderId' ) || 1,
          url = window.location.href.split( '#' )[0];

      ajax.get('/app/recharg/card', function (res) {
        if (utils.isErrorRes(res)) {
          utils.showError(res.msg || '请求接口出错');
          return;
        }
        //weixin.share( res.data.shareInfo );
        callback(res);
      });
    },

    getPayInfo: function ( param, callback ) {
      var id = localStorage.getItem( 'venderId' ) || 1,
          url = window.location.href.split( '#' )[0];

      ajax.get('/app/pay/recharg/card/wechatPrePay', param, function (res) {
        if (utils.isErrorRes(res)) {
          utils.showError(res.msg || '请求接口出错');
          return;
        }
        //weixin.share( res.data.shareInfo );
        callback(res);
      });
    },

    setShareInfo : function(  ) {
      _fn.getData( function( res ) {
        weixin.share( res.data.shareInfo, {
          url : window.location.href.split( '#' )[0],
          imgUrl : 'http://bc.ypzmkj.com/static/logo.jpeg',
          title : '暴客优品',
          desc : '整点巴适的！'
        } );
      } );
    }
  }
</script>
















