let handle;
let _fn;

handle = {
	share : function( config, param ) {
		_fn.initConfig( config );
		wx.ready( function() {
			//alert( 1 );
			wx.onMenuShareTimeline({
	      		title: param.title,
	      		link: param.url,
	      		imgUrl: param.imgUrl
	      	});
	      	wx.onMenuShareAppMessage({
		      title: param.title,
		      desc : param.desc,
		      link: param.url,
		      imgUrl: param.imgUrl
	  		});
		} );
	}
}

_fn = {
	initConfig : function( config ) {
		var param = {
			debug: false,
			appId: config.appid,
			timestamp: config.timestamp,
			nonceStr: config.noncestr,
			signature: config.signature,
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			]
		}
	  wx.config(param);		
	}
}

export default handle;