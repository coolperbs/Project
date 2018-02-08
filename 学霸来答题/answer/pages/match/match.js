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
			//res.start_timestamp = new Date().getTime();// - 9000 ;
			//res.end_timestamp = new Date().getTime() - 20000 * 9;
			res.currentTime = new Date().getTime();
			//res.resurrection_count = 1;

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
	},
	closeEndPop : function() {
		this.setData( {
			'pageData.showEnd' : false
		} );
	},
	closeRestartPop : function() {
		this.setData( {
			'pageData.showRestart' : false
		} );
	},
	back : function() {
		wx.navigateBack();
	},
	restart : function() {
		var data = this.data;
		if ( !data.pageData || data.pageData.resurrection_count <= 0 ) {
			this.setData( { 'pageData.showRestart' : false } );
			return;
		}
		this.setData( {
			'pageData.resurrection_count' : data.pageData.resurrection_count - 1,
			'pageData.visitorMode' : false,
			'pageData.showRestart' : false
		} );
		service.questions.useCard(  );
	}
} );


_fn = {
	startRefresh : function( caller ) {
		// 第一次先计算下
		STATUSTIMMER = setInterval( function() {
			_fn.formatStatus( caller );
			_fn.postAnswer( caller );
			_fn.getBonus( caller );
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
	 	_fn.checkAnswer( caller );
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
		// 大于10秒则进入观战模式
		if ( act.currentTime > act.start_timestamp + 10000 && !act.visitorMode ) {
			act.visitorMode = true;
			wx.showModal( {
				title : '提示',
				content : '比赛已经开始，现在为观战模式',
				showCancel : false
			} );
		}
		act.quesInfo = act.quesInfo || {};
		act.quesInfo.index = index,
		act.quesInfo.count = remainder >= 10 ? 20 - remainder : 10 - remainder, // 每个阶段的倒计时
		act.quesInfo.status = status, // 0为答题阶段，1为时间到,2为答案展示阶段
		act.quesInfo.answerAll = answerAll,
		act.quesInfo.endCountInfo = _fn.getEndCount( endCount )
		return act;
	},

	getEndCount : function( time ) {
		var result = {};

		result.hours = Math.floor( time / 60 );
		result.minutes = time % 60;
		result.hours = result.hours < 0 ? 0 : result.hours;
		result.minutes = result.minutes < 0 ? 0 : result.minutes;
		result.hours = result.hours < 10 ? '0' + result.hours : result.hours;
		result.minutes = result.minutes < 10 ? '0' + result.minutes : result.minutes;
		return result;
	},

	postAnswer : function( caller ) {
		var data = caller.data,
			answers;

		// 答题完成或已提交过数据都不处理
		if ( !data || !data.pageData || !data.pageData.quesInfo || !data.pageData.quesInfo.answerAll || data.pageData.quesInfo.hasPost ) {
			return;
		}
		answers = _fn.getAnswers( caller );
		service.questions.postAnswer( {
			answers : answers,
			paper_id : data.pageData.paper.id
		}, function( res ) {
			res = res || {}
			if ( res.code + '' === '0' ) {
				return;
			}
			wx.showModal( {
				title : '提示',
				content : res.message || '提交答卷失败',
				confirmText : '重试',
				success : function( res ) {
					if ( !res.confirm ) {
						return;
					}
					caller.setData( {
						'pageData.quesInfo.hasPost' : false
					} );
					_fn.postAnswer( caller );
				}
			} );
		} );
		caller.setData( {
			'pageData.quesInfo.hasPost' : true
		} );

	},
	getAnswers : function( caller ) {
		if ( !caller.data || !caller.data.pageData ) {
			return [];
		}
		var result = [],
			questions = caller.data.pageData.paper.questions,
			userAnswer = caller.data.userAnswer || {},
			i, len, o;

		for ( i = 0, len = questions.length; i < len; ++i ) {
			o = userAnswer['a' + i];
			if ( !o ) {
				result.push( {
					'option_id' : '',
					'question_id' : questions[i].id,
					'resurrection' : false
				} );
			} else {
				result.push( {
					'option_id' : o.id,
					'question_id' : o['question_id'],
					'resurrection' : ( o.correct ? true : false )
				} );
			}
		}
		return result;
	},
	getBonus : function( caller ) {
		var data = caller.data;

		// 答题完成或已提交过数据都不处理
		if ( !data || !data.pageData || !data.pageData.quesInfo || !data.pageData.quesInfo.answerAll 
			|| data.pageData.quesInfo.hasGetBonus || caller.data.pageData.timeStatus < 3 ) {
			return;
		}

		// 延迟1秒，给后台留有空间
		utils.showLoading( 300 );
		setTimeout( function() {
			service.questions.getBonus( caller.data.pageData.id, function( res ) {
				utils.hideLoading();
				res = res || {}
				if ( !res.user ) {
					wx.showModal( {
						title : '提示',
						content : res.message || '获取奖金信息失败',
						confirmText : '重试',
						success : function( res ) {
							if ( !res.confirm ) {
								return;
							}
							caller.setData( {
								'pageData.quesInfo.hasGetBonus' : false
							} );
							_fn.getBonus( caller );
						}
					} );
					return;
				}
				caller.setData( {
					bonus : res
				} );
			} );
		}, 1000 );
		caller.setData( {
			'pageData.quesInfo.hasGetBonus' : true
		} );		
	},
	checkAnswer : function( caller ) {
		var data = caller.data,
			userAnswer = data.userAnswer || {},
			answer, quesInfo, visitorMode = false,
			showEnd = false, showRestart = false;

		// 非答题结束模式先隐藏复活卡
		if ( data && data.pageData && data.pageData.quesInfo && data.pageData.quesInfo.status != 2 && !!data.pageData.showRestart ) {
			caller.setData( {
				'pageData.showRestart' : false
			} );
		}

		// 数据不对、观战模式、非公布答案阶段不用处理
		if ( !data || !data.pageData || !!data.pageData.visitorMode 
			|| !data.pageData.quesInfo || data.pageData.quesInfo.status != 2 ) {
			return;
		}

		quesInfo = data.pageData.quesInfo;
		answer = userAnswer['a' + quesInfo.index] || {};

		// 正确则什么都不管
		if ( answer.correct ) {
			return;
		}

		// 答错先开启观战模式
		visitorMode = true;
		if ( data.pageData.resurrection_count <= 0 ) {
			showEnd = true;
		}
		if ( data.pageData.resurrection_count > 0) {
			showRestart = true;
		}
		caller.setData( {
			'pageData.visitorMode' : visitorMode,
			'pageData.showEnd' : showEnd,
			'pageData.showRestart' : showRestart
		} );
	}
}















