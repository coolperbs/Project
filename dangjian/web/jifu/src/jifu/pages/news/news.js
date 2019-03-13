define( 'jifu/pages/news/news', function( require, exports, module ) {
	require( 'jifu/pages/news/news.css' );
	require( 'jifu/pages/news/news.tpl' );
	var handle, CFG, _fn, kayak, DOM_EVENT, userServices,
		kayak = require( 'kayak/core/kayak' ),
        pop = require( 'jifu/widgets/pop/pop' ),
        config = require( 'jifu/config/config' ),
        utils = require( 'jifu/common/utils/utils' ),
        ajax = require( 'jifu/common/ajax/ajax' ),
        comment = require( 'jifu/widgets/comment/comment' ),
        login = require( 'jifu/widgets/login/login' ),
        HP = require( 'jifu/pages/news/headerparam' ),
        Analysis = require( 'jifu/pages/news/analysis' ),
        kRouter = kayak.router,
        isLoading = false,
		header = require( 'jifu/widgets/header/header' ), searchKey = '',
        pageType, subType = 1, self, hasMore = true, pageIndex = 1,
        commentObj = { list : [], total : 0 }, commentIsLoading = false,
        commentIndex = 0, commentHasmore = true, newsId = 0;

	handle = {
		nodeClass: 'w-p-news',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
            self = this;
        	_fn.init( this );
            pageType = kRouter.requestParam.type;
            self.jView.find( '.J_List' ).html( '' );
            self.jView.find( '.J_NewsCont' ).html( '' );
            pageType = pageType || 1;   // 1三会一课，2党员学习平台
            headParam = HP[ pageType ];
            searchKey = '';
        	header.showSub( headParam );
            isLoading = false;
            _fn.clear();
            commentIndex = 0;
            newsId = 0;
            subType = kRouter.requestParam.subType || 1; 
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


            header.on( 'search', function( e, data ) {
                // if ( data.id != 'news2' && data.id !='news3' ) {
                //     return;
                // }
                searchKey = data.key;
                _fn.loadMore( 1 );
            } );
			header.on( 'changeSort', function( e, data ) {
                // if ( data.id != 'news2' && data.id !='news3' ) {
                //     return;
                // }
                data = data || { value : 1 };
                subType = data.value * 1;
                searchKey = '';
                _fn.loadMore( 1 );
			} );

            jView.on( 'click', '.J_Comment', function( e ) {
                login.login( function() {
                    comment.show( { title : '评论'},function( data ) {
                        data = $.trim( data + '' );
                        if ( !data ) {
                            pop.show( { msg : '评论不能为空' } );
                            return;
                        }
                        _fn.comment( $( e.target ).attr( 'data-id' ), data );
                    } );
                } );
            } );
            jView.on( 'click', '.J_Item', function( e ) {
                var jTarget = $( this );
                jView.find( '.J_Item' ).removeClass( 'current' );
                jTarget.addClass( 'current' );
                _fn.renderDetail( jTarget.attr( 'data-id' ), true );
            } );
            // 列表加载更多
            jView.find( '.J_List' ).on( 'scroll', function( e ) {
                var jScroll = $( this ),
                    scrollHeight = jScroll.scrollTop() + jScroll[0].offsetHeight,
                    height = jScroll[0].scrollHeight;

                if ( scrollHeight + 100 >= height ) {
                    _fn.loadMore( pageIndex + 1 );
                }
            } );
            jView.find( '.J_NewsCont' ).on( 'scroll', function( e ) {
                if ( commentIndex == 0 ) {
                    return;
                }
                var jScroll = $( this ),
                    scrollHeight = jScroll.scrollTop() + jScroll[0].offsetHeight,
                    height = jScroll[0].scrollHeight;

                if ( scrollHeight + 100 >= height ) {
                    _fn.loadComment( commentIndex + 1, newsId );
                }
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
                _fn.renderDetail( id, true );
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
            return;
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

            // if ( pageType == 2 ) {
            //     param.type = 2;
            //     param.subType = subType;
            // } else if ( pageType == 3 ) {
            //     param.type = 3;
            //     param.subType = subType;
            // } else if ( pageType == 4 ) {
            //     param.type = 4;
            // } else {
            //     param.type = 1;
            // }
            param.type = pageType;
            if ( pageType == 1 || pageType == 2 || pageType == 3 || pageType == 6 ) {
                param.subType = subType;
            }


            if ( pageType == 1 && subType == 1 ) {
                _fn.showAnalysis();
                Analysis.show( self );
                return;
            } else {
                _fn.showList( );
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
                if ( page == 1 && res && res.data && res.data.news && res.data.news[0] && res.data.news[0].id ) {
                    _fn.renderDetail( res.data.news[0].id );
                } else if ( page == 1 ) {
                    self.jView.find( '.J_NewsCont' ).html( '没有数据' );
                }
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
        },
        renderDetail : function( id, toTop ) {
            ajax.query( config.url.newsDetail + '/' + id, {}, function( res ) {
                var temp, jView = self.jView,
                    jCont = jView.find( '.J_NewsCont' );

                if ( utils.isErrorRes( res ) ) {
                    pop.show( { msg : res.msg || '系统错误' } );
                    return;
                }

                temp = template.compile( jView.find( '.J_NewsTemp' ).text() );
                res.data.id = id;
                jCont.html( temp( res.data ) );
                if ( toTop ) {
                    jCont.parent().scrollTop( 0 );
                }
                newsId = id;
                _fn.loadComment( 1, newsId );
            } );
        },
        showAnalysis : function() {
            self.jView.find( '.J_List' ).hide();
            self.jView.find( '.J_NewsMain' ).hide();
            self.jView.find( '.J_Analysis' ).show();
        },
        showList : function() {
            self.jView.find( '.J_List' ).show();
            self.jView.find( '.J_NewsMain' ).show();
            self.jView.find( '.J_Analysis' ).hide();
        }
	}
	// 其他依赖资源预加载
	kDom = kayak.dom;
	router = kayak.router;

	module.exports = Page( handle );
} );
