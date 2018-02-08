import service from '../../service/service';
import utils from '../../common/utils/utils';

var pageParam, _fn, STATUSTIMMER;

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
			path : path,
		};
	},
	onLoad : function( param ) {
		pageParam = param;
	},
	share : function( e ) {

		wx.showShareMenu( {} );
	},
	comment : function(e ) {
		service.comment.postComment( this.data.pageData.id, e.detail.value.comment, function( res ) {
			if ( res || res.id ) {
				wx.showToast( { title : '评论成功' } );
			}
		} );
		// 清空评论
		this.setData( {
			commentValue : ''
		} );
	},
	onReady : function() {
		var caller = this;
		utils.showLoading( 300 );
		service.questions.getQuestion( pageParam.id, function( res ) {
			var userInfo;

			utils.hideLoading();
			if ( res && res.code ) {
				utils.showError( res.message || '获取信息错误' );
				return;
			}

			// 模拟数据
			//res.start_timestamp = new Date().getTime() - 9000;
			//res.end_timestamp = new Date().getTime() - 20000 * 9;
			res.currentTime = new Date().getTime();
			//res.resurrection_count = 2;

			res = _fn.setStatus( res, res.currentTime );
			// 如果用户审核没通过，使用观战模式
			userInfo = service.user.getStoreInfo();
			// 不在学校或验证没通过都是观战模式
			if ( res['in_schools'] == false || !userInfo || !userInfo.user || userInfo.user['certification_status'] < 2 ) {
				res.visitorMode = true;
				if ( res.currentTime > res.start_timestamp && res.currentTime < ( res.start_timestamp + 20000 * res.paper.questions.length ) ) {
					wx.showToast( { title : '观战模式' } );
				}
			}
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
	onUnload : function() {
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
		var data = this.data, userAnswer;

		if ( !data.pageData || data.pageData.resurrection_count <= 0 ) {
			this.setData( { 'pageData.showRestart' : false } );
			return;
		}

		userAnswer = data.userAnswer || {};
		userAnswer[ 'a' + data.pageData.quesInfo.index ] = userAnswer[ 'a' + data.pageData.quesInfo.index ] || {};
		userAnswer[ 'a' + data.pageData.quesInfo.index ].restart = true;
		this.setData( {
			'pageData.resurrection_count' : data.pageData.resurrection_count - 1,
			'pageData.visitorMode' : false,
			'pageData.showRestart' : false,
			'userAnswer' : userAnswer
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
			_fn.getComment( caller );
			_fn.getOnline( caller );
		}, 1000 );
	},
	stopRefresh : function() {
		console.log( 'f' );
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
		act.quesInfo = act.quesInfo || {};
		act.quesInfo.index = index,
		act.quesInfo.count = remainder >= 10 ? 20 - remainder : 10 - remainder, // 每个阶段的倒计时
		act.quesInfo.status = status, // 0为答题阶段，1为时间到,2为答案展示阶段
		act.quesInfo.answerAll = answerAll,
		act.quesInfo.endCountInfo = _fn.getEndCount( endCount )
		if ( act.currentTime > act.start_timestamp + 10000 && !act.visitorMode && act.currentTime < act.end_timestamp && ( act.timeStatus < 2 || !act.quesInfo.answerAll ) ) {
			act.visitorMode = true;
			wx.showModal( {
				title : '提示',
				content : '比赛已经开始，现在为观战模式',
				showCancel : false
			} );
		}
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

		// 进入时间大于结束时间
		if ( data.pageData.currentTime >= data.pageData.end_timestamp ) {
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
					'option_id' : o.id || '',
					'question_id' : questions[i].id,
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

		if ( data.pageData.currentTime >= data.pageData.end_timestamp ) {
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
		if ( answer.correct || answer.restart ) {
			return;
		}

		// 答错先开启观战模式
		visitorMode = true;
		// 没有复活卡，且当前题没有复活过
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
	},
	getComment : function( caller ) {
		var oComments;
		if ( !caller.data || !caller.data.pageData || !caller.data.pageData.id ) {
			return;
		}
		service.comment.getComment( caller.data.pageData.id, function( res ) {
			res = res || [];
			if ( !res.length ) {
				return;
			}
			res.reverse();
			oComments = caller.data.comments || [];
			// 数据没有变化，则返回
			if ( oComments.length && res.length && oComments[oComments.length - 1].id == res[res.length - 1].id ) {
				return;
			}

			caller.setData( {
				comments : res
			} );
		} );
	},
	getOnline : function( caller ) {
		var caller;
		service.questions.getOnline( caller.data.pageData.id, function( res ) {
			var onlines = 0;
			if ( res && res.onlines ) {
				onlines = res.onlines;
			}
			caller.setData( { 
				onlines : onlines
			} );
		} );
	}
}















