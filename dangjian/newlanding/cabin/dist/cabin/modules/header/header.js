(function () {
	var handle, _fn, CFG, kayak, kDom, _TOUCH, temps = [],
		ROUTER,
		COOKIE,
		ajax, POP, LOADING;
	CFG = {
		CONTAINER_CLS: 'J_Header'
	}
	handle = {
		classname: 'cabin-header',
		jView: null,
		init: function () {
			_fn.init();
			//			_fn.getInfo(function (res) {
			//				COOKIE.del('userName'); //清除之前的cookie
			//				COOKIE.add('userName', res.data.userName, 'session');
			//				COOKIE.del('userId'); //清除之前的cookie
			//				COOKIE.add('userId', res.data.userId, 'session');
			//				_fn.render(res.data);
			//			});
			_fn.render();
			_fn.bind();
		}
	}
	_fn = {
		init: function () {
			if (handle.inited) {
				return;
			}
			handle.jView = kDom.get(handle.classname, $('.' + CFG.CONTAINER_CLS));
			handle.inited = true;
		},
		//渲染模块
		render: function (data) {
			var jView = handle.jView;
			jView.kInsert();
		},
		//获取模块
		getTemp: function (tempClass) {
			var jView = handle.jView;
			temps[tempClass] = template.compile(jView.find('.' + tempClass).text());
			return temps[tempClass];
		},
		bind: function () {
			var jView = handle.jView;
			if (handle.hasBind) {
				return;
			}
			jView.on('click', function (e) {
				var jTarget = $(e.target);
				switch (true) {
					case _fn.isIn(jTarget, ''): //点击退出
						break;
				}
			});

			handle.hasBind = true;
		},
		//退出
		backOut: function (jTarget) {
			COOKIE.del('UYBFEWAEE');
			COOKIE.del('userName');
			COOKIE.del('userId');
			var returnUrl = '';
			returnUrl = encodeURIComponent(window.location.href);
			ROUTER.go('#full/cabin/login:returnUrl=' + returnUrl);
		},
		//判断是否是查找元素
		isIn: function (jTarget, cls) {
			if (jTarget.hasClass(cls) || jTarget.parents('.' + cls).length > 0) {
				return true;
			}
			return false;
		},
		//判断是否空对象
		isEmptyObject: function (obj) { //判断空对象
			if (typeof obj === "object" && !(obj instanceof Array)) {
				var hasProp = false;
				for (var prop in obj) {
					hasProp = true;
					break;
				}
				if (hasProp) {
					return false;
				}
				return true;
			}
		},
		//获取日报数据
		getInfo: function (callback) {
			var url = cgiMain.EVT + cgiMain.getCurrentUserInfo;
			LOADING.show();
			ajax.post(url, {}, function (res) {
				LOADING.hide();
				if (res.code + '' != '0000') {
					var popConfig = {
						title: '',
						msg: res.msg || res.errMsg,
						html: '',
						btns: {
							'cancel': {
								text: '知道了',
								click: function () {}
							}
						},
						onClickMask: function () {}
					}
					POP.show(popConfig);
					return;
				}
				if (res.code + '' == '0000') {
					if (typeof callback == 'function') {
						callback(res);
					}
				}
			});
		}
	}
	define('cabin/modules/header/header', function (require, exports, module) {
		require('cabin/modules/header/header.css');
		require('cabin/modules/header/header.tpl');

		//公用组件
		POP = require('cabin/widgets/pop/pop');
		LOADING = require('cabin/widgets/loading/loading');

		COOKIE = require('cabin/common/cookie/cookie');
		ajax = require('cabin/common/data/ajax');
		ROUTER = require('kayak/core/router/router');
		kayak = require('kayak/core/kayak');
		kDom = kayak.dom;
		_TOUCH = ('ontouchend' in document) ? 'touchstart' : 'click';
		module.exports = handle;
	});
})();
