<template>
  <div class="invite">
    <ul class="list">
      <li>
        <div class="key"><em>*</em>姓名 :</div>
        <div class="value"><input placeholder="name" v-model="form.userName" /></div>
      </li>
      <li>
        <div class="key"><em>*</em>电话 :</div>
        <div class="value"><input placeholder="phone" maxlength="11" v-model="form.phone" /></div>
      </li>
      <li class="msg">
        <div class="key"><em>*</em><em></em>验证码 :</div>
        <div class="value clearfix">
          <input placeholder="holder" type="number" v-model="form.checkCode"/>
          <div v-if="counter <= 0" class="msgbtn" @click="getMsgCode">获取验证码</div>
          <div v-if="counter > 0" class="msgbtn">{{counter}}s</div>
        </div>
      </li>
    </ul>

    <div class="warn">{{errormgs}}</div>

    <div class="submit" @click="submit">提交</div>
  </div>
</template>


<style scoped>
  .title { font-size : 12px; padding : 10px; }
  .list { background-color : #fff;  }
  .list li { padding : 0 10px 0 80px; border-bottom : solid 1px #f0f0f0; height : 50px; line-height: 50px; }
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
  .msg .value { padding-right : 100px;  }
  .msg .value .msgbtn { width : 90px; display: block; height : 30px; line-height: 30px; text-align: center; position: absolute; right: 0; top : 10px; border-radius : 3px; color : #fff; background-color: #ccc; }
  .warn { padding : 10px; color : #999; }
  .submit { margin : 50px 10px 0 10px; height : 44px; background-color: #ccc; border-radius : 22px; text-align: center; line-height: 44px; font-size : 20px; color : #fff; }
</style>

<script>
import baseServ from '@/services/base/base'
import distributionServ from '@/services/distribution/distribution'
import Router from '@/router'

export default {
  data : function() {
    return {
      form : {
        parentUserId : '',
        userName : '',
        phone : '',
        checkCode : ''
      },
      counter : 0,
      errormgs:''
    }
  },
  methods : {
    getMsgCode : function() {
      let self = this;
      if ( !(/^1[3|5|7|8][0-9]\d{4,8}$/.test( this.form.phone * 1 )) ){
        alert( '请填写正确的手机号' );
        return;
      }
      baseServ.getMsgCode( this.form.phone * 1, function( res ) {
        self.startCount( 60 );
      } );
    },
    submit : function() {
      this.form.userName = (this.form.userName + '' ).trim();
      this.form.phone = (this.form.phone + '').trim();
      this.form.checkCode = (this.form.checkCode + '').trim();

      if ( !this.form.userName ) {
        alert( '请填写姓名' );
        return;
      }
      if ( !(/^1[3|5|7|8][0-9]\d{4,8}$/.test( this.form.phone * 1 )) ) {
        alert( '请填写正确的手机号' );
        return;
      }
      if ( !this.form.checkCode ) {
        alert( '短信验证码' );
        return;
      }

      distributionServ.applyTrader( this.form, function( res ) {
        alert( '注册成功' );
        Router.replace( '/focusoa' );
      } );
    },
    startCount : function( num ) {
      let self = this;
      num = num || 0;
      num = num <= 0 ? 0 : num;
      this.counter = num;
      if ( this.counter > 0 ) {
        setTimeout( function() {
          self.startCount( num - 1 )
        }, 1000 );
      }
    }
  },
  mounted : function() {
    if ( !this.$route.query.userId ) {
      alert( '缺少达人参数' );
      Router.replace( '/' );
    }
    this.form.parentUserId = this.$route.query.userId;
  }
}
</script>




