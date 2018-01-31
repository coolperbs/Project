// pages/entry.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageDpr: 2
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.login({
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                console.log(res)
            }
        })
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
     * 自定义事件 去登陆
     * */
    goLogin: function () {
        //todo 会去先校验登陆时效性,如果已经登陆 就去答题主页,否则 进行授权 或者登陆注册

        wx.navigateTo({
            url:'../signUpA/signUpA'
        });
        //todo 已经登陆的 直接走主页面 这个逻辑需要放到onload 里面处理 只有非登陆的才能看到 登陆界面 ?
        // wx.redirectTo({
        //     url:'../signUpA/signUpA'
        // })
    }
});