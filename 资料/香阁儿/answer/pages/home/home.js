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
    showCheck: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.getDailyCheckData(res => {
      if (res.code != '0000') {
        if (res.code == '9999') {
          //是否文案提示
        }
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
    })
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