define( 'tongzilin/pages/sub/menu/menu', function( require, exports, module ) {
	require( 'tongzilin/pages/sub/menu/menu.tpl' );
	require( 'tongzilin/pages/sub/menu/menu.css' );

	var handle, CFG, _fn,
		kayak = require( 'kayak/core/kayak' ),
		kRouter = kayak.router,
		callbacks = $( {} ),
		events = ['change'],
		kDom = kayak.dom;

	handle = {
		jView : null,
		inited : false,
		nodeClass: 'w-p-sub-menu',
        show : function( jParent ) {
        	this.jParent = jParent;
        	_fn.initDOM();
        	handle.jView.kInsert();
        	_fn.selectTab( kRouter.requestParam.tab );
        },
        hide : function() {
        }
	}

	_fn = {
		initDOM : function() {
			if ( handle.inited ) {
				return;
			}

			handle.jView = kDom.get( handle.nodeClass, handle.jParent );
        	_fn.bind();
			handle.inited = true;
		},
		bind : function() {
			handle.jView.on( 'click .tab', function( e ) {
				var jTarget = $( e.target ),
					tab = $.trim( jTarget.attr( 'data-tab' ) ),
					param = kRouter.requestParam,
					list = [], k;

				if ( !tab ) {
					return;
				}
				param.tab = tab;
				for ( k in param ) {
					list.push( k + '=' + param[k] );
				}
				kRouter.replace( '#' + kRouter.currentPath + ':' + list.join( '&' ) );
				//_fn.selectTab( jTarget.attr( 'data-tab' ) );
			} );
		},
		selectTab : function( tab ) {
			handle.jView.find( '.tab' ).removeClass( 'current' );
			handle.jView.find( '.tab[data-tab="' + tab + '"]' ).addClass( 'current' );
		}
	}
	module.exports = handle;
} );
