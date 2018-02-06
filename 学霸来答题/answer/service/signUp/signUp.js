import ajax from '../../common/ajax/ajax'

var login = require('../login/login.js');
var App = getApp();
module.exports = {
  getRegCode (phone, callback) {
    var userInfo = login.getStoreInfo() || {};
    var token = userInfo.auth_token || '';
    ajax.getPost({
      url: App.GET_API('POST_verification_requests'),
      method: 'post',
      header: {
        Authorization: token
      },
      param: {
        phone: phone
      }
    }, function (result) {
      callback && callback(result);
    })
  },
  checkRegCode (regCode, callback) {
    var userInfo = login.getStoreInfo() || {};
    var token = userInfo.auth_token || '';
    var that = this;
    ajax.getPost({
      url: App.GET_API('POST_verification'),
      method: 'post',
      header: {
        Authorization: token
      },
      param: {
        code: regCode
      }
    }, function (result) {
      that.setStoreInfo(result);
      callback && callback(result);
    })
  },
  PutUserInfo (object, callback) {
    var userInfo = login.getStoreInfo() || {};
    var token = userInfo.user.token || '';
    var that = this;
    ajax.getPost({
      url: App.GET_API('userInfo'),
      method: 'put',
      param: {
        "phone": object.phone,
        "nickname": object.nickname,
        "avatar": object.avatar,
        "gender": object.gender,
        "birthday": object.birthday,
        "relationship_status": object.relationship_status,
        "province": object.province,
        "city": object.city,
        // "school": {
        //   "id": "string",
        //   "name": "string"
        // },
        // "department": {
        //   "id": "string",
        //   "name": "string"
        // },
        // "name": "string",
        // "major": "string",
        // "enroll": 0,
        // "degree": 0,
        // "certification_status": 0,
        // "movies": [
        //   "string"
        // ],
        // "music": [
        //   "string"
        // ],
        // "books": [
        //   "string"
        // ],
        // "hobbies": [
        //   "string"
        // ],
        // "characters": [
        //   "string"
        // ],
        // "bio": "string"
      },
      header: {
        Authorization: token
      },
    }, function (result) {
      if (!result.code) {
        that.setStoreInfo(result);
        that.setOtherData({
          "province": object.province,
          "city": object.city,
        })
      }
      callback && callback(result);
    })
  },
  GetAreaInfo (callback) {
    ajax.getPost({
      url: App.GET_API('GET_cities'),
    }, function (result) {
      callback && callback(result);
    })
  },
  GetUserInfo (callback) {
    var userInfo = login.getStoreInfo() || {};
    var token = userInfo.user.token || '';
    ajax.getPost({
      url: App.GET_API('userInfo'),
      method: 'get',
      header: {
        Authorization: token
      },
    }, function (result) {
      callback && callback(result);
    })
  },
  setStoreInfo (data,) {
    if (!data) {
      return;
    }
    var userInfo = login.getStoreInfo();
    userInfo.user = data;
    //注册后更跟新 userinfo
    wx.setStorageSync('userinfo', userInfo);

  },
  setOtherData (otherData) {
    if (!otherData) {
      return;
    }
    var oldData = this.getOtherData();
    for (var k in oldData) {
      if (!otherData[k]) {
        otherData[k] = oldData[k];
      }
    }
    wx.setStorageSync('otherData', otherData);
  },
  getOtherData () {
    return wx.getStorageSync('otherData') || null;
  }
};