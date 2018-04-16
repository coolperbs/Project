var _myPolyfill = require('../../my.polyfill');
var App = getApp();
var config = App.config;
var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');
var weigetUtil = require('../../common/utils/weigetUtil');
var service = require('../../service/service');
var userService = service.user;
var List = weigetUtil.List;
var Tab = weigetUtil.tab;

var typeEnum = {
	"1": '三会一课',
	"2": '党课学习'
};
var subtypeEnum = {
	"1": '党员风采',
	'2': '会议学习',
	'3': '年底工作计划',
	'4': '学习计划',
	'5': '工作总结',
	'6': '资料下载'
};

Page({
	data: {
		showPop: false,
		comment: ''
	},
	empty: function () {},
	showPop: function () {
		var self = this;
		self.checkLogin(function () {
			self.setData({
				showPop: true
			});
		});
	},
	hidePop: function () {
		this.setData({
			showPop: false
		});
	},
	onLoad: function (option) {
		var id = option.id;
		var self = this;
		self.id = id;
		_fn.init(self);
	},
	setComment: function (e) {
		this.setData({ comment: e.detail.value });
	},
	onShow: function () {},
	toggleCommentPop: function (e) {
		var self = this;
		var commentPopStatus = self.commentPopStatus || false;
		self.setData({ commentPopStatus: !self.commentPopStatus });
	},
	changeInput: function (e) {
		console.log('changeInput');
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var value = e.detail.value;
		var self = this;

		self.formData = self.formData || {};
		self.formData[key] = value;
		self.setData({ formData: self.formData });
	},
	addComment: function () {
		var self = this;
		_fn.addComment(self);
	},
	loadMore: function () {
		var self = this;
		if (self.commentList) {
			self.commentList.next();
		}
	},
	checkLogin: function (callback) {
		var self = this;
		self.userInfo = userService.checkLogin({ needLogin: false });
		if (!self.userInfo) {
			_myPolyfill.showModal({
				title: '提示',
				content: '请登录后再来评论哦~',
				success: function (res) {
					if (res.confirm) {
						my.navigateTo({
							url: "../../pages/register/register"
						});
					}
				}
			});
			return;
		}
		callback();
	},
	showShareMenu: function () {
		console.log(111);
		my.showShareMenu({});
	},
	onShareAppMessage: function () {
		var self = this;
		var artical = self.data.artical;

		return {
			title: artical.title,
			path: '/pages/artical/artical?id=' + self.id,
			imageUrl: artical.imageUrl,
			success: function (res) {
				my.showToast(_myPolyfill.showToast({
					title: '分享成功'
				}));
			}
		};
	}
});

var _fn = {
	init: function (page) {
		_fn.getArticalDetail(page);
		//_fn.initArticalList(page);
	},
	getArticalDetail: function (page) {
		var id = page.id;
		var url = config.actHost + '/article/render';
		ajax.query({
			url: url,
			param: {
				actId: id
			}
		}, function (res) {
			if (res.code === '0000') {
				var artical = res.data;
				artical.showPublishDate = utils.formateTime(artical.publishDate);
				if (artical.type) {
					artical.showType = typeEnum[artical.type.toString()];
				}
				if (artical.showSubType) {
					artical.showSubType = subtypeEnum[artical.subTpye.toString()];
				}
				console.log(res.data);
				page.setData({
					pageData: res.data
				});
				//_fn.initShare(page,artical);
			} else {
				_myPolyfill.showModal({
					title: '提示',
					content: res.msg,
					showCancel: true
				});
			}
		});
	},
	initArticalList: function (page) {
		var url = host.gw + '/app/comment/list';
		var param = {
			newsId: page.id
			// newsId:2
		};
		my.getSystemInfo(_myPolyfill.getSystemInfo({
			success: function (res) {
				var scrollHeight = utils.toRpx(res.windowHeight) + 'rpx';
				page.setData({
					scrollHeight: scrollHeight
				});
			}
		}));

		page.commentList = new List({
			url: url,
			param: param,
			getList: function (res) {
				var retList = [];
				if (res.code === '0000') {
					var retList = res.data.comments || [];
					retList.map(function (v, k) {
						v.showTime = utils.formateTime(v.commentCreated);
						// v.showType = subtypeEnum[v.bussinessTypes.toString()];
						// v.showType = subtypeEnum[type]
						return v;
					});
					page.setData({
						totalComment: res.data.totalCount
					});
					console.log(retList);
				}
				return retList;
			},
			getHasMore: function (res) {
				var hasMore = false;
				if (res.code === '0000') {
					hasMore = res.data.hasMore;
				}
				return hasMore;
				// return true;
			},
			render: function (data) {
				console.log(data);
				page.setData({
					listData: data.totalData,
					isLast: data.isLast
				});
			}
		});
		page.commentList.next();
	},
	addComment: function (page) {
		var url = host.gw + '/app/comment/submit';
		var param = {
			newsId: page.id,
			content: page.data.comment,
			start: 1,
			type: 1
		};
		ajax.query({
			url: url,
			param: param
		}, function (resdata) {
			if (resdata.code === '0000') {
				_myPolyfill.showModal({
					title: '提示',
					content: '评论成功',
					showCancel: false,
					success: function () {
						var commentList = page.data.listData;
						commentList.push(resdata.data);

						_fn.init(page);
					}
				});
			} else {
				_myPolyfill.showModal({
					title: '提示',
					content: resdata.msg,
					showCancel: true
				});
			}
			page.setData({
				commnet: ''
			});
			page.hidePop();
		});
	},
	initShare: function (page, artical) {}
};