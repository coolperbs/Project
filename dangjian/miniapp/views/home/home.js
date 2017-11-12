var events = {
	redirect:function(page,e){
		var pageName = e.currentTarget.dataset.pagename;
		var url = '../'+pageName+'/'+pageName;
		if(pageName === "rules"){
			url = url + "?type=CPApply"
		}
		wx.navigateTo({
			url:url
		});
	},
	toArtical:function(){
		wx.navigateTo({
			url:'../artical/artical'
		});
	}
}
var handle = {
	render:function(){
		console.log('home');
	},
	events:events
};
module.exports = handle;