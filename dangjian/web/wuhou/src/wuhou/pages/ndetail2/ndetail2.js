define( 'wuhou/pages/ndetail2/ndetail2', function( require, exports, module ) {
	require( 'wuhou/pages/ndetail2/ndetail2.css' );
	require( 'wuhou/pages/ndetail2/ndetail2.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'wuhou/widgets/header/header' );

	handle = {
		nodeClass: 'w-p-ndetail2',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
        	header.showSub( { title : '详情' } );
        },
        hide : function() {
        	
        }
	}
	// 其他依赖资源预加载
	kDom = kayak.dom;
	router = kayak.router;

	module.exports = Page( handle );
} );
