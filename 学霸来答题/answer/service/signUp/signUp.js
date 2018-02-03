import ajax from '../../common/ajax/ajax'

var login = require('../login/login.js')
var App = getApp();
module.exports = {
  getRegCode (phone, callback) {
    var userInfo = login.getStoreInfo() || {};
    var token = userInfo.auth_token || '';
    ajax.post({
      url: App.GET_API('POST_verification_requests'),
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
    ajax.post({
      url: App.GET_API('POST_verification'),
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
  PutUserInfo (callback) {
    ajax.post({
      url: App.GET_API('userInfo'),
      type: 'put',
      param: {
        "phone": "string",
        "nickname": "string",
        "avatar": "string",
        "gender": 0,
        "birthday": "2018-02-03",
        "relationship_status": 0,
        "province": {
          "id": "string",
          "name": "string"
        },
        "city": {
          "id": "string",
          "name": "string"
        },
        "school": {
          "id": "string",
          "name": "string"
        },
        "department": {
          "id": "string",
          "name": "string"
        },
        "name": "string",
        "major": "string",
        "enroll": 0,
        "degree": 0,
        "certification_status": 0,
        "movies": [
          "string"
        ],
        "music": [
          "string"
        ],
        "books": [
          "string"
        ],
        "hobbies": [
          "string"
        ],
        "characters": [
          "string"
        ],
        "bio": "string"
      }
    }, function (result) {
      callback && callback(result);
    })
  },
  GetAreaInfo(callback){
    ajax.query({
      url: App.GET_API('GET_cities'),
    }, function (result) {
      callback && callback(result);
    })
  },
  GetUserInfo (callback) {
    ajax.post({
      url: App.GET_API('userInfo'),
      type: 'get',
    }, function (result) {
      callback && callback(result);
    })
  },
  setStoreInfo (data) {
    if (!data) {
      return;
    }
    //注册后更跟新 userinfo
    wx.setStorageSync('userinfo', data);
  }
};