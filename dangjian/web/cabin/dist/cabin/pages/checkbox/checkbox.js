define('cabin/pages/checkbox/checkbox', function (require, exports, module) {
	var handle, _fn, Page, page;

	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-checkbox',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/checkbox/checkbox.tpl', 'cabin/pages/checkbox/checkbox.css'],
		show: function () {
			handle.jView = this.jView;
			$('pre code').each(function (i, block) {
				hljs.highlightBlock(block);
			});
		},
		hide: function () {},
		on: {}
	});
	handle = {}
	_fn = {}
	return page;
});
