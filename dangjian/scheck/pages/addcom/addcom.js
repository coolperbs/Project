Page({
	getLocalImage:function() {
		wx.chooseImage({
			count:1,
			success : function() {

			},
			fail : function() {
				
			}
		});
	}
});