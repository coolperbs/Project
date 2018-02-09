// pages/signUpC/signUpC.js
import service from '../../service/service'
import utils from '../../common/utils/utils';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        school: '',
        edit:false,
        statusArr:{
            0:'待提交认证',
            1:'待提交认证',
            2:'认证中',
            3:'认证通过',
            4:'认证失败'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


        if(options.edit){
            this.setData({
                edit:true
            });
            wx.setNavigationBarTitle({
                title: '个人信息'
            });
        }else {
            wx.setNavigationBarTitle({
                title: '完善个人信息(3/3)'
            });
        }
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
            title: '快来参加大学生专属的有奖答题，瓜分奖学金，送你复活卡，快来领。',
            path: path,
            imageUrl:'../../images/share_bg.png'
        };
    },
    onPullDownRefresh:function () {
        this.initPage();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.initPage()
    },
    /**
     * 更新页面数据
     * */
    initPage: function () {
        //先拿local 没有就去登陆
        var that = this;
        //获取 地区列表
        service.user.getUserInfo(userData => {
            debugger
            that.setData({
                userInfo: userData,
                school: utils.getValueByPath(userData, 'school.name')
            })
        });

    },
    goPage: function (event) {
        var URL = '../signUpC1/signUpC1';
        var type = event.currentTarget.dataset.type;
        if (type == 'school') {
            URL = '../signUpC2/signUpC2'
        }
        if(this.data.userInfo.certification_status==2&&type != 'school'){
            return
        }
        wx.navigateTo({
            url: URL
        });
    },
    saveBasicInfo: function () {
        var that=this;
        if (this.data.userInfo.certification_status == 0) {
            wx.showModal({
                title: '提示',
                content: '请认证学生信息',
                confirmText: '现在就去',
                cancelText:'稍后认证',
                success: function (res) {
                    if (!res.confirm) {
                        if(that.data.edit){
                            wx.navigateBack({
                                delta: 1
                            });
                        }else {
                            wx.redirectTo({
                                url: '../index/index'
                            })
                        }
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
                cancelText:'稍后认证',
                success: function (res) {
                    if (!res.confirm) {
                        if(that.data.edit){
                            wx.navigateBack({
                                delta: 1
                            });
                        }else {
                            wx.redirectTo({
                                url: '../index/index'
                            })
                        }
                        return;
                    }
                    wx.navigateTo({
                        url: '../signUpC2/signUpC2'
                    });
                }
            });
            return
        }
        wx.showToast({
            title:'保存成功',
            icon:'success'
        });
        setTimeout(()=>{
            if(that.data.edit){
                wx.navigateBack({
                    delta: 1
                });
            }else {
                wx.redirectTo({
                    url: '../index/index'
                })
            }
        },1500)

    }
});