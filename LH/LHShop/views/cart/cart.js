var handle, events, _fn,
    res = require( './data.js' ),
    utils = require( '../../common/utils/utils' ),
    service = require( '../../service/service' );

handle = {
  render : function( callerPage ) {
    var self = this;
  	_fn.init( callerPage );
    // 获取购物车数据
    service.cart.query( callerPage, {}, function( res ) {
      if ( res.code == '1000' ) {
        callerPage.setData( {
          'viewData.needLogin' : true
        } );
        return;
      }
      if ( utils.isErrorRes( res ) ) {
        callerPage.setData( {viewData : {}} );
        return;
      }
      res.data = res.data || {};
      res.data.shopCart = res.data.shopCart || [];
      res.data.needLogin = false;
      callerPage.setData( {
        viewData : res.data
      } );
    });
  }
};

events = {
  checkAll : function( e ) {
    var shopId = e.currentTarget.dataset.shopid,
        allChecked = e.currentTarget.dataset.allchecked,
        callerPage = this;


    service.cart.checkAll( {
      shopId : shopId,
      checked : allChecked == 1 ? false : true,
    }, function( res ) {
      _fn.refreshPage( callerPage, res );
    } );
  },
  goDetail : function( e ){
    var skuid = e.currentTarget.dataset.skuid;
    if ( !skuid ) {
      return;
    }
    wx.navigateTo( { url : '../detail/detail?id=' + skuid } );
  },
  check : function( e ) {
    var cartId = e.currentTarget.dataset.cartid,
        checked = e.currentTarget.dataset.checked,
        callerPage = this;

    service.cart.check( {
      cartId : cartId,
      checked : !checked
    }, function( res ) {
      _fn.refreshPage( callerPage, res );
    } );
  },
  goCheckOut : function( e ) {
    var shopId = e.currentTarget.dataset.shopid;
    if ( !shopId ) {
      wx.showToast( { title : '缺少shopId' } );
      return;
    }
    // 判断选中态等情况
    wx.navigateTo( { url : '../checkout/checkout?shopid=' + shopId } );
  },
  cut : function( e ) {
    var cartId = e.currentTarget.dataset.cartid,
        cartNum = e.currentTarget.dataset.num,
        callerPage = this;

    if ( cartNum == 1 ) {
      events.del.apply( this, [e] )
      return;
    }
    service.cart.cut( this, { cartId : cartId }, function( res ) {
      _fn.refreshPage( callerPage, res );
    } );
  }, 
  add : function( e ) {
    var cartId = e.currentTarget.dataset.cartid,
        callerPage = this;

    service.cart.add( this, { cartId : cartId }, function( res ) {
      _fn.refreshPage( callerPage, res );
    } );
  },
  del : function( e ) {
    var cartId = e.currentTarget.dataset.cartid,
        callerPage = this;

    wx.showModal( {
      title : '提示',
      content : '确定删除该商品？',
      showCancel : true,
      success : function( res ) {
        if ( res.cancel ) {
          return;
        }
        service.cart.del( callerPage, { cartId : cartId }, function( res ) {
          _fn.refreshPage( callerPage, res );
        } );
      }
    } );
  },
  gotoBuy : function() {
    utils.topToHome( 'home' );
  }
}

_fn = {
	init : function( callerPage ) {
		if ( callerPage.initedCart ) {
			return;
		}
		utils.mix( callerPage, {
      cartClickProxy : function( e ) {
        var target = e.currentTarget;
        if ( target.dataset && target.dataset.fn && events[target.dataset.fn] ) {
          events[target.dataset.fn].call( this, e );
        }
      }
    } );
		callerPage.initedCart = true;
	},
  refreshPage : function( callerPage, res ) {
    if ( utils.isErrorRes( res ) ) {
      return;
    }
    callerPage.setData( {
      viewData : res.data
    } );
  }
}

module.exports = handle;