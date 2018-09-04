import ajax from '@/common/ajax/ajax'
let handle;
let _fn;

handle = {
	getPayInfo : function( param, callback ) {
		ajax.get( '/app/pay/wechatPrePay', param, function( res ) {
            callback( res );
        } );		
	},
	WXPay : function( param, callback ) {
		_fn.initWX( param, function() {
			_fn.WXPay( param, callback );
		} );
	}
}

_fn = {
	initWX : function( param, callback ) {
		wx.config({
		    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: param.appId || 'wx04f5a3479fb291e2', // 必填，公众号的唯一标识
		    timestamp: param.timeStamp, // 必填，生成签名的时间戳
		    nonceStr: param.nonceStr, // 必填，生成签名的随机串
		    signature: param.sign,// 必填，签名
		    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
		});		
		wx.ready( function() {
			//console.log( 'ready' );
			callback();
		} );
	},
	WXPay : function( param, callback ) {
		wx.chooseWXPay({
			timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
			package: 'prepay_id=' + param.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
			signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			paySign: param.sign, // 支付签名
			success: callback,
			fail : callback
		});
	}
}

export default handle;






