var sysInfo = wx.getSystemInfoSync(),
  handle,
  whiteList,
  _fn;

whiteList = [];
import util from '../utils/utils'

handle = {

  connectSocket (url, data) {
    let task = {};
    task = wx.connectSocket({
      url: url + '?' + util.mapToUrl(data),
      success (res) {
        console.log(res.socketTaskId)
      }
    });
    return task;
  },
  request (object) {
    if (!object) {
      return
    }
    object.data = _fn.wrapParam( object );
    wx.request({
      url: object.url,
      data: object.data || {},
      method: object.method || 'get',
      header: object.header || {},
      success: function (res) {
        handle.responseWrapper(res.data, object.callback);
      },
      fail: function (res) {
        handle.responseWrapper(res.data, object.callback);
      }
    });
  },
  responseWrapper (dataStr, callback) {
    //todo 如果socketTask 不可用 把responseWrapper 对外暴露方便统一使用
    //todo　所有接口返回结构如下
    var res = (typeof dataStr == 'string' ? JSON.parse(dataStr) : dataStr) || null;
    if (res.code != '0000') {
      /*todo 更具不同的code走不同的逻辑*/
      util.showError(JSON.stringify(res));
      util.showToast({
        title: res.message || res.msg || ''
      });
      callback(res);
      return
    }
    /*res = {
      code: '0000',
      data: {},
      message: ''
    }*/
    callback(res)
  }
}

_fn = {
  wrapParam (object) {
    //return object.data || {};
    var userInfo = wx.getStorageSync('userInfo') || {},
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