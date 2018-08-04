/*
	依赖jquery 
	jun.li@dmall.com 2016-05-24
*/


;
(function () {
	var _fn,
		handle, ROUTER,
		globalParam = {},
		CFG;

	CFG = {
		TIMEOUT: 10000 // 超时时间
	}

	handle = {
		setGlobalParam: function (param) {
			globalParam = $.extend(globalParam, param);
		},
		query: function () {
			var url,
				param,
				type,
				callback;
			if (arguments.length == 3) {
				url = arguments[0];
				type = 'json';
				param = arguments[1];
				callback = arguments[2];
			} else if (arguments.length == 4) {
				url = arguments[0];
				type = arguments[1];
				param = arguments[2];
				callback = arguments[3];
			} else {
				return;
			}

			param = param || {};
			param = _fn.decorateParam(param);
			$.ajax({
				url: url,
				dataType: 'json',
				data: param,
				xhrFields: {
					withCredentials: true
				},
				type: 'GET',
				cache: false,
				timeout: CFG.TIMEOUT,
				success: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				},
				error: function () {
					var data = {
						code: '-1',
						result: '加载数据失败',
						data: {}
					};
					if (typeof callback == 'function') {
						_fn.callbackProxy(data, callback);
					}
				}
			});
		},
		post: function () {
			var url,
				param,
				type,
				callback;
			if (arguments.length == 3) {
				url = arguments[0];
				type = 'json';
				param = arguments[1];
				callback = arguments[2];
			} else {
				return;
			}
			param = param || {};
			param = _fn.decorateParam(param);
			$.ajax({
				url: url,
				dataType: 'json',
				data: param,
				xhrFields: {
					withCredentials: true
				},
				type: 'POST',
				cache: false,
				timeout: CFG.TIMEOUT,
				success: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				},
				error: function () {
					var data = {
						code: '-1',
						message: '加载数据失败',
						data: {}
					};
					if (typeof callback == 'function') {
						_fn.callbackProxy(data, callback);
					}
				}
			});
		},
		postFile: function (option) {
			var url = option.url;
			var file = option.file;
			var callback = option.callback;
			var formData = new FormData();
			formData.append("file", file);
			$.ajax({
				url: url,
				type: "POST",
				data: formData,
				xhrFields: {
					withCredentials: true
				},
				/**
				 *必须false才会自动加上正确的Content-Type
				 */
				contentType: false,
				/**
				 * 必须false才会避开jQuery对 formdata 的默认处理
				 * XMLHttpRequest会对 formdata 进行正确的处理
				 */
				processData: false,
				success: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				},
				error: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				}
			});

		}
	};

	_fn = {
		// 装饰参数
		decorateParam: function (param) {
			return param;
		},
		// 统一回调方案
		callbackProxy: function (data, callback) {
			//			if (data.code + '' == '0001') { //用户未登录                        
			//				var returnUrl = '';
			//				returnUrl = encodeURIComponent(window.location.href);
			//				ROUTER.go('#full/promise/login:returnUrl=' + returnUrl);
			//				return;
			//			}
			//			if (data.code == '0002') { //用户没有权限
			//				ROUTER.go('#full/promise/nopermissions');
			//				return;
			//			}

			// 这里可以做统一拦截方案
			if (typeof callback == 'function') {
				callback(data);
			}
		}
	}

	define('cabin/common/data/ajax', function (require, exports, module) {
		ROUTER = require('kayak/core/router/router');
		module.exports = handle;
	});

})();
