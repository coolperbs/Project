var _fn ;
var weigetUtil = require('../../common/utils/weigetUtil');
var FileUploader = weigetUtil.FileUploader;
var ajax = require('../../common/ajax/ajax');
var config = require('../../config');
var host = config.host;

config = require('../../config');
Page({
	onShow:function(param){
		console.log("taskApply",param);
		_fn.init(this);
	},
	changeInput:function(e){
		console.log('changeInput');
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var value = e.currentTarget.detail.value;
		var self =this;
		self.formData = self.formData || {};
		self.formData[key] = value;
	},
	submit:function(e){
		var self = this;
		var formData = self.formData;
		var valRes = _fn.validateForm(formData);
		if(valRes){
			_fn.submit();
		}
	},
	changeFile:function(e){
		// console.log(123,e);
		var self = this;
		self.fileUploader.change(e);
	},
});

_fn = {
	init:function(page){
		page.fileUploader = new FileUploader({
			files:[],
			max:1,
			afterChange:function(res){
				if(res.btns){
					res.btns.forEach((v,k)=>{
						if(JSON.parse(v.eventParam).type==="finished"){
							var imgKey = 'img'+(k+1);
							page.formData[imgKey] = v.imgUrl
						}
					});
				}
				page.setData({
					uploadData:res
				});
			}
		});
		var uploadData = page.fileUploader.change()
	},
	validateForm:function(formData){
		return true
	},
	submit:function(formData){
		wx.showModal({
			title:'提示',
			content:'申请成功',
			showCancel:false,
			success:function(res){
				wx.navigateBack();
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
