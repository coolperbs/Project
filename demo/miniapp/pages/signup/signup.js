var config = require('../../config');
var host = config.host;
var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');

Page({
	onShow:function(){
		console.log('signup')
	},
	changeInput:function(e){
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var val = e.detail.value;
		var self = this;
		self.formData = self.formData || {};
		self.formData[key] = val;
	},
	submit:function(){
		var self = this;
		var validateRes = _fn.validate(self);
		if(validateRes){
			_fn.submit(self);		}
	}
})

var _fn = {
	validate:function(page){
		var formData = page.formData||{};
		var errMsg,validateRes = true;
		switch(true){
			case !formData.userPhone:
				validateRes = false;
				errMsg = "请输入手机号码"
				break;
			case formData.userPhone.length!==11:
				validateRes = false;
				errMsg = "请输入正确的手机号码"
				break;
			case !formData.idCard:
				validateRes = false;
				errMsg = "请输入身份证号码"
				break;
			case formData.idCard.length!==18:
				validateRes=false;
				errMsg = "请输入正确身份证号码"
				break;
			case !formData.password:
				validateRes = false;
				errMsg = "请输入密码"
				break;
			case !formData.cheackPassword:
				validateRes = false;
				errMsg = "请再次输入密码"
				break;
			case formData.cheackPassword !== formData.password:
				validateRes = false;
				errMsg = "两次密码输入不一致"
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
	submit:function(page){
		var formData = page.formData||{};
		var url = host.gw+"/regist";
		// console.log(formData);
		// return 
		ajax.query({
			url:url,
			param:formData
		},function(res){
			if(res.code === '0000'){
				wx.showModal({
					title:'提示',
					content:'恭喜,注册成功',
					showCancel:false,
					success:function(res){
						_fn.toLogin();
					}
				})

			}else{
				wx.showModal({
					title:'提示',
					content:res.msg,
					showCancel:true
				})
			}
		})
	},
	toLogin:function(page){
		wx.redirectTo({
			url:'../login/login'
		})

	}

}
// {
// 	userPhone,
// 	idCard,
// 	password;
// 	cheachPassword

// }


// http://zfgw.yimeixinxijishu.com/regist
// http://zfgw.yimeixinxijishu.com/login