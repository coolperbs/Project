var _myPolyfill = require('../../my.polyfill');
var ajax = require('../../common/ajax/ajax'),
    weigetUtils = require('../../common/utils/weigetUtil'),
    service = require('../../service/service'),
    utils = require('../../common/utils/utils'),
    couponService = require('../../service/coupon/coupon'),
    app = getApp(),
    Address = weigetUtils.Address,
    pageParam,
    SCoupon = {},
    _fn;

Page({
	data: {
		paymentType: 1
	},
	onShareAppMessage: app.shareFunc,
	onLoad: function (param) {
		pageParam = param || {};
	},
	onShow: function () {
		var self = this;

		SCoupon = couponService.cache();
		couponService.cache(null);
		var bizType = pageParam.bizType;
		var getDataFunc;
		if (bizType === 'groupon') {
			getDataFunc = _fn.getPageDataGroupon;
		} else {
			getDataFunc = _fn.getPageData;
		}
		// 获取页面信息
		getDataFunc(function (res) {
			if (res.code / 1 === 1000) {
				my.navigateTo({ url: '../login/login' });
				return;
			}
			if (utils.isErrorRes(res)) {
				return;
			}
			if (res.data.sku && (!res.data.skus || res.data.skus.length <= 0)) {
				res.data.skus = [res.data.sku];
			}

			self.setData({
				pageData: res.data,
				selectedCoupon: SCoupon.selectCoupon || {},
				pointPrice: res.data.pointPrice,
				bizType: bizType
			});

			if (res && res.data && res.data.defaultAddress && !self.data.address) {
				_fn.initAddress(self, res.data.defaultAddress);
			} else {
				_fn.initAddress(self, {});
			}
		});
		//this.showAddress();
	},

	usePoint: function (e) {
		var value = e.detail.value * 100,
		    data = this.data;

		if (value <= 0) {
			value = 0;
		}
		if (value >= data.pageData.pointPrice) {
			//wx.showModal( { title : '提示', showCancel: false, content : ( '积分最多用' + data.pointPrice / 100 + '元' ) } );
			value = data.pageData.pointPrice;
		}
		if (value >= data.pageData.payPrice) {
			value = data.pageData.payPrice;
		}

		this.setData({
			pointPrice: value
		});
	},

	selectAddress: function (e) {
		var id = e.currentTarget.dataset.id,
		    data = this.data,
		    addressList = data.addressList || {},
		    addressInfo,
		    i,
		    len;

		addressList = addressList.list || [];
		for (i = 0, len = addressList.length; i < len; ++i) {
			if (addressList[i].addressId == id) {
				addressInfo = addressList[i];
				break;
			}
		}
		addressInfo = addressInfo || {};
		addressInfo.id = addressInfo.addressId;
		_fn.initAddress(this, addressInfo);
		this.hideAddress();
		// this.setData( {
		// 	'addressList.selectedId' : id
		// } );
	},

	saveinput: function (e) {
		var value = e.detail.value,
		    key = e.currentTarget.dataset.key,
		    address = this.data.address;

		address[key] = value;
		this.setData({
			address: address
		});
	},

	changePayment: function (e) {
		var type = e.currentTarget.dataset.payment;
		this.setData({
			paymentType: type
		});
	},

	newAddress: function () {
		var address = {};
		this.setData({
			address: {}
		});
		_fn.initAddress(this, address);
		this.hideAddress();
	},

	showAddress: function () {
		var self = this,
		    address = self.data.address || {},
		    id = address.id;
		// 请求列表
		self.setData({
			showAddress: true,
			'addressList.selectedId': id
		});
		utils.showLoading(300);
		_fn.getAddressList(self, function (list) {
			var data = self.data,
			    selectedId = null;
			utils.hideLoading();
			if (data && data.address && data.address.id) {
				selectedId = data.address.id;
			}
			self.setData({
				addressList: {
					selectedId: selectedId,
					list: list
				}
			});
		});
	},

	hideAddress: function () {
		this.setData({
			showAddress: false
		});
	},

	goCoupons: function () {
		couponService.cache({
			selectCoupon: this.data.pageData.defaultCoupon,
			available: this.data.pageData.availableCoupons,
			unavailable: this.data.pageData.unavailabilityCoupons
		});
		my.navigateTo({ url: '../coupon-use/coupon-use' });
	},

	submit: function (e) {
		var userInfo = my.getStorageSync({
			key: 'userinfo'
		}).data,
		    self = this;
		if (!userInfo || !userInfo.token) {
			my.navigateTo({ url: '../login/login' });
			return;
		}

		if (!_fn.checkForm(this, e)) {
			return;
		}
		setTimeout(function () {
			// 保证blur先执行
			_fn.submit(self, function (res) {
				// 如果是在线支付就继续调用
				if (utils.isErrorRes(res)) {
					return;
				}
			});
		}, 100);
	},
	changeLocation: function (e) {
		var self = this;
		self.address.change(e);
	}
});

_fn = {
	getAddressList: function (caller, callback) {
		var data = caller.data;
		if (data.addressList) {
			callback && callback(data.addressList.list);
		}
		ajax.query({
			url: app.host + '/app/address/list'
		}, function (res) {
			if (utils.isErrorRes(res)) {
				return;
			}
			callback && callback(res.data);
		});
	},

	getPageData: function (callback) {
		var url = '',
		    couponId = 0,
		    city = my.getStorageSync({
			key: 'city'
		}).data,
		    selectedCoupon = SCoupon;

		if (!city || !city.code) {
			my.showToast(_myPolyfill.showToast({
				title: '缺少地址信息'
			}));
			return;
		}
		if (selectedCoupon && selectedCoupon.selectCoupon && selectedCoupon.selectCoupon.id) {
			couponId = selectedCoupon.selectCoupon.id;
		}
		if (pageParam.skuid && pageParam.skunum) {
			url = app.host + '/app/trade/buynow/' + city.code + '/' + pageParam.skuid + '/' + pageParam.skunum + '/' + couponId; //后面那个是优惠券Id
		} else if (pageParam.shopid) {
			// 门店购买
			url = app.host + '/app/trade/cartbuy/' + city.code + '/' + pageParam.shopid + '/' + couponId;
		} else {
			my.showToast(_myPolyfill.showToast({
				title: '缺少页面相关参数'
			}));
			return;
		}

		ajax.query({
			url: url
		}, callback);
	},
	getPageDataGroupon: function (callback) {
		var url = "";
		var productId = pageParam.productId;
		var grouponId = pageParam.grouponId;
		var city = my.getStorageSync({
			key: 'city'
		}).data;
		var cityCode = city.code || '028';
		var url = app.host + '/app/trade/groupon/' + cityCode;

		ajax.query({
			url: url,
			param: {
				productId: productId,
				grouponId: grouponId
				// grouponId:grouponId||null
			}
		}, callback);
	},
	initAddress: function (caller, address) {
		if (!address) {
			return;
		}
		caller.address = new Address({
			provinceId: address.province,
			cityId: address.city,
			countryId: address.country,
			changeCallback: function (data) {
				var formData = address,
				    key;
				if (data.province) {
					formData.province = data.province.adcode;
					formData.provinceName = data.province.name;
					formData.lat = data.province.lat;
					formData.lng = data.province.lng;
				} else {
					formData.province = null;
					formData.provinceName = null;
				}
				if (data.city) {
					formData.city = data.city.adcode;
					formData.cityName = data.city.name;
					formData.lat = data.city.lat;
					formData.lng = data.city.lng;
				} else {
					formData.city = null;
					formData.cityName = null;
				}
				if (data.country) {
					formData.country = data.country.adcode;
					formData.countryName = data.country.name;
					formData.lat = data.country.lat;
					formData.lng = data.country.lng;
				} else {
					formData.country = null;
					formData.countryName = null;
				}

				for (key in caller.data.address) {
					formData[key] = formData[key] || caller.data.address[key];
				}
				caller.setData({
					location: data,
					address: formData
				});
			}
		});
		caller.address.change();
	},

	checkForm: function (caller, e) {
		var newData = e.detail.value || {};
		if ((newData.userName + '').trim() == '') {
			my.showToast(_myPolyfill.showToast({
				title: '请填写联系人'
			}));
			return false;
		}
		if ((newData.userPhone + '').trim() == '') {
			my.showToast(_myPolyfill.showToast({
				title: '请填写手机号'
			}));
			return false;
		}
		if (!/^1[34578]\d{9}$/.test(newData.userPhone)) {
			my.showToast(_myPolyfill.showToast({
				title: '请填写正确的手机号'
			}));
			return false;
		}
		if ((newData.address + '').trim() == '') {
			my.showToast(_myPolyfill.showToast({
				title: '请填写详细地址'
			}));
			return false;
		}
		caller.data.address.userName = newData.userName;
		caller.data.address.userPhone = newData.userPhone;
		caller.data.address.address = newData.address;
		return true;
	},
	submit: function (caller) {
		var data = caller.data;
		// 验证表单数据
		var createOrderFunc;
		if (pageParam.bizType === 'groupon') {
			createOrderFunc = _fn.createOrderGroupon;
		} else {
			createOrderFunc = _fn.createOrder;
		}

		// 1.创建订单
		createOrderFunc(caller, function (orderRes) {
			console.log('完成订单创建', orderRes);
			if (utils.isErrorRes(orderRes)) {
				return;
			}
			var orderId = orderRes.data.orderId;

			if (caller.data.type == '到店支付') {
				my.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId });
				return;
			}

			if (orderRes && orderRes && orderRes.data && orderRes.data.payPrice * 1 === 0) {
				if (pageParam.bizType === 'groupon') {
					var grouponId = orderRes.data.grouponId;
					my.redirectTo({ url: '../gp-detail/gp-detail?grouponId=' + grouponId });
				} else {
					my.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId });
				}
				return;
			}

			// 2.获取支付订单
			_fn.payOrder({
				orderId: orderRes.data.orderId
			}, function (payRes) {
				console.log(JSON.stringify(payRes));
				if (!payRes || payRes.code != '0000' || !payRes.success) {
					_myPolyfill.showModal({
						title: '提示',
						content: payRes.msg || '系统错误',
						showCancel: false,
						complete: function () {
							my.redirectTo({
								url: '../orderdetail/orderdetail?orderid=' + orderId
							});
						}
					});
					return;
				}
				// _fn.aliPay();

				// 3.唤醒微信支付
				if(payRes && payRes.code==='0000' && payRes.data){
					_fn.aliPay({
						// timeStamp: payRes.data.timeStamp,
						// nonceStr: payRes.data.nonceStr,
						// package: 'prepay_id=' + payRes.data.prepayId,
						// paySign: payRes.data.sign
						payStr:payRes.data
					}, function (res) {
						console.log(JSON.stringify(res));
						my.showLoading({ title: '正在更新支付结果...' });
						setTimeout(function () {
							my.hideLoading();
							console.log(1)
							if (pageParam.bizType === 'groupon' && res !== false) {
								console.log(2)
								var grouponId = orderRes.data.grouponId;
								my.redirectTo({ url: '../gp-detail/gp-detail?grouponId=' + grouponId });
							} else {
								console.log(3)
								my.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId + "&bizType=" + pageParam.bizType });
							}
						}, 2000);
					});
				}
			});
		});
	},
	aliPay:function(param,callback){
		var payStr = param.payStr;


		// var payStr = "alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2018013102117092&biz_content=%7B%22body%22%3A%22%C9%CC%BC%D2-2274%22%2C%22out_trade_no%22%3A%2210000865%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22promo_params%22%3A%22%257B%2522payType%2522%253A%2522order%2522%257D%22%2C%22subject%22%3A%2210000865%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.02%22%7D&charset=GBK&format=json&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fshopgateway.yimeixinxijishu.com%2Fapp%2Fali%2Fpay%2Fnotify&sign=RRA%2BcxAAsV2%2BaAFtWtsCGPdtm3b41uM0fw0%2FwA73cJHLkJ3tx5tMBWF6%2B7rF1jGbcxU5a%2BBQ1lLEimO7vWzckOjYip0Fbgwg5GTs9b5eely%2FzbCDKOj7Upj%2FMTNAu9F9r0SpwwgMzFpEnYVGqTsvcGHx%2FNv1PPpc2aDbHIdzBF4W6ZrCtTeLQJqatbDmwErmdJ5B2YOIFsqmld5UYHa%2BG5uIncPMWDJ3DOydX%2BopNlVEjJTbpklLKcRbqohdkDgxXgmqXyDRz96Ok5LqdgzXN2Kv6n5X3ce2jgzMvbppXUWVE97gwVCk80P7iV2vjdirjMC2pAN%2FA6n5t4Lvy8thzw%3D%3D&sign_type=RSA2&timestamp=2018-04-07+20%3A19%3A01&version=1.0";
		// var str = "alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2018013102117092&biz_content=%7B%22out_trade_no%22%3A%22900012223002%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22900012223002%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=GBK&format=json&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fshopgateway.yimeixinxijishu.com%2Fapp%2Fali%2Fpay%2Fnotify&sign=ItkSJkDwbcI8POf0iE2WdEzv1jEtGOakfuG3gFWEi%2FCQKNS4BThxTLG8zbAX2VI4uMhNwK5bIgJaKWsoz0KDzMNOAyjuJpZCh%2F%2FivelJFjr3CL9u1HPggcLVa1tJ%2FpLxU8Wln3DXEUZN1tNW%2FEhS8sxG%2B8lAkkPFD%2B%2B6BLyAdsFMSdxbXsMwo8sj0npxhCLpVQPayPD4V5NWkKG2R4s1Fb6yCBy3EHKvASNw5U13vvsDxxXT2jcGW41QrslmWs5NC%2FnRX53XWiRNk7g%2BtfKm3ifCZAjVwdCqgCUh6P%2FFABKQ6ZhmQqX90SouSrIpqWI4xuaPzp5YOO34%2BnUFVtWb2g%3D%3D&sign_type=RSA2&timestamp=2018-04-05+20%3A35%3A14&version=1.0";
		// console.log(str);
		// my.alert({
		// 	content:payStr
		// });
		// console.log(payStr);
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
	createOrder: function (caller, callback) {
		var data = caller.data;
		var type;
		var address = data.address || {};
		var param = {};
		var url;
		var city = my.getStorageSync({
			key: 'city'
		}).data;

		address.addressId = address.id || '';
		if (pageParam.skunum && pageParam.skuid) {
			param.skuNum = pageParam.skunum;
			param.skuId = pageParam.skuid;
			param.shopId = 1;
		} else if (pageParam.shopid) {
			param.shopId = pageParam.shopid;
		} else {
			my.showToast(_myPolyfill.showToast({
				title: '缺少页面相关参数'
			}));
			return;
		}
		if (!city || !city.code) {
			my.showToast(_myPolyfill.showToast({
				title: '缺少地址信息'
			}));
			return;
		}
		param.citycode = city.code;
		if (caller.data.selectedCoupon && caller.data.selectedCoupon.id) {
			param.couponId = caller.data.selectedCoupon.id;
		}

		if (pageParam.skuid && pageParam.skunum) {
			url = app.host + '/app/order/buynow/submit';
		} else if (pageParam.shopid) {
			// 门店购买
			url = app.host + '/app/order/cart/submit';
		} else {
			my.showToast(_myPolyfill.showToast({
				title: '缺少页面相关参数'
			}));
			return;
		}

		param.address = address;
		param.payType = data.paymentType;
		param.userPoint = data.pointPrice;
		//param.userMoney = data.
		ajax.query({
			url: url,
			param: param
		}, callback);
	},
	createOrderGroupon: function (caller, callback) {
		var data = caller.data;
		var type;
		var address = data.address || {};
		var param = {};
		var url;
		var city = my.getStorageSync({
			key: 'city'
		}).data || { code: '028' };

		address.addressId = address.id || '';
		// if ( pageParam.skunum && pageParam.skuid ) {
		// 	param.skuNum = pageParam.skunum;
		// 	param.skuId = pageParam.skuid;
		// 	param.shopId = 1;
		// } else if ( pageParam.shopid ) {
		// 	param.shopId = pageParam.shopid;
		// } else {
		// 	wx.showToast( { title : '缺少页面相关参数' } );
		// 	return;
		// }
		if (!city || !city.code) {
			my.showToast(_myPolyfill.showToast({
				title: '缺少地址信息'
			}));
			return;
		}
		if (!pageParam.productId) {
			my.showToast(_myPolyfill.showToast({
				title: '缺少拼团信息'
			}));
			return;
		}

		if (caller.data.selectedCoupon && caller.data.selectedCoupon.id) {
			param.couponId = caller.data.selectedCoupon.id;
		}

		// if ( pageParam.skuid && pageParam.skunum ) {
		// 	url = app.host + '/app/order/buynow/submit';
		// }
		// else if ( pageParam.shopid ) {  // 门店购买
		// 	url = app.host + '/app/order/cart/submit';
		// } else {
		// 	wx.showToast( { title : '缺少页面相关参数' } );
		// 	return;
		// }

		url = app.host + '/app/order/groupon/submit';

		param.citycode = city.code;
		param.address = address;
		param.payType = data.paymentType;
		param.userPoint = data.pointPrice;
		param.productId = pageParam.productId;
		param.grouponId = pageParam.grouponId;
		//param.userMoney = data.
		ajax.query({
			url: url,
			param: param
		}, callback);
	},

	payOrder: function (param, callback) {
		// var url = app.host + '/app/pay/wechatPrePay'//微信
		var url = app.host+'/app/ali/pay/prePay'
		ajax.query({
			url: url,
			param: param
		}, callback);
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