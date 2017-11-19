
var config = require('../../config');
var host = config.host;
var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');
var service = require('../../service/service');
var userService = service.user;

var weigetUtil = require('../../common/utils/weigetUtil');
var utils = require('../../common/utils/utils');
var Tab = weigetUtil.tab;
Page({
	onShow:function(){
		var self = this;
		_fn.init(self);

	},
	changeTab:function(e){
		var self = this;
		var tabData = self.tab.change(e);
		var type = JSON.parse(e.currentTarget.dataset.extra).type;
		self.setData({
			type:type,
			tab:tabData
		});
	},
	changeSignupInput:function(e){
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var val = e.detail.value;
		var self = this;
		self.signupFormData = self.signupFormData || {};
		self.signupFormData[key] = val;
	},
	changeLoginInput:function(e){
		var dataset = e.currentTarget.dataset;
		var key = dataset.key;
		var val = e.detail.value;
		var self = this;
		self.loginFormData = self.loginFormData || {};
		self.loginFormData[key] = val;
	},
	signup:function(){
		var self = this;
		var validateRes = _signupfn.validate(self);
		if(validateRes){
			_signupfn.submit(self);		
		}
	},
	login:function(){
		var self = this;
		var validateRes = _loginfn.validate(self);
		if(validateRes){
			_loginfn.submit(self);		
		}

	}
});


var _fn = {
	init:function(page){
		_fn.createTab(page);

	},

	createTab:function(page){
		page.tab = new Tab({
			tabs:[{
				name:"登录",
				extra:JSON.stringify({type:'login'}),
			},{
				name:'注册',
				extra:JSON.stringify({type:'signup'}),
			}]

		});
		var tabData = page.tab.change();
		// console.log(tabData);
		page.setData({
			tab:tabData,
			type:'login'
		});
	}
}



var _loginfn = {
	validate:function(page){
		var loginFormData = page.loginFormData||{};
		var errMsg,validateRes = true;
		switch(true){
			case !loginFormData.userPhone:
				validateRes = false;
				errMsg = "请输入手机号码"
				break;
			case loginFormData.userPhone.length!==11:
				validateRes = false;
				errMsg = "请输入正确的手机号码"
				break;
			case !loginFormData.idCard:
				validateRes = false;
				errMsg = "请输入身份证号码"
				break;
			case loginFormData.idCard.length!==18:
				validateRes=false;
				errMsg = "请输入正确身份证号码"
				break;
			case !loginFormData.password:
				validateRes = false;
				errMsg = "请输入密码"
				break;
			// case !formData.checkPassword:
			// 	validateRes = false;
			// 	errMsg = "请确认密码"
			// 	break;
			// case formData.checkPassword !== formData.password:
			// 	validateRes = false;
			// 	errMsg = "两次密码输入不一致"
			// 	break;
		}
		if(errMsg){
			wx.showModal({
				title:'提示',
				content:errMsg,
				showCancel:false
			});
		}
		return validateRes

	},
	submit:function(page){
		var loginFormData = page.loginFormData||{};
		var url = host.gw+"/login";
		ajax.query({
			url:url,
			param:loginFormData
		},function(res){
			if(res.code === '0000'){
				wx.showToast({
					title:'登录成功'
				})
				userService.writeLoginInfo(res.data,function(res){
					if(res){
						wx.navigateBack();
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
};



var _signupfn = {
	validate:function(page){
		var signupFormData = page.signupFormData||{};
		var errMsg,validateRes = true;
		switch(true){
			case !signupFormData.userPhone:
				validateRes = false;
				errMsg = "请输入手机号码"
				break;
			case signupFormData.userPhone.length!==11:
				validateRes = false;
				errMsg = "请输入正确的手机号码"
				break;
			case !signupFormData.idCard:
				validateRes = false;
				errMsg = "请输入身份证号码"
				break;
			case signupFormData.idCard.length!==18:
				validateRes=false;
				errMsg = "请输入正确身份证号码"
				break;
			case !signupFormData.password:
				validateRes = false;
				errMsg = "请输入密码"
				break;
			case !signupFormData.cheackPassword:
				validateRes = false;
				errMsg = "请再次输入密码"
				break;
			case signupFormData.cheackPassword !== signupFormData.password:
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
		var signupFormData = page.signupFormData||{};
		var url = host.gw+"/regist";
		// console.log(formData);
		// return 
		ajax.query({
			url:url,
			param:signupFormData
		},function(resdate){
			if(resdate.code === '0000'){
				wx.showModal({
					title:'提示',
					content:'恭喜,注册成功',
					showCancel:false,
					success:function(){
						userService.writeLoginInfo(resdate.data,function(){
						wx.navigateBack();
				})
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



