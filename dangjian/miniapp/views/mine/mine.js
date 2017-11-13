

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
	},
	events:events
}
module.exports = handle;