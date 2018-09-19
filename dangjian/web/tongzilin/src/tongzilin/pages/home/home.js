define( 'tongzilin/pages/home/home', function( require, exports, module ) {
    require( 'tongzilin/pages/home/home.css' );
    require( 'tongzilin/pages/home/home.tpl' );
    var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
        kayak = require( 'kayak/core/kayak' ),
        header = require( 'tongzilin/widgets/header/header' ),
        login = require( 'tongzilin/widgets/login/login' ),
        pop = require( 'tongzilin/widgets/pop/pop' ),
        sessionStorage = window.sessionStorage,
        config = require( 'tongzilin/config/config' ),
        ajax = require( 'tongzilin/common/ajax/ajax' ),
        utils = require( 'tongzilin/common/utils/utils' ),
        // 其他依赖资源预加载
        kDom = kayak.dom,
        _fn, self,
        router = kayak.router;

    var p = Page( {
        nodeClass: 'w-p-home',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
            var jView = this.jView;
            self = this;
            //jView.removeClass( 'exit' ).addClass( 'in' );
            _fn.getData();
            header.showMain();
        },
        on : {
            'click .J_Bonus' : function() {
                login.login( function() {
                    var userInfo = sessionStorage.getItem( 'userinfo' ) || '{}';
                    userInfo = JSON.parse( userInfo );
                    if ( userInfo.level != 2 ) {
                        pop.show( { msg : '只有党员才能进入' } );
                        return;
                    }
                    // 验证登录态，验证是否是党员
                    kayak.router.go( '#index/tongzilin/bonus' );
                }, true );
            }
        }
    });

    _fn = {
        getData : function() {
            ajax.query( config.url.home, {}, function( res ) {
                if ( utils.isErrorRes( res ) ) {
                    pop.show( { msg : res.msg || '系统错误' } );
                    return;
                }
                _fn.renderHome( res.data );
            } );
        },
        renderHome : function( data ) {
            var temp, jView = self.jView,
                jCont = jView.find( '.J_HomeCont' );

            temp = template.compile( jView.find( '.J_HomeTemp' ).text() );
            jCont.html( temp( data ) );            

            temp = template.compile( jView.find( '.J_IntroTemp' ).text() );
            jView.find( '.J_IntroCont' ).html( temp( data ) );  
        }
    }

    module.exports = p;
} );
