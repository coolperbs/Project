define( 'wuhou/pages/bonus/bonus', function( require, exports, module ) {
	require( 'wuhou/pages/bonus/bonus.css' );
	require( 'wuhou/pages/bonus/bonus.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'wuhou/widgets/header/header' ),
		ajax = require( 'wuhou/common/ajax/ajax' ),
		config = require( 'wuhou/config/config' ),
		pop = require( 'wuhou/widgets/pop/pop' ),
		utils = require( 'wuhou/common/utils/utils' ),
		self,
		flowStatus = 2,
		router = kayak.router,
		searchKey,
		pageIndex = 1,
		hasMore = true,
		isLoading = false,		
		kDom = kayak.dom;

	handle = {
		nodeClass: 'w-p-bonus',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
        	header.showSub( { id : 'bonus', title : '党员积分', search : true } );
        	flowStatus = 2;
        	searchKey = '';
        	isLoading = false;
        	_fn.loadMore( 1 );
        	self = this;
        	_fn.bind();
        	_fn.renderMenu();
        },
        on : {
        	'click .J_Tab' : function( e ) {
        		var jTarget = $( this );
        		self.jView.find( '.J_Tab.current' ).removeClass( 'current' );
        		jTarget.addClass( 'current' );
        		flowStatus = jTarget.attr( 'data-status' );
        		searchKey = '';
        		_fn.loadMore( 1 );
        	}
        }
	}

	_fn = {
		bind : function() {
			if ( self.hasBind ) {
				return
			}
			self.hasBind = true;
			self.jView.find( '.J_ListCont' ).on( 'scroll', function( e ) {
				var jScroll = $( this ),
					scrollHeight = jScroll.scrollTop() + jScroll[0].offsetHeight,
					height = jScroll[0].scrollHeight;

				if ( scrollHeight + 100 >= height ) {
					_fn.loadMore( pageIndex + 1 );
				}        		
			} );
						// 搜索
			header.on( 'search', function( e, data ){
				if ( !data.id || data.id != 'bonus' ) {
					return;
				}
				searchKey = $.trim( data.key );
				_fn.loadMore( 1 );
			} );
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
			ajax.query( config.url.projectSearch, { querySelfFlow : 1, flowStatus : flowStatus, currentPage : index, name : searchKey }, function( res ) {
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

		renderMenu : function() {
			var jView = self.jView;

        	temp = template.compile( jView.find( '.J_MenuTemp' ).text() );
        	jView.find( '.J_Menu' ).html( temp( { userInfo : JSON.parse( sessionStorage.getItem( 'userinfo' ) ) || {} } ) );	
		},

		render : function() {
			var jView = self.jView;

        	temp = template.compile( jView.find( '.J_ListTemp' ).text() );
        	jView.find( '.J_ListCont' ).html( temp( { projects : allList, userInfo : JSON.parse( sessionStorage.getItem( 'userinfo' ) ) || {} } ) );				
		}
	}

	module.exports = Page( handle );
} );
