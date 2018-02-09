import service from '../../service/service';
import utils from '../../common/utils/utils';
var _fn, STATUSTIMMER;


Page( {
	onShareAppMessage : function() {
        var userId,
            userInfo = service.user.getStoreInfo(),
            path;

        userId = userInfo || {};
        userId = userId.user || {};
        userId = userId.id;
        path = userId ? 'pages/getCard/getCard?userId=' + userId : 'pages/index/index'
        return {
            title: '快来参加大学生专属的有奖答题，瓜分奖学金，送你复活卡，快来领。',
            path: path,
            imageUrl:'../../images/share_bg.png'
        };
	},
	onReady : function() {
		var caller = this;
		utils.showLoading( 300 );
		service.questions.getList( function( list ) {
			utils.hideLoading();
			if ( list && list.code ) {
				wx.showModal( {
					title : '提示',
					content : list.message || '获取信息错误',
					showCancel : false,
					complete : function() {
						wx.reLaunch( { url : '../entry/entry' } );
					}
				} );
				return;
			}

			// 模拟假数据
			/*list[1] = {
				bonus:"3",
				description:"*仅限清华北大认证通过同学参加,其它高校同学可以围观奥!",
				end_timestamp : ( new Date().getTime() + 120000 ), // 120秒后结束，换算过来就是110秒后结束
				ended:false,
				id:"6b40aaf2-4fe7-4d0a-82ea-2a7109763d92",
				name:"2清华北大专场(共15题)",
				start_timestamp: ( new Date().getTime() + 62000 ), // 10秒后开始，换算过来就是8秒后开始
				started:true,
				system_timestamp: ( new Date().getTime() - 2000 ),  // 当前时间快2秒
				title:"第1期"
			};
			list[2] = {
				bonus:"3",
				description:"*仅限清华北大认证通过同学参加,其它高校同学可以围观奥!",
				end_timestamp : ( new Date().getTime() + 12000000 ), // 120秒后结束，换算过来就是110秒后结束
				ended:false,
				id:"6b40aaf2-4fe7-4d0a-82ea-2a7109763d92",
				name:"2清华北大专场(共15题)",
				start_timestamp: ( new Date().getTime() + 1000000 ), // 10秒后开始，换算过来就是8秒后开始
				started:true,
				system_timestamp: ( new Date().getTime() - 2000 ),  // 当前时间快2秒
				title:"第1期"
			}; */
			// 设置一个获取数据的时间		
			caller.setData( { 
				//'pageData.list' : list,
				'currentTime' : new Date().getTime()
			} );
			// 立即计算一次
			_fn.formatStatus( caller, list );
		} );
	},
	goMatch : function( e ) {
		var id = e.currentTarget.dataset.id
		wx.navigateTo( { url : '../match/match?id=' + id } );
	},
	goMine : function() {
		wx.navigateTo( { url : '../mine/mine' } );
	},
	onShow : function() { // 这个生命后续可以关注下有无bug
		_fn.startRefresh( this );
	},
	onHide : function() {
		_fn.stopRefresh();
	},
	goRule : function() {
		wx.navigateTo( { url : '../pageRule/pageRule' } );
	}
} );


_fn = {
	startRefresh : function( caller ) {
		// 第一次先计算下
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
	formatStatus : function( caller, l ) {
		if ( !l && ( !caller || !caller.data || !caller.data.pageData || !caller.data.pageData.list || !caller.data.pageData.list.length ) ) {
			return;
		}
		var list = l || caller.data.pageData.list,
			i, len;
		for ( i = 0, len = list.length; i < len; ++i ) {
			list[i] = _fn.setStatus( list[i], caller.data.currentTime );
		}
		caller.setData( {
			'pageData.list' : list
		} );
		//console.log( caller.data );
	},
	setStatus : function( act, currentTime ) {
		var now = new Date().getTime(),
			endCount, startCount, startTime;

		startCount = utils.countTime( now, act.start_timestamp, currentTime, act.system_timestamp );
		endCount = utils.countTime( now, act.end_timestamp, currentTime, act.system_timestamp );

		// 未开始
		if ( startCount > 60 && endCount > 0 ) {
			act.timeStatus = 0;
		// 未开始，读秒
		} else if ( startCount > 0 && startCount < 60 && endCount > 0 ) {
			act.timeStatus = 1;
		// 已开始
		} else if ( startCount <= 0 && endCount > 0 ) {
			act.timeStatus = 2;
		// 已结束
		} else if ( startCount < 0 && endCount < 0 ) {
			act.timeStatus = 3;
		} else {
			act.timeStatus = 0; // 其余都作为未开始计算
		}
		act.startCount = startCount;

		startTime = utils.timeToDateObj( act.start_timestamp );
		act.actStartTime = ( startTime.hours < 10 ? '0' + startTime.hours : startTime.hours ) 
			+ ':' + ( startTime.minutes < 10 ? '0' + startTime.minutes : startTime.minutes ) ;
		return act;
	}
}