( function() {
	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router;

	handle = {
		initView : false,
		jView : null,
		enter : function() {
			_fn.initView();
			handle.jView.kInsert();
		},

		exit : function( ) {
			handle.jView.kRemove();
		}
	}
	_fn = {
		initView : function() {
			if ( handle.initView ) {
				return;
			}			
			handle.jView = kDom.get( '.w-v-home', kayak.jBody );
			handle.initView = true;
		}
	}

	define( 'wuhou/view/home/home', function( require, exports, module ) {
		require( 'wuhou/view/home/home.css' );
		require( 'wuhou/view/home/home.tpl' );
		kayak = require( 'kayak/core/kayak' );
		// 其他依赖资源预加载
		kDom = kayak.dom;
		router = kayak.router;

		module.exports = handle;
	} );
} )();