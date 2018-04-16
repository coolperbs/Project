var _myPolyfill = require('../../my.polyfill');
var ajax = require('../../common/ajax/ajax'),
    app = getApp(),
    url,
    CFG,
    _fn,
    handle;

url = {
	add: app.host + '/app/cart/add',
	addOut: app.host + '/app/out/cart/add',
	query: app.host + '/app/cart/list',
	count: app.host + '/app/cart/count',
	clear: app.host + '/app/cart/deleteAll',
	del: app.host + '/app/cart/delete',
	cut: app.host + '/app/cart/cut',
	check: app.host + '/app/cart/cheack',
	unCheck: app.host + '/app/cart/uncheack',
	checkAll: app.host + '/app/cart/cheackAll',
	unCheckAll: app.host + '/app/cart/uncheackAll'
	//update : app.host + '/mch/cart/update'	
};

handle = {
	checkAll: function (param, callback) {
		var checkUrl = param.checked ? url.checkAll : url.unCheckAll;
		param = param || {};
		ajax.query({
			url: checkUrl,
			param: param
		}, callback);
	},

	check: function (param, callback) {
		var checkUrl = param.checked ? url.check : url.unCheck;
		param = param || {};
		ajax.query({
			url: checkUrl,
			param: param
		}, callback);
	},

	// param = { skuNum : 1, skuId : 1 }
	add: function (caller, param, callback) {
		param = param || {};
		param.skuNum = param.skuNum || 1;
		ajax.query({
			url: url.add,
			param: param
		}, function (res) {
			_fn.refreshNum(caller, res);
			callback && callback(res);
		});
	},

	addOut: function (caller, param, callback) {
		param = param || {};
		param.skuNum = param.skuNum || 1;
		ajax.query({
			url: url.addOut,
			param: param
		}, function (res) {
			_fn.refreshNum(caller, res);
			callback && callback(res);
		});
	},

	// param = { num : 1, shopId : 1, sku : 1 }
	cut: function (caller, param, callback) {
		param = param || {};
		param.skuNum = param.skuNum || 1;
		ajax.query({
			url: url.cut,
			param: param
		}, function (res) {
			_fn.refreshNum(caller, res);
			callback && callback(res);
		});
	},

	del: function (caller, param, callback) {
		param = param || {};
		param.skuNum = param.skuNum || 1;
		ajax.query({
			url: url.del,
			param: param
		}, function (res) {
			_fn.refreshNum(caller, res);
			callback && callback(res);
		});
	},

	// param = { shopId :  '' } || param = { shopId : [] }
	query: function (caller, param, callback) {
		// 应该是根据storeId来，storeId也可以不传
		param = param || {};
		//param.skuNum = param.skuNum || 1;
		ajax.query({
			url: url.query,
			param: param
		}, callback);
	},
	refreshNum: function (caller, callback) {
		var param = {};
		//param.skuNum = param.skuNum || 1;
		ajax.query({
			url: url.count,
			param: param
		}, function (res) {
			_fn.refreshNum(caller, res);
			callback && callback(res);
		});
	}
};

_fn = {
	refreshNum: function (caller, res) {
		if (res && res.data) {
			my.setStorageSync({
				key: 'cartNum',
				data: res.data.cartTotalNum || 0
			});
		}

		// 未登录的情况
		if (res && res.code == '1000') {
			my.setStorageSync({
				key: 'cartNum',
				data: 0
			});
		}
		caller.setData({
			cartNum: my.getStorageSync({
				key: 'cartNum'
			}).data
		});
	},
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

	// error = {
	// 	success : { code : '0000', msg : '' },
	// 	paramError : { code : -1111, msg : '参数格式错误' }
	// }

};module.exports = handle;