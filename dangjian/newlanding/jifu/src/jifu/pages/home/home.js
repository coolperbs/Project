define( 'jifu/pages/home/home', function( require, exports, module ) {
    var p = Page( {
        nodeClass: 'w-p-home',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['jifu/pages/home/home.tpl','jifu/pages/home/home.css'],
        show : function() {
            var self = this;
        },
        on : {
        }
    });

    module.exports = p;
} );
