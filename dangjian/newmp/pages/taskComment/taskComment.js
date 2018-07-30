var _fn ;
var weigetUtil = require('../../common/utils/weigetUtil');
var utils = require('../../common/utils/utils');
var FileUploader = weigetUtil.FileUploader;
var ajax = require('../../common/ajax/ajax');
var config = require('../../config');
var host = config.host;
var service = require('../../service/service');
var userService = service.user;
var cacheService = service.cache;
var config = require('../../config');
var publicedSelection = ['是','否'];





Page({

	onLoad:function(option){
		console.log('taskComment');
		var self =this;
		self.param = option
	},
	changeInput:function(e){
		console.log('changeInput');
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var value = e.detail.value;
		var self =this;
		if(key==='publiced'){
			self.formData.publicedStr=publicedSelection[value];
			value = value/1+1;//1是 2否
		}
		self.formData = self.formData || {};
		self.formData[key] = value;
		self.setData({formData:self.formData});
	},
	addComment:function(e){
		var self = this;
		_fn.noteTask(self);
	}

});

_fn = {
	noteTask:function(page){
			var pageParam = page.param;
			var id = pageParam.id;
			var note = page.formData.desc;

			var url = host.gw+"/app/project/note";
			ajax.query({
				url:url,
				param:{
					projectId:id,
					note:note
				}
			},function(res){
				if(res.code === '0000'){
					wx.showModal({
						title:'提示',
						content:'发布成功',
						showCancel:false,
						success:function(){
							wx.navigateBack();
						}
					});
				}else{
					wx.showModal({
						title:'提示',
						content:res.msg,
						showCancel:true
					})
				}
			});

		}
}

