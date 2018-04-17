// pages/home/home.js
import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'
import {login} from '../../services/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgAnimation: {},
    checkData: [],
    showCheck: false,
    coinCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.getDailyCheckData(res => {
      if (res.code != '0000') {
        if (res.code == '9999') {
          return
        }
        utils.showToast({
          title: '网络错误,请稍候重试!'
        })
        return
      }
      let checkData = res.data;
      let ware = {};
      checkData.map((el) => {
        if (el.canGet && !el.hasGet) {
          ware = el
        }
        return el
      });
      let todayIndex = checkData.findIndex((el, index) => {
        if (el.wareId == ware.wareId) {
          return index
        }
      })
      checkData = checkData.map((el) => {
        el['todayIndex'] = todayIndex;
        return el
      });
      this.setData({
        checkData: checkData,
        checkWare: ware,
        showCheck: true
      })
    });
    console.log('options', decodeURIComponent(options.direct))
    if (options.direct) {
      utils.navigateTo(decodeURIComponent(options.direct), {roomId: options.roomId})
    }
    this.lastBank();
  },

  jumpPage(e) {
    let type = e.currentTarget.dataset.type;
    switch (type) {
      case 'rank':
        utils.navigateTo('../rank/rank');//排位赛
        break;
      case 'friendBattle':
        utils.navigateTo('../friendbattle/friendbattle');//好友对战
        break;
      case 'billboard':
        utils.navigateTo('../billboard/billboard');//排行榜
        break;
      case 'questionLib':
        utils.navigateTo('../questionlib/questionlib');//题库
        break;
      case 'mine':
        utils.navigateTo('../myshop/myshop');//我的
        break;
      case 'userinfo':
        utils.navigateTo('../userinfo/userinfo');//我的
        break;
      case 'shop':
        utils.navigateTo('../shop/shop');//商店
        break;
      case 'message':
        utils.navigateTo('../message/message');//消息
        break;
    }
  },
  check() {
    login.dailyCheck(this.data.checkWare, res => {
      if (res.code != '0000') {
        utils.showToast({title: res.msg || '签到失败,请稍候重试'})
      } else {
        utils.showToast({title: '签到成功'})
      }
      this.setData({
        showCheck: false
      })
    })
  },
  lastBank() {
    login.lastBank(null, (res) => {
      if (res.code != '0000') {
        return
      }
      var total = 3 * 60 * 60 * 1000;
      var pastTime = (new Date().getTime() - res.data);
      var lastTime = total - pastTime;
      if (this.bankTimer) {
        clearInterval(this.bankTimer)
      }
      this.lastTime = lastTime;
      this.bankTimer = setInterval(() => {
        this.lastTime -= 1000;
        var left = this.leftTime(this.lastTime);
        var width = (100 - ((this.lastTime / total) * 100)).toFixed(2);
        var coinCount = Math.floor((total - this.lastTime) / 1000 / 60 / 3);
        coinCount = coinCount > 0 ? coinCount : 0;
        if (!left) {
          this.setData({
            countTime: '00:00:00',
            width: 100,
            coinCount: 60
          });
          clearInterval(this.bankTimer);
          return
        }
        this.setData({
          countTime: left,
          width: width,
          coinCount: coinCount
        })
      }, 1000);
    })
  },
  leftTime(endTime) {
    var leftTime = (endTime); //计算剩余的毫秒数
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    hours = this.checkTime(days * 24 + hours);
    minutes = this.checkTime(minutes);
    seconds = this.checkTime(seconds);
    if (leftTime > 0) {
      return hours + ':' + minutes + ':' + seconds
    } else {
      return null
    }
  },
  checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },
  getBank() {
    console.log('领取金币');
    if(this.data.getCoins){
      return
    }
    if (this.data.coinCount > 0) {
      this.coinAni();
      login.getBank(null, (res) => {
        this.lastBank();
      })
    }
  },
  coinAni() {
    this.playBg();
    this.setData({
      getCoins:true
    });
    setTimeout(()=>{
      this.setData({
        getCoins2:true
      });
      setTimeout(()=>{
        this.setData({
          getCoins2:false,
          getCoins:false
        })
      },1000)
    },1500)

  },
  playBg() {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc('https://xgross.oss-cn-shenzhen.aliyuncs.com/201804/77408d79-00ba-4203-84c8-f2b5ec5e65dc.mp3');
    this.audioCtx.play();
  },
  stopBg() {
    if (this.audioCtx) {
      this.audioCtx.pause();
    }
  },
  closeModal() {
    this.setData({
      showCheck: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})