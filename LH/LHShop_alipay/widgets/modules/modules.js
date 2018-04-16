var _myPolyfill = require('../../my.polyfill');
var utils = require('../../common/utils/utils'),
    service = require('../../service/service'),
    events,
    _fn,
    handle;

handle = {
	initData: function (caller) {
		return;
		if (!caller || !caller.data || !caller.data.pageData || !caller.data.pageData.moduleList) {
			return;
		};
		// 处理业务，包括秒杀啥的
	},
	// 开始计算秒杀
	startKill: function (caller, listKey) {
		if (caller.killTimmer) {
			return;
		}
		caller.killTimmer = setInterval(function () {
			_fn.setKillModule(caller, listKey);
		}, 1000);
	},
	// 停止计算秒杀
	stopKill: function (caller) {
		if (!caller.killTimmer) {
			return;
		}
		clearInterval(caller.killTimmer);
		caller.killTimmer = null;
	}
};

handle.events = {
	jumpDetail: function (e) {
		var id = e.currentTarget.dataset.id;
		if (!id) {
			return;
		}
		my.navigateTo({ url: '../detail/detail?id=' + id });
	},
	jumpGrouponDetail: function (e) {
		var id = e.currentTarget.dataset.id;
		if (!id) {
			return;
		}
		my.redirectTo({ url: '../gp-waredetail/gp-waredetail?id=' + id });
	},

	showShops: function (e) {
		this.setData({
			'viewData.showShops': !this.data.viewData.showShops
		});
	},

	jumpUrl: function (e) {
		var jumpType = e.currentTarget.dataset.type,
		    jumpCont = e.currentTarget.dataset.content,
		    url,
		    stacks;

		switch (jumpType * 1) {
			case 1:
				// 不跳转
				url = '';
				break;
			case 2:
				// 跳链接，需要写死小程序相对链接 url
				url = jumpCont;
				break;
			case 3:
				// 商详 skuid
				url = '../detail/detail?id=' + jumpCont;
				break;
			case 4:
				// 添加购物车, skuid
				_fn.addOut(this, jumpCont);
				url = '';
				break;
			case 5:
				// 活动页面 actid
				url = '../active/active?actid=' + jumpCont;
				break;
			case 6:
				// 优惠券 shopId，门店内的活动跳优惠券需要传入门店id
				url = '../coupon-fetch/coupon-fetch?shopId=' + jumpCont;
				break;
			case 7:
				// 搜索 key
				url = '../search/search?key=' + jumpCont;
				break;
			case 8:
				// 跳店铺 shopid
				url = '../shop/shop?shopid=' + jumpCont;
				break;
			case 9:
				// 文章列表
				url = '../articallist/articallist';
				break;
			case 10:
				// 文章详情
				url = '../artical/artical?id=' + jumpCont;
				break;
			case 11:
				url = '../subscribe/subscribe?actid=' + jumpCont;
				break;
			case 12:
				// 拼团首页
				url = '../gp-index/gp-index';
				break;
		}

		if (!url) {
			return;
		}
		stacks = getCurrentPages();
		if ((jumpType == 3 || jumpType == 5 || jumpType == 8) && stacks.length >= 4) {
			my.redirectTo({ url: url });
		} else {
			my.navigateTo({ url: url });
		}
	},

	addCart: function (e) {
		var id = e.currentTarget.dataset.id;
		if (!id) {
			return;
		}
		_fn.addOut(this, id);
	},

	changeSelector: function (e) {
		_fn.changeData(e.currentTarget.dataset.instanceid, e.detail.value, this);
	}
};

_fn = {
	setKillModule: function (caller, key) {
		var list = _fn.getValueByChain(caller.data, key),
		    i,
		    len,
		    data = {};

		if (!list || !list.length) {
			return;
		}
		for (i = 0, len = list.length; i < len; ++i) {
			if (list[i] && list[i].modulePrototypeId == 14 && list[i].templatePrototypeId == 17) {
				list[i] = _fn.setKillItem(list[i]);
			}
		}
		data[key] = list;
		caller.setData(data);
	},

	setKillItem: function (obj) {
		var i, len, item;

		if (!obj || !obj.data || !obj.data.seckillSku) {
			return obj;
		}
		for (i = 0, len = obj.data.seckillSku.length; i < len; ++i) {
			item = obj.data.seckillSku[i];
			item = _fn.setKillObj(item);
		}
		return obj;
	},

	setKillObj: function (item) {
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
		item.seckillObj = obj;
		return item;
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

	getValueByChain: function (data, keys) {
		keys = keys || '';
		var list = keys.split('.'),
		    i,
		    len,
		    result;

		result = data || {};
		for (i = 0, len = list.length; i < len; ++i) {
			result = result[list[i]];
			if (result === undefined || result === null) {
				return result;
			}
		}
		return result;
	},

	changeData: function (instanceid, value, caller) {
		var moduleList, i, len;

		if (!caller.data || !caller.data.pageData || !caller.data.pageData.moduleList) {
			return;
		}
		moduleList = caller.data.pageData.moduleList;
		for (i = 0, len = moduleList.length; i < len; ++i) {
			if (moduleList[i].moduleInstanceId == instanceid) {
				moduleList[i].data.selectedValue = value;
				break;
			}
		}
		caller.setData({
			'pageData.moduleList': moduleList
		});
	},
	addOut: function (caller, id) {
		service.cart.addOut(caller, {
			skuId: id
		}, function (res) {
			if (res.code == '1000') {
				my.navigateTo({
					url: '../login/login'
				});
				return;
			}
			if (utils.isErrorRes(res)) {
				return;
			}
			my.showToast(_myPolyfill.showToast({
				title: '添加成功!'
			}));
		});
	}
};

module.exports = handle;