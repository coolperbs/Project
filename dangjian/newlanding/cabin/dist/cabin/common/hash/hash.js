;
(function () {
	var handle, _fn, CFG, ROUTER, kayak, kDom, temps = [],
		MENU;
	CFG = {}
	handle = {
		//		goToUrl: function () {
		//			var currentPath = ROUTER.currentPath,
		//				currentPathArry = [],
		//				hashConfig = _fn.urlConfig(),
		//				classArry = [],
		//				jview = $('html.promise-project body');
		//
		//
		//			currentPath = currentPath.split('/')[2];
		//			currentPathArry = currentPath;
		//
		//			for (var i in hashConfig) {
		//				if (i == currentPath) {
		//					classArry = hashConfig[i];
		//				}
		//			}
		//			if (classArry.length < 1) {
		//				return;
		//			}
		//			for (var i in classArry) {
		//				if (!classArry[i]) {
		//					return;
		//				}
		//				var dom = jview.find('.' + classArry[i]),
		//					currentDom = jview.find('.' + classArry[i] + '[data-type=' + currentPathArry[i] + ']');
		//				if (dom.length > 0 && currentDom.length > 0) {
		//					dom.removeClass('active');
		//					currentDom.addClass('active');
		//				}
		//			}
		//		}
	}
	_fn = {
		urlConfig: function () {
			var hashConfig = {
				'rulelist': ['J_menu_list'],
				'timesearch': ['J_menu_list'],
			}
			return hashConfig;
		}
	}
	define('cabin/common/hash/hash', function (require, exports, module) {
		kayak = require('kayak/core/kayak');
		ROUTER = require('kayak/core/router/router');
		kDom = kayak.dom;
		module.exports = handle;
	});
})();
