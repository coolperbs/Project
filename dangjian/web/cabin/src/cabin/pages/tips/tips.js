define('cabin/pages/tips/tips', function (require, exports, module) {
	var handle, _fn, Page, page, TIPS;
	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-tips',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/tips/tips.tpl', 'cabin/pages/tips/tips.css'],
		show: function () {
			handle.jView = this.jView;
			$('pre code').each(function (i, block) {
				hljs.highlightBlock(block);
			});
		},
		hide: function () {},
		on: {
			'click .J_demo': function () {
				TIPS.show('提示信息！');
			}
		}
	});
	handle = {}
	_fn = {}
	TIPS = require('cabin/widgets/tips/tips');
	return page;
});
