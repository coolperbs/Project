import service from '../../service/service'
import utils from '../../common/utils/utils';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusArr: {
            1: '单',
            2: '保密',
            3: '恋爱中'
        },
        userInfo: {},
        myRank:{}
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '最强学霸'
        });

    },
    initData: function (userInfo) {
        var that = this;
        that.setData({
            userInfo: userInfo
        });
        that.getAstro();
        service.questions.getRank(res => {
            that.setData({
                myRank:res.my_ranking,
            })
        })
    },
    onPullDownRefresh:function () {
        this.initPage();
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
    },
    getAstro: function () {
        var birthday = this.data.userInfo.birthday;
        var year = birthday.split('-')[0];
        var month = birthday.split('-')[1];
        var day = birthday.split('-')[2];
        var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        var result = s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
        var userInfo = this.data.userInfo;
        userInfo.astro = result+'座';
        userInfo.age = new Date().getFullYear() - year;
        this.setData({
            userInfo: userInfo
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.initPage();
    },
    goSchool:function () {
        wx.navigateTo({
            url: '../signUpC/signUpC?edit=true'
        });
    },
    goPersonal:function () {
        wx.navigateTo({
            url: '../signUpB/signUpB?edit=true'
        });
    }
});