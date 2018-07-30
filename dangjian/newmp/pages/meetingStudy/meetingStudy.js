var weigetUtil = require('../../common/utils/weigetUtil');
var utils = require('../../common/utils/utils');
var List = weigetUtil.List;
var Tab = weigetUtil.tab;
var config = require('../../config');
var host = config.host;

var typeEnum = {
	"1":'三会一课',
	"2":'党课学习'
}
var subtypeEnum = {
	"1":'党员风采',
	'2':'会议学习',
	'3':'年底工作计划',
	'4':'学习计划',
	'5':'工作总结',
	'6':'资料下载'
}

Page({
	onShow:function(){
		var self = this;
		self.searchParam = self.searchParam || {};
		self.searchParam = {
			keyWord : ''
		};
		self.setData({
			searchParam:self.searchParam
		});
		_fn.init(self);
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
		_fn.updateList(this);
	},
	back:function(){
		wx.navigateBack();
	},
	changeTab:function(e){
		var self = this;
		//切换tab
		var tabData = self.tab.change(e);
		var extraParam = JSON.parse(e.currentTarget.dataset.extra);
		var type = extraParam.type;

		self.searchParam = self.searchParam || {};
		self.searchParam = {
			keyWord:'',
			type:type
		};
		self.setData({
			searchParam:self.searchParam,
			tab:tabData
		});
		_fn.updateList(self);
	},
	loadMore:function(e){
		var self = this;
		self.List.next();
	},
	toDetail:function(e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../artical/artical?id='+id
		});
	}
});

var _fn = {
	init:function(page){
		_fn.createList(page);
		_fn.createTab(page);
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
		var type = searchParam.type||1;
		var listConfig = {
			url:host.cms+'/act/search',
			param:{
				type:1,//1:三会一课 2:党课学习
				// subType:type,//1:党员风采，2会议学习，3年底工作计划，4学习及恶化，5工作总结，6资料下载
				title:keyWord,
			},
			getList:function(res){
				var retList = res.data.news||[];
				retList.map(function(v,k){
					v.showCreateTime = utils.formateTime(v.modified);

					if ( v.bussinessTypes && typeof v.bussinessTypes.toString == 'function' ) {
						v.showType = subtypeEnum[v.bussinessTypes.toString()];
					}
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
	createTab:function(page){
		page.tab = new Tab({
			tabs:[{
				name:"党员风采",
				extra:JSON.stringify({type:1}),
			},{
				name:'会议学习',
				extra:JSON.stringify({type:2}),
			},{
				name:'年底工作计划',
				extra:JSON.stringify({type:3}),
			},{
				name:'学习计划',
				extra:JSON.stringify({type:4}),
			},{
				name:'工作总结',
				extra:JSON.stringify({type:5}),
			},{
				name:'资料下载',
				extra:JSON.stringify({type:6}),
			},]

		});
		var tabData = page.tab.change();
		// console.log(tabData);
		page.setData({tab:tabData});
	}
}