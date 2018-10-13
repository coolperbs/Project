var ajax = require('../../common/ajax/ajax'),
    utils = require('../../common/utils/utils'),
    app = getApp(),
    handle,
    events,
    _fn;

handle = {
  render: function (callerPage) {
    _fn.init(callerPage);

    var userInfo = swan.getStorageSync('userinfo') || {};
    _fn.getPageData(callerPage);
  }
};

events = {
  beAgent: function (e) {
    var phone = e.detail.value.phone,
        userInfo = swan.getStorageSync('userinfo') || {},
        caller = this;

    if ((phone + '').trim() == '') {
      swan.showToast({ title: '请填写手机号' });
      return false;
    }
    if (!/^1[34578]\d{9}$/.test(phone)) {
      swan.showToast({ title: '请填写正确的手机号' });
      return false;
    }
    utils.showLoading(300);
    ajax.query({
      url: app.host + '/app/applyTrader',
      param: {
        phone: phone
      }
    }, function (res) {
      utils.hideLoading();
      // 1002 已经是分销商
      if (utils.isErrorRes(res) && res.code != '1002') {
        return;
      }
      userInfo = userInfo.user || {};
      swan.setStorageSync('upperuid', userInfo.id + '');
      _fn.getPageData(caller);
    });
  },
  goLogin: function () {
    swan.navigateTo({ url: '../login/login' });
  },
  saveimg: function () {
    var data = this.data;
    swan.getImageInfo({
      src: data.viewData.traderInfo.qrcurl,
      success: function (res) {
        swan.saveImageToPhotosAlbum({
          filePath: res.path,
          success: function () {
            swan.showToast({ title: '保存成功' });
          },
          fail: function () {
            swan.previewImage({
              urls: [data.viewData.traderInfo.qrcurl]
            });
          }
        });
      },
      fail: function () {
        swan.previewImage({
          urls: [data.viewData.traderInfo.qrcurl]
        });
      }
    });
  }
};

_fn = {
  getPageData: function (caller, callback) {
    ajax.query({
      url: app.host + '/app/traderInfo'
    }, function (res) {
      var userInfo = swan.getStorageSync('userinfo') || {};
      if (res.code != '0000') {
        caller.setData({
          'viewData.userInfo': userInfo.user || {},
          'viewData.isBind': false,
          'viewData.config': app.config
        });
        return;
      }

      swan.setStorageSync('upperuid', userInfo.user.id + '');
      caller.setData({
        'viewData.userInfo': userInfo.user || {},
        'viewData.traderInfo': res.data,
        'viewData.config': app.config,
        'viewData.isBind': true
      });
    });
  },
  init: function (callerPage) {
    if (callerPage.initedDistribution) {
      return;
    }
    utils.mix(callerPage, {
      distribitionClickProxy: function (e) {
        var target = e.currentTarget;
        if (target.dataset && target.dataset.fn && events[target.dataset.fn]) {
          events[target.dataset.fn].call(this, e);
        }
      }
    });
    callerPage.initedDistribution = true;
  }
};

module.exports = handle;