define('cabin/demolayout/full/full', function (require, exports, module) {
	var Layout = require('cabin/layout/layout'); // 这个可优化为cabin.Layout

	return Layout({
		name: 'cabinfull',
		tpl: 'cabin/layout/full/full.tpl',
		widgets: {
			menu: '',
			header: ''
		}
	});
});
