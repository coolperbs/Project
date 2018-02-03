// pages/entry.js
import service from '../../service/service'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿后台接口 校验用户登陆没有 如果有 走主页 没有走登陆注册页面
    service.user.isLogin(res=>{
      if(!res){
        service.user.login();
      }
    })
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

  },
  /**
   * 自定义事件 去登陆/注册
   * */
  goLogin: function () {
    //获取用户授权
    wx.getUserInfo({
      success: function (userinfo) {
        console.log(userinfo);
        wx.navigateTo({
          url: '../signUpA/signUpA?a=1'
        });
      }
    });
    wx.login({
      success:function (res) {
        console.log(res)
      }
    })
    // wx.navigateTo({
    //   url: '../signUpA/signUpA'
    // });
    //todo 已经登陆的 直接走主页面 这个逻辑需要放到onload 里面处理 只有非登陆的才能看到 登陆界面 ?
    // wx.redirectTo({
    //     url:'../signUpA/signUpA'
    // })
  }
});