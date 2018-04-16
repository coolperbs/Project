var _myPolyfill = require('../../my.polyfill');
var utils = require('../../common/utils/utils'),
    modules = require('../../widgets/modules/modules'),
    service = require('../../service/service'),
    app = getApp(),
    pageParam,
    _fn;

Page({
	onLoad: function (options) {
		var scene = options.scene || '';
		pageParam = options || {};
	},
	onReady: function () {
		var data = decodeURIComponent(pageParam.data);
		data = JSON.parse(data);
		this.setData({
			list: data,
			title: pageParam.title
		});
	},
	onShareAppMessage: app.shareFunc
});