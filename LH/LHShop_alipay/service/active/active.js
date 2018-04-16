var _myPolyfill = require('../../my.polyfill');
var ajax = require('../../common/ajax/ajax'),
    app = getApp(),
    url,
    CFG,
    _fn,
    handle;

url = {
	get: app.actHost + '/act/render'
};

handle = {
	// param = { shops : '1,2,4', shopId : 1, actId : '1', type }
	query: function (param, callback) {
		ajax.query({
			url: url.get,
			param: param
		}, callback);
	},
	getHome: function (param, callback) {
		var param = param || {};
		param.type = 1;
		handle.query(param, callback);
	},
	getShop: function (param, callback) {
		var param = param || {};
		param.type = 2;
		handle.query(param, callback);
	},
	getActive: function (param, callback) {
		var param = param || {};
		param.type = 3;
		handle.query(param, callback);
	}
};

_fn = {
	// 处理用户信息，单独打个标记，merge购物车，因为在结算的时候必须merge一次，成功后才下单
	// 处理绑定信息
	addTempId: function (param) {
		var isMerge = my.getStorageSync({
			key: CFG.isMergeCart
		}).data,
		    userInfo = my.getStorageSync({
			key: 'userinfo'
		}).data;

		if (isMerge == true) {
			// 已经登录也不需要打merge
			return param;
		}
		param.tempId = my.getStorageSync({
			key: CFG.tempId
		}).data;
		return param;
	},
	callbackFilter: function (res) {
		var isMerged = my.getStorageSync({
			key: CFG.isMergeCart
		}).data;
		// 处理购物车merge数据
		if (!isMerged && res && res.data && res.data.marge) {
			my.setStorageSync({
				key: CFG.isMergeCart,
				data: true
			});
		}
		return res;
	}
};

module.exports = handle;