var modules = require('../../widgets/modules/modules.js'),
    utils = require('../../common/utils/utils'),
    service = require('../../service/service'),
    handle,
    events,
    _fn;

handle = {
  render: function (callerPage) {
    _fn.init(callerPage);

    // 定位获取门店信息
    if (!callerPage.data || !callerPage.data.viewData || !callerPage.data.viewData.city) {
      utils.showLoading({ title: '定位中...' }, 300);
    }
    service.loc.getShops(function (shops) {
      utils.hideLoading();
      //if ( !city || !city.code ) {
      // 	wx.navigateTo( { url : '../city/city' } );
      //}
      // 获取首页信息
      var shops = [],
          shopsList = swan.getStorageSync('shops') || [],
          i,
          len;

      for (i = 0, len = shopsList.length; i < len; ++i) {
        shops.push(shopsList[i].id);
      }

      if (!callerPage.data || !callerPage.data.viewData || !callerPage.data.viewData.pageData || !callerPage.data.viewData.pageData.moduleList) {
        utils.showLoading({ title: '正在加载...' }, 300);
      }
      service.active.getHome({ shops: shops.length ? shops.join(',') : -1 }, function (res) {
        utils.hideLoading();
        var city = swan.getStorageSync('city');
        var viewData = callerPage.data.viewData;
        if (utils.isErrorRes(res)) {
          viewData.city = city;
          viewData.pageData = {};
          viewData.showShops = false;
          viewData.shops = [];

          callerPage.setData({
            viewData: viewData
          });
          return;
        }

        viewData.city = res.data;
        viewData.pageData = res.data;
        viewData.showShops = false;
        viewData.shops = shopsList;
        viewData.city = city, callerPage.setData({
          viewData: viewData,
          shops: shopsList || []
        });
        console.log(callerPage.data);
      });
    });
  }
};

events = {
  toggleShops: function () {
    var self = this;
    self.setData({
      'viewData.showShops': !self.data.viewData.showShops
    });
  },
  showShops: function (e) {
    this.setData({
      'viewData.showShops': true
    });
  },
  hideShops: function () {
    this.setData({
      'viewData.showShops': false
    });
  },
  goHome: function (e) {
    this.setData({
      'viewData.showShops': false
    });
    swan.navigateTo({ url: '../shop/shop?shopid=' + e.currentTarget.dataset.shopid });
  },
  goCity: function () {
    swan.navigateTo({ url: '../city/city' });
  }
};

_fn = {
  init: function (callerPage) {
    if (callerPage.initedHome) {
      return;
    }
    utils.mix(callerPage, {
      homeClickProxy: function (e) {
        var target = e.currentTarget;
        if (target.dataset && target.dataset.fn && events[target.dataset.fn]) {
          events[target.dataset.fn].call(this, e);
        }
      }
    });
    callerPage.initedHome = true;
  }
};

module.exports = handle;