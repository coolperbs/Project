define('tongzilin/layout/index/index', function (require, exports, module) {
	require( 'tongzilin/layout/index/index.tpl' );
	require( 'tongzilin/layout/index/index.css' );
	var index = cabin.layout({
		name: 'index',
		widgets : {
			header: require('tongzilin/widgets/header/header')
		}
	});

	return index;
});
