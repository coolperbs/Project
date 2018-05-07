define( 'pages/project/project', function( require ) {
	require( 'pages/project/project.css' );

	return Vue.component( 'project', {
		template : require( 'pages/project/project.html' )
	} );
} );