// pages/signUpC1/signUpC1.js
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
   * 删除用户上传的某张图片
   * */
  deleteEvt: function () {
    console.log(1111)
  },
  /**
   * 添加图片方式
   * */
  startChooseEvt: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        var type = ['album', 'camera'];
        that.chooseRealImage(type[res.tapIndex]);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 选择图片
   * */
  chooseRealImage: function (type) {
    var _this = this;
    var tempType=[];
    tempType.push(type);
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: tempType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
      },
      fail: function (res) {
        console.log(res.tempFilePaths);
      }
    })
  }
});