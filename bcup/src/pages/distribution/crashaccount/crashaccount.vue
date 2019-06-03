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
      <li>
        <div class="key">身份证号 :</div>
        <div class="value"><input v-model="userCID"/></div>
      </li>
      <!--<li>
        <div class="key">支付宝手机号 :</div>
        <div class="value"><input  v-model="userPhone"/></div>
      </li>-->
    </ul>
    <!--<div class="photo-list">
      <div class="title">本人身份证照片</div>
      <div class="photos">
        <div class="photo">
          {{ photoName1 }}
          <input type="file" ref="inputer1" @change="changePhoto1"/>
        </div>
        <div class="photo">
          {{ photoName2 }}
          <input type="file" ref="inputer2" @change="changePhoto2"/>
        </div>
      </div>
    </div>-->
    <div class="save" @click="bindAccount">保存</div>

    <div class="loading" v-if="showLoading"> 正在上传请等待... </div>
  </div>

</template>


<style scoped>
  .loading { height : 100%; width : 100%; z-index: 100000; background-color: rgba( 0, 0, 0, 0.3 ); display: flex; align-items: center; justify-content: center; position: absolute; top : 0; left : 0; color : #fff; font-size : 18px; }
  .photo-list .title {  }
  .photo-list .photos { margin-top : 10px; display: flex; align-items: center; justify-content: space-between; }
  .photo-list { background-color : #fff; margin-top : 10px; padding : 10px; }
  .photo-list .photo { position: relative; width : 48%; height : 100px; background-color: #f0f0f0; display: flex; justify-content: center; align-items: center; font-size : 12px; color : #888; word-break:break-all; padding : 10px; overflow : hidden; }
  .photo-list .photo input { height : 100%; width : 100%; border : solid 1px; position: absolute; top : 0; left : 0; z-index : 100; opacity : 0;}
  .account { padding : 10px; }
  .list { border-top : dashed 1px #f0f0f0; margin-top : 10px; background-color: #fff;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .list li { padding : 0 10px 0 80px; height : 51px; line-height: 50px; border-bottom : solid 1px #f0f0f0; }
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
        showLoading : false,
        userCID:'',
        userPhone:'',
        tradeName : '',
        tradePhone : '',
        photoName1 : '上传身份证正面',
        photoName2 : '上传身份证背面',
        photo1 : '',
        photo2 : ''
      }
    },
    mounted(){
      distributionService.getUserInfo((res) => {
        this.userData = res.data;
        this.tradeName=this.userData.realName;
        this.tradePhone=this.userData.phoneNumber;
        this.userCID = this.userData.idcardnew || '';
      })      
    },
    methods:{
      changePhoto1( event ){
        let inputDOM = this.$refs.inputer1;
        // if ( !inputDOM.files || !inputDOM.files[0] ) {
        //   this.photoName1 = '身份证正面';
        //   return;
        // }
        // 通过DOM取文件数据
        let file = inputDOM.files[0];
        this.photoName1 = file.name;
        this.photo1 = file;
      },
      changePhoto2( event ){
        let inputDOM = this.$refs.inputer2;
        // if ( !inputDOM.files || !inputDOM.files[0] ) {
        //   this.photoName2 = '上传身份证正面';
        //   return;
        // }
        // 通过DOM取文件数据
        let file = inputDOM.files[0];
        this.photoName2 = file.name;
        this.photo2 = file;
      },      
      bindAccount(){
        this.showLoading = true;
        distributionService.bindAccount({
          namenew : this.tradeName, 
          phonenew : this.tradePhone, 
          idcardnew : this.userCID, 
          cardz : this.photo1, 
          cardf : this.photo2
        },(res)=>{
          this.showLoading = false;
          alert( '上传成功' );
          this.$router.back()
        })
      }
    }
  }
</script>
