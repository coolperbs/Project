import ajax from '../../common/ajax/ajax'
import qiniuUploader from '../../common/qiniuUploader/qiniuUploader'
import utils from '../../common/utils/utils'

var App = getApp();
var HOST = App.HOST;
var URL = {
  POST_LOGIN: HOST + "api/answer_v1/wechat_auths",//微信登录认证接口
  POST_verification_requests: HOST + "api/answer_v1/auth/verification_requests",//注册发送验证码
  POST_verification: HOST + "api/answer_v1/auth/verifications",//验证码校验
  userInfo: HOST + 'api/answer_v1/user',//get 获取 put 更新
  GET_cities: HOST + 'api/answer_v1/cities',//获取城市列表
  GET_school: HOST + 'api/answer_v1/schools',//学校/学院列表
  GET_uploadToken: HOST + 'api/answer_v1/upload_requests',//上传七牛token
  POST_share_verification_requests: HOST + 'api/web/xueba_shares/verification_requests',//分享信息校验并且获取验证码
  POST_share_verifications: HOST + 'api/web/xueba_shares/verifications',//获取分享的卡

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
  login (callback,merge) {
    this.updateInfo(callback,merge);
  },
  getInfo (callback) {
    var userInfo = handle.getStoreInfo();
    if (!userInfo) { // 没有则从服务器拉取信息
      handle.updateInfo(callback);
      return;
    }
    wx.checkSession({
      success: function () {
        callback && callback(_fn.merge(error.success, {data: userInfo}));
      },
      fail: function () {
        handle.updateInfo(callback);
      }
    });
  },
  updateInfo (callback,merge) {
    // 1.登录
    _fn.wxLogin((loginInfo) => {
      if (_fn.isErrorRes(loginInfo)) {
        callback && callback(loginInfo);
        return;
      }
      // 2.获取微信登录信息
      _fn.getWxUserInfo(function (wxUserInfo) {
        if (_fn.isErrorRes(wxUserInfo)) {
          callback && callback(wxUserInfo);
          return;
        }
          wx.showLoading({
              title:'加载中...',
              mask:true
          });
        setTimeout(()=>{
            wx.hideLoading();
        },2000);
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
          if (userInfo.errMsg || userInfo.error) {
            wx.showModal({
              title: '提示',
              content: userInfo.errMsg || userInfo.error || '微信授权失败请稍候重试',
              confirmText: '确定'
            });
            return
          }
          // 保存信息
          if (userInfo) {
            _fn.setStoreInfo(userInfo);
          }
          callback && callback(userInfo);
        });
      });
    });
  },
  isLogin (callback) {
    let userInfo = wx.getStorageSync(CONF.storeName) || {};
    //判断用户登陆没有 有user 就是老用户,没有user 就是新用户
    if (!userInfo.user) {
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
    var userInfo = this.getStoreInfo() || {};
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

      if (!handle.dealTokenDate(result)) {
        return
      }
      if (result.error) {
        wx.showModal({
          title: '提示',
          content: result.errMsg || result.message.detail || '获取验证码失败',
          confirmText: '确定'
        });
        return
      }
      callback && callback(result);

    })
  },
  checkRegCode (regCode, callback) {
    var userInfo = this.getStoreInfo() || {};
    var token = userInfo.auth_token || '';

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

      if (!handle.dealTokenDate(result)) {
        return
      }
      debugger
      if (result.code && result.code != 0) {
        wx.showModal({
          title: '提示',
          content: result.errMsg || result.message || '获取验证码失败',
          confirmText: '确定'
        });
        return
      }
      _fn.setStoreInfo(result);
      callback && callback(true);
    })
  },
  putUserInfo (object, callback) {
    var that = this;
    var userInfo = this.getStoreInfo() || {};
    var token = utils.getValueByPath(userInfo, 'user.token') || '';
    //错误判断 todo
    ajax.getPost({
      url: URL['userInfo'],
      method: 'put',
      param: object,
      header: {
        Authorization: token
      }
    }, function (result) {
      if (!handle.dealTokenDate(result)) {
        return
      }
      if (result.code) {
        //这里返回的只有user数据
        wx.showModal({
          title: '提示',
          content: '保存失败'
        });
        return
      }
      debugger
      var userInfo = that.getStoreInfo() || {};
      var newUserInfo = _fn.merge(result, object);
      var oldUserInfo = userInfo.user;
      oldUserInfo = _fn.merge(oldUserInfo, newUserInfo);
      userInfo.user = oldUserInfo;
      _fn.setStoreInfo(userInfo);
      callback && callback(result);
    })
  },
  getAreaInfo (callback) {
    ajax.getPost({
      url: URL['GET_cities']
    }, function (result) {
      callback && callback(result);
    })
  },
  getUserInfo (callback) {
    var userInfo = handle.getStoreInfo() || {};
    var token = utils.getValueByPath(userInfo, 'user.token') || '';
    ajax.getPost({
      url: URL['userInfo'],
      method: 'get',
      header: {
        Authorization: token
      }
    }, function (result) {
      if (!handle.dealTokenDate(result)) {
        return
      }
      callback && callback(result);
    })
  },
  myUpload (obj, callback) {
    var userInfo = handle.getStoreInfo() || {};
    var token = utils.getValueByPath(userInfo, 'user.id') || '';
    var keyArr = ['Avatar', 'Certification'];
    var key = token + '/' + keyArr[obj.key] + '/' + new Date().getTime();

    handle.getUploadToken(uptoken => {
      qiniuUploader.upload(obj.filePath, (res) => {
        // 每个文件上传成功后,处理相关的事情
        // 其中 info 是文件上传成功后，服务端返回的json，形式如
        // {
        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
        //    "key": "gogopher.jpg"
        //  }
        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
        if (!res.imageURL) {
          //上传错误提示
          wx.showModal({
            title: '提示',
            content: '图片保存失败,请重试'
          });
          return
        }
        callback(res.imageURL);
      }, (error) => {

        wx.showModal({
          title: '提示',
          content: '图片保存失败,请重试'
        });
      }, {
        region: 'NCN',
        domain: 'static.imsummer.cn', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
        key: key, // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
        // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
        uptoken: uptoken // 由其他程序生成七牛 uptoken
      });
    })

  },
  getUploadToken (callback) {
    var userInfo = handle.getStoreInfo() || {};
    var token = utils.getValueByPath(userInfo, 'user.token') || '';
    ajax.getPost({
      url: URL['GET_uploadToken'],
      method: 'post',
      header: {
        Authorization: token
      }
    }, function (result) {
      if (result.code) {
        return
      }
      callback && callback(result.token);
    })
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
  getDepartmentList (object, callback) {
    ajax.getPost({
      url: URL['GET_school'] + '/' + object.school_id + '/departments',
      method: 'get'
    }, res => {
      if (res.constructor != Array) {
        return
      }
      callback(res);
    })
  },
  dealTokenDate: function (result) {
    if (result.code == 401) {
      wx.showModal({
        title: '提示',
        content: '微信登陆失效',
        confirmText: '重新授权',
        success: function (res) {
          if (!res.confirm) {
            return;
          }
          handle.login(res => {
            wx.startPullDownRefresh({})
          },'merge');
        }
      });
      return false
    } else {
      return true
    }
  },
  /*---------------*/
  getShareCode: function (object, callback) {
    debugger
    ajax.getPost({
      url: URL['POST_share_verification_requests'],
      method: 'post',
      param: {
        phone: object.phone,
        user_id: object.userId
      }
    }, res => {
      if (res.code != 0) {
        wx.showModal({
          title: '提示',
          content: res.message || res.error
        });
        return
      }
      callback(res);
    })
  },
  checkShareCode: function (object, callback) {

    ajax.getPost({
      url: URL['POST_share_verifications'],
      method: 'post',
      param: {
        "code": object.code,
        "user_id": object.userId,
        "phone": object.phone
      },
    }, res => {

      if (res.code != 0) {
        wx.showModal({
          title: '提示',
          content: res.message || res.error
        });
        return
      }
      callback(res);
    })
  }
};
module.exports = handle;