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
        if(res.statusCode!=200){
          handle.responseWrapper({code:9999,message:'网络错误'}, object.callback);
        }else {
          handle.responseWrapper(res.data, object.callback);
        }
      },
      fail: function (res) {
        handle.responseWrapper({code:9999,message:'网络错误'}, object.callback);
      }
    });
  },
  responseWrapper (dataStr, callback) {
    var res = (typeof dataStr == 'string' ? JSON.parse(dataStr) : dataStr) || null;
    if (res.code != '0000') {
      /*todo 更具不同的code走不同的逻辑*/
      //util.showError(JSON.stringify(res));
      // util.showToast({
      //   title: res.message || res.msg || ''
      // });
      callback(res);
      return
    }
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

    console.log(result.token)
    if (object && object.url && _fn.isInwhiteList(object.url)) {
      result.sys = JSON.stringify(sysInfo) || '';
    }
    return result;
  },
  isInwhiteList () {

  }
}

export default handle;