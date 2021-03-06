define( 'jifu/pages/ndetail2/ndetail2', function( require, exports, module ) {
	require( 'jifu/pages/ndetail2/ndetail2.css' );
	require( 'jifu/pages/ndetail2/ndetail2.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		kDom = kayak.dom,
		kRouter = kayak.router,
        utils = require( 'jifu/common/utils/utils' ),
        ajax = require( 'jifu/common/ajax/ajax' ),
        config = require( 'jifu/config/config' ),		
		header = require( 'jifu/widgets/header/header' ),
        pop = require( 'jifu/widgets/pop/pop' ),
		commentIsLoading = false,
		commentObj = { list : [], total : 0 }, commentIsLoading = false,
        commentIndex = 0, commentHasmore = true
		self;

	handle = {
		nodeClass: 'w-p-ndetail2',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
        	self = this;
            commentIndex = 0;
            commentIsLoading = false;        	
        	header.showSub( { title : '文章详情' } );
            self.jView.find( '.J_NewsCont' ).html('' );
            if ( !kRouter.requestParam.id ) {
                pop.show( { msg : '缺少新闻id' } );
                return;
            }
        	_fn.renderDetail( kRouter.requestParam.id, true );
        },
        hide : function() {
        	
        }
	}

	_fn = {
        renderDetail : function( id, toTop ) {
            var url = config.url.newsDetail;
            if ( id == 1 || id == 2 ) {
                url = config.url.innerNews;
            }
            ajax.query( url + '/' + id, {}, function( res ) {
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

                temp = template.compile( jView.find( '.J_CommentTemp' ).text() );
                jView.find( '.J_CommentCont' ).html( temp( commentObj ) );              
            } );
        }
	}

	module.exports = Page( handle );
} );
