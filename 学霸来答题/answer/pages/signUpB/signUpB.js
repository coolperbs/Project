// pages/signUpB/signUpB.js


import service from '../../service/service'
import utils from '../../common/utils/utils';

var time = new Date();
var year = time.getFullYear();
var month = time.getMonth() + 1;
var day = time.getDate();
var tody = year + '-' + month + '-' + day;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatar: '../../images/image_head_sample@2x.png',
        nickname: '',
        gender: 0,
        relationship_status: 0,
        birthday: tody,
        today: tody,
        AreaData: [],
        province: {
            id: '',
            name: ''
        },
        city: {
            id: '',
            name: ''
        },
        cityArr: [],
        multiArr: [],
        multiIndex: [0, 0],
        changeAvatar: false,
        edit:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initPage();
        if(options.edit){
            wx.setNavigationBarTitle({
                title: '个人信息'
            });
            this.setData({
                edit:true
            });
            return
        }
        wx.setNavigationBarTitle({
            title: '完善个人信息(2/3)'
        });
    },
    initData: function (userInfo) {
        var that = this;
        service.user.getAreaInfo(res => {
            if (res.constructor == Array) {

                var province = (res || []).map(v => {
                    return v.name;
                });
                var city = (res || []).map(v => {
                    return v.cities.map(v2 => {
                        return v2.name
                    });
                });

                var tempCity = utils.getValueByPath(userInfo, 'city');
                var tempProvince = utils.getValueByPath(userInfo, 'province');

                var newCity = {
                    id: res[0].cities[0].id,
                    name: res[0].cities[0].name
                };
                var newProvince = {
                    id: res[0].id,
                    name: res[0].name
                };
                var recity = tempCity ? tempCity : newCity;
                var reprovince = tempProvince ? tempProvince : newProvince;
                that.setData({
                    AreaData: res,
                    multiArr: [province, city[0]],
                    city: recity,
                    province: reprovince,
                    cityArr: city,
                    provinceArr: province
                })
            }
        });

        that.setData({
            "nickname": utils.getValueByPath(userInfo, 'nickname'),
            "avatar": utils.getValueByPath(userInfo, 'avatar'),
            "gender": utils.getValueByPath(userInfo, 'gender'),
            "birthday": utils.getValueByPath(userInfo, 'birthday'),
            "relationship_status": utils.getValueByPath(userInfo, 'relationship_status')
        });
        if(that.data.avatar==''){
            wx.getUserInfo({
                success(res) {
                    if (res.errMsg = 'etUserInfo:ok') {
                        var wxInfo = res.userInfo || {};
                        that.setData({
                            avatar: wxInfo.avatarUrl,
                            nickname: wxInfo.nickName,
                            gender: wxInfo.gender
                        })
                    }
                }
            });
        }
    },
    initPage:function () {
        var that = this;
        //获取 地区列表
        var userInfo = service.user.getStoreInfo()||{};
        if (!userInfo.user) {
            service.user.login(userData => {
                that.initData( userData.user||{});
            });
        } else {
            that.initData(userInfo.user);
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.initPage();
    },
    /**
     * 根据 city province id 设置 multiArr: [],multiIndex: [0, 0]
     * */
    setMultiArr: function () {
        var provinceId = this.data.province.id;
        var cityId = this.data.city.id;
        for (var i = 0; i < this.data.AreaData.length; i++) {
            var province = this.data.AreaData[i];
            if (province.id == provinceId) {
                for (var k = 0; k < province.cities.length; k++) {
                    var city = province.cities[k];
                    if (city.id == cityId) {
                        this.setData({
                            multiIndex: [i, k],
                            multiArr: [this.data.provinceArr, this.data.cityArr[i]]
                        });
                        break;
                    }
                }
            }
        }
    },
    /**
     * 选择地区
     * */
    bindMultiPickerChange: function (e) {
        var provinceIndex = e.detail.value[0];
        var cityIndex = e.detail.value[1];
        var province = this.data.AreaData[provinceIndex];
        var city = this.data.AreaData[provinceIndex].cities[cityIndex];
        this.setData({
            province: {
                id: province.id,
                name: province.name
            },
            city: {
                id: city.id,
                name: city.name
            }
        })
    },
    bindMultiPickerColumnChange: function (e) {
        if (e.detail.column == 0) {
            var province = this.data.provinceArr;
            var index = e.detail.value;


            this.setData({
                multiArr: [province, this.data.cityArr[index]],
                multiIndex: [index, 0]
            })

        }
    },
    /**
     * 选择生日
     * */
    bindDateChange: function (e) {
        this.setData({
            birthday: e.detail.value
        })
    },
    /**
     * 修改性别
     * */
    changeGender: function (e) {
        this.setData({
            gender: e.currentTarget.dataset.gender
        })
    },
    /**
     * 修改感情状态
     * */
    changeStatus: function (e) {
        this.setData({
            relationship_status: e.currentTarget.dataset.status
        })
    },
    /**
     * 添加图片方式
     * */
    startChooseEvt: function () {
        var that = this;
        utils.startChooseEvt(null,function (res) {
            var filePath = res.tempFilePaths[0];
            that.setData({
                avatar: filePath,
                changeAvatar: true
            });
        })
    },
    /**
     * 保存用户基本数据
     * */
    saveBasicInfo: function () {
        var that = this;
        if (that.data.changeAvatar) {
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
        var that=this;
        service.user.putUserInfo({
            "nickname": this.data.nickname,
            "avatar": this.data.avatar,
            "gender": this.data.gender,
            "birthday": this.data.birthday,
            "relationship_status": this.data.relationship_status,
            "province": this.data.province,
            "city": this.data.city
        }, function (res) {
            if(!that.data.edit){
                wx.navigateTo({
                    url: '../signUpC/signUpC'
                });
            }else {
                wx.navigateBack({
                    delta: 1
                });
            }

        })
    }
});