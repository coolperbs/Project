define('wuhou/widgets/projectpop/projectpop', function (require, exports, module) {
    require( 'wuhou/widgets/projectpop/projectpop.tpl' );
    require( 'wuhou/widgets/projectpop/projectpop.css' );
    var handle, _fn,
        DEFAULT_OPT,
        kDom = kayak.dom,
        kRouter = kayak.router,
        CB = $( {} ),
        config = require( 'wuhou/config/config' ),
        ajax = require( 'wuhou/common/ajax/ajax' ),
        cookie = require( 'wuhou/common/cookie/cookie' ),
        timmer,
        utils = require( 'wuhou/common/utils/utils' );

    DEFAULT_OPT = {
        title : '提示',
        msg : '',
        showCancel : false
    }

    handle = {
        className : 'w-w-ppop',
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
            _fn.render();
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
        render : function() {
            var jView = handle.jView,
                temp;

            temp = template.compile( jView.find( '.J_PopTemp' ).text() );
            jView.find( '.J_Cont' ).html( temp( handle.opt ) );                
        }
    }

    return handle;
});
