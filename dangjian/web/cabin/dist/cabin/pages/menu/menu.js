define('cabin/pages/menu/menu', function (require, exports, module) {
    var handle, _fn, Page, page;
    Page = require('cabin/page/page');
    require('cabin/widgets/menu/menu');
    page = Page({
        nodeClass: 'cabin-page-menu',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show: function () {
            handle.jView = this.jView;
            handle.jView.find('#myMenu').CabinMenu({
                menu:[
                    {
                        name:'菜单1',
                        router:'菜单1的路由',
                        icon:'menu-icon-date',
                        children:[
                            {
                                name:'菜单1-1',
                                router:'菜单1-1的路由',
                                children:[
                                    {
                                        name:'菜单1-1-1',
                                        router:'#index/cabin/menu'
                                    },
                                    {
                                        name:'菜单1-1-2',
                                        children:[
                                            {
                                                name:'菜单1-1-1',
                                                router:'菜单1-1-1的路由'
                                            },
                                            {
                                                name:'菜单1-1-2',
                                                router:'#index/cabin/menu:iframeUrl=\'http://www.baidu.m\''
                                            },
                                            {
                                                name:'菜单1-1-3',
                                                router:'#index/cabin/menu:iframeUrl=\'http://www.baidu.com\''
                                            }
                                        ]
                                    },
                                    {
                                        name:'菜单1-1-3',
                                        router:'菜单1-1-3的路由'
                                    }
                                ]
                            },
                            {
                                name:'菜单1-2',
                                router:'菜单1-2的路由'
                            },
                            {
                                name:'菜单1-2',
                                router:'菜单1-2的路由'
                            }
                        ]
                    },
                    {
                        name:'菜单2',
                        router:'菜单2的路由',
                        icon:'menu-icon-date'
                    },
                    {
                        name:'菜单3',
                        router:'#index/cabin/menu:iframeUrl=\'http://www.baidu.m22\'',
                        icon:'menu-icon-date'
                    }
                ]
            });
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        },
        hide: function () {}
    });
    handle = {};
    _fn = {};
    return page;
});
