define('wuhou/widgets/pop/pop', function (require, exports, module) {
    require( 'wuhou/widgets/pop/pop.tpl' );
    require( 'wuhou/widgets/pop/pop.css' );
    var handle, _fn,
        DEFAULT_OPT,
        kDom = kayak.dom,
        kRouter = kayak.router,
        CB = $( {} ),
        config = require( 'wuhou/config/config' ),
        ajax = require( 'wuhou/common/ajax/ajax' ),
        cookie = require( 'wuhou/common/cookie/cookie' ),
        utils = require( 'wuhou/common/utils/utils' ),
        timmer;

    DEFAULT_OPT = {
        title : '提示',
        msg : '',
        showCancel : false
    }

    handle = {
        className : 'w-w-pop',
        pop : function( callback ) {
            handle.callback = callback;
            var ispop = cookie.get( 'token' );
            if ( !ispop ) {
                handle.show();
                return;
            }
            callback && callback();
        },
        show : function( opt, callback ) {
            var jView,
                dOpt;

            clearTimeout( timmer );
            dOpt = $.extend( {}, DEFAULT_OPT );
            handle.opt = $.extend( dOpt, opt );
            handle.callback = callback;
            _fn.initDOM();
            handle.jView.kInsert();
            handle.jView.removeClass( 'showpop hidepop' ).addClass( 'showpop' );
            jView = this.jView;
            _fn.select( 'Pop' );
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
            jView.on( 'click', '.J_Close', function() {
                handle.hide();
                if ( handle.callback ) {
                    handle.callback( 'close' );
                }
            } );
            jView.on( 'click', '.J_Btn', function( e ) {
                var value = $( e.target ).attr( 'data-value' );
                if ( handle.callback ) {
                    handle.callback( value );
                }
                handle.hide();
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
                if ( handle.callback ) {
                    handle.callback();
                }
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
            jView.find( '.J_Cont' ).html( temp( handle.opt ) );
            _fn.showError( '' );
        }
    }

    return handle;
});
