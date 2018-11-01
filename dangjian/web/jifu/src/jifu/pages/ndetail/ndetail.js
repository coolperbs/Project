define( 'jifu/pages/ndetail/ndetail', function( require, exports, module ) {
	require( 'jifu/pages/ndetail/ndetail.css' );
	require( 'jifu/pages/ndetail/ndetail.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'jifu/widgets/header/header' );

	handle = {
		nodeClass: 'w-p-ndetail',
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
