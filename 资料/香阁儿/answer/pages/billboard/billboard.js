Page( {
	data : {
		tab : 1
	},
	onShow : function() {
	},

	changeTab : function( e ) {
		var tab = e.currentTarget.dataset.tab;
		this.setData( {
			tab : tab
		} );
		console.log( tab );
	}
} );