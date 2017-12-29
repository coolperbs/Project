var ajax = require('../../common/ajax/ajax'), 
	app = getApp(),
	url, CFG, _fn, handle;


url = {
	submit : app.host + '/app/bespeak/submit',
	list : app.host + '/app/bespeak/list',

}


handle = {
	submit : function( param, callback ) {
		ajax.query( {
			url : url.submit,
			param : param
		}, function( res ) {
			callback && callback( res );
		} );
	},
	getList : function( param, callback ) {
		ajax.query( {
			url : url.list,
			param : param
		}, function( res ) {
			callback && callback( res );
		} );
	}
};


module.exports = handle;