( function() {
	var EVENTS_TYPE = ['inited'],
		events = {}, default_opt,
		cabin,
		_fn;

	default_opt = {
		name : 'cabinindex',
		tpl : 'cabin/layout/index/index.tpl'
		// css : 'cabin/theme/cabin/layout.scss'
	}

	// layout应该是全局单例，所以写死
	function Layout( opt ) {
		//console.log( arguments.callee );
		// 清除之前的布局
		//_fn.clear();
		_fn.init( opt );
		return Layout;
	}

	$.extend( Layout, {
		enter : function() {
			var opt = Layout.opt;
			seajs.use( [opt.tpl, opt.css], function() {
				_fn.initDom();
				_fn.initWidgets();
				Layout.fire( 'inited' );
			} );
		},
		exit : function() {
			if ( Layout.jView ) {
				Layout.jView.remove();
			}
			events['inited'].fired = false;		
		},
		on : function( event, callback ) {
			if ( EVENTS_TYPE.indexOf( event ) < 0 ) {
				return;
			}
			if ( event == 'inited' && events[event] && events[event].fired ) {
				callback();
				return;
			}
			events[event] = events[event] || $.Callbacks();
			events[event].add( callback );
		},
		fire : function( event, param ) {
			if ( EVENTS_TYPE.indexOf( event ) < 0 ) {
				return;
			}
			events[event] = events[event] || $.Callbacks();
			events[event].fire( param );	
			events[event].fired = true;		
			console.log( events[event] );
		}
	} );

	_fn = {
		// 设置当前布局
		init : function( opt ) {
			alert( opt.name );
			Layout.opt = $.extend( true, default_opt, opt );
		},
		initDom : function() {
			Layout.jView = kayak.dom.get( Layout.opt.name ).clone();
			$('html').addClass( 'cabin' );
			Layout.jView.appendTo( kayak.jBody );
		},
		initWidgets : function() {
			var widgets = Layout.opt.widgets,
				w;

			for ( w in widgets ) {
				if ( widgets[w] && widgets[w].init ) {
					widgets[w].init();
				}
			}
		}
	}

/*
	Layout.on( 'inited', function( e, o ) {
		console.log( e );
	} );

	Layout.fire( 'inited', {name : 1} );*/

	define( 'cabin/layout/layout', function( require, exports, module ) {

		return Layout;
	} );
} )();