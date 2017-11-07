<div class="pages-cabin-tips">
	<div class="tips-content">
		<button class="btn btn-defualt J_demo">点击展示tips</button>
		<p style="margin-top:10px;">展示信息放在show()方法里面，默认展示2000毫秒,也可以自定义展示时间：tips.show('提示信息！',5000)或者cabin.widgets.tips.show('提示信息！',5000);</p>
		<p style="padding:15px 0;">使用方法一</p>
		<pre>
			<code>
				var tips = require('cabin/widgets/tips/tips');//引入资源
				
				tips.show('提示信息！');//打开提示信息
				tips.hide();//关闭提示信息
			</code>
		</pre>
		<p style="padding:15px 0;">使用方法二</p>
		<pre>
			<code>
				无需引用资源，在cabin对象上已经提供了各个组件的API
				
				cabin.widgets.tips.show('提示信息！');
				cabin.widgets.tips.hide();
			</code>
		</pre>
	</div>
</div>
