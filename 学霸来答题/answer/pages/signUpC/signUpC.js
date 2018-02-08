// pages/signUpC/signUpC.js
import service from '../../service/service'
import utils from '../../common/utils/utils';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        school: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '完善个人信息(3/3)'
        });
        this.initPage(options)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        this.initPage(options)
    },
    /**
     * 更新页面数据
     * */
    initPage: function (options) {
        //先拿local 没有就去登陆
        var that = this;
        //获取 地区列表
        var userInfo = service.user.getStoreInfo();
        if (!userInfo) {
            service.user.login(userData => {
                userInfo = userData.user;
                that.setData({
                    userInfo: userInfo,
                    school: utils.getValueByPath(userInfo, 'school.name')
                })
            });
        } else {
            that.setData({
                userInfo: userInfo.user,
                school: utils.getValueByPath(userInfo, 'user.school.name')
            })
        }
    },
    goPage: function (event) {
        var URL = '../signUpC1/signUpC1';
        var type = event.currentTarget.dataset.type;
        if (type == 'school') {
            if (this.data.school) {
                return
            }
            URL = '../signUpC2/signUpC2'
        } else {
            if (this.data.userInfo.certification_status == 2) {
                return
            }
        }
        wx.navigateTo({
            url: URL
        });
    },
    saveBasicInfo: function () {
        if (this.data.userInfo.certification_status != 2) {
            wx.showModal({
                title: '提示',
                content: '请认证学生信息',
                confirmText: '现在就去',
                success: function (res) {
                    if (!res.confirm) {
                        return;
                    }
                    wx.navigateTo({
                        url: '../signUpC1/signUpC1'
                    });
                }
            });
            return
        }
        if (!this.data.school) {
            wx.showModal({
                title: '提示',
                content: '请认证学校信息',
                confirmText: '现在就去',
                success: function (res) {
                    if (!res.confirm) {
                        return;
                    }
                    wx.navigateTo({
                        url: '../signUpC2/signUpC2'
                    });
                }
            });
            return
        }
        wx.redirectTo({
            url: '../index/index'
        })
    }
});