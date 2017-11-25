define('cabin/pages/chosen/chosen', function (require, exports, module) {
	var handle, _fn, Page, page;

	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-chosen',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/chosen/chosen.tpl', 'cabin/pages/chosen/chosen.css'],
		show: function () {
            handle.jView = this.jView;
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
			$('.linkTypeSelectBox').chosen({
				no_results_text: '没有找到',
				disable_search: true, //关闭搜索功能				
				width: "280px"
			});
			$('.searchSelectBox').chosen({
				no_results_text: '没有找到',
				search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配
				width: "400px"
			});
			$('.mulitSelectBox').chosen({
				no_results_text: '没有找到',
				search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配
				width: "300px",
			});
			$('.mulitSearchSelectBox').chosen({
				no_results_text: '没有找到',
				search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配			
				max_selected_options: 2, //当select为多选时，最多选择个数
				width: "300px",
			});
		},
		exit: function () {},
		on: {}
	});
	handle = {}
	_fn = {}
	require('cabin/lib/chosen/chosen.jquery.js');
	return page;
});
