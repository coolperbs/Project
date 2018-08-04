define('cabin/pages/pop/pop', function (require, exports, module) {
	var handle, _fn, Page, page, POP, MINIPOP;
	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-pop',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/pop/pop.tpl', 'cabin/pages/pop/pop.css'],
		show: function () {
			handle.jView = this.jView;
			$('pre code').each(function (i, block) {
				hljs.highlightBlock(block);
			});
		},
		hide: function () {
			POP.hide();
		},
		on: {
			'click .J_demo': function () { //跳转新建页面
				var popConfig = {
					title: '我是标题',
					msg: '我是内容部分',
					html: '',
					btns: {
						'cancel': {
							text: '取消',
							click: function () {}
						},
						'ok': {
							text: '确定',
							click: function () {}
						}
					},
					onClickMask: function () {}
				}

				POP.show(popConfig);
			},
			'click .J_miniDemo': function () { //跳转新建页面	
				MINIPOP.show({
					title: '我是标题',
					msg: '我是内容部分',
					ok: '确认按钮',
					cancel: '取消按钮',
					sort: 'right', //left(默认为left):cancel按钮在左，ok按钮在右,right:cancel按钮在右，ok按钮在左
					callback: function (el, type) {
						if (type == 'ok') {
							alert('点击确认按钮！');
						}
					}
				});
			},
			'click .J_miniDemo1': function () { //跳转新建页面					
				MINIPOP.show({
					msg: '我是内容部分',
					callback: function (el, type) {
						if (type == 'ok') {
							alert('点击确认按钮！');
						}
					}
				});
			},
			'click .J_miniDemo2': function () { //跳转新建页面					
				MINIPOP.show({
					title: '我是标题',
					msg: '我是内容部分',
					cancel: '我知道了'
				});
			}
		}
	});
	handle = {}
	_fn = {}
	POP = require('cabin/widgets/pop/pop');
	MINIPOP = require('cabin/widgets/minipop/minipop');
	return page;
});
