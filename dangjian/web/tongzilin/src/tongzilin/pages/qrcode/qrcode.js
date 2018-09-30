define( 'tongzilin/pages/qrcode/qrcode', function( require, exports, module ) {
    require( 'tongzilin/pages/qrcode/qrcode.css' );
    require( 'tongzilin/pages/qrcode/qrcode.tpl' );
    var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
        kayak = require( 'kayak/core/kayak' ),
        header = require( 'tongzilin/widgets/header/header' );

    handle = {
        nodeClass: 'w-p-qrcode',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
            var url = kayak.router.requestParam.url,
                jView = this.jView;
            header.showSub( { title : '信息平台', en : 'Information platform' } );
            if ( url ) {
                jView.find( '.J_Iframe' ).attr( 'src', decodeURIComponent( url ) );
                jView.find( '.J_IframeCont' ).show();
                jView.find( '.J_Links' ).hide();
            } else {
                jView.find( '.J_IframeCont' ).hide();
                jView.find( '.J_Links' ).show();
            }
        },
        hide : function() {
            
        },
        on : {
            'click .J_Link' : function( e ) {
                var jTarget = $( this );
                kayak.router.go( '#index/tongzilin/links:url=' + encodeURIComponent( jTarget.attr( 'data-url' ) ) );
            }
        }
    }
    // 其他依赖资源预加载
    kDom = kayak.dom;
    router = kayak.router;

    module.exports = Page( handle );
} );
