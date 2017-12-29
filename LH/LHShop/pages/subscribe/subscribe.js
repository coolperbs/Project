var utils = require( '../../common/utils/utils.js' ),
	modules = require( '../../widgets/modules/modules.js' ),
	service = require( '../../service/service.js' ),
	app = getApp(),
	pageParam,
	_fn;

Page( {
	data : {
		tab : 2	// 1:提交、2:列表
	},

	goDetail : function( e ) {
		var index = e.currentTarget.dataset.index,
			list = this.data.listData.bespeakList || [];

		wx.navigateTo( {
			url : '../subscribeinfo/subscribeinfo?title=' + list[index].bespeakTitle + '&&data=' + encodeURIComponent( list[index].jsonData )
		} );
	},
	onLoad : function( options ) {
		var scene = options.scene || '';
		pageParam = options || {};

		pageParam = options || {};
		scene = decodeURIComponent( scene );
		if ( scene.indexOf( 'actid_' ) == 0 ) {
			pageParam.actid = scene.split( '_' )[1];
		}
		//app.scene = ''; // 使用之后立即清空		
		pageParam.tab = pageParam.tab || 1;
		this.changeTab();
	},
	submit : function( e ) {
		var form = e.detail.value,
			data;
		data = _fn.checkForm( form );
		if ( !data ) {
			return;
		}
		service.subscribe.submit( {
			shopId : pageParam.shopid,
			bespeakTitle : this.data.pageData.title,
			bespeakId : pageParam.actid,
			jsonData : JSON.stringify( data )
		}, function( res ) {
			if ( utils.isErrorRes( res ) ) {
				return;
			}
			wx.showModal( {
				title : '提示',
				content : '预约成功',
				showCancel : false,
				success : function() {
					wx.navigateBack();
				}
			} );
		} );
	},
	changeTab : function( e ) {
		var type;
		type = e ? e.currentTarget.dataset.type : pageParam.tab;

		if ( type == 1 ) {
			_fn.getStoreInfo( this );
		} else if ( type == 2 ) {
			this.showList();
		}		

		this.setData( {
			tab : type,
			hideHead : pageParam.hidehead || false
		} );
	},

	showList : function() {
		var self = this;
		service.subscribe.getList( {
			shopId : pageParam.shopid,
			status : 4
		}, function( res ) {
			if ( utils.isErrorRes( res ) ) {
				return;
			}
			res.data = _fn.format( res.data );
			self.setData( {
				listData : res.data
			} );
		} );
	},

	onShareAppMessage : app.shareFunc,
	moduleClickProxy : function( e ) {
		var target = e.currentTarget;
		if ( target.dataset && target.dataset.fn && modules.events[target.dataset.fn] ) {
		  modules.events[target.dataset.fn].call( this, e );
		}
    }
} );

_fn = {
	checkForm  : function( form ) {
		var key, keyArr, type, result = [], value;
		for ( key in form ) {
			keyArr = key.split( '_' );
			type = keyArr.shift();
			key = keyArr.join( '_' );
			value = (form[type + '_' + key] + '' ).trim();
			if ( type * 1 == 1 && value == '' ) {
				wx.showModal( {
					title : '提示',
					content : '请填写' + key,
					showCancel : false
				} );
				return null;
			}
			result.push( {
				key : key,
				value : (form[type + '_' + key] + '' ).trim(),
				type : type
			} );
		}
		return result;
	},
	getStoreInfo : function( caller ) {
		utils.showLoading( 300 );

		var shops = [],
			shopsList = wx.getStorageSync( 'shops' ) || [],
			i, len;

		for ( i = 0, len = shopsList.length; i < len; ++i ) {
			shops.push( shopsList[i].id );
		}		
		service.active.getActive( {
			actId : pageParam.actid,
			shops : shops.join( ',' )
		}, function( res ) {
			utils.hideLoading();
			if ( utils.isErrorRes( res ) ) {
				return;
			}
			wx.setNavigationBarTitle( { title : res.data.title || '' } );
			caller.setData( {
				pageData : res.data || {}
			} );
		} );
	},
	format : function( data ) {
		var i, status = ['待处理','处理中','已完成'];
		data = data || {};
		data.bespeakList = data.bespeakList || [];

		for ( i = 0; i < data.bespeakList.length; ++i ) {
			data.bespeakList[i].statusStr = status[ data.bespeakList[i].status ];
			data.bespeakList[i].createdStr = utils.formateTime( data.bespeakList[i].created, true );
		}
		return data;
	}
}

