import {items} from '../../services/index';

Page( {
	onShow : function() {
		let self = this;
		items.getList( function( res ) {
			if ( !res || res.code != '0000' ) {
				return;
			}
			self.setData( {
				pageInfo : res.data
			} );
		} );
	},
	buy : function( e ) {
		var target = e.currentTarget,
			id = target.dataset.id;

		items.buyItem( { wareId : id }, function( res ) {
			console.log( 'f' );
		} );
	}
} );

