define('cabin/pages/nextPage/nextPage', function (require, exports, module) {
    var handle, _fn, Page, page;
    Page = require('cabin/page/page');
    page = Page({
        nodeClass: 'cabin-page-nextPage',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/nextPage/nextPage.tpl'],
        show: function () {
            handle.jView = this.jView;
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
            $('#mypage').NextPage({
                pageSize: 30, //每页大小,
                currentPage: 1, //当前页
                totalCount: 200, //总条数
                pageRange: 9, //间隔多少个
                select: [30, 60, 100], //下拉选项
                showTotal:true,//显示同条数 boolean
                position: null, //位置 left right center
                callback: function (data) {}
            });
        },
        hide: function () {},
        on: {

        }
    });
    handle = {}
    _fn = {}

    require('cabin/widgets/nextpage/nextpage');
    return page;
});
