var _myPolyfill = require('../../my.polyfill');
var ajax = require('../../common/ajax/ajax'),
    utils = require('../../common/utils/utils'),
    app = getApp(),
    url,
    CFG,
    _fn,
    handle;

url = {
	shopList: app.host + '/app/store/list',
	rpc: app.host + '/lbs/amap/rpc'
};

handle = {
	getShops: function (callback) {
		var shops = my.getStorageSync({
			key: 'shops'
		}).data;
		var city = my.getStorageSync({
			key: 'city'
		}).data;

		if (shops && shops.length && city && city.code) {
			callback(shops);
			return;
		}

		// 获取地址信息
		handle.getLocInfo(function (res) {
			handle.getShopList(callback);
		});
	},
	getShopList: function (callback) {
		var city = my.getStorageSync({
			key: 'city'
		}).data;
		if (city && !city.code) {
			return;
		}
		ajax.query({
			param: {
				citycode: city.code,
				lat: 1,
				lng: 2
			},
			url: url.shopList
		}, function (res) {
			if (utils.isErrorRes(res)) {
				return;
			}
			res.data = res.data;
			res.data.stores = res.data.stores || [];
			my.setStorageSync({
				key: 'shops',
				data: res.data.stores
			});
			callback(my.getStorageSync({
				key: 'shops'
			}).data);
		});
	},

	getLocInfo: function (callback) {
		var city = my.getStorageSync({
			key: 'city'
		}).data;
		if (city) {
			callback(city);
			return;
		}
		// 1.根据定位获取地址信息
		// 获取坐标
		my.getLocation({
			type: 'gcj02',
			success: function (loc) {
				ajax.query({
					url: url.rpc,
					param: {
						url: encodeURIComponent('http://restapi.amap.com/v3/geocode/regeo?location=' + loc.longitude + ',' + loc.latitude + '&key=9830ac215f8f8892c38144e59a023fd0')
					}
				}, function (res) {
					var data = JSON.parse(res.data || ''),
					    city,
					    province,
					    cityData;

					if (!data || !data.regeocode || !data.regeocode.addressComponent || !data.regeocode.addressComponent.province || !data.regeocode.addressComponent.city || !data.regeocode.addressComponent.citycode) {
						_myPolyfill.showModal({
							title: '提示',
							content: '不能获取坐标，请手动选择城市',
							showCancel: false,
							complete: function () {
								my.navigateTo({
									url: '../city/city'
								});
							}
						});
						return;
					}

					city = data.regeocode.addressComponent.city;
					province = data.regeocode.addressComponent.province;

					if (typeof city == 'string') {
						city = city;
					} else {
						city = city[0];
					}
					cityData = {
						name: city || province,
						code: data.regeocode.addressComponent.citycode
					};
					my.setStorageSync({
						key: 'city',
						data: cityData
					});
					callback(cityData);
				});
				//handle.getShopList( callback );
			},
			fail: function () {
				_myPolyfill.showModal({
					title: '提示',
					content: '不能获取坐标，请手动选择城市',
					showCancel: false,
					complete: function () {
						my.navigateTo({
							url: '../city/city'
						});
					}
				});
			}
		});
	}
};

module.exports = handle;