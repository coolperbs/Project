<template>
  <div class="invite">
    <img class="code" src="/static/wechat.jpg"/>
    <div class="text">长按关注公众号，完成达人注册。</div>
    <!--<ul class="list">
      <li>
        <div class="key"><em>*</em>姓名 :</div>
        <div class="value"><input placeholder="请输入姓名" v-model="form.userName"/></div>
      </li>
      <li>
        <div class="key"><em>*</em>电话 :</div>
        <div class="value"><input placeholder="请输入手机号" maxlength="11" v-model="form.phone"/></div>
      </li>
      <li class="msg">
        <div class="key"><em>*</em><em></em>验证码 :</div>
        <div class="value clearfix">
          <input placeholder="请输入验证码" type="number" v-model="form.checkCode"/>
          <div v-if="counter <= 0" class="msgbtn active" @click="getMsgCode">获取验证码</div>
          <div v-if="counter > 0" class="msgbtn">{{counter}}s</div>
        </div>
      </li>
    </ul>

    <div class="warn">{{errormgs}}</div>

    <div class="submit" @click="submit">提交</div>-->
  </div>
</template>


<style scoped>
  .invite { text-align: center; }
  .code {
    width : 60%; margin : 100px auto 50px auto;
  }
  .text { color : red; font-size : 18px; } 

  .title {
    font-size: 12px;
    padding: 10px;
  }

  .list {
    background-color: #fff;
  }

  .list li {
    padding: 0 10px 0 90px;
    border-bottom: solid 1px #f0f0f0;
    height: 50px;
    line-height: 50px;
  }

  .list li:after {
    content: "";
    display: block;
    clear: both;
  }

  .list .key {
    float: left;
    width: 70px;
    text-align: right;
    margin-left: -80px;
  }

  .list .key em {
    color: red;
    font-style: normal;
    margin-right: 5px;
    position: relative;
    top: 3px;
    display: inline-block;
    width: 5px;
  }

  .list .value {
    position: relative;
  }

  .list input {
    height: 30px;
    display: inline-block;
    width: 100%;
    border: none;
  }

  .num-picker {
    height: 30px;
    border: solid 1px #ccc;
    border-radius: 5px;
    display: inline-block;
    overflow: hidden;
    margin-top: 10px;
  }

  .num-picker .num-picker-mod {
    float: left;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 30px;
    border-right: solid 1px #ccc;
    font-size: 24px;
  }

  .num-picker .num-picker-mod:last-child {
    border-right: none;
  }

  .num-picker input.num-picker-mod {
    height: 100%;
    width: 40px;
    font-size: 18px;
  }

  .num-picker .num-picker-mod.num {
    font-size: 18px;
  }

  .msg .value {
    padding-right: 100px;
  }

  .msg .value .msgbtn {
    width: 90px;
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 10px;
    border-radius: 3px;
    color: #fff;
    background-color: #ccc;
  }

  .msg .value .msgbtn.active {
    background-color : #ff6e1d;
  }

  .warn {
    padding: 10px;
    color: #999;
  }

  .submit {
    margin: 50px 10px 0 10px;
    height: 44px;
    background-color: #ff6e1d;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;
  }
</style>

<script>
  import baseServ from '@/services/base/base'
  import distributionServ from '@/services/distribution/distribution'

  export default {
    data: function () {
      return {
        form: {
          parentUserId: '',
          userName: '',
          phone: '',
          checkCode: ''
        },
        counter: 0,
        errormgs: ''
      }
    },
    methods: {
      getMsgCode: function () {
        let self = this;
        // if (!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.form.phone * 1))) {
        //   alert('请填写正确的手机号');
        //   return;
        // }
        if (this.form.phone == '' || this.form.phone.length != 11 ) {
          alert('请输入正确的手机号');
          return
        }          
        baseServ.getMsgCode(this.form.phone * 1, function (res) {
          self.startCount(60);
        });
      },
      submit: function () {
        this.form.userName = (this.form.userName + '').trim();
        this.form.phone = (this.form.phone + '').trim();
        this.form.checkCode = (this.form.checkCode + '').trim();
        let that = this;

        if (!this.form.userName) {
          alert('请填写姓名');
          return;
        }
        // if (!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.form.phone * 1))) {
        //   alert('请填写正确的手机号');
        //   return;
        // }
        if (this.form.phone == '' || this.form.phone.length != 11 ) {
          alert('请输入正确的手机号');
          return
        }        
        if (!this.form.checkCode) {
          alert('短信验证码');
          return;
        }

        distributionServ.applyTrader(this.form, function (res) {
          alert('注册成功');
          that.$router.replace('/focusoa');
        });
      },
      startCount: function (num) {
        let self = this;
        num = num || 0;
        num = num <= 0 ? 0 : num;
        this.counter = num;
        if (this.counter > 0) {
          setTimeout(function () {
            self.startCount(num - 1)
          }, 1000);
        }
      }
    },
    mounted: function () {
      var self = this;

      if (!this.$route.query.userId) {
        alert('缺少达人参数');
        self.$router.replace('/');
        return;
      }

      distributionServ.applyTrader(this.form, function (res) {
        // alert('注册成功');
        // that.$router.replace('/focusoa');
      });      
      // distributionServ.getUserInfo( function( res ) {
      //   if ( res && res.data && res.data.trader == 1 ) {
      //     alert( '你已经是达人，不需要再次注册。' );
      //     self.$router.replace( '/' );
      //   }
      // } );
      this.form.parentUserId = this.$route.query.userId;
    }
  }
</script>




