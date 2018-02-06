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
			res.start_timestamp = new Date().getTime() - 20000 * 9;

			res.currentTime = new Date().getTime();
			res = _fn.setStatus( res, res.currentTime );
			caller.setData( {
				pageData : res
			} );
		});
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

		// 设置答题信息
	 	data = _fn.setStatus( caller.data.pageData, caller.data.pageData.currentTime );
	 	// 设置结束倒计时
		caller.setData( {
			'pageData' : data
		} );
		//console.log( caller.data );
	},

	// 设置页面状态
	setStatus : function( act, currentTime ) {
		var now = new Date().getTime(),
			endCount, startCount, startTime,
			remainder, status, index, answerAll;

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
			// 这里如果严谨，可以停止计数
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

		index = Math.floor( Math.abs( startCount ) / 20 )

		// 如果题数答完，则结束
		answerAll = index >= act.paper.questions.length ? true : false;
		act.quesInfo = {
			index : index,
			count : remainder >= 10 ? 20 - remainder : 10 - remainder, // 每个阶段的倒计时
			status :status, // 0为答题阶段，1为时间到,2为答案展示阶段
			answerAll : answerAll,
			endCountInfo : _fn.getEndCount( endCount )
		}
		return act;
	},

	getEndCount : function( time ) {
		var result = {};

		result.hours = Math.floor( time / 60 );
		result.minutes = time % 60;
		result.hours = result.hours < 10 ? '0' + result.hours : result.hours;
		result.minutes = result.minutes < 10 ? '0' + result.minutes : result.minutes;
		return result;
	}
}