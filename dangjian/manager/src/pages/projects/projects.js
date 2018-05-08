define( 'pages/projects/projects', function( require ) {
	require( 'pages/projects/projects.css' );

	return Vue.component( 'projects', {
		template : require( 'pages/projects/projects.html' )
	} );
} );