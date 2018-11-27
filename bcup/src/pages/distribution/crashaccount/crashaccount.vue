<template>
  <div class="account">
    <ul class="list">
      <li>
        <div class="key">用户姓名 :</div>
        <div class="value"><input  v-model="tradeName"/></div>
      </li>
      <li>
        <div class="key">手机号 :</div>
        <div class="value"><input  v-model="tradePhone"/></div>
      </li>    
      <!--<li>
        <div class="key">支付宝账号 :</div>
        <div class="value"><input  v-model="userName"/></div>
      </li>
      <li>
        <div class="key">支付宝手机号 :</div>
        <div class="value"><input  v-model="userPhone"/></div>
      </li>-->
    </ul>
    <div class="save" @click="bindAccount">保存</div>
  </div>
</template>


<style scoped>
  .account { padding : 10px; }
  .list { border-top : dashed 1px #f0f0f0; margin-top : 10px; background-color: #fff;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .list li { padding : 0 10px 0 80px; height : 50px; line-height: 50px; border-bottom : solid 1px #f0f0f0; }
  .list li:last-child { border-bottom : 0; }
  .list li:after { content:""; display: block; clear:both; }
  .list .key { float : left; width : 70px; margin-left : -70px; height : 50px; line-height: 50px; }
  .list .key em { color : red; font-style: normal; margin-right :5px; position: relative; top : 3px; display: inline-block; width : 5px; }
  .list .value { position: relative; }
  .list input { height : 50px; display: inline-block; width : 100%; border : none; }

  .save { background-color: #ef8d56; margin-top : 20px; height : 40px; line-height: 40px; text-align: center; border-radius : 22px; font-size : 18px; color :#fff; }
</style>

<script>
  import  distributionService from '@/services/distribution/distribution'
  export default {
    components : {
    },
    data : function() {
      return {
        userName:'',
        userPhone:'',
        tradeName : '',
        tradePhone : ''
      }
    },
    mounted(){
      distributionService.getUserInfo((res) => {
        this.userData = res.data;
        this.tradeName=this.userData.realName;
        this.tradePhone=this.userData.phoneNumber;
      })      
    },
    methods:{
      bindAccount(){
        distributionService.bindAccount({tradeName:this.tradeName,tradePhone:this.tradePhone},(res)=>{
          this.$router.back()
        })
      }
    }
  }
</script>
