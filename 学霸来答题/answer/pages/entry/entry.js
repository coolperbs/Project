// pages/entry.js
import service from '../../service/service'

Page({

    /**
     * 页面的初始数据
     */
    data: {},
    onShareAppMessage : function() {
        var userId,
            userInfo = service.user.getStoreInfo(),
            path;

        userId = userInfo || {};
        userId = userId.user || {};
        userId = userId.id;
        path = userId ? 'pages/getCard/getCard?userId=' + userId : 'pages/index/index'
        return {
            path : path,
        };
    },
    onPullDownRefresh:function () {
        this.initPage();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    initPage: function () {
      service.user.login(res => {
        if (res.user) {
          //todo 已经登陆了 跳转主页面去
          wx.redirectTo({
            url: '../index/index'
          })
        }
      });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.initPage();
    },
    /**
     * 自定义事件 去登陆/注册
     * */
    goLogin: function () {
        wx.navigateTo({
            url: '../signUpA/signUpA?a=1'
        });
    }
});