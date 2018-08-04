( function(){
	var POOL = kayak.POOL,
		handle, _fn, CFG, CACHE = {};

	CFG = {
		POOL_ID : 'kayak-pool'
	}

	handle = {
		get : function( classSelector, jCont ) {
			if ( !classSelector || $.trim(classSelector) == '' ) {
				return;
			}
			classSelector = _fn.formatClass( classSelector );

			if ( CACHE[classSelector] ) {
				return CACHE[classSelector];
			}
			var jDom = POOL.children( classSelector );
			if ( !jDom[0] && jCont && jCont[0] ) {
				jDom = jDom[0] ? jDom : jCont.children( classSelector );
			}
			CACHE[classSelector] = handle.decorate( jDom, { jCont : jCont } );
			return CACHE[classSelector];
		},
		decorate : function( jDom, config ) {
			jDom.kInsert = _fn.show;
			jDom.kRemove = _fn.hide;
			jDom.kData = $.extend( {}, config );
			return jDom;
		}
	}

	_fn = {
		show : function( jCont ) {
			var kData = this.kData;

			jCont = jCont || kData.jCont;
			if ( !jCont || !jCont[0] ) {
				return;
			}
			this.appendTo( jCont );
		},

		hide : function() {
			this.appendTo( POOL );
		},

		formatClass : function( classSelector ) {
			return classSelector.charAt( 0 ) == '.' ? classSelector : '.' + classSelector;
		}
	}
	
	define( 'kayak/core/dom', function( require, exports, module ) {
		module.exports = handle;
	} );
} )();