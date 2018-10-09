<template>
  <!--找回电子码-->
  <div class="find-code">
    <div class="code-title">身份验证</div>
    <div class="form-row">
      <label class="row-label">手机号：</label>
      <input type="text" class="row-input" v-model="phone">
    </div>
    <div class="form-row">
      <label class="row-label">订单号：</label>
      <input type="text" class="row-input" v-model="orderId">
    </div>
    <div class="form-row">
      <label class="row-label">短信验证码：</label>
      <div class="row-input-group">
        <input type="text" class="row-input" v-model="checkCode">
        <div class="row-code" @click="getRegCode">{{codeText}}</div>
      </div>
    </div>
    <div class="btn" @click="submitEvt"> 提交</div>
  </div>

</template>

<script>
  import ECodeService from '@/services/findecode/findecode'
  import utils from '@/common/utils/utils'

  export default {
    name: "findecode",
    data () {
      return {
        phone: '',
        checkCode: '',
        orderId: '',
        codeText: '获取验证码'
      }
    },
    methods: {
      istel (tel) {
        var rtn = false;
        //移动号段
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        if (regtel.test(tel)) {
          rtn = true;
        }
        //电信号段
        regtel = /^((133)|(153)|(18[0|1|9])|(177))[\d]{8}$/;
        if (regtel.test(tel)) {
          rtn = true;
        }
        //联通号段
        regtel = /^((13[0-2])|(145)|(15[5-6])|(176)|(18[5-6]))[\d]{8}$/;
        if (regtel.test(tel)) {
          rtn = true;
        }
        return rtn;
      },
      getRegCode () {
        if (!this.istel(this.phone)) {
          utils.showError('请输入合法的手机号');
          return
        }

        ECodeService.getPhoneCode(this.phone, (res) => {
          this.codeText = '验证码已发送';
          setTimeout(() => {
            this.codeText = '获取验证码';
          }, 30000)
        })
      },
      submitEvt () {
        if(this.orderId==''){
          utils.showError('请输入订单号');
          return
        }
        ECodeService.getECode({phone: this.phone, checkCode: this.checkCode, orderId: this.orderId}, (res) => {

        })

      }
    }
  }
</script>

<style scoped>
  .find-code {
    border: 1px solid #eee;
    margin: 40px 10px;
    padding: 20px;
  }

  .find-code .code-title {
    color: #000;
    font-size: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }

  .find-code .form-row {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  .row-label {
    font-size: 14px;
    color: #000;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
  }

  .row-input {
    height: 38px;
    width: 100%;
    border: 1px solid #eee;
    padding: 0 10px;
    transition: all .45s ease-in;
  }

  .row-input:focus {
    border: 1px solid #5a8ffa;
    box-shadow: 0 0 5px 0 #5a8ffa;;
  }

  .row-input-group {
    display: flex;
    align-items: center;
  }

  .row-code {
    word-break: keep-all;
    background: #eee;
    height: 38px;
    line-height: 38px;
    padding: 0 10px;
    font-size: 12px;
    color: #000;
  }

  .btn {
    background: #ef8d56;
    border-radius: 20px;
    font-size : 18px;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
  }

</style>
