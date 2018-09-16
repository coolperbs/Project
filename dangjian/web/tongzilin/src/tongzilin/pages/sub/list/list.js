define( 'tongzilin/pages/sub/list/list', function( require, exports, module ) {
	require( 'tongzilin/pages/sub/list/list.tpl' );
	require( 'tongzilin/pages/sub/list/list.css' );

	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		ajax = require( 'tongzilin/common/ajax/ajax' ),
		config = require( 'tongzilin/config/config' ),
		pop = require( 'tongzilin/widgets/pop/pop' ),
		utils = require( 'tongzilin/common/utils/utils' ),
		pPop = require( 'tongzilin/widgets/projectpop/projectpop' ),
		login = require( 'tongzilin/widgets/login/login' ),
		header = require( 'tongzilin/widgets/header/header' ),
		comment = require( 'tongzilin/widgets/comment/comment' ),
		sessionStorage = window.sessionStorage || {},
		allList = [],
		_fn,
		searchKey = '',
		kDom = kayak.dom,
		pageIndex = 1,
		hasMore = true,
		isLoading = false,
		kRouter = kayak.router;

	handle = {
		nodeClass: 'w-p-sub-list',
        show : function( jParent ) {
        	searchKey = '';
        	this.jParent = jParent;
        	header.showSub( { id : 'list', title : '双找双报到', search : true } );
        	_fn.initDOM();
        	handle.jView.kInsert();
        	_fn.loadMore( 1 );
        	//_fn.render();
        	///pPop.show( { id : 100010 } );
        	//kRouter.requestParam.id ? _fn.showDetail() : _fn.showList();
        },
        hide : function() {
        	if ( !handle.jView ) {
        		return;
        	}
        	isLoading = false;
        	handle.jView.kRemove();
        }
	}


	_fn = {
		initDOM : function() {
			if ( handle.jView ) {
				return;
			}
			handle.jView = kDom.get( handle.nodeClass, handle.jParent );
			_fn.bind();
			return;
		},

		bind : function() {
			// 查看详情
			handle.jView.on( 'click', '.J_Project', function( e ) {
				var jTarget = $( this ),
					data = _fn.getData( jTarget.attr( 'data-id' ) );
				pPop.show( data );
			} );

			// 认领项目
			handle.jView.on( 'click', '.J_Get', function( e ) {
				var jTarget = $( this );
				e.stopPropagation();
				login.login( function() {
					_fn.getProject( jTarget.attr( 'data-id' ) );
				} );
			} );

			// 完结项目
			handle.jView.on( 'click', '.J_Finish', function( e ) {
				var jTarget = $( this );
				e.stopPropagation();
				login.login( function() {
					_fn.finishProject( jTarget.attr( 'data-id' ) );
				} );
			} );			

			// 评论
			handle.jView.on( 'click', '.J_Comment', function( e ) {
				var jTarget = $( e.target );
				e.stopPropagation();
				login.login( function() {
					comment.show( { title : '备注' }, function( comment ) {
						comment = $.trim( comment );
						if ( !comment ) {
							return;
						}
						_fn.comment( jTarget.attr( 'data-id' ), comment );
					} );
				} );
			} );

			// 滚动加载更多
			handle.jView.find( '.J_ListCont' ).on( 'scroll', function( e ) {
				var jScroll = $( this ),
					scrollHeight = jScroll.scrollTop() + jScroll[0].offsetHeight,
					height = jScroll[0].scrollHeight;

				if ( scrollHeight + 100 >= height ) {
					_fn.loadMore( pageIndex + 1 );
				}
			} );

			// 搜索
			header.on( 'search', function( e, data ){
				if ( !data.id || data.id != 'list' ) {
					return;
				}
				searchKey = $.trim( data.key );
				_fn.loadMore( 1 );
			} );			
		},

		comment : function( id, comment ) {
			if ( !id || !comment ) {
				return;
			}
			ajax.query( config.url.projectNote, { projectId : id, note : comment }, function( res ) {
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				pop.show( { msg : '备注成功' }, function() {
					_fn.refreshData( res.data );
				} );
			} );
		},

		finishProject : function( id ) {
			if ( !id ) {
				return;
			}
			ajax.query( config.url.projectFinish, { projectId : id }, function( res ) {
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				pop.show( { msg : '操作成功' }, function() {
					_fn.refreshData( res.data );
				} );
			} );
		},

		getProject : function( id ) {
			if ( !id ) {
				return;
			}
			ajax.query( config.url.projectClaim, { projectId : id }, function( res ) {
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				pop.show( { msg : '认领成功' }, function() {
					_fn.refreshData( res.data );
				} );
			} );
		},

		getData : function( id ) {
			var i, p;
			for ( i = 0; p = allList[i]; ++i ) {
				if ( p.projectId == id ) {
					return allList[i];
				}
			}
			return null;
		},

		refreshData : function( data ) {
			var i, p, changed = false;
			for ( i = 0; p = allList[i]; ++i ) {
				if ( data.projectId == p.projectId ) {
					allList[i] = data;
					changed = true;
				}
			}
			if ( changed ) {
				_fn.render();
			}
		},

		loadMore : function( index ) {
			var jView = handle.jView;
			if ( index == 1 ) {
				pageIndex = 1;
				hasMore = true;
			}
			if ( isLoading || !hasMore ) {
				return;
			}
			isLoading = true;
			ajax.query( config.url.projectSearch, { currentPage : index, name : searchKey }, function( res ) {
				isLoading = false;
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				if ( index == 1 ) {
					allList = [];
					//jView.find( '.J_ListCont' ).html( '' );
				}
				pageIndex = res.data.currentPage;
				hasMore = res.data.hasMore;
				if ( res.data && res.data.projects && res.data.projects.length ) {
					allList = allList.concat( res.data.projects );
				}
				_fn.render( res )
			} );
		},

		render : function() {
			var jView = handle.jView;

        	temp = template.compile( jView.find( '.J_ListTemp' ).text() );
        	jView.find( '.J_ListCont' ).html( temp( { projects : allList, userInfo : JSON.parse( sessionStorage.getItem( 'userinfo' ) ) || {} } ) );				
		}
	}
	module.exports = handle;
} );
