<div class="cabin-page-menu content-container"><div class="container-scroll"><div id="myMenu" style="background:#333;width:180px"></div><pre>
        <code>
            &lt;!--1级菜单图标样式-->
             .cabin-widgets-menu .menu-icon-你想要的名字 {background-image: url(cabin/src/cabin/common/img/input-success.png);}

            &lt;!--使用方式-->
            &lt;div id="myMenu">
                &lt;!--容器 id必填项 -->
            &lt;/div>
            &lt;!--js 引用-->
            var CabinMenu=require('cabin/widgets/menu/menu');
            &lt;!--全局调用 -->
            CabinMenu(id,option);
            &lt;!--支持JQ 链式调用-->
            handle.jView.find('#myMenu').CabinMenu({
            &lt;!--路由配置 数组 节点配置icon 不配置router-->
                menu:[
                    {
                        name:'菜单1',
                        icon:'menu-icon-date',
                        children:[
                            {
                                name:'菜单1-1',
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
                        router:'菜单3的路由',
                        icon:'menu-icon-date'
                    }
                ]
            })

        </code>
    </pre></div></div>