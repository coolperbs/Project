// pages/test/test.js
import {battle} from '../../services/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSocket: null,
    webSocket2: null,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    battle.battleOneConnect();
    battle.battleOneOnSocket((res)=>{
      console.log(res);
      //这里去打开 锁 只有打开锁才能发送 关闭 socket
    })
   battle.battleOneOnSocket(res=>{
     debugger
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