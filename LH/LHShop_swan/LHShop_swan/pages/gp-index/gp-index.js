var modules = require('../../widgets/modules/modules.js');
var weigetUtil = require('../../common/utils/weigetUtil');
var Tab = weigetUtil.tab;
var List = weigetUtil.List;
var config = require('../../config');
var host = config.host;
var utils = require('../../common/utils/utils');

Page({
  onShow: function () {
    var self = this;
    _fn.init(self);
  },
  getNext: function (e) {
    var self = this;
    self.listWeiget.next();
  },
  toDetail: function (e) {
    var sku = e.currentTarget.dataset.sku;
    var id = e.currentTarget.dataset.id;
    // console.log(333,sku);
    swan.navigateTo({
      url: '/pages/gp-waredetail/gp-waredetail?id=' + id
    });
  }

});
var _fn = {
  init: function (page) {
    swan.getSystemInfo({
      success: function (res) {
        // console.log(res);
        page.setData({
          height: res.screenHeight + 'px'
        });
      }
    });
    page.listWeiget = page.listWeiget || new List({
      url: host + '/groupon/product/list',
      // url:host+'/app/address/list',
      // isSingle:true,
      render: function (data) {
        page.setData({
          grouponList: data.totalData
        });
      },
      getList: function (res) {
        return res.data.productList;
      },
      getHasMore: function (res) {
        return res.data.hasMore;
      }
    });
    page.listWeiget.next();
  }

};