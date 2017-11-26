var weigetUtil = require('../../common/utils/weigetUtil');
var utils = require('../../common/utils/utils');
var List = weigetUtil.List;
var Tab = weigetUtil.tab;
var config = require('../../config');
var host = config.host;
var service = require('../../service/service');
var userService = service.user;
var cacheService = service.cache;



Page({
	onShow:function(){
		var self = this;
		self.searchParam = {
			keyWord : ''
		};
		self.setData({
			searchParam:self.searchParam
		});
	},
	onLoad:function(option){
		var self = this;
		var type = option.type || 0//0:查看全部，1查看自己
		self.userInfo = userService.checkLogin({needLogin:false})||{};
		self.userInfo = self.userInfo.user;

		self.pageType = type;
		_fn.init(self);

	},
	loadMore:function(e){
		var self = this;
		self.List.next();
	},
	changeKeyword:function(e){
		var self = this;
		var keyWord = e.detail.value;
		self.searchParam = self.searchParam || {};
		self.searchParam = {
			keyWord : keyWord
		};
		self.setData({
			searchParam:self.searchParam
		});
	},
	search : function() {
		_fn.updateList( this );
	},
	back:function(){
		wx.navigateBack();
	},
	toDetail:function(e){
		var id = e.currentTarget.dataset.id;
		var selData;
		var self = this;
		var selData = self.List.totalData.filter(function(v,k){
			return v.projectId === id;
		})[0];
		cacheService.cache(selData);

		wx.navigateTo({
			url:'../taskApply/taskApply?id='+id
		});
	}
});


var _fn = {

	init:function(page){
		_fn.createList(page);
		wx.getSystemInfo({
			success:function(res){
				var scrollHeight = (utils.toRpx(res.windowHeight)-110)+'rpx';
				page.setData({
					scrollHeight:scrollHeight

				});
			}
		});
	},
	getListConfig:function(page){
		page = page || {};
		var searchParam = page.searchParam || {};
		var keyWord = searchParam.keyWord||'';
		var pageType = page.pageType//0:查看全部 1:查看自己
		var userInfo = page.userInfo;
		console.log(333,userInfo)
		var listConfig = {
			url:host.gw+'/app/project/search',
			param:{
				name:keyWord,
				querySelf:pageType
			},
			getList:function(res){
				var retList = res.data.projects||[];
				retList.map(function(v,k){
					v.showCreateTime = utils.formateTime(v.createTime);
					if(v.flowStatus/1 === 4){
						v.showStatus = '已完成'
					}else if (v.flowStatus/1 === 2){
						v.showStatus = '处理中'
					}else if (v.flowStatus/1 === 1){
						v.showStatus = '未认领'
						if(userInfo && userInfo.level ===2 && v.userId!==userInfo.id){
							v.showGetBtn = true;
						}

					}
					v.showflowFilishTime = utils.formateTime(v.flowFilishTime);
					v.showFlowTime = utils.formateTime(v.flowTime);
					// v.showType = subtypeEnum[v.bussinessTypes.toString()];
					// v.showType = subtypeEnum[type]
					return v;
				});
				return retList;
			},
			getHasMore:function(res){
				return res.data.hasMore
				// return true;
			},
			render:function(data){
				page.setData({
					listData:data.totalData

				});
			}
		}
		return listConfig;
	},
	createList:function(page){
		var config = _fn.getListConfig(page);
		page.List = new List(config);
		page.List.next();
	},
	updateList:function(page){
		var config = _fn.getListConfig(page)
		page.List.setConfig(config);
		page.List.next();
	},

}