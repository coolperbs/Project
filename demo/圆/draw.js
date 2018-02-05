( function() {
	var _fn;

	var SIZE_KEY = {
		1 : 'small',
		2 : 'normal',
		3 : 'big'
	}
	var data = [{	// 4个象限，每个象限9个圆
		circle : [3,2,1,2,3,2,1,2,3]   // 模拟大小
	},{
		circle : [3,3,3,1,3,3,3,3,3]   // 模拟大小
	},{
		circle : [1,2,1,2]   // 模拟大小
	},{
		circle : [3,3,2,2,1,1]   // 模拟大小
	}];

	var handle = {
		jCont : null,
		center : [],
		radiusSpace : 10, // 角度间隙，单位度
		minSpace : 8, // 圆之间最小角度
		level : 3, // 默认是3层
		ratio : 0.8,
		bigCircleRadius : 90, // 大圆的半径
		size : {
			big : 20,
			nomal : 10,
			small : 6
		},
		init : function() {
			this.jCont = $( '#J_Cont' );
			this.center = [ this.jCont.width() / 2, this.jCont.height() / 2 ];
			_fn.initSize();
			// 画中心
			_fn.drawCenter();
			// 画象限中的圆
			_fn.drawQuadrant( data );
			// 画线条
		}
	}

	_fn = {
		initSize : function() {
			var line, ratio = handle.ratio, baseLine,
				bigCircleRadius = handle.bigCircleRadius;
			// 初始化最大圆
			line = ( handle.jCont.width() - bigCircleRadius ) / 2; 
			handle.outerLine = ( line - handle.minSpace * 3 ) / 3;
			baseLine = handle.outerLine;

			handle.size = {
				big : ( baseLine * ratio / 2 ).toFixed(2) * 1,
				normal : ( baseLine * ratio * ratio / 2 ).toFixed(2) * 1,
				small : ( baseLine * ratio * ratio * ratio / 2  ).toFixed(2) * 1
			}
		},

		drawCenter : function() {
			_fn.drawCircle( handle.center, handle.bigCircleRadius, '#ccc' );
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
		},

		drawQuadrant : function( data ) {
			var i, d;
			for ( i = 0; d = data[i]; ++i ) {
				_fn.drawQuadrantCircle( d, i );
			}
		},

		drawQuadrantCircle : function( d, quadrantIndex ) {
			var sizeList = _fn.sortList( d.circle ),
				circleInfo = _fn.getCircleInfo( sizeList, quadrantIndex );

		},

		sortList : function( list ) {
			list.sort( function( a, b ) {
				return b-a;
			} );
			return list;
		},

		// 这里比较笨，直接手动写死
		getCircleInfo : function( list, quadrantIndex ) {
			var result = [],
				baseAngle = quadrantIndex * 90 + 45,
				line, i, o;

			line = handle.bigCircleRadius + handle.minSpace * 2 + handle.outerLine * 1.5;
			result[0] = list[0] ? _fn.getPosAndRadius( baseAngle, line, list[0] ) : null;
			result[1] = list[1] ? _fn.getPosAndRadius( baseAngle - _fn.getIncludeAngle( line, list[1], handle.size[ SIZE_KEY[list[0] ] ] ), line, list[1] ) : null;
			result[2] = list[2] ? _fn.getPosAndRadius( baseAngle + _fn.getIncludeAngle( line, list[2], handle.size[ SIZE_KEY[list[0] ] ] ), line, list[2] ) : null;

			line = handle.bigCircleRadius + handle.minSpace * 2 + handle.outerLine -  handle.size[ SIZE_KEY[list[3]] ];
			result[3] = list[3] ? _fn.getPosAndRadius( baseAngle + _fn.getIncludeAngle( line, list[3] ), line, list[3] ) : null;
			line = handle.bigCircleRadius + handle.minSpace * 2 + handle.outerLine -  handle.size[ SIZE_KEY[list[4]] ];
			result[4] = list[4] ? _fn.getPosAndRadius( baseAngle - _fn.getIncludeAngle( line, list[4] ), line, list[4] ) : null;


			line = handle.bigCircleRadius + handle.minSpace * 3 + handle.outerLine * 2 + handle.size[ SIZE_KEY[list[5]] ];
			result[5] = list[5] ? _fn.getPosAndRadius( baseAngle + _fn.getIncludeAngle( line, list[5] ), line, list[5] ) : null;

			line = handle.bigCircleRadius + handle.minSpace * 3 + handle.outerLine * 2 + handle.size[ SIZE_KEY[list[6]] ];
			result[6] = list[6] ? _fn.getPosAndRadius( baseAngle - _fn.getIncludeAngle( line, list[6] ), line, list[6] ) : null;

			line = handle.bigCircleRadius + handle.minSpace * 3 + handle.outerLine * 2 + handle.size[ SIZE_KEY[list[7]] ];
			result[7] = list[7] ? _fn.getPosAndRadius( baseAngle - _fn.getIncludeAngle( line, list[7], handle.size[SIZE_KEY[list[7]]] + handle.minSpace * 2 + handle.size[SIZE_KEY[list[6]]] ), line, list[7] ) : null;

			line = handle.bigCircleRadius + handle.minSpace * 3 + handle.outerLine * 2 + handle.size[ SIZE_KEY[list[8]] ];
			result[8] = list[8] ? _fn.getPosAndRadius( baseAngle + _fn.getIncludeAngle( line, list[8], handle.size[SIZE_KEY[list[8]]] + handle.minSpace * 2 + handle.size[SIZE_KEY[list[5]]] ), line, list[8] ) : null;

			// 没有值则自动不渲染
			for ( i = 0; o = result[i]; ++i ) {
				_fn.drawCircle( o.pos, o.radius, '#ccc' );
			}
		},

		getPosAndRadius : function( angle, radius, type ) {
			var x, y, A = 2 * Math.PI / 360;

			if ( angle > 0 && angle < 90 ) {
				x = ( handle.center[1] + radius * Math.cos( angle * A ) ).toFixed( 2 ) * 1;
				y = ( handle.center[0] + radius * Math.sin( angle * A ) ).toFixed( 2 ) * 1;
			} 
			else if ( angle > 90 && angle < 180 ) {
				x = ( handle.center[1] + radius * Math.cos( ( angle - 90 ) * A ) ).toFixed( 2 ) * 1;
				y = ( handle.center[0] - radius * Math.sin( ( angle - 90 ) * A ) ).toFixed( 2 ) * 1;
			} else if ( angle > 180 && angle < 270 ) {
				x = ( handle.center[1] - radius * Math.cos( ( angle - 180 ) * A ) ).toFixed( 2 ) * 1;
				y = ( handle.center[0] + radius * Math.sin( ( angle - 180 ) * A ) ).toFixed( 2 ) * 1;
			} else if ( angle > 270 && angle < 360 ) {
				x = ( handle.center[1] - radius * Math.cos( ( angle - 270 ) * A ) ).toFixed( 2 ) * 1;
				y = ( handle.center[0] - radius * Math.sin( ( angle - 270 ) * A ) ).toFixed( 2 ) * 1;
			}


			if ( typeof x == 'undefined' || typeof y == 'undefined' ) {
				return null;
			}
			return {
				pos : [ x, y ],
				radius : handle.size[ SIZE_KEY[type] ]
			}
		},

		// 获取夹角
		getIncludeAngle : function( line, type, baseLine ) {
			baseLine = baseLine || 0;
			var radius = handle.size[ SIZE_KEY[type] ],
				angle;

			radius += baseLine;
			angle = ( Math.asin( ( radius + handle.minSpace / 2 ) / line ) / 2 / Math.PI * 360 ).toFixed( 2 ) * 1;
			console.log( 'radius:' + radius, 'line:' + line, 'angle:' + angle );
			return angle;
		}
	}

	handle.init();
} )();