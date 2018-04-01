// pages/login/login.js
import {login} from '../../services/index'
import util from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loginEVT();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loginEVT () {
    login.isLogin((res) => {
      if (!res) {
        login.login((res2) => {
          if (res2) {
            util.redirectTo('../home/home')
          }
        });
      } else {
        util.redirectTo('../home/home')
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})