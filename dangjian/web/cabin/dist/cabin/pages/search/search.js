define('cabin/pages/search/search', function (require, exports, module) {
    var handle, _fn, Page, page;
    Page = require('cabin/page/page');
    page = Page({
        nodeClass: 'cabin-page-search',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/search/search.tpl'],
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
            $('#page').NextPage({
                pageSize: 30,
                currentPage: 1,
                totalCount: 1000,
                position:'left',
                select: [30, 60, 100],
                callback: function (data) {}
            });
        },
        hide: function () {},
        on: {
            'click .show':function () {
                handle.jView.find('#myModal').modal('show');
            }

        }
    });
    handle = {}
    _fn = {}

    require('cabin/widgets/nextpage/nextpage');
    return page;
});
