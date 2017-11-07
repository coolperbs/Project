define('wuhou/layout/index/index', function (require, exports, module) {
	require( 'wuhou/layout/index/index.tpl' );
	require( 'wuhou/layout/index/index.css' );
	var index = cabin.layout({
		name: 'index'
	});

	return index;
});
