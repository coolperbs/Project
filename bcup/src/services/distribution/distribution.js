import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

let handle;


handle = {
	applyTrader : function( param, callback ) {
	    ajax.get( '/app/apply/trader', param, function( res) {
	      if ( utils.isErrorRes( res ) ) {
	        utils.showError( res.msg || '请求接口出错' );
	        return;
	      }
	      callback( res );
	    } );
	},
	applyBinding : function( param, callback ) {
	    ajax.get( '/app/trader/binding', param, function( res) {
	      if ( utils.isErrorRes( res ) ) {
	        utils.showError( res.msg || '请求接口出错' );
	        return;
	      }
	      callback && callback( res );
	    } );
	}
}

export default handle;


