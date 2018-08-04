define('jifu/widgets/menu/menu', function (require, exports, module) {
    require( 'jifu/widgets/menu/menu.tpl' );
    require( 'jifu/widgets/menu/menu.css' );
    var handle, _fn,
        kDom = kayak.dom,
        kRouter = kayak.router,
        self;

    DEFAULT_OPT = {
        id : -1,    // 判断是哪个页面过来的
        title : '',
        sorts : [],
        search : false
    }

    handle = {
        className : 'w-w-menu',
        init : function() {
            self = this;
            _fn.initDOM();
            self.jView.kInsert();
            //self.jView.appendTo( '.menu' );
        }
    }

    _fn = {
        initDOM : function(  ) {
            if ( self.jView ) {
                return;
            }
            self.jView = kDom.get( handle.className, $( '.J_Sub' ) );
        }
    }

    return handle;
});
