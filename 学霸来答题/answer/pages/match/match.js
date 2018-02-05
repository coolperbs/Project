import service from '../../service/service';
import utils from '../../common/utils/utils';

var pageParam, _fn, STATUSTIMMER;

Page( {
	onLoad : function( param ) {
		pageParam = param;
	},
	onReady : function() {
		var caller = this;
		utils.showLoading( 300 );
		service.questions.getQuestion( pageParam.id, function( res ) {
			utils.hideLoading();
			if ( res && res.code ) {
				utils.showError( res.message || '获取信息错误' );
				return;
			}

			// 模拟数据
			res.start_timestamp = new Date().getTime() - 1000;

			res.currentTime = new Date().getTime();
			res = _fn.setStatus( res, res.currentTime );
			caller.setData( {
				pageData : res
			} );
		} );
	},
	selectAnswer : function( e ) {
		var data = e.currentTarget.dataset,
			userAnswer = this.data.userAnswer || {};

		// 第几题
		userAnswer['a' + data.quesindex] = this.data.pageData.paper.questions[data.quesindex].options[data.optionindex]
		this.setData( {
			userAnswer : userAnswer
		} );
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
	formatStatus : function( caller ) {
		var data;
		if ( !caller || !caller.data || !caller.data.pageData ) {
			return;
		}

	 	data = _fn.setStatus( caller.data.pageData, caller.data.pageData.currentTime );
		caller.setData( {
			'pageData' : data
		} );
		//console.log( caller.data );
	},
	setStatus : function( act, currentTime ) {
		var now = new Date().getTime(),
			endCount, startCount, startTime,
			remainder, status;

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


		remainder = Math.abs( startCount ) % 20;
		if ( remainder < 10 ) {
			status = 0;
		} else if ( remainder == 10 ) {
			status = 1;
		} else if ( remainder > 10 ) {
			status = 2;
		}
		act.quesInfo = {
			index : Math.floor( Math.abs( startCount ) / 20 ),
			count : remainder >= 10 ? 20 - remainder : 10 - remainder, // 每个阶段的倒计时
			status :status // 0为答题阶段，1为时间到,2为答案展示阶段
		}
		return act;
	}
}