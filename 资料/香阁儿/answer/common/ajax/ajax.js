var sysInfo = wx.getSystemInfoSync(),
  handle,
  whiteList,
  _fn;

whiteList = [];
import util from '../utils/util'
handle = {
  mapToUrl (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += handle.mapToUrl(param[i], k, encode);
      }
    }
    return paramStr;
  },
  connectSocket (url, data) {
    wx.connectSocket({
      url: url + '?' + handle.mapToUrl(data)
    })
  },
  onSocketOpen (callback) {
    wx.onSocketOpen(res => {
      callback(res);
      console.log('WebSocket连接已打开！')
    })
  },
  onSocketError (callback) {
    wx.onSocketError(res => {
      callback(res);
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  sendSocketMessage (data) {
    wx.sendSocketMessage({
      data: data
    })
  },
  onSocketMessage (callback) {
    wx.onSocketMessage(res => {
      handle.responseWrapper(res.data, callback);
      //todo 这里需要wrapper？？？
      console.log('收到服务器内容：' + res.data)
    })
  },
  onSocketClose (callback) {
    wx.onSocketClose(res => {
      callback(res);
      console.log('WebSocket 已关闭！')
    })
  },
  request (object) {
    if (!object) {
      return
    }
    wx.request({
      url: object.url,
      data: object.data || {},
      method: object.method || 'get',
      header: object.header || {},
      success: function (res) {
        handle.responseWrapper(res, object.callback);
      },
      fail: function (res) {
        handle.responseWrapper(res, object.callback);
      }
    });
  },
  responseWrapper (dataStr, callback) {
    //todo 如果socketTask 不可用 把responseWrapper 对外暴露方便统一使用
    //todo　所有接口返回结构如下
    var res = JSON.parse(dataStr) || null;

    if (res.code != '0000') {
      /*todo 更具不同的code走不同的逻辑*/
      util.showError(res.message);
     return
    }
    /*res = {
      code: '0000',
      data: {},
      message: ''
    }*/
    callback(res.data)
  }
}

_fn = {
  wrapParam (object) {
    return object.data || {};
    var userInfo = wx.getStorageSync('userinfo') || {},
      result;

    result = {
      param: JSON.stringify(object.data) || '',
      token: userInfo.token || ''
    };

    if (object && object.url && _fn.isInwhiteList(object.url)) {
      result.sys = JSON.stringify(sysInfo) || '';
    }
    return result;
  },
  isInwhiteList () {

  }
}

export default handle;