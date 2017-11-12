var _fn ,
config = require('../../config');
Page({
	onShow:function(param){
		console.log("taskApply",param);
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
	}
});

_fn = {
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


