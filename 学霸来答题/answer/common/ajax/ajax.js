var sysInfo = wx.getSystemInfoSync(),
  handle,
  whiteList,
  _fn;

whiteList = [
  '/app/index',
  '/trade/info',
  '/trade/submit',
  '/pay/order-pay',
  '/pay/plus-buy',
  '/user/wechat/auth/miniProgram',
  '/pay/balance-recharge'
];

handle = {
  query: function (object, callback) {
    var userInfo = JSON.parse(wx.getStorageSync('userinfo') || '{}');
    var token = userInfo.auth_token || '';
    var param = _fn.wrapParam(object);
    var header = object.header || {
      Authorization: token || 'ssY4iu3vSrwZBcrHvpYSPcgR'
    };
    wx.request({
      //url : protocol + object.url, // 这个组装放这里有问题，如果传入完整地址就会有问题
      url: object.url,
      data: param,
      method: 'get',
      header: header,
      success: function (res) {
        _fn.responseWrapper(res, callback);
      },
      fail: function (res) {
        _fn.responseWrapper(res, callback);
      }
    });
  },
  post: function (object, callback) {
    var userInfo = JSON.parse(wx.getStorageSync('userinfo') || '{}');
    var token = userInfo.auth_token || '';
    //todo 看这里是否需要调整统一
    var param = _fn.wrapParam(object);
    var header = object.header || {
      Authorization: token || 'ssY4iu3vSrwZBcrHvpYSPcgR'
    };
    wx.request({
      //url : protocol + object.url, // 这个组装放这里有问题，如果传入完整地址就会有问题
      url: object.url,
      data: object.param || {},
      method: 'post',
      header: header,
      success: function (res) {
        _fn.responseWrapper(res, callback);
      },
      fail: function (res) {
        _fn.responseWrapper(res, callback);
      }
    });
  },
  getPost: function (object, callback) {
    //todo 看这里是否需要调整统一
    var param = _fn.wrapParam(object);
    wx.request({
      //url : protocol + object.url, // 这个组装放这里有问题，如果传入完整地址就会有问题
      url: object.url,
      data: object.param || {},
      method: object.method || 'get',
      header: object.header || {},
      success: function (res) {
        _fn.responseWrapper(res, callback);
      },
      fail: function (res) {
        _fn.responseWrapper(res, callback);
      }
    });
  }
}

_fn = {
  wrapParam: function (object) {
    var userInfo = wx.getStorageSync('userinfo') || {},
      result;

    result = {
      param: JSON.stringify(object.param) || '',
      token: userInfo.token || ''
    };

    if (object && object.url && _fn.isInWihteList(object.url)) {
      result.sys = JSON.stringify(sysInfo) || '';
    }
    return result;
  },

  isInWihteList: function (url) {
    var i, s;
    for (i = 0; s = whiteList[i]; ++i) {
      if (url.indexOf(s) > 0) {
        return true;
      }
    }
    return false;
  },

  responseWrapper: function (res, callback) {
    // if ( !res || res.statusCode != 200 ) {
    //   callback( {
    //     errCode : -1,
    //     msg : '网络问题',
    //     data : {}
    //   } );
    //   return;
    // }
    //
    // // 一些特殊登录统一拦截，如未登录等情况
    // if ( res.data.code == 'GW1004' || res.data.msg == 'GW1004' ) {
    //   // 跳转到登录页
    //   wx.removeStorageSync( 'userinfo' );
    //   //wx.navigateTo( { url : '../login/login' } );
    // }
    if (typeof callback == 'function') {
      callback(res.data);
    }
  }
}

module.exports = handle;