// pages/signUpC1/signUpC1.js
import service from '../../service/service'
import utils from '../../common/utils/utils';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificates: [],
    chooseImage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '身份认证'
    });
    //先拿local 没有就去登陆
    var that = this;
    //获取 地区列表
    var userInfo = service.user.getStoreInfo();
    if (!userInfo) {
      service.user.login(userData => {
        userInfo = userData.user;
        that.initData(options, userInfo);
      });
    } else {
      that.initData(options, userInfo.user);
    }
  },
  initData: function (options, userInfo) {
    var that = this;
    that.setData({
      certificates: userInfo.certificates||[]
    });
    //todo 填充默认数据
    if (options.edit) {

    } else {

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
   * 删除用户上传的某张图片
   * */
  deleteEvt: function (e) {
    var index = e.currentTarget.dataset.index;
    var arr = this.data.certificates;
    arr.splice(index, 1);
    this.setData({
      certificates: arr
    });
  },
  /**
   * 添加图片方式
   * */
  startChooseEvt: function () {
    var that = this;
    utils.startChooseEvt(3, function (res) {
      var filePath = res.tempFilePaths;
      var certificates = that.data.certificates;
      for (var i = 0; i < filePath.length; i++) {
        var currentLen = certificates.length;
        if(currentLen>=3){
          break
        }
        certificates.push(filePath[i])
      }
      that.setData({
        certificates: certificates,
        chooseImage: true,
      })
    })
  },
  uploadFileEvt: function (object, callback) {
    var that=this;
    service.user.myUpload({
      filePath: object.filePath,
      key: 1
    }, function (res) {
      var certificates = that.data.certificates;
      certificates[object.index] = 'https://' + res;
      that.setData({
        certificates: certificates
      });
      callback()
    });
  },
  saveBasicInfo: function () {

    var that = this;
    var certificates = that.data.certificates;
    var count = certificates.length;
    if(count==0){
      wx.showModal({
        title: '提示',
        content: '请选择认证图片'
      });
      return
    }
    if (that.data.chooseImage) {
      if (count > 0) {
        var filePath = certificates;
        that.uploadFileEvt({filePath:filePath[0],index:0},()=>{
          if(count<2){
            that.saveInfo();
            wx.hideLoading();
            return
          }
          that.uploadFileEvt({filePath:filePath[1],index:1},()=>{
            if(count<3){
              that.saveInfo();
              return
            }
            that.uploadFileEvt({filePath:filePath[2],index:2},()=>{
              that.saveInfo();
            })
          })
        });
      }
    } else {
      that.saveInfo();
    }
  },
  saveInfo: function () {
    service.user.putUserInfo({
      "certificates": this.data.certificates
    }, function (res) {
      wx.navigateTo({
        url: '../signUpC/signUpC'
      });
    })
  }
});