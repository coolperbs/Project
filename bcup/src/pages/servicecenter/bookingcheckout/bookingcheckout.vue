<template>
  <div class="booking-checkout">
    <div class="name">【预约】{{item.wareWare?item.wareWare.title:''}}</div>
    <div class="type-box">
      <div class="date">消费日期:{{formatDateV(item.preDate)}}</div>

    </div>
    <div class="cell-box">
      <div class="cell">
        <div class="label">核销码</div>
        <div class="input-box">
          <input type="text" placeholder="请输入核销码" class="cell-input" v-model.trim="ecode">
        </div>
      </div>

    </div>
    <div class="cell-box">
      <div class="cell">
        <div class="label"><span class="mark">*</span>姓名</div>
        <div class="input-box">
          <input type="text" placeholder="请输入" class="cell-input" v-model.trim="username">
        </div>
      </div>
      <div class="cell">
        <div class="label"><span class="mark">*</span>手机</div>
        <div class="input-box">
          <input type="text" placeholder="请输入" class="cell-input" v-model.trim="userphone">
        </div>
      </div>
      <div class="cell">
        <div class="label">备注</div>
        <div class="input-box">
          <textarea type="text" placeholder="请输入" class="cell-input" style="height: 50px;" v-model.trim="remark"></textarea>
        </div>
      </div>
    </div>
    <div class="cell-box">
      <div class="cell">
        <div class="label" style="width: 60%">{{formatDateV(item.preDate)}}:{{item.wareWare?item.wareWare.title:''}}</div>
        <div class="desc" style="width: 30px">到店支付</div>
        <div class="num"v-if="" style="color:#ee8e34;">￥{{(item.plusPrice?item.plusPrice:'')}}</div>
      </div>
    </div>
    <div class="cell-box" style="margin-bottom: 100px">
      <div class="cell" style="justify-content: flex-start">
        <div class="radio" :class="{active:isChecked}" @click="changeCheck"></div>
        我同意提交预约后不可更改或取消
      </div>
    </div>
    <div class="submit-box">
      <div class="stitle">到店支付：</div>
      <div class="price" style="color:#ee8e34;">￥{{(item?item.plusPrice:'')}}</div>
      <div class="btn " @click="bookingEvt">{{isChecked?'确定预约':'请先同意预约条款'}}</div>
    </div>
  </div>
</template>

<script>
  import bookingCheckoutService from '@/services/bookingcheckout/bookingcheckout'
  import utils from '@/common/utils/utils'

  export default {
    name: "bookingCheckout",
    data () {
      return {
        item: {},
        isChecked: false,
        ecode: '',
        username: '',
        userphone: '',
        remark: '',
        bespeakId: ''
      }
    },
    mounted () {
      let query = this.$route.query;
      this.wareId = query.id.split('-')[0];
      this.bespeakId = query.id.split('-')[1];
      this.getCheckoutData()
    },
    methods: {
      getCheckoutData () {
        bookingCheckoutService.getDisplayData({wareId:this.wareId,bespeakId: this.bespeakId}, (res) => {
          this.item = res.data;
        })
      },
      formatDateV (val) {
        if (!val) {
          return ''
        }
        let date = utils.formatDateTime(val);
        return `${date.year}-${date.month}-${date.day}`
      },
      fromatPrice (val) {
        return utils.fixPrice(val)
      },
      changeCheck () {
        this.isChecked = !this.isChecked;
      },
      istel (tel) {
        var rtn = false;
        var reg = /^1\\d{10}$/;
        if (reg.test(tel)) {
          rtn = true;
        }
        return rtn;

        // //移动号段
        // var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        // if (regtel.test(tel)) {
        //   rtn = true;
        // }
        // //电信号段
        // regtel = /^((133)|(153)|(18[0|1|9])|(177)|(171))[\d]{8}$/;
        // if (regtel.test(tel)) {
        //   rtn = true;
        // }
        // //联通号段
        // regtel = /^((13[0-2])|(145)|(15[5-6])|(176)|(18[1-6]))[\d]{8}$/;
        // if (regtel.test(tel)) {
        //   rtn = true;
        // }
        // return rtn;
      },
      bookingEvt () {
        if (!this.isChecked) {
          alert('请勾选协议')
          return
        }
        if (this.username == '') {
          alert('请输入姓名')
          return
        }

        if (this.istel(this.userphone)) {
          alert('请输入正确的手机号')
          return
        }
        if (this.ecode == '') {
          alert('请输入核销码')
          return
        }
        bookingCheckoutService.submit({
          bespeakId: this.item.id,
          ecode: this.ecode,
          username: this.username,
          userphone: this.userphone,
          remark: this.remark
        }, (res) => {
          var r = confirm('预约成功')
          this.$router.back(-1)
        })
      }

    }
  }
</script>

<style scoped>
  .booking-checkout {
    overflow: scroll;
  }

  .name {
    font-size: 13px;
    color: #000;
    padding: 10px;
  }

  .type-box {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .cell-box {
    background: #fff;
    margin: 10px 0;
    border: 1px solid #eee;
    padding: 0 10px;
  }

  .cell {
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
  }

  .cell:last-child {
    border: none;
  }

  .input-box {
    width: 60%;
  }

  .cell-input {
    width: 100%;
  }

  .mark {
    color: red;
  }

  .radio {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid #eee;
    margin-right: 10px;
  }

  .radio.active {
    background: rgba(58, 168, 59, 0.55);
    border: 1px solid rgba(58, 168, 59, 0.55);
  }

  .submit-box {
    display: flex;
    position: fixed;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1px solid #eee;
  }

  .stitle {
    padding-left: 10px;
  }

  .btn {
    background: rgb(238, 142, 52);
    margin-left: auto;
    width: 40%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
</style>
