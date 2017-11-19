
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
	logout:function(){
		userService.clearLoginInfo();
		wx.reLaunch({
			url:'../../pages/index/index'
		});
	}

}

var DataHandler = function(callerPage){
	this.callerPage = callerPage;
	this.viewData = {};
	this.setData = function(data){
		var isCurrentPage = this.callerPage.data.currentView == 'mine';
		if(!isCurrentPage){
			return;
		}
		var viewData = us.extend(this.viewData,data);
		this.callerPage.setData({
			viewData:{
				mine:viewData
			}
		});
	};
	this.getData = function(){
		return this.viewData;
	};

};



var handle = {
	render:function(callerPage){
		console.log('mine');
		_fn.init(callerPage);
		var userInfo = userService.checkLogin({
			needLogin:false
		})
		dataHandler.setData({
			userInfo:userInfo
		})
		
	},
	events:events
}

var _fn = {
	init : function( callerPage ) {
		if(!callerPage.initMine){
			dataHandler = new DataHandler(callerPage);
			callerPage.initMine = true;
		}
	},
}
module.exports = handle;