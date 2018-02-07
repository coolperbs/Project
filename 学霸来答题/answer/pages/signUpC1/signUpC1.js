// pages/signUpC1/signUpC1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        certificates:[],
        chooseImage:false
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
            certificates:userInfo.certificates
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
    saveBasicInfo: function () {
        var that = this;
        if (that.data.chooseImage) {
            service.user.myUpload({
                filePath: that.data.avatar,
                key: 0
            }, function (res) {
                that.setData({
                    avatar: 'https://' + res
                });
                that.saveInfo();
            });
        } else {
            that.saveInfo();
        }
    },
    saveInfo: function () {
        service.user.putUserInfo({
            "nickname": this.data.nickname,
            "avatar": this.data.avatar,
            "gender": this.data.gender,
            "birthday": this.data.birthday,
            "relationship_status": this.data.relationship_status,
            "province": this.data.province,
            "city": this.data.city
        }, function (res) {
            wx.navigateTo({
                url: '../signUpC/signUpC'
            });
        })
    }
});