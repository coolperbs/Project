define( 'cabin/layout/layout.class', function( require, exports, module ) {
	var _fn, kDom = kayak.dom,
		monitor = require( 'cabin/layout/monitor' );

	function handle( Layout, opt ) {
		this.Layout = Layout;
		this.opt = $.extend( true, {}, opt );
	}

	handle.prototype = {
		enter : function() {
			// 切换当前layout
			//this.Layout.setCurrent( this );
			var source = _fn.getSource( this.opt ),
				self = this;

			kayak.jBody.addClass( 'cabin' ); // 这个需要把方法暴露出去
			seajs.use( source, function() {
				_fn.initDom.apply( self );
				_fn.initWidgets.apply( self );
				monitor.trigger( 'inited', self );
			} );
		},
		exit : function() {
			this.jView.kRemove();
			monitor.trigger( 'destroy' );
		}
	}

	_fn = {
		init : function() {
			this.jView = kDom.get();
		},
		initDom : function() {
			var opt = this.opt;
			this.jView = kDom.get( opt.name );
			this.jView.kInsert( kayak.jBody );
		},
		initWidgets : function( caller ) {
			var widgets = this.opt.widgets,
				w;
			if ( !widgets ) {
				return;
			}
			for ( w in widgets ) {
				if ( widgets[w] && widgets[w].init ) {
					widgets[w].init();
				}
			}
		},
		getSource : function( opt ) {
			var sourceList = [];

			// 处理tpl
			if ( typeof opt.tpl == 'string' ) {
				sourceList.push( opt.tpl );
			}
			if ( Object.prototype.toString.apply( opt.tpl ) == '[object Array]' ) {
				sourceList.concat( opt.tpl );
			}

			// 处理css
			if ( typeof opt.css == 'string' ) {
				sourceList.push( opt.css );
			}
			if ( Object.prototype.toString.apply( opt.css ) == '[object Array]' ) {
				sourceList.concat( opt.css );
			}
			return sourceList;
		}
	}
	return handle;
} );