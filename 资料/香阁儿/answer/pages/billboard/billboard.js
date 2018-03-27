import { billboard } from '../../services/index'
import utils from '../../common/utils/utils'

let _fn;


Page( {
	onShow : function() {
		_fn.selectTab( 1, this );
	},

	changeTab : function( e ) {
		var tab = e.currentTarget.dataset.tab;
		_fn.selectTab( tab, this );
	}
} );

_fn = {
	selectTab : function( index, caller ) {
		let queryData;
		caller.setData( {
			tab : index,
			list : []
		} );
		queryData = index == 1 ? billboard.getFriendsRank : billboard.getGlobalRank;

		utils.showLoading( 300 );
		queryData( function( res ) {
			utils.hideLoading();
			if ( !res || !res.code != '0000' ) {
				return;
			}
			caller.setData( {
				list : res.data || []
			} );
		} );
	}
}





