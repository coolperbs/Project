define( 'wuhou/common/screen/screen', function( require ) {
	var handle, _fn, bindResize = false, resizeTimmer,
		jWindow = $( window ),
		jHtml = $( 'html' );

	handle = {
		initRem : function() {
			if ( !bindResize ) {
				jWindow.resize( function() {
					if ( resizeTimmer ) {
						clearTimeout( resizeTimmer );
					}
					resizeTimmer = setTimeout( function() {
						_fn.initRem();
					}, 200 );
				} );
			}
			_fn.initRem();
		}
	}


	_fn = {
		initRem : function() {
			// base 1920 * 1080 1rem = 100px
			var width = jHtml.width(),
				fontSize;

			// 最小950
			width = width > 950 ? width : 950;
			fontSize = width / 1920 * 100;

			jHtml.css( 'font-size', fontSize + 'px' );
		}
	}

	handle.initRem();
	return handle;
} );