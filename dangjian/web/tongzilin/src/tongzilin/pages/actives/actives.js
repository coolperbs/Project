define( 'tongzilin/pages/actives/actives', function( require, exports, module ) {
    require( 'tongzilin/pages/actives/actives.css' );
    require( 'tongzilin/pages/actives/actives.tpl' );
    var handle, CFG, _fn, kayak, DOM_EVENT, userServices,
        kayak = require( 'kayak/core/kayak' ),
        pop = require( 'tongzilin/widgets/pop/pop' ),
        config = require( 'tongzilin/config/config' ),
        utils = require( 'tongzilin/common/utils/utils' ),
        ajax = require( 'tongzilin/common/ajax/ajax' ),
        comment = require( 'tongzilin/widgets/comment/comment' ),
        login = require( 'tongzilin/widgets/login/login' ),
        //HP = require( 'tongzilin/pages/actives/headerparam' ),
        kRouter = kayak.router,
        isLoading = false,
        header = require( 'tongzilin/widgets/header/header' ), searchKey = '',
        pageType, subType = 1, self, hasMore = true, pageIndex = 1,
        commentObj = { list : [], total : 0 }, commentIsLoading = false,
        commentIndex = 0, commentHasmore = true, newsId = 0;

    handle = {
        nodeClass: 'w-p-actives',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
            self = this;
            _fn.init( this );
            pageType = kRouter.requestParam.type;
            self.jView.find( '.J_List' ).html( '' );
            self.jView.find( '.J_NewsCont' ).html( '' );
            pageType = pageType || 1;   // 1三会一课，2党员学习平台
            //headParam = HP[ pageType ];
            searchKey = '';
            //header.showSub( headParam );
            header.showSub( { title : '活动展示', en : 'Activities' } );
            isLoading = false;
            _fn.clear();
            commentIndex = 0;
            newsId = 0;
            subType = 1; 
            hasMore = true;
            pageIndex = 1;
            commentObj = { list : [], total : 0 };
            commentIsLoading = false;
            commentIndex = 0;
            commentHasmore = true;
            newsId = 0;            
            commentIsLoading = false;
            _fn.loadMore( 1 );
        },
        hide : function() {
        }
    }

    _fn = {
        bind : function( caller ) {
            var jView = self.jView;

            jView.on( 'click', function() {

            } );
        },
        clear : function() {
            hasMore = true;
            pageIndex = 1;
        },
        comment : function( id, text ) {
            var param = {};
            param.newsId = id;
            param.content = text;
            ajax.query( config.url.commentAdd, param, function( res ) {
                if ( utils.isErrorRes( res ) ) {
                    pop.show( { msg : res.msg || '系统错误' } );
                    return;
                }
                pop.show( { msg : '评论成功' } );
                // 刷新评论 直接hasmore为true？
            } );
        },
        init : function( caller ) {
            if ( caller.handBind ) {
                return;
            }
            _fn.bind( caller );
            caller.handBind = true;
        },
        loadComment : function( index, id ) {
            if ( index = 1 ) {
                commentHasmore = true;
                commentObj = { list : [], total : 0 };
            }
            if ( !commentHasmore || commentIsLoading ) {
                return;
            }
            commentIsLoading = true;
            ajax.query( config.url.commentList, { currentPage : index, name : '', newsId : id }, function( res ) {
                commentIsLoading = false;
                var temp, jView = self.jView;

                if ( utils.isErrorRes( res ) ) {
                    pop.show( { msg : res.msg || '系统错误' } );
                    return;
                }
                commentObj.list = commentObj.list || [];
                if ( res.data && res.data.comments && res.data.comments.length ) {
                    commentObj.list = commentObj.list.concat( res.data.comments );
                }
                commentObj.total = res.data.totalCount;
                commentIndex = res.data.currentPage;
                commentHasmore = res.data.hasMore;
                commentObj.pageType = pageType;

                temp = template.compile( jView.find( '.J_CommentTemp' ).text() );
                jView.find( '.J_CommentCont' ).html( temp( commentObj ) );              
            } );
        },
        loadMore : function( page ) {
            if ( page == 1 ) {
                _fn.clear();
            }
            if ( !page || !hasMore || isLoading ) {  //加载更多，但没有数据就不加载了
                return;
            }
            page = page || pageIndex + 1;
            var url,
                param = {};

            param.type = pageType;
            if ( pageType == 2 ) {
                param.subType = subType;
            } else if ( pageType == 3 ) {
                param.subType = subType;
            }
            param.currentPage = page;
            param.title = searchKey;
            isLoading = true;
            ajax.query( config.url.newsList, param, function( res ) {
                isLoading = false;
                if ( utils.isErrorRes( res ) ) {
                    pop.show( { msg : res.msg || '系统错误' } );
                    return;
                }
                if ( page == 1 ) {
                    self.jView.find( '.J_List' ).html( '' );
                    self.jView.find( '.J_NewsCont' ).html( '' );
                    res.data.selected = res.data.news[0];
                } else {
                    res.data.selected = {};
                }
                hasMore = res.data.hasMore;
                pageIndex = res.data.currentPage;
                _fn.renderList( res.data );
                // if ( page == 1 && res && res.data && res.data.news && res.data.news[0] && res.data.news[0].id ) {
                //     _fn.renderDetail( res.data.news[0].id, true );
                // } else if ( page == 1 ) {
                //     self.jView.find( '.J_NewsCont' ).html( '没有数据' );
                // }
            } );
        },
        renderList : function( data ) {
            var temp, jView = self.jView,
                jList = jView.find( '.J_List' );

            // if ( !data || !data.news || !data.news.length ) {
            //     return;
            // }
            temp = template.compile( jView.find( '.J_ListTemp' ).text() );
            jList.append( temp( data ) );
            if ( !jList.html().trim() ) {
                jList.html( '没有数据' );
            }
        }
    }
    // 其他依赖资源预加载
    kDom = kayak.dom;
    router = kayak.router;

    module.exports = Page( handle );
} );
