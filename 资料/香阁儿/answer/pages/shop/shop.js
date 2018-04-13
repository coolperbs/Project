import {items,user} from '../../services/index';

Page( {

	onShareAppMessage: function () {
		return {
		  title: '等你来战',
		  path: '/pages/login/login',
		  //image: '',
		  success: function (res) {
		  	user.shareGetGold( function( res ) {
		  		if ( !res || res.code != '0000' ) {
		  			return;
		  		}
		  		wx.showToast( { title : '领取成功' } );
		  	} );
		  }
		}
	},	
	onShow : function() {
		let self = this;
		items.getList( function( res ) {
			if ( !res || res.code != '0000' ) {
				return;
			}
			self.setData( {
				pageInfo : res.data
			} );
		} );
	},
	hidePop : function() {
		this.setData( {
			showPop : false,
			currentIndex : -1
		} );
	},
	showPop : function( e ) {
		var index = e.currentTarget.dataset.index;
		this.setData( {
			showPop : true,
			currentIndex : index
		} );
	},

	buy : function( e ) {
		var target = e.currentTarget,
			id = target.dataset.id;

		items.buyItem( { wareId : id }, function( res ) {
			if ( !res || res.code != '0000' ) {
				//wx.showToast( { icon : 'none', title : res.msg || '后台获取信息失败' } )
				return;
			}
			var data = res.data || {};
			wx.requestPayment( {
				timeStamp : data.timeStamp,
				nonceStr : data.nonceStr,
				package : 'prepay_id=' + data.prepayId,
				signType : 'MD5',
				paySign : data.sign,			
				success : function() {
					wx.showToast( {
						title : '购买成功'
					} );
				},
				fail : function( ) {
					wx.showToast( {
						icon : 'none', 
						title : '购买失败'
					} );
				}
			} );			
		} );
	}
} );

