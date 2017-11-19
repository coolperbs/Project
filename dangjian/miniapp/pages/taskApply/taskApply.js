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
	onLoad:function(param){
		console.log("taskApply",param);
		var self = this;
		self.userInfo = userService.checkLogin({
			needLogin:true
		})
		if(!self.userInfo){
			return;
		}
		self.param = param;
		_fn.init(this);
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
	changeFile:function(e){
		// console.log(123,e);
		var self = this;
		self.fileUploader.change(e);	
	},
	submit:function(e){
		var type = e.currentTarget.dataset.type;
		var self = this;
		if(type==='createTask'){
			_fn.createApply(self);
		}else if(type==="getTask"){
			_fn.getTask(self);

		}else if(type==='noteTask'){
			_fn.noteTask(self)

		}else if(type==='finishTask'){
			_fn.finishTask(self)
		}
	},
	toggleRecordPop:function(e){
		var self =this;
		var id = self.param.id;
		wx.navigateTo({
			url:'../taskComment/taskComment?id='+id
		})
	},
	addNote:function(){
		var self = this;
		_fn.noteTask(self);

	},
	downloadFile:function(e){
		var url = e.currentTarget.dataset.url;
		wx.downloadFile({
			url:url
		});
	}
});

_fn = {
	init:function(page){
		var pageParam = page.param;
		if(pageParam && pageParam.id && cacheService.cache()){
			page.formData = cacheService.cache();
			page.formData.publicedStr = publicedSelection[page.formData.publiced]
			cacheService.clear();
			var flowStatus = page.formData.flowStatus
			var userInfo = page.userInfo.user
			var pageType = 0;

			if(flowStatus === 1){//待认领任务，只能飞本人的党员可以看到
				if(userInfo.level!==2 || page.formData.userId === userInfo.id){
					pageType = 1000;
				}else{
					pageType = 1;
				}
			}else{
				var isCurUserFlower = page.formData.flowUserId === userInfo.id;
				pageType = isCurUserFlower?page.formData.flowStatus:1000
			}
			page.setData({
				pageType:pageType//1000只能查看，不能操作 1能看到认领， 2能看到结束、发布记录
			});

			if(page.formData.flowNote && page.formData.flowNote.length>0){
				page.formData.flowNote.map((v,k)=>{
					v.showNoteTime = utils.formateTime(v.noteTime);
					return v
				})
			}
		}else{
			page.setData({
				pageType:0
			});
			page.formData = page.formData||{};
		}


		page.fileUploader = new FileUploader({
			files:[],
			max:1,
			afterChange:function(res){
				if(res.btns){
					res.btns.forEach((v,k)=>{
						if(JSON.parse(v.eventParam).type==="finished"){
							page.formData['attachUrl'] = v.imgUrl
						}
					});
				}
				page.setData({
					uploadData:res
				});
			}
		});
		var uploadData = page.fileUploader.change()
		page.setData({
			publicedSelection:publicedSelection,
			formData:page.formData,
			recordPopStatus:false
		})
	},
	validateForm:function(page){
		var formData = page.formData||{};
		var errMsg,validateRes = true;
		switch(true){
			case !formData.userPhone:
				validateRes = false;
				errMsg = "请输入联系电话"
				break;
			case !formData.userName:
				validateRes = false;
				errMsg = "请输联系人"
				break;
			case !formData.name:
				validateRes=false;
				errMsg = "请输入项目名称"
				break;
			case !formData.desc:
				validateRes=false;
				errMsg = "请输入项目描述"
				break;
			case !formData.publiced:
				validateRes = false;
				errMsg = "请选择是否公开"
				break;
		}
		if(errMsg){
			wx.showModal({
				title:'提示',
				content:errMsg,
				showCancel:false
			});
		}
		return validateRes;


	},
	createApply:function(page){
		var validateRes  = _fn.validateForm(page);
		if(validateRes){
			var formData = page.formData;
			var url = host.gw+"/app/project/add";
			ajax.query({
				url:url,
				param:formData
			},function(res){
				if(res.code === '0000'){
					wx.showModal({
						title:'提示',
						content:'申请成功',
						showCancel:false,
						success:function(res){
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
			})
		}
	},
	getTask:function(page){
		// /app/project/claim ///认领
		// /app/project/cancel //取消
		// /app/comment/submit //提交平路
		// /app/project/finish

		var pageParam = page.param;
		var id = pageParam.id;

		var url = host.gw+"/app/project/claim";
		ajax.query({
			url:url,
			param:{
				projectId:id
			}
		},function(res){
			if(res.code === '0000'){
				wx.showModal({
					title:'提示',
					content:'认领成功',
					showCancel:false,
					success:function(){
						// wx.navigateBack();
						cacheService.cache(res.data);
						_fn.init(page);
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

	},
	finishTask:function(page){
		var pageParam = page.param;
		var id = pageParam.id;

		var url = host.gw+"/app/project/filish";
		ajax.query({
			url:url,
			param:{
				projectId:id
			}
		},function(res){
			if(res.code === '0000'){
				wx.showModal({
					title:'提示',
					content:'任务已结束',
					showCancel:false,
					success:function(){
						cacheService.cache(res.data);
						_fn.init(page);
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

	},

	noteTask:function(page){
		var pageParam = page.param;
		var id = pageParam.id;
		var note = page.formData.newNote;

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
						cacheService.cache(res.data);
						console.log(cacheService.cache());
						_fn.init(page);
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


//http://zfgw.yimeixinxijishu.com/app/project/add  第一个项目申请
//http://zfgw.yimeixinxijishu.com/app/project/list 第二个查看自己申请的项目


// {
// 	userPhone
// 	userName,
// 	name;
// 	desc,
// 	attachUrl,
// 	publiced
// }
