// pages/home/home.js
import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgAnimation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  jumpPage (e) {
    let type = e.currentTarget.dataset.type;
    switch (type){
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
        utils.navigateTo('../mine/mine');//我的
        break;
      case 'shop':
        utils.navigateTo('../shop/shop');//商店
        break;
      case 'message':
        utils.navigateTo('../message/message');//消息
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})