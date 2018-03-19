var handle, loadingTimmer;
handle = {
  showError (msg, callback) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      confirmColor: '#1e0141',
      success (res) {
        if (res.confirm) {
          callback(true)
        } else if (res.cancel) {
          callback(false)
        }
      }
    });
  },
  showAction (msg, callback) {
    wx.showModal({
      title: '提示',
      content: msg || '',
      confirmColor: '#1e0141',
      success (res) {
        if (res.confirm) {
          callback(true)
        } else if (res.cancel) {
          callback(false)
        }
      }
    });
  },
  showToast (object, duration) {
    wx.showToast({
      title: object.title || '',
      icon: object.icon || 'none',
    });
    setTimeout(() => {
      wx.hideToast()
    }, (duration && duration > 0 && duration > 1500) ? duration : 1500)
  },
  timeToDateObj (time) {
    var date = new Date();

    date.setTime(time);

    return {
      time: time,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      //week : weeks_ch[date.getDay()],
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };
  },
  getValueByPath (obj, path) {
    var tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    var keyArr = path.split('.');
    var i = 0;
    var flag = true;
    for (var len = keyArr.length; i < len - 1; ++i) {
      var key = keyArr[i];
      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        flag = false;
        break;
      }
    }
    /* return {
         o: tempObj,
         k: keyArr[i],
         v: tempObj[keyArr[i]]
     };*/
    if (flag) {
      return tempObj[keyArr[i]];
    } else {
      return undefined
    }

  },
  /**
   * 添加图片方式
   * */
  startChooseEvt (count, callback) {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        var type = ['album', 'camera'];
        handle.chooseRealImage(type[res.tapIndex], count, callback);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 选择图片
   * */
  chooseRealImage (type, count, callback) {
    var tempType = [];
    tempType.push(type);
    wx.chooseImage({
      count: count || 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: tempType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if (res.tempFilePaths.length > 0) {
          callback && callback(res)
        }
      },
      fail: function (res) {
        console.log(res.tempFilePaths);
      }
    })
  },
  /**
   * 系统信息
   * */
  getSystemInfo () {
    return wx.getSystemInfoSync()
  },
  setStorageSync (KEY, DATA) {
    wx.setStorageSync(KEY, DATA)
  },
  getStorageSync (KEY) {
    return wx.getStorageSync(KEY)
  },
  mapToUrl (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      paramStr += '&'
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += handle.mapToUrl(param[i], k, encode);
      }
    }
    return paramStr;
  },
  navigateTo (url, data) {
    wx.navigateTo({
      url: url + '?' + this.mapToUrl(data)
    })
  },
  redirectTo (url, data) {
    let that = this;
    wx.redirectTo({
      url: url + '?' + that.mapToUrl(data)
    })
  }
};

export default handle;