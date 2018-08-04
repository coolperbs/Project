define('jifu/layout/index/index', function (require, exports, module) {
	require( 'jifu/layout/index/index.tpl' );
	require( 'jifu/layout/index/index.css' );
    var index = cabin.layout({
        name: 'index',
        widgets : {
            header: require('jifu/widgets/menu/menu')
        }
    });
	return index;
});
