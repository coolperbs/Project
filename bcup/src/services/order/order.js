import ajax from '@/common/ajax/ajax'
let handle;

handle = {
	create : function( param, callback ) {
		ajax.get( '/app/order/buynow/submit', param, function( res ) {
			callback( res );
        } );
	},
	get : function( param, callback ) {
		ajax.get( '/app/order/info', param, function( res ) {
			callback( res );
		} );
	},
	getList : function( param, callback ) {
		ajax.get( '/app/order/list', param, function( res ) {
			callback( res );
		} );
	}
}

export default handle;