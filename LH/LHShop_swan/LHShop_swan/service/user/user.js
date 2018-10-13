var handle,
    CFG,
    _fn,
    error = require('../error'),
    ajax = require('../../common/ajax/ajax'),
    service = require('../../common/service/service'),
    utils = require('../../common/utils/utils'),
    uuid = require('../../common/uuid/uuid'),
    config = require('../../config'),
    env = config.env,
    url,

//app = getApp(),
//hostTrading = config.host.trading[env],

CFG = {
  storeName: 'userinfo', //前端key
  tempId: 'tempid'
};

url = {
  //login : config.HOST.trading + '/mch/user/wechat/auth/miniProgram'
  login: config.host + '/login',
  baiduLogin: config.host + '/baidu/login'
};

error = utils.merge(error, {
  loginError: { code: -1001, success: false, msg: '调用小程序登录接口失败，请稍后重试' }, // 
  getWxUserInfoError: { code: -1002, success: false, msg: '调用微信用户信息接口失败，请稍后重试' // 
  } });

handle = {
  // 不带验证获取
  getStoreInfo: function () {
    return swan.getStorageSync(CFG.storeName) || null;
  },

  createTempId: function () {
    var tempId = swan.getStorageSync(CFG.tempId);

    if (tempId) {
      return;
    }
    swan.setStorageSync(CFG.tempId, uuid.create());
  },

  isLogin: function (callback) {
    var userInfo = swan.getStorageSync(CFG.storeName) || {};
    if (!userInfo.token) {
      callback(false);
      return;
    }
    swan.checkSession({
      success: function () {
        callback(true);
      },
      fail: function (res) {
        callback(false);
      }
    });
  },

  // 带验证获取
  getInfo: function (callback) {
    var userInfo = handle.getStoreInfo();
    if (!userInfo) {
      // 没有则从服务器拉取信息
      handle.updateInfo(callback);
      return;
    }

    // 如果失效需要重新登录唤醒微信登录态
    swan.checkSession({
      success: function () {
        callback && callback(utils.merge(error.success, { data: userInfo }));
      },
      fail: function () {
        // 这里是走流程还是直接wx.login就行？
        handle.updateInfo(callback);
      }
    });
  },

  login: function (callback) {
    this.updateInfo(callback);
  },

  // 从服务端同步信息
  updateInfo: function (callback) {
    // 1.登录
    _fn.wxLogin(function (loginInfo) {
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

        var param = {
          code: loginInfo.data.code,
          iv: wxUserInfo.data.iv,
          encryptedData: wxUserInfo.data.data,
          ...wxUserInfo.data.userInfo
          // str:JSON.stringify(wxUserInfo.data)
          // userInfo:wxUserInfo.data
        };
        // wx.showModal({
        // 	title: url.bdLogin,
        // 	content: JSON.stringify(param)
        // });
        // 3.调取服务端数据
        ajax.query({
          url: url.baiduLogin,
          param: param
        }, function (userInfo) {

          // wx.showModal({
          // 	title: 'userInfo',
          // 	content: JSON.stringify(userInfo)
          // });
          // return ;

          // 保存信息
          if (userInfo && userInfo.code == '0000' && userInfo.success == true) {
            _fn.setStoreInfo(userInfo.data);
          }
          callback && callback(userInfo);
        });
      });
    });
  },

  // mine页面业务要去盯下，有个登录逻辑未考虑
  getUserDetail: function (callback, option) {
    option = option || {};
    var passNoneToken = option.passNoneToken || false; //如果接口返回没有token，是否走登陆重新获取
    var self = this;
    var url = hostTrading + '/mch/user/info';
    ajax.query({
      url: url,
      param: {}
    }, res => {
      if (res.code === 'GW10005' && !passNoneToken) {
        self.getInfo(res => {
          self.getUserDetail(callback, {
            passNoneToken: true
          }); //第二次请求如果还是没有token就不走登陆了
        });
      } else {
        if (typeof callback === 'function') {
          callback(res);
        }
      }
    });
  }

};

_fn = {
  setStoreInfo: function (data) {
    if (!data) {
      return;
    }
    //var data = wx.getStorageSync( CFG.storeName );
    // 目前版本没考虑深度拷贝情况
    // 这里要做个merge避免全部被处理，或者不暴露这个方法
    swan.setStorageSync(CFG.storeName, data);
  },
  wxLogin: function (callback) {
    swan.login({
      lang: 'zh_CN',
      success: function (res) {
        callback && callback(utils.merge(error.success, { data: res }));
      },
      fail: function (res) {
        //error.loginError.errorInfo = res; // 先不考虑，上游业务无需关心细节
        callback && callback(utils.merge(error.loginError, { errorInfo: res }));
      }
    });
  },

  // 获取微信侧用户信息
  getWxUserInfo: function (callback) {
    swan.getUserInfo({
      success: function (res) {
        swan.showModal({
          title: 'debug',
          content: JSON.stringify(res)
        });
        callback(utils.merge(error.success, { data: res }));
      },
      fail: function (res) {
        swan.showModal({
          title: 'debug',
          content: JSON.stringify(res)
        });
        callback && callback(utils.merge(error.getWxUserInfoError, { errorInfo: res }));
      }
    });
  },

  isErrorRes: function (res) {
    if (!res || !res.code === '0000' || !res.data) {
      return true;
    }
    return false;
  }
};

module.exports = service(handle);