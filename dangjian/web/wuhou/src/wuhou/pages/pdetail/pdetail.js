define( 'wuhou/pages/pdetail/pdetail', function( require, exports, module ) {
	require( 'wuhou/pages/pdetail/pdetail.css' );
	require( 'wuhou/pages/pdetail/pdetail.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'wuhou/widgets/header/header' );

	handle = {
		nodeClass: 'w-p-pdetail',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
        	header.showSub();
        },
        hide : function() {
        	
        }
	}
	// 其他依赖资源预加载
	kDom = kayak.dom;
	router = kayak.router;

	module.exports = Page( handle );
} );
