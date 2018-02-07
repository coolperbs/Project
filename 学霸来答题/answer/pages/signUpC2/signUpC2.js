// pages/signUpC2/signUpC2.js
import service from '../../service/service'
import utils from '../../common/utils/utils';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        schoolList: [],
        departmentList: [],
        schoolIndex: 0,
        departmentIndex: 0,
        school:{},
        department:{},
        name: '',
        major: '',
        degree: {id: 1, name: "本科"},
        degreeIndex: 0,
        degreeArr: [{id: 1, name: "本科"},{id: 2, name: "硕士"},{id: 3, name: "博士"}],
        enroll: '',
        enrollIndex: 0,
        enrollArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      debugger
        wx.setNavigationBarTitle({
            title: '学校信息'
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
        that.getSchool(function (res) {
            that.getDepartment(function () {
                that.setData({
                    name:userInfo.name,
                    school:userInfo.school||that.data.school,
                    department:userInfo.department||that.data.department,
                    major:userInfo.major,
                    enroll:userInfo.enroll
                });
            });
        });
        //初始化入学时间
        var time = new Date();
        var start = time.getFullYear();
        var enrollArr = [];
        for (var i = start; i > 1918; i--) {
            var temp = i;
            enrollArr.push(temp)
        }
        that.setData({
            enrollArr: enrollArr,
            enroll: start
        });
        //todo 填充默认数据
        if (options.edit) {

        } else {

        }

    },
    getSchool: function (callback) {
        var that = this;
        service.user.getSchoolList(function (res) {
            that.setData({
                schoolList: res,
                school: res[0]
            });
            callback();
        });
    },
    getDepartment: function (callback) {
        var that = this;
        service.user.getDepartmentList({school_id: this.data.school.id}, function (res) {
            that.setData({
                departmentList: res,
                department: res[0]
            });
            callback && callback(res);
        });
    },
    /*
    * 选择入学时间
    * */
    bindEnrollChange: function (e) {
        var that = this;
        var enrollIndex = e.detail.value;
        var enroll = that.data.enrollArr[enrollIndex];
        this.setData({
            enroll: enroll,
            enrollIndex: enrollIndex
        });
    },
    /*
    * 学位选择
    * */
    bindDegreeChange:function (e) {
        var that = this;
        var degreeIndex = e.detail.value;
        var degree = that.data.degreeArr[degreeIndex];
        this.setData({
            degree: degree,
            degreeIndex: degreeIndex
        });
    },
    /*
    * 选择学校
    * */
    bindSchoolChange: function (e) {
        var that = this;
        var schoolIndex = e.detail.value;
        var school = that.data.schoolList[schoolIndex];
        this.setData({
            school: school,
            schoolIndex: schoolIndex
        });
        debugger
        that.getDepartment();
    },
    /**
     * 选择学院
     * */
    bindDptChange: function (e) {
        var that = this;
        var dptIndex = e.detail.value;
        var dpt = that.data.departmentList[dptIndex];
        this.setData({
            department: dpt,
            departmentIndex: dptIndex
        });
    },
    /*
    * 输入框事件
    * */
    bindKeyInput: function (e) {
        var value = e.detail.value;
        if (e.currentTarget.dataset.type == 'name') {
            this.setData({
                name: value
            })
        }
        if (e.currentTarget.dataset.type == 'major') {
            this.setData({
                major: value
            })
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
    saveBasicInfo: function () {
        if (!/^[\u4e00-\u9fa5]+$/gi.test(this.data.name)) {
            wx.showModal({
                title: '提示',
                content: '真实姓名请使用中文且不能为空'
            });
            return
        }
        if (!/^[\u4e00-\u9fa5]+$/gi.test(this.data.major)) {
            wx.showModal({
                title: '提示',
                content: '专业请使用中文且不能为空'
            });
            return
        }
        if (this.data.name.length > 10) {
            wx.showModal({
                title: '提示',
                content: '姓名限制10个汉字'
            });
            return
        }
        if (this.data.major.length > 20) {
            wx.showModal({
                title: '提示',
                content: '专业限制20个汉字'
            });
            return
        }
        service.user.putUserInfo({
            "name": this.data.name,
            "school": this.data.school,
            "department": this.data.department,
            "major": this.data.major,
            "degree": this.data.degree.id,
            "enroll":this.data.enroll
        }, function (res) {
            wx.navigateBack({
                delta: 1
            });
        })
    }
});