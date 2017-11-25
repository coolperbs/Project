(function () {
	var handle, _fn, CFG, cabin, ROUTER, Layout;
	CFG = {}
	handle = {
		jView: null,
		enter: function () {
			var layoutType = ROUTER.currentPath.split('/')[0];
			seajs.use('cabin/demolayout/' + layoutType + '/' + layoutType, function (layout) {
				debugger
				if (!layout) {
					Layout({
						name: 'cabin' + layoutType,
						tpl: 'cabin/layout/' + layoutType + '/' + layoutType + '.tpl',
						widgets: {
							menu: '',
							header: ''
						}
					});
					return;
				}
				return layout.opt.enter();
			});
		}
	}
	_fn = {}

	define('cabin/demolayout/layout', function (require, exports, module) {
		//公用组件		
		cabin = require('cabin/core/cabin');
		ROUTER = require('kayak/core/router/router');
		Layout = require('cabin/layout/layout');

		var layoutType = ROUTER.currentPath.split('/')[0];
		return Layout({
			name: 'cabin' + layoutType,
			tpl: 'cabin/layout/' + layoutType + '/' + layoutType + '.tpl',
			widgets: {
				menu: '',
				header: ''
			}
		});
		//module.exports = handle;
	});
})();
