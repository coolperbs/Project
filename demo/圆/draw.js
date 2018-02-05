( function() {
	var _fn;

	var handle = {
		jCont : null,
		center : [],
		size : {
			big : 20,
			nomal : 10,
			small : 6
		},
		init : function() {
			this.jCont = $( '#J_Cont' );
			this.center = [ this.jCont.width() / 2, this.jCont.height() / 2 ];
			_fn.initSize( 40 );
			// 画中心
			_fn.drawCenter();
			// 画象限
			// 画线条
		}
	}

	_fn = {
		initSize : function( bigCircleSize ) {
			var line, ratio = 0.8;
			// 初始化最大圆
			handle.bigCircleSize = bigCircleSize;
			line = ( handle.jCont.width() - bigCircleSize ) / 2 / 1.41; 

			handle.size = {
				big : ( line / 3 * ratio ).toFixed(2) * 1 / 2,
				normal : ( line / 3 * ratio * ratio ).toFixed(2) * 1 / 2,
				small : ( line / 3 * ratio * ratio * ratio ).toFixed(2) * 1 / 2
			}
			console.log( handle.size );
		},

		drawCenter : function() {
			_fn.drawCircle( handle.center, handle.bigCircleSize, '#ccc' );
		},

		drawCircle : function( pos, radius, backgroundcolor ) {
			var jCircle = $( '<div class="circle"></div>' );

			jCircle.css( {
				width : radius * 2 + 'px',
				height : radius * 2 + 'px',
				backgroundColor : backgroundcolor,
				left : pos[0] - radius,
				top : pos[1] - radius
			} );

			handle.jCont.append( jCircle );
		}
	}

	handle.init();
} )();