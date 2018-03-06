var handle, loadingTimmer;


handle = {
  showError: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    });
  },
  timeToDateObj: function (time) {
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
  showLoading: function () {
    var param, time;
    if (arguments.length == 1) {
      param = {};
      time = arguments[0];
    } else {
      param = arguments[0] || {};
      time = arguments[1];
    }
    param.title = param.title || '加载中...';
    if (time && time > 0) {
      loadingTimmer = setTimeout(function () {
        wx.showLoading(param);
      }, time);
      return;
    }

    wx.showLoading(param);
  },

  hideLoading: function () {
    clearTimeout(loadingTimmer);
    wx.hideLoading();
  },

  countTime: function (startTime, endTime, currentTime, sysTime) {
    if (!startTime || !endTime || !currentTime || !sysTime) {
      return undefined;
    }
    return Math.ceil(( endTime - startTime + ( sysTime - currentTime ) ) / 1000);
  },
  getValueByPath: function (obj, path) {
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
  startChooseEvt: function (count,callback) {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        var type = ['album', 'camera'];
        handle.chooseRealImage(type[res.tapIndex], count,callback);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 选择图片
   * */
  chooseRealImage: function (type,count, callback) {
    var tempType = [];
    tempType.push(type);
    wx.chooseImage({
      count: count||1, // 默认9
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
  }
};

module.exports = handle;