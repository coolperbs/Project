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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '排行榜'
        });
        this.initPage();
    },
    initData: function (userInfo) {
        var that = this;
    },
    initPage: function () {
        var that = this;
        //获取 地区列表
        var userInfo = service.user.getStoreInfo() || {};
        if (!userInfo.user) {
            service.user.getUserInfo(userData => {
                that.initData(userData.user || {});
            });
        } else {
            that.initData(userInfo.user);
        }
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