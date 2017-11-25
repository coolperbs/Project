define('cabin/pages/btn/btn', function (require, exports, module) {
	var handle, _fn, page;
	page = Page({
		nodeClass: 'pages-cabin-btn',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/btn/btn.tpl', 'cabin/pages/btn/btn.css'],
		show: function () {
            handle.jView = this.jView;
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
            $('.nav-tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
		},
		hide: function () {},
		on: {

		}
	});
	handle = {}
	_fn = {}
	return page;
});