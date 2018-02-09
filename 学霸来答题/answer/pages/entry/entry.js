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
        path = userId ? 'pages/index/index?userId=' + userId : 'pages/index/index'
        return {
            title: '快来参加大学生专属的有奖答题，瓜分奖学金，送你复活卡，快来领。',
            path: path,
            imageUrl:'../../images/share_bg.png'
        };
    },
    onPullDownRefresh:function () {
        this.initPage();
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1500)
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
              //     wx.redirectTo({
              //         url: '../index/index'
              //     })
              // }

              var user =res.user||{};
              if(!user.phone){
                  setTimeout(()=>{
                      wx.redirectTo({
                          url: '../signUpA/signUpA'
                      })
                  },1500);

              }
              if(!user.nickname||!user.avatar||!user.city){
                  setTimeout(()=>{
                      wx.redirectTo({
                          url: '../signUpB/signUpB'
                      });
                  },1500);
                  return
              }
              if(!user.department||!user.school||user.certification_status==0){
                  setTimeout(()=>{
                      wx.redirectTo({
                          url: '../signUpC/signUpC'
                      });
                  },1500);
                  return
              }
              if(user.nickname&&user.avatar&&user.city&&user.department){
                  setTimeout(()=>{
                      wx.redirectTo({
                          url: '../index/index'
                      });
                  },1500);
                  return
              }

          }else {
              this.setData({
                  canLogin:true
              });
              setTimeout(()=>{
                  wx.redirectTo({
                      url: '../signUpA/signUpA'
                  })
              },1500);
          }

      });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function () {
        //this.initPage();
    },
    /**
     * 自定义事件 去登陆/注册
     * */
    goLogin: function () {
        // if(!this.data.canLogin){
        //     wx.showLoading({
        //         title:'加载中...',
        //         mask:true
        //     });
        //     setTimeout(()=>{
        //         wx.hideLoading();
        //     },1500)
        //     return
        // }
        // wx.navigateTo({
        //     url: '../signUpA/signUpA'
        // });
        this.initPage();
    }
});