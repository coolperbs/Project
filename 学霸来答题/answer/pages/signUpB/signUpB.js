// pages/signUpB/signUpB.js


import service from '../../service/service'


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
    multiIndex: [0, 0]
  },
  //todo 待确定 gender 表示意思

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    service.user.isLogin(res => {
      if (!res) {
        service.user.login(res => {
          debugger
          //初始化页面数据

          if (res) {
            that.setData({
              "nickname": res.user.nickname,
              "avatar": res.user.avatar,
              "gender": res.user.gender,
              "birthday": res.user.birthday,
              "relationship_status": res.user.relationship_status,
            })
          }
          that.onLoadEvt(options);
        });
      }
    })
  },
  /*
  * 近页面做的事
  * */
  onLoadEvt: function (options) {
    var that = this;
    //获取 地区列表
    service.signUp.GetAreaInfo(res => {
      if (res.constructor == Array) {

        var province = (res || []).map(v => {
          return v.name;
        });
        var city = (res || []).map(v => {
          return v.cities.map(v2 => {
            return v2.name
          });
        });
        var otherData = service.signUp.getOtherData();
        var newCity = {
          id: res[0].cities[0].id,
          name: res[0].cities[0].name
        };
        var newProvince = {
          id: res[0].id,
          name: res[0].name
        };
        var recity = otherData ? otherData.city ? otherData.city : newCity : newCity;
        var reprovince = otherData ? otherData.province ? otherData.province : newProvince : newProvince;
        debugger
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
    if (options.edit) {
      //todo 编辑状态
    } else {
      wx.getUserInfo({
        success (res) {
          if (res.errMsg = 'etUserInfo:ok') {
            var userInfo = res.userInfo || {};
            that.setData({
              avatar: userInfo.avatarUrl,
              nickname: userInfo.nickName,
              gender: userInfo.gender
            })
          }
        }
      })
    }
    wx.setNavigationBarTitle({
      title: '完善个人信息(2/3)'
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
  /**
   * 选择图片
   * */
  chooseRealImage: function (type) {
    var that = this;
    var tempType = [];
    tempType.push(type);
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: tempType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        if (res.tempFilePaths.length > 0) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            avatar: res.tempFilePaths[0]
          })
        }
      },
      fail: function (res) {
        console.log(res.tempFilePaths);
      }
    })
  },
  /**
   * 保存用户基本数据
   * */
  saveBasicInfo: function () {
    if (this.data.nickname == '') {

      return
    }
    service.signUp.PutUserInfo({
      "nickname": this.data.nickname,
      "avatar": this.data.avatar,
      "gender": this.data.gender,
      "birthday": this.data.birthday,
      "relationship_status": this.data.relationship_status,
      "province": this.data.province,
      "city": this.data.city,
    }, function (res) {
      if (res.code) {
        wx.showModal({
          title: '提示',
          content: '保存失败'
        });
      } else {
        // wx.navigateTo({
        //   url: '../signUpC/signUpC'
        // });
      }

    })
  }
});