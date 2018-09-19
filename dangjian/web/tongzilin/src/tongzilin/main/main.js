define( 'tongzilin/main/main', function() {
	template.helper( 'date', function( value, full ) {
		var date = new Date( value );
		if ( full ) {
			return date.getFullYear() + '年' + ( date.getMonth() + 1 ) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		}
		return date.getFullYear() + '年' + ( date.getMonth() + 1 ) + '月' + date.getDate() + '日 ';
	} );
} );