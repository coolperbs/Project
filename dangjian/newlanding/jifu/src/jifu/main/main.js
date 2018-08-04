define( 'jifu/main/main', function() {
    kayak.router.on('parseActions', function(p) {
        var path = (p.path + '').split('/');
        if (path.length == 1) {
            p.actionPath = 'jifu/layout/' + path[0] + '/' + path[0];
        }
        if (path.length == 3) {
            p.actionPath = path[1] + '/pages/' + path[2] + '/' + path[2];
        }
    });
    kayak.router.on( 'preJump', function( e ) {
        if ( e.pathData && e.pathData.dmalllink == '' && e.pathData.web == '' ) {
            kRouter.replace( '#index/jifu/home' );
            return;
        }
    } );
} );