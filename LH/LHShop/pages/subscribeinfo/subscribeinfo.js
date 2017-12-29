var utils = require( '../../common/utils/utils.js' ),
	modules = require( '../../widgets/modules/modules.js' ),
	service = require( '../../service/service.js' ),
	app = getApp(),
	pageParam,
	_fn;

Page( {
	onLoad : function( options ) {
		var scene = options.scene || '';
		pageParam = options || {};
	},
	onReady : function() {
		var data = decodeURIComponent( pageParam.data );
		data = JSON.parse( data );
		this.setData( {
			list : data,
			title : pageParam.title
		} );
	},
	onShareAppMessage : app.shareFunc
} );

