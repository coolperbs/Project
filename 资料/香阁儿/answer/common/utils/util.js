var handle, loadingTimmer;
var modalConfig = {confirmColor: '#1e0141'}
handle = {
  showError (msg, duration) {
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
        confirmColor: modalConfig.modalConfig
      });
    }, (duration && duration > 0 && duration > 1500) ? duration : 1500)
  },
  showAction (data, callback) {
    var msg = data.msg || '';
    var duration = data.duration || 0;
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: msg,
        confirmColor: modalConfig.modalConfig,
        success (res) {
          callback(res);
        }
      });
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

  countTime (startTime, endTime, currentTime, sysTime) {
    if (!startTime || !endTime || !currentTime || !sysTime) {
      return undefined;
    }
    return Math.ceil(( endTime - startTime + ( sysTime - currentTime ) ) / 1000);
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
  }
};

export default handle;