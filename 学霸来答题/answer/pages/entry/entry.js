// pages/entry.js
import service from '../../service/service'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canLogin:false
    },
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
    initPage: function () {
      service.user.login(res => {
          if (res.user) {
              // if (res.user.phone&&!res.user.avatar) {
              //     wx.redirectTo({
              //         url: '../signUpB/signUpB'
              //     })
              // } else if (res.user.avatar) {
              //     wx.redirectTo({
              //         url: '../signUpC/signUpC'
              //     })
              // } else {
                  wx.redirectTo({
                      url: '../index/index'
                  })
              // }
          }else {
              this.setData({
                  canLogin:true
              })
          }

      });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function () {
        this.initPage();
    },
    /**
     * 自定义事件 去登陆/注册
     * */
    goLogin: function () {
        if(!this.data.canLogin){
            wx.showLoading({
                title:'加载中...',
                mask:true
            });
            setTimeout(()=>{
                wx.hideLoading();
            },1500)
            return
        }
        wx.navigateTo({
            url: '../signUpA/signUpA?a=1'
        });
    }
});