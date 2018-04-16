// pages/login/login.js
import {login} from '../../services/index'
import util from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginDisabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.optData = options;
    console.log('12312',options)
    this.loginEVT();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loginEVT() {
    this.setData({
      loginDisabled:true
    })
    login.isLogin((res) => {
      if (!res) {
        login.login((res2) => {
          if (res2) {
           this.goPage();
          }
          this.setData({
            loginDisabled:res2
          })
        });
      } else {
        this.setData({
          loginDisabled:false
        })
        this.goPage();
      }
    })
  },
  goPage(){
    setTimeout(() => {
      util.redirectTo('../home/home', this.optData)
    }, 1000);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})