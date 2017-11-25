define('wuhou/widgets/login/login', function (require, exports, module) {
    require( 'wuhou/widgets/login/login.tpl' );
    require( 'wuhou/widgets/login/login.css' );
    var handle, _fn,
        DEFAULT_OPT,
        kDom = kayak.dom,
        kRouter = kayak.router,
        config = require( 'wuhou/config/config' ),
        ajax = require( 'wuhou/common/ajax/ajax' ),
        cookie = require( 'wuhou/common/cookie/cookie' ),
        utils = require( 'wuhou/common/utils/utils' ),
        timmer,
        sessionStorage = window.sessionStorage || {},
        HIDEPOP = false,
        pop = require( 'wuhou/widgets/pop/pop' );

    DEFAULT_OPT = {
        id : -1,    // 判断是哪个页面过来的
        title : '',
        sorts : [],
        search : false
    }

    handle = {
        className : 'w-w-login',
        login : function( callback, hidePop ) {
            //handle.callback = callback || null;
            var isLogin = cookie.get( 'token' );
            if ( !isLogin ) {
                handle.show( callback, hidePop );
                return;
            }
            callback && callback();
        },
        logout : function( callback ) {
            cookie.del( 'token' );
            sessionStorage.removeItem( 'userinfo' ); 
            callback && callback( true );
            //sessionStorage.getItem("key");
            //setItem( 'key', 'value' );
        },
        show : function( callback, hidePop ) {
            var jView; 
            HIDEPOP = hidePop || false;
            clearTimeout( timmer );
            handle.callback = callback || null;
            _fn.initDOM();
            handle.jView.kInsert();
            handle.jView.removeClass( 'showpop hidepop' ).addClass( 'showpop' );
            jView = this.jView;
            _fn.select( 'Login' );
        },
        hide : function() {
            var jView = handle.jView;

            if ( !jView ) {
                return;
            }
            handle.jView.removeClass( 'showpop hidepop' ).addClass( 'hidepop' );
            timmer = setTimeout( function() {
                jView.kRemove();
            }, 390 );
        }
    }

    _fn = {
        initDOM : function() {
            if ( handle.jView ) {
                return;
            }
            handle.jView = kDom.get( handle.className, kayak.jBody );
            _fn.bind();
        },
        bind : function() {
            var jView = handle.jView;
            jView.on( 'click', '.J_Tab', function( e ) {
                var jTarget = $( e.target );
                _fn.select( jTarget.attr( 'data-type' ) );
            } );
            jView.on( 'click', '.J_Close', function() {
                handle.hide();
            } );
            jView.on( 'click', '.J_Login', _fn.login );
            jView.on( 'click', '.J_Register', _fn.register );
        },
        login : function() {
            var jView = handle.jView,
                jForm = jView.find( '.J_LoginForm' ),
                data;

            data = utils.formToData( jForm );
            _fn.showError( '' );
            ajax.query( config.url.login, data, function( res ) {
                if ( utils.isErrorRes( res, true ) ) {
                    _fn.showError( res.msg );
                    return;
                }
                if ( res && res.data && res.data.token && res.data.user ) {
                   cookie.add( 'token', res.data.token, 1 );   // 登录态保存1天
                   sessionStorage.setItem( 'userinfo', JSON.stringify( res.data.user ) );
                }
                handle.hide();
                if ( HIDEPOP ) {
                    handle.callback();
                    return;
                }

                pop.show( { msg : '登录成功！' }, function() {
                    if ( handle.callback ) {
                        handle.callback();
                    }
                } );
            } );
        },
        showError : function( msg ) {
            var jView = handle.jView;

            msg = $.trim( msg + '' );
            if ( !msg ) {
                jView.find( '.J_Error' ).hide();
                return;
            }
            jView.find( '.J_Error' ).show().find( '.value' ).html( msg );
        },
        register : function() {
            var jView = handle.jView,
                jForm = jView.find( '.J_RegisterForm' ),
                data;

            data = utils.formToData( jForm );
            _fn.showError( '' );
            ajax.query( config.url.register, data, function( res ) {
                if ( utils.isErrorRes( res, true ) ) {
                    _fn.showError( res.msg );
                    return;
                }
                if ( res && res.data && res.data.token ) {
                    cookie.add( 'token', res.data.token, 1 );   // 登录态保存1天
                }
                handle.hide();
                if ( hidePop ) {
                    handle.callback();
                    return;
                }
                pop.show( { msg : '注册成功！' }, function() {
                    if ( handle.callback ) {
                        handle.callback();
                    }
                } );
            } );
        },
        select : function( type ) {
            var jView = handle.jView,
                temp;

            jView.find( '.tab' ).each( function( index, node ) {
                var jNode = $( node );
                jNode.attr( 'data-type' ) == type ? jNode.addClass( 'current' ) : jNode.removeClass( 'current' );
            } );

            temp = template.compile( jView.find( '.J_' + type + 'Temp' ).text() );
            jView.find( '.J_Cont' ).html( temp() );
            _fn.showError( '' );
        }
    }

    return handle;
});
