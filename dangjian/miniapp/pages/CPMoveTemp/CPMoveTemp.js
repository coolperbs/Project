var _fn ;
var ajax = require('../../common/ajax/ajax');
var config = require('../../config');
var host = config.host;
var anchoredOrganizationSelection = ['一部','二部','三部','四部','五部','六部'];
var transferTypeSelection = ['市内流动','跨省流动','省内跨市流动'];
Page({
	onShow:function(param){
		console.log("CPMove",param);
		var self = this;
		self.formData = {
			anchoredOrganization:anchoredOrganizationSelection[0],
			transferType:transferTypeSelection[0]
		}
		self.setData({
			formData:self.formData,
			anchoredOrganizationSelection:anchoredOrganizationSelection,
			transferTypeSelection:transferTypeSelection
		})
	},
	redirect:function(e){
		console.log('redirect');
		var pagename = e.currentTarget.dataset.pagename;
		var url = '../../pages/'+pagename+'/'+pagename;
		if(pagename === 'rules'){
			url = url + '?type=CPMove'
		}
		wx.navigateTo({
			url:url
		})

	},
	changeInput:function(e){
		console.log('changeInput');
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var value = e.detail.value;
		var self =this;
		self.formData = self.formData || {};
		if(key === 'anchoredOrganization'){
			value = anchoredOrganizationSelection[value];
		}
		if(key === 'transferType'){
			value = transferTypeSelection[value];
		}
		self.formData[key] = value;
		self.setData({
			formData:self.formData
		})
	},
	submit:function(e){
		var self = this;
		_fn.submit(self);
	}
});

_fn = {
	submit:function(page){
		var formData = page.formData;
		var url = host.gw+"/app/party/transfer/add";
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


