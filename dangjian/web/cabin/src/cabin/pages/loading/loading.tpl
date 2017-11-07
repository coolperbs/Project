<div class="pages-cabin-loading">
	<div class="loading-content">
		<button class="btn btn-defualt J_demo">点击展示loading</button>
		<p style="padding:15px 0;">使用方法一</p>
		<pre>
			<code>
				var loading = require('cabin/widgets/loading/loading');//引入资源
				
				loading.show();//打开loading 
				loading.hide();//关闭loading
			</code>
		</pre>
		<p style="padding:15px 0;">使用方法二</p>
		<pre>
			<code>
				无需引用资源，在cabin对象上已经提供了各个组件的API
				
				cabin.widgets.loading.show();
				cabin.widgets.loading.hide();
			</code>
		</pre>
	</div>
</div>
