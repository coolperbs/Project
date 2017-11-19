var _fn ;
var ajax = require('../../common/ajax/ajax');
var config = require('../../config');
var host = config.host;
var genderSelection = ['男','女'];
Page({
	onShow:function(param){
		console.log("CPApply",param);
		var self = this;
		self.formData = {
			gender:''
		}
		self.setData({
			formData:self.formData,
			genderSelection:genderSelection
		});
	},
	changeInput:function(e){
		console.log('changeInput');
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var value = e.detail.value;
		var self =this;
		self.formData = self.formData || {};
		if(key==='gender'){
			value = genderSelection[value/1];
		}
		self.formData[key] = value;
		console.log(self.formData);
		self.setData({formData:self.formData});
	},
	submit:function(e){
		var self = this;
		_fn.submit(self);
	},
	cancel:function(){
		wx.navigateBack();
	}
});

_fn = {
	submit:function(page){
		var formData = page.formData;
		var url = host.gw+"/app/party/apply/add";
		ajax.query({
			url:url,
			param:formData
		},function(res){
			if(res.code === '0000'){
				wx.showModal({
					title:'提示',
					content:'申请成功,我们会尽快与您联系',
					showCancel:false,
					success:function(res){
						wx.reLaunch({
							url:'../index/index'
						})
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


