( function() {
	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router;

	handle = {
		nodeClass: 'cabin-page-menu',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {

        },
        hide : function() {
        	
        }
	}

	define( 'wuhou/pages/home/home', function( require, exports, module ) {
		require( 'wuhou/pages/home/home.css' );
		require( 'wuhou/pages/home/home.tpl' );
		kayak = require( 'kayak/core/kayak' );
		// 其他依赖资源预加载
		kDom = kayak.dom;
		router = kayak.router;

		module.exports = Page( handle );
	} );
} )();