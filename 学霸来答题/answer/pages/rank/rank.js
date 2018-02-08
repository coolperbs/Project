import service from '../../service/service'
import utils from '../../common/utils/utils';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        myRank:{},
        allRank:[]
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '排行榜'
        });
        this.initPage();
    },
    initPage: function () {
        var that = this;
        service.questions.getRank(res => {
            that.setData({
                myRank:res.my_ranking,
                allRank:res.all_ranking
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.initPage();
    }

});