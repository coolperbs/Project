var _myPolyfill = require('../../my.polyfill');
var ajax = require('../../common/ajax/ajax'),
    utils = require('../../common/utils/utils'),
    app = getApp(),
    handle,
    events,
    _fn;

handle = {
	render: function (callerPage) {
		_fn.init(callerPage);

		var userInfo = my.getStorageSync({
			key: 'userinfo'
		}).data || {};
		_fn.getPageData(callerPage);
	}
};

events = {
	beAgent: function (e) {
		var phone = e.detail.value.phone,
		    userInfo = my.getStorageSync({
			key: 'userinfo'
		}).data || {},
		    caller = this;

		if ((phone + '').trim() == '') {
			my.showToast(_myPolyfill.showToast({
				title: '请填写手机号'
			}));
			return false;
		}
		if (!/^1[34578]\d{9}$/.test(phone)) {
			my.showToast(_myPolyfill.showToast({
				title: '请填写正确的手机号'
			}));
			return false;
		}
		utils.showLoading(300);
		ajax.query({
			url: app.host + '/app/applyTrader',
			param: {
				phone: phone
			}
		}, function (res) {
			utils.hideLoading();
			// 1002 已经是分销商
			if (utils.isErrorRes(res) && res.code != '1002') {
				return;
			}
			userInfo = userInfo.user || {};
			my.setStorageSync({
				key: 'upperuid',
				data: userInfo.id + ''
			});
			_fn.getPageData(caller);
		});
	},
	goLogin: function () {
		my.navigateTo({ url: '../login/login' });
	},
	saveimg: function () {
		var data = this.data;
		my.getImageInfo({
			src: data.viewData.traderInfo.qrcurl,
			success: function (res) {
				my.saveImageToPhotosAlbum({
					filePath: res.path,
					success: function () {
						my.showToast(_myPolyfill.showToast({
							title: '保存成功'
						}));
					},
					fail: function () {
						my.previewImage(_myPolyfill.previewImage({
							urls: [data.viewData.traderInfo.qrcurl]
						}));
					}
				});
			},
			fail: function () {
				my.previewImage(_myPolyfill.previewImage({
					urls: [data.viewData.traderInfo.qrcurl]
				}));
			}
		});
	}
};

_fn = {
	getPageData: function (caller, callback) {
		ajax.query({
			url: app.host + '/app/traderInfo'
		}, function (res) {
			var userInfo = my.getStorageSync({
				key: 'userinfo'
			}).data || {};
			if (res.code != '0000') {
				caller.setData({
					'viewData.userInfo': userInfo.user || {},
					'viewData.isBind': false,
					'viewData.config': app.config
				});
				return;
			}

			my.setStorageSync({
				key: 'upperuid',
				data: userInfo.user.id + ''
			});
			caller.setData({
				'viewData.userInfo': userInfo.user || {},
				'viewData.traderInfo': res.data,
				'viewData.config': app.config,
				'viewData.isBind': true
			});
		});
	},
	init: function (callerPage) {
		if (callerPage.initedDistribution) {
			return;
		}
		utils.mix(callerPage, {
			distribitionClickProxy: function (e) {
				var target = e.currentTarget;
				if (target.dataset && target.dataset.fn && events[target.dataset.fn]) {
					events[target.dataset.fn].call(this, e);
				}
			}
		});
		callerPage.initedDistribution = true;
	}
};

module.exports = handle;