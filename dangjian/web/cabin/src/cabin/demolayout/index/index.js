define('cabin/demolayout/index/index', function (require, exports, module) {
	var Layout = require('cabin/layout/layout'),
		menu = require('cabin/modules/menu/menu'),
		header = require('cabin/modules/header/header'); // 这个可优化为cabin.Layout
	return Layout({
		name: 'cabinindex',
		tpl: 'cabin/layout/index/index.tpl',
		widgets: {
			menu: require('cabin/modules/menu/menu'),
			header: require('cabin/modules/header/header')
		}
	});
});
