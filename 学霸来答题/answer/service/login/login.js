import ajax from '../../common/ajax/ajax'
import qiniuUploader from '../../common/qiniuUploader/qiniuUploader'

var App = getApp();
var HOST = App.HOST;
var URL = {
  POST_LOGIN: HOST + "api/answer_v1/wechat_auths",//微信登录认证接口
  POST_verification_requests: HOST + "api/answer_v1/auth/verification_requests",//注册发送验证码
  POST_verification: HOST + "api/answer_v1/auth/verifications",//验证码校验
  userInfo: HOST + 'api/answer_v1/user',//get 获取 put 更新
  GET_cities: HOST + 'api/answer_v1/cities',//获取城市列表
  GET_school: HOST + 'api/answer_v1/schools',
};
var CONF = {
  storeName: 'userinfo'//前端存储的用户信息
};
var _fn = {
  merge (r, s) {
    var result = {}, p;

    for (p in r) {
      result[p] = r[p];
    }
    for (p in s) {
      result[p] = s[p]
    }
    return result;
  },
  wxLogin (callback) {
    wx.login({
      success (res) {
        callback && callback(_fn.merge(error.success, {data: res}));
      },
      fail (res) {
        callback && callback(_fn.merge(error.loginError, {errorInfo: res}));
      }
    })
  },
  getWxUserInfo (callback) {
    wx.getUserInfo({
      success: function (res) {
        callback(_fn.merge(error.success, {data: res}));
      },
      fail: function (res) {
        callback && callback(_fn.merge(error.getWxUserInfoError, {errorInfo: res}));
      }
    });
  },
  isErrorRes (res) {
    if (!res || !res.code === '0000' || !res.data) {
      return true;
    }
    return false;
  },
  setStoreInfo (data) {
    if (!data) {
      return;
    }
    wx.setStorageSync(CONF.storeName, data);
  }
};
var error = _fn.merge(error, {
  loginError: {code: -1001, success: false, msg: '调用小程序登录接口失败，请稍后重试'},	//
  getWxUserInfoError: {code: -1002, success: false, msg: '调用微信用户信息接口失败，请稍后重试'} //
});

var handle = {
  getStoreInfo () {
    return wx.getStorageSync(CONF.storeName) || null;
  },
  login (callback) {
    this.updateInfo(callback);
  },
  getInfo (callback) {
    var userInfo = handle.getStoreInfo();
    if (!userInfo) { // 没有则从服务器拉取信息
      handle.updateInfo(callback);
      return;
    }

    // 如果失效需要重新登录唤醒微信登录态
    wx.checkSession({
      success: function () {
        callback && callback(_fn.merge(error.success, {data: userInfo}));
      },
      fail: function () {
        // 这里是走流程还是直接wx.login就行？
        handle.updateInfo(callback);
      }
    });
  },
  updateInfo (callback) {
    // 1.登录
    _fn.wxLogin((loginInfo) => {
      if (_fn.isErrorRes(loginInfo)) {
        callback && callback(loginInfo);
        return;
      }
      // 2.获取微信侧登录信息
      _fn.getWxUserInfo(function (wxUserInfo) {
        if (_fn.isErrorRes(wxUserInfo)) {
          callback && callback(wxUserInfo);
          return;
        }
        // 3.调取服务端数据
        ajax.getPost({
          url: URL['POST_LOGIN'],
          method: 'post',
          param: {
            code: loginInfo.data.code,
            iv: wxUserInfo.data.iv,
            encryptedData: wxUserInfo.data.encryptedData
          }
        }, function (userInfo) {
          // 保存信息
          if (userInfo /*&& userInfo.code == '0000' && userInfo.success == true*/) {
            _fn.setStoreInfo(userInfo);
          }
          callback && callback(userInfo);
        });
      });
    });
  },
  isLogin (callback) {
    let userInfo = wx.getStorageSync(CONF.storeName) || {};
    if (!userInfo.token) {
      callback(false);
      return
    }
    wx.checkSession({
      success (res) {
        callback(true);
      },
      fail () {
        callback(false);
      }
    })
  },

  /*-------------------------*/
  getRegCode (phone, callback) {
    var userInfo = this.getStoreInfo();
    var token = userInfo.auth_token || '';
    ajax.getPost({
      url: URL['POST_verification_requests'],
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
    debugger
    var userInfo = this.getStoreInfo() || {};
    var token = userInfo.auth_token || '';
    var that = this;
    ajax.getPost({
      url: URL['POST_verification'],
      method: 'post',
      header: {
        Authorization: token
      },
      param: {
        code: regCode
      }
    }, function (result) {
      _fn.setStoreInfo(result);
      callback && callback(result);
    })
  },
  PutUserInfo (object, callback) {
    var that = this;
    var userInfo = this.getStoreInfo() || {};
    var token = userInfo.user.token || '';
    //错误判断 todo
    ajax.getPost({
      url: URL['userInfo'],
      method: 'put',
      param: {
        "phone": object.phone,
        "nickname": object.nickname,
        "avatar": object.avatar,
        "gender": object.gender,
        "birthday": object.birthday,
        "relationship_status": object.relationship_status,
        "province": object.province,
        "city": object.city
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
      }
    }, function (result) {
      if (!result.code) {
        //这里返回的只有user数据
        var userInfo = that.getStoreInfo() || {};
        var newUserInfo = _fn.merge(result, {
          "province": object.province,
          "city": object.city
        });
        userInfo.user = newUserInfo;
        _fn.setStoreInfo(userInfo);
      }
      callback && callback(result);
    })
  },
  GetAreaInfo (callback) {
    ajax.getPost({
      url: URL['GET_cities']
    }, function (result) {
      callback && callback(result);
    })
  },
  GetUserInfo (callback) {
    var userInfo = login.getStoreInfo() || {};
    var token = userInfo.user.token || '';
    ajax.getPost({
      url: URL['userInfo'],
      method: 'get',
      header: {
        Authorization: token
      }
    }, function (result) {
      callback && callback(result);
    })
  },
  UploadFile (filePath, callback) {
    qiniuUploader.upload(filePath, (res) => {
      // 每个文件上传成功后,处理相关的事情
      // 其中 info 是文件上传成功后，服务端返回的json，形式如
      // {
      //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
      //    "key": "gogopher.jpg"
      //  }
      // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
      /* that.setData({
         'imageURL': res.imageURL,
       });*/
      debugger
      callback(res);
    }, (error) => {
      console.log('error: ' + error);
    }, {
      region: 'ECN',
      domain: 'bzkdlkaf.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
      // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
      uptoken: '[yourTokenString]', // 由其他程序生成七牛 uptoken
      uptokenURL: 'UpTokenURL.com/uptoken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
      uptokenFunc: function () {
        return '[yourTokenString]';
      }
    });
  },
  /*----------------*/
  getSchoolList (callback) {
    ajax.getPost({
      url: URL['GET_school'],
      method: 'get'
    }, res => {
      if (res.constructor != Array) {
        return
      }
      callback(res);
    })
  },
  getDepartmentList(object,callback){
    ajax.getPost({
      url: URL['GET_school']+'/'+object.school_id+'/departments',
      method: 'get'
    }, res => {
      if (res.constructor != Array) {
        return
      }
      callback(res);
    })
  }
};
module.exports = handle;