var _myPolyfill = require('../../my.polyfill');
var weigetUtil = require('../../common/utils/weigetUtil');
var utils = require('../../common/utils/utils');
var modules = require('../../widgets/modules/modules');
var List = weigetUtil.List;
var Tab = weigetUtil.tab;
var App = getApp();
var config = App.config;

var typeEnum = {
	"1": '三会一课',
	"2": '党课学习'
};
var subtypeEnum = {
	"1": '党员风采',
	'2': '会议学习',
	'3': '年底工作计划',
	'4': '学习计划',
	'5': '工作总结'
	// '6':'资料下载'
};

Page({
	onShow: function () {
		var self = this;
		self.searchParam = {
			keyWord: ''
		};
		self.setData({
			searchParam: self.searchParam
		});
		_fn.init(self);
		_fn.startKill(this);
	},
	onHide: function () {
		_fn.stopKill(this);
	},
	onUnload: function () {
		_fn.stopKill(this);
	},
	jumpDetail: function (e) {
		var id = e.currentTarget.dataset.id;
		if (!id) {
			return;
		}
		my.navigateTo({ url: '../detail/detail?id=' + id });
	},
	changeKeyword: function (e) {
		var self = this;
		var keyWord = e.detail.value;
		self.searchParam = self.searchParam || {};
		self.searchParam = {
			keyWord: keyWord
		};
		self.setData({
			searchParam: self.searchParam
		});
	},
	search: function () {

		_fn.updateList(this);
	},
	back: function () {
		my.navigateBack();
	},
	changeTab: function (e) {
		var self = this;
		//切换tab
		var tabData = self.tab.change(e);
		var extraParam = JSON.parse(e.currentTarget.dataset.extra);
		var type = extraParam.type;

		self.searchParam = self.searchParam || {};
		self.searchParam = {
			keyWord: '',
			type: type
		};
		self.setData({
			searchParam: self.searchParam,
			tab: tabData
		});
		_fn.updateList(self);
	},
	loadMore: function (e) {
		var self = this;
		self.List.next();
	},
	toDetail: function (e) {
		var id = e.currentTarget.dataset.id;
		// 之后统一到活动页，考虑模板拓展的问题
		my.navigateTo({
			url: '../artical/artical?id=' + id
			//url : '../active/active?actid=' + id
		});
	}
});

var _fn = {
	startKill: function (caller) {
		if (caller.killTimmer) {
			return;
		}
		caller.killTimmer = setInterval(function () {
			caller.setData({
				'listData': _fn.setKillList(caller)
			});
		}, 1000);
	},

	stopKill: function (caller) {
		if (!caller.killTimmer) {
			return;
		}
		clearInterval(caller.killTimmer);
		caller.killTimmer = null;
	},

	setKillList: function (caller) {
		var list, i, len;
		if (!caller || !caller.data || !caller.data.listData || !caller.data.listData.length) {
			return;
		}
		list = caller.data.listData;

		for (i = 0, len = list.length; i < len; ++i) {
			list[i].seckillObj = _fn.setKillObj(list[i]);
		}
		return list;
	},

	setKillObj: function (item) {
		if (!item || !item.seckill) {
			return;
		}
		var obj = {},
		    current,
		    status = 0,
		    startTime,
		    endTime;

		current = new Date().getTime();
		startTime = item.seckill.effictiveStartDate - current;
		endTime = item.seckill.effictiveEndDate - current;
		// 计算状态
		if (startTime > 0 && endTime > 0) {
			status = 0;
		} else if (startTime <= 0 && endTime >= 0) {
			status = 1;
		} else if (startTime < 0 && endTime < 0) {
			status = 2;
		}

		obj.status = status;
		obj.startTime = _fn.formatSeckillTime(item.seckill.effictiveStartDate, current);
		obj.endTime = _fn.formatSeckillTime(item.seckill.effictiveEndDate, current);
		return obj;
	},

	formatSeckillTime: function (time, current) {
		var day, hours, minutes, seconds, result;

		day = Math.floor((time - current) / (24 * 60 * 60 * 1000));
		hours = Math.floor((time - current - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
		minutes = Math.floor((time - current - day * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000));
		seconds = Math.floor((time - current - day * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);

		result = {
			day: day > 0 ? day : 0,
			hours: hours > 0 ? hours : 0,
			minutes: minutes > 0 ? minutes : 0,
			seconds: seconds > 0 ? seconds : 0
		};

		result.hours = result.day >= 10 ? result.hours : '0' + result.hours;
		result.hours = result.hours >= 10 ? result.hours : '0' + result.hours;
		result.minutes = result.minutes >= 10 ? result.minutes : '0' + result.minutes;
		result.seconds = result.seconds >= 10 ? result.seconds : '0' + result.seconds;
		return result;
	},

	init: function (page) {
		_fn.createList(page);
		my.getSystemInfo(_myPolyfill.getSystemInfo({
			success: function (res) {
				var scrollHeight = utils.toRpx(res.windowHeight) - 20 + 'rpx';
				page.setData({
					scrollHeight: scrollHeight
				});
			}
		}));
	},
	getListConfig: function (page) {
		page = page || {};
		var searchParam = page.searchParam || {};
		var keyWord = searchParam.keyWord || '';
		var type = searchParam.type || 1;
		var listConfig = {
			url: config.host + '/seckill/list',
			param: {},
			getList: function (res) {
				var retList = res.data.seckillList || [];
				retList = _fn.wrapperList(retList);
				return retList;
			},
			getHasMore: function (res) {
				return res.data.hasMore;
				// return true;
			},
			render: function (data) {
				page.setData({
					listData: data.totalData
				});
			}
		};
		return listConfig;
	},
	wrapperList: function (list) {
		var i, len, obj;
		if (!list || !list.length) {
			return;
		}
		for (i = 0, len = list.length; i < len; ++i) {
			obj = {
				seckill: list[i],
				mainImage: list[i].bannerImage,
				shopId: list[i].shopId,
				skuId: list[i].wareSkuId,
				subTitle: list[i].skuDesc,
				title: list[i].skuTitle
			};
			list[i] = obj;
		}
		return list;
	},
	createList: function (page) {
		var config = _fn.getListConfig(page);
		page.List = new List(config);
		page.List.next();
	},
	updateList: function (page) {
		var config = _fn.getListConfig(page);
		page.List.setConfig(config);
		page.List.next();
	}
};