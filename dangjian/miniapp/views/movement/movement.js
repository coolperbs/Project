/* 下拉加载没处理 */
var service = require('../../service/service');
var userService = service.user;
var config = require('../../config');
var host = config.host;
var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');
var weigetUtil = require('../../common/utils/weigetUtil');
var List = weigetUtil.List;
var Tab = weigetUtil.tab;
var us = require('../../lib/underscore');
var service = require('../../service/service');
var userService = service.user;
var dataHandler;

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



var events = {
	redirect:function(caller,e){
		var pagename = e.currentTarget.dataset.pagename;
		var param = e.currentTarget.dataset.param
		var url = "../../pages/"+pagename+"/"+pagename
		if(param){
			url = url + "?" + param;
		}
		wx.navigateTo({
			url:url
		})
	},
	toArtical:function(caller,e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../artical/artical?id='+id
		});
	},

	loadMore:function(caller,e){
		var self = this;
		self.List.next();
	},
	toDetail:function(caller,e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../artical/artical?id='+id
		});
	}
}


var DataHandler = function(callerPage){
	this.callerPage = callerPage;
	this.viewData = {};
	this.setData = function(data){
		var isCurrentPage = this.callerPage.data.currentView == 'movement';
		if(!isCurrentPage){
			return;
		}
		var viewData = us.extend(this.viewData,data);
		this.callerPage.setData({
			viewData:{
				movement:viewData
			}
		});
	};
	this.getData = function(){
		return this.viewData;
	};

};

var handle = {
	render:function(callerPage){
		console.log('movement');
		_fn.init(callerPage);
		_fn.createList(callerPage);
		
	},
	events:events
}



var _fn = {
	init : function( callerPage ) {
		if(!callerPage.initMovement){
			dataHandler = new DataHandler(callerPage);
			callerPage.initMovement = true;
		}
		wx.getSystemInfo({
			success:function(res){
				var scrollHeight = (utils.toRpx(res.windowHeight))+'rpx';
				dataHandler.setData({
					scrollHeight:scrollHeight

				});
			}
		});
	},
	getListConfig:function(callerPage){
		var listConfig = {
			url:host.cms+'/act/search',
			param:{
				type:2,//1:三会一课 2:党课学习
				subType:2,//1:党员风采，2会议学习，3年底工作计划，4学习及恶化，5工作总结，6资料下载
			},
			getList:function(res){
				var retList = res.data.news||[];
				retList.map(function(v,k){
					v.showCreateTime = utils.formateTime(v.modified);
					v.showType = subtypeEnum[v.bussinessTypes.toString()];
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
				dataHandler.setData({
					movementList:data.totalData
				})
			}
		}
		return listConfig;
	},
	createList:function(page){
		var config = _fn.getListConfig(page);
		page.movementList = new List(config);
		page.movementList.next();
	},
	updateList:function(page){
		var config = _fn.getListConfig(page)
		page.movementList.setConfig(config);
		page.movementList.next();
	},
}
module.exports = handle;
