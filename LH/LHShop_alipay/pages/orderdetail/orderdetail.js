var _myPolyfill = require('../../my.polyfill');
var config = require('../../config');
var utils = require('../../common/utils/utils');
var orderService = require('../../service/order/order');
var app = getApp();

Page({
	onShareAppMessage: app.shareFunc,
	onLoad: function (param) {
		var self = this;
		self.param = param;
		console.log('orderdetail');
		self.setData({
			param: param
		});
		_fn.init(self);
	},
	toAddressList: function () {
		my.navigateTo({
			url: '../addresslist/addresslist'
		});
	},
	payOrder: function (e) {
		var self = this;
		var orderId = e.currentTarget.dataset.orderid;
		orderService.pay({
			orderId: orderId,
			callback: function (res) {
				var bizType = self.param.bizType;
				if (bizType === 'groupon') {
					var grouponId = self.data.detail.order.grouponId;
					my.navigateTo({
						url: '/pages/gp-detail/gp-detail?grouponId=' + grouponId

					});
				}
				_fn.init(self);
			}
		});
	},

	delete: function (e) {
		var orderId = e.currentTarget.dataset.orderid;
		var eventParam = e.currentTarget.dataset.param;
		var self = this;
		_myPolyfill.showModal({
			title: '提示',
			content: '您确定要删除这笔订单么?',
			success: function (res) {
				if (res.confirm) {
					orderService.deleteOrder({
						orderId: orderId,
						callback: function (res) {
							_fn.init(self);
						}
					});
				}
			}
		});
	},
	cancel: function (e) {
		var orderId = e.currentTarget.dataset.orderid;
		var eventParam = e.currentTarget.dataset.param;
		var self = this;
		_myPolyfill.showModal({
			title: '提示',
			content: '您确定要取消这笔订单么?',
			success: function (res) {
				if (res.confirm) {
					orderService.cancelOrder({
						orderId: orderId,
						callback: function (res) {
							_fn.init(self);
						}
					});
				}
			}
		});
	},
	toComment: function (e) {
		var orderId = e.currentTarget.dataset.orderid;
		var skuId = e.currentTarget.dataset.skuid;
		my.navigateTo({
			url: '../comment/comment?orderId=' + orderId + '&skuId=' + skuId
		});
	},
	toAftersale: function (e) {
		var orderId = e.currentTarget.dataset.orderid;
		var skuId = e.currentTarget.dataset.skuid;
		my.navigateTo({
			url: '../aftersale/aftersale?orderId=' + orderId + '&skuId=' + skuId
		});
	},
	toGrouponDetail: function (e) {
		var grouponId = e.currentTarget.dataset.grouponid;
		my.redirectTo({
			url: '../gp-detail/gp-detail?grouponId=' + grouponId
		});
	},
	confirm: function (e) {
		var orderId = e.currentTarget.dataset.orderid;
		var eventParam = e.currentTarget.dataset.param;
		var self = this;
		_myPolyfill.showModal({
			title: '提示',
			content: '您确定已收到宝贝?',
			success: function (res) {
				if (res.confirm) {
					orderService.confirmOrder({
						orderId: orderId,
						callback: function (res) {
							if (res.code === '0000') {
								_fn.init(self);
							} else {
								_myPolyfill.showModal({
									title: '提示',
									content: res.msg,
									showCancel: false
								});
							}
						}
					});
				}
			}
		});
	}
});
var _fn = {
	init: function (page) {
		_fn.getData(page, function (res) {
			page.setData({
				detail: res.data
			});
		});
	},
	getData: function (page, callback) {
		var orderId = page.param.orderid;
		var bizType = page.param.bizType;
		var getDataFunc;
		if (bizType === 'groupon') {
			getDataFunc = orderService.getGrouponOrderDetail;
		} else {
			getDataFunc = orderService.getOrderDetail;
		}

		getDataFunc({
			orderId: orderId,
			callback: function (res) {
				if (res.code === '0000') {
					var resData = res.data;
					var resDattOrder = resData.order;
					var orderTimeObj = utils.timeToDateObj(resDattOrder.orderTime);

					resDattOrder.showOrderTime = orderTimeObj.year + '-' + orderTimeObj.month + "-" + orderTimeObj.day + " " + orderTimeObj.hours + ":" + orderTimeObj.minutes;
					resDattOrder.showCouponPrice = utils.fixPrice(resDattOrder.couponPrice);
					resDattOrder.showTotalPrice = utils.fixPrice(resDattOrder.totalPrice);
					resDattOrder.showSheepPrice = utils.fixPrice(resDattOrder.sheepPrice);
					resDattOrder.showPayPrice = utils.fixPrice(resDattOrder.payPrice);
					resDattOrder.showOrderStatus = orderService.getOrderStatusMining(resDattOrder.orderStatus).label;

					resDattOrder.skus = resDattOrder.skus.map((v, k) => {
						v.showOriginPrice = utils.fixPrice(v.originPrice);
						return v;
					});
					var bizType = page.param.bizType;
					if (bizType === 'groupon' && resDattOrder.grouponStatus) {
						; //-1过期，1进行中，2完成

						if (resDattOrder.grouponStatus === -1) {
							resDattOrder.grouponStatusStr = '未成团';
						} else if (resDattOrder.grouponStatus === 1) {
							resDattOrder.grouponStatusStr = '拼团中';
						} else if (resDattOrder.grouponStatus === 1) {
							resDattOrder.grouponStatusStr = '已成团';
						} else {
							resDattOrder.grouponStatusStr = 'abc';
						}
					}
				}
				if (callback && typeof callback === 'function') {
					callback(res);
				}
			}
		});
	}
};