var ajax = require('../../common/ajax/ajax'),
    utils = require('../../common/utils/utils'),
    modules = require('../../widgets/modules/modules.js'),
    service = require('../../service/service.js'),
    app = getApp(),
    currentPage = 0,
    hasMore = true,
    pageParam,
    isGetMore = false,
    _fn;

Page({
  onShareAppMessage: app.shareFunc,
  onLoad: function (options) {
    var scene = options.scene || '';

    pageParam = options || {};
    scene = decodeURIComponent(scene);
    if (scene.indexOf('shopid_') == 0) {
      pageParam.shopid = scene.split('_')[1];
    }
    //app.scene = ''; // 使用之后立即清空
    _fn.getStoreInfo(this);
  },
  onmake() {
    swan.makePhoneCall({
      phoneNumber: this.data.shopInfo.telphone //仅为示例，并非真实的电话号码
    });
  },
  toLocation: function (event) {
    var data = this.data;
    swan.openLocation({
      latitude: data.shopInfo.lat * 1,
      longitude: data.shopInfo.lng * 1,
      scale: 16
    });
  }
});

_fn = {

  getStoreInfo: function (caller) {
    var storeId = pageParam.shopid || '',
        url;

    url = !!storeId ? app.host + '/app/store/info' : app.host + '/app/store/master/info';
    ajax.query({
      param: { storeId: storeId },
      url: url
    }, function (res) {
      if (utils.isErrorRes(res)) {
        return;
      }
      res.data = res.data || {};
      caller.setData({
        shopInfo: res.data.store || {}
      });
    });
  }
};