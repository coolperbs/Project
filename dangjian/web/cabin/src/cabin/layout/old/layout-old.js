(function () {
    var handle, _fn, kDom,
        LAYOUT = {
            'full': '.cabinfull',
            'index': '.cabinindex'
        },
        CFG = {
            cabin_HTML_CLS: 'cabin'
        };

    kayak.router.on( 'parseMain', function( pathObj ) {
        console.log( 'ffff' );
        console.log( pathObj );
    } );

    handle = {
        initView: false,
        jView: null,
        load: function (opt, callback) {
            if (handle.initView) {
                _fn.reset();
            }
            _fn.init(opt, callback);
        },
        unload:function () {
            _fn.reset();
        }
    };
    _fn = {
        init: function (opt, callback) {
            if (!LAYOUT[opt]) {
                console.warn('cabin layout' + opt + 'do not exist!');
                return false
            }
            if (typeof callback != 'function') {
                console.warn('cabin layout callback is not a function');
            }
            if (handle.initView) {
                return;
            }
            //dom 更新
            $('html').addClass(CFG.cabin_HTML_CLS);
            handle.jView = kDom.get(LAYOUT[opt], kayak.jBody);
            handle.initView = true;
            handle.jView.kInsert();
            //回调
            callback();
        },
        reset: function () {
            handle.initView = false;
            $('html').removeClass(CFG.cabin_HTML_CLS);
            handle.jView.kRemove();
        }
    };
    define('cabin/layout/layout', function (require, exports, module) {
        require('cabin/theme/cabin.css');

        //单个全屏
        require('cabin/layout/full/full.tpl');
        //功能页
        require('cabin/layout/index/index.tpl');

        //kayak
        kDom = kayak.dom;
        module.exports = handle;
    });
})();