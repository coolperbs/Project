import ajax from '../../common/ajax/ajax'

var CONF = {
  storeName: 'userinfo',//前端存储的用户信息
};
var _fn ={
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
  getWxUserInfo(callback){
    wx.getUserInfo( {
      success : function( res ) {
        callback( _fn.merge( error.success, { data : res } ) );
      },
      fail : function( res ) {
        callback && callback( _fn.merge( error.getWxUserInfoError, { errorInfo : res } ) );
      }
    } );
  },
  isErrorRes (res) {
    if (!res || !res.code === '0000' || !res.data) {
      return true;
    }
    return false;
  },
  setStoreInfo ( data ) {
    if ( !data ) {
      return;
    }
    wx.setStorageSync( CONF.storeName, data );
  },
};
var error = _fn.merge(error, {
  loginError: {code: -1001, success: false, msg: '调用小程序登录接口失败，请稍后重试'},	//
  getWxUserInfoError: {code: -1002, success: false, msg: '调用微信用户信息接口失败，请稍后重试'} //
});
var App = getApp();

var handle = {
  getStoreInfo() {
    return wx.getStorageSync( CONF.storeName ) || null;
  },
  login (callback) {
    this.updateInfo(callback);
  },
  getInfo( callback ) {
    var userInfo = handle.getStoreInfo();
    if ( !userInfo ) { // 没有则从服务器拉取信息
      handle.updateInfo( callback );
      return;
    }

    // 如果失效需要重新登录唤醒微信登录态
    wx.checkSession( {
      success : function() {
        callback && callback( _fn.merge( error.success, { data : userInfo } ) );
      },
      fail : function() {
        // 这里是走流程还是直接wx.login就行？
        handle.updateInfo( callback );
      }
    } );
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
        debugger
        // 3.调取服务端数据
        ajax.post({
          url: App.GET_API('POST_LOGIN'),
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
  }

};
module.exports = handle;