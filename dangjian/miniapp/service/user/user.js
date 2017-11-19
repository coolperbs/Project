var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');
var config = require('../../config');
var host = config.host;



var handle = {

	checkLogin:function(param){
		var needLogin = param.needLogin;
		var userInfo = wx.getStorageSync('userinfo');
		console.log(userInfo);
		if(!userInfo && needLogin){
			wx.navigateTo({
				url:'../../pages/register/register'
			});
		}
		return userInfo;
	},


	writeLoginInfo:function(loginInfo,callback){
		wx.setStorageSync('userinfo',loginInfo);
		wx.setStorageSync('token',loginInfo.token);
		if(callback && typeof callback==='function'){
			callback(true)
		}
	},


	clearLoginInfo:function(){
		wx.removeStorageSync('userinfo');
		wx.removeStorageSync('token');
	}

}


module.exports = handle;




