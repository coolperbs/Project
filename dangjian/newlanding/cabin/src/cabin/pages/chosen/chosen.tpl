<div class="pages-cabin-chosen content-container">
	<!--滚动内容 需要添加 container-scroll 类-->
	<div class="container-scroll">
		<div class="stage">
			<div class="stage-title flag">
				chosen <a href="http://www.cnblogs.com/change4now/p/5665128.html" target="_blank" >(点击查看配置文档说明)</a>
			</div>
			<div style="padding: 20px">
				<div>
					<div> demo1</div>
					<label>请选择：</label>
					<select class="linkTypeSelectBox">
						<option>demo1</option>
						<option>demo2</option>
						<option>demo3</option>
						<option>demo4</option>
					</select>
					<pre style="margin-top:15px;"><code>
			&lt;select class="linkTypeSelectBox">
				&lt;option>demo1&lt;/option>
				&lt;option>demo2&lt;/option>
				&lt;option>demo3&lt;/option>
				&lt;option>demo4&lt;/option>
			&lt;/select></code></pre>
					<pre><code>
			require('cabin/lib/chosen/chosen.jquery.js');

			$('.linkTypeSelectBox').chosen({
				no_results_text: '没有找到',
				disable_search: true, //关闭搜索功能
				width: "280px"
			});</code></pre>
				</div>
				<div>
					<div style="margin-top: 50px"> demo2</div>
					<label>请选择：</label>
					<select class="searchSelectBox">
						<option>demo1</option>
						<option>demo2</option>
						<option>demo3</option>
						<option>demo4</option>
					</select>
					<pre style="margin-top:15px;"><code>
			&lt;select class="searchSelectBox">
				&lt;option>demo1&lt;/option>
				&lt;option>demo2&lt;/option>
				&lt;option>demo3&lt;/option>
				&lt;option>demo4&lt;/option>
			&lt;/select></code></pre>
					<pre><code>
			require('cabin/lib/chosen/chosen.jquery.js');

			$('.searchSelectBox').chosen({
				no_results_text: '没有找到',
				search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配
				width: "400px"
			});</code></pre>
				</div>
				<div>
					<div style="margin-top: 50px"> demo3</div>
					<label>请选择：</label>
					<select class="mulitSelectBox" multiple data-placeholder="请选择">
						<option>demo1</option>
						<option>demo2</option>
						<option>demo3</option>
						<option>demo4</option>
					</select>
					<pre style="margin-top:15px;"><code>
			&lt;select class="mulitSelectBox" multiple data-placeholder="请选择">
				&lt;option>demo1&lt;/option>
				&lt;option>demo2&lt;/option>
				&lt;option>demo3&lt;/option>
				&lt;option>demo4&lt;/option>
			&lt;/select></code></pre>
					<pre><code>
			require('cabin/lib/chosen/chosen.jquery.js');

			$('.mulitSelectBox').chosen({
				no_results_text: '没有找到',
				search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配
				width: "300px",
			});</code></pre>
				</div>
				<div>
					<div style="margin-top: 50px"> demo4</div>
					<label>请选择：</label>
					<select class="mulitSearchSelectBox" multiple data-placeholder="请选择">
						<option>demo1</option>
						<option>demo2</option>
						<option>demo3</option>
						<option>demo4</option>
					</select>
					<pre style="margin-top:15px;"><code>
			&lt;select class="mulitSearchSelectBox" multiple data-placeholder="请选择">
				&lt;option>demo1&lt;/option>
				&lt;option>demo2&lt;/option>
				&lt;option>demo3&lt;/option>
				&lt;option>demo4&lt;/option>
			&lt;/select></code></pre>
					<pre><code>
			require('cabin/lib/chosen/chosen.jquery.js');

			$('.mulitSearchSelectBox').chosen({
				no_results_text: '没有找到',
				search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配
				max_selected_options: 2, //当select为多选时，最多选择个数
				width: "300px",
			});</code></pre>
				</div>
			</div>
		</div>
	</div>
</div>