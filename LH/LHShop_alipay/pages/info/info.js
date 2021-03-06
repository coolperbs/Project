var _myPolyfill = require('../../my.polyfill');
var _fn,
    utils = require('../../common/utils/utils'),
    ajax = require('../../common/ajax/ajax'),
    app = getApp(),
    services,
    pageParam;

services = {
  1: {
    title: '支持银联',
    image: '../../asset/card.png'
  },
  2: {
    title: '熨烫服务',
    image: '../../asset/flat-iron.png'
  },
  3: {
    title: '洗澡音乐',
    image: '../../asset/music.png'
  },
  4: {
    title: '叫醒服务',
    image: '../../asset/bell.png'
  }
};

Page({
  onLoad: function (param) {
    pageParam = param;
  },
  onShow: function () {
    _fn.renderPage(this);
  }
});

_fn = {
  renderPage: function (caller) {
    var self = caller;

    if (!pageParam || !pageParam.storeId) {
      _myPolyfill.showModal({
        title: '提示',
        content: '缺少storeId',
        showCancel: false,
        complete: function () {
          my.navigateBack();
        }
      });
      return;
    }

    var datetime = my.getStorageSync({
      key: 'datetime'
    }).data;
    if (self.data && self.data.datetime && datetime[0].time == self.data.datetime[0].time && datetime[1].time == self.data.datetime[1].time) {
      return;
    }

    _fn.getData(function (res) {
      if (utils.isErrorRes(res)) {
        return;
      }
      var allDay;

      allDay = datetime[1].time - datetime[0].time;
      allDay = Math.round(allDay / (24 * 60 * 60 * 1000));
      res.data = _fn.formatData(res.data);
      self.setData({
        pageData: res.data,
        services: services,
        datetime: datetime,
        allDay: allDay
      });
    });
  },

  formatData: function (data) {
    var list = [],
        str = data.store.policy;

    str = str.split('\n');
    data.store.policyList = str;
    return data;
  },

  getData: function (callback) {
    var dateTime = my.getStorageSync({
      key: 'datetime'
    }).data;

    ajax.query({
      url: app.host + '/app/store/info',
      param: {
        storeId: pageParam.storeId,
        startTime: dateTime[0].time,
        endTime: dateTime[1].time
      }
    }, callback);
  }
};