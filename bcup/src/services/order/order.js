import ajax from '@/common/ajax/ajax'
let handle;

handle = {
	create : function( param, callback ) {
		ajax.get( '/app/order/buynow/submit', param, function( res ) {
			callback( res );
        } );
	}
}

export default handle;