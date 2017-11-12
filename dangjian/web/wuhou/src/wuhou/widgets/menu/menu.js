define('wuhou/widgets/menu/menu', function (require, exports, module) {
    var handle, _fn, Page, page;
    page = Page({
        nodeClass: 'cabin-page-menu',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show: function () {
            console.log( '构建菜单' );
        },
        hide: function () {}
    });
    handle = {};
    _fn = {};
    return page;
});
