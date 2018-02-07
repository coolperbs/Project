// pages/signUpC/signUpC.js
import service from '../../service/service'
import utils from '../../common/utils/utils';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    school:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '完善个人信息(3/3)'
    });
    //先拿local 没有就去登陆
    var that = this;
    //获取 地区列表
    var userInfo = service.user.getStoreInfo();
    if (!userInfo) {
      service.user.login(userData => {
        userInfo = userData.user;
        that.setData({
          userInfo: userInfo,
          school:utils.getValueByPath(userInfo,'school.name')
        })
      });
    } else {
      that.setData({
        userInfo: userInfo.user,
        school:utils.getValueByPath(userInfo,'user.school.name')
      })
    }
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
   * 用户点击右上角分享
   */
  goPage: function (event) {
    var URL = '../signUpC1/signUpC1';
    var type = event.currentTarget.dataset.type;
    if (type == 'school') {
      if(this.data.school){
        return
      }
      URL = '../signUpC2/signUpC2'
    }else {
      if(this.data.userInfo.certification_status==2){
        return
      }
    }
    wx.navigateTo({
      url: URL
    });
  }
})