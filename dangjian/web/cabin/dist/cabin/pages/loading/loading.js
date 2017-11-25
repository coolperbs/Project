define('cabin/pages/loading/loading', function (require, exports, module) {
	var handle, _fn, Page, page, LOADING;
	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-loading',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/loading/loading.tpl', 'cabin/pages/loading/loading.css'],
		show: function () {
			handle.jView = this.jView;
			$('pre code').each(function (i, block) {
				hljs.highlightBlock(block);
			});
		},
		hide: function () {},
		on: {
			'click .J_demo': function () {
				LOADING.show();
				setTimeout(function () {
					LOADING.hide();
				}, 2000);
			}
		}
	});
	handle = {}
	_fn = {}
	LOADING = require('cabin/widgets/loading/loading');
	return page;
});
