define('tongzilin/widgets/header/header', function (require, exports, module) {
    require( 'tongzilin/widgets/header/header.tpl' );
    require( 'tongzilin/widgets/header/header.css' );
    var handle, _fn,
        DEFAULT_OPT,
        kDom = kayak.dom,
        kRouter = kayak.router,
        CB = $( {} ),
        self,
        cookie = require( 'tongzilin/common/cookie/cookie' ),
        login = require( 'tongzilin/widgets/login/login' ),
        pop = require( 'tongzilin/widgets/pop/pop' ),
        ajax = require( 'tongzilin/common/ajax/ajax' ),
        config = require( 'tongzilin/config/config' ),
        EVENTS = ['serach', 'changeSort'];

    DEFAULT_OPT = {
        id : -1,    // 判断是哪个页面过来的
        title : '',
        sorts : [],
        search : false
    }

    handle = {
        className : 'w-w-header',
        init : function() {
            self = this;
            _fn.initDOM();
            self.jMain = self.jView.find( '.J_HMain' );
            self.jSub = self.jView.find( '.J_HSub' );
            //handle.showMain();
        },
        on : function( event, callback ) {
            if ( !EVENTS.indexOf( event ) ) {
                return;
            }
            CB.on( event, callback );
        },
        showMain :function() {
            _fn.renderMain();
            self.jMain.addClass( 'show' );
            self.jSub.removeClass( 'show' );
        },
        showSub : function( opt ) {
            opt = opt || {}
            var dopt= $.extend( {}, DEFAULT_OPT );
            self.opt = $.extend( dopt, opt );
            _fn.renderSub( this );
            self.jMain.removeClass( 'show' );
            self.jSub.addClass( 'show' );
        }
    }

    _fn = {
        initDOM : function(  ) {
            if ( self.jView ) {
                return;
            }
            self.jView = kDom.get( handle.className, $( '.J_Header' ) );
            self.jView.kInsert();
            _fn.bind(  );
        },
        bind : function( ) {
            var jView = self.jView;
            // 返回
            jView.on( 'click', '.J_Back', function() {
                kRouter.go( -1 );
            } );

            // 触发搜索
            jView.on( 'click', '.J_Search', function() {
                CB.trigger( 'search', { key : jView.find( '.J_SearchValue' ).val(), id : self.opt.id } );
            } );

            // 切换tab
            jView.on( 'click', '.J_Tab', function( e ) {
                var jTarget = $( e.target );
                jView.find( '.J_Tab' ).removeClass( 'current' );
                $( e.target ).addClass( 'current' );
                CB.trigger( 'changeSort', { value : jTarget.attr( 'data-value' ), id : self.opt.id } );
            } );

            jView.on( 'click', '.J_Login', function() {
                login.login( function() {
                    _fn.renderMain();
                } );
            } );

            jView.on( 'click', '.J_Logout', function() {
                login.logout( function( success ) {
                    if ( !success ) {
                        return;
                    }
                    pop.show( { msg : '退出成功' }, function() {
                        _fn.renderMain( );
                    } );
                } );
            } );
        },
        renderMain : function(  ) {
            var jView = self.jView,
                temp;

            ajax.query( config.url.header, {}, function( res ) {
                temp = template.compile( jView.find( '.J_HMainTemp' ).text() );
                jView.find( '.J_HMain' ).html( temp( { info : res.data, token : cookie.get( 'token' ) } ) );
            } );
        },
        renderSub : function( ) {
            var jView = self.jView,
                temp;

            temp = template.compile( jView.find( '.J_HeaderTemp' ).text() );
            jView.find( '.J_HSub' ).html( temp( self.opt ) );
        }
    }

    return handle;
});
