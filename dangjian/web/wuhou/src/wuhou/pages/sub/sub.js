define( 'wuhou/pages/sub/sub', function( require, exports, module ) {
	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'wuhou/widgets/header/header' ),
		subMenu = require( 'wuhou/pages/sub/menu/menu' ),
		pop = require( 'wuhou/widgets/pop/pop' ),
		PANNELS,
		kRouter = kayak.router,
		kDom = kayak.dom;

	PANNELS = {
		apply : require( 'wuhou/pages/sub/apply/apply' ),
		change : require( 'wuhou/pages/sub/change/change' ),
		list : require( 'wuhou/pages/sub/list/list' ),
		create : require( 'wuhou/pages/sub/create/create' )
	}

	handle = {
		nodeClass: 'w-p-sub',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['wuhou/pages/sub/sub.tpl', 'wuhou/pages/sub/sub.css'],
        show : function() {
        	var self = this;

        	if ( !kRouter.requestParam.tab ) {
        		kRouter.replace( '#index/wuhou/sub:tab=list' );
        		return;
        	}
        	header.showSub( { title : '双找双报到' } );
        	subMenu.show( self.jView.find( '.J_SubMenu' ) );
        	_fn.showPannel( this );
        },
        hide : function() {
        	
        }
	}

	_fn = {
		showPannel : function( self ) {
			var tab = kRouter.requestParam.tab,
				p;

			tab = tab || 'list'; // 默认显示任务列表
			for ( p in PANNELS ) {
				if ( !PANNELS[p] || !PANNELS[p].show || !PANNELS[p].hide ) {
					continue;
				}
				p == tab ? PANNELS[p].show( self.jView.find( '.J_SubMain' ) ) : PANNELS[p].hide();
			}
		}
	}
	module.exports = Page( handle );
} );






