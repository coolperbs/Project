// pages/home/home.js
import ajax from '../../common/ajax/ajax'

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
    wx.login({
      success (res1) {
        wx.getUserInfo({
          lang:'zh_CN',
          success: res2 => {
            console.log(res1.code)
            console.log(res2.iv)
            console.log(res2.encryptedData)
            debugger
            ajax.request({
              url: 'https://gamegw.soofylia.net/login',
              data: {param: JSON.stringify({code: res1.code, iv: res2.iv, encryptedData: res2.encryptedData})},
              callback (res3) {
                debugger
              }
            })
          }
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})