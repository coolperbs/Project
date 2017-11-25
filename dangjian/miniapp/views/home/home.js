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
var events = {
	redirect:function(page,e){
		var pageName = e.currentTarget.dataset.pagename;
		var url = '../'+pageName+'/'+pageName;
		if(pageName === "rules"){
			url = url + "?type=CPApply"
		}
		wx.navigateTo({
			url:url
		});
	},
	toArtical:function(caller,e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../artical/artical?id='+id
		});
	},
	toTaskApply:function(caller,e){
		var userInfo = userService.checkLogin({
			needLogin:false
		});
		if(!userInfo){
			wx.showModal({
				title:'提示',
				content:'您需登录后才可创建项目申报',
				success:function(res){
					if(res.confirm){
						wx.navigateTo({
							url:'../register/register'
						});
					}
				}
			});
			return;
		}
		wx.navigateTo({
			url:'../taskApply/taskApply'
		});
	}
}
var handle = {
	render:function(callerPage){
		_fn.init(callerPage);
		_fn.render(callerPage);
	},
	events:events
};
var _fn = {
	init : function( callerPage ) {
		if(!callerPage.initHome){
			dataHandler = new DataHandler(callerPage);
			callerPage.initHome = true;
		}
	},
	render:function(caller){
		var dataList = [];
		var articalParam = [
			{type:1},
			{type:2,subType:1},
			{type:2,subType:2},
			{type:2,subType:3},
			{type:2,subType:4},
			{type:2,subType:5},
			{type:2,subType:6},
			]
		for(var i = 0 ; i < articalParam.length ; i++){
			_fn.getArticalList(articalParam[i],function(res){
				dataList.push(res);
				if(dataList.length>=articalParam.length){
					var renderData = _fn.getRenderData(dataList);
					dataHandler.setData({
						data:renderData
					})
				}
			});
		}


	},
	getArticalList:function(param,callback){
		var type = param.type;
		var subType = param.subType;
		var url=host.cms+'/act/search';
		var param={
			type:type,//1:三会一课 2:党课学习
			subType:subType,//1:党员风采，2会议学习，3年底工作计划，4学习及恶化，5工作总结，6资料下载
			// title:keyWord
		}
		ajax.query({
			url:url,
			param:param
		},function(res){
			if(callback && typeof callback == 'function'){
				var list = []
				if(res.code==='0000'){
					if(res.data && res.data.news){
						list = res.data.news.map((v,k)=>{
							v.showDate = utils.formateTime(v.modified);
							return v;
						});
					}
				}
				callback({
					type:type,
					subType:subType,
					list:list
				})
			}
		});
	},
	getRenderData:function(dataList){
		var renderData = {};
		if(dataList && dataList.length>0){
			dataList.forEach((v,k)=>{
				if(v.list && v.list.length>0){
					if(v.type/1===1){
						renderData.imgArtical = v.list[0]
					}else{
						renderData.swiperArtical = renderData.swiperArtical || [];
						renderData.swiperArtical.push(v.list[0]);
					}
					v.list.splice(0,1);

					renderData.listArtical = renderData.listArtical || [];
					renderData.listArtical.concat(v.list);
				}
			})
		}
		return renderData;
	}
}
var DataHandler = function(callerPage){
	this.callerPage = callerPage;
	this.viewData = {};
	this.setData = function(data){
		var isCurrentPage = this.callerPage.data.currentView == 'home';
		if(!isCurrentPage){
			return;
		}
		var viewData = us.extend(this.viewData,data);
		this.callerPage.setData({
			viewData:{
				home:viewData
			}
		});
	};
	this.getData = function(){
		return this.viewData;
	};

};

module.exports = handle;