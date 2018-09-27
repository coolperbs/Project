<template>
  <div class="checkout-order">
    <div class="title">订单信息</div>
    <ul class="list">
      <li>
        <div class="key"><em>*</em>姓名 :</div>
        <div class="value"><input v-model="pageInfo.formInfo.userName" @input="changePageInfo(pageInfo)" placeholder="请输入姓名" /></div>
      </li>
      <li>
        <div class="key"><em>*</em>电话 :</div>
        <div class="value"><input type="number" v-model="pageInfo.formInfo.userPhone"  @input="changePageInfo(pageInfo)" placeholder="请输入手机号" /></div>
      </li>
      <li>
        <div class="key"><em></em>数量 :</div>
        <div class="value">
          <div class="num-picker clearfix">
            <div class="num-picker-mod btn" @click="changeNum( pageInfo.formInfo.skuNum - 1 )">-</div>
            <div class="num-picker-mod num">{{pageInfo.formInfo.skuNum}}</div>
            <!--<input class="num-picker-mod"  v-model="pageInfo.formInfo.skuNum"/>-->
            <div class="num-picker-mod btn" @click="changeNum( pageInfo.formInfo.skuNum + 1 )">+</div>
          </div>
        </div>
      </li>
      <li>
        <div class="key"><em></em>备注:</div>
        <div class="value"><input v-model="pageInfo.formInfo.remark"  @input="changePageInfo(pageInfo)" placeholder="请输入"/></div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .title { font-size : 12px; padding : 10px; }
  .list li { padding : 0 10px 0 80px; border-bottom : solid 1px #f0f0f0; height : 50px; line-height: 50px; }
  .list li:last-child { border-bottom : 0; }
  .list li:after { content:""; display: block; clear:both; }
  .list .key { float : left; width : 70px; margin-left : -70px; }
  .list .key em { color : red; font-style: normal; margin-right :5px; position: relative; top : 3px; display: inline-block; width : 5px; }
  .list .value { position: relative; }
  .list input { height : 30px; display: inline-block; width : 100%; border : none; }
  .num-picker { height : 30px; border : solid 1px #ccc; border-radius : 5px; display: inline-block; overflow: hidden; margin-top: 10px; }
  .num-picker .num-picker-mod { float: left; display: inline-block; height : 30px; line-height: 30px; text-align: center; width : 30px; border-right : solid 1px #ccc; font-size : 24px; }
  .num-picker .num-picker-mod:last-child { border-right : none; }
  .num-picker input.num-picker-mod { height : 100%; width : 40px; font-size : 18px; }
  .num-picker .num-picker-mod.num { font-size : 18px;  }
</style>

<script>
  import distributionServ from '@/services/distribution/distribution'
  export default {
    props : ['value'],
    computed : {
      pageInfo : function() {
        let value=this.value;
        value.formInfo.userPhone=this.userData.idCard;
        value.formInfo.userName=this.userData.nickName;
        return this.value;
      }
    },
    data : function() {
      return {
        userData:{}
      }
    },
    methods : {
      changeNum : function( num ) {
        num = num * 1;
        num = num <= 0 ? 1 : num;
        this.pageInfo.formInfo.skuNum = num;
      },
      changePageInfo : function( val ) {
        this.$emit( 'setData', val );
      }
    },
    mounted () {
      //获取用户信息判断是否是达人
      distributionServ.getUserInfo((res) => {
        this.userData = res.data;
      })
    }
  }
</script>




