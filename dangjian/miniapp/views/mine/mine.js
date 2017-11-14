
var service = require('../../service/service');
var userService = service.user;

var events = {
	redirect:function(caller,e){
		var pagename = e.currentTarget.dataset.pagename;
		var url = "../../pages/"+pagename+"/"+pagename
		wx.navigateTo({
			url:url
		})

	}
}


var handle = {
	render:function(){
		console.log('mine');
		var userInfo = userService.checkLogin({
			needLogin:true
		})
		if(!userInfo){
			return
		}
	},
	events:events
}
module.exports = handle;