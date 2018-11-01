define( 'jifu/pages/oldpm/oldpm', function( require, exports, module ) {
	require( 'jifu/pages/oldpm/oldpm.css' );
	require( 'jifu/pages/oldpm/oldpm.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'jifu/widgets/header/header' );

	handle = {
		nodeClass: 'w-p-oldpm',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
        	var url = kayak.router.requestParam.url,
        		jView = this.jView;
        	header.showSub( { title : '老党员在行动' } );
        	if ( url ) {
        		jView.find( '.J_Iframe' ).attr( 'src', decodeURIComponent( url ) );
        		jView.find( '.J_IframeCont' ).show();
        		jView.find( '.J_oldpm' ).hide();
        	} else {
        		jView.find( '.J_IframeCont' ).hide();
        		jView.find( '.J_oldpm' ).show();
        	}
        },
        hide : function() {
        	
        },
        on : {
        	'click .J_Link' : function( e ) {
        		var jTarget = $( this );
        		kayak.router.go( '#index/jifu/oldpm:url=' + encodeURIComponent( jTarget.attr( 'data-url' ) ) );
        	}
        }
	}
	// 其他依赖资源预加载
	kDom = kayak.dom;
	router = kayak.router;

	module.exports = Page( handle );
} );
