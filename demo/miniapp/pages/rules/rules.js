Page({
	onLoad:function(option){
		var type = option.type;
		var title = "详情";
		if(type==='CPMove'){title="流动党员介绍"}
		else if (type==="CPApply"){title = "学习党章"}
		wx.setNavigationBarTitle({
			title:title
		})
		this.setData({
			type:type
		})
	},
	submit:function(e){
		var type = e.currentTarget.dataset.type;
		if(type==='CPMove'){
			wx.navigateBack();
		}else if(type==="CPApply"){
			wx.navigateTo({
				url:'../../pages/CPApply/CPApply'
			});
		}
	}
})