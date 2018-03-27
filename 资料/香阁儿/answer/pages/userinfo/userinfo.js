import utils from '../../common/utils/utils';
let _fn;

Page( {
	onShow : function() {
		let ctx = wx.createCanvasContext('cRadar');
		_fn.drawRadar( ctx, this );
	}
} );

_fn = {
	drawRadar : function( ctx, caller ) {
		_fn.drawBackground( ctx, caller );
	},

	drawBackground : function( ctx, caller ) {
		var data = [110, 90, 120, 150, 180, 210];
		_fn.drawAllCircle( ctx );
		_fn.drawAllLine( ctx );
		_fn.drawArea( ctx, data );
		_fn.drawAllDot( ctx, data );
	},

	drawAllCircle : function( ctx ) {
		// 内层圆
		_fn.drawCircle( ctx, {
			x : utils.toPx( 325 ),
			y : utils.toPx( 325 ),
			r : utils.toPx( 115 ),
			lineWidth : 1,
			lineColor : 'rgba( 225, 0, 131, 0.3 )'
		}, true );
		_fn.drawCircle( ctx, {
			x : utils.toPx( 325 ),
			y : utils.toPx( 325 ),
			r : utils.toPx( 190 ),
			lineWidth : 1,
			lineColor : 'rgba( 225, 0, 131, 0.3 )'
		}, true );
		_fn.drawCircle( ctx, {
			x : utils.toPx( 325 ),
			y : utils.toPx( 325 ),
			r : utils.toPx( 260 ),
			lineWidth : 4,
			lineColor : 'rgba( 225, 0, 131, 0.8 )'
		}, true );
	},

	drawAllDot : function( ctx, data ) {
		var pos = _fn.getPos( data,	{
			x : utils.toPx( 325 ),
			y : utils.toPx( 325 )
		} ),
			i, p;
		for ( i = 0; p = pos[i]; ++i ) {
			_fn.drawDot( ctx, { x : p[0], y : p[1] }, true );
		}
	},

	drawDot : function( ctx, opt, reserve ) {
		ctx.arc( opt.x, opt.y, utils.toPx( 5 ), 0, 2 * Math.PI);
		ctx.setFillStyle( '#ffffff' );
		ctx.fill();
		ctx.draw( reserve );
	},

	drawCircle : function( ctx, opt, reserve ) {
		ctx.beginPath();
		ctx.arc( opt.x, opt.y, opt.r, 0, 2 * Math.PI);
		//ctx.arc( 10, 20, 162.5, 0, 2 * Math.PI);
		ctx.setStrokeStyle( opt.lineColor );
		ctx.setLineWidth( opt.lineWidth );
		ctx.stroke();
		ctx.draw( reserve );
	},
	drawAllLine : function( ctx, opt, reserve ) {
		var x = Math.sin( 1/6 * 2 * Math.PI ) * utils.toPx( 280 ),
			y = Math.cos( 1/6 * 2 * Math.PI ) * utils.toPx( 280 ),
			reserve = true,
			opt;

		opt = {
			x : utils.toPx( 325 ),
			y : utils.toPx( 325 ),
			angle : 0,
			lineWidth : 1,
			length : utils.toPx( 280 ),
			lineColor : 'rgba( 225, 0, 131, 0.3 )'
		}

		opt.endx = opt.x + x;
		opt.endy = opt.y + y;
		_fn.drawLine( ctx, opt, reserve );

		opt.endx = opt.x - x;
		opt.endy = opt.y + y;
		_fn.drawLine( ctx, opt, reserve );

		opt.endx = opt.x - x;
		opt.endy = opt.y - y;
		_fn.drawLine( ctx, opt, reserve );

		opt.endx = opt.x + x;
		opt.endy = opt.y - y;
		_fn.drawLine( ctx, opt, reserve );

		opt.endx = opt.x;
		opt.endy = opt.y - opt.length;
		_fn.drawLine( ctx, opt, reserve );

		opt.endx = opt.x;
		opt.endy = opt.y + opt.length;
		_fn.drawLine( ctx, opt, reserve );

	},
	drawLine : function( ctx, opt, reserve ) {
		ctx.moveTo(opt.x, opt.y);
		ctx.lineTo( opt.endx, opt.endy );
		ctx.setLineWidth( opt.lineWidth );
		ctx.setStrokeStyle( opt.lineColor );
		ctx.stroke();
		ctx.draw( reserve );
	},
	drawArea : function( ctx, data ) {
		if ( data.length != 6 ) {
			return;
		}
		var opt, x, y, pos, i, d;

		opt = {
			x : utils.toPx( 325 ),
			y : utils.toPx( 325 ),
			angle : 0,
			lineWidth : 2,
			length : utils.toPx( 290 ),
			lineColor : 'rgba( 225, 0, 131, 0.9 )'
		}

		pos = _fn.getPos( data, opt );
		ctx.beginPath();
		for ( i = 0; d = pos[i]; ++i ) {
			if ( i == 0 ) {
				ctx.moveTo( d[0], d[1] );
			} else {
				ctx.lineTo( d[0], d[1] );
			}
		}
		ctx.closePath();

		ctx.setLineWidth( opt.lineWidth );
		ctx.setStrokeStyle( opt.lineColor );
		ctx.stroke();
		ctx.setFillStyle('rgba( 225, 0, 131, 0.3 )')
		ctx.fill();
		ctx.draw( true );
	},

	getPos : function( data, opt ) {
		var result = [], x, y;
		x = Math.sin( 1/6 * 2 * Math.PI ) * utils.toPx( data[0] );
		y = Math.cos( 1/6 * 2 * Math.PI ) * utils.toPx( data[0] );
		opt.endx = opt.x + x;
		opt.endy = opt.y + y;
		result.push( [opt.endx, opt.endy] );

		opt.endx = opt.x;
		opt.endy = opt.y + utils.toPx( data[1] );
		result.push( [opt.endx, opt.endy] );

		x = Math.sin( 1/6 * 2 * Math.PI ) * utils.toPx( data[2] );
		y = Math.cos( 1/6 * 2 * Math.PI ) * utils.toPx( data[2] );
		opt.endx = opt.x - x;
		opt.endy = opt.y + y;
		result.push( [opt.endx, opt.endy] );

		x = Math.sin( 1/6 * 2 * Math.PI ) * utils.toPx( data[3] );
		y = Math.cos( 1/6 * 2 * Math.PI ) * utils.toPx( data[3] );
		opt.endx = opt.x - x;
		opt.endy = opt.y - y;
		result.push( [opt.endx, opt.endy] );

		opt.endx = opt.x;
		opt.endy = opt.y - utils.toPx( data[4] );
		result.push( [opt.endx, opt.endy] );

		x = Math.sin( 1/6 * 2 * Math.PI ) * utils.toPx( data[5] );
		y = Math.cos( 1/6 * 2 * Math.PI ) * utils.toPx( data[5] );
		opt.endx = opt.x + x;
		opt.endy = opt.y - y;
		result.push( [opt.endx, opt.endy] );

		return result;	
	}
}