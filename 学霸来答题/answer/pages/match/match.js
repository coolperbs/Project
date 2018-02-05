import service from '../../service/service';

Page( {
	onReady : function() {
		service.questions.getQuestion( '6b40aaf2-4fe7-4d0a-82ea-2a7109763d92', function( e ) {
			console.log( e );
		} );
	}
} );