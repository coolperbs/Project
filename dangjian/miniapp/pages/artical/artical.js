var config = require('../../config');
var host = config.host;
var ajax = require('../../common/ajax/ajax');
var utils = require('../../common/utils/utils');

var typeEnum = {
	"1":'三会一课',
	"2":'党课学习'
}
var subtypeEnum = {
	"1":'党员风采',
	'2':'会议学习',
	'3':'年底工作计划',
	'4':'学习计划',
	'5':'工作总结',
	'6':'资料下载'
}


Page({
	onLoad:function(option){
		var id = option.id;
		var self = this;
		self.id = id;
		_fn.getArticalDetail(self);


	},
	onShow:function(){
		console.log('artical')
	}
});


var _fn = {
	getArticalDetail:function(page){
		var id = page.id;
		var url = host.cms + '/act/view/' + id;
		ajax.query({url:url},function(res){

			if(res.code === '0000'){
				var artical = res.data;
				artical.showPublishDate = utils.formateTime(artical.publishDate);
				artical.showType = typeEnum[artical.type.toString()];
				artical.showSubType = subtypeEnum[artical.subTpye.toString()];
				page.setData({
					artical:res.data
				})
				_fn.initShare(page,artical);
			}else{
				wx.showModal({
					title:'提示',
					content:res.msg,
					showCancel:true

				});
			}
		})

	},
	initShare:function(page,artical){
		page.onShareAppMessage({
			title:artical.title,
			path:'/pages/artical/artical?id='page.id,
			imageUrl:artical.imageUrl,
			success:function(res){
				wx.showToast({
					title:'分享成功'
				})

			}
		})

	}
}