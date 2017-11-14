var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');
var config = require('../../config');
var host = config.host;



var handle = {

	checkLogin:function(param){
		var needLogin = param.needLogin;
		var userInfo = wx.getStorageSync('userInfo');
		if(!userInfo && needLogin){
			wx.navigateTo({
				url:'../../pages/login/login'
			});
		}
		return userInfo;
	},


	writeLoginInfo:function(loginInfo,callback){
		wx.setStorageSync('userInfo',loginInfo);
		if(callback && typeof callback==='function'){
			callback(true)
		}
	}

}


module.exports = handle;




