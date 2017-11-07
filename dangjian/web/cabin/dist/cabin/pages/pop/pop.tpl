<div class="pages-cabin-pop"><div class="pop-content"><button class="btn btn-defualt J_demo">demo1</button><p style="padding:15px 0">代码如下</p><pre>
			<code class="xml">
				&lt;!DOCTYPE html&gt;
				&lt;html&gt;
					&lt;head&gt;
						&lt;title&gt;Title&lt;/title&gt;
					&lt;/head&gt;				
					&lt;body&gt;
					 	&lt;button class="btn btn-defualt J_demo"&gt;demo1&lt;/button&gt;
					&lt;/body&gt;		
				&lt;/html&gt;		
			</code>
		</pre><pre>
			<code>
				POP = require('cabin/widgets/pop/pop');
				var popConfig = {
					title: '我是标题',
					msg: '我是内容部分',
					html: '',
					btns: {
						'cancel': {
							text: '取消',
							click: function () {//点击取消按钮的回调函数}
						},
						'ok': {
							text: '确定',
							click: function () {//点击确认按钮的回调函数}
						}
					},
					onClickMask: function () {//点击黑色蒙层的回调函数}
				}

				POP.show(popConfig);
			</code>				
			</pre><button class="btn btn-defualt J_miniDemo">minipop</button><p style="padding:15px 0">代码如下(包含全部参数)</p><pre>
			<code>
				MINIPOP = require('cabin/widgets/minipop/minipop');
				MINIPOP.show({
					title: '我是标题',
					msg: '我是内容部分',
					ok: '确认按钮',
					cancel: '取消按钮',
					sort: 'left', //left(默认为left):cancel按钮在左，ok按钮在右,right:cancel按钮在右，ok按钮在左
					callback: function (el, type) {
						if (type == 'ok') {
							alert('点击确认按钮！');
						}
					}
				});
			</code>				
			</pre><button class="btn btn-defualt J_miniDemo1">简单minipop</button><p style="padding:15px 0">代码如下(基础配置)</p><pre>
			<code>
				MINIPOP = require('cabin/widgets/minipop/minipop');
				MINIPOP.show({
					title: '我是标题',
					msg: '我是内容部分',
					callback: function (el, type) {
						if (type == 'ok') {
							alert('点击确认按钮！');
						}
					}
				});
			</code>				
			</pre><button class="btn btn-defualt J_miniDemo2">minipop（一个按钮）</button><p style="padding:15px 0">代码如下(只有一个按钮)</p><pre>
			<code>
				MINIPOP = require('cabin/widgets/minipop/minipop');
				MINIPOP.show({
					title: '我是标题',
					msg: '我是内容部分',
					cancel: '我知道了'
				});
			</code>				
			</pre></div></div>