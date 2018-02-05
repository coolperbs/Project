import service from '../../service/service';
import utils from '../../common/utils/utils';
var _fn, STATUSTIMMER;


Page( {
	onReady : function() {
		var caller = this;
		utils.showLoading( 300 );
		service.questions.getList( function( list ) {
			utils.hideLoading();
			if ( list && list.code ) {
				utils.showError( list.message || '获取信息错误' );
				return;
			}

			// 模拟假数据
			list[1] = {
				bonus:"3",
				description:"*仅限清华北大认证通过同学参加,其它高校同学可以围观奥!",
				end_timestamp : ( new Date().getTime() + 120000 ),
				ended:false,
				id:"6b40aaf2-4fe7-4d0a-82ea-2a7109763d92",
				name:"2清华北大专场(共15题)",
				start_timestamp: ( new Date().getTime() + 10000 ),
				started:true,
				system_timestamp: ( new Date().getTime() - 2000 ),
				title:"第1期"
			};
			list[2] = {
				bonus:"3",
				description:"*仅限清华北大认证通过同学参加,其它高校同学可以围观奥!",
				end_at:"2018-02-10T10:30:00.000000+08:00",
				ended:false,
				id:"6b40aaf2-4fe7-4d0a-82ea-2a7109763d92",
				name:"3清华北大专场(共15题)",
				start_at:"2018-02-03T17:51:30.000000+08:00",
				started:true,
				system_time:"2018-02-04T16:59:49.665639+08:00",
				title:"第1期"
			};
			list[3] = {
				bonus:"3",
				description:"*仅限清华北大认证通过同学参加,其它高校同学可以围观奥!",
				end_at:"2018-02-10T10:30:00.000000+08:00",
				ended:false,
				id:"6b40aaf2-4fe7-4d0a-82ea-2a7109763d92",
				name:"4清华北大专场(共15题)",
				start_at:"2018-02-03T17:51:30.000000+08:00",
				started:true,
				system_time:"2018-02-04T16:59:49.665639+08:00",
				title:"第1期"
			};			
			caller.setData( { 'pageData.list' : list } );
		} );
	},
	goMatch : function() {
		wx.navigateTo( { url : '../match/match' } );
	},
	onShow : function() { // 这个生命后续可以关注下有无bug
		_fn.startRefresh( this );
	},
	onHide : function() {
		_fn.stopRefresh();
	}
} );


_fn = {
	startRefresh : function( caller ) {
		STATUSTIMMER = setInterval( function() {
			_fn.formatStatus( caller );
		}, 1000 );
	},
	stopRefresh : function() {
		if ( STATUSTIMMER ) {
			clearInterval( STATUSTIMMER );
			STATUSTIMMER = null;
		}
	},
	formatStatus : function( caller ) {
		if ( !caller || !caller.data || !caller.data.pageData || !caller.data.pageData.list || !caller.data.pageData.list.length ) {
			return;
		}
		var list = caller.data.pageData.list,
			i, len;
		for ( i = 0, len = list.length; i < len; ++i ) {
			list[i] = _fn.setStatus( list[i] );
		}
		//console.log( caller.data );
	},
	setStatus : function( act ) {
		var now = new Date().getTime(),
			endCount, startCount;

		endCount = utils.countTime( now, act.start_timestamp, now, act.system_timestamp );
		startCount = utils.countTime( now, act.start_timestamp, now, act.system_timestamp );

		console.log( startCount );
		return act;
	}
}