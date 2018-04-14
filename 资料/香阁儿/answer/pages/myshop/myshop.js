import {items, user} from '../../services/index';

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
		items.getUserList( function( res ) {
			if ( !res || res.code != '0000' ) {
				return;
			}
			self.setData( {
				pageInfo : res.data
			} );
		} );
	},
	useItem : function( e ) {
		var id = e.currentTarget.dataset.id,
			self = this;
		items.useItem( id, function( res ) {
			if ( !res || res.code != '0000' ) {
				// wx.showToast( {
				// 	icon : 'none',
				// 	title : res.msg || '使用失败'
				// } );
				return;
			}
			self.setData( {
				pageInfo : res.data,
				showPop : false
			} );
			wx.showToast( {
				title : '使用成功'
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
	}
} );

