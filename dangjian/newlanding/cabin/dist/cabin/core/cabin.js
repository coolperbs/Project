(function () {
	var handle;
	handle = {
		//cabin自己的方法
	};
	define('cabin/core/cabin', function (require, exports, module) {
		//引用css
		//require('cabin/lib/bootstrap/css/bootstrap.css');
		require('cabin/lib/bootstrap/js/bootstrap.js');

		//cabin的其他模块
		var layout = require('cabin/layout/layout');
		var page = require('cabin/page/page');
		//widgets
		var minipop = require('cabin/widgets/minipop/minipop');
		var nextpage = require('cabin/widgets/nextpage/nextpage');
		var pop = require('cabin/widgets/pop/pop');
		var loading = require('cabin/widgets/loading/loading');
		var tips = require('cabin/widgets/tips/tips');
		/*tools*/
		var tools = require('cabin/common/tools/tools');
		require('cabin/lib/suggester/suggester');

		window.cabin = $.extend(handle, {
			layout: layout,
			Page: page,
			widgets: {
				minipop: minipop,
				nextpage: nextpage,
				pop: pop,
				loading: loading,
				tips: tips
			},
			tools:tools
		});
		module.exports = handle;
	});
})();
