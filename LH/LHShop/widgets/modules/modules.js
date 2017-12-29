var utils = require( '../../common/utils/utils.js' ),
	service = require( '../../service/service' ),
	events,
	_fn,
	handle;

handle = {}

handle.events = {
	jumpDetail : function( e ) {
		var id = e.currentTarget.dataset.id;
		if ( !id ){
			return;
		}
		wx.navigateTo( { url : '../detail/detail?id=' + id } );
	},
	jumpGrouponDetail : function( e ) {
		var id = e.currentTarget.dataset.id;
		if ( !id ){
			return;
		}
		wx.navigateTo( { url : '../gp-waredetail/gp-waredetail?id=' + id } );
	},

	showShops : function( e ) {
		this.setData( {
			'viewData.showShops' : !this.data.viewData.showShops
		} );
	},

	jumpUrl : function( e ) {
		var jumpType  = e.currentTarget.dataset.type,
			jumpCont = e.currentTarget.dataset.content,
			url, stacks;

		switch( jumpType * 1 ) {
			case 1 : // 不跳转
				url = '';
				break;
			case 2 : // 跳链接，需要写死小程序相对链接 url
				url = jumpCont;
				break;
			case 3 : // 商详 skuid
				url = '../detail/detail?id=' + jumpCont;
				break;
			case 4 : // 添加购物车, skuid
				_fn.addOut( this, jumpCont );
				url = '';
				break;
			case 5 : // 活动页面 actid
				url = '../active/active?actid=' + jumpCont;
				break;
			case 6 : // 优惠券 shopId，门店内的活动跳优惠券需要传入门店id
				url = '../coupon-fetch/coupon-fetch?shopId=' + jumpCont;
				break;
			case 7 : // 搜索 key
				url = '../search/search?key=' + jumpCont;
				break;
			case 8 : // 跳店铺 shopid
				url = '../shop/shop?shopid=' + jumpCont;
				break;
			case 9 : // 文章列表
				url = '../articallist/articallist';
				break;
			case 10 : // 文章详情
				url = '../artical/cartical?id=' + jumpCont;
				break;
			case 12 : // 拼团首页
				url = '../gp-index/gp-index';
				break;
		}

		if ( !url ) {
			return;
		}
		stacks = getCurrentPages();
		if ( ( jumpType == 3 || jumpType == 5 || jumpType == 8 ) && stacks.length >= 4 ) {
			wx.redirectTo( { url : url } );
		} else {
			wx.navigateTo( { url : url } );
		}
	},

	addCart : function( e ) {
		var id = e.currentTarget.dataset.id;
		if ( !id ) {
			return;
		}
		_fn.addOut( this, id );
	},

	changeSelector : function( e ) {
		_fn.changeData( e.currentTarget.dataset.instanceid, e.detail.value, this );
	}
}

_fn = {
	changeData : function( instanceid, value, caller ){
		var moduleList, i, len;

		if ( !caller.data || !caller.data.pageData || !caller.data.pageData.moduleList ) {
			return;
		}	
		moduleList = caller.data.pageData.moduleList;
		for ( i = 0, len = moduleList.length; i < len; ++i ) {
			if ( moduleList[i].moduleInstanceId == instanceid ) {
				moduleList[i].data.selectedValue = value;
				break;
			}
		}
		caller.setData( {
			'pageData.moduleList' : moduleList
		} );
	},
	addOut : function( caller, id ) {
		service.cart.addOut( caller, {
			skuId : id
		}, function( res ) {
			if ( res.code == '1000' ) {
				wx.navigateTo( {
					url : '../login/login'
				} );
				return;
			}
			if ( utils.isErrorRes( res ) ) {
				return;
			}
			wx.showToast( { title : '添加成功!' } );
		} );
	}
}

module.exports = handle;