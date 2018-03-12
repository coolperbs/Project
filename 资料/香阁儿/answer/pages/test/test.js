// pages/test/test.js
import ajax from '../../common/ajax/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSocket: null,
    webSocket2: null,
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
    //socket
    wx.connectSocket({
      url: 'ws://gamegw.soofylia.net/ws/singleFightAgainst?userId=123456&danGrading=1',
      data:{
        
      },
      success(res) {

      }
    });
    wx.onSocketOpen(res=>{
       wx.sendSocketMessage({
         data: 'userId=123456&danGrading=1'
      })
    });
    wx.onSocketMessage((res)=>{
      console.log(res)
    });
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
     
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