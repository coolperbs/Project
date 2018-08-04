( function() {
	var _fn, link, router;

	_fn = {
		init : function() {
			link.init();
			link.on( 'click', function( data ) {
				if ( !router[data.method] ) {
					return;
				}
				router[data.method]( data.link );
			} );
		}
	}

	define( 'kayak/core/kayak', function( require, exports, module ) {
		var deckInterface = require( 'kayak/core/router/deckinterface' );
		link = require( 'kayak/core/link/link' );
		router = require( 'kayak/core/router/router' );


		window.kayak = window.kayak || {};
		window.kayak = $.extend( window.kayak, {
			dom : require( 'kayak/core/dom' ),
			router : router,
			moduleLoader : require( 'kayak/core/moduleloader/moduleloader' ),
			storage : deckInterface.Storage,
			jBody : $( document.body ),
			jWindow : $( window )
		} );

		_fn.init();
		window.galleon = window.galleon || {};
		window.galleon.kayak = kayak;
		module.exports = window.kayak;
	} );
} )(); 