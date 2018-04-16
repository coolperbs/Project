var _myPolyfill = require('../../my.polyfill');
var config = require('../../config');
var utils = require('../../common/utils/utils');
var ajax = require('../../common/ajax/ajax');
var host = config.host;
var handle = {
	getOrderDetail: function (param) {
		var orderId = param.orderId;
		var callback = param.callback;
		ajax.query({
			url: host + '/app/order/info',
			param: { orderId: orderId }

		}, function (res) {
			if (callback && typeof callback === 'function') {
				callback(res);
			}
		});
	},
	getGrouponOrderDetail: function (param) {
		var orderId = param.orderId;
		var callback = param.callback;
		ajax.query({
			url: host + '/app/groupon/order/info',
			param: { orderId: orderId }

		}, function (res) {
			if (callback && typeof callback === 'function') {
				callback(res);
			}
		});
	},
	deleteOrder: function (param) {
		var orderId = param.orderId;
		var callback = param.callback;
		ajax.query({
			url: host + '/app/order/delete',
			param: { orderId: orderId }

		}, function (res) {
			if (callback && typeof callback === 'function') {
				callback(res);
			}
		});
	},
	cancelOrder: function (param) {
		var orderId = param.orderId;
		var callback = param.callback;
		ajax.query({
			url: host + '/app/order/cancel',
			param: { orderId: orderId }

		}, function (res) {
			if (callback && typeof callback === 'function') {
				callback(res);
			}
		});
	},
	confirmOrder: function (param) {
		var orderId = param.orderId;
		var callback = param.callback;
		ajax.query({
			url: host + '/app/order/received',
			param: { orderId: orderId }

		}, function (res) {
			if (callback && typeof callback === 'function') {
				callback(res);
			}
		});
	},
	getOrderStatusMining: function (status) {
		let statusDict = [{ code: 8, status: 'WaitingPay', label: '待支付' }, { code: 16, status: 'WaitingProduction', label: ' 待生产' }, { code: 32, status: 'Producting', label: '生产中' }, { code: 64, status: 'WaitingPickup', label: '待自提，待取货' }, { code: 128, status: 'Delivery', label: '配送中' }, { code: 256, status: 'Complete', label: '妥投' }, { code: 512, status: 'Finished', label: '已完成' }, { code: 1024, status: 'Canceled', label: '已取消' }];
		let statusInfo = statusDict.filter((v, k) => {
			return v.code.toString() === status.toString();
		});
		if (statusInfo && statusInfo[0]) {
			return statusInfo[0];
		} else {
			return { code: 0, status: 'common', label: 'common' };
		}
	},
	pay: function (param) {
		//支付订单
		var orderId = param.orderId;
		var callback = param.callback;
		_fn.payOrder({
			orderId: orderId
		}, function (payRes) {
			if (!payRes || payRes.code != '0000' || !payRes.success) {
				_myPolyfill.showModal({
					title: '提示',
					content: payRes.msg || '系统错误',
					showCancel: false,
					complete: function () {
						if (callback && typeof callback === 'function') {
							callback(false);
						}
					}
				});
				return;
			}
			// 3.唤醒微信支付
			// _fn.wxPay({
			// 	timeStamp: payRes.data.timeStamp,
			// 	nonceStr: payRes.data.nonceStr,
			// 	package: 'prepay_id=' + payRes.data.prepayId,
			// 	paySign: payRes.data.sign
			// }, function (res) {
			// 	if (callback && typeof callback === 'function') {
			// 		callback(res);
			// 	}
			// 	// wx.redirectTo( { url : '../orderdetail/orderdetail?orderId=' + orderId  } );
			// });
			if(payRes && payRes.code==='0000' && payRes.data){
				_fn.aliPay({
					// timeStamp: payRes.data.timeStamp,
					// nonceStr: payRes.data.nonceStr,
					// package: 'prepay_id=' + payRes.data.prepayId,
					// paySign: payRes.data.sign
					payStr:payRes.data
				}, function (res) {
					my.showLoading({ title: '正在更新支付结果...' });
					setTimeout(function () {
						my.hideLoading();
					if (callback && typeof callback === 'function') {
						callback(res);
					}
					wx.redirectTo( { url : '../orderdetail/orderdetail?orderId=' + orderId  } );
					}, 2000);
				});
			}
		});
	}
};
var _fn = {
	payOrder: function (param, callback) {
		ajax.query({
			// url: host + '/app/pay/wechatPrePay',
			url : host+'/app/ali/pay/prePay',
			param: param
		}, callback);
	},
	aliPay:function(param,callback){
		var payStr = param.payStr;
		// var str = "alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2018013102117092&biz_content=%7B%22out_trade_no%22%3A%22900012223002%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22900012223002%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=GBK&format=json&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fshopgateway.yimeixinxijishu.com%2Fapp%2Fali%2Fpay%2Fnotify&sign=ItkSJkDwbcI8POf0iE2WdEzv1jEtGOakfuG3gFWEi%2FCQKNS4BThxTLG8zbAX2VI4uMhNwK5bIgJaKWsoz0KDzMNOAyjuJpZCh%2F%2FivelJFjr3CL9u1HPggcLVa1tJ%2FpLxU8Wln3DXEUZN1tNW%2FEhS8sxG%2B8lAkkPFD%2B%2B6BLyAdsFMSdxbXsMwo8sj0npxhCLpVQPayPD4V5NWkKG2R4s1Fb6yCBy3EHKvASNw5U13vvsDxxXT2jcGW41QrslmWs5NC%2FnRX53XWiRNk7g%2BtfKm3ifCZAjVwdCqgCUh6P%2FFABKQ6ZhmQqX90SouSrIpqWI4xuaPzp5YOO34%2BnUFVtWb2g%3D%3D&sign_type=RSA2&timestamp=2018-04-05+20%3A35%3A14&version=1.0";
		// console.log(str);
		// my.alert({
		// 	content:payStr
		// });
		console.log(payStr);
		my.tradePay({
			orderStr:payStr,
			success: function (a) {
				callback && callback(true);
			},
			fail: function (b) {
				callback && callback(false);
			}
		});
	},
	wxPay: function (param, callback) {
		my.requestPayment({
			timeStamp: param.timeStamp,
			nonceStr: param.nonceStr,
			package: param.package,
			signType: 'MD5',
			paySign: param.paySign,
			success: function () {
				callback && callback(true);
			},
			fail: function () {
				callback && callback(false);
			}
		});
	}
};

module.exports = handle;