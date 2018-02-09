// pages/pageRule/pageRule.js
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
      setTimeout(()=>{
          wx.stopPullDownRefresh()
      },1500)
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
      var userId,
          userInfo = service.user.getStoreInfo(),
          path;

      userId = userInfo || {};
      userId = userId.user || {};
      userId = userId.id;
      path = userId ? 'pages/getCard/getCard?userId=' + userId : 'pages/index/index'
      return {
          title: '快来参加大学生专属的有奖答题，瓜分奖学金，送你复活卡，快来领。',
          path: path,
          imageUrl:'../../images/share_bg.png'
      };
  }
})