var _myPolyfill = require('../../my.polyfill');
var utils = require('../../common/utils/utils'),
    modules = require('../../widgets/modules/modules'),
    service = require('../../service/service'),
    data = require('./data'),
    app = getApp(),
    pageParam,
    _fn;

Page({
	onLoad: function (options) {
		var scene = options.scene || '';
		pageParam = options || {};

		pageParam = options || {};
		scene = decodeURIComponent(scene);
		if (scene.indexOf('actid_') == 0) {
			pageParam.actid = scene.split('_')[1];
		}
		//app.scene = ''; // 使用之后立即清空		

		_fn.getStoreInfo(this);
	},
	onShow: function () {
		modules.startKill(this, 'pageData.moduleList');
	},
	onHide: function () {
		modules.stopKill(this);
	},
	onUnload: function () {
		modules.stopKill(this);
	},
	onShareAppMessage: app.shareFunc,
	moduleClickProxy: function (e) {
		var target = e.currentTarget;
		if (target.dataset && target.dataset.fn && modules.events[target.dataset.fn]) {
			modules.events[target.dataset.fn].call(this, e);
		}
	}
});

_fn = {
	getStoreInfo: function (caller) {
		utils.showLoading(300);

		var shops = [],
		    shopsList = my.getStorageSync({
			key: 'shops'
		}).data || [],
		    i,
		    len;

		for (i = 0, len = shopsList.length; i < len; ++i) {
			shops.push(shopsList[i].id);
		}
		service.active.getActive({
			actId: pageParam.actid,
			shops: shops.join(',')
		}, function (res) {
			utils.hideLoading();
			if (utils.isErrorRes(res)) {
				return;
			}
			my.setNavigationBar({ title: res.data.title || '' });
			modules.initData(caller);
			caller.setData({
				pageData: res.data || {}
			});
		});
	}
};