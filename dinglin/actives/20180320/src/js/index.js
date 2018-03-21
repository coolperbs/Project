( function() {
	var handle, _fn,
		jWindow = $( window ),
		jBody = $( document.body );

	handle = {
		init : function() {
			_fn.bind();
			//_fn.showPop( $( '#J_Form' ) );
		}
	}

	_fn = {
		bind : function() {
			// 显示
			$( '.J_ShowPop' ).click( function( e ) {
				var jTarget = $( e.target );
				_fn.showPop( $( '#' + jTarget.attr( 'data-id' ) ) );
			} );

			$( '.J_ClosePop' ).click( function( e ) {
				var jTarget = $( e.target );
				_fn.closePop( $( '#' + jTarget.attr( 'data-id' ) ) );
			} );			
		},

		showPop : function( jEl ) {
			var height = jWindow.height() *  0.8;

			jEl.css( { display : 'block' } );
			jEl.find( '.J_Pop' ).css( { 
				height : height,
				top : jWindow.height() * 0.1
			} );
		},

		closePop : function( jEl ) {
			jEl.css( { display : 'none' } );
		}
	}

	handle.init();
} )();