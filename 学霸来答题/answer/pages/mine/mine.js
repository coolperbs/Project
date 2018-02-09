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
        myRank: {},
        statusArr2:{
            0:'待提交认证',
            1:'待提交认证',
            2:'认证中',
            3:'认证通过',
            4:'认证失败'
        }
    },
    onShareAppMessage: function () {
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
                myRank: res.my_ranking
            })
        })
    },
    onPullDownRefresh: function () {
        this.initPage();
    },
    initPage: function () {
        var that = this;
        //获取 地区列表
        service.user.getUserInfo(userData => {
            that.initData(userData || {});
        });
    },
    getAstro: function () {
        var time = new Date();
        var tyear = time.getFullYear();
        var tmonth = time.getMonth() + 1;
        var tday = time.getDate();
        var tody = tyear + '-' + tmonth + '-' + tday;
        var birthday = this.data.userInfo.birthday || tody;
        var year = birthday.split('-')[0];
        var month = birthday.split('-')[1];
        var day = birthday.split('-')[2];
        var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        var result = s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
        var userInfo = this.data.userInfo;
        userInfo.astro = result + '座';
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
    goSchool: function () {
        wx.navigateTo({
            url: '../signUpC/signUpC?edit=true'
        });
    },
    goPersonal: function () {
        wx.navigateTo({
            url: '../signUpB/signUpB?edit=true'
        });
    }
});