import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

let handle;


handle = {
	query : function( param, callback ) {
	    ajax.get( '/app/ware/detail/' + 1, function( res) {
	      if ( utils.isErrorRes( res ) ) {
	        utils.showError( res.msg || '请求接口出错' );
	        return;
	      }
	      callback( res );
	    } );
	}
}

export default handle;


