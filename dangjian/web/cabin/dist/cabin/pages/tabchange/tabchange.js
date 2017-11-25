define('cabin/pages/tabchange/tabchange', function (require, exports, module) {
    var handle, Page, page;
    Page = require('cabin/page/page');
    page = Page({
        nodeClass: 'cabin-page-tabchange',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/tabchange/tabchange.tpl'],
        show: function () {
            handle.jView = this.jView;
            $('.nav-tabs a').click(function (e) {
                //!!!e.preventDefault(); 必须添加这个
                e.preventDefault();
                $(this).tab('show');
            });
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        },
        hide: function () {
        },
        on: {}
    });
    handle = {}
    return page;
});
