var _myPolyfill = require('../../my.polyfill');
var weigetUtils = require('../../common/utils/weigetUtil');
var ajax = require('../../common/ajax/ajax');
var config = require('../../config');
var addressService = require('../../service/address/address');
var host = config.host;
var app = getApp();
var Address = weigetUtils.Address;

Page({
	onShareAppMessage: app.shareFunc,
	onLoad: function (option) {
		var self = this;
		if (option.addressId) {
			self.formData = addressService.cache();
			console.log(self.formData);
			addressService.cache({});
		} else {
			self.formData = { defaulted: 2 };
		}
		console.log(self.formData);
		_fn.init(self);
	},
	changeLocation: function (e) {
		var self = this;
		console.log(e);
		self.address.change(e);
	},
	saveAddress: function (e) {
		var self = this;
		var formData = self.data.formData;
		if (formData.addressId) {
			_fn.updateAddress(self);
		} else {
			_fn.saveAddress(self);
		}
	},
	cancel: function (e) {
		my.navigateBack();
	},
	changeInput: function (e) {
		var value = e.detail.value;
		var key = e.currentTarget.dataset.name;
		this.formData[key] = value;
	},
	changeDefault: function (e) {
		this.formData.defaulted = this.formData.defaulted || 2;
		if (this.formData.defaulted === 2) {
			this.formData.defaulted = 1;
		} else {
			this.formData.defaulted = 2;
		}
		this.setData({ formData: this.formData });
	}
});
var _fn = {
	init: function (page) {
		page.formData = page.formData || {};
		page.address = new Address({
			provinceId: page.formData.province || '',
			countryId: page.formData.country || '',
			cityId: page.formData.city || '',

			changeCallback: function (data) {
				var formData = page.formData;
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
				page.setData({
					location: data,
					formData: formData
				});
			}
		});
		page.address.change();
	},
	saveAddress: function (page) {
		var validateRes = _fn.validateForm(page);
		if (!validateRes) {
			return;
		}
		var url = host + '/app/address/add';
		var param = page.formData;
		ajax.query({
			url: url,
			param: param
		}, function (res) {
			if (res.code === '0000') {
				my.showToast(_myPolyfill.showToast({
					title: '创建成功'
				}));
				setTimeout(function () {
					my.navigateBack();
				}, 1500);
			} else {
				_myPolyfill.showModal({
					showCancel: false,
					title: '提示',
					content: '创建失败(' + res.code + ')'
				});
			}
		});
	},
	updateAddress: function (page) {
		var validateRes = _fn.validateForm(page);
		if (!validateRes) {
			return;
		}
		var url = host + '/app/address/update';
		var param = page.formData;
		ajax.query({
			url: url,
			param: param
		}, function (res) {
			if (res.code === '0000') {
				my.showToast(_myPolyfill.showToast({
					title: '修改成功'
				}));
				setTimeout(function () {
					my.navigateBack();
				}, 1500);
			} else {
				_myPolyfill.showModal({
					showCancel: false,
					title: '提示',
					content: '修改失败(' + res.code + ')'
				});
			}
		});
	},
	validateForm: function (page) {
		var formData = page.formData || {};
		var checkRes = true;
		var errMsg;
		switch (true) {
			case !formData.userName:
				errMsg = '请输入收货人名称';
				checkRes = false;
				break;
			case !formData.userPhone:
				errMsg = '请输入收货人手机号码';
				checkRes = false;
				break;
			case formData.userPhone.length !== 11:
				errMsg = '请输入正确手机号码';
				checkRes = false;
				break;
			case !formData.provinceName:
				errMsg = '请选择省份';
				checkRes = false;
				break;
			case !formData.cityName:
				errMsg = '请选择城市';
				checkRes = false;
				break;
			case !formData.address:
				errMsg = '请输入详细地址';
				checkRes = false;
				break;
		}
		if (errMsg && !checkRes) {
			_myPolyfill.showModal({
				title: '提示',
				showCancel: false,
				content: errMsg
			});
		}
		return checkRes;
	}
};