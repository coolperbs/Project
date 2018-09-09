import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

let handle;


handle = {
	getMsgCode : function( phone, callback ) {
	    ajax.get( '/app/msg/apply/trader/' + phone, function( res) {
	      if ( utils.isErrorRes( res ) ) {
	        utils.showError( res.msg || '请求接口出错' );
	        return;
	      }
	      callback( res );
	    } );
	},
	test : function() {
		
	}
}

export default handle;

