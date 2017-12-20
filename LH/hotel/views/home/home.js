var service = require( '../../service/service' ),
	utils = require( '../../common/utils/utils' ),
	handle,
	events,
	_fn;

handle = {
	name : 'home',
	//data : data.data,
	render : function( callerPage ) {
		_fn.init( callerPage );
		// 请求数据，渲染数据
	},

	events : {
		click : function( caller, e ) {
			console.log(111);
		}
	}
}

_fn = {
	init : function( callerPage ) {
		var datetime = wx.getStorageSync( 'datetime' ),
			//city = wx.getStorageSync( 'city' ),
			allDay;

		allDay = datetime[1].time - datetime[0].time;
		allDay = Math.round( allDay / ( 24 * 60 * 60 * 1000 ) );
		utils.showLoading( { title : '定位中...' }, 300 );
		service.loc.getLocInfo( function( city ) {
			utils.hideLoading();
			callerPage.setData( {
				viewData : {
					datetime : datetime,
					allDay : allDay,
					city : city
				}
			} );
		} );
	}
}

module.exports = handle;